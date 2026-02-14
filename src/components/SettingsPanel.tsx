import type { Dispatch, SetStateAction } from "react";
import type { DictionaryConfig } from "../models/dictionary";
import { normalizeListValue } from "../utils/dictionaryHelpers";

type SettingsPanelProps = {
  isOpen: boolean;
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  applyLanguagesTo: (languagesTo: string[]) => void;
};

function SettingsPanel({ isOpen, config, setConfig, applyLanguagesTo }: SettingsPanelProps) {
  return (
    <aside
      className={`settings-panel ${isOpen ? "open" : ""}`}
      aria-hidden={!isOpen}
      aria-label="Settings panel"
    >
      <h2>Settings</h2>
      <label>
        <span>languageFrom</span>
        <input
          type="text"
          value={config.languageFrom}
          onChange={(event) =>
            setConfig((prev) => ({ ...prev, languageFrom: event.target.value }))
          }
        />
      </label>
      <label>
        <span>languagesTo (comma-separated)</span>
        <input
          type="text"
          value={config.languagesTo.join(",")}
          onChange={(event) => {
            const next = normalizeListValue(event.target.value);
            if (next.length > 0) {
              applyLanguagesTo(next);
            }
          }}
        />
      </label>
      <label>
        <span>articles (comma-separated)</span>
        <input
          type="text"
          value={config.articles.join(",")}
          onChange={(event) =>
            setConfig((prev) => ({ ...prev, articles: normalizeListValue(event.target.value) }))
          }
        />
      </label>
      <label>
        <span>delimiter</span>
        <input
          type="text"
          value={config.delimiter}
          onChange={(event) => setConfig((prev) => ({ ...prev, delimiter: event.target.value }))}
        />
      </label>
      <label>
        <span>additionalInformationDelimiter</span>
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
        <span>translationDelimiter</span>
        <input
          type="text"
          value={config.translationDelimiter}
          onChange={(event) =>
            setConfig((prev) => ({ ...prev, translationDelimiter: event.target.value }))
          }
        />
      </label>
      <label>
        <span>topicFlag</span>
        <input
          type="text"
          value={config.topicFlag}
          onChange={(event) => setConfig((prev) => ({ ...prev, topicFlag: event.target.value }))}
        />
      </label>
      <label>
        <span>topicDelimiter</span>
        <input
          type="text"
          value={config.topicDelimiter}
          onChange={(event) =>
            setConfig((prev) => ({ ...prev, topicDelimiter: event.target.value }))
          }
        />
      </label>
      <label>
        <span>rootTopic</span>
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
