import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, type AppLanguage } from "./resources";

const DEFAULT_LANGUAGE: AppLanguage = "en";
const SUPPORTED_LANGUAGES: AppLanguage[] = ["en", "de", "uk"];
const LANGUAGE_STORAGE_KEY = "dictionary-editor.language";

function resolveInitialLanguage(): AppLanguage {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as AppLanguage)) {
    return stored as AppLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase().split("-")[0] as AppLanguage;
  if (SUPPORTED_LANGUAGES.includes(browserLanguage)) {
    return browserLanguage;
  }

  return DEFAULT_LANGUAGE;
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
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
});

export { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES };
export default i18n;
