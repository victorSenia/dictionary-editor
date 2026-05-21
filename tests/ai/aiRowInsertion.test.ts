import test from "node:test";
import assert from "node:assert/strict";
import type { GridRow } from "../../src/types/grid";

import { insertAiGeneratedRows } from "../../src/ai/aiRowInsertion";

const generatedRows: GridRow[] = [
  {
    rowId: "generated-1",
    type: "word",
    article: "der",
    valueFrom: "Tisch",
    additionalInformation: "",
    valuesTo: { en: ["table"] }
  }
];

test("insertAiGeneratedRows appends generated rows inside the selected existing topic section", () => {
  const rows: GridRow[] = [
    { rowId: "topic-1", type: "topic", label: "Classroom" },
    {
      rowId: "word-1",
      type: "word",
      article: "die",
      valueFrom: "Lampe",
      additionalInformation: "",
      valuesTo: { en: ["lamp"] }
    },
    { rowId: "topic-2", type: "topic", label: "Food" }
  ];

  const result = insertAiGeneratedRows(rows, generatedRows, { topic: "Classroom", topicRowId: "topic-1" }, "Classroom");

  assert.deepEqual(result.map((row) => row.rowId), ["topic-1", "word-1", "generated-1", "topic-2"]);
});

test("insertAiGeneratedRows creates a new topic when requested topic does not match the anchor", () => {
  const rows: GridRow[] = [{ rowId: "topic-1", type: "topic", label: "Classroom" }];

  const result = insertAiGeneratedRows(rows, generatedRows, { topic: "Classroom", topicRowId: "topic-1" }, "Food");

  assert.equal(result.length, 3);
  assert.deepEqual(result[0], rows[0]);
  assert.equal(result[1].type, "topic");
  assert.equal(result[1].type === "topic" ? result[1].label : "", "Food");
  assert.match(result[1].rowId, /^grid-row-/);
  assert.equal(result[2].rowId, "generated-1");
});

test("insertAiGeneratedRows appends rows without a topic when no requested topic is provided", () => {
  const rows: GridRow[] = [];

  const result = insertAiGeneratedRows(rows, generatedRows, { topic: "" }, "");

  assert.deepEqual(result, generatedRows);
});
