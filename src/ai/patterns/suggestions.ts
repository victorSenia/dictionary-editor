import type { AiPatternEntry, AiPatternField, AiPatternSeparator } from "../types";
import { AI_PATTERN_SEPARATOR_PRESETS } from "./constants";
import { buildTargetTranslationFields, hasConfiguredArticles } from "./fieldUtils";
import {
  buildEntryAiParsingPattern,
  collectAiInputRecords,
  normalizeAiInputText
} from "./regexBuilder";

export type AiParsingSuggestion = {
  entries: AiPatternEntry[];
  separators: AiPatternSeparator[];
  pattern: string;
  matchedLines: number;
  totalLines: number;
};

type ScoredSuggestion = AiParsingSuggestion & {
  filledValues: number;
};

export type AiParsingConfigurationSuggestion = AiParsingSuggestion & {
  configuration: {
    entries: AiPatternEntry[];
    separators: AiPatternSeparator[];
  };
};

type Candidate = {
  entries: AiPatternEntry[];
  separators: AiPatternSeparator[];
  totalEntries?: number;
};

type NumberedRecord = {
  wordPrefix: string;
  wordSuffix: string;
  infoSeparator: string;
  infoPrefix: string;
  infoSuffix: string;
  translationPrefix: string;
  hasInfo: boolean;
};

function translationField(targetLanguages: string[]): AiPatternField {
  return targetLanguages[0] ? `translation:${targetLanguages[0]}` : "translation";
}

function replaceNumberWithToken(value: string): string {
  return value.replace(/\d+/u, "#");
}

function splitTrailingInformation(value: string): {
  word: string;
  separator: string;
  prefix: string;
  suffix: string;
  hasInfo: boolean;
} {
  const match = /^(.*?)([ \t]*)\(([^()\r\n]+)\)[ \t]*$/u.exec(value);
  if (!match) {
    return { word: value, separator: "", prefix: "", suffix: "", hasInfo: false };
  }
  return {
    word: match[1],
    separator: match[2],
    prefix: "(",
    suffix: ")",
    hasInfo: true
  };
}

function parseNumberedRecord(firstLine: string, secondLine: string): NumberedRecord | null {
  const heading = /^(\s*)(\d+)([.)][ \t]*)(.*)$/u.exec(firstLine);
  if (!heading) return null;

  let wordText = heading[4];
  let wordOpen = "";
  let wordClose = "";
  const boldWord = /^\*\*(.+?)\*\*(.*)$/u.exec(wordText);
  if (boldWord) {
    wordOpen = "**";
    wordText = `${boldWord[1]}${boldWord[2]}`;
    wordClose = "**";
  }

  const info = splitTrailingInformation(wordText);
  const translation = /^(\s*[*+-][ \t]*)(?:(?:\*\*[^*\r\n]+:\*\*|[^:\r\n]+:)[ \t]*)?(.+)$/u.exec(secondLine);
  if (!translation) return null;

  return {
    wordPrefix: replaceNumberWithToken(`${heading[1]}${heading[2]}${heading[3]}${wordOpen}`),
    wordSuffix: wordClose,
    infoSeparator: info.separator,
    infoPrefix: info.prefix,
    infoSuffix: info.suffix,
    translationPrefix: secondLine.slice(0, secondLine.length - translation[2].length),
    hasInfo: info.hasInfo
  };
}

function numberedMultilineCandidate(rawResponse: string, targetLanguages: string[]): Candidate | null {
  const lines = rawResponse.split(/\r?\n/u);
  const records: NumberedRecord[] = [];
  for (let index = 0; index < lines.length - 1; index += 1) {
    const record = parseNumberedRecord(lines[index], lines[index + 1]);
    if (record) {
      records.push(record);
      index += 1;
    }
  }
  if (records.length === 0) return null;

  const representative = records.find((record) => record.hasInfo) ?? records[0];
  const target = translationField(targetLanguages);
  const entries: AiPatternEntry[] = [
    { field: "word", prefix: representative.wordPrefix, suffix: representative.wordSuffix }
  ];
  const separators: AiPatternSeparator[] = [];

  if (records.some((record) => record.hasInfo)) {
    separators.push(representative.infoSeparator || " ");
    entries.push({
      field: "additionalInformation",
      prefix: representative.infoPrefix || "(",
      suffix: representative.infoSuffix || ")"
    });
  }

  separators.push("\\n");
  entries.push({ field: target, prefix: representative.translationPrefix, suffix: "" });
  return { entries, separators, totalEntries: records.length };
}

