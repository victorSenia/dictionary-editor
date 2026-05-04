import { useCallback, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { AgGridReact } from "ag-grid-react";
import { createEmptyWordRow, createTopicRow, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import { createGridRowId } from "../utils/rowId";
import type { LastActionState } from "../types/lastAction";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  config: DictionaryConfig;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useRowActions({ gridRef, config, setRows, setLastAction }: Args) {
  const getAnchorRowId = useCallback((): string | null => {
    const selectedId = gridRef.current?.api.getSelectedNodes()[0]?.data?.rowId;
    if (selectedId) {
      return selectedId;
    }

    const focused = gridRef.current?.api.getFocusedCell();
    if (!focused) {
      return null;
    }

    const focusedNode = gridRef.current?.api.getDisplayedRowAtIndex(focused.rowIndex);
    return focusedNode?.data?.rowId ?? null;
  }, [gridRef]);

  const handleAddRow = useCallback(() => {
    const rowId = createGridRowId();
    const anchorRowId = getAnchorRowId();
    setRows((prev) => {
      const nextRow: GridRow = { ...createEmptyWordRow(config), rowId };
      if (!anchorRowId) {
        return [...prev, nextRow];
      }

      const index = prev.findIndex((row) => row.rowId === anchorRowId);
      if (index < 0) {
        return [...prev, nextRow];
      }

      const next = [...prev];
      next.splice(index + 1, 0, nextRow);
      return next;
    });
    setLastAction({ key: "action.addRow" });
  }, [config, getAnchorRowId, setLastAction, setRows]);

  const handleAddTopic = useCallback(() => {
    const rowId = createGridRowId();
    const anchorRowId = getAnchorRowId();
    setRows((prev) => {
      const nextRow: GridRow = { ...createTopicRow(""), rowId };
      if (!anchorRowId) {
        return [...prev, nextRow];
      }

      const index = prev.findIndex((row) => row.rowId === anchorRowId);
      if (index < 0) {
        return [...prev, nextRow];
      }

      const next = [...prev];
      next.splice(index + 1, 0, nextRow);
      return next;
    });
    setLastAction({ key: "action.addTopic" });
  }, [getAnchorRowId, setLastAction, setRows]);

  const handleDeleteSelected = useCallback(() => {
    const selectedIds = new Set(
      gridRef.current?.api
        .getSelectedNodes()
        .map((node) => node.data?.rowId)
        .filter((rowId): rowId is string => typeof rowId === "string")
    );

    if (selectedIds.size > 0) {
      setRows((prev) => prev.filter((row) => !selectedIds.has(row.rowId)));
    }

    setLastAction({ key: "action.removeSelectedRows" });
  }, [gridRef, setLastAction, setRows]);

  return { handleAddRow, handleAddTopic, handleDeleteSelected };
}
