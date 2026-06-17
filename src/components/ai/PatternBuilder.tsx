import React from "react";
import { getPatternFieldLabel } from "../../ai/patterns/fieldUtils";
import type { AiPatternEntry, AiPatternSeparator } from "../../ai/types";


type PatternBuilderProps = {
  t: (key: string, options?: Record<string, unknown>) => string;
  entries: AiPatternEntry[];
  separators: AiPatternSeparator[];
  draggedFieldIndex: number | null;
  onDraggedFieldIndexChange: (index: number | null) => void;
  onMoveField: (index: number, target: number) => void;
  onRemoveField: (index: number) => void;
  onEntryChange: (index: number, patch: Partial<AiPatternEntry>) => void;
  onSeparatorChange: (index: number, separator: AiPatternSeparator) => void;
};

export default function PatternBuilder({
  t,
  entries,
  separators,
  draggedFieldIndex,
  onDraggedFieldIndexChange,
  onMoveField,
  onRemoveField,
  onEntryChange,
  onSeparatorChange
}: PatternBuilderProps) {
  return (
    <div className="pattern-builder" aria-label={t("aiPanel.patternBuilder")}>
      {entries.map((entry, index) => (
        <React.Fragment key={`${entry.field}-${index}`}>
          <div className="pattern-entry">
            <label className="compact-field pattern-affix-field">
              {t("aiPanel.fieldPrefixNamed", { field: getPatternFieldLabel(entry.field, t) })}
              <input
                className="pattern-gap pattern-gap-custom"
                value={entry.prefix}
                placeholder={t("aiPanel.fieldPrefixNamed", { field: getPatternFieldLabel(entry.field, t) })}
                onChange={(event) => onEntryChange(index, { prefix: event.target.value })}
              />
            </label>
            <div
              className={`pattern-chip ${draggedFieldIndex === index ? "dragging" : ""}`}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/plain", String(index));
                onDraggedFieldIndexChange(index);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
              }}
              onDrop={(event) => {
                event.preventDefault();
                if (draggedFieldIndex !== null && draggedFieldIndex !== index) {
                  onMoveField(draggedFieldIndex, index);
                }
                onDraggedFieldIndexChange(null);
              }}
              onDragEnd={() => onDraggedFieldIndexChange(null)}
            >
              <span>{getPatternFieldLabel(entry.field, t)}</span>
              <button type="button" onClick={() => onMoveField(index, index - 1)} disabled={index === 0} aria-label={t("aiPanel.moveLeft")}>{"\u2039"}</button>
              <button type="button" onClick={() => onMoveField(index, index + 1)} disabled={index === entries.length - 1} aria-label={t("aiPanel.moveRight")}>{"\u203A"}</button>
              <button type="button" onClick={() => onRemoveField(index)} aria-label={t("aiPanel.removeField")}>{"\u00D7"}</button>
            </div>
            <label className="compact-field pattern-affix-field">
              {t("aiPanel.fieldSuffixNamed", { field: getPatternFieldLabel(entry.field, t) })}
              <input
                className="pattern-gap pattern-gap-custom"
                value={entry.suffix}
                placeholder={t("aiPanel.fieldSuffixNamed", { field: getPatternFieldLabel(entry.field, t) })}
                onChange={(event) => onEntryChange(index, { suffix: event.target.value })}
              />
            </label>
          </div>
          {index < entries.length - 1 ? (
            <label className="compact-field pattern-separator-field">
              {t("aiPanel.patternSeparator")}
              <input
                className="pattern-gap pattern-gap-custom"
                value={separators[index] ?? ""}
                placeholder={t("aiPanel.patternSeparator")}
                onChange={(event) => onSeparatorChange(index, event.target.value)}
              />
            </label>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
