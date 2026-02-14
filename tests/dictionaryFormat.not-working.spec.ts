/// <reference types="node" />
import { parseFile } from "../src/io/dictionaryFormat";
import type { DictionaryConfig } from "../src/models/dictionary";
import { existsSync, readFileSync } from "fs";

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

function assertEqual(actual: unknown, expected: unknown, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}. Expected: ${String(expected)}, Actual: ${String(actual)}`);
  }
}

function testEncodedArticlesSplit(): void {
  const content = [
    "org.leo.dictionary.config.entity.ParseWords:de:en;uk:die+;das+;der+:%5C%7C:%3B:%3B:%5Ct::Einfach+gut+A1.1",
    "der Abend; Abende | evening | вечір"
  ].join("\n");

  const { rows } = parseFile(content, FALLBACK_CONFIG);
  const row = rows[0];
  if (row.type !== "word") {
    throw new Error("Expected word row");
  }

  assertEqual(row.article, "der", "Article should be parsed");
  assertEqual(row.valueFrom, "Abend", "Word should be parsed");
  assertEqual(row.additionalInformation, "Abende", "Additional info should be parsed");
}

function testTopicFlagParsing(): void {
  const content = [
    "org.leo.dictionary.config.entity.ParseWords:de:en;uk:die+;das+;der+:%5C%7C:%3B:%3B:%5Ct::Einfach+gut+A1.1",
    "\tWortschatz zu Lektion 1: Hallo! Wie geht‘s?"
  ].join("\n");

  const { rows } = parseFile(content, FALLBACK_CONFIG);
  const row = rows[0];
  assertEqual(row.type, "topic", "Row should be recognized as topic");
  if (row.type === "topic") {
    assertEqual(row.label, "Wortschatz zu Lektion 1: Hallo! Wie geht‘s?", "Topic label should match");
  }
}

function printParsedDataFromRealFile(): void {
  const candidates = [
    "Einfach_gut_A1.1.txt",
    "./Einfach_gut_A1.1.txt",
    "../Einfach_gut_A1.1.txt",
    "tests/Einfach_gut_A1.1.txt",
    "./tests/Einfach_gut_A1.1.txt"
  ];
  const filePath = candidates.find((candidate) => existsSync(candidate));
  if (!filePath) {
    console.log("PARSED_FILE_SKIPPED", "Einfach_gut_A1.1.txt not found");
    return;
  }

  const fileContent = readFileSync(filePath, "utf8");
  const parsed = parseFile(fileContent, FALLBACK_CONFIG);
  const previewRows = parsed.rows.slice(0, 5);

  console.log("PARSED_FILE_PATH", filePath);
  console.log("PARSED_CONFIG", JSON.stringify(parsed.config, null, 2));
  console.log("PARSED_ROWS_COUNT", parsed.rows.length);
  console.log("PARSED_ROWS_PREVIEW", JSON.stringify(previewRows, null, 2));
}

// Intentionally executed on load: these checks document the current parsing failures.
testEncodedArticlesSplit();
testTopicFlagParsing();
printParsedDataFromRealFile();
