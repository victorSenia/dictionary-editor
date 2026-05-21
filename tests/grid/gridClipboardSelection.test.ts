import test from "node:test";
import assert from "node:assert/strict";
import type { GridRow } from "../../src/types/grid";

import { buildSelectedCellsCopyText } from "../../src/hooks/gridClipboard/selectionCopy";
import { clearSelectedCellValues } from "../../src/hooks/gridClipboard/deleteSelection";
import { createCellKey } from "../../src/grid/cellKey";
import { COLUMN_ID_ADDITIONAL_INFO, COLUMN_ID_ARTICLE, COLUMN_ID_WORD, TRANSLATION_COLUMN_PREFIX } from "../../src/constants/grid";

const rows: GridRow[] = [
  { rowId: "topic-1", type: "topic", label: "Nature" },
  {
    rowId: "word-1",
    type: "word",
    article: "der",
    valueFrom: "Baum",
    additionalInformation: "plural: Bäume",
    valuesTo: { en: ["tree"], uk: ["дерево"] }
  },
  {
    rowId: "word-2",
    type: "word",
    article: "die",
    valueFrom: "Lampe",
    additionalInformation: "",
    valuesTo: { en: ["lamp"], uk: ["лампа"] }
  }
];

function fakeApi(displayedRows: GridRow[], displayedColumns: string[]) {
  return {
    getAllDisplayedColumns: () => displayedColumns.map((colId) => ({ getColId: () => colId })),
    getDisplayedRowCount: () => displayedRows.length,
    getDisplayedRowAtIndex: (index: number) => ({ data: displayedRows[index] })
  } as any;
}

test("buildSelectedCellsCopyText respects displayed row and column order", () => {
  const text = buildSelectedCellsCopyText({
    api: fakeApi(rows, [COLUMN_ID_WORD, COLUMN_ID_ARTICLE, `${TRANSLATION_COLUMN_PREFIX}uk`, "drag"]),
    rows,
    translationDelimiter: ",",
    selectedCellKeys: [
      createCellKey("word-2", `${TRANSLATION_COLUMN_PREFIX}uk`),
      createCellKey("word-1", COLUMN_ID_ARTICLE),
      createCellKey("word-2", COLUMN_ID_WORD),
      createCellKey("word-1", `${TRANSLATION_COLUMN_PREFIX}uk`)
    ]
  });

  assert.equal(text, "\tder\tдерево\nLampe\t\tлампа");
});

test("buildSelectedCellsCopyText returns null when selected cells are outside displayed grid", () => {
  const text = buildSelectedCellsCopyText({
    api: fakeApi(rows, [COLUMN_ID_WORD]),
    rows,
    translationDelimiter: ",",
    selectedCellKeys: [createCellKey("missing-row", COLUMN_ID_WORD)]
  });

  assert.equal(text, null);
});

test("clearSelectedCellValues clears grouped cell selections and returns original array when unchanged", () => {
  const result = clearSelectedCellValues(rows, [
    createCellKey("word-1", COLUMN_ID_ARTICLE),
    createCellKey("word-1", `${TRANSLATION_COLUMN_PREFIX}en`),
    createCellKey("topic-1", COLUMN_ID_ADDITIONAL_INFO),
    "malformed"
  ]);

  assert.notEqual(result, rows);
  assert.equal(result[0], rows[0]);
  assert.deepEqual(result[1], {
    rowId: "word-1",
    type: "word",
    article: "",
    valueFrom: "Baum",
    additionalInformation: "plural: Bäume",
    valuesTo: { en: [], uk: ["дерево"] }
  });

  assert.equal(clearSelectedCellValues(result, [createCellKey("word-1", COLUMN_ID_ARTICLE)]), result);
});
