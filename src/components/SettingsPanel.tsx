import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import type { DictionaryConfig } from "../models/dictionary";
import type { RenamePair } from "../utils/languageTransition";
import ArticleSettings from "./settings/ArticleSettings";
import ColumnVisibilitySettings from "./settings/ColumnVisibilitySettings";
import DelimiterSettings from "./settings/DelimiterSettings";
import LanguageSettings from "./settings/LanguageSettings";

type SettingsPanelProps = {
  isOpen: boolean;
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  applyLanguagesTo: (languagesTo: string[], renamePairs?: RenamePair[]) => void;
  showArticleColumn: boolean;
  setShowArticleColumn: Dispatch<SetStateAction<boolean>>;
  showAdditionalInformationColumn: boolean;
  setShowAdditionalInformationColumn: Dispatch<SetStateAction<boolean>>;
};

function SettingsPanel({
  isOpen,
  config,
  setConfig,
  applyLanguagesTo,
  showArticleColumn,
  setShowArticleColumn,
  showAdditionalInformationColumn,
  setShowAdditionalInformationColumn
}: SettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <aside
      className={`settings-panel ${isOpen ? "open" : ""}`}
      aria-hidden={!isOpen}
      aria-label={t("settings.aria")}
    >
      <h2>{t("settings.title")}</h2>
      <ColumnVisibilitySettings
        config={config}
        showArticleColumn={showArticleColumn}
        setShowArticleColumn={setShowArticleColumn}
        showAdditionalInformationColumn={showAdditionalInformationColumn}
        setShowAdditionalInformationColumn={setShowAdditionalInformationColumn}
        t={t}
      />
      <LanguageSettings
        config={config}
        setConfig={setConfig}
        applyLanguagesTo={applyLanguagesTo}
        t={t}
      />
      <ArticleSettings config={config} setConfig={setConfig} t={t} />
      <DelimiterSettings config={config} setConfig={setConfig} t={t} />
    </aside>
  );
}

export default SettingsPanel;
