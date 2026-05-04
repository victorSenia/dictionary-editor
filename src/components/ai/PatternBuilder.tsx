import React from "react";
import { getPatternFieldLabel } from "../../ai/aiPatterns";
import type { AiPatternField, AiPatternSeparator } from "../../ai/types";

type PatternBuilderProps = {
  t: (key: string) => string;
  fields: AiPatternField[];
  separators: AiPatternSeparator[];
  draggedFieldIndex: number | null;
  onDraggedFieldIndexChange: (index: number | null) => void;
  onMoveField: (index: number, target: number) => void;
  onRemoveField: (index: number) => void;
  onSeparatorChange: (index: number, separator: AiPatternSeparator) => void;
};

export default function PatternBuilder({
  t,
  fields,
  separators,
  draggedFieldIndex,
  onDraggedFieldIndexChange,
  onMoveField,
  onRemoveField,
  onSeparatorChange
}: PatternBuilderProps) {
  return (
    <div className="pattern-builder" aria-label={t("aiPanel.patternBuilder")}>
      {fields.map((field, index) => (
        <React.Fragment key={field}>
          {index > 0 ? (
            <input
              className="pattern-gap pattern-gap-custom"
              value={separators[index - 1] ?? ""}
              placeholder={t("aiPanel.patternGap")}
              aria-label={`${t("aiPanel.patternGap")} ${index}`}
              onChange={(event) => onSeparatorChange(index - 1, event.target.value)}
            />
          ) : null}
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
            <span>{getPatternFieldLabel(field, t)}</span>
            <button type="button" onClick={() => onMoveField(index, index - 1)} disabled={index === 0} aria-label={t("aiPanel.moveLeft")}>{"\u2039"}</button>
            <button type="button" onClick={() => onMoveField(index, index + 1)} disabled={index === fields.length - 1} aria-label={t("aiPanel.moveRight")}>{"\u203A"}</button>
            <button type="button" onClick={() => onRemoveField(index)} aria-label={t("aiPanel.removeField")}>{"\u00D7"}</button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
