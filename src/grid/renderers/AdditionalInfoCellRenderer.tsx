import type { ICellRendererParams } from "ag-grid-community";
import DeferredTextField from "../../components/DeferredTextField";
import { ROW_TYPE_WORD } from "../../models/dictionary";
import type { GridRow } from "../../types/grid";
import type { UpdateRowById } from "./types";

export function renderAdditionalInfoCell(params: ICellRendererParams<GridRow>, updateRowById: UpdateRowById) {
  if (!params.data || params.data.type !== ROW_TYPE_WORD) {
    return "";
  }

  const rowId = params.data.rowId;
  const refreshRowHeights = () => params.api.resetRowHeights();
  return (
    <DeferredTextField
      kind="textarea"
      className="inline-cell-textarea"
      rows={1}
      value={params.data.additionalInformation}
      onHeightChange={refreshRowHeights}
      onCommit={(nextValue) => {
        updateRowById(rowId, (row) =>
          row.type === ROW_TYPE_WORD ? { ...row, additionalInformation: nextValue } : row
        );
      }}
    />
  );
}
