import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react";
import type { ColDef, ColumnHeaderClickedEvent, ICellRendererParams, ValueGetterParams } from "ag-grid-community";
import { useTranslation } from "react-i18next";
import { ROW_TYPE_WORD, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { createNextLanguageKey } from "../utils/dictionaryHelpers";
import TranslationHeader from "../components/TranslationHeader";
import TranslationCell from "../components/TranslationCell";
import { COLUMN_ID_ADD_END, TRANSLATION_COLUMN_PREFIX } from "../constants/grid";

type Args = {
  config: DictionaryConfig;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useTranslationColumns({ config, setConfig, setRows, setLastAction }: Args) {
  const { t } = useTranslation();

  const updateTranslationValues = useCallback(
    (rowId: string, language: string, transform: (current: string[]) => string[] | null) => {
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.id !== rowId || row.type !== ROW_TYPE_WORD) {
            return row;
          }

          const nextValues = transform([...(row.valuesTo[language] ?? [])]);
          if (!nextValues) {
            return row;
          }

          return {
            ...row,
            valuesTo: {
              ...row.valuesTo,
              [language]: nextValues
            }
          };
        })
      );
    },
    [setRows]
  );

  const applyLanguagesTo = useCallback(
    (languagesTo: string[]) => {
      setConfig((prev) => ({ ...prev, languagesTo }));
      setRows((prev) =>
        prev.map((row) => {
          if (row.type !== ROW_TYPE_WORD) {
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
      setLastAction({ key: "action.addTranslationColumn" });
    },
    [applyLanguagesTo, config.languagesTo, setLastAction]
  );

  const removeTranslationColumn = useCallback(
    (language: string): boolean => {
      const languagesTo = config.languagesTo.filter((item) => item !== language);
      if (languagesTo.length === 0) {
        setLastAction({ key: "action.cannotRemoveLastTranslationColumn" });
        return false;
      }

      setConfig((prev) => ({ ...prev, languagesTo }));
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.type !== ROW_TYPE_WORD) {
            return row;
          }

          const valuesTo = { ...row.valuesTo };
          delete valuesTo[language];
          return { ...row, valuesTo };
        })
      );
      setLastAction({ key: "action.removeTranslationColumn" });
      return true;
    },
    [config.languagesTo, setConfig, setLastAction, setRows]
  );

  const renameTranslationColumn = useCallback(
    (fromLanguage: string, toLanguage: string): boolean => {
      const nextLanguage = toLanguage.trim();
      if (nextLanguage === "" || nextLanguage === fromLanguage) {
        setLastAction({ key: "action.renameTranslationColumn" });
        return true;
      }
      if (!config.languagesTo.includes(fromLanguage)) {
        setLastAction({ key: "action.languageNotFound", values: { language: fromLanguage } });
        return false;
      }
      if (config.languagesTo.includes(nextLanguage)) {
        setLastAction({ key: "action.languageExists", values: { language: nextLanguage } });
        return false;
      }

      const languagesTo = config.languagesTo.map((language) =>
        language === fromLanguage ? nextLanguage : language
      );

      setConfig((prev) => ({ ...prev, languagesTo }));
      setRows((prev): GridRow[] =>
        prev.map((row): GridRow => {
          if (row.type !== ROW_TYPE_WORD) {
            return row;
          }

          const movedValues = row.valuesTo[fromLanguage] ?? [];
          const valuesTo = { ...row.valuesTo };
          delete valuesTo[fromLanguage];
          valuesTo[nextLanguage] = movedValues;
          return { ...row, valuesTo };
        })
      );
      setLastAction({ key: "action.renameTranslationColumn" });
      return true;
    },
    [config.languagesTo, setConfig, setLastAction, setRows]
  );

  const moveTranslationItem = useCallback(
    (rowId: string, language: string, from: number, to: number) => {
      if (to < 0) {
        return;
      }

      updateTranslationValues(rowId, language, (current) => {
        if (from < 0 || from >= current.length || to >= current.length) {
          return null;
        }
        const [moved] = current.splice(from, 1);
        current.splice(to, 0, moved);
        return current;
      });
      setLastAction({ key: "action.reorderTranslation" });
    },
    [setLastAction, updateTranslationValues]
  );

  const updateTranslationItem = useCallback(
    (rowId: string, language: string, index: number, value: string) => {
      updateTranslationValues(rowId, language, (current) => {
        if (index < 0 || index >= current.length) {
          return null;
        }
        current[index] = value;
        return current;
      });
      setLastAction({ key: "action.editTranslation" });
    },
    [setLastAction, updateTranslationValues]
  );

  const addTranslationItem = useCallback(
    (rowId: string, language: string) => {
      updateTranslationValues(rowId, language, (current) => {
        current.push("");
        return current;
      });
      setLastAction({ key: "action.addTranslation" });
    },
    [setLastAction, updateTranslationValues]
  );

  const removeTranslationItem = useCallback(
    (rowId: string, language: string, index: number) => {
      updateTranslationValues(rowId, language, (current) => {
        if (index < 0 || index >= current.length) {
          return null;
        }
        current.splice(index, 1);
        return current;
      });
      setLastAction({ key: "action.removeTranslation" });
    },
    [setLastAction, updateTranslationValues]
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

      if (colId === COLUMN_ID_ADD_END) {
        addTranslationColumn(config.languagesTo.length);
      }
    },
    [addTranslationColumn, config.languagesTo.length]
  );

  const translationColumns = useMemo<ColDef<GridRow>[]>(() => {
    return config.languagesTo.map((language) => ({
      headerName: t("grid.toLanguage", { language }),
      colId: `${TRANSLATION_COLUMN_PREFIX}${language}`,
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
        if (!params.data || params.data.type !== ROW_TYPE_WORD) {
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
    t,
    updateTranslationItem
  ]);

  return { translationColumns, onColumnHeaderClicked };
}
