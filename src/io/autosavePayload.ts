import type { DictionaryConfig, DictionaryRow } from "../models/dictionary.ts";

export type AutosavePayload = {
  config: DictionaryConfig;
  rows: DictionaryRow[];
  filePath: string | null;
};

export function parseAutosavePayload(content: string): AutosavePayload | null {
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
