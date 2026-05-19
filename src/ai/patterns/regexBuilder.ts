import type { AiParsingConfiguration, AiPatternField, AiPatternSeparator } from "../types";
import { getTranslationFieldLanguage, translationGroupName } from "./fieldUtils";

export function hasText(value: string | undefined): boolean {
  return Boolean(value && value.trim() !== "");
}

export function escapeRegExp(value: string): string {
  return value.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}

export function separatorPattern(separator: string): string {
  if (separator === "") {
    return "";
  }

  return escapeRegExp(separator)
    .replace(/ +/g, "\\s+")
    .replace(/\\t+/g, "\\t+");
}

export function stripMarkdownFence(rawResponse: string): string {
  const value = rawResponse.trim();
  if (!value.startsWith("```")) {
    return value;
  }
  const firstLineBreak = value.indexOf("\n");
  const lastFence = value.lastIndexOf("```");
  if (firstLineBreak < 0 || lastFence <= firstLineBreak) {
    return value;
  }
  return value.slice(firstLineBreak + 1, lastFence).trim();
}

export function normalizeAiInputLine(rawLine: string): string {
  const line = rawLine.trim();
  if (!line) {
    return "";
  }

  const tableWrapperMatch = /^\|(.+)\|$/u.exec(line);
  return tableWrapperMatch ? tableWrapperMatch[1].trim() : line;
}

function prefixPattern(preset: AiParsingConfiguration["linePrefixPreset"]): string {
  switch (preset) {
    case "NONE":
      return "";
    case "NUMBERED":
      return "(?:\\d+[.)]\\s*)?";
    case "BULLET":
      return "(?:[-*]\\s*)?";
    default:
      return "(?:(?:\\d+[.)]|[-*])\\s*)?";
  }
}

function configuredArticlePattern(articles: string[]): string {
  const configuredArticles = articles.filter((article) => article.trim().length > 0);
  if (configuredArticles.length === 0) {
    return "";
  }

  return `(?<article>${configuredArticles.map(escapeRegExp).join("|")})?`;
}

function visualFieldPattern(field: AiPatternField, articles: string[] = []): string {
  const targetLanguage = getTranslationFieldLanguage(field);
  if (targetLanguage) {
    return `(?:(?:${escapeRegExp(targetLanguage)})\\s*[:=]\\s*)?(?<${translationGroupName(targetLanguage)}>.+?)`;
  }

  switch (field) {
    case "article":
      return configuredArticlePattern(articles);
    case "word":
      return "(?<word>.+?)";
    case "additionalInformation":
      return "(?<additionalInformation>.+?)";
    case "translation":
      return "(?:(?<translationLanguage>[^:=|;,\\-]{2,40})\\s*[:=]\\s*)?(?<translationText>.+?)";
  }

  return "";
}

export function buildVisualAiParsingPattern(
  fields: AiPatternField[],
  separators: AiPatternSeparator[],
  linePrefixPreset: AiParsingConfiguration["linePrefixPreset"] = "LIST_MARKER",
  articles: string[] = []
): string {
  return [
    "^\\s*",
    prefixPattern(linePrefixPreset),
    fields.map((field, index) => {
      const fieldPattern = visualFieldPattern(field, articles);

      if (index === 0) {
        return field === "additionalInformation"
          ? `(?:${fieldPattern})?`
          : fieldPattern;
      }

      const separator = separatorPattern(separators[index - 1] ?? " | ");
      return field === "additionalInformation"
        ? `(?:${separator}${fieldPattern})?`
        : `${separator}${fieldPattern}`;
    }).join(""),
    "\\s*$"
  ].join("");
}

export function buildAiParsingPattern(parsingConfiguration: AiParsingConfiguration, articles: string[] = []): string {
  if (hasText(parsingConfiguration.itemPattern)) {
    return parsingConfiguration.itemPattern;
  }

  if (parsingConfiguration.fields && parsingConfiguration.separators) {
    return buildVisualAiParsingPattern(
      parsingConfiguration.fields,
      parsingConfiguration.separators,
      parsingConfiguration.linePrefixPreset,
      articles
    );
  }

  throw new Error("aiPanel.parsingConfigurationMissingPattern");
}
