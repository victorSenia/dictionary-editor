import {
  ROW_TYPE_WORD,
  type DictionaryConfig,
  type DictionaryRow
} from "../models/dictionary";
import { parseTranslationValue } from "../utils/dictionaryHelpers";
import { buildAiParsingPattern, normalizeAiInputLine, stripMarkdownFence } from "./patterns/regexBuilder";
import { translationGroupName } from "./patterns/fieldUtils";
import type { AiParseResult, AiParsingConfiguration } from "./types";

export { AI_PATTERN_FIELDS, AI_PATTERN_SEPARATOR_PRESETS } from "./patterns/constants";
export {
  buildTargetTranslationFields,
  getPatternFieldLabel,
  getPatternSeparatorLabel
} from "./patterns/fieldUtils";
export { buildAiParsingPattern, buildVisualAiParsingPattern } from "./patterns/regexBuilder";
export { suggestAiParsingPattern, type AiParsingSuggestion } from "./patterns/suggestions";

export type DraftGridRow = DictionaryRow;

function clean(value: string | undefined): string {
  return (value ?? "")
    .replace(/\*\*(.+?)\*\*/gu, "$1")
    .replace(/__(.+?)__/gu, "$1")
    .trim();
}

function hasText(value: string | undefined): boolean {
  return Boolean(value && value.trim() !== "");
}

export function parseAiResponse(
  rawResponse: string,
  config: DictionaryConfig,
  parsingConfiguration: AiParsingConfiguration
): AiParseResult {
  if (!hasText(rawResponse)) {
    return { rows: [], unparsedLines: [], pattern: "", message: "aiPanel.parseResultEmpty" };
  }

  const pattern = buildAiParsingPattern(parsingConfiguration, config.articles);
  const expression = new RegExp(pattern, "iu");
  const rows: AiParseResult["rows"] = [];
  const unparsedLines: string[] = [];

  for (const line of stripMarkdownFence(rawResponse).split(/\r?\n/)) {
    const cleanLine = normalizeAiInputLine(line);
    if (!cleanLine) {
      continue;
    }

    const match = expression.exec(cleanLine);
    if (!match?.groups) {
      unparsedLines.push(cleanLine);
      continue;
    }

    const translationValues = parseNamedTranslationGroups(match.groups, config);
    let translationLanguage = clean(match.groups.translationLanguage ?? match.groups.language);
    let translationText = clean(match.groups.translationText ?? match.groups.translation);
    const inlineLanguageMatch = /^([^:=]+)\s*[:=]\s*(.+)$/.exec(translationText);
    if (!translationLanguage && inlineLanguageMatch) {
      translationLanguage = clean(inlineLanguageMatch[1]);
      translationText = clean(inlineLanguageMatch[2]);
    }
    if (!translationText && !hasTranslationValues(translationValues) && config.languagesTo.length > 0) {
      unparsedLines.push(cleanLine);
      continue;
    }

    rows.push({
      article: clean(match.groups.article),
      word: clean(match.groups.word),
      additionalInformation: clean(match.groups.additionalInformation),
      translationLanguage,
      translationText,
      translationValues
    });
  }

  return {
    rows,
    unparsedLines,
    pattern,
    message: rows.length === 0 ? "aiPanel.parseResultNoMatch" : "aiPanel.parseResultMatched"
  };
}

export function parseAiResponseRows(
  rawResponse: string,
  config: DictionaryConfig,
  parsingConfiguration: AiParsingConfiguration
): DraftGridRow[] {
  const result = parseAiResponse(rawResponse, config, parsingConfiguration);
  return result.rows.map((row): DraftGridRow => {
    const valuesTo = hasTranslationValues(row.translationValues)
      ? fillMissingTranslationColumns(row.translationValues, config)
      : parseTranslationColumns(row.translationLanguage, row.translationText, config);
    return {
      type: ROW_TYPE_WORD,
      article: row.article,
      valueFrom: row.word,
      additionalInformation: row.additionalInformation,
      valuesTo
    };
  });
}

function parseNamedTranslationGroups(
  groups: Record<string, string | undefined>,
  config: DictionaryConfig
): Record<string, string[]> {
  const valuesTo: Record<string, string[]> = {};
  for (const language of config.languagesTo) {
    const text = clean(groups[translationGroupName(language)]);
    if (text) {
      valuesTo[language] = parseTranslationValue(text, config.translationDelimiter);
    }
  }
  return valuesTo;
}

function hasTranslationValues(valuesTo: Record<string, string[]>): boolean {
  return Object.values(valuesTo).some((values) => values.length > 0);
}

function fillMissingTranslationColumns(
  valuesTo: Record<string, string[]>,
  config: DictionaryConfig
): Record<string, string[]> {
  const next = { ...valuesTo };
  for (const language of config.languagesTo) {
    next[language] ??= [];
  }
  return next;
}

function parseTranslationColumns(
  inlineLanguage: string,
  translationText: string,
  config: DictionaryConfig
): Record<string, string[]> {
  const valuesTo: Record<string, string[]> = {};
  const targetLanguages = config.languagesTo;
  const fallbackLanguage = targetLanguages[0] ?? inlineLanguage;
  let currentLanguage = targetLanguages.includes(inlineLanguage) ? inlineLanguage : fallbackLanguage;

  for (const part of splitTranslationText(translationText, config.translationDelimiter, targetLanguages)) {
    const text = clean(part);
    if (!text) {
      continue;
    }

    const languageMatch = /^([^:=]+)\s*[:=]\s*(.+)$/.exec(text);
    if (languageMatch) {
      const candidateLanguage = clean(languageMatch[1]);
      if (targetLanguages.includes(candidateLanguage)) {
        currentLanguage = candidateLanguage;
        addTranslationValue(valuesTo, currentLanguage, clean(languageMatch[2]));
        continue;
      }
    }

    addTranslationValue(valuesTo, currentLanguage, text);
  }

  for (const language of targetLanguages) {
    valuesTo[language] ??= [];
  }

  return valuesTo;
}

function addTranslationValue(valuesTo: Record<string, string[]>, language: string, value: string) {
  if (!language || !value) {
    return;
  }
  valuesTo[language] = [...(valuesTo[language] ?? []), value];
}

function splitTranslationText(translationText: string, delimiter: string, targetLanguages: string[]): string[] {
  const labelledPattern = new RegExp(`(?:^|[;,])\\s*(?:${targetLanguages.map(escapeRegExp).join("|")})\\s*[:=]`, "u");
  if (labelledPattern.test(translationText)) {
    return translationText.split(/\s*[;,]\s*/);
  }
  if (delimiter === "") {
    return [translationText];
  }
  return translationText.split(delimiter);
}

function escapeRegExp(value: string): string {
  return value.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