function labelledBlockCandidate(rawResponse: string, targetLanguages: string[]): Candidate | null {
  const lines = rawResponse.split(/\r?\n/u);
  const records: Array<{
    wordPrefix: string;
    infoSeparator: string;
    hasInfo: boolean;
    translationPrefix: string;
  }> = [];

  for (let index = 0; index < lines.length - 2; index += 1) {
    const heading = /^(\s*\*\*)(\d+)(\.\*\*[ \t]*)$/u.exec(lines[index]);
    const wordLine = /^(\s*[*+-][ \t]*)(?:\*\*[^*\r\n]+:\*\*|[^:\r\n]+:)[ \t]*(.+)$/u.exec(lines[index + 1]);
    const translationLine = /^(\s*[*+-][ \t]*)(?:\*\*[^*\r\n]+:\*\*|[^:\r\n]+:)[ \t]*(.+)$/u.exec(lines[index + 2]);
    if (!heading || !wordLine || !translationLine) continue;

    const wordValue = wordLine[2];
    const translationValue = translationLine[2];
    const info = splitTrailingInformation(wordValue);
    records.push({
      wordPrefix: `${replaceNumberWithToken(`${heading[1]}${heading[2]}${heading[3]}`)}\\n${lines[index + 1].slice(0, lines[index + 1].length - wordValue.length)}`,
      infoSeparator: info.separator,
      hasInfo: info.hasInfo,
      translationPrefix: lines[index + 2].slice(0, lines[index + 2].length - translationValue.length)
    });
    index += 2;
  }

  if (records.length === 0) return null;
  const representative = records.find((record) => record.hasInfo) ?? records[0];
  const target = translationField(targetLanguages);
  const entries: AiPatternEntry[] = [
    { field: "word", prefix: representative.wordPrefix, suffix: "" }
  ];
  const separators: AiPatternSeparator[] = [];

  if (records.some((record) => record.hasInfo)) {
    separators.push(representative.infoSeparator || " ");
    entries.push({ field: "additionalInformation", prefix: "(", suffix: ")" });
  }

  separators.push("\\n");
  entries.push({ field: target, prefix: representative.translationPrefix, suffix: "" });
  return { entries, separators, totalEntries: records.length };
}

function markdownTableCandidate(rawResponse: string, targetLanguages: string[]): Candidate | null {
  const lines = rawResponse.split(/\r?\n/u);
  let separatorIndex = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (/^\s*\|(?:\s*:?-+:?\s*\|)+\s*$/u.test(lines[index]) && /^\s*\|.*\|\s*$/u.test(lines[index - 1])) {
      separatorIndex = index;
      break;
    }
  }
  if (separatorIndex < 0) return null;

  const firstDataLine = lines.slice(separatorIndex + 1).find((line) => /^\s*\|.*\|\s*$/u.test(line));
  if (!firstDataLine) return null;
  const normalized = firstDataLine.trim().replace(/^\|/u, "").replace(/\|$/u, "").trim();
  const separators = Array.from(normalized.matchAll(/\s*\|\s*/gu), (match) => match[0]);
  const columnCount = separators.length + 1;
  if (columnCount < 2) return null;

  const targetFields = buildTargetTranslationFields(targetLanguages);
  const entries: AiPatternEntry[] = [{ field: "word", prefix: "", suffix: "" }];
  const availableAfterWord = columnCount - 1;
  const translationCount = Math.min(Math.max(1, targetFields.length), availableAfterWord);
  for (let index = 0; index < translationCount; index += 1) {
    entries.push({
      field: targetFields[index] ?? "translation",
      prefix: "",
      suffix: ""
    });
  }
  if (availableAfterWord > translationCount) {
    entries.push({ field: "additionalInformation", prefix: "", suffix: "" });
  }

  const totalEntries = lines
    .slice(separatorIndex + 1)
    .filter((line) => /^\s*\|.*\|\s*$/u.test(line))
    .length;

  return {
    entries,
    separators: separators.slice(0, entries.length - 1),
    totalEntries
  };
}

