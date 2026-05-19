import type { AiPatternField, AiPatternSeparator } from "../types";

export function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function hasConfiguredArticles(articles: string[]): boolean {
  return articles.some((article) => article.trim().length > 0);
}

export function getTranslationFieldLanguage(field: AiPatternField): string {
  return field.startsWith("translation:") ? field.slice("translation:".length) : "";
}

export function translationGroupName(language: string): string {
  const suffix = language.replace(/\W+/g, "_").replace(/^_+|_+$/g, "") || "target";
  return `translationText_${/^\d/.test(suffix) ? `t_${suffix}` : suffix}`;
}

export function buildTargetTranslationFields(targetLanguages: string[]): AiPatternField[] {
  const languages = targetLanguages.map(clean).filter(Boolean);
  return languages.map((language) => `translation:${language}` as const);
}

export function getPatternFieldLabel(field: AiPatternField, translate: (key: string) => string): string {
  const language = getTranslationFieldLanguage(field);
  return language ? `${translate("aiPanel.patternField.translation")} ${language}` : translate(`aiPanel.patternField.${field}`);
}

export function getPatternSeparatorLabel(
  separator: AiPatternSeparator,
  translate: (key: string) => string
): string {
  if (separator === "") {
    return translate("aiPanel.patternSeparatorNone");
  }
  if (separator === "\t") {
    return translate("aiPanel.patternSeparatorTab");
  }
  return separator;
}
