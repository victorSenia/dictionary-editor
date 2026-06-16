import React from "react";
import {
  parseAiResponse,
  parseAiResponseRows,
  type DraftGridRow
} from "../ai/aiRows";
import { suggestAiParsingConfiguration } from "../ai/patterns/suggestions";
import { buildAiRequest } from "../ai/requestBuilder";
import { sendAiDraftRequest } from "../ai/remoteAiRequest";
import type {
  AiParsingConfiguration,
  AiRequestContext,
  AiRequestState
} from "../ai/types";
import type { DictionaryConfig } from "../models/dictionary";

export type UseAiPanelControllerOptions = {
  config: DictionaryConfig;
  requestContext: AiRequestContext;
  response: string;
  parsingConfiguration: AiParsingConfiguration | null;
  setParsingConfiguration: (configuration: AiParsingConfiguration | null) => void;
  onResponseChange: (response: string) => void;
  onParseMessageChange: (message: string) => void;
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
  parsingConfiguration,
  setParsingConfiguration,
  onParseMessageChange,
  onResponseChange,
  onAddRows,
  onResponseParsed,
  onRequestGenerated,
  t
}: UseAiPanelControllerOptions) {
  const [aiRequest, setAiRequest] = React.useState<AiRequestState>(initialAiRequest);
  const [aiPrompt, setAiPrompt] = React.useState("");
  const [isSendingRequest, setIsSendingRequest] = React.useState(false);
  const [requestError, setRequestError] = React.useState("");

  React.useEffect(() => {
    if (!requestContext.topic) {
      return;
    }

    setAiRequest((current) => (
      current.topic === requestContext.topic ? current : { ...current, topic: requestContext.topic }
    ));
  }, [requestContext.topic]);

  const generatedRequest = React.useMemo(
    () => buildAiRequest(aiRequest, config, t, requestContext),
    [aiRequest, config, requestContext, t]
  );

  const effectiveRequest = aiPrompt || generatedRequest;
  const normalizedRequest = effectiveRequest.trim();
  const canSendRequest = normalizedRequest.length > 0 && !isSendingRequest;

  const useGeneratedRequest = React.useCallback(() => {
    setAiPrompt(generatedRequest);
    onRequestGenerated();
  }, [generatedRequest, onRequestGenerated]);

  const suggestAndApplyPattern = React.useCallback((responseText: string) => {
    const targetLanguages = requestContext.mode === "translations"
      ? requestContext.targetLanguages
      : config.languagesTo;
    const suggestion = suggestAiParsingConfiguration(
      responseText,
      targetLanguages,
      config.articles,
      requestContext.mode === "translations"
    );

    if (!suggestion) {
      onParseMessageChange(t("aiPanel.parseError"));
      return null;
    }

    setParsingConfiguration(suggestion.configuration);
    onParseMessageChange(t("aiPanel.patternSuggested", {
      matched: suggestion.matchedLines,
      total: suggestion.totalLines
    }));
    return suggestion;
  }, [
    config.articles,
    config.languagesTo,
    onParseMessageChange,
    requestContext.mode,
    requestContext.targetLanguages,
    setParsingConfiguration,
    t
  ]);

  const suggestPattern = React.useCallback(() => {
    suggestAndApplyPattern(response);
  }, [response, suggestAndApplyPattern]);

  const sendRequest = React.useCallback(async () => {
    const requestToSend = effectiveRequest.trim();

    if (!requestToSend || isSendingRequest) {
      return;
    }

    setIsSendingRequest(true);
    setRequestError("");

    try {
      const responseText = await sendAiDraftRequest(requestToSend);

      onResponseChange(responseText);
      suggestAndApplyPattern(responseText);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";

      setRequestError(
        message.startsWith("aiPanel.")
          ? t(message)
          : message || t("aiPanel.requestFailed")
      );
    } finally {
      setIsSendingRequest(false);
    }
  }, [
    effectiveRequest,
    isSendingRequest,
    onParseMessageChange,
    onResponseChange,
    suggestAndApplyPattern,
    t
  ]);

  const ensureParsingConfiguration = React.useCallback((): {
    configuration: AiParsingConfiguration;
    wasSuggested: boolean;
  } | null => {
    if (parsingConfiguration?.itemPattern.trim()) {
      return { configuration: parsingConfiguration, wasSuggested: false };
    }

    const suggestion = suggestAndApplyPattern(response);
    return suggestion
      ? { configuration: suggestion.configuration, wasSuggested: true }
      : null;
  }, [parsingConfiguration, response, suggestAndApplyPattern]);

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
  };
}
