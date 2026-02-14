import { useCallback, type Dispatch, type SetStateAction } from "react";
import { exportFile, parseFile } from "../io/dictionaryFormat";
import {
  openFileUniversal,
  readAutosaveUniversal,
  saveFileAsUniversal,
  saveFileUniversal
} from "../io/fileAccess";
import { parseAutosavePayload } from "../io/autosavePayload";
import type { DictionaryConfig } from "../models/dictionary";
import type { LastActionState } from "../types/lastAction";
import type { GridRow } from "../types/grid";
import { withIds, withoutIds } from "../utils/dictionaryHelpers";

type UseDocumentActionsArgs = {
  autosaveEnabled: boolean;
  config: DictionaryConfig;
  rows: GridRow[];
  currentFilePath: string | null;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setCurrentFilePath: Dispatch<SetStateAction<string | null>>;
  setShowArticleColumn: Dispatch<SetStateAction<boolean>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useDocumentActions({
  autosaveEnabled,
  config,
  rows,
  currentFilePath,
  setConfig,
  setRows,
  setCurrentFilePath,
  setShowArticleColumn,
  setLastAction
}: UseDocumentActionsArgs) {
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
  }, [
    autosaveEnabled,
    config,
    setConfig,
    setCurrentFilePath,
    setLastAction,
    setRows,
    setShowArticleColumn
  ]);

  const handleSaveAs = useCallback(async () => {
    const content = exportFile(config, withoutIds(rows));
    const saved = await saveFileAsUniversal(content, currentFilePath);
    if (saved) {
      setCurrentFilePath(saved.path);
      setLastAction({ key: "action.saveAs" });
    }
  }, [config, currentFilePath, rows, setCurrentFilePath, setLastAction]);

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
  }, [config, currentFilePath, rows, setCurrentFilePath, setLastAction]);

  return { handleOpen, handleSaveAs, handleSave };
}
