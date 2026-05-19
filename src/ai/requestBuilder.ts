import type { DictionaryConfig } from "../models/dictionary";
import type { AiRequestContext, AiRequestState, AiRequestWord } from "./types";

type Translate = (key: string, values?: Record<string, unknown>) => string;

export function buildVocabularyInstructions(config: DictionaryConfig, translate: Translate): string {
  return [
    translate("aiPrompt.taskVocabulary"),
    translate("aiPrompt.requirementsLine", {
      allLanguages: config.languagesTo.length > 1
        ? translate("aiPrompt.includeTranslationsForAllTargetLanguages")
        : "",
      multipleTranslations: translate("aiPrompt.multipleTranslationsAllowed"),
      notes: translate("aiPrompt.addBriefNotes"),
      articles: config.articles.length > 0
        ? translate("aiPrompt.includeArticlesWhenNatural")
        : ""
    })
  ].join("\n");
}

export function buildTranslationInstructions(config: DictionaryConfig, translate: Translate): string {
  return [
    translate("aiPrompt.taskTranslation"),
    translate("aiPrompt.requirementsLine", {
      allLanguages: config.languagesTo.length > 1
        ? translate("aiPrompt.includeTranslationsForAllTargetLanguages")
        : "",
      multipleTranslations: translate("aiPrompt.multipleTranslationsAllowed"),
      notes: "",
      articles: ""
    })
  ].join("\n");
}

export function buildAiRequest(
  aiRequest: AiRequestState,
  config: DictionaryConfig,
  translate: Translate,
  requestContext?: AiRequestContext
): string {
  const topic = aiRequest.topic || requestContext?.topic || "";
  const targetLanguages = requestContext?.targetLanguages.length
    ? requestContext.targetLanguages
    : config.languagesTo;
  const isTranslationOnly = requestContext?.mode === "translations";

  return [
    isTranslationOnly ? buildTranslationInstructions(config, translate) : buildVocabularyInstructions(config, translate),
    config.rootTopic ? translate("aiPrompt.course", { course: config.rootTopic }) : "",
    topic ? translate("aiPrompt.topic", { topic }) : "",
    !isTranslationOnly && aiRequest.wordCount ? translate("aiPrompt.entryCount", { count: aiRequest.wordCount }) : "",
    translate("aiPrompt.sourceLanguage", { language: formatPromptLanguage(config.languageFrom, translate) }),
    translate("aiPrompt.targetLanguages", { languages: targetLanguages.map((language) => formatPromptLanguage(language, translate)).join(", ") }),
    buildContextWords(requestContext, translate)
  ].filter(Boolean).join("\n");
}

export function formatPromptLanguage(language: string, translate: Translate): string {
  const key = language.trim();
  const translated = translate(`languages.${key}`, { defaultValue: key });
  return translated === `languages.${key}` ? key : translated;
}

function buildContextWords(requestContext: AiRequestContext | undefined, translate: Translate): string {
  if (!requestContext || requestContext.mode !== "translations" || requestContext.words.length === 0) {
    return "";
  }

  return [
    translate("aiPrompt.words"),
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
