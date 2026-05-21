export function testTranslate(key: string, values: Record<string, unknown> = {}): string {
  switch (key) {
    case "languages.de":
      return "Deutsch";
    case "languages.en":
      return "English";
    case "languages.uk":
      return "Українська";
    case "languages.ru":
      return "Русский";
    case "languages.es":
      return "Español";
    case "aiPrompt.taskVocabulary":
      return "Create concise vocabulary rows.";
    case "aiPrompt.taskTranslation":
      return "Translate the listed existing source words.";
    case "aiPrompt.includeTranslationsForAllTargetLanguages":
      return "include translations for all target languages";
    case "aiPrompt.multipleTranslationsAllowed":
      return "more than one translation per language is allowed";
    case "aiPrompt.addBriefNotes":
      return "include brief notes for ending changes, plural forms, or usage notes";
    case "aiPrompt.includeArticlesWhenNatural":
      return "If articles are natural in the source language, include them";
    case "aiPrompt.requirementsLine":
      return [values.allLanguages, values.multipleTranslations, values.notes, values.articles]
        .filter(Boolean)
        .join("; ");
    case "aiPrompt.course":
      return `Course: ${values.course}`;
    case "aiPrompt.topic":
      return `Topic: ${values.topic}`;
    case "aiPrompt.entryCount":
      return `Count: ${values.count}`;
    case "aiPrompt.sourceLanguage":
      return `Source language: ${values.language}`;
    case "aiPrompt.targetLanguages":
      return `Target languages: ${values.languages}`;
    case "aiPrompt.words":
      return "Words:";
    default: {
      const defaultValue = values.defaultValue;
      return typeof defaultValue === "string" ? defaultValue : key;
    }
  }
}
