import React from "react";
import { useTranslation } from "react-i18next";
import type { AiRequestModeChoice } from "../ai/requestContext";
import type { DraftGridRow } from "../ai/aiRows";
import type { AiParsingConfiguration, AiRequestContext } from "../ai/types";
import type { DictionaryConfig } from "../models/dictionary";
import { useAiPanelController } from "../hooks/useAiPanelController";
import AiParsingSection from "./AiParsingSection";
import AiRequestSection from "./ai/AiRequestSection";
import AiResponseSection from "./ai/AiResponseSection";

function getParseMessageStatus(
  parseMessage: string,
  fallbackErrorMessage: string,
  notParsedPrefix: string
): string {
  const suggestedPatternMatch = /^.*?(\d+)\/(\d+).*?$/.exec(parseMessage);

  if (parseMessage.startsWith(notParsedPrefix)) {
    return "warning";
  }

  if (parseMessage === fallbackErrorMessage) {
    return "error";
  }

  if (suggestedPatternMatch && suggestedPatternMatch[1] !== suggestedPatternMatch[2]) {
    return "warning";
  }

  return parseMessage ? "ok" : "";
}

type AiPanelProps = {
  config: DictionaryConfig;
  requestContext: AiRequestContext;
  requestModeChoice: AiRequestModeChoice;
  response: string;
  parseMessage: string;
  hasUnappliedAiChanges: boolean;
  isRequestOpen: boolean;
  onRequestOpenChange: (isOpen: boolean) => void;
  isResponseOpen: boolean;
  onResponseOpenChange: (isOpen: boolean) => void;
  isParsingOpen: boolean;
  onParsingOpenChange: (isOpen: boolean) => void;
  onRequestModeChoiceChange: (choice: AiRequestModeChoice) => void;
  onResponseChange: (response: string) => void;
  onParseMessageChange: (message: string) => void;
  onParsingConfigurationChange: () => void;
  onAddRows: (configuration: AiParsingConfiguration, topic: string, wasPatternSuggested?: boolean) => void;
  onResponseParsed: (rows: DraftGridRow[]) => void;
  onRequestGenerated: () => void;
};

export default function AiPanel({
  config,
  requestContext,
  requestModeChoice,
  response,
  parseMessage,
  hasUnappliedAiChanges,
  isRequestOpen,
  onRequestOpenChange,
  isResponseOpen,
  onResponseOpenChange,
  isParsingOpen,
  onParsingOpenChange,
  onRequestModeChoiceChange,
  onResponseChange,
  onParseMessageChange,
  onParsingConfigurationChange,
  onAddRows,
  onResponseParsed,
  onRequestGenerated
}: AiPanelProps) {
  const { t } = useTranslation();
  const [parsingConfiguration, setParsingConfigurationState] =
    React.useState<AiParsingConfiguration | null>(null);
  const setParsingConfiguration = React.useCallback(
    (configuration: AiParsingConfiguration | null) => {
      setParsingConfigurationState(configuration);
      onParsingConfigurationChange();
    },
    [onParsingConfigurationChange]
  );
  const {
    aiRequest,
    aiPrompt,
    generatedRequest,
    isSendingRequest,
    requestError,
    canSendRequest,
    setAiRequest,
    setAiPrompt,
    parseCurrentResponse,
    addRows,
    useGeneratedRequest,
    suggestPattern,
    sendRequest
  } = useAiPanelController({
    config,
    requestContext,
    response,
    parsingConfiguration,
    setParsingConfiguration,
    onResponseChange,
    onParseMessageChange,
    onAddRows,
    onResponseParsed,
    onRequestGenerated,
    t
  });

  const parseMessageStatus = getParseMessageStatus(
    parseMessage,
    t("aiPanel.parseError"),
    t("aiPanel.parseResultNotParsedPrefix")
  );

  return (
    <aside className="ai-panel" aria-label={t("aiPanel.title")}>
      <div className="ai-panel-header">
        <h2>{t("aiPanel.title")}</h2>
      </div>

      <AiRequestSection
        t={t}
        aiRequest={aiRequest}
        aiPrompt={aiPrompt}
        generatedRequest={generatedRequest}
        requestContext={requestContext}
        requestModeChoice={requestModeChoice}
        onRequestChange={setAiRequest}
        onPromptChange={setAiPrompt}
        onRequestModeChoiceChange={onRequestModeChoiceChange}
        onUseGeneratedRequest={useGeneratedRequest}
        onSendRequest={sendRequest}
        isSendingRequest={isSendingRequest}
        canSendRequest={canSendRequest}
        isOpen={isRequestOpen}
        onOpenChange={onRequestOpenChange}
      />

      {requestError ? (
        <pre className="parse-message parse-message-error">{requestError}</pre>
      ) : null}

      <AiResponseSection
        t={t}
        response={response}
        onResponseChange={onResponseChange}
        isOpen={isResponseOpen}
        onOpenChange={onResponseOpenChange}
      />

      <AiParsingSection
        config={config}
        requestContext={requestContext}
        onSuggestPattern={suggestPattern}
        parsingConfiguration={parsingConfiguration}
        setParsingConfiguration={setParsingConfiguration}
        isOpen={isParsingOpen}
        onOpenChange={onParsingOpenChange}
      />

      {parseMessage ? (
        <pre className={`parse-message ${parseMessageStatus ? `parse-message-${parseMessageStatus}` : ""}`}>{parseMessage}</pre>
      ) : null}

      <div className="ai-actions ai-parse-actions">
        <button type="button" className="secondary-button" onClick={parseCurrentResponse}>
          {t("aiPanel.parseResponse")}
        </button>
        <button type="button" className="primary-button" onClick={addRows} disabled={!response.trim() || !hasUnappliedAiChanges}>
          {requestContext.mode === "translations" ? t("aiPanel.fillTranslations") : t("aiPanel.addRows")}
        </button>
      </div>
    </aside>
  );
}
