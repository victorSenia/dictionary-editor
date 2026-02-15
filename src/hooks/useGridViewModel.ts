import { useCallback, useMemo, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { AgGridReact, AgGridReactProps } from "ag-grid-react";
import type {
  CellClassParams,
  ColDef,
  ColumnMovedEvent,
  GetLocaleTextParams
} from "ag-grid-community";
import { ROW_TYPE_TOPIC, type DictionaryConfig, type DictionaryRow } from "../models/dictionary";
import { PAGE_SIZE_OPTIONS, TRANSLATION_COLUMN_PREFIX } from "../constants/grid";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { validateCell } from "../grid/validation";

type Args = {
  gridRef: RefObject<AgGridReact<GridRow>>;
  rowData: GridRow[];
  getRowId: NonNullable<AgGridReactProps<GridRow>["getRowId"]>;
  columnDefs: NonNullable<AgGridReactProps<GridRow>["columnDefs"]>;
  pageSize: number;
  onCellMouseDown: NonNullable<AgGridReactProps<GridRow>["onCellMouseDown"]>;
  onCellMouseOver: NonNullable<AgGridReactProps<GridRow>["onCellMouseOver"]>;
  onColumnHeaderClicked: NonNullable<AgGridReactProps<GridRow>["onColumnHeaderClicked"]>;
  onCellKeyDown: NonNullable<AgGridReactProps<GridRow>["onCellKeyDown"]>;
  onGridSizeChanged: NonNullable<AgGridReactProps<GridRow>["onGridSizeChanged"]>;
  onFirstDataRendered: NonNullable<AgGridReactProps<GridRow>["onFirstDataRendered"]>;
  onPaginationChanged: NonNullable<AgGridReactProps<GridRow>["onPaginationChanged"]>;
  onRowDragMove: NonNullable<AgGridReactProps<GridRow>["onRowDragMove"]>;
  onRowDragEnd: NonNullable<AgGridReactProps<GridRow>["onRowDragEnd"]>;
  config: DictionaryConfig;
  isCellSelected: (rowId: string | undefined, colId: string | undefined) => boolean;
  setConfig: Dispatch<SetStateAction<DictionaryConfig>>;
  setLastAction: Dispatch<SetStateAction<LastActionState>>;
  t: (key: string, values?: Record<string, unknown>) => string;
};

function getCellValidation(params: CellClassParams<GridRow>, config: DictionaryConfig) {
  if (!params.data) {
    return { isValid: true, reasonKey: "" };
  }

  return validateCell(
    params as unknown as CellClassParams<DictionaryRow | (DictionaryRow & { id: string })>,
    config,
    params.data
  );
}

export function useGridViewModel({
  gridRef,
  rowData,
  getRowId,
  columnDefs,
  pageSize,
  onCellMouseDown,
  onCellMouseOver,
  onColumnHeaderClicked,
  onCellKeyDown,
  onGridSizeChanged,
  onFirstDataRendered,
  onPaginationChanged,
  onRowDragMove,
  onRowDragEnd,
  config,
  isCellSelected,
  setConfig,
  setLastAction,
  t
}: Args): AgGridReactProps<GridRow> {
  const defaultColDef = useMemo<ColDef<GridRow>>(
    () => ({
      editable: true,
      resizable: true,
      sortable: false,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      suppressFloatingFilterButton: true,
      suppressHeaderMenuButton: true,
      suppressHeaderFilterButton: true,
      filterParams: {
        filterOptions: ["contains"],
        defaultOption: "contains",
        maxNumConditions: 1,
        numAlwaysVisibleConditions: 1
      },
      tooltipValueGetter: (params) => {
        const result = getCellValidation(params as CellClassParams<GridRow>, config);
        if (result.isValid || !result.reasonKey) {
          return "";
        }
        return t(result.reasonKey, result.reasonValues);
      },
      cellClassRules: {
        "invalid-cell": (params) => !getCellValidation(params, config).isValid,
        "custom-cell-selected": (params) => isCellSelected(params.data?.id, params.column.getColId())
      }
    }),
    [config, isCellSelected, t]
  );

  const onColumnMoved = useCallback(
    (event: ColumnMovedEvent<GridRow>) => {
      if (!event.finished) {
        return;
      }

      const orderedTranslationColumns = event.api
        .getAllDisplayedColumns()
        .map((column) => column.getColId())
        .filter((colId) => colId.startsWith(TRANSLATION_COLUMN_PREFIX))
        .map((colId) => colId.slice(TRANSLATION_COLUMN_PREFIX.length));

      if (orderedTranslationColumns.length !== config.languagesTo.length) {
        return;
      }

      const isSameOrder = orderedTranslationColumns.every(
        (language, index) => language === config.languagesTo[index]
      );
      if (isSameOrder) {
        return;
      }

      setConfig((prev) => ({ ...prev, languagesTo: orderedTranslationColumns }));
      setLastAction({ key: "action.reorderTranslationColumns" });
    },
    [config.languagesTo, setConfig, setLastAction]
  );

  const getLocaleText = useCallback(
    (params: GetLocaleTextParams) => {
      const translated = t(`agGrid.${params.key}`);
      return translated === `agGrid.${params.key}` ? params.defaultValue : translated;
    },
    [t]
  );

  return useMemo(
    () => ({
      ref: gridRef,
      rowData,
      getRowId,
      columnDefs,
      defaultColDef,
      animateRows: true,
      rowDragManaged: false,
      rowDragEntireRow: false,
      rowDragMultiRow: false,
      singleClickEdit: true,
      pagination: true,
      paginationPageSize: pageSize,
      paginationPageSizeSelector: PAGE_SIZE_OPTIONS as unknown as number[],
      rowSelection: {
        mode: "multiRow",
        enableSelectionWithoutKeys: false,
        checkboxes: false,
        headerCheckbox: false
      },
      enableBrowserTooltips: true,
      suppressClipboardPaste: true,
      rowClassRules: {
        "topic-row": (params) => params.data?.type === ROW_TYPE_TOPIC
      },
      onCellMouseDown,
      onCellMouseOver,
      getLocaleText,
      onColumnHeaderClicked,
      onColumnMoved,
      onCellKeyDown,
      onGridSizeChanged,
      onFirstDataRendered,
      onPaginationChanged,
      onRowDragMove,
      onRowDragEnd
    }),
    [
      columnDefs,
      defaultColDef,
      getLocaleText,
      getRowId,
      gridRef,
      onCellKeyDown,
      onCellMouseDown,
      onCellMouseOver,
      onColumnHeaderClicked,
      onColumnMoved,
      onFirstDataRendered,
      onGridSizeChanged,
      onPaginationChanged,
      onRowDragEnd,
      onRowDragMove,
      pageSize,
      rowData
    ]
  );
}
