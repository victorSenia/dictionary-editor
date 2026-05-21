import test from "node:test";
import assert from "node:assert/strict";
import type { DictionaryConfig } from "../../src/models/dictionary";
import type { GridRow } from "../../src/types/grid";

import { applyPastePlan, ensureRowsCapacity, resolvePasteStartRowIndex, wouldPasteOverwrite } from "../../src/hooks/gridClipboard/pasteApplier";
import { getPasteColumns } from "../../src/hooks/gridClipboard/cellText";

const CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en", "uk"],
  articles: ["der", "die"],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ",",
  topicFlag: "\t",
  topicDelimiter: "",
  rootTopic: ""
};

function word(rowId: string, valueFrom = ""): GridRow {
  return {
    rowId,
    type: "word",
    article: "",
    valueFrom,
    additionalInformation: "",
    valuesTo: { en: [], uk: [] }
  };
}

test("resolvePasteStartRowIndex starts at focused row or appends after existing rows", () => {
  const rows = [word("row-1"), word("row-2")];

  assert.equal(resolvePasteStartRowIndex(rows, "row-2"), 1);
  assert.equal(resolvePasteStartRowIndex(rows, "missing"), 2);
  assert.equal(resolvePasteStartRowIndex([], undefined), 0);
});

test("ensureRowsCapacity appends empty word rows with all configured translation languages", () => {
  const rows = ensureRowsCapacity([word("row-1")], 3, CONFIG);

  assert.equal(rows.length, 3);
  assert.equal(rows[0].rowId, "row-1");
  assert.match(rows[1].rowId, /^grid-row-/);
  assert.deepEqual(rows[1].type === "word" ? rows[1].valuesTo : {}, { en: [], uk: [] });
});

test("wouldPasteOverwrite checks target cells after implicit row expansion", () => {
  const columns = getPasteColumns(CONFIG);

  assert.equal(
    wouldPasteOverwrite([word("row-1", "Baum")], CONFIG, {
      columns,
      startColumnIndex: 1,
      clippedRows: [["Haus"]],
      focusedRowId: "row-1"
    }),
    true
  );

  assert.equal(
    wouldPasteOverwrite([word("row-1")], CONFIG, {
      columns,
      startColumnIndex: 1,
      clippedRows: [["Haus"], ["Tisch"]],
      focusedRowId: "row-1"
    }),
    false
  );
});

test("applyPastePlan writes multi-column clipboard values and creates missing rows", () => {
  const rows = [word("row-1")];
  const result = applyPastePlan(rows, CONFIG, {
    columns: getPasteColumns(CONFIG),
    startColumnIndex: 0,
    clippedRows: [
      ["der", "Baum", "plural: Bäume", "tree, wood", "дерево"],
      ["die", "Lampe", "", "lamp", "лампа"]
    ],
    focusedRowId: "row-1"
  });

  assert.equal(result.length, 2);
  assert.deepEqual(result[0], {
    rowId: "row-1",
    type: "word",
    article: "der",
    valueFrom: "Baum",
    additionalInformation: "plural: Bäume",
    valuesTo: { en: ["tree", "wood"], uk: ["дерево"] }
  });
  assert.match(result[1].rowId, /^grid-row-/);
  assert.equal(result[1].type === "word" ? result[1].valueFrom : "", "Lampe");
});
