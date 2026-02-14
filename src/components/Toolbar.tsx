import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";

type ToolbarProps = {
  isSettingsOpen: boolean;
  language: string;
  showSaveAs: boolean;
  onLanguageChange: (language: string) => void;
  onOpen: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onToggleSettings: () => void;
  onDeleteSelected: () => void;
};

function Toolbar({
  isSettingsOpen,
  language,
  showSaveAs,
  onLanguageChange,
  onOpen,
  onSave,
  onSaveAs,
  onToggleSettings,
  onDeleteSelected
}: ToolbarProps) {
  const { t } = useTranslation();

  return (
    <header className="toolbar" role="toolbar" aria-label={t("toolbar.aria")}>
      <button type="button" onClick={onOpen}>
        {t("toolbar.open")}
      </button>
      <button type="button" onClick={onSave}>
        {t("toolbar.save")}
      </button>
      {showSaveAs ? (
        <button type="button" onClick={onSaveAs}>
          {t("toolbar.saveAs")}
        </button>
      ) : null}
      <button
        type="button"
        className={`toggle-button ${isSettingsOpen ? "active" : ""}`}
        onClick={onToggleSettings}
        aria-pressed={isSettingsOpen}
      >
        {isSettingsOpen ? t("toolbar.hideSettings") : t("toolbar.showSettings")}
      </button>
      <button type="button" className="danger-button" onClick={onDeleteSelected}>
        {t("toolbar.removeSelectedRows")}
      </button>
      <label className="page-size-label">
        <span>{t("toolbar.language")}</span>
        <select value={language} onChange={(event) => onLanguageChange(event.target.value)}>
          {SUPPORTED_LANGUAGES.map((languageCode) => (
            <option key={languageCode} value={languageCode}>
              {t(`languages.${languageCode}`)}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
}

export default Toolbar;
