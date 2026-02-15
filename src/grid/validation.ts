import type { CellClassParams } from "ag-grid-community";
import { ROW_TYPE_TOPIC, ROW_TYPE_WORD, type DictionaryConfig, type DictionaryRow } from "../models/dictionary.ts";
import {
  COLUMN_ID_ADDITIONAL_INFO,
  COLUMN_ID_ARTICLE,
  COLUMN_ID_WORD,
  TRANSLATION_COLUMN_PREFIX
} from "../constants/grid.ts";

export type CellValidationResult = {
  isValid: boolean;
  reasonKey: string;
  reasonValues?: Record<string, string>;
};

function validateWordCellByColId(
  row: Extract<DictionaryRow, { type: typeof ROW_TYPE_WORD }>,
  colId: string,
  text: string,
  config: DictionaryConfig
): CellValidationResult {
  if (colId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
    const language = colId.slice(TRANSLATION_COLUMN_PREFIX.length);
    const translations = row.valuesTo[language] ?? [];

    if (translations.length === 0 || translations.some((translation) => translation.trim() === "")) {
      return {
        isValid: false,
        reasonKey: "validation.emptyTranslationNotAllowed"
      };
    }

    for (const translation of translations) {
      if (translation.includes(config.delimiter)) {
        return {
          isValid: false,
          reasonKey: "validation.translationContainsColumnDelimiter",
          reasonValues: { delimiter: config.delimiter }
        };
      }
    }

    return { isValid: true, reasonKey: "" };
  }

  if (colId === COLUMN_ID_ARTICLE) {
    if (config.topicFlag !== "" && text.startsWith(config.topicFlag)) {
      return {
        isValid: false,
        reasonKey: "validation.containsTopicFlag",
        reasonValues: { topicFlag: config.topicFlag }
      };
    }

    const normalizedArticle = text.trim();
    if (normalizedArticle === "") {
      return { isValid: true, reasonKey: "" };
    }

    const allowedArticles = new Set(config.articles.map((article) => article.trim()));
    if (!allowedArticles.has(normalizedArticle)) {
      return {
        isValid: false,
        reasonKey: "validation.articleNotInConfig",
        reasonValues: { article: text }
      };
    }
  }

  if (text.includes(config.delimiter)) {
    return {
      isValid: false,
      reasonKey: "validation.containsColumnDelimiter",
      reasonValues: { delimiter: config.delimiter }
    };
  }

  if (colId === COLUMN_ID_WORD) {
    if (text.trim() === "") {
      return {
        isValid: false,
        reasonKey: "validation.emptyWordNotAllowed"
      };
    }

    if (text.includes(config.additionalInformationDelimiter)) {
      return {
        isValid: false,
        reasonKey: "validation.containsAdditionalInformationDelimiter",
        reasonValues: { delimiter: config.additionalInformationDelimiter }
      };
    }

    if (text.includes(config.topicFlag)) {
      return {
        isValid: false,
        reasonKey: "validation.containsTopicFlag",
        reasonValues: { topicFlag: config.topicFlag }
      };
    }
  }

  return { isValid: true, reasonKey: "" };
}

function asText(value: unknown): string {
  if (value == null) {
    return "";
  }
  return String(value);
}

export function validateCell(
  params: CellClassParams<DictionaryRow | (DictionaryRow & { id: string })>,
  config: DictionaryConfig,
  row: DictionaryRow
): CellValidationResult {
  if (row.type === ROW_TYPE_TOPIC) {
    if (row.label.trim() === "") {
      return {
        isValid: false,
        reasonKey: "validation.emptyTopicNotAllowed"
      };
    }
    return { isValid: true, reasonKey: "" };
  }

  const text = asText(params.value);
  const colId = params.column.getColId();
  return validateWordCellByColId(row, colId, text, config);
}

export function isRowInvalid(row: DictionaryRow, config: DictionaryConfig): boolean {
  if (row.type === ROW_TYPE_TOPIC) {
    return row.label.trim() === "";
  }

  if (row.type !== ROW_TYPE_WORD) {
    return false;
  }

  const baseColumns: Array<{ colId: string; value: string }> = [
    { colId: COLUMN_ID_WORD, value: row.valueFrom },
    { colId: COLUMN_ID_ARTICLE, value: row.article },
    { colId: COLUMN_ID_ADDITIONAL_INFO, value: row.additionalInformation }
  ];

  const hasInvalidBase = baseColumns.some(
    ({ colId, value }) => !validateWordCellByColId(row, colId, value, config).isValid
  );
  if (hasInvalidBase) {
    return true;
  }

  return Object.keys(row.valuesTo).some((language) => {
    const colId = `${TRANSLATION_COLUMN_PREFIX}${language}`;
    return !validateWordCellByColId(row, colId, "", config).isValid;
  });
}
