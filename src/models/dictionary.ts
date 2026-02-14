export type TopicRow = {
  type: "topic";
  label: string;
};

export type WordRow = {
  type: "word";
  valueFrom: string;
  valuesTo: Record<string, string[]>;
  article: string;
  additionalInformation: string;
  topic: string;
};

export type DictionaryRow = TopicRow | WordRow;

export type DictionaryConfig = {
  languageFrom: string;
  languagesTo: string[];
  articles: string[];
  delimiter: string;
  additionalInformationDelimiter: string;
  translationDelimiter: string;
  topicFlag: string;
  topicDelimiter: string;
  rootTopic: string;
};

export const DEFAULT_CONFIG: DictionaryConfig = {
  languageFrom: "de",
  languagesTo: ["en"],
  articles: ["die ", "das ", "der "],
  delimiter: "|",
  additionalInformationDelimiter: ";",
  translationDelimiter: ";",
  topicFlag: "\t",
  topicDelimiter: "",
  rootTopic: ""
};

export function isTopicRow(row: DictionaryRow): row is TopicRow {
  return row.type === "topic";
}

export function createEmptyWordRow(config: DictionaryConfig): WordRow {
  const valuesTo: Record<string, string[]> = {};

  for (const language of config.languagesTo) {
    valuesTo[language] = [];
  }

  return {
    type: "word",
    valueFrom: "",
    valuesTo,
    article: "",
    additionalInformation: "",
    topic: config.rootTopic
  };
}

export function createTopicRow(label: string): TopicRow {
  return {
    type: "topic",
    label
  };
}
