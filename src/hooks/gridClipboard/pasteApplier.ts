import { createEmptyWordRow, type DictionaryConfig } from "../../models/dictionary";
import type { GridRow } from "../../types/grid";
import { createGridRowId } from "../../utils/rowId";
import { getCellText, setCellText } from "./cellText";

export type PastePlan = {
  columns: string[];
  startColumnIndex: number;
  clippedRows: string[][];
  focusedRowId?: string;
};

export function resolvePasteStartRowIndex(baseRows: GridRow[], focusedRowId?: string): number {
  if (focusedRowId) {
    const focusedIndex = baseRows.findIndex((row) => row.rowId === focusedRowId);
    if (focusedIndex >= 0) {
      return focusedIndex;
    }
  }
  return baseRows.length === 0 ? 0 : baseRows.length;
}

export function ensureRowsCapacity(
  baseRows: GridRow[],
  requiredRowsCount: number,
  config: DictionaryConfig
): GridRow[] {
  const next = [...baseRows];
  while (next.length < requiredRowsCount) {
    next.push({ ...createEmptyWordRow(config), rowId: createGridRowId() });
  }
  return next;
}

export function wouldPasteOverwrite(rows: GridRow[], config: DictionaryConfig, plan: PastePlan): boolean {
  const startRowIndex = resolvePasteStartRowIndex(rows, plan.focusedRowId);
  const targetRows = ensureRowsCapacity(rows, startRowIndex + plan.clippedRows.length, config);

  return plan.clippedRows.some((bufferRow, rowOffset) =>
    bufferRow.some((_, columnOffset) => {
      const rowIndex = startRowIndex + rowOffset;
      const targetColId = plan.columns[plan.startColumnIndex + columnOffset];
      const currentValue = getCellText(targetRows[rowIndex], targetColId, config.translationDelimiter);
      return currentValue.trim() !== "";
    })
  );
}

export function applyPastePlan(rows: GridRow[], config: DictionaryConfig, plan: PastePlan): GridRow[] {
  const startRowIndex = resolvePasteStartRowIndex(rows, plan.focusedRowId);
  const next = ensureRowsCapacity(rows, startRowIndex + plan.clippedRows.length, config);

  plan.clippedRows.forEach((bufferRow, rowOffset) => {
    const rowIndex = startRowIndex + rowOffset;
    let updatedRow = next[rowIndex];
    bufferRow.forEach((value, columnOffset) => {
      const targetColId = plan.columns[plan.startColumnIndex + columnOffset];
      updatedRow = setCellText(updatedRow, targetColId, value, config.translationDelimiter);
    });
    next[rowIndex] = updatedRow;
  });

  return next;
}
