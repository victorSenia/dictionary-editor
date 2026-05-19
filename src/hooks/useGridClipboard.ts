import { useCallback, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { CellKeyDownEvent } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { isEditableElement } from "./gridClipboard/clipboardIo";
import { useGridCopyDelete } from "./useGridCopyDelete";
import { useGridPaste } from "./useGridPaste";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  config: DictionaryConfig;
  rows: GridRow[];
  selectedCellKeys: string[];
  clearSelectedCells: () => void;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useGridClipboard({
  gridRef,
  config,
  rows,
  selectedCellKeys,
  clearSelectedCells,
  setRows,
  setLastAction
}: Args) {
  useGridPaste({ gridRef, config, rows, setRows, setLastAction });
  const { deleteSelectedCells, copyCurrentSelection } = useGridCopyDelete({
    gridRef,
    config,
    rows,
    selectedCellKeys,
    clearSelectedCells,
    setRows,
    setLastAction
  });

  const onCellKeyDown = useCallback(
    (event: CellKeyDownEvent<GridRow>) => {
      const keyboardEvent = event.event as KeyboardEvent | undefined;
      if (!keyboardEvent || keyboardEvent.defaultPrevented) {
        return;
      }

      const key = keyboardEvent.key.toLowerCase();
      const isCopy = (keyboardEvent.ctrlKey || keyboardEvent.metaKey) && key === "c";
      const isPasteShortcut = (keyboardEvent.ctrlKey || keyboardEvent.metaKey) && key === "v";
      const isPasteAlternative = keyboardEvent.shiftKey && keyboardEvent.key === "Insert";
      const isPaste = isPasteShortcut || isPasteAlternative;
      const isDelete = keyboardEvent.key === "Delete";
      const targetIsEditable = isEditableElement(keyboardEvent.target);

      if (isPaste && targetIsEditable) {
        return;
      }
      if ((isCopy || isDelete) && targetIsEditable && selectedCellKeys.length === 0) {
        return;
      }

      if (isDelete) {
        if (deleteSelectedCells()) {
          keyboardEvent.preventDefault();
        }
        return;
      }

      if (isCopy) {
        keyboardEvent.preventDefault();
        copyCurrentSelection(event);
        return;
      }

      // Native paste event supplies clipboard data. This avoids browser permission prompts.
    },
    [copyCurrentSelection, deleteSelectedCells, selectedCellKeys.length]
  );

  return { onCellKeyDown };
}
