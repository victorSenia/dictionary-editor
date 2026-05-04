import test from "node:test";
import assert from "node:assert/strict";
import { buildAiRequest, formatPromptLanguage } from "../src/ai/requestBuilder.ts";
import type { DictionaryConfig } from "../src/models/dictionary.ts";

const CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en", "uk"],
  articles: ["der ", "die ", "das "],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ";",
  topicFlag: "\t",
  topicDelimiter: "",
  rootTopic: "German A1"
};

test("buildAiRequest uses course name from dictionary config and all target languages", () => {
  const request = buildAiRequest(
    {
      topic: "Classroom",
      wordCount: "120"
    },
    CONFIG
  );

  assert.match(request, /Course: German A1/);
  assert.match(request, /Topic: Classroom/);
  assert.match(request, /Count: 120/);
  assert.match(request, /Source language: Deutsch/);
  assert.match(request, /Target languages: English, Українська/);
  assert.match(request, /more than one translation per language is allowed/);
  assert.match(request, /If articles are natural in the source language, include them/);
  assert.match(request, /ending changes, plural forms, or usage notes/);
});

test("buildAiRequest omits empty optional course, topic, and count fields", () => {
  const request = buildAiRequest(
    {
      topic: "",
      wordCount: ""
    },
    {
      ...CONFIG,
      rootTopic: ""
    }
  );

  assert.doesNotMatch(request, /Course:/);
  assert.doesNotMatch(request, /Topic:/);
  assert.doesNotMatch(request, /Count:/);
});

test("buildAiRequest can request only missing translations for existing words", () => {
  const request = buildAiRequest(
    {
      topic: "Classroom",
      wordCount: "120"
    },
    CONFIG,
    {
      mode: "translations",
      topic: "Classroom",
      targetLanguages: ["uk"],
      words: [
        {
          rowId: "row-1",
          article: "der",
          word: "Tisch",
          additionalInformation: "plural: Tische",
          missingLanguages: ["uk"]
        }
      ]
    }
  );

  assert.doesNotMatch(request, /Count:/);
  assert.match(request, /Source language: Deutsch/);
  assert.match(request, /Target languages: Українська/);
  assert.match(request, /Translate the listed existing source words/);
  assert.doesNotMatch(request, /Create concise vocabulary rows/);
  assert.doesNotMatch(request, /extra information/);
  assert.match(request, /der Tisch \(plural: Tische\)/);
  assert.doesNotMatch(request, /missing uk/);
});

test("formatPromptLanguage keeps unknown custom language keys unchanged", () => {
  assert.equal(formatPromptLanguage("xx"), "xx");
  assert.equal(formatPromptLanguage("custom-language"), "custom-language");
});

