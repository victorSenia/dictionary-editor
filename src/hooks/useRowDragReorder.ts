import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";
import type { RowDragEndEvent, RowDragMoveEvent } from "ag-grid-community";
import type { GridRow } from "../types/grid";

type Args = {
  setRows: Dispatch<SetStateAction<GridRow[]>>;
};

export function useRowDragReorder({ setRows }: Args) {
  const lastDragTargetRef = useRef("");

  const moveDraggedRow = useCallback(
    (movingId: string, overId: string | undefined, overIndex: number | null | undefined) => {
      if (!movingId) {
        return;
      }

      setRows((prev) => {
        const fromIndex = prev.findIndex((row) => row.rowId === movingId);
        if (fromIndex < 0) {
          return prev;
        }

        let toIndex = overId ? prev.findIndex((row) => row.rowId === overId) : -1;
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
      const movingId = event.node.data?.rowId;
      if (!movingId) {
        return;
      }

      const target = `${movingId}|${event.overNode?.data?.rowId ?? ""}|${event.overIndex ?? -1}`;
      if (lastDragTargetRef.current === target) {
        return;
      }
      lastDragTargetRef.current = target;
      moveDraggedRow(movingId, event.overNode?.data?.rowId, event.overIndex);
    },
    [moveDraggedRow]
  );

  const onRowDragEnd = useCallback(
    (event: RowDragEndEvent<GridRow>) => {
      const movingId = event.node.data?.rowId;
      if (!movingId) {
        return;
      }

      moveDraggedRow(movingId, event.overNode?.data?.rowId, event.overIndex);
      lastDragTargetRef.current = "";
    },
    [moveDraggedRow]
  );

  return { onRowDragMove, onRowDragEnd };
}
