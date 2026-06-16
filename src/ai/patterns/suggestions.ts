import type { AiPatternField, AiPatternSeparator } from "../types";
import { AI_PATTERN_SEPARATOR_PRESETS } from "./constants";
import { buildTargetTranslationFields, hasConfiguredArticles } from "./fieldUtils";
import { buildVisualAiParsingPattern, normalizeAiInputLine, stripMarkdownFence } from "./regexBuilder";

export type AiParsingSuggestion = {
  fields: AiPatternField[];
  separators: AiPatternSeparator[];
  pattern: string;
  matchedLines: number;
  totalLines: number;
};

type CompleteAiParsingConfiguration = {
  itemPattern: string;
  fields: AiPatternField[];
  separators: AiPatternSeparator[];
};

export type AiParsingConfigurationSuggestion = AiParsingSuggestion & {
  configuration: CompleteAiParsingConfiguration;
};

function hasExplicitSeparator(separators: AiPatternSeparator[]): boolean {
  return separators.some((separator) => separator !== "");
}

function countSpacedSeparators(separators: AiPatternSeparator[]): number {
  return separators.filter((separator) => separator.includes(" ")).length;
}

function dedupeFieldSets(fieldSets: AiPatternField[][]): AiPatternField[][] {
  const seen = new Set<string>();
  return fieldSets.filter((fields) => {
    const key = fields.join("\0");
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function buildSuggestionFields(targetLanguages: string[], translationsOnly: boolean, articles: string[] = []): AiPatternField[][] {
  const translationFields = buildTargetTranslationFields(targetLanguages);
  const translationFieldSets = translationFields.length > 0
    ? Array.from({ length: translationFields.length }, (_value, index) => translationFields.slice(0, translationFields.length - index))
    : [[]];
  const includeArticle = hasConfiguredArticles(articles);

  if (translationsOnly) {
    return dedupeFieldSets(translationFieldSets.flatMap((fields) => [
      ["word", ...fields],
      [...fields]
    ]));
  }

  return dedupeFieldSets(translationFieldSets.flatMap((fields) => {
    const basePatterns: AiPatternField[][] = [
      ["word", ...fields],
      ["word", "additionalInformation", ...fields]
    ];

    return includeArticle
      ? [
          ["article", "word", ...fields],
          ...basePatterns,
          ["article", "word", "additionalInformation", ...fields]
        ]
      : basePatterns;
  }));
}

function isAllowedSuggestionSeparators(fields: AiPatternField[], separators: AiPatternSeparator[]): boolean {
  return separators.every(
    (separator, index) =>
      separator !== "" || (fields[index] === "article" && fields[index + 1] === "word")
  );
}

function isBetterSuggestion(candidate: AiParsingSuggestion, best: AiParsingSuggestion | null): boolean {
  if (!best) {
    return true;
  }
  if (candidate.matchedLines !== best.matchedLines && (candidate.matchedLines === 0 || best.matchedLines === 0)) {
    return candidate.matchedLines > best.matchedLines;
  }

  const candidateHasExplicitSeparator = hasExplicitSeparator(candidate.separators);
  const bestHasExplicitSeparator = hasExplicitSeparator(best.separators);
  if (candidate.matchedLines > 0 && candidateHasExplicitSeparator !== bestHasExplicitSeparator) {
    return candidateHasExplicitSeparator;
  }

  if (candidate.matchedLines !== best.matchedLines) {
    return candidate.matchedLines > best.matchedLines;
  }

  const candidateSpacedSeparators = countSpacedSeparators(candidate.separators);
  const bestSpacedSeparators = countSpacedSeparators(best.separators);
  if (candidateSpacedSeparators !== bestSpacedSeparators) {
    return candidateSpacedSeparators > bestSpacedSeparators;
  }

  return candidate.fields.length > best.fields.length;
}

function extractObservedSeparators(line: string): string[] {
  return Array.from(
    line.matchAll(/(\s*\|\s*|\s*—\s*|\s*-\s*|\s*:\s*|\s*;\s*|\s*,\s*|\t+)/gu),
    (match) => match[0]
  );
}

function collectObservedSeparatorTemplates(lines: string[], desiredLength: number): AiPatternSeparator[][] {
  if (desiredLength === 0) {
    return [[]];
  }

  const seen = new Set<string>();
  const templates: AiPatternSeparator[][] = [];
  const addTemplate = (template: string[]) => {
    if (template.length !== desiredLength) {
      return;
    }
    const key = template.join("\0");
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    templates.push(template);
  };

  for (const line of lines) {
    const observed = extractObservedSeparators(line);
    if (observed.length >= desiredLength) {
      addTemplate(observed.slice(0, desiredLength));
    }
    if (desiredLength > 0 && observed.length >= desiredLength - 1) {
      addTemplate(["", ...observed.slice(0, desiredLength - 1)]);
    }
  }

  for (const preset of AI_PATTERN_SEPARATOR_PRESETS) {
    addTemplate(Array.from({ length: desiredLength }, () => preset));
  }

  return templates;
}

export function suggestAiParsingPattern(
  rawResponse: string,
  targetLanguages: string[] = [],
  articles: string[] = [],
  translationsOnly = false
): AiParsingSuggestion | null {
  const lines = stripMarkdownFence(rawResponse)
    .split(/\r?\n/)
    .map(normalizeAiInputLine)
    .filter(Boolean);
  if (lines.length === 0) {
    return null;
  }

  let best: AiParsingSuggestion | null = null;
  for (const fields of buildSuggestionFields(targetLanguages, translationsOnly, articles)) {
    const separatorTemplates = collectObservedSeparatorTemplates(lines, Math.max(0, fields.length - 1));
    for (const separators of separatorTemplates) {
      if (!isAllowedSuggestionSeparators(fields, separators)) {
        continue;
      }
      const pattern = buildVisualAiParsingPattern(fields, separators, articles);
      const expression = new RegExp(pattern, "iu");
      const matchedLines = lines.filter((line) => expression.test(line)).length;
      const candidate = { fields, separators, pattern, matchedLines, totalLines: lines.length };
      if (isBetterSuggestion(candidate, best)) {
        best = candidate;
      }
    }
  }

  return best && best.matchedLines > 0 ? best : null;
}

export function suggestAiParsingConfiguration(
  rawResponse: string,
  targetLanguages: string[] = [],
  articles: string[] = [],
  translationsOnly = false
): AiParsingConfigurationSuggestion | null {
  const suggestion = suggestAiParsingPattern(
    rawResponse,
    targetLanguages,
    articles,
    translationsOnly
  );

  if (!suggestion) {
    return null;
  }

  return {
    ...suggestion,
    configuration: {
      itemPattern: suggestion.pattern,
      fields: suggestion.fields,
      separators: suggestion.separators
    }
  };
}
