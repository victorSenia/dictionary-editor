import type { ICellRendererParams } from "ag-grid-community";
import DeferredTextField from "../../components/DeferredTextField";
import { ROW_TYPE_TOPIC, ROW_TYPE_WORD } from "../../models/dictionary";
import type { GridRow } from "../../types/grid";
import TopicLabelEditor from "./TopicLabelEditor";
import type { UpdateRowById } from "./types";

export function renderArticleCell(params: ICellRendererParams<GridRow>, updateRowById: UpdateRowById) {
  if (!params.data) {
    return null;
  }

  const rowId = params.data.rowId;
  if (params.data.type === ROW_TYPE_TOPIC) {
    return <TopicLabelEditor rowId={rowId} value={params.data.label} updateRowById={updateRowById} />;
  }

  return (
    <DeferredTextField
      kind="input"
      className="inline-cell-input"
      value={params.data.article}
      onCommit={(nextValue) => {
        updateRowById(rowId, (row) => {
          if (row.type === ROW_TYPE_TOPIC) {
            return { ...row, label: nextValue };
          }
          if (row.type !== ROW_TYPE_WORD) {
            return row;
          }
          return { ...row, article: nextValue };
        });
      }}
    />
  );
}
