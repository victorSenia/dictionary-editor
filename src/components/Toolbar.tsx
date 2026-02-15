import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../i18n";

type ToolbarProps = {
  isSettingsOpen: boolean;
  showOnlyInvalid: boolean;
  language: string;
  showSaveAs: boolean;
  canCancel: boolean;
  canReapply: boolean;
  deleteSelectedDisabled: boolean;
  onLanguageChange: (language: string) => void;
  onOpen: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onCancel: () => void;
  onReapply: () => void;
  onToggleSettings: () => void;
  onToggleShowOnlyInvalid: () => void;
  onDeleteSelected: () => void;
};

function Toolbar({
  isSettingsOpen,
  showOnlyInvalid,
  language,
  showSaveAs,
  canCancel,
  canReapply,
  deleteSelectedDisabled,
  onLanguageChange,
  onOpen,
  onSave,
  onSaveAs,
  onCancel,
  onReapply,
  onToggleSettings,
  onToggleShowOnlyInvalid,
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
        className="toolbar-icon-button"
        onClick={onCancel}
        disabled={!canCancel}
        title={t("toolbar.cancel")}
        aria-label={t("toolbar.cancel")}
      >
        {"\u21B6"}
      </button>
      <button
        type="button"
        className="toolbar-icon-button"
        onClick={onReapply}
        disabled={!canReapply}
        title={t("toolbar.reapply")}
        aria-label={t("toolbar.reapply")}
      >
        {"\u21B7"}
      </button>
      <button
        type="button"
        className={`toggle-button ${showOnlyInvalid ? "active" : ""}`}
        onClick={onToggleShowOnlyInvalid}
        aria-pressed={showOnlyInvalid}
      >
        {t("toolbar.showOnlyInvalid")}
      </button>
      <button type="button" className="danger-button" onClick={onDeleteSelected} disabled={deleteSelectedDisabled}>
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
      <button
        type="button"
        className={`toggle-button ${isSettingsOpen ? "active" : ""}`}
        onClick={onToggleSettings}
        aria-pressed={isSettingsOpen}
      >
        {isSettingsOpen ? t("toolbar.hideSettings") : t("toolbar.showSettings")}
      </button>
    </header>
  );
}

export default Toolbar;
