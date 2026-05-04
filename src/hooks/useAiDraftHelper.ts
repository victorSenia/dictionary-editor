import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from "react";
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
  t: (key: string) => string;
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
  const [lastAppliedAiSignature, setLastAppliedAiSignature] = useState("");
  const [aiRequestModeChoice, setAiRequestModeChoice] = useState<AiRequestModeChoice>("auto");

  const aiRequestContext = useMemo(() => buildAiRequestContext({
    config,
    rows,
    selectedCellKeys,
    modeChoice: aiRequestModeChoice
  }), [aiRequestModeChoice, config, rows, selectedCellKeys]);

  const handleAiResponseChange = useCallback((nextResponse: string) => {
    setAiResponse(nextResponse);
    setLastAppliedAiSignature("");
  }, []);

  const readParsedAiRows = useCallback((parsingConfiguration: AiParsingConfiguration) => {
    const parseResult = parseAiResponse(aiResponse, config, parsingConfiguration);
    const parsedRows = parseAiResponseRows(aiResponse, config, parsingConfiguration);
    setAiParseMessage(parseResult.unparsedLines.length > 0
      ? `Not parsed:\n${parseResult.unparsedLines.join("\n")}`
      : "All non-empty lines parsed.");
    return parsedRows;
  }, [aiResponse, config]);

  const handleAddAiRows = useCallback((parsingConfiguration: AiParsingConfiguration, requestedTopic: string) => {
    const activeApplySignature = [
      aiResponse,
      parsingConfiguration.itemPattern,
      parsingConfiguration.linePrefixPreset,
      requestedTopic.trim()
    ].join("\n");

    if (lastAppliedAiSignature === activeApplySignature) {
      return;
    }

    if (aiRequestContext.mode === "translations") {
      const parseResult = parseAiResponse(aiResponse, config, parsingConfiguration);
      if (parseResult.rows.length === 0) {
        setAiParseMessage(t("aiPanel.parseError"));
        return;
      }

      setRows((current) => applyTranslationParseResult(current, aiRequestContext, parseResult));
      setAiParseMessage(parseResult.unparsedLines.length > 0
        ? `Not parsed:\n${parseResult.unparsedLines.join("\n")}`
        : "All non-empty lines parsed.");
      setLastAction({ key: "action.addAiRows" });
      setLastAppliedAiSignature(activeApplySignature);
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
    setLastAppliedAiSignature(activeApplySignature);
  }, [
    aiRequestContext,
    aiResponse,
    config,
    lastAppliedAiSignature,
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

  const toggleAiPanel = useCallback(() => setIsAiPanelOpen((open) => !open), []);

  return {
    isAiPanelOpen,
    aiResponse,
    aiParseMessage,
    lastAppliedAiSignature,
    aiRequestModeChoice,
    aiRequestContext,
    setAiRequestModeChoice,
    setAiParseMessage,
    handleAiResponseChange,
    handleAddAiRows,
    handleRegexRowsParsed,
    handleAiRequestGenerated,
    toggleAiPanel
  };
}
