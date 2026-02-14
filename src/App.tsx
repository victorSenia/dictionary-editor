import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import type {
  CellClassParams,
  ColDef,
  ColumnMovedEvent,
  GetLocaleTextParams,
  GetRowIdParams,
  PaginationChangedEvent
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import RowEndActions from "./components/RowEndActions";
import SettingsPanel from "./components/SettingsPanel";
import Toolbar from "./components/Toolbar";
import {
  createEmptyWordRow,
  createTopicRow,
  DEFAULT_CONFIG,
  ROW_TYPE_TOPIC,
  ROW_TYPE_WORD,
  type DictionaryConfig,
  type DictionaryRow
} from "./models/dictionary";
import {
  hasElectronApi,
} from "./io/fileAccess";
import { validateCell } from "./grid/validation";
import { useAutosave } from "./hooks/useAutosave";
import { useDocumentActions } from "./hooks/useDocumentActions";
import { useGridClipboard } from "./hooks/useGridClipboard";
import { useGridLayout } from "./hooks/useGridLayout";
import { useGridColumns } from "./hooks/useGridColumns";
import { useRowActions } from "./hooks/useRowActions";
import { useRowSelectionDrag } from "./hooks/useRowSelectionDrag";
import { useTranslationColumns } from "./hooks/useTranslationColumns";
import type { LastActionState } from "./types/lastAction";
import type { GridRow } from "./types/grid";
import { mapWordRowLanguages } from "./utils/dictionaryHelpers";
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  SELECTION_COLUMN_WIDTH,
  TRANSLATION_COLUMN_PREFIX
} from "./constants/grid";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const AUTOSAVE_DEBOUNCE_MS = 600;
const AUTOSAVE_ENABLED = false;

function isCellInvalid(params: CellClassParams<GridRow>, config: DictionaryConfig): boolean {
  return !getCellValidation(params, config).isValid;
}

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

