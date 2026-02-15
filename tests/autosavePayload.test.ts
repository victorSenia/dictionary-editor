import test from "node:test";
import assert from "node:assert/strict";
import { parseAutosavePayload } from "../src/io/autosavePayload.ts";

test("parseAutosavePayload returns payload for valid content", () => {
  const content = JSON.stringify({
    config: { languageFrom: "de" },
    rows: [{ type: "topic", label: "A1" }],
    filePath: "D:\\tmp\\dict.txt"
  });

  const payload = parseAutosavePayload(content);
  assert.notEqual(payload, null);
  if (payload == null) {
    throw new Error("Expected payload to be parsed");
  }
  assert.equal(payload.filePath, "D:\\tmp\\dict.txt");
});

test("parseAutosavePayload normalizes non-string filePath to null", () => {
  const content = JSON.stringify({
    config: { languageFrom: "de" },
    rows: [],
    filePath: 123
  });

  const payload = parseAutosavePayload(content);
  assert.notEqual(payload, null);
  if (payload == null) {
    throw new Error("Expected payload to be parsed");
  }
  assert.equal(payload.filePath, null);
});

test("parseAutosavePayload rejects malformed or incomplete payloads", () => {
  assert.equal(parseAutosavePayload("{ not-json"), null);
  assert.equal(parseAutosavePayload(JSON.stringify({ rows: [] })), null);
  assert.equal(parseAutosavePayload(JSON.stringify({ config: {}, rows: "not-array" })), null);
});
