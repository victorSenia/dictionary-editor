import type { Dispatch, SetStateAction } from "react";
import type { DictionaryConfig } from "../../models/dictionary";

type Props = {
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  t: (key: string) => string;
};

export default function DelimiterSettings({ config, setConfig, t }: Props) {
  return (
    <>
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
          onChange={(event) => setConfig((prev) => ({
            ...prev,
            additionalInformationDelimiter: event.target.value
          }))}
        />
      </label>
      <label>
        <span>{t("settings.translationDelimiter")}</span>
        <input
          type="text"
          value={config.translationDelimiter}
          onChange={(event) => setConfig((prev) => ({ ...prev, translationDelimiter: event.target.value }))}
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
          onChange={(event) => setConfig((prev) => ({ ...prev, topicDelimiter: event.target.value }))}
        />
      </label>
    </>
  );
}
