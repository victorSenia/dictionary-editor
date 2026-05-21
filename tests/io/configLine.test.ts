import test from "node:test";
import assert from "node:assert/strict";
import type { DictionaryConfig } from "../../src/models/dictionary";

import { buildConfigLine, parseConfigLine, resolveToken } from "../../src/io/configLine";

const CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en", "uk", "custom lang"],
  articles: ["der ", "die ", "das "],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ",",
  topicFlag: "\t",
  topicDelimiter: "\\",
  rootTopic: "Einfach gut A1.1"
};

test("resolveToken converts escaped control and delimiter tokens", () => {
  assert.equal(resolveToken("\\t"), "\t");
  assert.equal(resolveToken("\\n"), "\n");
  assert.equal(resolveToken("\\r"), "\r");
  assert.equal(resolveToken("\\|"), "|");
  assert.equal(resolveToken("a\\\\b"), "a\\b");
});

test("buildConfigLine and parseConfigLine round-trip encoded spaces and escaped separators", () => {
  const line = buildConfigLine(CONFIG);

  assert.match(line, /^org\.leo\.dictionary\.config\.entity\.ParseWords:/);
  assert.match(line, /custom\+lang/);
  assert.match(line, /Einfach\+gut\+A1\.1/);

  assert.deepEqual(parseConfigLine(line), CONFIG);
});

test("parseConfigLine returns null for unrelated or malformed header lines", () => {
  assert.equal(parseConfigLine("Haus | house"), null);
  assert.equal(parseConfigLine("org.leo.dictionary.config.entity.ParseWords:de:en"), null);
});

test("parseConfigLine keeps undecodable values instead of throwing", () => {
  const malformed = "org.leo.dictionary.config.entity.ParseWords:de:%E0%A4%A:der+:%7C:%3B:%3B:%5Ct::Root";
  const parsed = parseConfigLine(malformed);

  assert.ok(parsed);
  assert.deepEqual(parsed?.languagesTo, ["%E0%A4%A"]);
});
