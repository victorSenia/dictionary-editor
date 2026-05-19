import { useCallback, useEffect, useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import type { DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { getPasteColumns } from "./gridClipboard/cellText";
import { isEditableElement } from "./gridClipboard/clipboardIo";
import { confirmDialog } from "./gridClipboard/confirmDialog";
import { applyPastePlan, wouldPasteOverwrite } from "./gridClipboard/pasteApplier";

const PASTE_DEDUPE_WINDOW_MS = 300;

function parsePasteText(text: string): string[][] {
  if (!text) {
    return [];
  }
  if (!text.includes("\n") && !text.includes("\t")) {
    return [[text]];
  }
  return text
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .map((line) => line.split("\t"));
}

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  config: DictionaryConfig;
  rows: GridRow[];
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useGridPaste({ gridRef, config, rows, setRows, setLastAction }: Args) {
  const { t } = useTranslation();
  const lastAppliedPasteRef = useRef<{ signature: string; at: number } | null>(null);

  const applyPasteText = useCallback(
    async (text: string, colId: string, focusedRowId?: string) => {
      const parsedRows = parsePasteText(text);
      if (parsedRows.length === 0) {
        setLastAction({ key: "action.pasteFailed" });
        return;
      }

      const signature = `${focusedRowId ?? ""}|${colId}|${text}`;
      const now = Date.now();
      const lastApplied = lastAppliedPasteRef.current;
      if (lastApplied && lastApplied.signature === signature && now - lastApplied.at < PASTE_DEDUPE_WINDOW_MS) {
        return;
      }
      lastAppliedPasteRef.current = { signature, at: now };

      const pasteColumns = getPasteColumns(config);
      const startColumnIndex = pasteColumns.indexOf(colId);
      if (startColumnIndex < 0) {
        setLastAction({ key: "action.pasteFailed" });
        return;
      }

      const availableColumns = pasteColumns.length - startColumnIndex;
      const maxBufferColumns = Math.max(...parsedRows.map((row) => row.length));
      if (maxBufferColumns > availableColumns) {
        const shouldContinue = await confirmDialog(
          t("clipboard.confirmTooManyColumns", { maxBufferColumns, availableColumns }),
          { cancelText: t("dialog.cancel"), okText: t("dialog.ok") }
        );
        if (!shouldContinue) {
          return;
        }
      }

      const plan = {
        columns: pasteColumns,
        startColumnIndex,
        clippedRows: parsedRows.map((row) => row.slice(0, availableColumns)),
        focusedRowId
      };

      if (wouldPasteOverwrite(rows, config, plan)) {
        const shouldOverwrite = await confirmDialog(t("clipboard.confirmOverwrite"), {
          cancelText: t("dialog.cancel"),
          okText: t("dialog.ok")
        });
        if (!shouldOverwrite) {
          return;
        }
      }

      setRows((prev) => applyPastePlan(prev, config, plan));
      setLastAction({ key: "action.pasteInsert" });
    },
    [config, rows, setLastAction, setRows, t]
  );

  useEffect(() => {
    const onPaste = (clipboardEvent: ClipboardEvent) => {
      const activeElement = document.activeElement;
      if (isEditableElement(clipboardEvent.target) || isEditableElement(activeElement)) {
        return;
      }
      const gridHost = document.querySelector(".grid-host");
      if (gridHost && activeElement instanceof Node && !gridHost.contains(activeElement)) {
        return;
      }

      const focusedCell = gridRef.current?.api.getFocusedCell();
      if (!focusedCell) {
        return;
      }

      const text = clipboardEvent.clipboardData?.getData("text") ?? "";
      if (!text) {
        return;
      }

      clipboardEvent.preventDefault();
      const focusedDisplayRow = gridRef.current?.api.getDisplayedRowAtIndex(focusedCell.rowIndex);
      const focusedRowId = focusedDisplayRow?.data?.rowId;
      void applyPasteText(text, focusedCell.column.getColId(), focusedRowId);
    };

    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [applyPasteText, gridRef]);

  return { applyPasteText };
}
