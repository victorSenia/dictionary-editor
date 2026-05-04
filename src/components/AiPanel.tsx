import React from "react";
import { useTranslation } from "react-i18next";
import type { AiRequestModeChoice } from "../ai/requestContext";
import type { DraftGridRow } from "../ai/aiRows";
import type { AiParsingConfiguration, AiRequestContext } from "../ai/types";
import type { DictionaryConfig } from "../models/dictionary";
import { useAiPanelController } from "../hooks/useAiPanelController";
import AiParsingSection, { type AiParsingSectionHandle } from "./AiParsingSection";
import AiRequestSection from "./ai/AiRequestSection";
import AiResponseSection from "./ai/AiResponseSection";
import { getParseMessageStatus } from "./ai/aiPanelStatus";

type AiPanelProps = {
  config: DictionaryConfig;
  requestContext: AiRequestContext;
  requestModeChoice: AiRequestModeChoice;
  response: string;
  parseMessage: string;
  lastAppliedAiSignature: string;
  onRequestModeChoiceChange: (choice: AiRequestModeChoice) => void;
  onResponseChange: (response: string) => void;
  onParseMessageChange: (message: string) => void;
  onParsingConfigurationChange: (configuration: AiParsingConfiguration | null) => void;
  onAddRows: (configuration: AiParsingConfiguration, topic: string) => void;
  onResponseParsed: (rows: DraftGridRow[]) => void;
  onRequestGenerated: () => void;
};

export default function AiPanel({
  config,
  requestContext,
  requestModeChoice,
  response,
  parseMessage,
  lastAppliedAiSignature,
  onRequestModeChoiceChange,
  onResponseChange,
  onParseMessageChange,
  onParsingConfigurationChange,
  onAddRows,
  onResponseParsed,
  onRequestGenerated
}: AiPanelProps) {
  const { t } = useTranslation();
  const parsingSectionRef = React.useRef<AiParsingSectionHandle>(null);
  const {
    aiRequest,
    aiPrompt,
    generatedRequest,
    aiApplySignature,
    setAiRequest,
    setAiPrompt,
    handleParsingConfigurationChange,
    parseCurrentResponse,
    addRows,
    useGeneratedRequest
  } = useAiPanelController({
    config,
    requestContext,
    requestModeChoice,
    response,
    lastAppliedAiSignature,
    parsingSectionRef,
    onRequestModeChoiceChange,
    onParseMessageChange,
    onParsingConfigurationChange,
    onAddRows,
    onResponseParsed,
    onRequestGenerated,
    t
  });

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
      />

      <AiParsingSection
        ref={parsingSectionRef}
        config={config}
        requestContext={requestContext}
        response={response}
        onParseMessageChange={onParseMessageChange}
        onParsingConfigurationChange={handleParsingConfigurationChange}
      />

      <AiResponseSection
        t={t}
        response={response}
        parseMessage={parseMessage}
        parseMessageStatus={getParseMessageStatus(parseMessage, t("aiPanel.parseError"))}
        addRowsLabel={requestContext.mode === "translations" ? "Fill translations" : t("aiPanel.addRows")}
        addRowsDisabled={lastAppliedAiSignature === aiApplySignature}
        onResponseChange={onResponseChange}
        onParseCurrentResponse={parseCurrentResponse}
        onAddRows={addRows}
      />
    </aside>
  );
}
