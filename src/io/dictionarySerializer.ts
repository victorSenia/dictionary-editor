import { ROW_TYPE_TOPIC, type DictionaryConfig, type DictionaryRow } from "../models/dictionary";
import { buildConfigLine, resolveToken } from "./configLine";

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
