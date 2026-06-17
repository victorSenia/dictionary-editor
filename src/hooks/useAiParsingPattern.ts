import React from "react";
import { buildTargetTranslationFields, hasConfiguredArticles } from "../ai/patterns/fieldUtils";
import type {
  AiParsingConfiguration,
  AiPatternEntry,
  AiPatternField,
  AiPatternSeparator
} from "../ai/types";
import type { DictionaryConfig } from "../models/dictionary";

type UseAiParsingPatternOptions = {
  config: DictionaryConfig;
  parsingConfiguration: AiParsingConfiguration | null;
  setParsingConfiguration: (configuration: AiParsingConfiguration | null) => void;
};

export function buildInitialPatternEntries(
  targetLanguages: string[],
  articles: string[] = []
): AiPatternEntry[] {
  const fields: AiPatternField[] = [
    ...(hasConfiguredArticles(articles) ? (["article"] as const) : []),
    "word",
    ...buildTargetTranslationFields(targetLanguages)
  ];

  return fields.map((field) => ({ field, prefix: "", suffix: "" }));
}

export function createVisualParsingConfiguration(
  entries: AiPatternEntry[],
  separators: AiPatternSeparator[],
  articles: string[]
): AiParsingConfiguration {
  return {
    entries,
    separators
  };
}

export function useAiParsingPattern({
  config,
  parsingConfiguration,
  setParsingConfiguration
}: UseAiParsingPatternOptions) {
  const patternEntries = parsingConfiguration?.entries ?? [];
  const patternSeparators = parsingConfiguration?.separators ?? [];
  const [draggedFieldIndex, setDraggedFieldIndex] = React.useState<number | null>(null);

  const updatePattern = React.useCallback(
    (entries: AiPatternEntry[], separators: AiPatternSeparator[]) => {
      setParsingConfiguration(entries.length
        ? createVisualParsingConfiguration(entries, separators, config.articles)
        : null);
    },
    [config.articles, setParsingConfiguration]
  );

  const moveFieldTo = React.useCallback((index: number, target: number) => {
    if (target < 0 || target >= patternEntries.length) return;
    const nextEntries = [...patternEntries];
    const [entry] = nextEntries.splice(index, 1);
    nextEntries.splice(target, 0, entry);

    const nextSeparators = nextEntries.slice(1).map((_unused, separatorIndex) =>
      patternSeparators[separatorIndex] ?? " | "
    );
    updatePattern(nextEntries, nextSeparators);
  }, [patternEntries, patternSeparators, updatePattern]);

  const removeField = React.useCallback((index: number) => {
    const nextEntries = patternEntries.filter((_entry, current) => current !== index);
    const nextSeparators = nextEntries.slice(1).map((_unused, separatorIndex) =>
      patternSeparators[separatorIndex] ?? " | "
    );
    updatePattern(nextEntries, nextSeparators);
  }, [patternEntries, patternSeparators, updatePattern]);

  const addField = React.useCallback((field: AiPatternField) => {
    if (patternEntries.some((entry) => entry.field === field)) return;
    updatePattern(
      [...patternEntries, { field, prefix: "", suffix: "" }],
      [...patternSeparators, " | "]
    );
  }, [patternEntries, patternSeparators, updatePattern]);

  const updateEntry = React.useCallback((index: number, patch: Partial<AiPatternEntry>) => {
    const next = patternEntries.map((entry, current) => current === index ? { ...entry, ...patch } : entry);
    updatePattern(next, patternSeparators);
  }, [patternEntries, patternSeparators, updatePattern]);

  const updateSeparator = React.useCallback((index: number, separator: AiPatternSeparator) => {
    const next = patternSeparators.map((current, currentIndex) => currentIndex === index ? separator : current);
    updatePattern(patternEntries, next);
  }, [patternEntries, patternSeparators, updatePattern]);

  return {
    patternEntries,
    patternSeparators,
    draggedFieldIndex,
    setDraggedFieldIndex,
    moveFieldTo,
    removeField,
    addField,
    updateEntry,
    updateSeparator
  };
}
