import { useCallback, useEffect, useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { CellKeyDownEvent } from "ag-grid-community";
import type { AgGridReact } from "ag-grid-react";
import { ROW_TYPE_TOPIC, createEmptyWordRow, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { parseTranslationValue } from "../utils/dictionaryHelpers";
import { createRowId } from "../utils/rowId";
import {
  COLUMN_ID_ADDITIONAL_INFO,
  COLUMN_ID_ARTICLE,
  COLUMN_ID_WORD,
  TRANSLATION_COLUMN_PREFIX
} from "../constants/grid";

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  }
}

async function readTextFromClipboard(): Promise<string> {
  try {
    return await navigator.clipboard.readText();
  } catch {
    return "";
  }
}

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
  const pendingPasteRef = useRef<{ token: number; colId: string; rowId?: string; handled: boolean } | null>(null);
  const lastAppliedPasteRef = useRef<{ signature: string; at: number } | null>(null);
  const PASTE_EVENT_WAIT_MS = 40;
  const PASTE_DEDUPE_WINDOW_MS = 300;

  const buildRowCopyText = useCallback(
    (row: GridRow): string => {
      if (row.type === ROW_TYPE_TOPIC) {
        return row.label;
      }

      const columns = [row.article, row.valueFrom, row.additionalInformation];
      for (const language of config.languagesTo) {
        const values = row.valuesTo[language] ?? [];
        columns.push(values.join(`${config.translationDelimiter} `));
      }
      return columns.join("\t");
    },
    [config.languagesTo, config.translationDelimiter]
  );

  const applyPasteText = useCallback(
    (text: string, colId: string, focusedRowId?: string) => {
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

      const pasteColumns = [
        COLUMN_ID_ARTICLE,
        COLUMN_ID_WORD,
        COLUMN_ID_ADDITIONAL_INFO,
        ...config.languagesTo.map((lang) => `${TRANSLATION_COLUMN_PREFIX}${lang}`)
      ];

      const getCellText = (row: GridRow, targetColId: string): string => {
        if (row.type === ROW_TYPE_TOPIC) {
          if (targetColId === COLUMN_ID_ARTICLE || targetColId === COLUMN_ID_WORD) {
            return row.label;
          }
          return "";
        }

        if (targetColId === COLUMN_ID_ARTICLE) {
          return row.article;
        }
        if (targetColId === COLUMN_ID_WORD) {
          return row.valueFrom;
        }
        if (targetColId === COLUMN_ID_ADDITIONAL_INFO) {
          return row.additionalInformation;
        }
        if (targetColId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
          const lang = targetColId.slice(TRANSLATION_COLUMN_PREFIX.length);
          return (row.valuesTo[lang] ?? []).join(`${config.translationDelimiter} `);
        }
        return "";
      };

      const setCellText = (row: GridRow, targetColId: string, raw: string): GridRow => {
        if (row.type === ROW_TYPE_TOPIC) {
          if (targetColId === COLUMN_ID_ARTICLE || targetColId === COLUMN_ID_WORD) {
            return { ...row, label: raw };
          }
          return row;
        }

        if (targetColId === COLUMN_ID_ARTICLE) {
          return { ...row, article: raw };
        }
        if (targetColId === COLUMN_ID_WORD) {
          return { ...row, valueFrom: raw };
        }
        if (targetColId === COLUMN_ID_ADDITIONAL_INFO) {
          return { ...row, additionalInformation: raw };
        }
        if (targetColId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
          const lang = targetColId.slice(TRANSLATION_COLUMN_PREFIX.length);
          return {
            ...row,
            valuesTo: {
              ...row.valuesTo,
              [lang]: parseTranslationValue(raw, config.translationDelimiter)
            }
          };
        }
        return row;
      };

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
        const shouldContinue = window.confirm(
          `Pasted data has ${maxBufferColumns} columns, but only ${availableColumns} fit from the selected cell. Extra columns will be ignored. Continue?`
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
            const currentValue = getCellText(targetRows[rowIndex], targetColId);
            return currentValue.trim() !== "";
          })
        );
      };

      if (wouldOverwrite(rows)) {
        const shouldOverwrite = window.confirm(
          "Some target cells already contain data. Pasting will overwrite existing values. Continue?"
        );
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
            updatedRow = setCellText(updatedRow, targetColId, value);
          });
          next[rowIndex] = updatedRow;
        });
        return next;
      });
      setLastAction({ key: "action.pasteInsert" });
    },
    [config, rows, setLastAction, setRows]
  );

  useEffect(() => {
    const onPaste = (clipboardEvent: ClipboardEvent) => {
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

      if (pendingPasteRef.current) {
        pendingPasteRef.current.handled = true;
      }
      applyPasteText(text, colId, focusedRowId);
      pendingPasteRef.current = null;
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
      if (isDelete) {
        if (selectedCellKeys.length === 0) {
          return;
        }

        keyboardEvent.preventDefault();
        const getClearedRow = (row: GridRow, targetColId: string): GridRow => {
          if (row.type === ROW_TYPE_TOPIC) {
            if (targetColId === COLUMN_ID_ARTICLE || targetColId === COLUMN_ID_WORD) {
              if (row.label === "") {
                return row;
              }
              return { ...row, label: "" };
            }
            return row;
          }

          if (targetColId === COLUMN_ID_ARTICLE) {
            return row.article === "" ? row : { ...row, article: "" };
          }
          if (targetColId === COLUMN_ID_WORD) {
            return row.valueFrom === "" ? row : { ...row, valueFrom: "" };
          }
          if (targetColId === COLUMN_ID_ADDITIONAL_INFO) {
            return row.additionalInformation === "" ? row : { ...row, additionalInformation: "" };
          }
          if (targetColId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
            const lang = targetColId.slice(TRANSLATION_COLUMN_PREFIX.length);
            const currentValues = row.valuesTo[lang] ?? [];
            if (currentValues.length === 0) {
              return row;
            }
            return {
              ...row,
              valuesTo: {
                ...row.valuesTo,
                [lang]: []
              }
            };
          }
          return row;
        };

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
              updatedRow = getClearedRow(updatedRow, columnId);
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

        const selectedNodes = gridRef.current?.api.getSelectedNodes() ?? [];
        if (selectedNodes.length > 0) {
          const lines = selectedNodes
            .map((node) => node.data)
            .filter((data): data is GridRow => Boolean(data))
            .map((row) => buildRowCopyText(row));

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
        let value: string;
        if (rowData.type === ROW_TYPE_TOPIC) {
          value = rowData.label;
        } else if (colId === COLUMN_ID_WORD) {
          value = rowData.valueFrom;
        } else if (colId === COLUMN_ID_ARTICLE) {
          value = rowData.article;
        } else if (colId === COLUMN_ID_ADDITIONAL_INFO) {
          value = rowData.additionalInformation;
        } else if (colId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
          const lang = colId.slice(TRANSLATION_COLUMN_PREFIX.length);
          value = (rowData.valuesTo[lang] ?? []).join(`${config.translationDelimiter} `);
        } else {
          value = buildRowCopyText(rowData);
        }

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

      keyboardEvent.preventDefault();
      const focusedCell = gridRef.current?.api.getFocusedCell();
      const focusedColId = focusedCell?.column.getColId() ?? event.column.getColId();
      const focusedDisplayRow =
        typeof focusedCell?.rowIndex === "number"
          ? gridRef.current?.api.getDisplayedRowAtIndex(focusedCell.rowIndex)
          : undefined;
      const focusedRowId = focusedDisplayRow?.data?.id ?? event.data?.id;
      const token = Date.now();
      pendingPasteRef.current = { token, colId: focusedColId, rowId: focusedRowId, handled: false };

      void (async () => {
        await new Promise((resolve) => setTimeout(resolve, PASTE_EVENT_WAIT_MS));
        const pending = pendingPasteRef.current;
        if (!pending || pending.token !== token || pending.handled) {
          return;
        }
        const text = await readTextFromClipboard();
        applyPasteText(text, pending.colId, pending.rowId);
        pendingPasteRef.current = null;
      })();
    },
    [applyPasteText, buildRowCopyText, clearSelectedCells, gridRef, selectedCellKeys, setLastAction, setRows]
  );

  return { onCellKeyDown };
}
