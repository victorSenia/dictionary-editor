import type { ColDef, ColSpanParams, ValueGetterParams } from "ag-grid-community";
import type { Dispatch, SetStateAction } from "react";
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
import { ROW_TYPE_TOPIC, ROW_TYPE_WORD } from "../models/dictionary";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { renderAdditionalInfoCell } from "./renderers/AdditionalInfoCellRenderer";
import { renderArticleCell } from "./renderers/ArticleCellRenderer";
import { renderDeleteRowCell } from "./renderers/DeleteRowCellRenderer";
import { renderWordCell } from "./renderers/WordCellRenderer";
import type { UpdateRowById } from "./renderers/types";

function spanTopicRowToEnd(params: ColSpanParams<GridRow>): number {
  if (!params.data || params.data.type !== ROW_TYPE_TOPIC) {
    return 1;
  }

  const displayed = params.api.getAllDisplayedColumns();
  const currentIndex = displayed.findIndex((column) => column.getColId() === params.column.getColId());
  if (currentIndex < 0) {
    return 1;
  }

  return Math.max(1, displayed.length - currentIndex - 1);
}

type BuildGridColumnDefsArgs = {
  showArticleColumn: boolean;
  showAdditionalInformationColumn: boolean;
  translationColumns: ColDef<GridRow>[];
  setRows: Dispatch<SetStateAction<GridRow[]>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
  updateRowById: UpdateRowById;
  t: (key: string, values?: Record<string, unknown>) => string;
};

export function buildGridColumnDefs({
  showArticleColumn,
  showAdditionalInformationColumn,
  translationColumns,
  setRows,
  setLastAction,
  updateRowById,
  t
}: BuildGridColumnDefsArgs): ColDef<GridRow>[] {
  const articleColumn: ColDef<GridRow> = {
    headerName: t("grid.article"),
    colId: COLUMN_ID_ARTICLE,
    width: ARTICLE_COLUMN_WIDTH,
    minWidth: ARTICLE_COLUMN_MIN_WIDTH,
    maxWidth: ARTICLE_COLUMN_MAX_WIDTH,
    editable: false,
    cellRenderer: (params) => renderArticleCell(params, updateRowById),
    colSpan: spanTopicRowToEnd,
    valueGetter: (params: ValueGetterParams<GridRow>) => {
      if (!params.data) {
        return "";
      }
      return params.data.type === ROW_TYPE_TOPIC ? params.data.label : params.data.article;
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
      flex: 1,
      editable: false,
      autoHeight: true,
      cellStyle: { display: "grid", alignItems: "center" },
      cellRenderer: (params) => renderWordCell(params, showArticleColumn, updateRowById),
      colSpan: (params) => (showArticleColumn ? 1 : spanTopicRowToEnd(params)),
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
    ...(showAdditionalInformationColumn
      ? [{
          headerName: t("grid.additionalInfo"),
          colId: COLUMN_ID_ADDITIONAL_INFO,
          editable: false,
          autoHeight: true,
          cellStyle: { display: "grid", alignItems: "center" },
          cellRenderer: (params) => renderAdditionalInfoCell(params, updateRowById),
          valueGetter: (params: ValueGetterParams<GridRow>) => {
            if (!params.data || params.data.type !== ROW_TYPE_WORD) {
              return "";
            }
            return params.data.additionalInformation;
          }
        }]
      : [])
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
      cellRenderer: (params) => renderDeleteRowCell(params, setRows, setLastAction, t("translation.removeRow")),
      headerClass: "add-col-header",
      cellClass: "add-col-cell"
    }
  ];
}
