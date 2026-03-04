import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react";
import type { ColDef, ColumnHeaderClickedEvent, ICellRendererParams, ValueGetterParams } from "ag-grid-community";
import { useTranslation } from "react-i18next";
import { ROW_TYPE_WORD, type DictionaryConfig } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { createNextLanguageKey, parseTranslationValue } from "../utils/dictionaryHelpers";
import type { RenamePair } from "../utils/languageTransition";
import TranslationHeader from "../components/TranslationHeader";
import TranslationCell from "../components/TranslationCell";
import { COLUMN_ID_ADD_END, TRANSLATION_COLUMN_PREFIX } from "../constants/grid";

type Args = {
  config: DictionaryConfig;
  headerEditResetToken: number;
  applyLanguagesTo: (languagesTo: string[], renamePairs?: RenamePair[]) => void;
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
};

export function useTranslationColumns({
  config,
  headerEditResetToken,
  applyLanguagesTo,
  setRows,
  setLastAction
}: Args) {
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
      applyLanguagesTo(languagesTo);
      setLastAction({ key: "action.removeTranslationColumn" });
      return true;
    },
    [applyLanguagesTo, config.languagesTo, setLastAction]
  );

  const renameTranslationColumn = useCallback(
    (fromLanguage: string, toLanguage: string): { ok: boolean; error?: string } => {
      const nextLanguage = toLanguage.trim();
      if (nextLanguage === "" || nextLanguage === fromLanguage) {
        setLastAction({ key: "action.renameTranslationColumn" });
        return { ok: true };
      }
      if (!config.languagesTo.includes(fromLanguage)) {
        const error = t("action.languageNotFound", { language: fromLanguage });
        setLastAction({ key: "action.languageNotFound", values: { language: fromLanguage } });
        return { ok: false, error };
      }
      if (config.languagesTo.includes(nextLanguage)) {
        const error = t("action.languageExists", { language: nextLanguage });
        setLastAction({ key: "action.languageExists", values: { language: nextLanguage } });
        return { ok: false, error };
      }
      const languagesTo = config.languagesTo.map((language) =>
        language === fromLanguage ? nextLanguage : language
      );
      applyLanguagesTo(languagesTo, [{ from: fromLanguage, to: nextLanguage }]);

      setLastAction({ key: "action.renameTranslationColumn" });
      return { ok: true };
    },
    [applyLanguagesTo, config.languagesTo, setLastAction, t]
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

        const delimiter = config.translationDelimiter;
        const shouldSplit = delimiter !== "" && value.includes(delimiter);
        if (!shouldSplit) {
          current[index] = value;
          return current;
        }

        const splitValues = parseTranslationValue(value, delimiter);
        current.splice(index, 1, ...(splitValues.length > 0 ? splitValues : [""]));
        return current;
      });
      setLastAction({ key: "action.editTranslation" });
    },
    [config.translationDelimiter, setLastAction, updateTranslationValues]
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
        resetToken: headerEditResetToken,
        onRename: renameTranslationColumn,
        onDelete: removeTranslationColumn
      },
      sortable: false,
      filter: "agTextColumnFilter",
      editable: false,
      autoHeight: true,
      cellStyle: { display: "grid", alignItems: "center" },
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
    headerEditResetToken,
    moveTranslationItem,
    removeTranslationColumn,
    removeTranslationItem,
    renameTranslationColumn,
    t,
    updateTranslationItem
  ]);

  return { translationColumns, onColumnHeaderClicked };
}
