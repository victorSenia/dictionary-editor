import type { AiParsingConfiguration, AiPatternEntry, AiPatternField, AiPatternSeparator } from "../types";
import { getTranslationFieldLanguage, translationGroupName } from "./fieldUtils";

export function hasText(value: string | undefined): boolean {
  return Boolean(value && value.trim() !== "");
}

export function escapeRegExp(value: string): string {
  return value.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}

export function stripMarkdownFence(rawResponse: string): string {
  const value = rawResponse.trim();
  if (!value.startsWith("```")) return value;
  const firstLineBreak = value.indexOf("\n");
  const lastFence = value.lastIndexOf("```");
  return firstLineBreak < 0 || lastFence <= firstLineBreak
    ? value
    : value.slice(firstLineBreak + 1, lastFence).trim();
}

function isMarkdownTableSeparator(line: string): boolean {
  return /^\s*\|(?:\s*:?-+:?\s*\|)+\s*$/u.test(line);
}

export function normalizeAiInputText(rawResponse: string): string {
  const lines = stripMarkdownFence(rawResponse).split(/\r?\n/u);
  const normalized: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const next = lines[index + 1] ?? "";

    if (/^\s*\|.*\|\s*$/u.test(line) && isMarkdownTableSeparator(next)) {
      index += 1;
      continue;
    }

    normalized.push(/^\s*\|.*\|\s*$/u.test(line)
      ? normalizeAiInputLine(line)
      : line.trimEnd());
  }

  return normalized.join("\n");
}

export function collectAiInputRecords(rawResponse: string): string[] {
  return normalizeAiInputText(rawResponse)
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function normalizeAiInputLine(rawLine: string): string {
  const line = rawLine.trim();
  if (!line) return "";
  const tableWrapperMatch = /^\|(.+)\|$/u.exec(line);
  return tableWrapperMatch ? tableWrapperMatch[1].trim() : line;
}

function configuredArticlePattern(articles: string[]): string {
  const configured = articles.filter((article) => article.trim());
  return configured.length ? `(?<article>${configured.map(escapeRegExp).join("|")})?` : "";
}

function visualFieldPattern(field: AiPatternField, articles: string[] = []): string {
  const language = getTranslationFieldLanguage(field);
  if (language) {
    return `(?:(?:${escapeRegExp(language)})[ \t]*[:=][ \t]*)?(?<${translationGroupName(language)}>.+?)`;
  }
  switch (field) {
    case "article": return configuredArticlePattern(articles);
    case "word": return "(?<word>.+?)";
    case "additionalInformation": return "(?<additionalInformation>.*?)";
    case "translation": return "(?<translationText>.+?)";
    default:
      throw new Error(`Unsupported AI pattern field: ${field}`);
  }
}

/**
 * Converts the user-friendly pattern text to regex only for parsing.
 * `#` means a number and the two visible characters `\\n` mean a line break.
 * Everything else remains literal; horizontal whitespace is matched flexibly.
 */
export function visualTokenPattern(value: string): string {
  let result = "";
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === "#") {
      result += "\\d+";
      continue;
    }
    if (character === "\\" && value[index + 1] === "n") {
      result += "\\r?\\n";
      index += 1;
      continue;
    }
    if (character === "\t") {
      result += "\\t+";
      continue;
    }
    if (character === " ") {
      let end = index + 1;
      while (value[end] === " ") end += 1;
      result += " +";
      index = end - 1;
      continue;
    }
    result += escapeRegExp(character);
  }
  return result;
}

export function separatorPattern(separator: string): string {
  return visualTokenPattern(separator);
}

export function buildEntryAiParsingPattern(
  entries: AiPatternEntry[],
  separators: AiPatternSeparator[],
  articles: string[] = []
): string {
  const parts = ["^\\s*"];
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const value = visualFieldPattern(entry.field, articles);
    const precedingSeparator = index > 0 ? separatorPattern(separators[index - 1] ?? "") : "";
    const segment = `${precedingSeparator}${visualTokenPattern(entry.prefix)}${value}${visualTokenPattern(entry.suffix)}`;
    parts.push(entry.field === "additionalInformation" ? `(?:${segment})?` : segment);
  }
  parts.push("[ \\t]*$");
  return parts.join("");
}

export function buildVisualAiParsingPattern(
  fields: AiPatternField[],
  separators: AiPatternSeparator[],
  articles: string[] = []
): string {
  return buildEntryAiParsingPattern(
    fields.map((field) => ({ field, prefix: "", suffix: "" })),
    separators,
    articles
  );
}

export function buildAiParsingPattern(configuration: AiParsingConfiguration, articles: string[] = []): string {
  if (configuration.entries.length === 0) {
    throw new Error("aiPanel.parsingConfigurationMissingPattern");
  }
  return buildEntryAiParsingPattern(configuration.entries, configuration.separators, articles);
}
