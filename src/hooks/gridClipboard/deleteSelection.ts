import { parseCellKey } from "../../grid/cellKey";
import type { GridRow } from "../../types/grid";
import { clearCellText } from "./cellText";

export function clearSelectedCellValues(rows: GridRow[], selectedCellKeys: string[]): GridRow[] {
  const next = [...rows];
  let changed = false;
  const rowIdToColumnIds = new Map<string, Set<string>>();

  selectedCellKeys.forEach((key) => {
    const parsed = parseCellKey(key);
    if (!parsed) {
      return;
    }
    if (!rowIdToColumnIds.has(parsed.rowId)) {
      rowIdToColumnIds.set(parsed.rowId, new Set<string>());
    }
    rowIdToColumnIds.get(parsed.rowId)?.add(parsed.colId);
  });

  const rowIndexById = new Map(next.map((row, index) => [row.rowId, index]));
  rowIdToColumnIds.forEach((columnIds, rowId) => {
    const rowIndex = rowIndexById.get(rowId);
    if (rowIndex == null) {
      return;
    }

    let updatedRow = next[rowIndex];
    columnIds.forEach((columnId) => {
      updatedRow = clearCellText(updatedRow, columnId);
    });

    if (updatedRow !== next[rowIndex]) {
      next[rowIndex] = updatedRow;
      changed = true;
    }
  });

  return changed ? next : rows;
}
