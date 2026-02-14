import { useCallback, useEffect, useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import type {
  CellMouseDownEvent,
  CellMouseOverEvent,
  RowDragEndEvent,
  RowDragMoveEvent
} from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import type { GridRow } from "../types/grid";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
};

export function useRowSelectionDrag({ gridRef, setRows }: Args) {
  const dragSelectAnchorIdRef = useRef<string | null>(null);
  const dragSelectingRef = useRef<boolean>(false);
  const lastDragTargetRef = useRef<string>("");

  const selectRowRange = useCallback(
    (anchorId: string, currentId: string) => {
      const api = gridRef.current?.api;
      if (!api) {
        return;
      }

      let anchorIndex = -1;
      let currentIndex = -1;
      const count = api.getDisplayedRowCount();
      for (let i = 0; i < count; i += 1) {
        const node = api.getDisplayedRowAtIndex(i);
        const rowId = node?.data?.id;
        if (rowId === anchorId) {
          anchorIndex = i;
        }
        if (rowId === currentId) {
          currentIndex = i;
        }
      }

      if (anchorIndex < 0 || currentIndex < 0) {
        return;
      }

      const start = Math.min(anchorIndex, currentIndex);
      const end = Math.max(anchorIndex, currentIndex);
      api.deselectAll();
      for (let i = start; i <= end; i += 1) {
        api.getDisplayedRowAtIndex(i)?.setSelected(true);
      }
    },
    [gridRef]
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

      const target = mouseEvent.target as HTMLElement | null;
      if (target?.closest("button,input,textarea,select,a")) {
        return;
      }

      const colId = event.column.getColId();
      if (colId === "drag" || colId.startsWith("add-col-")) {
        return;
      }

      dragSelectingRef.current = true;
      dragSelectAnchorIdRef.current = event.data.id;
      selectRowRange(event.data.id, event.data.id);
    },
    [selectRowRange]
  );

  const onCellMouseOver = useCallback(
    (event: CellMouseOverEvent<GridRow>) => {
      if (!dragSelectingRef.current || !event.data) {
        return;
      }
      const anchor = dragSelectAnchorIdRef.current;
      if (!anchor) {
        return;
      }
      selectRowRange(anchor, event.data.id);
    },
    [selectRowRange]
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
      dragSelectAnchorIdRef.current = null;
    };

    window.addEventListener("mouseup", stopDragSelection);
    return () => window.removeEventListener("mouseup", stopDragSelection);
  }, []);

  return { onCellMouseDown, onCellMouseOver, onRowDragMove, onRowDragEnd };
}
