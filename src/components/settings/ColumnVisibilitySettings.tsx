import type { Dispatch, SetStateAction } from "react";
import type { DictionaryConfig } from "../../models/dictionary";

type Props = {
  config: DictionaryConfig;
  showArticleColumn: boolean;
  setShowArticleColumn: Dispatch<SetStateAction<boolean>>;
  showAdditionalInformationColumn: boolean;
  setShowAdditionalInformationColumn: Dispatch<SetStateAction<boolean>>;
  t: (key: string) => string;
};

export default function ColumnVisibilitySettings({
  config,
  showArticleColumn,
  setShowArticleColumn,
  showAdditionalInformationColumn,
  setShowAdditionalInformationColumn,
  t
}: Props) {
  const hasConfiguredArticles = config.articles.some((article) => article.trim().length > 0);

  return (
    <>
      <div className="settings-inline-checkbox-wrap">
        <label className="settings-inline-checkbox">
          <input
            type="checkbox"
            checked={showArticleColumn}
            onChange={(event) => setShowArticleColumn(event.target.checked)}
          />
          <span>{t("settings.showArticleColumn")}</span>
        </label>
        {!showArticleColumn && hasConfiguredArticles ? (
          <p className="settings-helper-note">{t("settings.showArticleColumnHint")}</p>
        ) : null}
      </div>
      <div className="settings-inline-checkbox-wrap">
        <label className="settings-inline-checkbox">
          <input
            type="checkbox"
            checked={showAdditionalInformationColumn}
            onChange={(event) => setShowAdditionalInformationColumn(event.target.checked)}
          />
          <span>{t("settings.showAdditionalInformationColumn")}</span>
        </label>
      </div>
    </>
  );
}
