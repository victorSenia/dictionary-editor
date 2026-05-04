import React from "react";
import { useTranslation } from "react-i18next";
import {
  AI_PATTERN_FIELDS,
  getPatternFieldLabel,
  hasConfiguredArticles,
  suggestAiParsingPattern,
} from "../ai/aiPatterns";
import type { AiParsingConfiguration, AiPatternField, AiRequestContext } from "../ai/types";
import { createVisualParsingConfiguration, useAiParsingPattern } from "../hooks/useAiParsingPattern";
import type { DictionaryConfig } from "../models/dictionary";
import PatternBuilder from "./ai/PatternBuilder";
import PatternFieldSelector from "./ai/PatternFieldSelector";

type AiParsingSectionProps = {
  config: DictionaryConfig;
  requestContext: AiRequestContext;
  response: string;
  onParseMessageChange: (message: string) => void;
  onParsingConfigurationChange: (configuration: AiParsingConfiguration | null) => void;
};

export type AiParsingSectionHandle = {
  suggestPattern: () => AiParsingConfiguration | null;
};

function formatPatternSeparator(separator: string | undefined): string {
  return separator ?? "";
}

function getAvailablePatternFields(requestContext: AiRequestContext, includeArticleField: boolean): AiPatternField[] {
  return requestContext.mode === "translations"
    ? ["word"]
    : AI_PATTERN_FIELDS.filter((field) => field !== "article" || includeArticleField);
}

const AiParsingSection = React.forwardRef<AiParsingSectionHandle, AiParsingSectionProps>(function AiParsingSection({
  config,
  requestContext,
  response,
  onParseMessageChange,
  onParsingConfigurationChange
}, ref) {
  const { t } = useTranslation();
  const {
    patternFields,
    patternSeparators,
    draggedFieldIndex,
    setDraggedFieldIndex,
    updateVisualPattern,
    moveFieldTo,
    removeField,
    addField,
    updateSeparator
  } = useAiParsingPattern({ config, requestContext, onParsingConfigurationChange });

  const suggestPattern = React.useCallback((): AiParsingConfiguration | null => {
    const targetLanguages = requestContext.mode === "translations"
      ? requestContext.targetLanguages
      : config.languagesTo;
    const suggestion = suggestAiParsingPattern(
      response,
      targetLanguages,
      config.articles,
      requestContext.mode === "translations"
    );
    if (!suggestion) {
      onParseMessageChange(t("aiPanel.parseError"));
      return null;
    }
    updateVisualPattern(suggestion.fields, suggestion.separators);
    const configuration = createVisualParsingConfiguration(
      suggestion.fields,
      suggestion.separators,
      "LIST_MARKER",
      config.articles
    );
    onParseMessageChange(t("aiPanel.patternSuggested", {
      matched: suggestion.matchedLines,
      total: suggestion.totalLines
    }));
    return configuration;
  }, [
    config.articles,
    config.languagesTo,
    onParseMessageChange,
    requestContext.mode,
    requestContext.targetLanguages,
    response,
    t,
    updateVisualPattern
  ]);

  React.useImperativeHandle(ref, () => ({ suggestPattern }), [suggestPattern]);

  const patternExample = React.useMemo(
    () => patternFields.map((field, index) => {
      const separator = index === 0 ? "" : formatPatternSeparator(patternSeparators[index - 1]);
      return `${separator}${getPatternFieldLabel(field, t)}`;
    }).join(""),
    [patternFields, patternSeparators, t]
  );

  const availableTargetLanguages = requestContext.mode === "translations"
    ? requestContext.targetLanguages
    : config.languagesTo;
  const availablePatternFields = getAvailablePatternFields(
    requestContext,
    hasConfiguredArticles(config.articles)
  );

  return (
    <details className="ai-section">
      <summary>{t("aiPanel.parsingSection")}</summary>
      <PatternBuilder
        t={t}
        fields={patternFields}
        separators={patternSeparators}
        draggedFieldIndex={draggedFieldIndex}
        onDraggedFieldIndexChange={setDraggedFieldIndex}
        onMoveField={moveFieldTo}
        onRemoveField={removeField}
        onSeparatorChange={updateSeparator}
      />
      <PatternFieldSelector
        t={t}
        patternFields={patternFields}
        availablePatternFields={availablePatternFields}
        availableTargetLanguages={availableTargetLanguages}
        onAddField={addField}
      />
      {patternFields.length > 0 ? (
        <p className="pattern-preview">{t("aiPanel.patternPreview")}: {patternExample}</p>
      ) : null}
      <button type="button" className="secondary-button full-width-button" onClick={suggestPattern}>
        {t("aiPanel.suggestPattern")}
      </button>
    </details>
  );
});

export default AiParsingSection;
