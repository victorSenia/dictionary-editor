import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { DictionaryConfig, DictionaryRow } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import { withIds, withoutIds } from "../utils/dictionaryHelpers";

type AutosavePayload = {
  config: DictionaryConfig;
  rows: DictionaryRow[];
  filePath: string | null;
};

type UseAutosaveArgs = {
  enabled: boolean;
  debounceMs: number;
  config: DictionaryConfig;
  rows: GridRow[];
  filePath: string | null;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setFilePath: Dispatch<SetStateAction<string | null>>;
  setLastAction: Dispatch<SetStateAction<string>>;
};

function parseAutosavePayload(content: string): AutosavePayload | null {
  try {
    const parsed = JSON.parse(content) as Partial<AutosavePayload>;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    if (!parsed.config || !Array.isArray(parsed.rows)) {
      return null;
    }
    return {
      config: parsed.config as DictionaryConfig,
      rows: parsed.rows as DictionaryRow[],
      filePath: typeof parsed.filePath === "string" ? parsed.filePath : null
    };
  } catch {
    return null;
  }
}

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

    let disposed = false;

    const restoreAutosave = async () => {
      const restored = await window.electronAPI.readAutosave(null);
      if (!restored?.content || disposed) {
        return;
      }

      const payload = parseAutosavePayload(restored.content);
      if (payload && !disposed) {
        setConfig(payload.config);
        setRows(withIds(payload.rows));
        setFilePath(payload.filePath);
        setLastAction("Autosave Restored");
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

    const payload: AutosavePayload = {
      config,
      rows: withoutIds(rows),
      filePath
    };

    const timer = setTimeout(() => {
      void window.electronAPI.writeAutosave(filePath, JSON.stringify(payload));
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [enabled, debounceMs, config, rows, filePath]);
}
