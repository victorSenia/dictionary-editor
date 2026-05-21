import test from "node:test";
import assert from "node:assert/strict";

import { createCellKey, parseCellKey } from "../../src/grid/cellKey";

test("createCellKey and parseCellKey preserve row and column ids", () => {
  const key = createCellKey("row-1", "to-en");

  assert.equal(key, "row-1::to-en");
  assert.deepEqual(parseCellKey(key), { rowId: "row-1", colId: "to-en" });
});

test("parseCellKey accepts column ids that themselves contain the separator", () => {
  assert.deepEqual(parseCellKey("row-1::custom::column"), {
    rowId: "row-1",
    colId: "custom::column"
  });
});

test("parseCellKey rejects malformed or incomplete cell keys", () => {
  assert.equal(parseCellKey("row-1"), null);
  assert.equal(parseCellKey("::to-en"), null);
  assert.equal(parseCellKey("row-1::"), null);
});
