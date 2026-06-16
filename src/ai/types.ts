export type AiRequestState = {
  topic: string;
  wordCount: string;
};

export type AiRequestMode = "vocabulary" | "translations";

export type AiRequestWord = {
  rowId: string;
  article: string;
  word: string;
  additionalInformation: string;
  missingLanguages: string[];
};

export type AiRequestContext = {
  mode: AiRequestMode;
  topic: string;
  topicRowId?: string;
  words: AiRequestWord[];
  targetLanguages: string[];
};

export type AiParsingConfiguration = {
  itemPattern: string;
  fields?: AiPatternField[];
  separators?: string[];
};

export type AiPatternField =
  | "article"
  | "word"
  | "additionalInformation"
  | "translation"
  | `translation:${string}`;

export type AiPatternSeparator = string;

export type AiParseResult = {
  rows: Array<{
    article: string;
    word: string;
    additionalInformation: string;
    translationLanguage: string;
    translationText: string;
    translationValues: Record<string, string[]>;
  }>;
  unparsedLines: string[];
  pattern: string;
  message: string;
};
