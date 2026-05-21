import test from "node:test";
import assert from "node:assert/strict";
import type { GridRow } from "../../src/types/grid";

import { applyLanguageTransitionToRows } from "../../src/utils/languageTransition";

function wordRow(valuesTo: Record<string, string[]>): GridRow {
  return {
    rowId: "word-1",
    type: "word",
    article: "der",
    valueFrom: "Baum",
    additionalInformation: "",
    valuesTo
  };
}

test("applyLanguageTransitionToRows adds newly configured languages", () => {
  const rows = [wordRow({ en: ["tree"] })];

  const result = applyLanguageTransitionToRows(rows, ["en", "uk"]);

  assert.deepEqual(result[0].type === "word" ? result[0].valuesTo : {}, {
    en: ["tree"],
    uk: []
  });
});

test("applyLanguageTransitionToRows moves values for renamed languages", () => {
  const rows = [wordRow({ lang1: ["дерево"], en: ["tree"] })];

  const result = applyLanguageTransitionToRows(rows, ["en", "uk"], [{ from: "lang1", to: "uk" }]);

  assert.deepEqual(result[0].type === "word" ? result[0].valuesTo : {}, {
    en: ["tree"],
    uk: ["дерево"]
  });
});

test("applyLanguageTransitionToRows keeps existing target values when renamed source is empty", () => {
  const rows = [wordRow({ lang1: ["   "], uk: ["дерево"] })];

  const result = applyLanguageTransitionToRows(rows, ["uk"], [{ from: "lang1", to: "uk" }]);

  assert.deepEqual(result[0].type === "word" ? result[0].valuesTo : {}, {
    uk: ["дерево"]
  });
});

test("applyLanguageTransitionToRows leaves topic rows unchanged", () => {
  const rows: GridRow[] = [{ rowId: "topic-1", type: "topic", label: "Nature" }];

  assert.deepEqual(applyLanguageTransitionToRows(rows, ["en"]), rows);
});
