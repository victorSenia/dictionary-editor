import type { Dispatch, SetStateAction } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import type { GridRow } from "../../types/grid";
import type { LastActionState } from "../../types/lastAction";

export function renderDeleteRowCell(
  params: ICellRendererParams<GridRow>,
  setRows: Dispatch<SetStateAction<GridRow[]>>,
  setLastAction: Dispatch<SetStateAction<LastActionState>>,
  removeRowLabel: string
) {
  if (!params.data) {
    return null;
  }

  const rowId = params.data.rowId;
  return (
    <button
      type="button"
      className="insert-row-button danger-button"
      aria-label={removeRowLabel}
      onClick={(event) => {
        event.stopPropagation();
        setRows((prev) => prev.filter((row) => row.rowId !== rowId));
        setLastAction({ key: "action.removeRow" });
      }}
    >
      {"\u00D7"}
    </button>
  );
}
