import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, type AppLanguage } from "./resources";

const DEFAULT_LANGUAGE: AppLanguage = "en";
const SUPPORTED_LANGUAGES: AppLanguage[] = [
  "en",
  "es",
  "fr",
  "in",
  "pt",
  "it",
  "nl",
  "pl",
  "tr",
  "ru",
  "hi",
  "bn",
  "ur",
  "zh",
  "ja",
  "ko",
  "id",
  "vi",
  "th",
  "uk",
  "de",
  "ar",
  "he",
  "fa"
];
const LANGUAGE_STORAGE_KEY = "dictionary-editor.language";

const LANGUAGE_ALIASES: Partial<Record<string, AppLanguage>> = {
  iw: "he",
  in: "id"
};

function normalizeLanguageCode(language: string): string {
  return language.trim().toLowerCase().replace("_", "-");
}

function resolveSupportedLanguage(language: string): AppLanguage | null {
  const normalized = normalizeLanguageCode(language);
  const alias = LANGUAGE_ALIASES[normalized];
  if (alias && SUPPORTED_LANGUAGES.includes(alias)) {
    return alias;
  }

  if (SUPPORTED_LANGUAGES.includes(normalized as AppLanguage)) {
    return normalized as AppLanguage;
  }

  const baseLanguage = normalized.split("-")[0];
  const baseAlias = LANGUAGE_ALIASES[baseLanguage];
  if (baseAlias && SUPPORTED_LANGUAGES.includes(baseAlias)) {
    return baseAlias;
  }

  return SUPPORTED_LANGUAGES.includes(baseLanguage as AppLanguage)
    ? baseLanguage as AppLanguage
    : null;
}

function resolveBrowserLanguage(): AppLanguage | null {
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of browserLanguages) {
    const supportedLanguage = resolveSupportedLanguage(language);
    if (supportedLanguage) {
      return supportedLanguage;
    }
  }

  return null;
}

function resolveInitialLanguage(): AppLanguage {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  const storedLanguage = stored ? resolveSupportedLanguage(stored) : null;
  if (storedLanguage) {
    return storedLanguage;
  }

  return resolveBrowserLanguage() ?? DEFAULT_LANGUAGE;
}

const initialLanguage = resolveInitialLanguage();

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false
  }
});

i18n.on("languageChanged", (language: string) => {
  const supportedLanguage = resolveSupportedLanguage(language);
  if (supportedLanguage) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, supportedLanguage);
  }
});

export { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES };
export default i18n;
