import { useCallback, type Dispatch, type RefObject, type SetStateAction } from "react";
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
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useGridClipboard({ gridRef, config, setRows, setLastAction }: Args) {
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

  const onCellKeyDown = useCallback(
    (event: CellKeyDownEvent<GridRow>) => {
      const keyboardEvent = event.event as KeyboardEvent | undefined;
      if (!keyboardEvent) {
        return;
      }
      const isCopy = (keyboardEvent.ctrlKey || keyboardEvent.metaKey) && keyboardEvent.key.toLowerCase() === "c";
      const isPaste = (keyboardEvent.ctrlKey || keyboardEvent.metaKey) && keyboardEvent.key.toLowerCase() === "v";
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

      keyboardEvent.preventDefault();
      const colId = event.column.getColId();
      const focusedId = event.data?.id;

      const createRowFromPaste = (raw: string): GridRow => {
        const id = createRowId("word");

        if (raw.includes("\t")) {
          const cols = raw.split("\t");
          const row = createEmptyWordRow(config);
          row.article = cols[0] ?? "";
          row.valueFrom = cols[1] ?? "";
          row.additionalInformation = cols[2] ?? "";
          config.languagesTo.forEach((lang, idx) => {
            const v = cols[idx + 3] ?? "";
            row.valuesTo[lang] = parseTranslationValue(v, config.translationDelimiter);
          });
          return { ...row, id };
        }

        const row = createEmptyWordRow(config);
        if (colId === COLUMN_ID_ARTICLE) {
          row.article = raw;
        } else if (colId === COLUMN_ID_WORD) {
          row.valueFrom = raw;
        } else if (colId === COLUMN_ID_ADDITIONAL_INFO) {
          row.additionalInformation = raw;
        } else if (colId.startsWith(TRANSLATION_COLUMN_PREFIX)) {
          const lang = colId.slice(TRANSLATION_COLUMN_PREFIX.length);
          row.valuesTo[lang] = parseTranslationValue(raw, config.translationDelimiter);
        } else {
          row.valueFrom = raw;
        }

        return { ...row, id };
      };

      void (async () => {
        const text = await readTextFromClipboard();
        if (!text) {
          setLastAction({ key: "action.pasteFailed" });
          return;
        }

        const lines = text.split(/\r?\n/).filter((line) => line.length > 0);
        const selected = (gridRef.current?.api.getSelectedNodes() ?? [])
          .map((node) => node.data?.id)
          .filter((id): id is string => typeof id === "string");

        setRows((prev) => {
          const insertRows = lines.map((line) => createRowFromPaste(line));
          let insertIndex = prev.length;

          if (selected.length > 0) {
            const selectedIndexes = prev
              .map((row, index) => (selected.includes(row.id) ? index : -1))
              .filter((index) => index >= 0);
            if (selectedIndexes.length > 0) {
              insertIndex = Math.max(...selectedIndexes) + 1;
            }
          } else if (focusedId) {
            const focusedIndex = prev.findIndex((row) => row.id === focusedId);
            if (focusedIndex >= 0) {
              insertIndex = focusedIndex + 1;
            }
          }

          const next = [...prev];
          next.splice(insertIndex, 0, ...insertRows);
          return next;
        });
        setLastAction({ key: "action.pasteInsert" });
      })();
    },
    [buildRowCopyText, config, gridRef, setLastAction, setRows]
  );

  return { onCellKeyDown };
}
