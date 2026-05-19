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
  parsingSectionRef: React.RefObject<AiParsingSectionHandle | null>;
  onRequestModeChoiceChange: (choice: AiRequestModeChoice) => void;
  onParseMessageChange: (message: string) => void;
  onParsingConfigurationChange?: (configuration: AiParsingConfiguration | null) => void;
  onAddRows: (configuration: AiParsingConfiguration, topic: string, wasPatternSuggested?: boolean) => void;
  onResponseParsed: (rows: DraftGridRow[]) => void;
  onRequestGenerated: () => void;
  t: (key: string, values?: Record<string, unknown>) => string;
};

const initialAiRequest: AiRequestState = {
  topic: "",
  wordCount: "100"
};

export function useAiPanelController({
  config,
  requestContext,
  response,
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
      onParsingConfigurationChange?.(configuration);
    },
    [onParsingConfigurationChange]
  );

  const generatedRequest = React.useMemo(
    () => buildAiRequest(aiRequest, config, t, requestContext),
    [aiRequest, config, requestContext, t]
  );

  const useGeneratedRequest = React.useCallback(() => {
    setAiPrompt(generatedRequest);
    onRequestGenerated();
  }, [generatedRequest, onRequestGenerated]);

  const ensureParsingConfiguration = React.useCallback((): {
    configuration: AiParsingConfiguration;
    wasSuggested: boolean;
  } | null => {
    if (parsingConfiguration?.itemPattern.trim()) {
      return { configuration: parsingConfiguration, wasSuggested: false };
    }

    const suggestedConfiguration = parsingSectionRef.current?.suggestPattern() ?? null;
    if (suggestedConfiguration) {
      setParsingConfiguration(suggestedConfiguration);
      return { configuration: suggestedConfiguration, wasSuggested: true };
    }

    return null;
  }, [parsingConfiguration, parsingSectionRef]);

  const parseCurrentResponse = React.useCallback(() => {
    const activeParsingConfiguration = ensureParsingConfiguration();
    if (!activeParsingConfiguration) {
      return;
    }

    try {
      const result = parseAiResponse(response, config, activeParsingConfiguration.configuration);
      onParseMessageChange(result.unparsedLines.length > 0
        ? t("aiPanel.parseResultNotParsed", { lines: result.unparsedLines.join("\n") })
        : t("aiPanel.parseResultAllParsed"));
      onResponseParsed(parseAiResponseRows(response, config, activeParsingConfiguration.configuration));
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      onParseMessageChange(message.startsWith("aiPanel.") ? t(message) : message || t("aiPanel.parseError"));
    }
  }, [config, ensureParsingConfiguration, onParseMessageChange, onResponseParsed, response, t]);

  const addRows = React.useCallback(() => {
    const activeParsingConfiguration = ensureParsingConfiguration();
    if (activeParsingConfiguration) {
      onAddRows(
        activeParsingConfiguration.configuration,
        aiRequest.topic.trim(),
        activeParsingConfiguration.wasSuggested
      );
    }
  }, [aiRequest.topic, ensureParsingConfiguration, onAddRows]);

  return {
    aiRequest,
    aiPrompt,
    generatedRequest,
    setAiRequest,
    setAiPrompt,
    handleParsingConfigurationChange,
    parseCurrentResponse,
    addRows,
    useGeneratedRequest
  };
}
