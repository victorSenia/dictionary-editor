import type { AiRequestModeChoice } from "../../ai/requestContext";
import type { AiRequestContext, AiRequestState } from "../../ai/types";

type AiRequestSectionProps = {
  t: (key: string) => string;
  aiRequest: AiRequestState;
  aiPrompt: string;
  generatedRequest: string;
  requestContext: AiRequestContext;
  requestModeChoice: AiRequestModeChoice;
  onRequestChange: (request: AiRequestState) => void;
  onPromptChange: (prompt: string) => void;
  onRequestModeChoiceChange: (mode: AiRequestModeChoice) => void;
  onUseGeneratedRequest: () => void;
};

export default function AiRequestSection({
  t,
  aiRequest,
  aiPrompt,
  generatedRequest,
  requestContext,
  requestModeChoice,
  onRequestChange,
  onPromptChange,
  onRequestModeChoiceChange,
  onUseGeneratedRequest
}: AiRequestSectionProps) {
  return (
    <details open className="ai-section">
      <summary>{t("aiPanel.requestSection")}</summary>
      <div className="ai-form-grid">
        <label className="compact-field mode-field">
          Mode
          <select
            value={requestModeChoice}
            onChange={(event) => onRequestModeChoiceChange(event.target.value as AiRequestModeChoice)}
          >
            <option value="auto">Auto</option>
            <option value="vocabulary">Full generation</option>
            <option value="translations">Translations only</option>
          </select>
        </label>
        <label className="compact-field topic-field">
          {t("aiPanel.topic")}
          <input value={aiRequest.topic} onChange={(event) => onRequestChange({ ...aiRequest, topic: event.target.value })} />
        </label>
        {requestContext.mode !== "translations" ? (
          <label className="compact-field words-field">
            {t("aiPanel.wordCount")}
            <input type="number" min="1" value={aiRequest.wordCount} onChange={(event) => onRequestChange({ ...aiRequest, wordCount: event.target.value })} />
          </label>
        ) : null}
        <label className="wide-field">
          {t("aiPanel.request")}
          <textarea rows={7} value={aiPrompt || generatedRequest} onChange={(event) => onPromptChange(event.target.value)} />
        </label>
      </div>
      <button type="button" className="secondary-button full-width-button" onClick={onUseGeneratedRequest}>
        {t("aiPanel.generateRequest")}
      </button>
    </details>
  );
}
