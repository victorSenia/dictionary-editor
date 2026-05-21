import test from "node:test";
import assert from "node:assert/strict";
import type { DictionaryConfig } from "../../src/models/dictionary";
import type { GridRow } from "../../src/types/grid";

import { buildRowCopyText, clearCellText, getCellText, getPasteColumns, isSelectableGridColId, setCellText } from "../../src/hooks/gridClipboard/cellText";
import { COLUMN_ID_ADDITIONAL_INFO, COLUMN_ID_ARTICLE, COLUMN_ID_WORD, TRANSLATION_COLUMN_PREFIX } from "../../src/constants/grid";

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

const word: GridRow = {
  rowId: "word-1",
  type: "word",
  article: "der",
  valueFrom: "Baum",
  additionalInformation: "plural: Bäume",
  valuesTo: { en: ["tree", "wood"], uk: ["дерево"] }
};

const topic: GridRow = { rowId: "topic-1", type: "topic", label: "Nature" };

test("isSelectableGridColId and getPasteColumns reflect editable grid columns", () => {
  assert.equal(isSelectableGridColId(COLUMN_ID_ARTICLE), true);
  assert.equal(isSelectableGridColId(COLUMN_ID_WORD), true);
  assert.equal(isSelectableGridColId(COLUMN_ID_ADDITIONAL_INFO), true);
  assert.equal(isSelectableGridColId(`${TRANSLATION_COLUMN_PREFIX}en`), true);
  assert.equal(isSelectableGridColId("drag"), false);

  assert.deepEqual(getPasteColumns(CONFIG), ["article", "word", "additional-info", "to-en", "to-uk"]);
});

test("buildRowCopyText copies word rows in paste-compatible column order", () => {
  assert.equal(buildRowCopyText(word, CONFIG), "der\tBaum\tplural: Bäume\ttree, wood\tдерево");
});

test("buildRowCopyText copies topic rows as their label only", () => {
  assert.equal(buildRowCopyText(topic, CONFIG), "Nature");
});

test("getCellText reads topic labels only from article or word columns", () => {
  assert.equal(getCellText(topic, COLUMN_ID_ARTICLE, CONFIG.translationDelimiter), "Nature");
  assert.equal(getCellText(topic, COLUMN_ID_WORD, CONFIG.translationDelimiter), "Nature");
  assert.equal(getCellText(topic, `${TRANSLATION_COLUMN_PREFIX}en`, CONFIG.translationDelimiter), "");
});

test("setCellText updates translation arrays using the configured delimiter", () => {
  const updated = setCellText(word, `${TRANSLATION_COLUMN_PREFIX}en`, "tree, timber, ", CONFIG.translationDelimiter);

  assert.equal(updated.type, "word");
  assert.deepEqual(updated.type === "word" ? updated.valuesTo.en : [], ["tree", "timber"]);
});

test("setCellText updates topic label through article and word columns only", () => {
  assert.deepEqual(setCellText(topic, COLUMN_ID_WORD, "People", CONFIG.translationDelimiter), {
    ...topic,
    label: "People"
  });
  assert.equal(setCellText(topic, `${TRANSLATION_COLUMN_PREFIX}en`, "ignored", CONFIG.translationDelimiter), topic);
});

test("clearCellText clears only the requested cell and preserves unchanged rows by reference", () => {
  const clearedTranslation = clearCellText(word, `${TRANSLATION_COLUMN_PREFIX}en`);
  assert.deepEqual(clearedTranslation.type === "word" ? clearedTranslation.valuesTo.en : [], []);
  assert.deepEqual(clearedTranslation.type === "word" ? clearedTranslation.valuesTo.uk : [], ["дерево"]);

  const alreadyEmpty = clearCellText(clearedTranslation, `${TRANSLATION_COLUMN_PREFIX}en`);
  assert.equal(alreadyEmpty, clearedTranslation);
});
