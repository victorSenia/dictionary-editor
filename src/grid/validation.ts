import type { CellClassParams } from "ag-grid-community";
import type { DictionaryConfig, DictionaryRow } from "../models/dictionary";

export type CellValidationResult = {
  isValid: boolean;
  reason: string;
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
  if (row.type === "topic") {
    return { isValid: true, reason: "" };
  }

  const text = asText(params.value);
  const colId = params.column.getColId();

  if (colId.startsWith("to-")) {
    const language = colId.slice(3);
    const translations = row.valuesTo[language] ?? [];

    for (const translation of translations) {
      if (translation.includes(config.delimiter)) {
        return {
          isValid: false,
          reason: `Translation contains forbidden column delimiter "${config.delimiter}"`
        };
      }
    }

    return { isValid: true, reason: "" };
  }

  if (text.includes(config.delimiter)) {
    return {
      isValid: false,
      reason: `Contains forbidden column delimiter "${config.delimiter}"`
    };
  }

  if (row.type === "word" && colId === "word") {
    if (text.includes(config.additionalInformationDelimiter)) {
      return {
        isValid: false,
        reason: `Contains forbidden additional information delimiter "${config.additionalInformationDelimiter}"`
      };
    }

    if (text.includes(config.topicFlag)) {
      return {
        isValid: false,
        reason: `Contains forbidden topic flag "${config.topicFlag}"`
      };
    }
  }

  return { isValid: true, reason: "" };
}
