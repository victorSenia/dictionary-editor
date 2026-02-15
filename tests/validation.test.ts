import test from "node:test";
import assert from "node:assert/strict";
import { isRowInvalid, validateCell } from "../src/grid/validation.ts";
import type { DictionaryConfig, DictionaryRow } from "../src/models/dictionary.ts";
import { COLUMN_ID_ARTICLE, COLUMN_ID_WORD, TRANSLATION_COLUMN_PREFIX } from "../src/constants/grid.ts";

const CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en"],
  articles: ["der ", "die "],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ",",
  topicFlag: "\t",
  topicDelimiter: "",
  rootTopic: ""
};

function makeWordRow(overrides?: Partial<Extract<DictionaryRow, { type: "word" }>>): Extract<DictionaryRow, { type: "word" }> {
  return {
    type: "word",
    article: "der",
    valueFrom: "Haus",
    additionalInformation: "",
    valuesTo: { en: ["house"] },
    ...overrides
  };
}

test("isRowInvalid detects invalid topic row", () => {
  const row: DictionaryRow = { type: "topic", label: "   " };
  assert.equal(isRowInvalid(row, CONFIG), true);
});

test("isRowInvalid detects empty word and translation issues", () => {
  assert.equal(isRowInvalid(makeWordRow({ valueFrom: "   " }), CONFIG), true);
  assert.equal(isRowInvalid(makeWordRow({ valuesTo: { en: [] } }), CONFIG), true);
});

test("isRowInvalid rejects unknown article and delimiter in translation", () => {
  assert.equal(isRowInvalid(makeWordRow({ article: "das" }), CONFIG), true);
  assert.equal(isRowInvalid(makeWordRow({ valuesTo: { en: ["ho|use"] } }), CONFIG), true);
});

test("isRowInvalid accepts a valid row", () => {
  assert.equal(isRowInvalid(makeWordRow(), CONFIG), false);
});

test("validateCell returns specific reason for word delimiter violations", () => {
  const row = makeWordRow();
  const result = validateCell(
    {
      value: "bad;word",
      column: { getColId: () => COLUMN_ID_WORD }
    } as any,
    CONFIG,
    row
  );

  assert.equal(result.isValid, false);
  assert.equal(result.reasonKey, "validation.containsAdditionalInformationDelimiter");
});

test("validateCell validates article against config set", () => {
  const row = makeWordRow();
  const result = validateCell(
    {
      value: "das",
      column: { getColId: () => COLUMN_ID_ARTICLE }
    } as any,
    CONFIG,
    row
  );

  assert.equal(result.isValid, false);
  assert.equal(result.reasonKey, "validation.articleNotInConfig");
});

test("validateCell validates translation columns", () => {
  const row = makeWordRow({ valuesTo: { en: [] } });
  const result = validateCell(
    {
      value: "",
      column: { getColId: () => `${TRANSLATION_COLUMN_PREFIX}en` }
    } as any,
    CONFIG,
    row
  );

  assert.equal(result.isValid, false);
  assert.equal(result.reasonKey, "validation.emptyTranslationNotAllowed");
});
