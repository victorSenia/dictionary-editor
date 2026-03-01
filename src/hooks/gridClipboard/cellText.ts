import { ROW_TYPE_TOPIC } from "../../models/dictionary";
import type { DictionaryConfig } from "../../models/dictionary";
import type { GridRow } from "../../types/grid";
import { parseTranslationValue } from "../../utils/dictionaryHelpers";
import {
  COLUMN_ID_ADDITIONAL_INFO,
  COLUMN_ID_ARTICLE,
  COLUMN_ID_WORD,
  TRANSLATION_COLUMN_PREFIX
} from "../../constants/grid";

export function isSelectableGridColId(colId: string): boolean {
  return (
    colId === COLUMN_ID_ARTICLE ||
    colId === COLUMN_ID_WORD ||
    colId === COLUMN_ID_ADDITIONAL_INFO ||
    colId.startsWith(TRANSLATION_COLUMN_PREFIX)
  );
}

export function getPasteColumns(config: DictionaryConfig): string[] {
  return [
    COLUMN_ID_ARTICLE,
    COLUMN_ID_WORD,
    COLUMN_ID_ADDITIONAL_INFO,
    ...config.languagesTo.map((lang) => `${TRANSLATION_COLUMN_PREFIX}${lang}`)
  ];
}

export function buildRowCopyText(row: GridRow, config: DictionaryConfig): string {
  if (row.type === ROW_TYPE_TOPIC) {
    return row.label;
  }

  const columns = [row.article, row.valueFrom, row.additionalInformation];
  for (const language of config.languagesTo) {
    const values = row.valuesTo[language] ?? [];
    columns.push(values.join(`${config.translationDelimiter} `));
  }
  return columns.join("\t");
}

export function getCellText(row: GridRow, colId: string, translationDelimiter: string): string {
  if (row.type === ROW_TYPE_TOPIC) {
    if (colId === COLUMN_ID_ARTICLE || colId === COLUMN_ID_WORD) {
      return row.label;
    }
    return "";
  }

  if (colId === COLUMN_ID_ARTICLE) {
    return row.article;
  }
  if (colId === COLUMN_ID_WORD) {
    return row.valueFrom;
  }
  if (colId === COLUMN_ID_ADDITIONAL_INFO) {
    return row.additionalInformation;
  }
  if (colId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
    const lang = colId.slice(TRANSLATION_COLUMN_PREFIX.length);
    return (row.valuesTo[lang] ?? []).join(`${translationDelimiter} `);
  }
  return "";
}

export function setCellText(
  row: GridRow,
  colId: string,
  raw: string,
  translationDelimiter: string
): GridRow {
  if (row.type === ROW_TYPE_TOPIC) {
    if (colId === COLUMN_ID_ARTICLE || colId === COLUMN_ID_WORD) {
      return { ...row, label: raw };
    }
    return row;
  }

  if (colId === COLUMN_ID_ARTICLE) {
    return { ...row, article: raw };
  }
  if (colId === COLUMN_ID_WORD) {
    return { ...row, valueFrom: raw };
  }
  if (colId === COLUMN_ID_ADDITIONAL_INFO) {
    return { ...row, additionalInformation: raw };
  }
  if (colId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
    const lang = colId.slice(TRANSLATION_COLUMN_PREFIX.length);
    return {
      ...row,
      valuesTo: {
        ...row.valuesTo,
        [lang]: parseTranslationValue(raw, translationDelimiter)
      }
    };
  }
  return row;
}

export function clearCellText(row: GridRow, colId: string): GridRow {
  if (row.type === ROW_TYPE_TOPIC) {
    if (colId === COLUMN_ID_ARTICLE || colId === COLUMN_ID_WORD) {
      if (row.label === "") {
        return row;
      }
      return { ...row, label: "" };
    }
    return row;
  }

  if (colId === COLUMN_ID_ARTICLE) {
    return row.article === "" ? row : { ...row, article: "" };
  }
  if (colId === COLUMN_ID_WORD) {
    return row.valueFrom === "" ? row : { ...row, valueFrom: "" };
  }
  if (colId === COLUMN_ID_ADDITIONAL_INFO) {
    return row.additionalInformation === "" ? row : { ...row, additionalInformation: "" };
  }
  if (colId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
    const lang = colId.slice(TRANSLATION_COLUMN_PREFIX.length);
    const currentValues = row.valuesTo[lang] ?? [];
    if (currentValues.length === 0) {
      return row;
    }
    return {
      ...row,
      valuesTo: {
        ...row.valuesTo,
        [lang]: []
      }
    };
  }
  return row;
}
