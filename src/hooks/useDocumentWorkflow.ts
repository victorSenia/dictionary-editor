import { useCallback, useState, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { AgGridReact } from "ag-grid-react";
import type { DictionaryConfig } from "../models/dictionary";
import type { LastActionState } from "../types/lastAction";
import type { GridRow } from "../types/grid";
import { exportFile, parseFile } from "../io/dictionaryFormat";
import {
  openFileUniversal,
  readAutosaveUniversal,
  saveFileAsUniversal,
  saveFileUniversal
} from "../io/fileAccess";
import { parseAutosavePayload } from "../io/autosavePayload";
import { withIds, withoutIds } from "../utils/dictionaryHelpers";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  autosaveEnabled: boolean;
  config: DictionaryConfig;
  rows: GridRow[];
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setShowArticleColumn: Dispatch<SetStateAction<boolean>>;
  setShowOnlyInvalid: Dispatch<SetStateAction<boolean>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
  markResetOnNextChange: () => void;
};

export function useDocumentWorkflow({
  gridRef,
  autosaveEnabled,
  config,
  rows,
  setConfig,
  setRows,
  setShowArticleColumn,
  setShowOnlyInvalid,
  setLastAction,
  markResetOnNextChange
}: Args) {
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const [headerEditResetToken, setHeaderEditResetToken] = useState<number>(0);
  const onOpened = useCallback(() => {
    markResetOnNextChange();
    setShowOnlyInvalid(false);
    setHeaderEditResetToken((prev) => prev + 1);
    gridRef.current?.api?.setFilterModel(null);
  }, [gridRef, markResetOnNextChange, setShowOnlyInvalid]);

  const handleOpen = useCallback(async () => {
    const opened = await openFileUniversal();
    if (!opened) {
      return;
    }

    const parsed = parseFile(opened.content, config);
    let nextConfig = parsed.config;
    let nextRows = parsed.rows;

    if (autosaveEnabled) {
      const fileAutosave = await readAutosaveUniversal(opened.path);
      if (fileAutosave?.content) {
        const payload = parseAutosavePayload(fileAutosave.content);
        if (payload) {
          nextConfig = payload.config;
          nextRows = payload.rows;
        }
      }
    }

    setConfig(nextConfig);
    setRows(withIds(nextRows));
    if (nextConfig.articles.some((article) => article.length > 0)) {
      setShowArticleColumn(true);
    }
    setCurrentFilePath(opened.path);
    setLastAction({ key: "action.open" });
    onOpened();
  }, [
    autosaveEnabled,
    config,
    onOpened,
    setConfig,
    setRows,
    setShowArticleColumn,
    setLastAction
  ]);

  const handleSaveAs = useCallback(async () => {
    const content = exportFile(config, withoutIds(rows));
    const saved = await saveFileAsUniversal(content, currentFilePath);
    if (saved) {
      setCurrentFilePath(saved.path);
      setLastAction({ key: "action.saveAs" });
    }
  }, [config, currentFilePath, rows, setLastAction]);

  const handleSave = useCallback(async () => {
    const content = exportFile(config, withoutIds(rows));
    if (currentFilePath) {
      await saveFileUniversal(currentFilePath, content);
      setLastAction({ key: "action.save" });
      return;
    }

    const saved = await saveFileAsUniversal(content, currentFilePath);
    if (saved) {
      setCurrentFilePath(saved.path);
      setLastAction({ key: "action.save" });
    }
  }, [config, currentFilePath, rows, setLastAction]);

  return {
    currentFilePath,
    setCurrentFilePath,
    headerEditResetToken,
    handleOpen,
    handleSaveAs,
    handleSave
  };
}