function hasExplicitSeparator(separators: AiPatternSeparator[]): boolean {
  return separators.some((separator) => separator !== "");
}

function countSpacedSeparators(separators: AiPatternSeparator[]): number {
  return separators.filter((separator) => separator.includes(" ")).length;
}

function isBetterSuggestion(candidate: ScoredSuggestion, best: ScoredSuggestion | null): boolean {
  if (!best) return true;

  if (candidate.matchedLines !== best.matchedLines && (candidate.matchedLines === 0 || best.matchedLines === 0)) {
    return candidate.matchedLines > best.matchedLines;
  }

  const candidateExplicit = hasExplicitSeparator(candidate.separators);
  const bestExplicit = hasExplicitSeparator(best.separators);
  if (candidate.matchedLines > 0 && candidateExplicit !== bestExplicit) {
    return candidateExplicit;
  }

  if (candidate.matchedLines !== best.matchedLines) {
    return candidate.matchedLines > best.matchedLines;
  }

  const candidateTranslations = candidate.entries.filter((entry) => entry.field.startsWith("translation")).length;
  const bestTranslations = best.entries.filter((entry) => entry.field.startsWith("translation")).length;
  if (candidateTranslations !== bestTranslations) {
    return candidateTranslations > bestTranslations;
  }

  if (candidate.filledValues !== best.filledValues) {
    return candidate.filledValues > best.filledValues;
  }

  const candidateSpaced = countSpacedSeparators(candidate.separators);
  const bestSpaced = countSpacedSeparators(best.separators);
  if (candidateSpaced !== bestSpaced) {
    return candidateSpaced > bestSpaced;
  }

  return candidate.entries.length > best.entries.length;
}

function scoreSuggestion(
  rawResponse: string,
  entries: AiPatternEntry[],
  separators: AiPatternSeparator[],
  articles: string[],
  totalEntries?: number
): ScoredSuggestion {
  const pattern = buildEntryAiParsingPattern(entries, separators, articles);
  const matches = Array.from(normalizeAiInputText(rawResponse).matchAll(new RegExp(pattern, "gimu")));
  return {
    entries,
    separators,
    pattern,
    matchedLines: matches.length,
    totalLines: totalEntries ?? collectAiInputRecords(rawResponse).length,
    filledValues: matches.reduce((total, match) =>
      total + Object.values(match.groups ?? {}).filter((value) => value?.trim()).length, 0)
  };
}

function dedupeFieldSets(fieldSets: AiPatternField[][]): AiPatternField[][] {
  const seen = new Set<string>();
  return fieldSets.filter((fields) => {
    const key = fields.join("\0");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildSuggestionFields(
  targetLanguages: string[],
  translationsOnly: boolean,
  articles: string[]
): AiPatternField[][] {
  const translationFields = buildTargetTranslationFields(targetLanguages);
  const translationFieldSets = translationFields.length > 0
    ? Array.from({ length: translationFields.length }, (_value, index) =>
        translationFields.slice(0, translationFields.length - index))
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
      ["word", "additionalInformation", ...fields],
      ["word", ...fields, "additionalInformation"]
    ];
    return includeArticle
      ? [
          ["article", "word", ...fields],
          ...basePatterns,
          ["article", "word", "additionalInformation", ...fields],
          ["article", "word", ...fields, "additionalInformation"]
        ]
      : basePatterns;
  }));
}

function extractObservedSeparators(line: string): string[] {
  return Array.from(
    line.matchAll(/(\s*\|\s*|\s*—\s*|\s+-\s+|\s*:\s*|\s*;\s*|\s*,\s*|\t+)/gu),
    (match) => match[0]
  );
}

