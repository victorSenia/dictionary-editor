import { useCallback, useMemo, useState } from "react";
import { DEFAULT_CONFIG, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import { isRowInvalid } from "../grid/validation";
import { applyLanguageTransitionToRows, type RenamePair } from "../utils/languageTransition";

type Args = {
  showOnlyInvalid: boolean;
};

export function useEditorDocumentState({ showOnlyInvalid }: Args) {
  const [showArticleColumn, setShowArticleColumn] = useState<boolean>(true);
  const [config, setConfig] = useState<DictionaryConfig>(DEFAULT_CONFIG);
  const [rows, setRows] = useState<GridRow[]>([]);

  const applyLanguagesTo = useCallback((languagesTo: string[], renamePairs: RenamePair[] = []) => {
    setConfig((prev) => ({ ...prev, languagesTo }));
    setRows((prev): GridRow[] => applyLanguageTransitionToRows(prev, languagesTo, renamePairs));
  }, []);

  const displayedRows = useMemo<GridRow[]>(
    () => (showOnlyInvalid ? rows.filter((row) => isRowInvalid(row, config)) : rows),
    [config, rows, showOnlyInvalid]
  );

  return {
    showArticleColumn,
    setShowArticleColumn,
    config,
    setConfig,
    rows,
    setRows,
    applyLanguagesTo,
    displayedRows
  };
}
