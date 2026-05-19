import type { GridApi } from "ag-grid-community";
import { createCellKey, parseCellKey } from "../../grid/cellKey";
import type { GridRow } from "../../types/grid";
import { getCellText, isSelectableGridColId } from "./cellText";

type Args = {
  api: GridApi<GridRow>;
  selectedCellKeys: string[];
  rows: GridRow[];
  translationDelimiter: string;
};

export function buildSelectedCellsCopyText({
  api,
  selectedCellKeys,
  rows,
  translationDelimiter
}: Args): string | null {
  if (selectedCellKeys.length === 0) {
    return null;
  }

  const selectableColumns: string[] = api
    .getAllDisplayedColumns()
    .map((column) => column.getColId())
    .filter((colId): colId is string => isSelectableGridColId(String(colId)));
  const columnOrder = new Map<string, number>(selectableColumns.map((colId, index) => [colId, index]));

  const displayedRowOrder = new Map<string, number>();
  const rowCount = api.getDisplayedRowCount();
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const rowId = api.getDisplayedRowAtIndex(rowIndex)?.data?.rowId;
    if (rowId) {
      displayedRowOrder.set(rowId, rowIndex);
    }
  }

  const selectedSet = new Set(selectedCellKeys);
  const selectedRowIds = Array.from(
    new Set(
      selectedCellKeys
        .map((key) => parseCellKey(key)?.rowId ?? "")
        .filter((rowId): rowId is string => Boolean(rowId) && displayedRowOrder.has(rowId))
    )
  ).sort(
    (a, b) =>
      Number(displayedRowOrder.get(a) ?? Number.MAX_SAFE_INTEGER) -
      Number(displayedRowOrder.get(b) ?? Number.MAX_SAFE_INTEGER)
  );

  const selectedColIds = Array.from(
    new Set(
      selectedCellKeys
        .map((key) => parseCellKey(key)?.colId ?? "")
        .filter((colId): colId is string => Boolean(colId) && columnOrder.has(colId))
    )
  ).sort(
    (a, b) =>
      Number(columnOrder.get(a) ?? Number.MAX_SAFE_INTEGER) - Number(columnOrder.get(b) ?? Number.MAX_SAFE_INTEGER)
  );

  if (selectedRowIds.length === 0 || selectedColIds.length === 0) {
    return null;
  }

  const rowById = new Map(rows.map((row) => [row.rowId, row]));
  const lines = selectedRowIds.map((rowId) => {
    const row = rowById.get(rowId);
    if (!row) {
      return selectedColIds.map(() => "").join("\t");
    }
    return selectedColIds
      .map((colId) =>
        selectedSet.has(createCellKey(rowId, colId)) ? getCellText(row, colId, translationDelimiter) : ""
      )
      .join("\t");
  });

  return lines.join("\n");
}
