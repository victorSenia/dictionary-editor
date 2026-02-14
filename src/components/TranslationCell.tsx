import type { ICellRendererParams } from "ag-grid-community";
import { useTranslation } from "react-i18next";
import { ROW_TYPE_WORD } from "../models/dictionary";
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
  const { t } = useTranslation();

  if (!params.data || params.data.type !== ROW_TYPE_WORD) {
    return <></>;
  }

  const values = params.data.valuesTo[language] ?? [];
  const showReorder = values.length > 1;

  return (
    <div className="translation-stack">
      {values.map((value, valueIndex) => (
        <div key={`${params.data?.id}-${language}-${valueIndex}`} className="translation-item">
          <textarea
            className="translation-value-input"
            rows={1}
            value={value}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => onUpdate(params.data!.id, language, valueIndex, event.target.value)}
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
        }}
      >
        +
      </button>
    </div>
  );
}