function App() {
  const { t, i18n } = useTranslation();
  const gridRef = useRef<AgGridReact<GridRow>>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [showArticleColumn, setShowArticleColumn] = useState<boolean>(true);
  const [lastAction, setLastAction] = useState<LastActionState>(null);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const [config, setConfig] = useState<DictionaryConfig>(DEFAULT_CONFIG);
  const [rows, setRows] = useState<GridRow[]>([]);
  const isElectronMode = hasElectronApi();

  const applyLanguagesTo = useCallback((languagesTo: string[]) => {
    setConfig((prev) => ({ ...prev, languagesTo }));
    setRows((prev) =>
      prev.map((row) => {
        if (row.type !== ROW_TYPE_WORD) {
          return row;
        }
        return { ...row, valuesTo: mapWordRowLanguages(row, languagesTo) };
      })
    );
  }, []);

  const handleToggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  const handleLanguageChange = useCallback(
    (language: string) => {
      void i18n.changeLanguage(language);
    },
    [i18n]
  );

  
  const handlePaginationChanged = useCallback((event: PaginationChangedEvent<GridRow>) => {
    const gridPageSize = event.api.paginationGetPageSize();
    if (gridPageSize !== pageSize) {
      setPageSize(gridPageSize);
    }
  }, [pageSize]);

  const { handleAddRow, handleAddTopic, handleDeleteSelected } = useRowActions({
    gridRef,
    config,
    topicLabel: t("topic.new"),
    setRows,
    setLastAction
  });

  const { handleOpen, handleSaveAs, handleSave } = useDocumentActions({
    autosaveEnabled: AUTOSAVE_ENABLED,
    config,
    rows,
    currentFilePath,
    setConfig,
    setRows,
    setCurrentFilePath,
    setShowArticleColumn,
    setLastAction
  });

  const getRowId = useCallback((params: GetRowIdParams<GridRow>) => params.data?.id ?? "", []);

  const { translationColumns, onColumnHeaderClicked: handleColumnHeaderClicked } = useTranslationColumns({
    config,
    setConfig,
    setRows,
    setLastAction
  });
  const { columnDefs } = useGridColumns({
    showArticleColumn,
    translationColumns,
    setRows,
    setLastAction,
    t
  });
  const {
    onCellMouseDown: handleCellMouseDown,
    onCellMouseOver: handleCellMouseOver,
    onRowDragMove: handleRowDragMove,
    onRowDragEnd: handleRowDragEnd
  } = useRowSelectionDrag({
    gridRef,
    setRows
  });
  const { onCellKeyDown: handleCellKeyDown } = useGridClipboard({
    gridRef,
    config,
    setRows,
    setLastAction
  });
  useAutosave({
    enabled: AUTOSAVE_ENABLED,
    debounceMs: AUTOSAVE_DEBOUNCE_MS,
    config,
    rows,
    filePath: currentFilePath,
    setConfig,
    setRows,
    setFilePath: setCurrentFilePath,
    setLastAction
  });
  const defaultColDef = useMemo<ColDef<GridRow>>(
    () => ({
      editable: true,
      resizable: true,
      sortable: false,
      filter: false,
      tooltipValueGetter: (params) => {
        const result = getCellValidation(params as CellClassParams<GridRow>, config);
        if (result.isValid || !result.reasonKey) {
          return "";
        }
        return t(result.reasonKey, result.reasonValues);
      },
      cellClassRules: {
        "invalid-cell": (params) => isCellInvalid(params, config)
      }
    }),
    [config, t]
  );

  const { handleGridSizeChanged, handleFirstDataRendered } = useGridLayout({
    gridRef,
    isSettingsOpen,
    languageColumnsCount: config.languagesTo.length
  });

  const handleColumnMoved = useCallback(
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
    [config.languagesTo]
  );

  const getLocaleText = useCallback(
    (params: GetLocaleTextParams) => {
      const translated = t(`agGrid.${params.key}`);
      return translated === `agGrid.${params.key}` ? params.defaultValue : translated;
    },
    [t]
  );

  useEffect(() => {
    document.title = t("app.title");
  }, [t, i18n.language]);

  return (
    <div className="app-shell">
      <Toolbar
        isSettingsOpen={isSettingsOpen}
        language={i18n.resolvedLanguage ?? i18n.language ?? "en"}
        showSaveAs={isElectronMode}
        onLanguageChange={handleLanguageChange}
        onOpen={handleOpen}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onToggleSettings={handleToggleSettings}
        onDeleteSelected={handleDeleteSelected}
      />

      <div className={`content ${isSettingsOpen ? "settings-open" : ""}`}>
        <main className="grid-area" aria-label={t("grid.containerAria")}>
          <div className="ag-theme-alpine grid-host">
            <AgGridReact<GridRow>
              ref={gridRef}
              rowData={rows}
              getRowId={getRowId}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows
              rowDragManaged={false}
              rowDragEntireRow={false}
              rowDragMultiRow={false}
              singleClickEdit
              pagination
              paginationPageSize={pageSize}
              paginationPageSizeSelector={PAGE_SIZE_OPTIONS as unknown as number[]}
              rowSelection={{
                mode: "multiRow",
                enableSelectionWithoutKeys: true,
                checkboxes: true,
                headerCheckbox: true
              }}
              enableBrowserTooltips
              selectionColumnDef={{
                width: SELECTION_COLUMN_WIDTH,
                minWidth: SELECTION_COLUMN_WIDTH,
                maxWidth: SELECTION_COLUMN_WIDTH,
                resizable: false,
                suppressSizeToFit: true
              }}
              suppressClipboardPaste={false}
              rowClassRules={{
                "topic-row": (params) => params.data?.type === ROW_TYPE_TOPIC
              }}
              onCellMouseDown={handleCellMouseDown}
              onCellMouseOver={handleCellMouseOver}
              getLocaleText={getLocaleText}
              onColumnHeaderClicked={handleColumnHeaderClicked}
              onColumnMoved={handleColumnMoved}
              onCellKeyDown={handleCellKeyDown}
              onGridSizeChanged={handleGridSizeChanged}
              onFirstDataRendered={handleFirstDataRendered}
              onPaginationChanged={handlePaginationChanged}
              onRowDragMove={handleRowDragMove}
              onRowDragEnd={handleRowDragEnd}
            />
          </div>
          <RowEndActions onAddRow={handleAddRow} onAddTopic={handleAddTopic} />
          <p className="status">
            {t("status.lastAction", {
              action: lastAction ? t(lastAction.key, lastAction.values) : t("status.none")
            })}
            {currentFilePath ? ` | ${t("status.file", { path: currentFilePath })}` : ""}
          </p>
        </main>

        <SettingsPanel
          isOpen={isSettingsOpen}
          config={config}
          setConfig={setConfig}
          applyLanguagesTo={applyLanguagesTo}
          showArticleColumn={showArticleColumn}
          setShowArticleColumn={setShowArticleColumn}
        />
      </div>
    </div>
  );
}

export default App;



