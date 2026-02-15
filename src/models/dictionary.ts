export const ROW_TYPE_TOPIC = "topic" as const;
export const ROW_TYPE_WORD = "word" as const;

export type TopicRow = {
  type: typeof ROW_TYPE_TOPIC;
  label: string;
};

export type WordRow = {
  type: typeof ROW_TYPE_WORD;
  valueFrom: string;
  valuesTo: Record<string, string[]>;
  article: string;
  additionalInformation: string;
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

export function createEmptyWordRow(config: DictionaryConfig): WordRow {
  const valuesTo: Record<string, string[]> = {};

  for (const language of config.languagesTo) {
    valuesTo[language] = [];
  }

  return {
    type: ROW_TYPE_WORD,
    valueFrom: "",
    valuesTo,
    article: "",
    additionalInformation: ""
  };
}

export function createTopicRow(label: string): TopicRow {
  return {
    type: ROW_TYPE_TOPIC,
    label
  };
}
