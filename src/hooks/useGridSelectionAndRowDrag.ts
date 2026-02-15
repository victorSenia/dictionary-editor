import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction
} from "react";
import type {
  CellMouseDownEvent,
  CellMouseOverEvent,
  RowDragEndEvent,
  RowDragMoveEvent
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import {
  COLUMN_ID_ADDITIONAL_INFO,
  COLUMN_ID_ARTICLE,
  COLUMN_ID_WORD,
  TRANSLATION_COLUMN_PREFIX
} from "../constants/grid";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useGridSelectionAndRowDrag({ gridRef, setRows, setLastAction }: Args) {
  const [selectedCellKeys, setSelectedCellKeys] = useState<string[]>([]);
  const dragSelectingRef = useRef<boolean>(false);
  const dragAnchorRef = useRef<{ rowId: string; colId: string } | null>(null);
  const lastDragTargetRef = useRef<string>("");

  const isSelectableColId = useCallback((colId: string): boolean => {
    return (
      colId === COLUMN_ID_ARTICLE ||
      colId === COLUMN_ID_WORD ||
      colId === COLUMN_ID_ADDITIONAL_INFO ||
      colId.startsWith(TRANSLATION_COLUMN_PREFIX)
    );
  }, []);

  const getDisplayedRowIndexById = useCallback(
    (rowId: string): number => {
      const api = gridRef.current?.api;
      if (!api) {
        return -1;
      }
      const count = api.getDisplayedRowCount();
      for (let i = 0; i < count; i += 1) {
        if (api.getDisplayedRowAtIndex(i)?.data?.id === rowId) {
          return i;
        }
      }
      return -1;
    },
    [gridRef]
  );

  const updateDraggedCellSelection = useCallback(
    (anchorRowId: string, anchorColId: string, currentRowId: string, currentColId: string) => {
      const api = gridRef.current?.api;
      if (!api) {
        return;
      }

      const displayedDataColumns = api
        .getAllDisplayedColumns()
        .map((col) => col.getColId())
        .filter((colId) => isSelectableColId(colId));
      const anchorColumnIndex = displayedDataColumns.indexOf(anchorColId);
      const currentColumnIndex = displayedDataColumns.indexOf(currentColId);
      if (anchorColumnIndex < 0 || currentColumnIndex < 0) {
        return;
      }

      const anchorRowIndex = getDisplayedRowIndexById(anchorRowId);
      const currentRowIndex = getDisplayedRowIndexById(currentRowId);
      if (anchorRowIndex < 0 || currentRowIndex < 0) {
        return;
      }

      const rowStart = Math.min(anchorRowIndex, currentRowIndex);
      const rowEnd = Math.max(anchorRowIndex, currentRowIndex);
      const colStart = Math.min(anchorColumnIndex, currentColumnIndex);
      const colEnd = Math.max(anchorColumnIndex, currentColumnIndex);

      const nextKeys: string[] = [];
      for (let rowIndex = rowStart; rowIndex <= rowEnd; rowIndex += 1) {
        const node = api.getDisplayedRowAtIndex(rowIndex);
        const rowId = node?.data?.id;
        if (!rowId) {
          continue;
        }
        for (let colIndex = colStart; colIndex <= colEnd; colIndex += 1) {
          nextKeys.push(`${rowId}::${displayedDataColumns[colIndex]}`);
        }
      }
      setSelectedCellKeys(nextKeys);
    },
    [getDisplayedRowIndexById, gridRef, isSelectableColId]
  );

  const onCellMouseDown = useCallback(
    (event: CellMouseDownEvent<GridRow>) => {
      if (!event.data || !event.event) {
        return;
      }
      const mouseEvent = event.event as MouseEvent;
      if (mouseEvent.button !== 0) {
        return;
      }
      const colId = event.column.getColId();
      if (!isSelectableColId(colId)) {
        return;
      }

      const target = mouseEvent.target as HTMLElement | null;
      if (target?.closest("button,a")) {
        return;
      }

      dragSelectingRef.current = true;
      dragAnchorRef.current = { rowId: event.data.id, colId };
      updateDraggedCellSelection(event.data.id, colId, event.data.id, colId);
    },
    [isSelectableColId, updateDraggedCellSelection]
  );

  const onCellMouseOver = useCallback(
    (event: CellMouseOverEvent<GridRow>) => {
      if (!dragSelectingRef.current || !dragAnchorRef.current || !event.data) {
        return;
      }
      const colId = event.column.getColId();
      if (!isSelectableColId(colId)) {
        return;
      }

      updateDraggedCellSelection(
        dragAnchorRef.current.rowId,
        dragAnchorRef.current.colId,
        event.data.id,
        colId
      );
    },
    [isSelectableColId, updateDraggedCellSelection]
  );

  const moveDraggedRow = useCallback(
    (movingId: string, overId: string | undefined, overIndex: number | null | undefined) => {
      if (!movingId) {
        return;
      }

      setRows((prev) => {
        const fromIndex = prev.findIndex((row) => row.id === movingId);
        if (fromIndex < 0) {
          return prev;
        }

        let toIndex = overId ? prev.findIndex((row) => row.id === overId) : -1;
        if (toIndex < 0 && overIndex != null) {
          toIndex = overIndex;
        }
        if (toIndex < 0) {
          return prev;
        }
        toIndex = Math.min(toIndex, prev.length - 1);

        if (fromIndex === toIndex) {
          return prev;
        }

        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    },
    [setRows]
  );

  const onRowDragMove = useCallback(
    (event: RowDragMoveEvent<GridRow>) => {
      const movingId = event.node.data?.id;
      if (!movingId) {
        return;
      }

      const target = `${movingId}|${event.overNode?.data?.id ?? ""}|${event.overIndex ?? -1}`;
      if (lastDragTargetRef.current === target) {
        return;
      }
      lastDragTargetRef.current = target;

      moveDraggedRow(movingId, event.overNode?.data?.id, event.overIndex);
    },
    [moveDraggedRow]
  );

  const onRowDragEnd = useCallback(
    (event: RowDragEndEvent<GridRow>) => {
      const movingId = event.node.data?.id;
      if (!movingId) {
        return;
      }

      moveDraggedRow(movingId, event.overNode?.data?.id, event.overIndex);
      lastDragTargetRef.current = "";
    },
    [moveDraggedRow]
  );

  useEffect(() => {
    const stopDragSelection = () => {
      dragSelectingRef.current = false;
      dragAnchorRef.current = null;
    };

    window.addEventListener("mouseup", stopDragSelection);
    return () => window.removeEventListener("mouseup", stopDragSelection);
  }, []);

  const selectedCellSet = useMemo(() => new Set(selectedCellKeys), [selectedCellKeys]);
  const isCellSelected = useCallback(
    (rowId: string | undefined, colId: string | undefined): boolean => {
      if (!rowId || !colId) {
        return false;
      }
      return selectedCellSet.has(`${rowId}::${colId}`);
    },
    [selectedCellSet]
  );

  const clearCellSelection = useCallback(() => {
    setSelectedCellKeys([]);
  }, []);
  const hasSelectedCells = selectedCellKeys.length > 0;
  const deleteRowsWithSelectedCells = useCallback(() => {
    const selectedRowIds = new Set(
      selectedCellKeys
        .map((cellKey) => cellKey.split("::")[0])
        .filter((rowId) => rowId !== "")
    );
    if (selectedRowIds.size === 0) {
      return;
    }

    setRows((prev) => prev.filter((row) => !selectedRowIds.has(row.id)));
    clearCellSelection();
    setLastAction({ key: "action.removeSelectedRows" });
  }, [clearCellSelection, selectedCellKeys, setLastAction, setRows]);

  return {
    onCellMouseDown,
    onCellMouseOver,
    onRowDragMove,
    onRowDragEnd,
    selectedCellKeys,
    isCellSelected,
    clearCellSelection,
    hasSelectedCells,
    deleteRowsWithSelectedCells
  };
}
