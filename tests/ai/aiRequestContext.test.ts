import test from "node:test";
import assert from "node:assert/strict";
import type { DictionaryConfig } from "../../src/models/dictionary";
import type { GridRow } from "../../src/types/grid";

import { TRANSLATION_COLUMN_PREFIX } from "../../src/constants/grid";
import { buildAiRequestContext } from "../../src/ai/requestContext";

const CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en", "ru", "uk"],
  articles: ["der ", "die ", "das "],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ";",
  topicFlag: "\t",
  topicDelimiter: "",
  rootTopic: "German A1"
};

test("buildAiRequestContext targets all missing translation languages in selected topic", () => {
  const rows: GridRow[] = [
    { rowId: "topic-1", type: "topic", label: "Classroom" },
    {
      rowId: "word-1",
      type: "word",
      article: "der",
      valueFrom: "Tisch",
      additionalInformation: "",
      valuesTo: { en: ["table"], ru: [], uk: [] }
    },
    {
      rowId: "word-2",
      type: "word",
      article: "die",
      valueFrom: "Lampe",
      additionalInformation: "",
      valuesTo: { en: ["lamp"], ru: ["лампа"], uk: [] }
    }
  ];

  const context = buildAiRequestContext({
    config: CONFIG,
    rows,
    selectedCellKeys: [`word-1::${TRANSLATION_COLUMN_PREFIX}uk`],
    modeChoice: "auto"
  });

  assert.equal(context.mode, "translations");
  assert.equal(context.topic, "Classroom");
  assert.deepEqual(context.targetLanguages, ["ru", "uk"]);
  assert.deepEqual(context.words.map((word) => word.missingLanguages), [["ru", "uk"], ["uk"]]);
});

test("buildAiRequestContext does not use course name as editable AI topic fallback", () => {
  const context = buildAiRequestContext({
    config: CONFIG,
    rows: [],
    selectedCellKeys: [],
    modeChoice: "vocabulary"
  });

  assert.equal(context.mode, "vocabulary");
  assert.equal(context.topic, "");
});
