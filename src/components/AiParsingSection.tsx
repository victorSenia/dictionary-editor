import React from "react";
import { useTranslation } from "react-i18next";
import { AI_PATTERN_FIELDS } from "../ai/patterns/constants";
import { getPatternFieldLabel, hasConfiguredArticles } from "../ai/patterns/fieldUtils";
import type { AiParsingConfiguration, AiPatternField, AiRequestContext } from "../ai/types";
import { useAiParsingPattern } from "../hooks/useAiParsingPattern";
import type { DictionaryConfig } from "../models/dictionary";
import PatternBuilder from "./ai/PatternBuilder";
import PatternFieldSelector from "./ai/PatternFieldSelector";

type AiParsingSectionProps = {
  config: DictionaryConfig;
  requestContext: AiRequestContext;
  onSuggestPattern: () => void;
  parsingConfiguration: AiParsingConfiguration | null;
  setParsingConfiguration: (configuration: AiParsingConfiguration | null) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

function getAvailablePatternFields(requestContext: AiRequestContext, includeArticleField: boolean): AiPatternField[] {
  return requestContext.mode === "translations"
    ? ["word"]
    : AI_PATTERN_FIELDS.filter((field) => field !== "article" || includeArticleField);
}

export default function AiParsingSection({
  config,
  requestContext,
  onSuggestPattern,
  parsingConfiguration,
  setParsingConfiguration,
  isOpen,
  onOpenChange
}: AiParsingSectionProps) {
  const { t } = useTranslation();
  const {
    patternEntries,
    patternSeparators,
    draggedFieldIndex,
    setDraggedFieldIndex,
    moveFieldTo,
    removeField,
    addField,
    updateEntry,
    updateSeparator
  } = useAiParsingPattern({ config, parsingConfiguration, setParsingConfiguration });

  const patternFields = patternEntries.map((entry) => entry.field);
  const patternExample = patternEntries
    .map((entry, index) => `${entry.prefix}${getPatternFieldLabel(entry.field, t)}${entry.suffix}${patternSeparators[index] ?? ""}`)
    .join("")
    .replace(/\\n/gu, "\n");
  const availableTargetLanguages = requestContext.mode === "translations"
    ? requestContext.targetLanguages
    : config.languagesTo;
  const availablePatternFields = getAvailablePatternFields(requestContext, hasConfiguredArticles(config.articles));
  const translationDelimiterHint = config.translationDelimiter
    ? t("aiPanel.parseDelimiterHint", { delimiter: config.translationDelimiter })
    : t("aiPanel.parseDelimiterHintNone");

  return (
    <details open={isOpen} className="ai-section" onToggle={(event) => onOpenChange(event.currentTarget.open)}>
      <summary>{t("aiPanel.parsingSection")}</summary>
      <PatternBuilder
        t={t}
        entries={patternEntries}
        separators={patternSeparators}
        draggedFieldIndex={draggedFieldIndex}
        onDraggedFieldIndexChange={setDraggedFieldIndex}
        onMoveField={moveFieldTo}
        onRemoveField={removeField}
        onEntryChange={updateEntry}
        onSeparatorChange={updateSeparator}
      />
      <PatternFieldSelector
        t={t}
        patternFields={patternFields}
        availablePatternFields={availablePatternFields}
        availableTargetLanguages={availableTargetLanguages}
        onAddField={addField}
      />
      {patternEntries.length > 0 ? (
        <p className="pattern-preview">
          {t("aiPanel.patternPreview")}: {" "}
          <span style={{ whiteSpace: "pre-wrap" }}>{patternExample}</span>
        </p>
      ) : null}
      <p className="pattern-preview">{translationDelimiterHint}</p>
      <button type="button" className="secondary-button full-width-button" onClick={onSuggestPattern}>
        {t("aiPanel.suggestPattern")}
      </button>
    </details>
  );
}
