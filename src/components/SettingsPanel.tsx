import { useEffect, useState, type Dispatch, type KeyboardEvent, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { DictionaryConfig } from "../models/dictionary";
import { createNextLanguageKey } from "../utils/dictionaryHelpers";
import type { RenamePair } from "../utils/languageTransition";

type SettingsPanelProps = {
  isOpen: boolean;
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  applyLanguagesTo: (languagesTo: string[], renamePairs?: RenamePair[]) => void;
  showArticleColumn: boolean;
  setShowArticleColumn: Dispatch<SetStateAction<boolean>>;
};

type EditableListProps = {
  items: string[];
  itemKeyPrefix: string;
  addAriaLabel: string;
  removeAriaLabel: string;
  canRemove?: boolean;
  onChangeAt: (index: number, value: string) => void;
  onBlurAt?: (index: number) => void;
  onKeyDownAt?: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  getItemErrorAt?: (index: number) => string | null;
  onAdd: () => void;
  onRemoveAt: (index: number) => void;
};

function EditableList({
  items,
  itemKeyPrefix,
  addAriaLabel,
  removeAriaLabel,
  canRemove = true,
  onChangeAt,
  onBlurAt,
  onKeyDownAt,
  getItemErrorAt,
  onAdd,
  onRemoveAt
}: EditableListProps) {
  return (
    <div className="settings-list">
      {items.map((item, index) => (
        <div key={`${itemKeyPrefix}-${index}`} className="settings-list-row">
          <div className="settings-list-item">
            <input
              className={`settings-list-input ${getItemErrorAt?.(index) ? "settings-list-input-invalid" : ""}`}
              type="text"
              value={item}
              onChange={(event) => onChangeAt(index, event.target.value)}
              onBlur={() => onBlurAt?.(index)}
              onKeyDown={(event) => onKeyDownAt?.(index, event)}
              aria-invalid={!!getItemErrorAt?.(index)}
            />
            <button
              type="button"
              className="translation-item-btn translation-item-btn-danger"
              aria-label={removeAriaLabel}
              title={removeAriaLabel}
              disabled={!canRemove}
              onClick={() => onRemoveAt(index)}
            >
              {"\u00D7"}
            </button>
          </div>
          {getItemErrorAt?.(index) ? (
            <p className="settings-field-error">{getItemErrorAt(index)}</p>
          ) : null}
        </div>
      ))}
      <button
        type="button"
        className="translation-item-btn translation-item-btn-new"
        aria-label={addAriaLabel}
        title={addAriaLabel}
        onClick={onAdd}
      >
        +
      </button>
    </div>
  );
}

function SettingsPanel({
  isOpen,
  config,
  setConfig,
  applyLanguagesTo,
  showArticleColumn,
  setShowArticleColumn
}: SettingsPanelProps) {
  const { t } = useTranslation();
  const canRemoveLanguage = config.languagesTo.length > 1;
  const [languageDrafts, setLanguageDrafts] = useState<string[]>(config.languagesTo);
  const [languageErrors, setLanguageErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    setLanguageDrafts(config.languagesTo);
    setLanguageErrors({});
  }, [config.languagesTo]);

  const commitLanguageAt = (index: number) => {
    const draft = languageDrafts[index] ?? "";
    const nextValue = draft.trim();
    const currentValue = config.languagesTo[index] ?? "";

    if (nextValue === "") {
      setLanguageErrors((prev) => ({ ...prev, [index]: t("settings.languageErrorEmpty") }));
      return;
    }
    if (config.languagesTo.some((language, currentIndex) => currentIndex !== index && language === nextValue)) {
      setLanguageErrors((prev) => ({
        ...prev,
        [index]: t("settings.languageErrorExists", { language: nextValue })
      }));
      return;
    }

    setLanguageErrors((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, index)) {
        return prev;
      }
      const next = { ...prev };
      delete next[index];
      return next;
    });
    if (nextValue === currentValue) {
      return;
    }

    const next = [...config.languagesTo];
    const fromLanguage = next[index];
    next[index] = nextValue;
    const renamePairs = fromLanguage && fromLanguage !== next[index]
      ? [{ from: fromLanguage, to: next[index] }]
      : [];
    applyLanguagesTo(next, renamePairs);
  };

  const updateLanguageDraftAt = (index: number, value: string) => {
    setLanguageErrors((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, index)) {
        return prev;
      }
      const next = { ...prev };
      delete next[index];
      return next;
    });
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
      setLanguageErrors((prev) => {
        if (!Object.prototype.hasOwnProperty.call(prev, index)) {
          return prev;
        }
        const next = { ...prev };
        delete next[index];
        return next;
      });
      setLanguageDrafts((prev) => {
        const next = [...prev];
        next[index] = config.languagesTo[index] ?? "";
        return next;
      });
    }
  };

  const addLanguage = () => {
    const candidate = createNextLanguageKey(config.languagesTo);
    applyLanguagesTo([...config.languagesTo, candidate]);
  };

  const removeLanguageAt = (index: number) => {
    setLanguageErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      const shifted: Record<number, string> = {};
      for (const [rawKey, message] of Object.entries(next)) {
        const key = Number.parseInt(rawKey, 10);
        shifted[key > index ? key - 1 : key] = message;
      }
      return shifted;
    });
    if (!canRemoveLanguage) {
      return;
    }
    const next = config.languagesTo.filter((_item, current) => current !== index);
    if (next.length > 0) {
      applyLanguagesTo(next);
    }
  };

  const updateArticleAt = (index: number, value: string) => {
    const next = [...config.articles];
    next[index] = value;
    setConfig((prev) => ({ ...prev, articles: next }));
  };

  const addArticle = () => {
    setConfig((prev) => ({ ...prev, articles: [...prev.articles, ""] }));
  };

  const removeArticleAt = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      articles: prev.articles.filter((_item, current) => current !== index)
    }));
  };

  return (
    <aside
      className={`settings-panel ${isOpen ? "open" : ""}`}
      aria-hidden={!isOpen}
      aria-label={t("settings.aria")}
    >
      <h2>{t("settings.title")}</h2>
      <div className="settings-inline-checkbox-wrap">
        <label className="settings-inline-checkbox">
          <input
            type="checkbox"
            checked={showArticleColumn}
            onChange={(event) => setShowArticleColumn(event.target.checked)}
          />
          <span>{t("settings.showArticleColumn")}</span>
        </label>
        {!showArticleColumn ? (
          <p className="settings-helper-note">{t("settings.showArticleColumnHint")}</p>
        ) : null}
      </div>
      <label>
        <span>{t("settings.languageFrom")}</span>
        <input
          type="text"
          value={config.languageFrom}
          onChange={(event) =>
            setConfig((prev) => ({ ...prev, languageFrom: event.target.value }))
          }
        />
      </label>
      <label>
        <span>{t("settings.languagesTo")}</span>
        <EditableList
          items={languageDrafts}
          itemKeyPrefix="lang"
          addAriaLabel={t("settings.addLanguage")}
          removeAriaLabel={t("settings.removeItem")}
          canRemove={canRemoveLanguage}
          onChangeAt={updateLanguageDraftAt}
          onBlurAt={commitLanguageAt}
          onKeyDownAt={handleLanguageKeyDownAt}
          getItemErrorAt={(index) => languageErrors[index] ?? null}
          onAdd={addLanguage}
          onRemoveAt={removeLanguageAt}
        />
      </label>
      <label>
        <span>{t("settings.articles")}</span>
        <EditableList
          items={config.articles}
          itemKeyPrefix="article"
          addAriaLabel={t("settings.addArticle")}
          removeAriaLabel={t("settings.removeItem")}
          onChangeAt={updateArticleAt}
          onAdd={addArticle}
          onRemoveAt={removeArticleAt}
        />
      </label>
      <label>
        <span>{t("settings.delimiter")}</span>
        <input
          type="text"
          value={config.delimiter}
          onChange={(event) => setConfig((prev) => ({ ...prev, delimiter: event.target.value }))}
        />
      </label>
      <label>
        <span>{t("settings.additionalInformationDelimiter")}</span>
        <input
          type="text"
          value={config.additionalInformationDelimiter}
          onChange={(event) =>
            setConfig((prev) => ({
              ...prev,
              additionalInformationDelimiter: event.target.value
            }))
          }
        />
      </label>
      <label>
        <span>{t("settings.translationDelimiter")}</span>
        <input
          type="text"
          value={config.translationDelimiter}
          onChange={(event) =>
            setConfig((prev) => ({ ...prev, translationDelimiter: event.target.value }))
          }
        />
      </label>
      <label>
        <span>{t("settings.topicFlag")}</span>
        <input
          type="text"
          value={config.topicFlag}
          onChange={(event) => setConfig((prev) => ({ ...prev, topicFlag: event.target.value }))}
        />
      </label>
      <label>
        <span>{t("settings.topicDelimiter")}</span>
        <input
          type="text"
          value={config.topicDelimiter}
          onChange={(event) =>
            setConfig((prev) => ({ ...prev, topicDelimiter: event.target.value }))
          }
        />
      </label>
      <label>
        <span>{t("settings.rootTopic")}</span>
        <input
          type="text"
          value={config.rootTopic}
          onChange={(event) => setConfig((prev) => ({ ...prev, rootTopic: event.target.value }))}
        />
      </label>
    </aside>
  );
}

export default SettingsPanel;
