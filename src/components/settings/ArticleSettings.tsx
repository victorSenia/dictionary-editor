import type { Dispatch, SetStateAction } from "react";
import type { DictionaryConfig } from "../../models/dictionary";
import EditableList from "./EditableList";

type Props = {
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  t: (key: string) => string;
};

export default function ArticleSettings({ config, setConfig, t }: Props) {
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
  );
}
