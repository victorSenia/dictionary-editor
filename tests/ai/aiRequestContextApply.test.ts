import test from "node:test";
import assert from "node:assert/strict";
import type { AiParseResult } from "../../src/ai/types";
import type { DictionaryConfig } from "../../src/models/dictionary";
import type { GridRow } from "../../src/types/grid";

import { applyTranslationParseResult, buildAiRequestContext } from "../../src/ai/requestContext";
import { TRANSLATION_COLUMN_PREFIX } from "../../src/constants/grid";

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

const rows: GridRow[] = [
  { rowId: "topic-1", type: "topic", label: "Nature" },
  {
    rowId: "word-1",
    type: "word",
    article: "der",
    valueFrom: "Baum",
    additionalInformation: "",
    valuesTo: { en: ["tree"], uk: [] }
  },
  {
    rowId: "word-2",
    type: "word",
    article: "die",
    valueFrom: "Lampe",
    additionalInformation: "",
    valuesTo: { en: ["lamp"], uk: ["лампа"] }
  },
  { rowId: "topic-2", type: "topic", label: "Food" },
  {
    rowId: "word-3",
    type: "word",
    article: "der",
    valueFrom: "Apfel",
    additionalInformation: "",
    valuesTo: { en: [], uk: [] }
  }
];

test("buildAiRequestContext limits translation mode to the selected topic section", () => {
  const context = buildAiRequestContext({
    config: CONFIG,
    rows,
    selectedCellKeys: [`word-1::${TRANSLATION_COLUMN_PREFIX}uk`],
    modeChoice: "auto"
  });

  assert.equal(context.mode, "translations");
  assert.equal(context.topic, "Nature");
  assert.equal(context.topicRowId, "topic-1");
  assert.deepEqual(context.words.map((word) => word.rowId), ["word-1"]);
  assert.deepEqual(context.targetLanguages, ["uk"]);
});

test("buildAiRequestContext falls back to vocabulary mode when the selected topic section has no missing translations", () => {
  const completeRows: GridRow[] = [
    { rowId: "topic-full", type: "topic", label: "Complete" },
    {
      rowId: "word-full",
      type: "word",
      article: "die",
      valueFrom: "Lampe",
      additionalInformation: "",
      valuesTo: { en: ["lamp"], uk: ["лампа"] }
    }
  ];

  const context = buildAiRequestContext({
    config: CONFIG,
    rows: completeRows,
    selectedCellKeys: [`word-full::${TRANSLATION_COLUMN_PREFIX}uk`],
    modeChoice: "auto"
  });

  assert.equal(context.mode, "vocabulary");
  assert.equal(context.topic, "");
  assert.deepEqual(context.words, []);
  assert.deepEqual(context.targetLanguages, ["en", "uk"]);
});

test("applyTranslationParseResult fills only requested missing languages and preserves existing translations", () => {
  const context = buildAiRequestContext({
    config: CONFIG,
    rows,
    selectedCellKeys: [`word-1::${TRANSLATION_COLUMN_PREFIX}uk`],
    modeChoice: "translations"
  });
  const parseResult: AiParseResult = {
    rows: [
      {
        article: "",
        word: "",
        additionalInformation: "",
        translationLanguage: "",
        translationText: "",
        translationValues: { en: ["wood"], uk: ["дерево"] }
      }
    ],
    unparsedLines: [],
    pattern: "",
    message: "aiPanel.parseResultMatched"
  };

  const result = applyTranslationParseResult(rows, context, parseResult);

  assert.deepEqual(result[1].type === "word" ? result[1].valuesTo : {}, { en: ["tree"], uk: ["дерево"] });
  assert.equal(result[2], rows[2]);
});

test("applyTranslationParseResult leaves a row unchanged when parsed row is missing or empty", () => {
  const context = buildAiRequestContext({
    config: CONFIG,
    rows,
    selectedCellKeys: [`word-1::${TRANSLATION_COLUMN_PREFIX}uk`],
    modeChoice: "translations"
  });

  assert.deepEqual(applyTranslationParseResult(rows, context, { rows: [], unparsedLines: [], pattern: "", message: "" }), rows);
});
