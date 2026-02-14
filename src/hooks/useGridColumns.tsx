import {
  useCallback,
  useMemo,
  type ChangeEvent,
  type Dispatch,
  type MouseEvent,
  type SetStateAction
} from "react";
import type { ColDef, ICellRendererParams, ValueGetterParams } from "ag-grid-community";
import { ROW_TYPE_TOPIC, ROW_TYPE_WORD } from "../models/dictionary";
import type { LastActionState } from "../types/lastAction";
import type { GridRow } from "../types/grid";
import {
  ARTICLE_COLUMN_MAX_WIDTH,
  ARTICLE_COLUMN_MIN_WIDTH,
  ARTICLE_COLUMN_WIDTH,
  COLUMN_ID_ADD_END,
  COLUMN_ID_ADDITIONAL_INFO,
  COLUMN_ID_ARTICLE,
  COLUMN_ID_WORD,
  COLUMN_ID_DRAG,
  DRAG_COLUMN_WIDTH,
  END_ACTION_COLUMN_WIDTH
} from "../constants/grid";

type Args = {
  showArticleColumn: boolean;
  translationColumns: ColDef<GridRow>[];
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
  t: (key: string, values?: Record<string, unknown>) => string;
};

export function useGridColumns({
  showArticleColumn,
  translationColumns,
  setRows,
  setLastAction,
  t
}: Args) {
  const updateRowById = useCallback(
    (rowId: string, transform: (row: GridRow) => GridRow) => {
      setRows((prev) => prev.map((row) => (row.id === rowId ? transform(row) : row)));
    },
    [setRows]
  );

  const createInlineEditorHandlers = useCallback(
    (onValueChange: (nextValue: string) => void) => ({
      onClick: (event: MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.stopPropagation();
      },
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onValueChange(event.target.value);
      }
    }),
    []
  );

  const renderInsertRowCell = useCallback(
    (params: ICellRendererParams<GridRow>) => {
      if (!params.data) {
        return null;
      }
      const rowId = params.data.id;

      return (
        <button
          type="button"
          className="insert-row-button danger-button"
          aria-label={t("translation.removeRow")}
          onClick={(event) => {
            event.stopPropagation();
            setRows((prev) => prev.filter((row) => row.id !== rowId));
            setLastAction({ key: "action.removeRow" });
          }}
        >
          {"\u00D7"}
        </button>
      );
    },
    [setLastAction, setRows, t]
  );

  const renderTopicLabelEditor = useCallback(
    (rowId: string, value: string) => {
      return (
        <input
          type="text"
          className="inline-topic-input"
          value={value}
          {...createInlineEditorHandlers((nextValue) => {
            updateRowById(rowId, (row) =>
              row.type === ROW_TYPE_TOPIC ? { ...row, label: nextValue } : row
            );
          })}
        />
      );
    },
    [createInlineEditorHandlers, updateRowById]
  );

  const renderArticleCell = useCallback(
    (params: ICellRendererParams<GridRow>) => {
      if (!params.data) {
        return null;
      }

      const rowId = params.data.id;
      if (params.data.type === ROW_TYPE_TOPIC) {
        return renderTopicLabelEditor(rowId, params.data.label);
      }

      const value = params.data.article;

      return (
        <input
          type="text"
          className="inline-cell-input"
          value={value}
          {...createInlineEditorHandlers((nextValue) => {
            updateRowById(rowId, (row) => {
              if (row.type === ROW_TYPE_TOPIC) {
                return { ...row, label: nextValue };
              }
              if (row.type !== ROW_TYPE_WORD) {
                return row;
              }
              return { ...row, article: nextValue };
            });
          })}
        />
      );
    },
    [createInlineEditorHandlers, renderTopicLabelEditor, updateRowById]
  );

  const renderWordCell = useCallback(
    (params: ICellRendererParams<GridRow>) => {
      if (!params.data) {
        return "";
      }

      if (params.data.type === ROW_TYPE_TOPIC) {
        if (showArticleColumn) {
          return "";
        }
        const rowId = params.data.id;
        return renderTopicLabelEditor(rowId, params.data.label);
      }

      if (params.data.type !== ROW_TYPE_WORD) {
        return "";
      }

      const rowId = params.data.id;
      return (
        <textarea
          className="inline-cell-textarea"
          rows={1}
          value={params.data.valueFrom}
          {...createInlineEditorHandlers((nextValue) => {
            updateRowById(rowId, (row) =>
              row.type === ROW_TYPE_WORD ? { ...row, valueFrom: nextValue } : row
            );
          })}
        />
      );
    },
    [createInlineEditorHandlers, renderTopicLabelEditor, showArticleColumn, updateRowById]
  );

  const renderAdditionalInfoCell = useCallback(
    (params: ICellRendererParams<GridRow>) => {
      if (!params.data || params.data.type !== ROW_TYPE_WORD) {
        return "";
      }

      const rowId = params.data.id;
      return (
        <textarea
          className="inline-cell-textarea"
          rows={1}
          value={params.data.additionalInformation}
          {...createInlineEditorHandlers((nextValue) => {
            updateRowById(rowId, (row) =>
              row.type === ROW_TYPE_WORD ? { ...row, additionalInformation: nextValue } : row
            );
          })}
        />
      );
    },
    [createInlineEditorHandlers, updateRowById]
  );

  const columnDefs = useMemo<ColDef<GridRow>[]>(() => {
    const articleColumn: ColDef<GridRow> = {
      headerName: t("grid.article"),
      colId: COLUMN_ID_ARTICLE,
      width: ARTICLE_COLUMN_WIDTH,
      minWidth: ARTICLE_COLUMN_MIN_WIDTH,
      maxWidth: ARTICLE_COLUMN_MAX_WIDTH,
      editable: false,
      cellRenderer: renderArticleCell,
      colSpan: (params) => {
        if (!params.data || params.data.type !== ROW_TYPE_TOPIC) {
          return 1;
        }
        const displayed = params.api.getAllDisplayedColumns();
        const currentIndex = displayed.findIndex(
          (column) => column.getColId() === params.column.getColId()
        );
        if (currentIndex < 0) {
          return 1;
        }
        return Math.max(1, displayed.length - currentIndex - 1);
      },
      valueGetter: (params: ValueGetterParams<GridRow>) => {
        if (!params.data) {
          return "";
        }
        if (params.data.type === ROW_TYPE_TOPIC) {
          return params.data.label;
        }
        return params.data.article;
      }
    };

    const baseCols: ColDef<GridRow>[] = [
      {
        headerName: "",
        colId: COLUMN_ID_DRAG,
        width: DRAG_COLUMN_WIDTH,
        maxWidth: DRAG_COLUMN_WIDTH,
        minWidth: DRAG_COLUMN_WIDTH,
        rowDrag: true,
        sortable: false,
        filter: false,
        suppressMovable: true,
        editable: false
      },
      {
        headerName: t("grid.word"),
        colId: COLUMN_ID_WORD,
        editable: false,
        cellRenderer: renderWordCell,
        colSpan: (params) => {
          if (showArticleColumn || !params.data || params.data.type !== ROW_TYPE_TOPIC) {
            return 1;
          }
          const displayed = params.api.getAllDisplayedColumns();
          const currentIndex = displayed.findIndex(
            (column) => column.getColId() === params.column.getColId()
          );
          if (currentIndex < 0) {
            return 1;
          }
          return Math.max(1, displayed.length - currentIndex - 1);
        },
        valueGetter: (params: ValueGetterParams<GridRow>) => {
          if (!params.data) {
            return "";
          }
          return params.data.type === ROW_TYPE_TOPIC
            ? showArticleColumn
              ? ""
              : params.data.label
            : params.data.valueFrom;
        }
      },
      {
        headerName: t("grid.additionalInfo"),
        colId: COLUMN_ID_ADDITIONAL_INFO,
        editable: false,
        cellRenderer: renderAdditionalInfoCell,
        valueGetter: (params: ValueGetterParams<GridRow>) => {
          if (!params.data || params.data.type !== ROW_TYPE_WORD) {
            return "";
          }
          return params.data.additionalInformation;
        }
      }
    ];

    if (showArticleColumn) {
      baseCols.splice(1, 0, articleColumn);
    }

    return [
      ...baseCols,
      ...translationColumns,
      {
        headerName: "+",
        colId: COLUMN_ID_ADD_END,
        width: END_ACTION_COLUMN_WIDTH,
        minWidth: END_ACTION_COLUMN_WIDTH,
        maxWidth: END_ACTION_COLUMN_WIDTH,
        editable: false,
        sortable: false,
        filter: false,
        suppressMovable: true,
        cellRenderer: renderInsertRowCell,
        headerClass: "add-col-header",
        cellClass: "add-col-cell"
      }
    ];
  }, [
    renderAdditionalInfoCell,
    renderArticleCell,
    renderInsertRowCell,
    renderWordCell,
    showArticleColumn,
    t,
    translationColumns
  ]);

  return { columnDefs };
}
