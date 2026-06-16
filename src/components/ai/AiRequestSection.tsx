import type { AiRequestModeChoice } from "../../ai/requestContext";
import type { AiRequestContext, AiRequestState } from "../../ai/types";

type AiRequestSectionProps = {
  t: (key: string, values?: Record<string, unknown>) => string;
  aiRequest: AiRequestState;
  aiPrompt: string;
  generatedRequest: string;
  requestContext: AiRequestContext;
  requestModeChoice: AiRequestModeChoice;
  onRequestChange: (request: AiRequestState) => void;
  onPromptChange: (prompt: string) => void;
  onRequestModeChoiceChange: (mode: AiRequestModeChoice) => void;
  onUseGeneratedRequest: () => void;
  onSendRequest: () => void;
  isSendingRequest: boolean;
  canSendRequest: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
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
  onUseGeneratedRequest,
  onSendRequest,
  isSendingRequest,
  canSendRequest,
  isOpen,
  onOpenChange
}: AiRequestSectionProps) {
  return (
    <details
      open={isOpen}
      className="ai-section"
      onToggle={(event) => onOpenChange(event.currentTarget.open)}
    >
      <summary>{t("aiPanel.requestSection")}</summary>
      <div className="ai-form-grid">
        <label className="compact-field mode-field">
          {t("aiPanel.requestMode")}
          <select
            value={requestModeChoice}
            onChange={(event) => onRequestModeChoiceChange(event.target.value as AiRequestModeChoice)}
          >
            <option value="auto">{t("aiPanel.requestModeAuto")}</option>
            <option value="vocabulary">{t("aiPanel.requestModeVocabulary")}</option>
            <option value="translations">{t("aiPanel.requestModeTranslations")}</option>
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
          <textarea
            rows={7}
            value={aiPrompt || generatedRequest}
            onChange={(event) => onPromptChange(event.target.value)}
            aria-label={t("aiPanel.requestSection")}
          />
        </label>
      </div>
      <div className="ai-actions">
        <button
            type="button"
            className="secondary-button"
            onClick={onUseGeneratedRequest}
            disabled={isSendingRequest}
        >
          {t("aiPanel.generateRequest")}
        </button>

        <button
            type="button"
            className="primary-button"
            onClick={onSendRequest}
            disabled={!canSendRequest}
        >
          {isSendingRequest
              ? t("aiPanel.sendingRequest")
              : t("aiPanel.sendRequest")}
        </button>
      </div>
    </details>
  );
}
