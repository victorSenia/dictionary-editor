import { ROW_TYPE_WORD } from "../models/dictionary";
import type { GridRow } from "../types/grid";

export type RenamePair = {
  from: string;
  to: string;
};

function hasOwn(valuesTo: Record<string, string[]>, language: string): boolean {
  return Object.prototype.hasOwnProperty.call(valuesTo, language);
}

function hasAnyNonEmpty(values: string[] | undefined): boolean {
  if (!values || values.length === 0) {
    return false;
  }
  return values.some((value) => value.trim().length > 0);
}

export function applyLanguageTransitionToRows(
  rows: GridRow[],
  nextLanguages: string[],
  renamePairs: RenamePair[] = []
): GridRow[] {
  return rows.map((row): GridRow => {
    if (row.type !== ROW_TYPE_WORD) {
      return row;
    }

    const valuesTo: Record<string, string[]> = { ...row.valuesTo };
    let changed = false;

    for (const pair of renamePairs) {
      const fromExists = hasOwn(valuesTo, pair.from);
      if (!fromExists) {
        continue;
      }

      const movedValues = valuesTo[pair.from] ?? [];
      const targetExists = hasOwn(valuesTo, pair.to);
      const sourceHasContent = hasAnyNonEmpty(movedValues);
      const shouldReuseExistingTarget = targetExists && !sourceHasContent;

      delete valuesTo[pair.from];
      changed = true;

      if (!shouldReuseExistingTarget) {
        valuesTo[pair.to] = movedValues;
      }
    }

    for (const language of nextLanguages) {
      if (!hasOwn(valuesTo, language)) {
        valuesTo[language] = [];
        changed = true;
      }
    }

    return changed ? { ...row, valuesTo } : row;
  });
}
