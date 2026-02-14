import type { DictionaryRow, WordRow } from "../models/dictionary";
import type { GridRow } from "../types/grid";

export function parseTranslationValue(raw: string, delimiter: string): string[] {
  return raw
    .split(delimiter)
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

export function createNextLanguageKey(existing: string[]): string {
  let index = existing.length + 1;
  let candidate = `lang${index}`;
  while (existing.includes(candidate)) {
    index += 1;
    candidate = `lang${index}`;
  }
  return candidate;
}

export function normalizeListValue(value: string): string[] {
  const parts = value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return [...new Set(parts)];
}

export function mapWordRowLanguages(row: WordRow, languagesTo: string[]): Record<string, string[]> {
  const valuesTo: Record<string, string[]> = {};

  for (const language of languagesTo) {
    valuesTo[language] = row.valuesTo[language] ?? [];
  }

  return valuesTo;
}

export function withIds(rows: DictionaryRow[]): GridRow[] {
  const seed = Date.now();
  return rows.map((row, index) => ({ ...row, id: `${row.type}-${seed}-${index}` }));
}

export function withoutIds(rows: GridRow[]): DictionaryRow[] {
  return rows.map(({ id: _id, ...row }) => row);
}
