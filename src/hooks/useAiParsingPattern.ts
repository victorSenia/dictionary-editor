import React from "react";
import { buildTargetTranslationFields, hasConfiguredArticles } from "../ai/patterns/fieldUtils";
import { buildVisualAiParsingPattern } from "../ai/patterns/regexBuilder";
import type {
  AiParsingConfiguration,
  AiPatternField,
  AiPatternSeparator
} from "../ai/types";
import type { DictionaryConfig } from "../models/dictionary";

type UseAiParsingPatternOptions = {
  config: DictionaryConfig;
  parsingConfiguration: AiParsingConfiguration | null;
  setParsingConfiguration: (configuration: AiParsingConfiguration | null) => void;
};

export function buildInitialPatternFields(
  targetLanguages: string[],
  articles: string[] = []
): AiPatternField[] {
  return [
    ...(hasConfiguredArticles(articles) ? (["article"] as const) : []),
    "word",
    ...buildTargetTranslationFields(targetLanguages)
  ];
}

export function buildInitialPatternSeparators(fields: AiPatternField[]): AiPatternSeparator[] {
  return fields.slice(1).map((field, index) => {
    if (index === 0 && fields[0] === "article" && field === "word") {
      return "";
    }

    return field.startsWith("translation:") && index > 1 ? "; " : " | ";
  });
}

export function createVisualParsingConfiguration(
  fields: AiPatternField[],
  separators: AiPatternSeparator[],
  articles: string[]
): AiParsingConfiguration {
  return {
    itemPattern: buildVisualAiParsingPattern(fields, separators, articles),
    fields,
    separators: separators.slice(0, Math.max(0, fields.length - 1))
  };
}

function removeFieldSeparator(
  separators: AiPatternSeparator[],
  fieldIndex: number
): AiPatternSeparator[] {
  return separators.filter((_separator, index) => index !== Math.max(0, fieldIndex - 1));
}

export function useAiParsingPattern({
  config,
  parsingConfiguration,
  setParsingConfiguration
}: UseAiParsingPatternOptions) {
  const patternFields = parsingConfiguration?.fields ?? [];
  const patternSeparators = parsingConfiguration?.separators ?? [];
  const [draggedFieldIndex, setDraggedFieldIndex] = React.useState<number | null>(null);

  const updateVisualPattern = React.useCallback(
    (
      nextFields: AiPatternField[],
      nextSeparators: AiPatternSeparator[]
    ) => {
      if (nextFields.length === 0) {
        setParsingConfiguration(null);
        return;
      }

      setParsingConfiguration(
        createVisualParsingConfiguration(nextFields, nextSeparators, config.articles)
      );
    },
    [config.articles, setParsingConfiguration]
  );

  const moveFieldTo = React.useCallback(
    (index: number, target: number) => {
      if (target < 0 || target >= patternFields.length) {
        return;
      }

      const nextFields = [...patternFields];
      const [field] = nextFields.splice(index, 1);
      nextFields.splice(target, 0, field);
      updateVisualPattern(nextFields, patternSeparators);
    },
    [patternFields, patternSeparators, updateVisualPattern]
  );

  const removeField = React.useCallback(
    (index: number) => {
      const nextFields = patternFields.filter((_field, current) => current !== index);
      updateVisualPattern(nextFields, removeFieldSeparator(patternSeparators, index));
    },
    [patternFields, patternSeparators, updateVisualPattern]
  );

  const addField = React.useCallback(
    (field: AiPatternField) => {
      if (patternFields.includes(field)) {
        return;
      }

      updateVisualPattern([...patternFields, field], [...patternSeparators, " | "]);
    },
    [patternFields, patternSeparators, updateVisualPattern]
  );

  const updateSeparator = React.useCallback(
    (index: number, separator: AiPatternSeparator) => {
      const nextSeparators = [...patternSeparators];
      nextSeparators[index] = separator;
      updateVisualPattern(patternFields, nextSeparators);
    },
    [patternFields, patternSeparators, updateVisualPattern]
  );

  return {
    patternFields,
    patternSeparators,
    draggedFieldIndex,
    setDraggedFieldIndex,
    moveFieldTo,
    removeField,
    addField,
    updateSeparator
  };
}
