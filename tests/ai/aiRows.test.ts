import test from "node:test";
import assert from "node:assert/strict";
import type { AiParsingConfiguration } from "../../src/ai/types";
import type { DictionaryConfig } from "../../src/models/dictionary";

import { buildTargetTranslationFields, buildAiParsingPattern, buildVisualAiParsingPattern, parseAiResponseRows, suggestAiParsingPattern } from "../../src/ai/aiRows";

const CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en"],
  articles: ["der ", "die ", "das "],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ",",
  topicFlag: "\t",
  topicDelimiter: "",
  rootTopic: "German A1"
};

function visualConfiguration(
  config: DictionaryConfig,
  fields: Parameters<typeof buildVisualAiParsingPattern>[0],
  separators: Parameters<typeof buildVisualAiParsingPattern>[1]
): AiParsingConfiguration {
  return {
    itemPattern: buildVisualAiParsingPattern(fields, separators, "LIST_MARKER", config.articles),
    linePrefixPreset: "LIST_MARKER"
  };
}

function suggestedConfiguration(response: string, config: DictionaryConfig): AiParsingConfiguration {
  const suggestion = suggestAiParsingPattern(response, config.languagesTo, config.articles);
  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  return visualConfiguration(config, suggestion.fields, suggestion.separators);
}

test("buildAiParsingPattern requires an explicit visual item pattern", () => {
  assert.throws(() => buildAiParsingPattern({
    itemPattern: "",
    linePrefixPreset: "LIST_MARKER"
  }, CONFIG.articles), /aiPanel.parsingConfigurationMissingPattern/);
});

test("parseAiResponseRows parses backend-style plain text suggestions", () => {
  const response = "1. der Tisch | table\n2. die Lampe | lamp";
  const rows = parseAiResponseRows(response, CONFIG, suggestedConfiguration(response, CONFIG));

  assert.deepEqual(rows, [
    {
      type: "word",
      article: "",
      valueFrom: "der Tisch",
      additionalInformation: "",
      valuesTo: { en: ["table"] }
    },
    {
      type: "word",
      article: "",
      valueFrom: "die Lampe",
      additionalInformation: "",
      valuesTo: { en: ["lamp"] }
    }
  ]);
});

test("parseAiResponseRows leaves unconfigured article-like text in the word", () => {
  const response = "ein Tisch | table";
  const rows = parseAiResponseRows(response, CONFIG, suggestedConfiguration(response, CONFIG));

  assert.deepEqual(rows, [
    {
      type: "word",
      article: "",
      valueFrom: "ein Tisch",
      additionalInformation: "",
      valuesTo: { en: ["table"] }
    }
  ]);
});

test("parseAiResponseRows maps labelled translations to configured target columns", () => {
  const config = {
    ...CONFIG,
    languagesTo: ["en", "es"]
  };
  const response = "der Tisch | en: table; es: mesa";
  const rows = parseAiResponseRows(response, config, suggestedConfiguration(response, config));

  assert.deepEqual(rows, [
    {
      type: "word",
      article: "der",
      valueFrom: "Tisch",
      additionalInformation: "en",
      valuesTo: {
        en: ["table"],
        es: ["mesa"]
      }
    }
  ]);
});

test("parseAiResponseRows maps visual translation fields to target columns", () => {
  const config = {
    ...CONFIG,
    languagesTo: ["en", "uk"]
  };
  const fields = ["article", "word", ...buildTargetTranslationFields(config.languagesTo)] as const;
  const rows = parseAiResponseRows(
    "der Tisch | table; стіл",
    config,
    visualConfiguration(config, [...fields], ["", " | ", "; "])
  );

  assert.deepEqual(rows, [
    {
      type: "word",
      article: "der",
      valueFrom: "Tisch",
      additionalInformation: "",
      valuesTo: {
        en: ["table"],
        uk: ["стіл"]
      }
    }
  ]);
});

test("parseAiResponseRows splits named translation fields by configured translation delimiter", () => {
  const config = {
    ...CONFIG,
    languagesTo: ["uk"]
  };
  const fields = ["article", "word", ...buildTargetTranslationFields(config.languagesTo)] as const;
  const rows = parseAiResponseRows(
    "der Tisch — стіл, парта",
    config,
    visualConfiguration(config, [...fields], ["", " — "])
  );

  assert.deepEqual(rows[0].type === "word" ? rows[0].valuesTo.uk : [], ["стіл", "парта"]);
});

