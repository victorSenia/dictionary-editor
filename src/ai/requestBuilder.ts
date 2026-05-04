import type { DictionaryConfig } from "../models/dictionary.ts";
import { en } from "../i18n/locales/en.ts";
import type { AiRequestContext, AiRequestState, AiRequestWord } from "./types.ts";

const PROMPT_LANGUAGE_NAMES: Record<string, string> = en.translation.languages;

export function buildVocabularyInstructions(config: DictionaryConfig): string {
  return [
    "Task: Create concise vocabulary rows.",
    [
      "Requirements:",
      config.languagesTo.length > 1
          ? "Include translations for all target languages."
          : "",
      "Multiple translations per language are allowed.",
      "Add brief notes only when useful, such as plural forms, inflection, or usage.",
      config.articles.length > 0
          ? "If articles are natural in the source language, include them."
          : "",
    ]
        .filter(Boolean)
        .join(" "),
  ].join("\n");
}

export function buildTranslationInstructions(config: DictionaryConfig): string {
  return [
    "Task: Translate the listed words.",
    [
      "Requirements:",
      config.languagesTo.length > 1
          ? "Include translations for all target languages."
          : "",
      "Multiple translations per language are allowed.",
    ]
        .filter(Boolean)
        .join(" "),
  ].join("\n");
}

export function buildAiRequest(
  aiRequest: AiRequestState,
  config: DictionaryConfig,
  requestContext?: AiRequestContext
): string {
  const topic = aiRequest.topic || requestContext?.topic || "";
  const targetLanguages = requestContext?.targetLanguages.length
    ? requestContext.targetLanguages
    : config.languagesTo;
  const isTranslationOnly = requestContext?.mode === "translations";

  return [
    isTranslationOnly ? buildTranslationInstructions(config) : buildVocabularyInstructions(config),
    config.rootTopic ? `Course: ${config.rootTopic}` : "",
    topic ? `Topic: ${topic}` : "",
    !isTranslationOnly && aiRequest.wordCount ? `Entry count: ${aiRequest.wordCount}` : "",
    `Source language: ${formatPromptLanguage(config.languageFrom)}`,
    `Target languages: ${targetLanguages.map(formatPromptLanguage).join(", ")}`,
    buildContextWords(requestContext)
  ].filter(Boolean).join("\n");
}

export function formatPromptLanguage(language: string): string {
  const key = language.trim();
  return PROMPT_LANGUAGE_NAMES[key] ?? key;
}

function buildContextWords(requestContext: AiRequestContext | undefined): string {
  if (!requestContext || requestContext.mode !== "translations" || requestContext.words.length === 0) {
    return "";
  }

  return [
    "Words:",
    ...requestContext.words.map(formatRequestWord)
  ].join("\n");
}

function formatRequestWord(word: AiRequestWord): string {
  return [
    word.article ? `${word.article} ` : "",
    word.word,
    word.additionalInformation ? ` (${word.additionalInformation})` : ""
  ].join("");
}
