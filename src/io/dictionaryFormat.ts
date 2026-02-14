import {
  ROW_TYPE_TOPIC,
  createEmptyWordRow,
  createTopicRow,
  DEFAULT_CONFIG,
  type DictionaryConfig,
  type DictionaryRow
} from "../models/dictionary";

const CONFIG_PREFIX = "org.leo.dictionary.config.entity.ParseWords";
const CONFIG_PARTS_COUNT = 10;
const CONFIG_LIST_SEPARATOR = ";";
const CONFIG_PART_SEPARATOR = ":";

type ParseResult = {
  config: DictionaryConfig;
  rows: DictionaryRow[];
};

function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value.replace(/\+/g, "%20"));
  } catch {
    return value;
  }
}

function parseList(value: string): string[] {
  if (value === "") {
    return [];
  }
  return value.split(CONFIG_LIST_SEPARATOR).map((item) => item);
}

function parseConfigLine(line: string): DictionaryConfig | null {
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

function splitLine(line: string, delimiter: string): string[] {
  return line.split(delimiter);
}

function resolveToken(raw: string): string {
  return raw
    .replace(/\\t/g, "\t")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\\|/g, "|")
    .replace(/\\\\/g, "\\");
}

function parseTranslations(value: string, translationDelimiter: string): string[] {
  if (value.trim() === "") {
    return [];
  }
  return value
    .split(translationDelimiter)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseWordLine(line: string, config: DictionaryConfig): DictionaryRow {
  const delimiter = resolveToken(config.delimiter);
  const additionalInformationDelimiter = resolveToken(config.additionalInformationDelimiter);
  const translationDelimiter = resolveToken(config.translationDelimiter);
  const columns = splitLine(line, delimiter);
  const row = createEmptyWordRow(config);
  const knownArticles = config.articles.filter((article) => article.length > 0);

  const sourceCell = columns[0] ?? "";
  let matchedArticle: string | null = null;
  let longestMatch = -1;
  for (const article of knownArticles) {
    if (sourceCell.startsWith(article) && article.length > longestMatch) {
      matchedArticle = article;
      longestMatch = article.length;
    }
  }

  let wordWithOptionalAdditional = sourceCell;
  if (matchedArticle) {
    row.article = matchedArticle.trim();
    wordWithOptionalAdditional = sourceCell.slice(matchedArticle.length).trimStart();
  }

  const [wordPart, additionalFromSource] = wordWithOptionalAdditional.split(additionalInformationDelimiter, 2);
  row.valueFrom = (wordPart ?? "").trim();

  let index = 1;

  const remainingAfterWord = columns.length - index;
  if (remainingAfterWord > config.languagesTo.length) {
    row.additionalInformation = (columns[index] ?? "").trim();
    index += 1;
  } else if ((additionalFromSource ?? "").trim().length > 0) {
    row.additionalInformation = additionalFromSource.trim();
  }

  for (const language of config.languagesTo) {
    const value = columns[index] ?? "";
    row.valuesTo[language] = parseTranslations(value, translationDelimiter);
    index += 1;
  }

  return row;
}

export function parseFile(content: string, fallbackConfig: DictionaryConfig = DEFAULT_CONFIG): ParseResult {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.replace(/\r$/, ""))
    .filter((line) => line.trim().length > 0);

  let config: DictionaryConfig = { ...fallbackConfig };
  let startIndex = 0;

  if (lines.length > 0) {
    const parsedConfig = parseConfigLine(lines[0]);
    if (parsedConfig) {
      config = parsedConfig;
      startIndex = 1;
    }
  }

  const rows: DictionaryRow[] = [];
  const topicFlag = resolveToken(config.topicFlag);

  for (let i = startIndex; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith(topicFlag)) {
      rows.push(createTopicRow(line.slice(topicFlag.length).trim()));
      continue;
    }
    rows.push(parseWordLine(line.trim(), config));
  }

  return { config, rows };
}

function joinList(values: string[]): string {
  return values.join(CONFIG_LIST_SEPARATOR);
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

function buildConfigLine(config: DictionaryConfig): string {
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

function serializeWordRow(config: DictionaryConfig, row: DictionaryRow): string {
  const delimiter = resolveToken(config.delimiter);
  const additionalInformationDelimiter = resolveToken(config.additionalInformationDelimiter);
  const translationDelimiter = resolveToken(config.translationDelimiter);
  const topicFlag = resolveToken(config.topicFlag);

  if (row.type === ROW_TYPE_TOPIC) {
    return `${topicFlag}${row.label}`;
  }

  let sourceColumn = row.valueFrom;
  if (row.article.trim() !== "") {
    sourceColumn = `${row.article} ${sourceColumn}`.trim();
  }
  if (row.additionalInformation.trim() !== "") {
    sourceColumn = `${sourceColumn}${additionalInformationDelimiter} ${row.additionalInformation}`;
  }

  const columns: string[] = [sourceColumn];

  for (const language of config.languagesTo) {
    const translations = row.valuesTo[language] ?? [];
    columns.push(translations.join(`${translationDelimiter} `));
  }

  return columns.join(` ${delimiter} `);
}

export function exportFile(config: DictionaryConfig, rows: DictionaryRow[]): string {
  const lines = [buildConfigLine(config)];

  for (const row of rows) {
    lines.push(serializeWordRow(config, row));
  }

  return lines.join("\n");
}
