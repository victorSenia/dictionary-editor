import React from "react";
import {
  buildTargetTranslationFields,
  buildVisualAiParsingPattern,
  hasConfiguredArticles
} from "../ai/aiPatterns";
import type {
  AiParsingConfiguration,
  AiPatternField,
  AiPatternSeparator,
  AiRequestContext
} from "../ai/types";
import type { DictionaryConfig } from "../models/dictionary";

type UseAiParsingPatternOptions = {
  config: DictionaryConfig;
  requestContext: AiRequestContext;
  onParsingConfigurationChange: (configuration: AiParsingConfiguration | null) => void;
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
  linePrefixPreset: AiParsingConfiguration["linePrefixPreset"],
  articles: string[]
): AiParsingConfiguration {
  return {
    itemPattern: buildVisualAiParsingPattern(fields, separators, linePrefixPreset, articles),
    linePrefixPreset,
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
  onParsingConfigurationChange
}: UseAiParsingPatternOptions) {
  const [parsingConfiguration, setParsingConfiguration] = React.useState<AiParsingConfiguration | null>(null);
  const [patternFields, setPatternFields] = React.useState<AiPatternField[]>([]);
  const [patternSeparators, setPatternSeparators] = React.useState<AiPatternSeparator[]>([]);
  const [draggedFieldIndex, setDraggedFieldIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    onParsingConfigurationChange(parsingConfiguration);
  }, [onParsingConfigurationChange, parsingConfiguration]);

  const commitParsingConfiguration = React.useCallback((patch: Partial<AiParsingConfiguration>) => {
    setParsingConfiguration((current) => ({
      itemPattern: "",
      linePrefixPreset: "LIST_MARKER",
      ...current,
      ...patch
    }));
  }, []);

  const updateVisualPattern = React.useCallback(
    (
      nextFields: AiPatternField[],
      nextSeparators: AiPatternSeparator[],
      linePrefixPreset = parsingConfiguration?.linePrefixPreset ?? "LIST_MARKER"
    ) => {
      setPatternFields(nextFields);
      setPatternSeparators(nextSeparators.slice(0, Math.max(0, nextFields.length - 1)));

      if (nextFields.length === 0) {
        setParsingConfiguration(null);
        return;
      }

      commitParsingConfiguration(
        createVisualParsingConfiguration(nextFields, nextSeparators, linePrefixPreset, config.articles)
      );
    },
    [commitParsingConfiguration, config.articles, parsingConfiguration?.linePrefixPreset]
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
    parsingConfiguration,
    patternFields,
    patternSeparators,
    draggedFieldIndex,
    setDraggedFieldIndex,
    updateVisualPattern,
    moveFieldTo,
    removeField,
    addField,
    updateSeparator
  };
}
