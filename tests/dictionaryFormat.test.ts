import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { exportFile, parseFile } from "../src/io/dictionaryFormat.ts";
import type { DictionaryConfig, DictionaryRow } from "../src/models/dictionary.ts";

const FALLBACK_CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en", "uk"],
  articles: [""],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ";",
  topicFlag: "\t",
  topicDelimiter: "",
  rootTopic: "root"
};

test("parseFile reads encoded config and word fields", () => {
  const content = [
    "org.leo.dictionary.config.entity.ParseWords:de:en;uk:die+;das+;der+:%5C%7C:%3B:%3B:%5Ct::Einfach+gut+A1.1",
    "der Abend; Abende | evening | evening-uk"
  ].join("\n");

  const { config, rows } = parseFile(content, FALLBACK_CONFIG);
  assert.equal(config.languageFrom, "de");
  assert.deepEqual(config.languagesTo, ["en", "uk"]);

  assert.equal(rows.length, 1);
  const row = rows[0];
  assert.equal(row.type, "word");
  if (row.type !== "word") {
    throw new Error("Expected a word row");
  }

  assert.equal(row.article, "der");
  assert.equal(row.valueFrom, "Abend");
  assert.equal(row.additionalInformation, "Abende");
  assert.deepEqual(row.valuesTo.en, ["evening"]);
  assert.deepEqual(row.valuesTo.uk, ["evening-uk"]);
});

test("parseFile reads topic rows from topic flag", () => {
  const content = [
    "org.leo.dictionary.config.entity.ParseWords:de:en;uk:die+;das+;der+:%5C%7C:%3B:%3B:%5Ct::Einfach+gut+A1.1",
    "\tWortschatz zu Lektion 1"
  ].join("\n");

  const { rows } = parseFile(content, FALLBACK_CONFIG);
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0], { type: "topic", label: "Wortschatz zu Lektion 1" });
});

test("parseFile falls back to provided config without header line", () => {
  const content = "Haus | house | house-uk";
  const { config, rows } = parseFile(content, FALLBACK_CONFIG);

  assert.deepEqual(config, FALLBACK_CONFIG);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].type, "word");
});

test("exportFile and parseFile round-trip config and rows", () => {
  const config: DictionaryConfig = {
    languageFrom: "de",
    languagesTo: ["en", "fr"],
    articles: ["der ", "die "],
    delimiter: "|",
    additionalInformationDelimiter: ";",
    translationDelimiter: ",",
    topicFlag: "\t",
    topicDelimiter: "",
    rootTopic: "Root Topic"
  };

  const rows: DictionaryRow[] = [
    { type: "topic", label: "Food" },
    {
      type: "word",
      article: "der",
      valueFrom: "Apfel",
      additionalInformation: "Plural: Aepfel",
      valuesTo: {
        en: ["apple", "pome"],
        fr: ["pomme"]
      }
    }
  ];

  const exported = exportFile(config, rows);
  const parsed = parseFile(exported, FALLBACK_CONFIG);

  assert.deepEqual(parsed.config, config);
  assert.deepEqual(parsed.rows, rows);
});

function normalizeText(value: string): string {
  return value.replace(/\r\n/g, "\n").trimEnd();
}

test("fixture file round-trips through parse and export", () => {
  const fixturePath = "tests/Einfach_gut_A1.1.txt";
  const input = readFileSync(fixturePath, "utf8");

  const parsed = parseFile(input, FALLBACK_CONFIG);
  const exported = exportFile(parsed.config, parsed.rows);

  assert.equal(normalizeText(exported), normalizeText(input));
});
