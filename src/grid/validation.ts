import type { CellClassParams } from "ag-grid-community";
import { ROW_TYPE_TOPIC, ROW_TYPE_WORD, type DictionaryConfig, type DictionaryRow } from "../models/dictionary";
import { TRANSLATION_COLUMN_PREFIX, COLUMN_ID_WORD } from "../constants/grid";

export type CellValidationResult = {
  isValid: boolean;
  reasonKey: string;
  reasonValues?: Record<string, string>;
};

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
    return { isValid: true, reasonKey: "" };
  }

  const text = asText(params.value);
  const colId = params.column.getColId();

  if (colId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
    const language = colId.slice(TRANSLATION_COLUMN_PREFIX.length);
    const translations = row.valuesTo[language] ?? [];

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

  if (text.includes(config.delimiter)) {
    return {
      isValid: false,
      reasonKey: "validation.containsColumnDelimiter",
      reasonValues: { delimiter: config.delimiter }
    };
  }

  if (row.type === ROW_TYPE_WORD && colId === COLUMN_ID_WORD) {
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
