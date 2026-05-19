import type { CellKeyDownEvent, GridApi } from "ag-grid-community";
import type { DictionaryConfig } from "../../models/dictionary";
import type { GridRow } from "../../types/grid";
import { buildRowCopyText, getCellText } from "./cellText";
import { copyTextToClipboard } from "./clipboardIo";
import { buildSelectedCellsCopyText } from "./selectionCopy";

type CopyArgs = {
  api: GridApi<GridRow> | undefined;
  event: CellKeyDownEvent<GridRow>;
  config: DictionaryConfig;
  rows: GridRow[];
  selectedCellKeys: string[];
};

export function copyFromGridSelection({ api, event, config, rows, selectedCellKeys }: CopyArgs): "none" | "cell" | "selected" {
  if (api) {
    const selectedCellsText = buildSelectedCellsCopyText({
      api,
      selectedCellKeys,
      rows,
      translationDelimiter: config.translationDelimiter
    });
    if (selectedCellsText != null) {
      void copyTextToClipboard(selectedCellsText);
      return "selected";
    }
  }

  const selectedNodes = api?.getSelectedNodes() ?? [];
  if (selectedNodes.length > 0) {
    const lines = selectedNodes
      .map((node) => node.data)
      .filter((data): data is GridRow => Boolean(data))
      .map((row) => buildRowCopyText(row, config));

    if (lines.length > 0) {
      void copyTextToClipboard(lines.join("\n"));
      return "selected";
    }
    return "none";
  }

  const rowData = event.data;
  if (!rowData) {
    return "none";
  }

  const colId = event.column.getColId();
  const value = getCellText(rowData, colId, config.translationDelimiter) || buildRowCopyText(rowData, config);
  if (value !== "") {
    void copyTextToClipboard(value);
    return "cell";
  }

  return "none";
}
