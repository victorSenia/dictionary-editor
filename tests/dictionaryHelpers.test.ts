import test from "node:test";
import assert from "node:assert/strict";
import {
  createNextLanguageKey,
  parseTranslationValue,
  withIds,
  withoutIds
} from "../src/utils/dictionaryHelpers.ts";
import type { DictionaryRow } from "../src/models/dictionary.ts";

test("parseTranslationValue trims values and drops empty parts", () => {
  const values = parseTranslationValue(" one ; ; two ; three ", ";");
  assert.deepEqual(values, ["one", "two", "three"]);
});

test("createNextLanguageKey finds first available langN key", () => {
  const next = createNextLanguageKey(["lang1", "lang2", "lang4"]);
  assert.equal(next, "lang3");
});

test("withIds adds ids and withoutIds removes them", () => {
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

  const rowsWithIds = withIds(rows);
  assert.equal(rowsWithIds.length, 2);
  assert.match(rowsWithIds[0].id, /^word-\d+-0$/);
  assert.match(rowsWithIds[1].id, /^topic-\d+-1$/);

  const stripped = withoutIds(rowsWithIds);
  assert.deepEqual(stripped, rows);
});
