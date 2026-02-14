import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react";
import type { ColDef, ColumnHeaderClickedEvent, ICellRendererParams, ValueGetterParams } from "ag-grid-community";
import type { DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import { createNextLanguageKey } from "../utils/dictionaryHelpers";
import TranslationHeader from "../components/TranslationHeader";
import TranslationCell from "../components/TranslationCell";

type Args = {
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<string>>;
};

export function useTranslationColumns({ config, setConfig, setRows, setLastAction }: Args) {
  const applyLanguagesTo = useCallback(
    (languagesTo: string[]) => {
      setConfig((prev) => ({ ...prev, languagesTo }));
      setRows((prev) =>
        prev.map((row) => {
          if (row.type !== "word") {
            return row;
          }

          const valuesTo: Record<string, string[]> = {};
          for (const language of languagesTo) {
            valuesTo[language] = row.valuesTo[language] ?? [];
          }

          return { ...row, valuesTo };
        })
      );
    },
    [setConfig, setRows]
  );

  const addTranslationColumn = useCallback(
    (insertAt: number) => {
      const nextLanguage = createNextLanguageKey(config.languagesTo);
      const languagesTo = [...config.languagesTo];
      const safeInsert = Math.max(0, Math.min(insertAt, languagesTo.length));
      languagesTo.splice(safeInsert, 0, nextLanguage);
      applyLanguagesTo(languagesTo);
      setLastAction("Add Translation Column");
    },
    [applyLanguagesTo, config.languagesTo, setLastAction]
  );

  const removeTranslationColumn = useCallback(
    (language: string): boolean => {
      const languagesTo = config.languagesTo.filter((item) => item !== language);
      if (languagesTo.length === 0) {
        setLastAction("Cannot remove last translation column");
        return false;
      }

      setConfig((prev) => ({ ...prev, languagesTo }));
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.type !== "word") {
            return row;
          }

          const valuesTo = { ...row.valuesTo };
          delete valuesTo[language];
          return { ...row, valuesTo };
        })
      );
      setLastAction("Remove Translation Column");
      return true;
    },
    [config.languagesTo, setConfig, setLastAction, setRows]
  );

  const renameTranslationColumn = useCallback(
    (fromLanguage: string, toLanguage: string): boolean => {
      const nextLanguage = toLanguage.trim();
      if (nextLanguage === "" || nextLanguage === fromLanguage) {
        setLastAction("Rename Translation Column");
        return true;
      }
      if (!config.languagesTo.includes(fromLanguage)) {
        setLastAction(`Language "${fromLanguage}" not found`);
        return false;
      }
      if (config.languagesTo.includes(nextLanguage)) {
        setLastAction(`Language "${nextLanguage}" already exists`);
        return false;
      }

      const languagesTo = config.languagesTo.map((language) =>
        language === fromLanguage ? nextLanguage : language
      );

      setConfig((prev) => ({ ...prev, languagesTo }));
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.type !== "word") {
            return row;
          }

          const movedValues = row.valuesTo[fromLanguage] ?? [];
          const valuesTo = { ...row.valuesTo };
          delete valuesTo[fromLanguage];
          valuesTo[nextLanguage] = movedValues;
          return { ...row, valuesTo };
        })
      );
      setLastAction("Rename Translation Column");
      return true;
    },
    [config.languagesTo, setConfig, setLastAction, setRows]
  );

  const moveTranslationItem = useCallback(
    (rowId: string, language: string, from: number, to: number) => {
      if (to < 0) {
        return;
      }

      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.id !== rowId || row.type !== "word") {
            return row;
          }

          const current = [...(row.valuesTo[language] ?? [])];
          if (from < 0 || from >= current.length || to >= current.length) {
            return row;
          }

          const [moved] = current.splice(from, 1);
          current.splice(to, 0, moved);

          return {
            ...row,
            valuesTo: {
              ...row.valuesTo,
              [language]: current
            }
          };
        })
      );
      setLastAction("Reorder Translation");
    },
    [setLastAction, setRows]
  );

  const updateTranslationItem = useCallback(
    (rowId: string, language: string, index: number, value: string) => {
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.id !== rowId || row.type !== "word") {
            return row;
          }

          const current = [...(row.valuesTo[language] ?? [])];
          if (index < 0 || index >= current.length) {
            return row;
          }
          current[index] = value;

          return {
            ...row,
            valuesTo: {
              ...row.valuesTo,
              [language]: current
            }
          };
        })
      );
      setLastAction("Edit Translation");
    },
    [setLastAction, setRows]
  );

  const addTranslationItem = useCallback(
    (rowId: string, language: string) => {
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.id !== rowId || row.type !== "word") {
            return row;
          }

          const current = [...(row.valuesTo[language] ?? [])];
          current.push("");
          return {
            ...row,
            valuesTo: {
              ...row.valuesTo,
              [language]: current
            }
          };
        })
      );
      setLastAction("Add Translation");
    },
    [setLastAction, setRows]
  );

  const removeTranslationItem = useCallback(
    (rowId: string, language: string, index: number) => {
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.id !== rowId || row.type !== "word") {
            return row;
          }

          const current = [...(row.valuesTo[language] ?? [])];
          if (index < 0 || index >= current.length) {
            return row;
          }
          current.splice(index, 1);
          return {
            ...row,
            valuesTo: {
              ...row.valuesTo,
              [language]: current
            }
          };
        })
      );
      setLastAction("Remove Translation");
    },
    [setLastAction, setRows]
  );

  const onColumnHeaderClicked = useCallback(
    (event: ColumnHeaderClickedEvent<GridRow>) => {
      const column = event.column as {
        getColId?: () => string;
        getGroupId?: () => string;
      };
      const colId = column.getColId?.() ?? column.getGroupId?.();
      if (!colId) {
        return;
      }

      if (colId === "add-col-end") {
        addTranslationColumn(config.languagesTo.length);
      }
    },
    [addTranslationColumn, config.languagesTo.length]
  );

  const translationColumns = useMemo<ColDef<GridRow>[]>(() => {
    return config.languagesTo.map((language) => ({
      headerName: `To ${language}`,
      colId: `to-${language}`,
      headerComponent: TranslationHeader,
      headerComponentParams: {
        onRename: renameTranslationColumn,
        onDelete: removeTranslationColumn
      },
      sortable: false,
      filter: false,
      editable: false,
      autoHeight: true,
      wrapText: true,
      valueGetter: (params: ValueGetterParams<GridRow>) => {
        if (!params.data || params.data.type !== "word") {
          return "";
        }
        return (params.data.valuesTo[language] ?? []).join(`${config.translationDelimiter} `);
      },
      cellRenderer: (params: ICellRendererParams<GridRow>) => (
        <TranslationCell
          params={params}
          language={language}
          onMove={moveTranslationItem}
          onUpdate={updateTranslationItem}
          onAdd={addTranslationItem}
          onRemove={removeTranslationItem}
        />
      )
    }));
  }, [
    addTranslationItem,
    config.languagesTo,
    config.translationDelimiter,
    moveTranslationItem,
    removeTranslationColumn,
    removeTranslationItem,
    renameTranslationColumn,
    updateTranslationItem
  ]);

  return { translationColumns, onColumnHeaderClicked };
}
