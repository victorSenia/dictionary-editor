import { useCallback, useEffect, useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { CellKeyDownEvent } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import { createEmptyWordRow, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { createRowId } from "../utils/rowId";
import { copyTextToClipboard, isEditableElement } from "./gridClipboard/clipboardIo";
import { confirmDialog } from "./gridClipboard/confirmDialog";
import {
  buildRowCopyText,
  clearCellText,
  getCellText,
  getPasteColumns,
  setCellText
} from "./gridClipboard/cellText";
import { buildSelectedCellsCopyText } from "./gridClipboard/selectionCopy";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  config: DictionaryConfig;
  rows: GridRow[];
  selectedCellKeys: string[];
  clearSelectedCells: () => void;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useGridClipboard({
  gridRef,
  config,
  rows,
  selectedCellKeys,
  clearSelectedCells,
  setRows,
  setLastAction
}: Args) {
  const { t } = useTranslation();
  const lastAppliedPasteRef = useRef<{ signature: string; at: number } | null>(null);
  const PASTE_DEDUPE_WINDOW_MS = 300;

  const applyPasteText = useCallback(
    async (text: string, colId: string, focusedRowId?: string) => {
      if (!text) {
        setLastAction({ key: "action.pasteFailed" });
        return;
      }
      const now = Date.now();
      const signature = `${focusedRowId ?? ""}|${colId}|${text}`;
      const lastApplied = lastAppliedPasteRef.current;
      if (lastApplied && lastApplied.signature === signature && now - lastApplied.at < PASTE_DEDUPE_WINDOW_MS) {
        return;
      }
      lastAppliedPasteRef.current = { signature, at: now };

      const pasteColumns = getPasteColumns(config);

      const isSimpleText = !text.includes("\n") && !text.includes("\t");
      const parsedRows = isSimpleText
        ? [[text]]
        : text
            .split(/\r?\n/)
            .filter((line) => line.length > 0)
            .map((line) => line.split("\t"));
      if (parsedRows.length === 0) {
        setLastAction({ key: "action.pasteFailed" });
        return;
      }

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

      const clippedRows = parsedRows.map((row) => row.slice(0, availableColumns));
      const resolveStartRowIndex = (baseRows: GridRow[]): number => {
        if (focusedRowId) {
          const focusedIndex = baseRows.findIndex((row) => row.id === focusedRowId);
          if (focusedIndex >= 0) {
            return focusedIndex;
          }
        }
        return baseRows.length === 0 ? 0 : baseRows.length;
      };

      const ensureRowsCapacity = (baseRows: GridRow[], startRowIndex: number): GridRow[] => {
        const next = [...baseRows];
        const requiredRowsCount = startRowIndex + clippedRows.length;
        while (next.length < requiredRowsCount) {
          next.push({ ...createEmptyWordRow(config), id: createRowId("word") });
        }
        return next;
      };

      const wouldOverwrite = (baseRows: GridRow[]): boolean => {
        const startRowIndexResolved = resolveStartRowIndex(baseRows);
        const targetRows = ensureRowsCapacity(baseRows, startRowIndexResolved);
        return clippedRows.some((bufferRow, rowOffset) =>
          bufferRow.some((_, columnOffset) => {
            const rowIndex = startRowIndexResolved + rowOffset;
            const targetColId = pasteColumns[startColumnIndex + columnOffset];
            const currentValue = getCellText(targetRows[rowIndex], targetColId, config.translationDelimiter);
            return currentValue.trim() !== "";
          })
        );
      };

      if (wouldOverwrite(rows)) {
        const shouldOverwrite = await confirmDialog(t("clipboard.confirmOverwrite"), {
          cancelText: t("dialog.cancel"),
          okText: t("dialog.ok")
        });
        if (!shouldOverwrite) {
          return;
        }
      }

      setRows((prev) => {
        const startRowIndexResolved = resolveStartRowIndex(prev);
        const next = ensureRowsCapacity(prev, startRowIndexResolved);
        clippedRows.forEach((bufferRow, rowOffset) => {
          const rowIndex = startRowIndexResolved + rowOffset;
          let updatedRow = next[rowIndex];
          bufferRow.forEach((value, columnOffset) => {
            const targetColId = pasteColumns[startColumnIndex + columnOffset];
            updatedRow = setCellText(updatedRow, targetColId, value, config.translationDelimiter);
          });
          next[rowIndex] = updatedRow;
        });
        return next;
      });
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
      const focusedRowId = focusedDisplayRow?.data?.id;
      const colId = focusedCell.column.getColId();

      void applyPasteText(text, colId, focusedRowId);
    };

    document.addEventListener("paste", onPaste);
    return () => {
      document.removeEventListener("paste", onPaste);
    };
  }, [applyPasteText, gridRef]);

  const onCellKeyDown = useCallback(
    (event: CellKeyDownEvent<GridRow>) => {
      const keyboardEvent = event.event as KeyboardEvent | undefined;
      if (!keyboardEvent) {
        return;
      }
      if (keyboardEvent.defaultPrevented) {
        return;
      }
      const isCopy = (keyboardEvent.ctrlKey || keyboardEvent.metaKey) && keyboardEvent.key.toLowerCase() === "c";
      const isPasteShortcut =
        (keyboardEvent.ctrlKey || keyboardEvent.metaKey) && keyboardEvent.key.toLowerCase() === "v";
      const isPasteAlternative = keyboardEvent.shiftKey && keyboardEvent.key === "Insert";
      const isPaste = isPasteShortcut || isPasteAlternative;
      const isDelete = keyboardEvent.key === "Delete";
      const targetIsEditable = isEditableElement(keyboardEvent.target);

      if (isPaste && targetIsEditable) {
        return;
      }
      if ((isCopy || isDelete) && targetIsEditable && selectedCellKeys.length === 0) {
        return;
      }
      if (isDelete) {
        if (selectedCellKeys.length === 0) {
          return;
        }

        keyboardEvent.preventDefault();

        setRows((prev) => {
          const next = [...prev];
          let changed = false;
          const rowIdToColumnIds = new Map<string, Set<string>>();

          selectedCellKeys.forEach((key) => {
            const [rowId, colId] = key.split("::");
            if (!rowId || !colId) {
              return;
            }
            if (!rowIdToColumnIds.has(rowId)) {
              rowIdToColumnIds.set(rowId, new Set<string>());
            }
            rowIdToColumnIds.get(rowId)?.add(colId);
          });

          const rowIndexById = new Map(next.map((row, index) => [row.id, index]));
          rowIdToColumnIds.forEach((columnIds, rowId) => {
            const rowIndex = rowIndexById.get(rowId);
            if (rowIndex == null) {
              return;
            }
            let updatedRow = next[rowIndex];
            columnIds.forEach((columnId) => {
              updatedRow = clearCellText(updatedRow, columnId);
            });

            if (updatedRow !== next[rowIndex]) {
              next[rowIndex] = updatedRow;
              changed = true;
            }
          });

          return changed ? next : prev;
        });
        clearSelectedCells();
        setLastAction({ key: "action.clearSelectedCells" });
        return;
      }
      if (isCopy) {
        keyboardEvent.preventDefault();

        const api = gridRef.current?.api;
        if (api) {
          const selectedCellsText = buildSelectedCellsCopyText({
            api,
            selectedCellKeys,
            rows,
            translationDelimiter: config.translationDelimiter
          });
          if (selectedCellsText != null) {
            void copyTextToClipboard(selectedCellsText);
            setLastAction({ key: "action.copySelected" });
            return;
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
            setLastAction({ key: "action.copySelected" });
          }
          return;
        }

        const rowData = event.data;
        if (!rowData) {
          return;
        }
        const colId = event.column.getColId();
        const value =
          getCellText(rowData, colId, config.translationDelimiter) || buildRowCopyText(rowData, config);

        if (value !== "") {
          void copyTextToClipboard(value);
          setLastAction({ key: "action.copy" });
        }
        return;
      }

      if (!isPaste) {
        return;
      }
      if (keyboardEvent.repeat) {
        return;
      }

      // Let the native paste event provide clipboard data. Avoid direct clipboard reads
      // (`navigator.clipboard.readText`) to prevent browser permission prompts.
    },
    [applyPasteText, clearSelectedCells, config, gridRef, rows, selectedCellKeys, setLastAction, setRows]
  );

  return { onCellKeyDown };
}
