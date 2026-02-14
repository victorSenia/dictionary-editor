import type { ICellRendererParams } from "ag-grid-community";
import type { GridRow } from "../types/grid";

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
  if (!params.data || params.data.type !== "word") {
    return <></>;
  }

  const values = params.data.valuesTo[language] ?? [];
  const showReorder = values.length > 1;

  return (
    <div className="translation-stack">
      {values.map((value, valueIndex) => (
        <div key={`${params.data?.id}-${language}-${valueIndex}`} className="translation-item">
          <input
            type="text"
            className="translation-value-input"
            value={value}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => onUpdate(params.data!.id, language, valueIndex, event.target.value)}
          />
          <span className="translation-item-actions">
            {showReorder ? (
              <button
                type="button"
                className="translation-item-btn translation-item-btn-edit"
                aria-label="Move up"
                title="Move up"
                disabled={valueIndex === 0}
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(params.data!.id, language, valueIndex, valueIndex - 1);
                }}
              >
                {"\u2191"}
              </button>
            ) : null}
            {showReorder ? (
              <button
                type="button"
                className="translation-item-btn translation-item-btn-edit"
                aria-label="Move down"
                title="Move down"
                disabled={valueIndex === values.length - 1}
                onClick={(event) => {
                  event.stopPropagation();
                  onMove(params.data!.id, language, valueIndex, valueIndex + 1);
                }}
              >
                {"\u2193"}
              </button>
            ) : null}
            <button
              type="button"
              className="translation-item-btn translation-item-btn-danger"
              aria-label="Remove translation"
              title="Remove translation"
              onClick={(event) => {
                event.stopPropagation();
                onRemove(params.data!.id, language, valueIndex);
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
        aria-label="Add translation"
        title="Add translation"
        onClick={(event) => {
          event.stopPropagation();
          onAdd(params.data!.id, language);
        }}
      >
        +
      </button>
    </div>
  );
}
