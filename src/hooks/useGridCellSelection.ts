import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject
} from "react";
import type { CellMouseDownEvent, CellMouseOverEvent } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import {
  COLUMN_ID_ADDITIONAL_INFO,
  COLUMN_ID_ARTICLE,
  COLUMN_ID_WORD,
  TRANSLATION_COLUMN_PREFIX
} from "../constants/grid";
import { createCellKey, parseCellKey } from "../grid/cellKey";
import type { GridRow } from "../types/grid";

const DRAG_SELECTION_THRESHOLD_PX = 4;

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  rows: GridRow[];
};

export function useGridCellSelection({ gridRef, rows }: Args) {
  const [selectedCellKeys, setSelectedCellKeys] = useState<string[]>([]);
  const dragSelectingRef = useRef(false);
  const dragAnchorRef = useRef<{ rowId: string; colId: string } | null>(null);
  const dragStartPointRef = useRef<{ x: number; y: number } | null>(null);
  const selectedCellSetRef = useRef<Set<string>>(new Set());

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
        if (api.getDisplayedRowAtIndex(i)?.data?.rowId === rowId) {
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
        const rowId = api.getDisplayedRowAtIndex(rowIndex)?.data?.rowId;
        if (!rowId) {
          continue;
        }
        for (let colIndex = colStart; colIndex <= colEnd; colIndex += 1) {
          nextKeys.push(createCellKey(rowId, displayedDataColumns[colIndex]));
        }
      }

      setSelectedCellKeys((prev) => {
        if (prev.length === nextKeys.length && prev.every((key, index) => key === nextKeys[index])) {
          return prev;
        }
        return nextKeys;
      });
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

      dragAnchorRef.current = { rowId: event.data.rowId, colId };
      dragStartPointRef.current = { x: mouseEvent.clientX, y: mouseEvent.clientY };
      dragSelectingRef.current = false;
      updateDraggedCellSelection(event.data.rowId, colId, event.data.rowId, colId);
    },
    [isSelectableColId, updateDraggedCellSelection]
  );

  const onCellMouseOver = useCallback(
    (event: CellMouseOverEvent<GridRow>) => {
      if (!dragAnchorRef.current || !event.data) {
        return;
      }

      const mouseEvent = event.event as MouseEvent | undefined;
      if (!mouseEvent || mouseEvent.buttons !== 1) {
        return;
      }

      if (!dragSelectingRef.current) {
        const start = dragStartPointRef.current;
        if (!start) {
          return;
        }
        const movedX = Math.abs(mouseEvent.clientX - start.x);
        const movedY = Math.abs(mouseEvent.clientY - start.y);
        if (Math.max(movedX, movedY) < DRAG_SELECTION_THRESHOLD_PX) {
          return;
        }
        dragSelectingRef.current = true;
      }

      const colId = event.column.getColId();
      if (!isSelectableColId(colId)) {
        return;
      }

      updateDraggedCellSelection(
        dragAnchorRef.current.rowId,
        dragAnchorRef.current.colId,
        event.data.rowId,
        colId
      );
    },
    [isSelectableColId, updateDraggedCellSelection]
  );

  useEffect(() => {
    const stopDragSelection = () => {
      dragSelectingRef.current = false;
      dragAnchorRef.current = null;
      dragStartPointRef.current = null;
    };

    window.addEventListener("mouseup", stopDragSelection);
    return () => window.removeEventListener("mouseup", stopDragSelection);
  }, []);

  useEffect(() => {
    const existingRowIds = new Set(rows.map((row) => row.rowId));
    setSelectedCellKeys((prev) => {
      const next = prev.filter((key) => {
        const parsed = parseCellKey(key);
        return parsed !== null && existingRowIds.has(parsed.rowId);
      });
      return next.length === prev.length ? prev : next;
    });
  }, [rows]);

  useEffect(() => {
    selectedCellSetRef.current = new Set(selectedCellKeys);
    gridRef.current?.api?.refreshCells({ force: false });
  }, [gridRef, selectedCellKeys]);

  const isCellSelected = useCallback((rowId: string | undefined, colId: string | undefined): boolean => {
    if (!rowId || !colId) {
      return false;
    }
    return selectedCellSetRef.current.has(createCellKey(rowId, colId));
  }, []);

  const clearCellSelection = useCallback(() => {
    setSelectedCellKeys([]);
  }, []);

  return {
    onCellMouseDown,
    onCellMouseOver,
    selectedCellKeys,
    isCellSelected,
    clearCellSelection,
    hasSelectedCells: selectedCellKeys.length > 0
  };
}
