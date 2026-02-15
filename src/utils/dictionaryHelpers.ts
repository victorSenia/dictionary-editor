import type { DictionaryRow } from "../models/dictionary";
import type { GridRow } from "../types/grid";

export function parseTranslationValue(raw: string, delimiter: string): string[] {
  return raw
    .split(delimiter)
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

export function createNextLanguageKey(activeLanguages: string[]): string {
  const active = new Set(activeLanguages);
  let index = 1;
  let candidate = `lang${index}`;
  while (active.has(candidate)) {
    index += 1;
    candidate = `lang${index}`;
  }
  return candidate;
}

export function withIds(rows: DictionaryRow[]): GridRow[] {
  const seed = Date.now();
  return rows.map((row, index) => ({ ...row, id: `${row.type}-${seed}-${index}` }));
}

export function withoutIds(rows: GridRow[]): DictionaryRow[] {
  return rows.map(({ id: _id, ...row }) => row);
}
