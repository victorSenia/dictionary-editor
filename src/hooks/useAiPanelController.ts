import React from "react";
import {
  parseAiResponse,
  parseAiResponseRows,
  type DraftGridRow
} from "../ai/aiRows";
import { buildAiRequest } from "../ai/requestBuilder";
import type { AiRequestModeChoice } from "../ai/requestContext";
import type {
  AiParsingConfiguration,
  AiRequestContext,
  AiRequestState
} from "../ai/types";
import type { AiParsingSectionHandle } from "../components/AiParsingSection";
import type { DictionaryConfig } from "../models/dictionary";

export type UseAiPanelControllerOptions = {
  config: DictionaryConfig;
  requestContext: AiRequestContext;
  requestModeChoice: AiRequestModeChoice;
  response: string;
  lastAppliedAiSignature: string;
  parsingSectionRef: React.RefObject<AiParsingSectionHandle | null>;
  onRequestModeChoiceChange: (choice: AiRequestModeChoice) => void;
  onParseMessageChange: (message: string) => void;
  onParsingConfigurationChange: (configuration: AiParsingConfiguration | null) => void;
  onAddRows: (configuration: AiParsingConfiguration, topic: string) => void;
  onResponseParsed: (rows: DraftGridRow[]) => void;
  onRequestGenerated: () => void;
  t: (key: string) => string;
};

const initialAiRequest: AiRequestState = {
  topic: "",
  wordCount: "100"
};

export function useAiPanelController({
  config,
  requestContext,
  response,
  lastAppliedAiSignature,
  parsingSectionRef,
  onParseMessageChange,
  onParsingConfigurationChange,
  onAddRows,
  onResponseParsed,
  onRequestGenerated,
  t
}: UseAiPanelControllerOptions) {
  const [aiRequest, setAiRequest] = React.useState<AiRequestState>(initialAiRequest);
  const [parsingConfiguration, setParsingConfiguration] = React.useState<AiParsingConfiguration | null>(null);
  const [aiPrompt, setAiPrompt] = React.useState("");

  React.useEffect(() => {
    if (!requestContext.topic) {
      return;
    }

    setAiRequest((current) => (
      current.topic === requestContext.topic ? current : { ...current, topic: requestContext.topic }
    ));
  }, [requestContext.topic]);

  const handleParsingConfigurationChange = React.useCallback(
    (configuration: AiParsingConfiguration | null) => {
      setParsingConfiguration(configuration);
      onParsingConfigurationChange(configuration);
    },
    [onParsingConfigurationChange]
  );

  const generatedRequest = React.useMemo(
    () => buildAiRequest(aiRequest, config, requestContext),
    [aiRequest, config, requestContext]
  );

  const useGeneratedRequest = React.useCallback(() => {
    setAiPrompt(generatedRequest);
    onRequestGenerated();
  }, [generatedRequest, onRequestGenerated]);

  const ensureParsingConfiguration = React.useCallback(() => {
    if (parsingConfiguration?.itemPattern.trim()) {
      return parsingConfiguration;
    }

    const suggestedConfiguration = parsingSectionRef.current?.suggestPattern() ?? null;
    if (suggestedConfiguration) {
      setParsingConfiguration(suggestedConfiguration);
    }
    return suggestedConfiguration;
  }, [parsingConfiguration, parsingSectionRef]);

  const aiApplySignature = React.useMemo(() => [
    response,
    parsingConfiguration?.itemPattern ?? "",
    parsingConfiguration?.linePrefixPreset ?? "",
    aiRequest.topic.trim()
  ].join("\n"), [aiRequest.topic, parsingConfiguration, response]);

  const parseCurrentResponse = React.useCallback(() => {
    const activeParsingConfiguration = ensureParsingConfiguration();
    if (!activeParsingConfiguration) {
      return;
    }

    try {
      const result = parseAiResponse(response, config, activeParsingConfiguration);
      onParseMessageChange(result.unparsedLines.length > 0
        ? `Not parsed:\n${result.unparsedLines.join("\n")}`
        : "All non-empty lines parsed.");
      onResponseParsed(parseAiResponseRows(response, config, activeParsingConfiguration));
    } catch (error) {
      onParseMessageChange(error instanceof Error ? error.message : t("aiPanel.parseError"));
    }
  }, [config, ensureParsingConfiguration, onParseMessageChange, onResponseParsed, response, t]);

  const addRows = React.useCallback(() => {
    const activeParsingConfiguration = ensureParsingConfiguration();
    if (activeParsingConfiguration) {
      onAddRows(activeParsingConfiguration, aiRequest.topic.trim());
    }
  }, [aiRequest.topic, ensureParsingConfiguration, onAddRows]);

  return {
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
  };
}
