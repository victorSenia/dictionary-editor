import { useEffect, useState, type KeyboardEvent } from "react";
import { createNextLanguageKey } from "../utils/dictionaryHelpers";
import type { RenamePair } from "../utils/languageTransition";

type Args = {
  languagesTo: string[];
  applyLanguagesTo: (languagesTo: string[], renamePairs?: RenamePair[]) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
};

export function useLanguageSettingsDraft({ languagesTo, applyLanguagesTo, t }: Args) {
  const [languageDrafts, setLanguageDrafts] = useState<string[]>(languagesTo);
  const [languageErrors, setLanguageErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    setLanguageDrafts(languagesTo);
    setLanguageErrors({});
  }, [languagesTo]);

  const clearLanguageErrorAt = (index: number) => {
    setLanguageErrors((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, index)) {
        return prev;
      }
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const commitLanguageAt = (index: number) => {
    const draft = languageDrafts[index] ?? "";
    const nextValue = draft.trim();
    const currentValue = languagesTo[index] ?? "";

    if (nextValue === "") {
      setLanguageErrors((prev) => ({ ...prev, [index]: t("settings.languageErrorEmpty") }));
      return;
    }
    if (languagesTo.some((language, currentIndex) => currentIndex !== index && language === nextValue)) {
      setLanguageErrors((prev) => ({
        ...prev,
        [index]: t("settings.languageErrorExists", { language: nextValue })
      }));
      return;
    }

    clearLanguageErrorAt(index);
    if (nextValue === currentValue) {
      return;
    }

    const next = [...languagesTo];
    const fromLanguage = next[index];
    next[index] = nextValue;
    const renamePairs = fromLanguage && fromLanguage !== next[index]
      ? [{ from: fromLanguage, to: next[index] }]
      : [];
    applyLanguagesTo(next, renamePairs);
  };

  const updateLanguageDraftAt = (index: number, value: string) => {
    clearLanguageErrorAt(index);
    setLanguageDrafts((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleLanguageKeyDownAt = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitLanguageAt(index);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      clearLanguageErrorAt(index);
      setLanguageDrafts((prev) => {
        const next = [...prev];
        next[index] = languagesTo[index] ?? "";
        return next;
      });
    }
  };

  const addLanguage = () => {
    applyLanguagesTo([...languagesTo, createNextLanguageKey(languagesTo)]);
  };

  const removeLanguageAt = (index: number) => {
    setLanguageErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      const shifted: Record<number, string> = {};
      for (const [rawKey, message] of Object.entries(next)) {
        const key = Number.parseInt(rawKey, 10);
        shifted[key > index ? key - 1 : key] = message as string;
      }
      return shifted;
    });
    applyLanguagesTo(languagesTo.filter((_item, current) => current !== index));
  };

  return {
    languageDrafts,
    languageErrors,
    commitLanguageAt,
    updateLanguageDraftAt,
    handleLanguageKeyDownAt,
    addLanguage,
    removeLanguageAt
  };
}
