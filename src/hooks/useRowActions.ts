import { useCallback, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { AgGridReact } from "ag-grid-react";
import { createEmptyWordRow, createTopicRow, type DictionaryConfig } from "../models/dictionary";
import type { LastActionState } from "../types/lastAction";
import type { GridRow } from "../types/grid";
import { createRowId } from "../utils/rowId";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  config: DictionaryConfig;
  topicLabel: string;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useRowActions({ gridRef, config, topicLabel, setRows, setLastAction }: Args) {
  const getAnchorRowId = useCallback((): string | null => {
    const selectedId = gridRef.current?.api.getSelectedNodes()[0]?.data?.id;
    if (selectedId) {
      return selectedId;
    }

    const focused = gridRef.current?.api.getFocusedCell();
    if (!focused) {
      return null;
    }

    const focusedNode = gridRef.current?.api.getDisplayedRowAtIndex(focused.rowIndex);
    return focusedNode?.data?.id ?? null;
  }, [gridRef]);

  const handleAddRow = useCallback(() => {
    const id = createRowId("word");
    const anchorRowId = getAnchorRowId();
    setRows((prev) => {
      const nextRow: GridRow = { ...createEmptyWordRow(config), id };
      if (!anchorRowId) {
        return [...prev, nextRow];
      }

      const index = prev.findIndex((row) => row.id === anchorRowId);
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
    const id = createRowId("topic");
    const anchorRowId = getAnchorRowId();
    setRows((prev) => {
      const nextRow: GridRow = { ...createTopicRow(topicLabel), id };
      if (!anchorRowId) {
        return [...prev, nextRow];
      }

      const index = prev.findIndex((row) => row.id === anchorRowId);
      if (index < 0) {
        return [...prev, nextRow];
      }

      const next = [...prev];
      next.splice(index + 1, 0, nextRow);
      return next;
    });
    setLastAction({ key: "action.addTopic" });
  }, [getAnchorRowId, setLastAction, setRows, topicLabel]);

  const handleDeleteSelected = useCallback(() => {
    const selectedIds = new Set(
      gridRef.current?.api
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id): id is string => typeof id === "string")
    );

    if (selectedIds.size > 0) {
      setRows((prev) => prev.filter((row) => !selectedIds.has(row.id)));
    }

    setLastAction({ key: "action.removeSelectedRows" });
  }, [gridRef, setLastAction, setRows]);

  return { handleAddRow, handleAddTopic, handleDeleteSelected };
}