test("parseAiResponseRows accepts information-only rows when no target languages are configured", () => {
  const config = {
    ...CONFIG,
    languagesTo: []
  };
  const fields = ["article", "word", "additionalInformation"] as const;
  const rows = parseAiResponseRows(
    "1. der Tisch | table\n2. die Lampe | lamp",
    config,
    visualConfiguration(config, [...fields], ["", " | "])
  );

  assert.deepEqual(rows, [
    {
      type: "word",
      article: "der",
      valueFrom: "Tisch",
      additionalInformation: "table",
      valuesTo: {}
    },
    {
      type: "word",
      article: "die",
      valueFrom: "Lampe",
      additionalInformation: "lamp",
      valuesTo: {}
    }
  ]);
});


test("suggestAiParsingPattern selects a pattern that matches most response lines", () => {
  const suggestion = suggestAiParsingPattern(
    "1. der Tisch | table\n2. die Lampe | lamp\nThis is extra text",
    ["en"],
    CONFIG.articles
  );

  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  assert.equal(suggestion.matchedLines, 2);
  assert.equal(suggestion.totalLines, 3);
  assert.deepEqual(suggestion.fields, ["word", "additionalInformation", "translation:en"]);
  assert.deepEqual(suggestion.separators, [" | ", " | "]);
});

test("suggestAiParsingPattern includes target translation fields when multiple languages are configured", () => {
  const suggestion = suggestAiParsingPattern(
    "1. der Tisch | table; стіл\n2. die Lampe | lamp; лампа",
    ["en", "uk"],
    CONFIG.articles
  );

  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  assert.deepEqual(suggestion.fields, ["article", "word", "translation:en", "translation:uk"]);
  assert.deepEqual(suggestion.separators, ["", " | ", "; "]);
});

test("suggestAiParsingPattern can use fewer target fields for a stale shorter response", () => {
  const suggestion = suggestAiParsingPattern(
    "1. der Tisch | table\n2. die Lampe | lamp",
    ["en", "uk", "ru"],
    CONFIG.articles
  );

  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  assert.equal(suggestion.matchedLines, 2);
  assert.equal(suggestion.totalLines, 2);
  assert.deepEqual(suggestion.fields, ["word", "additionalInformation", "translation:en"]);
  assert.deepEqual(suggestion.separators, [" | ", " | "]);
});

test("suggestAiParsingPattern returns null when no candidate matches any line", () => {
  const suggestion = suggestAiParsingPattern(
    "This is explanatory text without a row separator",
    ["en"],
    CONFIG.articles
  );

  assert.equal(suggestion, null);
});

test("suggestAiParsingPattern prefers configured articles and dash separators over splitting word on space", () => {
  const suggestion = suggestAiParsingPattern(
    "der Tisch — table — стол — стіл\nvergessen — to forget — забывать — забувати",
    ["en", "ru", "uk"],
    CONFIG.articles
  );

  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  assert.deepEqual(suggestion.fields, ["word", "additionalInformation", "translation:en", "translation:ru", "translation:uk"]);
  assert.deepEqual(suggestion.separators, [" — ", " — ", " — ", " — "]);
});

test("suggestAiParsingPattern uses only requested translation targets", () => {
  const suggestion = suggestAiParsingPattern(
    "Here are the translations into Ukrainian:\n\nder Tisch — стіл\ndie Lampe — лампа",
    ["uk"],
    CONFIG.articles,
    true
  );

  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  assert.equal(suggestion.matchedLines, 2);
  assert.equal(suggestion.totalLines, 3);
  assert.deepEqual(suggestion.fields, ["word", "translation:uk"]);
  assert.deepEqual(suggestion.separators, [" — "]);
});

test("suggestAiParsingPattern allows translation-only lines in translation mode", () => {
  const suggestion = suggestAiParsingPattern(
    "table\nlamp",
    ["uk"],
    CONFIG.articles,
    true
  );

  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  assert.equal(suggestion.matchedLines, 2);
  assert.deepEqual(suggestion.fields, ["translation:uk"]);
  assert.deepEqual(suggestion.separators, []);
});
