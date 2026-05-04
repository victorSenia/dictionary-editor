import test from "node:test";
import assert from "node:assert/strict";
import {
  createNextLanguageKey,
  parseTranslationValue,
  attachGridRowIds,
  stripGridRowIds
} from "../src/utils/dictionaryHelpers.ts";
import type { DictionaryRow } from "../src/models/dictionary.ts";

test("parseTranslationValue trims values and drops empty parts", () => {
  const values = parseTranslationValue(" one ; ; two ; three ", ";");
  assert.deepEqual(values, ["one", "two", "three"]);
});

test("parseTranslationValue keeps single trimmed value when delimiter is empty", () => {
  const values = parseTranslationValue("  one ; two  ", "");
  assert.deepEqual(values, ["one ; two"]);
});

test("createNextLanguageKey finds first available langN key", () => {
  const next = createNextLanguageKey(["lang1", "lang2", "lang4"]);
  assert.equal(next, "lang3");
});

test("attachGridRowIds adds grid row IDs and stripGridRowIds removes only grid row IDs", () => {
  const rows: DictionaryRow[] = [
    {
      type: "word",
      article: "der",
      valueFrom: "Baum",
      additionalInformation: "",
      valuesTo: { en: ["tree"] }
    },
    { type: "topic", label: "Nature" }
  ];

  const rowsWithIds = attachGridRowIds(rows);
  assert.equal(rowsWithIds.length, 2);
  assert.match(rowsWithIds[0].rowId, /^word-\d+-0$/);
  assert.match(rowsWithIds[1].rowId, /^topic-\d+-1$/);

  const stripped = stripGridRowIds(rowsWithIds);
  assert.deepEqual(stripped, rows);
});

test("attachGridRowIds preserves persistent id fields", () => {
  const rows = [
    {
      id: "persistent-word-id",
      type: "word",
      article: "der",
      valueFrom: "Baum",
      additionalInformation: "",
      valuesTo: { en: ["tree"] }
    }
  ];

  const rowsWithIds = attachGridRowIds(rows);
  assert.equal(rowsWithIds[0].id, "persistent-word-id");
  assert.match(rowsWithIds[0].rowId, /^word-\d+-0$/);

  const stripped = stripGridRowIds(rowsWithIds);
  assert.deepEqual(stripped, rows);
});
