const CELL_KEY_SEPARATOR = "::";

export type ParsedCellKey = {
  rowId: string;
  colId: string;
};

export function createCellKey(rowId: string, colId: string): string {
  return `${rowId}${CELL_KEY_SEPARATOR}${colId}`;
}

export function parseCellKey(cellKey: string): ParsedCellKey | null {
  const separatorIndex = cellKey.indexOf(CELL_KEY_SEPARATOR);
  if (separatorIndex < 0) {
    return null;
  }

  const rowId = cellKey.slice(0, separatorIndex);
  const colId = cellKey.slice(separatorIndex + CELL_KEY_SEPARATOR.length);
  return rowId && colId ? { rowId, colId } : null;
}
