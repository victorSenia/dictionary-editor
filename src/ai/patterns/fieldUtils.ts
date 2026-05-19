import type { AiPatternField, AiPatternSeparator } from "../types";

type Translate = (key: string, options?: Record<string, string>) => string;

export function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function hasConfiguredArticles(articles: string[]): boolean {
  return articles.some((article) => article.trim().length > 0);
}

export function getTranslationFieldLanguage(field: AiPatternField): string {
  return field.startsWith("translation:")
    ? field.slice("translation:".length)
    : "";
}

export function translationGroupName(language: string): string {
  const suffix =
    language.replace(/\W+/g, "_").replace(/^_+|_+$/g, "") || "target";
  return `translationText_${/^\d/.test(suffix) ? `t_${suffix}` : suffix}`;
}

export function buildTargetTranslationFields(
  targetLanguages: string[],
): AiPatternField[] {
  const languages = targetLanguages.map(clean).filter(Boolean);
  return languages.map((language) => `translation:${language}` as const);
}

function getLanguageLabel(language: string, translate: Translate): string {
  const key = `languages.${language}`;
  const label = translate(key);
  return label === key ? language : label;
}

export function getPatternFieldLabel(
  field: AiPatternField,
  translate: Translate,
): string {
  const language = getTranslationFieldLanguage(field);
  if (language) {
    return translate("grid.toLanguage", {
      language: getLanguageLabel(language, translate),
    });
  }

  switch (field) {
    case "article":
      return translate("grid.article");
    case "word":
      return translate("grid.word");
    case "additionalInformation":
      return translate("grid.additionalInfo");
    case "translation":
      return translate("aiPanel.patternField.translation");
  }

  return field;
}

export function getPatternSeparatorLabel(
  separator: AiPatternSeparator,
  translate: Translate,
): string {
  if (separator === "") {
    return translate("aiPanel.patternSeparatorNone");
  }
  if (separator === "\t") {
    return translate("aiPanel.patternSeparatorTab");
  }
  return separator;
}
