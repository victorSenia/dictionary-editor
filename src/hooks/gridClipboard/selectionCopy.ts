import type { GridApi } from "ag-grid-community";
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

  const selectableColumns = api
    .getAllDisplayedColumns()
    .map((column) => column.getColId())
    .filter((colId) => isSelectableGridColId(colId));
  const columnOrder = new Map(selectableColumns.map((colId, index) => [colId, index]));

  const displayedRowOrder = new Map<string, number>();
  const rowCount = api.getDisplayedRowCount();
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const rowId = api.getDisplayedRowAtIndex(rowIndex)?.data?.id;
    if (rowId) {
      displayedRowOrder.set(rowId, rowIndex);
    }
  }

  const selectedSet = new Set(selectedCellKeys);
  const selectedRowIds = Array.from(
    new Set(
      selectedCellKeys
        .map((key) => key.split("::")[0])
        .filter((rowId) => rowId && displayedRowOrder.has(rowId))
    )
  ).sort(
    (a, b) =>
      (displayedRowOrder.get(a) ?? Number.MAX_SAFE_INTEGER) -
      (displayedRowOrder.get(b) ?? Number.MAX_SAFE_INTEGER)
  );

  const selectedColIds = Array.from(
    new Set(
      selectedCellKeys
        .map((key) => key.split("::")[1])
        .filter((colId) => colId && columnOrder.has(colId))
    )
  ).sort(
    (a, b) =>
      (columnOrder.get(a) ?? Number.MAX_SAFE_INTEGER) - (columnOrder.get(b) ?? Number.MAX_SAFE_INTEGER)
  );

  if (selectedRowIds.length === 0 || selectedColIds.length === 0) {
    return null;
  }

  const rowById = new Map(rows.map((row) => [row.id, row]));
  const lines = selectedRowIds.map((rowId) => {
    const row = rowById.get(rowId);
    if (!row) {
      return selectedColIds.map(() => "").join("\t");
    }
    return selectedColIds
      .map((colId) =>
        selectedSet.has(`${rowId}::${colId}`) ? getCellText(row, colId, translationDelimiter) : ""
      )
      .join("\t");
  });

  return lines.join("\n");
}
