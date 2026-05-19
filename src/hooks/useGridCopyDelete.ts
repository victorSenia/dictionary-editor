import { useCallback, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { CellKeyDownEvent } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { copyFromGridSelection } from "./gridClipboard/copyController";
import { clearSelectedCellValues } from "./gridClipboard/deleteSelection";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  config: DictionaryConfig;
  rows: GridRow[];
  selectedCellKeys: string[];
  clearSelectedCells: () => void;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useGridCopyDelete({
  gridRef,
  config,
  rows,
  selectedCellKeys,
  clearSelectedCells,
  setRows,
  setLastAction
}: Args) {
  const deleteSelectedCells = useCallback(() => {
    if (selectedCellKeys.length === 0) {
      return false;
    }

    setRows((prev) => clearSelectedCellValues(prev, selectedCellKeys));
    clearSelectedCells();
    setLastAction({ key: "action.clearSelectedCells" });
    return true;
  }, [clearSelectedCells, selectedCellKeys, setLastAction, setRows]);

  const copyCurrentSelection = useCallback(
    (event: CellKeyDownEvent<GridRow>) => {
      const result = copyFromGridSelection({
        api: gridRef.current?.api,
        event,
        config,
        rows,
        selectedCellKeys
      });
      if (result === "selected") {
        setLastAction({ key: "action.copySelected" });
      } else if (result === "cell") {
        setLastAction({ key: "action.copy" });
      }
      return result !== "none";
    },
    [config, gridRef, rows, selectedCellKeys, setLastAction]
  );

  return { deleteSelectedCells, copyCurrentSelection };
}
