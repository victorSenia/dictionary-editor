import type { ICellRendererParams } from "ag-grid-community";
import { useTranslation } from "react-i18next";
import { ROW_TYPE_WORD } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import DeferredTextField from "./DeferredTextField";

type TranslationCellProps = {
  params: ICellRendererParams<GridRow>;
  language: string;
  onMove: (rowId: string, language: string, from: number, to: number) => void;
  onUpdate: (rowId: string, language: string, index: number, value: string) => void;
  onAdd: (rowId: string, language: string) => void;
  onRemove: (rowId: string, language: string, index: number) => void;
};

export default function TranslationCell({
  params,
  language,
  onMove,
  onUpdate,
  onAdd,
  onRemove
}: TranslationCellProps) {
  const { t } = useTranslation();

  if (!params.data || params.data.type !== ROW_TYPE_WORD) {
    return <></>;
  }

  const values = params.data.valuesTo[language] ?? [];
  const valuesSignature = values.join("\u001F");
  const showReorder = values.length > 1;
  const refreshRowHeights = () => params.api.resetRowHeights();
  const refreshCell = () => {
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
          key={`${params.data?.id}-${language}-${valueIndex}-${valuesSignature}`}
          className="translation-item"
        >
          <DeferredTextField
            kind="textarea"
            className="translation-value-input"
            rows={1}
            value={value}
            onHeightChange={refreshRowHeights}
            onCommit={(nextValue) => {
              onUpdate(params.data!.id, language, valueIndex, nextValue);
              refreshRowHeights();
              queueMicrotask(refreshCell);
            }}
          />
          <span className="translation-item-actions">
            {showReorder ? (
              <button
                type="button"
                className="translation-item-btn translation-item-btn-edit"
                aria-label={t("translation.moveUp")}
                title={t("translation.moveUp")}
                disabled={valueIndex === 0}
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(params.data!.id, language, valueIndex, valueIndex - 1);
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
                aria-label={t("translation.moveDown")}
                title={t("translation.moveDown")}
                disabled={valueIndex === values.length - 1}
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(params.data!.id, language, valueIndex, valueIndex + 1);
                  queueMicrotask(refreshCell);
                }}
              >
                {"\u2193"}
              </button>
            ) : null}
            <button
              type="button"
              className="translation-item-btn translation-item-btn-danger"
              aria-label={t("translation.remove")}
              title={t("translation.remove")}
              onClick={(event) => {
                event.stopPropagation();
                onRemove(params.data!.id, language, valueIndex);
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
        aria-label={t("translation.add")}
        title={t("translation.add")}
        onClick={(event) => {
          event.stopPropagation();
          onAdd(params.data!.id, language);
          queueMicrotask(refreshCell);
        }}
      >
        +
      </button>
    </div>
  );
}
