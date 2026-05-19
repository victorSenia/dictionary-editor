import { useCallback, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { AgGridReact } from "ag-grid-react";
import { parseCellKey } from "../grid/cellKey";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { useGridCellSelection } from "./useGridCellSelection";
import { useRowDragReorder } from "./useRowDragReorder";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  rows: GridRow[];
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useGridSelectionAndRowDrag({ gridRef, rows, setRows, setLastAction }: Args) {
  const cellSelection = useGridCellSelection({ gridRef, rows });
  const rowDrag = useRowDragReorder({ setRows });

  const deleteRowsWithSelectedCells = useCallback(() => {
    const selectedRowIds = new Set(
      cellSelection.selectedCellKeys
        .map((cellKey) => parseCellKey(cellKey)?.rowId ?? "")
        .filter((rowId) => rowId !== "")
    );
    if (selectedRowIds.size === 0) {
      return;
    }

    setRows((prev) => prev.filter((row) => !selectedRowIds.has(row.rowId)));
    cellSelection.clearCellSelection();
    setLastAction({ key: "action.removeSelectedRows" });
  }, [cellSelection, setLastAction, setRows]);

  return {
    ...cellSelection,
    ...rowDrag,
    deleteRowsWithSelectedCells
  };
}
