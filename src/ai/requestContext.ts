import { parseCellKey } from "../grid/cellKey";
import { ROW_TYPE_TOPIC, ROW_TYPE_WORD, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { AiParseResult } from "./types";
import type { AiRequestContext, AiRequestMode, AiRequestWord } from "./types";

export type AiRequestModeChoice = "auto" | AiRequestMode;

type BuildAiRequestContextArgs = {
  config: DictionaryConfig;
  rows: GridRow[];
  selectedCellKeys: string[];
  modeChoice: AiRequestModeChoice;
};

function hasMissingTranslations(word: AiRequestWord): boolean {
  return word.missingLanguages.length > 0;
}

function resolveTopicFromSelection(
    rows: GridRow[],
    selectedIndex: number,
    mode: AiRequestMode
): { topic: string; topicRowId?: string } {
  const selectedRow = selectedIndex >= 0 ? rows[selectedIndex] : undefined;

  if (!selectedRow) {
    return { topic: "" };
  }

  if (selectedRow.type === ROW_TYPE_TOPIC) {
    return {
      topic: selectedRow.label,
      topicRowId: selectedRow.rowId
    };
  }

  if (mode !== "translations") {
    return { topic: "" };
  }

  for (let index = selectedIndex; index >= 0; index -= 1) {
    const row = rows[index];
    if (row?.type === ROW_TYPE_TOPIC) {
      return {
        topic: row.label,
        topicRowId: row.rowId
      };
    }
  }

  return { topic: "" };
}

function findTopicIndexByRowId(rows: GridRow[], topicRowId: string | undefined): number {
  if (!topicRowId) {
    return -1;
  }

  return rows.findIndex((row) => row.rowId === topicRowId && row.type === ROW_TYPE_TOPIC);
}

export function buildAiRequestContext({
                                        config,
                                        rows,
                                        selectedCellKeys,
                                        modeChoice
                                      }: BuildAiRequestContextArgs): AiRequestContext {
  const selectedCells = selectedCellKeys
    .map((key) => parseCellKey(key))
    .filter((cell): cell is NonNullable<typeof cell> => cell !== null);

  const selectedRowId = selectedCells[0]?.rowId ?? "";
  const selectedIndex = selectedRowId ? rows.findIndex((row) => row.rowId === selectedRowId) : -1;
  const startIndex = selectedIndex >= 0 ? selectedIndex : Math.max(0, rows.length - 1);

  const translationTopic = resolveTopicFromSelection(rows, startIndex, "translations");
  const translationTopicIndex = findTopicIndexByRowId(rows, translationTopic.topicRowId);

  const words = collectTopicWords({
    config,
    rows,
    topicIndex: translationTopicIndex,
    startIndex
  });

  const translationWords = words.filter(hasMissingTranslations);
  const targetLanguages = Array.from(new Set(translationWords.flatMap((word) => word.missingLanguages)));
  const guessedMode: AiRequestMode = translationWords.length > 0 ? "translations" : "vocabulary";
  const mode = modeChoice === "auto" ? guessedMode : modeChoice;

  const resolvedTopic = resolveTopicFromSelection(rows, startIndex, mode);

  return {
    mode,
    topic: resolvedTopic.topic,
    topicRowId: resolvedTopic.topicRowId,
    words: mode === "translations" ? translationWords : [],
    targetLanguages: mode === "translations" && targetLanguages.length > 0 ? targetLanguages : config.languagesTo
  };
}

type CollectTopicWordsArgs = {
  config: DictionaryConfig;
  rows: GridRow[];
  topicIndex: number;
  startIndex: number;
};

function collectTopicWords({
                             config,
                             rows,
                             topicIndex,
                             startIndex
                           }: CollectTopicWordsArgs): AiRequestWord[] {
  const collectFrom = topicIndex >= 0 ? topicIndex + 1 : startIndex;
  const words: AiRequestWord[] = [];

  for (let index = Math.max(0, collectFrom); index < rows.length; index += 1) {
    const row = rows[index];
    if (!row) {
      continue;
    }

    if (row.type === ROW_TYPE_TOPIC) {
      if (index !== startIndex) {
        break;
      }
      continue;
    }

    if (row.type !== ROW_TYPE_WORD || row.valueFrom.trim() === "") {
      continue;
    }

    const missingLanguages = config.languagesTo.filter((language) =>
        (row.valuesTo[language] ?? []).every((value) => value.trim() === "")
    );

    words.push({
      rowId: row.rowId,
      article: row.article,
      word: row.valueFrom,
      additionalInformation: row.additionalInformation,
      missingLanguages
    });
  }

  return words;
}

export function applyTranslationParseResult(
    rows: GridRow[],
    requestContext: AiRequestContext,
    parseResult: AiParseResult
): GridRow[] {
  return rows.map((row) => {
    if (row.type !== ROW_TYPE_WORD) {
      return row;
    }

    const wordIndex = requestContext.words.findIndex((word) => word.rowId === row.rowId);
    if (wordIndex < 0) {
      return row;
    }

    const parsed = parseResult.rows[wordIndex];
    if (!parsed) {
      return row;
    }

    const nextValuesTo = { ...row.valuesTo };

    for (const language of requestContext.words[wordIndex].missingLanguages) {
      const values = parsed.translationValues[language] ?? [];
      if (values.length > 0) {
        nextValuesTo[language] = values;
      }
    }

    return { ...row, valuesTo: nextValuesTo };
  });
}