import { useCallback, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { insertAiGeneratedRows } from "../ai/aiRowInsertion";
import {
  parseAiResponse,
  parseAiResponseRows,
  type DraftGridRow
} from "../ai/aiRows";
import {
  applyTranslationParseResult,
  buildAiRequestContext,
  type AiRequestModeChoice
} from "../ai/requestContext";
import type { AiParsingConfiguration } from "../ai/types";
import type { DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { attachGridRowIds } from "../utils/dictionaryHelpers";

type UseAiDraftHelperOptions = {
  config: DictionaryConfig;
  rows: GridRow[];
  selectedCellKeys: string[];
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
  t: (key: string, values?: Record<string, unknown>) => string;
};

export function useAiDraftHelper({
  config,
  rows,
  selectedCellKeys,
  setRows,
  setLastAction,
  t
}: UseAiDraftHelperOptions) {
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState(t("aiPanel.sampleResponse"));
  const [aiParseMessage, setAiParseMessage] = useState("");
  const [hasUnappliedAiChanges, setHasUnappliedAiChanges] = useState(true);
  const [isAiRequestOpen, setIsAiRequestOpen] = useState(true);
  const [isAiResponseOpen, setIsAiResponseOpen] = useState(true);
  const [isAiParsingOpen, setIsAiParsingOpen] = useState(true);
  const ignoreNextAiParsingConfigurationChange = useRef(false);
  const [aiRequestModeChoice, setAiRequestModeChoice] = useState<AiRequestModeChoice>("auto");

  const aiRequestContext = useMemo(() => buildAiRequestContext({
    config,
    rows,
    selectedCellKeys,
    modeChoice: aiRequestModeChoice
  }), [aiRequestModeChoice, config, rows, selectedCellKeys]);

  const handleAiResponseChange = useCallback((nextResponse: string) => {
    setAiResponse(nextResponse);
    setHasUnappliedAiChanges(true);
  }, []);

  const readParsedAiRows = useCallback((parsingConfiguration: AiParsingConfiguration) => {
    const parseResult = parseAiResponse(aiResponse, config, parsingConfiguration);
    const parsedRows = parseAiResponseRows(aiResponse, config, parsingConfiguration);
    setAiParseMessage(parseResult.unparsedLines.length > 0
      ? t("aiPanel.parseResultNotParsed", { lines: parseResult.unparsedLines.join("\n") })
      : t("aiPanel.parseResultAllParsed"));
    return parsedRows;
  }, [aiResponse, config]);

  const handleAddAiRows = useCallback((
    parsingConfiguration: AiParsingConfiguration,
    requestedTopic: string,
    wasPatternSuggested = false
  ) => {
    if (aiRequestContext.mode === "translations") {
      const parseResult = parseAiResponse(aiResponse, config, parsingConfiguration);
      if (parseResult.rows.length === 0) {
        setAiParseMessage(t("aiPanel.parseError"));
        return;
      }

      setRows((current) => applyTranslationParseResult(current, aiRequestContext, parseResult));
      setAiParseMessage(parseResult.unparsedLines.length > 0
        ? t("aiPanel.parseResultNotParsed", { lines: parseResult.unparsedLines.join("\n") })
        : t("aiPanel.parseResultAllParsed"));
      setLastAction({ key: "action.addAiRows" });
      if (wasPatternSuggested) {
        ignoreNextAiParsingConfigurationChange.current = true;
      }
      setHasUnappliedAiChanges(false);
      return;
    }

    const parsedRows = readParsedAiRows(parsingConfiguration);
    if (parsedRows.length === 0) {
      return;
    }

    setRows((current) =>
      insertAiGeneratedRows(
        current,
        attachGridRowIds(parsedRows),
        {
          topic: aiRequestContext.topic,
          topicRowId: aiRequestContext.topicRowId
        },
        requestedTopic
      )
    );

    setLastAction({ key: "action.addAiRows" });
    if (wasPatternSuggested) {
      ignoreNextAiParsingConfigurationChange.current = true;
    }
    setHasUnappliedAiChanges(false);
  }, [
    aiRequestContext,
    aiResponse,
    config,
    readParsedAiRows,
    setLastAction,
    setRows,
    t
  ]);

  const handleRegexRowsParsed = useCallback((_rows: DraftGridRow[]) => {
    setLastAction({ key: "action.parseAiRegex" });
  }, [setLastAction]);

  const handleAiRequestGenerated = useCallback(() => {
    setLastAction({ key: "action.generateAiRequest" });
  }, [setLastAction]);

  const handleAiParsingConfigurationChange = useCallback(() => {
    if (ignoreNextAiParsingConfigurationChange.current) {
      ignoreNextAiParsingConfigurationChange.current = false;
      return;
    }

    setHasUnappliedAiChanges(true);
  }, []);

  const toggleAiPanel = useCallback(() => {
    if (isAiPanelOpen) {
      setAiParseMessage("");
    }

    setIsAiPanelOpen((isOpen) => !isOpen);
  }, [isAiPanelOpen]);

  return {
    isAiPanelOpen,
    aiResponse,
    aiParseMessage,
    aiRequestModeChoice,
    aiRequestContext,
    hasUnappliedAiChanges,
    isAiRequestOpen,
    setIsAiRequestOpen,
    isAiResponseOpen,
    setIsAiResponseOpen,
    isAiParsingOpen,
    setIsAiParsingOpen,
    setAiRequestModeChoice,
    setAiParseMessage,
    handleAiResponseChange,
    handleAddAiRows,
    handleAiParsingConfigurationChange,
    handleRegexRowsParsed,
    handleAiRequestGenerated,
    toggleAiPanel
  };
}
