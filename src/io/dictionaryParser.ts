import {
  createEmptyWordRow,
  createTopicRow,
  DEFAULT_CONFIG,
  type DictionaryConfig,
  type DictionaryRow
} from "../models/dictionary";
import { parseConfigLine, resolveToken } from "./configLine";

export type ParseResult = {
  config: DictionaryConfig;
  rows: DictionaryRow[];
};

function splitLine(line: string, delimiter: string): string[] {
  return line.split(delimiter);
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

function matchArticle(sourceCell: string, config: DictionaryConfig): string | null {
  const additionalInformationDelimiter = resolveToken(config.additionalInformationDelimiter);
  const knownArticles = config.articles.filter((article) => article.length > 0);
  let matchedArticle: string | null = null;
  let longestMatch = -1;

  for (const article of knownArticles) {
    if (!sourceCell.startsWith(article)) {
      continue;
    }

    const candidateTail = sourceCell.slice(article.length).trimStart();
    const [candidateWordPart] = candidateTail.split(additionalInformationDelimiter, 2);
    if ((candidateWordPart ?? "").trim() === "") {
      continue;
    }

    if (article.length > longestMatch) {
      matchedArticle = article;
      longestMatch = article.length;
    }
  }

  return matchedArticle;
}

function parseWordLine(line: string, config: DictionaryConfig): DictionaryRow {
  const delimiter = resolveToken(config.delimiter);
  const additionalInformationDelimiter = resolveToken(config.additionalInformationDelimiter);
  const translationDelimiter = resolveToken(config.translationDelimiter);
  const columns = splitLine(line, delimiter);
  const row = createEmptyWordRow(config);
  const sourceCell = columns[0] ?? "";
  const matchedArticle = matchArticle(sourceCell, config);

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
