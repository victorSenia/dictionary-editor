import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { DictionaryConfig } from "../models/dictionary";
import { hasElectronApi, readAutosaveUniversal, writeAutosaveUniversal } from "../io/fileAccess";
import { parseAutosavePayload, type AutosavePayload } from "../io/autosavePayload";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { withIds, withoutIds } from "../utils/dictionaryHelpers";

type UseAutosaveArgs = {
  enabled: boolean;
  debounceMs: number;
  config: DictionaryConfig;
  rows: GridRow[];
  filePath: string | null;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setFilePath: Dispatch<SetStateAction<string | null>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useAutosave({
  enabled,
  debounceMs,
  config,
  rows,
  filePath,
  setConfig,
  setRows,
  setFilePath,
  setLastAction
}: UseAutosaveArgs) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (!hasElectronApi()) {
      return;
    }

    let disposed = false;

    const restoreAutosave = async () => {
      const restored = await readAutosaveUniversal(null);
      if (!restored?.content || disposed) {
        return;
      }

      const payload = parseAutosavePayload(restored.content);
      if (payload && !disposed) {
        setConfig(payload.config);
        setRows(withIds(payload.rows));
        setFilePath(payload.filePath);
        setLastAction({ key: "action.autosaveRestored" });
      }
    };

    void restoreAutosave();

    return () => {
      disposed = true;
    };
  }, [enabled, setConfig, setRows, setFilePath, setLastAction]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (!hasElectronApi()) {
      return;
    }

    const payload: AutosavePayload = {
      config,
      rows: withoutIds(rows),
      filePath
    };

    const timer = setTimeout(() => {
      void writeAutosaveUniversal(filePath, JSON.stringify(payload));
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [enabled, debounceMs, config, rows, filePath]);
}
