import type { Dispatch, SetStateAction } from "react";
import type { DictionaryConfig } from "../../models/dictionary";
import type { RenamePair } from "../../utils/languageTransition";
import { useLanguageSettingsDraft } from "../../hooks/useLanguageSettingsDraft";
import EditableList from "./EditableList";

type Props = {
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  applyLanguagesTo: (languagesTo: string[], renamePairs?: RenamePair[]) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
};

export default function LanguageSettings({ config, setConfig, applyLanguagesTo, t }: Props) {
  const {
    languageDrafts,
    languageErrors,
    commitLanguageAt,
    updateLanguageDraftAt,
    handleLanguageKeyDownAt,
    addLanguage,
    removeLanguageAt
  } = useLanguageSettingsDraft({ languagesTo: config.languagesTo, applyLanguagesTo, t });

  return (
    <>
      <label>
        <span>{t("settings.languageFrom")}</span>
        <input
          type="text"
          value={config.languageFrom}
          onChange={(event) => setConfig((prev) => ({ ...prev, languageFrom: event.target.value }))}
        />
      </label>
      <label>
        <span>{t("settings.languagesTo")}</span>
        <EditableList
          items={languageDrafts}
          itemKeyPrefix="lang"
          addAriaLabel={t("settings.addLanguage")}
          removeAriaLabel={t("settings.removeItem")}
          onChangeAt={updateLanguageDraftAt}
          onBlurAt={commitLanguageAt}
          onKeyDownAt={handleLanguageKeyDownAt}
          getItemErrorAt={(index) => languageErrors[index] ?? null}
          onAdd={addLanguage}
          onRemoveAt={removeLanguageAt}
        />
      </label>
    </>
  );
}
