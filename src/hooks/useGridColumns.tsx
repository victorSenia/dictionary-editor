import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react";
import type { ColDef } from "ag-grid-community";
import { buildGridColumnDefs } from "../grid/columnDefs";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";

type Args = {
  showArticleColumn: boolean;
  showAdditionalInformationColumn: boolean;
  translationColumns: ColDef<GridRow>[];
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
  t: (key: string, values?: Record<string, unknown>) => string;
};

export function useGridColumns({
  showArticleColumn,
  showAdditionalInformationColumn,
  translationColumns,
  setRows,
  setLastAction,
  t
}: Args) {
  const updateRowById = useCallback(
    (rowId: string, transform: (row: GridRow) => GridRow) => {
      setRows((prev) => prev.map((row) => (row.rowId === rowId ? transform(row) : row)));
    },
    [setRows]
  );

  const columnDefs = useMemo<ColDef<GridRow>[]>(() => buildGridColumnDefs({
    showArticleColumn,
    showAdditionalInformationColumn,
    translationColumns,
    setRows,
    setLastAction,
    updateRowById,
    t
  }), [
    showArticleColumn,
    showAdditionalInformationColumn,
    translationColumns,
    setRows,
    setLastAction,
    updateRowById,
    t
  ]);

  return { columnDefs };
}
