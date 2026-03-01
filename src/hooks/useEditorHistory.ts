import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { ROW_TYPE_TOPIC, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";

type EditorSnapshot = {
  rows: GridRow[];
  config: DictionaryConfig;
  showArticleColumn: boolean;
  showAdditionalInformationColumn: boolean;
};

type Args = {
  rows: GridRow[];
  config: DictionaryConfig;
  showArticleColumn: boolean;
  showAdditionalInformationColumn: boolean;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setShowArticleColumn: Dispatch<SetStateAction<boolean>>;
  setShowAdditionalInformationColumn: Dispatch<SetStateAction<boolean>>;
  onCancelApplied?: () => void;
  onReapplyApplied?: () => void;
};

function cloneRow(row: GridRow): GridRow {
  if (row.type === ROW_TYPE_TOPIC) {
    return { ...row };
  }

  return {
    ...row,
    valuesTo: Object.fromEntries(
      Object.entries(row.valuesTo).map(([language, values]) => [language, [...values]])
    )
  };
}

function cloneSnapshot(snapshot: EditorSnapshot): EditorSnapshot {
  return {
    rows: snapshot.rows.map(cloneRow),
    config: {
      ...snapshot.config,
      languagesTo: [...snapshot.config.languagesTo],
      articles: [...snapshot.config.articles]
    },
    showArticleColumn: snapshot.showArticleColumn,
    showAdditionalInformationColumn: snapshot.showAdditionalInformationColumn
  };
}

function serializeSnapshot(snapshot: EditorSnapshot): string {
  return JSON.stringify(snapshot);
}

export function useEditorHistory({
  rows,
  config,
  showArticleColumn,
  showAdditionalInformationColumn,
  setRows,
  setConfig,
  setShowArticleColumn,
  setShowAdditionalInformationColumn,
  onCancelApplied,
  onReapplyApplied
}: Args) {
  const [undoStack, setUndoStack] = useState<EditorSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<EditorSnapshot[]>([]);
  const isApplyingHistoryRef = useRef<boolean>(false);
  const pendingHistoryResetRef = useRef<boolean>(false);
  const lastSnapshotRef = useRef<EditorSnapshot>({
    rows: [],
    config,
    showArticleColumn,
    showAdditionalInformationColumn
  });
  const lastSerializedRef = useRef<string>(serializeSnapshot(lastSnapshotRef.current));

  const createCurrentSnapshot = useCallback(
    (): EditorSnapshot =>
      cloneSnapshot({
        rows,
        config,
        showArticleColumn,
        showAdditionalInformationColumn
      }),
    [config, rows, showArticleColumn, showAdditionalInformationColumn]
  );

  const applySnapshot = useCallback(
    (snapshot: EditorSnapshot) => {
      const cloned = cloneSnapshot(snapshot);
      isApplyingHistoryRef.current = true;
      lastSnapshotRef.current = cloned;
      lastSerializedRef.current = serializeSnapshot(cloned);
      setRows(cloned.rows);
      setConfig(cloned.config);
      setShowArticleColumn(cloned.showArticleColumn);
      setShowAdditionalInformationColumn(cloned.showAdditionalInformationColumn);
    },
    [setConfig, setRows, setShowAdditionalInformationColumn, setShowArticleColumn]
  );

  useEffect(() => {
    const currentSnapshot = createCurrentSnapshot();
    const currentSerialized = serializeSnapshot(currentSnapshot);
    if (currentSerialized === lastSerializedRef.current) {
      return;
    }

    if (pendingHistoryResetRef.current) {
      pendingHistoryResetRef.current = false;
      isApplyingHistoryRef.current = false;
      setUndoStack([]);
      setRedoStack([]);
      lastSnapshotRef.current = currentSnapshot;
      lastSerializedRef.current = currentSerialized;
      return;
    }

    if (isApplyingHistoryRef.current) {
      isApplyingHistoryRef.current = false;
      lastSnapshotRef.current = currentSnapshot;
      lastSerializedRef.current = currentSerialized;
      return;
    }

    const previousSnapshot = cloneSnapshot(lastSnapshotRef.current);
    setUndoStack((prev) => [...prev, previousSnapshot]);
    setRedoStack([]);
    lastSnapshotRef.current = currentSnapshot;
    lastSerializedRef.current = currentSerialized;
  }, [createCurrentSnapshot]);

  const cancel = useCallback(() => {
    if (undoStack.length === 0) {
      return;
    }

    const targetSnapshot = undoStack[undoStack.length - 1];
    const currentSnapshot = createCurrentSnapshot();
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, currentSnapshot]);
    applySnapshot(targetSnapshot);
    onCancelApplied?.();
  }, [applySnapshot, createCurrentSnapshot, onCancelApplied, undoStack]);

  const reapply = useCallback(() => {
    if (redoStack.length === 0) {
      return;
    }

    const targetSnapshot = redoStack[redoStack.length - 1];
    const currentSnapshot = createCurrentSnapshot();
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, currentSnapshot]);
    applySnapshot(targetSnapshot);
    onReapplyApplied?.();
  }, [applySnapshot, createCurrentSnapshot, onReapplyApplied, redoStack]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === "z" && !event.shiftKey) {
        event.preventDefault();
        cancel();
        return;
      }
      if (key === "y" || (key === "z" && event.shiftKey)) {
        event.preventDefault();
        reapply();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cancel, reapply]);

  const markResetOnNextChange = useCallback(() => {
    pendingHistoryResetRef.current = true;
  }, []);

  return {
    canCancel: undoStack.length > 0,
    canReapply: redoStack.length > 0,
    cancel,
    reapply,
    markResetOnNextChange
  };
}
