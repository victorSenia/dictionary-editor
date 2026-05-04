import type { ICellRendererParams } from "ag-grid-community";
import { ROW_TYPE_WORD } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import DeferredTextField from "./DeferredTextField";

type TranslationCellProps = {
  params: ICellRendererParams<GridRow>;
  language: string;
  labels: {
    moveUp: string;
    moveDown: string;
    remove: string;
    add: string;
  };
  onMove: (rowId: string, language: string, from: number, to: number) => void;
  onUpdate: (rowId: string, language: string, index: number, value: string) => void;
  onAdd: (rowId: string, language: string) => void;
  onRemove: (rowId: string, language: string, index: number) => void;
};

export default function TranslationCell({
  params,
  language,
  labels,
  onMove,
  onUpdate,
  onAdd,
  onRemove
}: TranslationCellProps) {
  if (!params.data || params.data.type !== ROW_TYPE_WORD) {
    return null;
  }

  const rowId = params.data.rowId;
  const values = params.data.valuesTo[language] ?? [];
  const valuesSignature = values.join("\u001F");
  const showReorder = values.length > 1;
  const refreshRowHeights = () => params.api.resetRowHeights();
  const refreshCell = () => {
    if (!params.column) {
      return;
    }
    params.api.refreshCells({
      rowNodes: [params.node],
      columns: [params.column],
      force: true
    });
  };

  return (
      <div className="translation-stack">
      {values.map((value, valueIndex) => (
        <div
          key={`${rowId}-${language}-${valueIndex}-${valuesSignature}`}
          className="translation-item"
        >
          <DeferredTextField
            kind="textarea"
            className="translation-value-input"
            rows={1}
            value={value}
            onHeightChange={refreshRowHeights}
            onCommit={(nextValue) => {
              onUpdate(rowId, language, valueIndex, nextValue);
              refreshRowHeights();
              queueMicrotask(refreshCell);
            }}
          />
          <span className="translation-item-actions">
            {showReorder ? (
              <button
                type="button"
                className="translation-item-btn translation-item-btn-edit"
                aria-label={labels.moveUp}
                title={labels.moveUp}
                disabled={valueIndex === 0}
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(rowId, language, valueIndex, valueIndex - 1);
                  queueMicrotask(refreshCell);
                }}
              >
                {"\u2191"}
              </button>
            ) : null}
            {showReorder ? (
              <button
                type="button"
                className="translation-item-btn translation-item-btn-edit"
                aria-label={labels.moveDown}
                title={labels.moveDown}
                disabled={valueIndex === values.length - 1}
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(rowId, language, valueIndex, valueIndex + 1);
                  queueMicrotask(refreshCell);
                }}
              >
                {"\u2193"}
              </button>
            ) : null}
            <button
              type="button"
              className="translation-item-btn translation-item-btn-danger"
              aria-label={labels.remove}
              title={labels.remove}
              onClick={(event) => {
                event.stopPropagation();
                onRemove(rowId, language, valueIndex);
                queueMicrotask(refreshCell);
              }}
            >
              {"\u00D7"}
            </button>
          </span>
        </div>
      ))}
      <button
        type="button"
        className="translation-item-btn translation-item-btn-new"
        aria-label={labels.add}
        title={labels.add}
        onClick={(event) => {
          event.stopPropagation();
          onAdd(rowId, language);
          queueMicrotask(refreshCell);
        }}
      >
        +
      </button>
    </div>
  );
}