function collectObservedSeparatorTemplates(lines: string[], desiredLength: number): AiPatternSeparator[][] {
  if (desiredLength === 0) return [[]];
  const seen = new Set<string>();
  const templates: AiPatternSeparator[][] = [];
  const addTemplate = (template: string[]) => {
    if (template.length !== desiredLength) return;
    const key = template.join("\0");
    if (seen.has(key)) return;
    seen.add(key);
    templates.push(template);
  };
  for (const line of lines) {
    const observed = extractObservedSeparators(line);
    if (observed.length >= desiredLength) addTemplate(observed.slice(0, desiredLength));
    if (observed.length >= desiredLength - 1) addTemplate(["", ...observed.slice(0, desiredLength - 1)]);
  }
  for (const preset of AI_PATTERN_SEPARATOR_PRESETS) {
    addTemplate(Array.from({ length: desiredLength }, () => preset));
  }
  return templates;
}

function firstEntryPrefix(lines: string[]): string {
  for (const line of lines) {
    const numbered = /^(\d+)([.)][ \t]*)/u.exec(line);
    if (numbered) return `#${numbered[2]}`;
    const bullet = /^([-*][ \t]+)/u.exec(line);
    if (bullet) return bullet[1];
  }
  return "";
}

function genericCandidates(
  rawResponse: string,
  targetLanguages: string[],
  translationsOnly: boolean,
  articles: string[]
): Candidate[] {
  const lines = collectAiInputRecords(rawResponse);
  const prefix = firstEntryPrefix(lines);
  const candidates: Candidate[] = [];
  for (const fields of buildSuggestionFields(targetLanguages, translationsOnly, articles)) {
    for (const separators of collectObservedSeparatorTemplates(lines, Math.max(0, fields.length - 1))) {
      if (separators.some((separator, index) =>
        separator === "" && !(fields[index] === "article" && fields[index + 1] === "word"))) {
        continue;
      }
      candidates.push({
        entries: fields.map((field, index) => ({ field, prefix: index === 0 ? prefix : "", suffix: "" })),
        separators
      });
    }
  }
  return candidates;
}

export function suggestAiParsingPattern(
  rawResponse: string,
  targetLanguages: string[] = [],
  articles: string[] = [],
  translationsOnly = false
): AiParsingSuggestion | null {
  const table = markdownTableCandidate(rawResponse, targetLanguages);
  if (table) {
    const scored = scoreSuggestion(rawResponse, table.entries, table.separators, articles, table.totalEntries);
    if (scored.matchedLines > 0) {
      const { filledValues: _filledValues, ...suggestion } = scored;
      return suggestion;
    }
  }

  const labelled = labelledBlockCandidate(rawResponse, targetLanguages);
  if (labelled) {
    const scored = scoreSuggestion(rawResponse, labelled.entries, labelled.separators, articles, labelled.totalEntries);
    if (scored.matchedLines > 0) {
      const { filledValues: _filledValues, ...suggestion } = scored;
      return suggestion;
    }
  }

  const numbered = numberedMultilineCandidate(rawResponse, targetLanguages);
  if (numbered) {
    const scored = scoreSuggestion(rawResponse, numbered.entries, numbered.separators, articles, numbered.totalEntries);
    if (scored.matchedLines > 0) {
      const { filledValues: _filledValues, ...suggestion } = scored;
      return suggestion;
    }
  }

  const candidates = genericCandidates(rawResponse, targetLanguages, translationsOnly, articles);
  let best: ScoredSuggestion | null = null;
  for (const candidate of candidates) {
    const scored = scoreSuggestion(rawResponse, candidate.entries, candidate.separators, articles);
    if (isBetterSuggestion(scored, best)) best = scored;
  }
  if (!best || best.matchedLines === 0) return null;
  const { filledValues: _filledValues, ...suggestion } = best;
  return suggestion;
}

export function suggestAiParsingConfiguration(
  rawResponse: string,
  targetLanguages: string[] = [],
  articles: string[] = [],
  translationsOnly = false
): AiParsingConfigurationSuggestion | null {
  const suggestion = suggestAiParsingPattern(rawResponse, targetLanguages, articles, translationsOnly);
  if (!suggestion) return null;
  return {
    ...suggestion,
    configuration: {
      entries: suggestion.entries,
      separators: suggestion.separators
    }
  };
}
