import type { DictionaryConfig } from "../models/dictionary";

const CONFIG_PREFIX = "org.leo.dictionary.config.entity.ParseWords";
const CONFIG_PARTS_COUNT = 10;
const CONFIG_LIST_SEPARATOR = ";";
const CONFIG_PART_SEPARATOR = ":";

function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value.replace(/\+/g, "%20"));
  } catch {
    return value;
  }
}

function parseList(value: string): string[] {
  return value === "" ? [] : value.split(CONFIG_LIST_SEPARATOR).map((item) => item);
}

export function resolveToken(raw: string): string {
  return raw
    .replace(/\\t/g, "\t")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\\|/g, "|")
    .replace(/\\\\/g, "\\");
}

export function parseConfigLine(line: string): DictionaryConfig | null {
  if (!line.startsWith(CONFIG_PREFIX)) {
    return null;
  }

  const parts = line.split(CONFIG_PART_SEPARATOR);
  if (parts.length !== CONFIG_PARTS_COUNT || parts[0] !== CONFIG_PREFIX) {
    return null;
  }

  const decoded = parts.slice(1).map(decodeSafe);
  return {
    languageFrom: decoded[0],
    languagesTo: parseList(decoded[1]),
    articles: parseList(decoded[2]),
    delimiter: resolveToken(decoded[3]),
    additionalInformationDelimiter: resolveToken(decoded[4]),
    translationDelimiter: resolveToken(decoded[5]),
    topicFlag: resolveToken(decoded[6]),
    topicDelimiter: resolveToken(decoded[7]),
    rootTopic: decoded[8]
  };
}

function encodeConfigValue(value: string): string {
  return encodeURIComponent(value).split("%20").join("+");
}

function encodeListForConfig(values: string[]): string {
  return values.map((value) => encodeConfigValue(value)).join(CONFIG_LIST_SEPARATOR);
}

function escapeConfigToken(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\t/g, "\\t")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\|/g, "\\|");
}

export function buildConfigLine(config: DictionaryConfig): string {
  const parts = [
    encodeConfigValue(config.languageFrom),
    encodeListForConfig(config.languagesTo),
    encodeListForConfig(config.articles),
    encodeConfigValue(escapeConfigToken(config.delimiter)),
    encodeConfigValue(escapeConfigToken(config.additionalInformationDelimiter)),
    encodeConfigValue(escapeConfigToken(config.translationDelimiter)),
    encodeConfigValue(escapeConfigToken(config.topicFlag)),
    encodeConfigValue(escapeConfigToken(config.topicDelimiter)),
    encodeConfigValue(config.rootTopic)
  ];

  return `${CONFIG_PREFIX}${CONFIG_PART_SEPARATOR}${parts.join(CONFIG_PART_SEPARATOR)}`;
}
