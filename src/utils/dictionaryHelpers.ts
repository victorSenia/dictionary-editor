export function parseTranslationValue(raw: string, delimiter: string): string[] {
  if (delimiter === "") {
    const value = raw.trim();
    return value.length > 0 ? [value] : [];
  }

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

export function attachGridRowIds<TRow extends { type: string }>(rows: TRow[]): Array<TRow & { rowId: string }> {
  const seed = Date.now();
  return rows.map((row, index) => ({ ...row, rowId: `${row.type}-${seed}-${index}` }));
}

export function stripGridRowIds<TRow extends object>(rows: Array<TRow & { rowId: string }>): TRow[] {
  return rows.map(({ rowId: _rowId, ...row }) => row as TRow);
}
