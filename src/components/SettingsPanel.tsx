import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { DictionaryConfig } from "../models/dictionary";

type SettingsPanelProps = {
  isOpen: boolean;
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  applyLanguagesTo: (languagesTo: string[]) => void;
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
  onAdd,
  onRemoveAt
}: EditableListProps) {
  return (
    <div className="settings-list">
      {items.map((item, index) => (
        <div key={`${itemKeyPrefix}-${index}`} className="settings-list-item">
          <input
            className="settings-list-input"
            type="text"
            value={item}
            onChange={(event) => onChangeAt(index, event.target.value)}
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

  const updateLanguageAt = (index: number, value: string) => {
    if (value.trim() === "") {
      return;
    }
    const next = [...config.languagesTo];
    next[index] = value.trim();
    applyLanguagesTo(next);
  };

  const addLanguage = () => {
    let index = config.languagesTo.length + 1;
    let candidate = `lang${index}`;
    while (config.languagesTo.includes(candidate)) {
      index += 1;
      candidate = `lang${index}`;
    }
    applyLanguagesTo([...config.languagesTo, candidate]);
  };

  const removeLanguageAt = (index: number) => {
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
          items={config.languagesTo}
          itemKeyPrefix="lang"
          addAriaLabel={t("settings.addLanguage")}
          removeAriaLabel={t("settings.removeItem")}
          canRemove={canRemoveLanguage}
          onChangeAt={updateLanguageAt}
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
