import type { ICellRendererParams } from "ag-grid-community";
import DeferredTextField from "../../components/DeferredTextField";
import { ROW_TYPE_TOPIC, ROW_TYPE_WORD } from "../../models/dictionary";
import type { GridRow } from "../../types/grid";
import TopicLabelEditor from "./TopicLabelEditor";
import type { UpdateRowById } from "./types";

export function renderWordCell(
  params: ICellRendererParams<GridRow>,
  showArticleColumn: boolean,
  updateRowById: UpdateRowById
) {
  if (!params.data) {
    return "";
  }

  if (params.data.type === ROW_TYPE_TOPIC) {
    if (showArticleColumn) {
      return "";
    }
    return <TopicLabelEditor rowId={params.data.rowId} value={params.data.label} updateRowById={updateRowById} />;
  }

  if (params.data.type !== ROW_TYPE_WORD) {
    return "";
  }

  const rowId = params.data.rowId;
  const refreshRowHeights = () => params.api.resetRowHeights();
  return (
    <DeferredTextField
      kind="textarea"
      className="inline-cell-textarea"
      rows={1}
      value={params.data.valueFrom}
      onHeightChange={refreshRowHeights}
      onCommit={(nextValue) => {
        updateRowById(rowId, (row) =>
          row.type === ROW_TYPE_WORD ? { ...row, valueFrom: nextValue } : row
        );
      }}
    />
  );
}
