import test from "node:test";
import assert from "node:assert/strict";
import type { AiParsingConfiguration } from "../../src/ai/types";
import type { DictionaryConfig, DictionaryRow, WordRow } from "../../src/models/dictionary";

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
    entries: fields.map((field) => ({ field, prefix: "", suffix: "" })),
    separators
  };
}


function assertWordRow(row: DictionaryRow): asserts row is WordRow {
  assert.equal(row.type, "word");
}

function suggestedConfiguration(response: string, config: DictionaryConfig): AiParsingConfiguration {
  const suggestion = suggestAiParsingPattern(response, config.languagesTo, config.articles);
  if (!suggestion) {
    throw new Error("Expected a parsing suggestion");
  }
  return {
    entries: suggestion.entries,
    separators: suggestion.separators
  };
}

test("buildAiParsingPattern requires an explicit visual item pattern", () => {
  assert.throws(() => buildAiParsingPattern({
    entries: [],
    separators: []
  }, CONFIG.articles), /aiPanel.parsingConfigurationMissingPattern/);
});

test("parseAiResponseRows parses backend-style plain text suggestions", () => {
  const response = "1. der Tisch | table\n2. die Lampe | lamp";
  const rows = parseAiResponseRows(response, CONFIG, suggestedConfiguration(response, CONFIG));

  assert.deepEqual(rows, [
    {
      type: "word",
      article: "der",
      valueFrom: "Tisch",
      additionalInformation: "",
      valuesTo: { en: ["table"] }
    },
    {
      type: "word",
      article: "die",
      valueFrom: "Lampe",
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
    {
      entries: [
        { field: "article", prefix: "#. ", suffix: "" },
        { field: "word", prefix: "", suffix: "" },
        { field: "additionalInformation", prefix: "", suffix: "" }
      ],
      separators: ["", " | "]
    }
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
  assert.deepEqual(suggestion.entries.map((entry) => entry.field), ["article", "word", "translation:en"]);
  assert.deepEqual(suggestion.separators, ["", " | "]);
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
  assert.deepEqual(suggestion.entries.map((entry) => entry.field), ["article", "word", "translation:en", "translation:uk"]);
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
  assert.deepEqual(suggestion.entries.map((entry) => entry.field), ["article", "word", "translation:en"]);
  assert.deepEqual(suggestion.separators, ["", " | "]);
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
  assert.deepEqual(suggestion.entries.map((entry) => entry.field), ["article", "word", "translation:en", "translation:ru", "translation:uk"]);
  assert.deepEqual(suggestion.separators, ["", " — ", " — ", " — "]);
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
  assert.deepEqual(suggestion.entries.map((entry) => entry.field), ["word", "translation:uk"]);
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
  assert.deepEqual(suggestion.entries.map((entry) => entry.field), ["translation:uk"]);
  assert.deepEqual(suggestion.separators, []);
});

const MULTILINE_NUMBERED_RESPONSE = `1.  **ab**
    *   off, down, from, by
2.  **aber**
    *   but, however
3.  **Anfang** (m)
    *   beginning
4.  **Angst** (f)
    *   fear, anxiety
5.  **Buch** (n)
    *   book
6.  **gut**
    *   good`;

const MULTILINE_NUMBERED_WITH_INTRO = `Звісно, ось 10 стислих словникових записів з німецької на англійську:

---

**Deutsch to English Dictionary Entries**

1.  **der Apfel** (pl. die Äpfel)
    *   English: apple

2.  **das Buch** (pl. die Bücher)
    *   English: book

3.  **die Katze** (pl. die Katzen)
    *   English: cat

4.  **laufen**
    *   English: to run, to walk

5.  **gut**
    *   English: good, well

6.  **haben**
    *   English: to have (auxiliary verb also)

7.  **sein**
    *   English: to be (auxiliary verb also)

8.  **der Tisch** (pl. die Tische)
    *   English: table

9.  **das Haus** (pl. die Häuser)
    *   English: house

10. **die Sonne**
    *   English: sun`;

const MARKDOWN_TABLE_RESPONSE = `Here are 10 concise vocabulary rows with multiple English translations and brief notes where useful:

| Deutsch | English | Notes |
|---|---|---|
| Apfel | Apple | |
| Buch | Book, Volume | |
| Haus | House, Home | |
| Hund | Dog | Plural: Hunde (Dogs) |
| Katze | Cat | Plural: Katzen (Cats) |
| Mann | Man, Husband | Plural: Männer (Men) |
| Frau | Woman, Wife | Plural: Frauen (Women) |
| Kind | Child | Plural: Kinder (Children) |
| Auto | Car, Automobile | |
| Tisch | Table | Plural: Tische (Tables) |`;

const LABELLED_BLOCK_RESPONSE = `Here are 5 concise vocabulary rows with Deutsch to English translations:

**1.**
*   **Deutsch:** Haus
*   **English:** house, home

**2.**
*   **Deutsch:** Hund (plural: Hunde)
*   **English:** dog

**3.**
*   **Deutsch:** essen
*   **English:** to eat

**4.**
*   **Deutsch:** klein
*   **English:** small, little

**5.**
*   **Deutsch:** schnell
*   **English:** fast, quick`;

test("suggestAiParsingPattern keeps numbering as the Word prefix and multiline bullet as a separator", () => {
  const suggestion = suggestAiParsingPattern(
    MULTILINE_NUMBERED_RESPONSE,
    ["en"],
    CONFIG.articles
  );

  assert.ok(suggestion);
  assert.deepEqual(
    suggestion.entries.map((entry) => entry.field),
    ["word", "additionalInformation", "translation:en"]
  );
  assert.equal(suggestion.entries[0].prefix, "#.  **");
  assert.equal(suggestion.entries[0].suffix, "**");
  assert.equal(suggestion.entries[1].prefix, "(");
  assert.equal(suggestion.entries[1].suffix, ")");
  assert.equal(suggestion.entries[2].prefix, "    *   ");
  assert.deepEqual(suggestion.separators, [" ", "\\n"]);
  assert.equal(suggestion.matchedLines, 6);
  assert.equal(suggestion.totalLines, 6);
});

test("parseAiResponseRows parses multiline numbered rows with optional additional information", () => {
  const rows = parseAiResponseRows(
    MULTILINE_NUMBERED_RESPONSE,
    CONFIG,
    suggestedConfiguration(MULTILINE_NUMBERED_RESPONSE, CONFIG)
  );

  assert.equal(rows.length, 6);
  assert.deepEqual(rows[0], {
    type: "word",
    article: "",
    valueFrom: "ab",
    additionalInformation: "",
    valuesTo: { en: ["off", "down", "from", "by"] }
  });
  assert.deepEqual(rows[2], {
    type: "word",
    article: "",
    valueFrom: "Anfang",
    additionalInformation: "m",
    valuesTo: { en: ["beginning"] }
  });
});

test("parseAiResponseRows ignores introductory text and parses labelled English continuation lines", () => {
  const rows = parseAiResponseRows(
    MULTILINE_NUMBERED_WITH_INTRO,
    CONFIG,
    suggestedConfiguration(MULTILINE_NUMBERED_WITH_INTRO, CONFIG)
  );

  assert.equal(rows.length, 10);
  const firstRow = rows[0];
  const lastRow = rows[9];
  assertWordRow(firstRow);
  assertWordRow(lastRow);
  assert.equal(firstRow.valueFrom, "der Apfel");
  assert.equal(firstRow.additionalInformation, "pl. die Äpfel");
  assert.deepEqual(firstRow.valuesTo.en, ["apple"]);
  assert.equal(lastRow.valueFrom, "die Sonne");
});

test("parseAiResponseRows parses Markdown tables without importing header rows", () => {
  const rows = parseAiResponseRows(
    MARKDOWN_TABLE_RESPONSE,
    CONFIG,
    suggestedConfiguration(MARKDOWN_TABLE_RESPONSE, CONFIG)
  );

  assert.equal(rows.length, 10);
  const firstRow = rows[0];
  const fourthRow = rows[3];
  assertWordRow(firstRow);
  assertWordRow(fourthRow);
  assert.equal(firstRow.valueFrom, "Apfel");
  assert.deepEqual(firstRow.valuesTo.en, ["Apple"]);
  assert.equal(fourthRow.additionalInformation, "Plural: Hunde (Dogs)");
  assert.equal(rows.some((row) => row.type === "word" && row.valueFrom === "Deutsch"), false);
});

test("suggestAiParsingPattern preserves actual labelled-block text in the friendly pattern", () => {
  const suggestion = suggestAiParsingPattern(
    LABELLED_BLOCK_RESPONSE,
    ["en"],
    CONFIG.articles
  );

  assert.ok(suggestion);
  assert.deepEqual(
    suggestion.entries.map((entry) => entry.field),
    ["word", "additionalInformation", "translation:en"]
  );
  assert.equal(suggestion.entries[0].prefix, "**#.**\\n*   **Deutsch:** ");
  assert.equal(suggestion.entries[0].suffix, "");
  assert.equal(suggestion.entries[1].prefix, "(");
  assert.equal(suggestion.entries[1].suffix, ")");
  assert.equal(suggestion.entries[2].prefix, "*   **English:** ");
  assert.deepEqual(suggestion.separators, [" ", "\\n"]);
  assert.equal(suggestion.matchedLines, 5);
  assert.equal(suggestion.totalLines, 5);
});

test("parseAiResponseRows parses labelled multiline blocks", () => {
  const rows = parseAiResponseRows(
    LABELLED_BLOCK_RESPONSE,
    CONFIG,
    suggestedConfiguration(LABELLED_BLOCK_RESPONSE, CONFIG)
  );

  assert.equal(rows.length, 5);
  assert.deepEqual(rows[0], {
    type: "word",
    article: "",
    valueFrom: "Haus",
    additionalInformation: "",
    valuesTo: { en: ["house", "home"] }
  });
  assert.deepEqual(rows[1], {
    type: "word",
    article: "",
    valueFrom: "Hund",
    additionalInformation: "plural: Hunde",
    valuesTo: { en: ["dog"] }
  });
});

const PLAIN_LABELLED_BLOCK_RESPONSE = `**1.**
* Deutsch: Haus
* A deliberately long translation label without an arbitrary maximum length: house, home

**2.**
* Deutsch: Hund (plural: Hunde)
* A deliberately long translation label without an arbitrary maximum length: dog`;

test("suggestAiParsingPattern accepts labelled blocks without bold labels and without label length limits", () => {
  const suggestion = suggestAiParsingPattern(
    PLAIN_LABELLED_BLOCK_RESPONSE,
    ["en"],
    CONFIG.articles
  );

  assert.ok(suggestion);
  assert.equal(suggestion.entries[0].prefix, "**#.**\\n* Deutsch: ");
  assert.equal(
    suggestion.entries[2].prefix,
    "* A deliberately long translation label without an arbitrary maximum length: "
  );
  assert.equal(suggestion.matchedLines, 2);
  assert.equal(suggestion.totalLines, 2);
});

test("parseAiResponseRows parses labelled blocks when bold labels are omitted", () => {
  const rows = parseAiResponseRows(
    PLAIN_LABELLED_BLOCK_RESPONSE,
    CONFIG,
    suggestedConfiguration(PLAIN_LABELLED_BLOCK_RESPONSE, CONFIG)
  );

  assert.equal(rows.length, 2);
  assert.deepEqual(rows[0], {
    type: "word",
    article: "",
    valueFrom: "Haus",
    additionalInformation: "",
    valuesTo: { en: ["house", "home"] }
  });
  assert.deepEqual(rows[1], {
    type: "word",
    article: "",
    valueFrom: "Hund",
    additionalInformation: "plural: Hunde",
    valuesTo: { en: ["dog"] }
  });
});
