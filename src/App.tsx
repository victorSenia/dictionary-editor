import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  CellClassParams,
  CellKeyDownEvent,
  ColDef,
  FirstDataRenderedEvent,
  GetRowIdParams,
  GridSizeChangedEvent,
  ICellRendererParams,
  PaginationChangedEvent,
  ValueGetterParams,
  ValueSetterParams
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
  type DictionaryConfig,
  type DictionaryRow
} from "./models/dictionary";
import { exportFile, parseFile } from "./io/dictionaryFormat";
import { validateCell } from "./grid/validation";
import { useAutosave } from "./hooks/useAutosave";
import { useGridClipboard } from "./hooks/useGridClipboard";
import { useRowSelectionDrag } from "./hooks/useRowSelectionDrag";
import { useTranslationColumns } from "./hooks/useTranslationColumns";
import type { GridRow } from "./types/grid";
import { mapWordRowLanguages, withIds, withoutIds } from "./utils/dictionaryHelpers";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const PAGE_SIZES = [20, 50, 100, 500] as const;
const AUTOSAVE_DEBOUNCE_MS = 600;
const AUTOSAVE_ENABLED = false;

type AutosavePayload = {
  config: DictionaryConfig;
  rows: DictionaryRow[];
  filePath: string | null;
};

function isCellInvalid(params: CellClassParams<GridRow>, config: DictionaryConfig): boolean {
  if (!params.data) {
    return false;
  }

  const result = validateCell(
    params as unknown as CellClassParams<DictionaryRow | (DictionaryRow & { id: string })>,
    config,
    params.data
  );
  return !result.isValid;
}

function parseAutosavePayload(content: string): AutosavePayload | null {
  try {
    const parsed = JSON.parse(content) as Partial<AutosavePayload>;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    if (!parsed.config || !Array.isArray(parsed.rows)) {
      return null;
    }
    return {
      config: parsed.config as DictionaryConfig,
      rows: parsed.rows as DictionaryRow[],
      filePath: typeof parsed.filePath === "string" ? parsed.filePath : null
    };
  } catch {
    return null;
  }
}

function App() {
  const gridRef = useRef<AgGridReact<GridRow>>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string>("None");
  const [pageSize, setPageSize] = useState<number>(50);
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const [config, setConfig] = useState<DictionaryConfig>(DEFAULT_CONFIG);
  const [rows, setRows] = useState<GridRow[]>([]);

  const applyLanguagesTo = useCallback((languagesTo: string[]) => {
    setConfig((prev) => ({ ...prev, languagesTo }));
    setRows((prev) =>
      prev.map((row) => {
        if (row.type !== "word") {
          return row;
        }
        return { ...row, valuesTo: mapWordRowLanguages(row, languagesTo) };
      })
    );
  }, []);

  const handleToggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  
  const handlePaginationChanged = useCallback((event: PaginationChangedEvent<GridRow>) => {
    const gridPageSize = event.api.paginationGetPageSize();
    if (gridPageSize !== pageSize) {
      setPageSize(gridPageSize);
    }
  }, [pageSize]);

  const getAnchorRowId = useCallback((): string | null => {
    const selectedId = gridRef.current?.api.getSelectedNodes()[0]?.data?.id;
    if (selectedId) {
      return selectedId;
    }

    const focused = gridRef.current?.api.getFocusedCell();
    if (!focused) {
      return null;
    }

    const focusedNode = gridRef.current?.api.getDisplayedRowAtIndex(focused.rowIndex);
    return focusedNode?.data?.id ?? null;
  }, []);

  const handleAddRow = useCallback(() => {
    const id = `word-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const anchorRowId = getAnchorRowId();
    setRows((prev) => {
      const nextRow: GridRow = { ...createEmptyWordRow(config), id };
      if (!anchorRowId) {
        return [...prev, nextRow];
      }

      const index = prev.findIndex((row) => row.id === anchorRowId);
      if (index < 0) {
        return [...prev, nextRow];
      }

      const next = [...prev];
      next.splice(index + 1, 0, nextRow);
      return next;
    });
    setLastAction("Add Row");
  }, [config, getAnchorRowId]);

  const handleAddTopic = useCallback(() => {
    const id = `topic-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const anchorRowId = getAnchorRowId();
    setRows((prev) => {
      const nextRow: GridRow = { ...createTopicRow("New Topic"), id };
      if (!anchorRowId) {
        return [...prev, nextRow];
      }

      const index = prev.findIndex((row) => row.id === anchorRowId);
      if (index < 0) {
        return [...prev, nextRow];
      }

      const next = [...prev];
      next.splice(index + 1, 0, nextRow);
      return next;
    });
    setLastAction("Add Topic");
  }, [getAnchorRowId]);

  const handleInsertRowAfter = useCallback(
    (rowId: string) => {
      const id = `word-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setRows((prev) => {
        const index = prev.findIndex((row) => row.id === rowId);
        if (index < 0) {
          return [...prev, { ...createEmptyWordRow(config), id }];
        }

        const next = [...prev];
        next.splice(index + 1, 0, { ...createEmptyWordRow(config), id });
        return next;
      });
      setLastAction("Add Row");
    },
    [config]
  );

  const handleDeleteSelected = useCallback(() => {
    const selectedIds = new Set(
      gridRef.current?.api
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id): id is string => typeof id === "string")
    );

    if (selectedIds.size > 0) {
      setRows((prev) => prev.filter((row) => !selectedIds.has(row.id)));
    }

    setLastAction("Remove Selected Rows");
  }, []);

  const handleOpenImport = useCallback(
    async (actionLabel: "Open" | "Import") => {
      const opened = await window.electronAPI.openFile();
      if (!opened) {
        return;
      }

      const parsed = parseFile(opened.content, config);
      let nextConfig = parsed.config;
      let nextRows = parsed.rows;

      if (AUTOSAVE_ENABLED) {
        const fileAutosave = await window.electronAPI.readAutosave(opened.path);
        if (fileAutosave?.content) {
          const payload = parseAutosavePayload(fileAutosave.content);
          if (payload) {
            nextConfig = payload.config;
            nextRows = payload.rows;
          }
        }
      }

      setConfig(nextConfig);
      setRows(withIds(nextRows));
      setCurrentFilePath(opened.path);
      setLastAction(actionLabel);
    },
    [config]
  );

  const handleOpen = useCallback(async () => {
    await handleOpenImport("Open");
  }, [handleOpenImport]);

  const handleImport = useCallback(async () => {
    await handleOpenImport("Import");
  }, [handleOpenImport]);

  const handleSaveAs = useCallback(async () => {
    const content = exportFile(config, withoutIds(rows));
    const saved = await window.electronAPI.saveFileAs(content);
    if (saved) {
      setCurrentFilePath(saved.path);
      setLastAction("Save As");
    }
  }, [config, rows]);

  const handleSave = useCallback(async () => {
    const content = exportFile(config, withoutIds(rows));
    if (currentFilePath) {
      await window.electronAPI.saveFile(currentFilePath, content);
      setLastAction("Save");
      return;
    }
    const saved = await window.electronAPI.saveFileAs(content);
    if (saved) {
      setCurrentFilePath(saved.path);
      setLastAction("Save");
    }
  }, [config, currentFilePath, rows]);

  const handleExport = useCallback(async () => {
    const content = exportFile(config, withoutIds(rows));
    const saved = await window.electronAPI.saveFileAs(content);
    if (saved) {
      setLastAction("Export");
    }
  }, [config, rows]);

  const getRowId = useCallback((params: GetRowIdParams<GridRow>) => params.data?.id ?? "", []);

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
          aria-label="Remove row"
          onClick={(event) => {
            event.stopPropagation();
            setRows((prev) => prev.filter((row) => row.id !== rowId));
            setLastAction("Remove Row");
          }}
        >
          {"\u00D7"}
        </button>
      );
    },
    []
  );

  const { translationColumns, onColumnHeaderClicked: handleColumnHeaderClicked } = useTranslationColumns({
    config,
    setConfig,
    setRows,
    setLastAction
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
  const columnDefs = useMemo<ColDef<GridRow>[]>(() => {
    const baseCols: ColDef<GridRow>[] = [
      {
        headerName: "",
        colId: "drag",
        width: 56,
        maxWidth: 56,
        minWidth: 56,
        rowDrag: true,
        sortable: false,
        filter: false,
        suppressMovable: true,
        editable: false
      },
      {
        headerName: "Article",
        colId: "article",
        width: 90,
        minWidth: 72,
        maxWidth: 120,
        colSpan: (params) => {
          if (!params.data || params.data.type !== "topic") {
            return 1;
          }
          const displayed = params.api.getAllDisplayedColumns();
          const currentIndex = displayed.findIndex(
            (column) => column.getColId() === params.column.getColId()
          );
          if (currentIndex < 0) {
            return 1;
          }
          // Keep the last action column visible for topic rows.
          return Math.max(1, displayed.length - currentIndex - 1);
        },
        editable: (params) => params.data?.type === "word" || params.data?.type === "topic",
        valueGetter: (params: ValueGetterParams<GridRow>) => {
          if (!params.data) {
            return "";
          }
          if (params.data.type === "topic") {
            return params.data.label;
          }
          return params.data.article;
        },
        valueSetter: (params: ValueSetterParams<GridRow>) => {
          if (!params.data) {
            return false;
          }
          if (params.data.type === "topic") {
            params.data.label = String(params.newValue ?? "");
            return true;
          }
          if (params.data.type !== "word") {
            return false;
          }
          params.data.article = String(params.newValue ?? "");
          return true;
        }
      },
      {
        headerName: "Word",
        colId: "word",
        editable: (params) => params.data?.type === "word",
        valueGetter: (params: ValueGetterParams<GridRow>) => {
          if (!params.data) {
            return "";
          }
          return params.data.type === "topic" ? "" : params.data.valueFrom;
        },
        valueSetter: (params: ValueSetterParams<GridRow>) => {
          if (!params.data || params.data.type !== "word") {
            return false;
          }
          params.data.valueFrom = String(params.newValue ?? "");
          return true;
        }
      },
      {
        headerName: "Additional Info",
        colId: "additional-info",
        editable: (params) => params.data?.type === "word",
        valueGetter: (params: ValueGetterParams<GridRow>) => {
          if (!params.data || params.data.type !== "word") {
            return "";
          }
          return params.data.additionalInformation;
        },
        valueSetter: (params: ValueSetterParams<GridRow>) => {
          if (!params.data || params.data.type !== "word") {
            return false;
          }
          params.data.additionalInformation = String(params.newValue ?? "");
          return true;
        }
      }
    ];

    return [
      ...baseCols,
      ...translationColumns,
      {
        headerName: "+",
        colId: "add-col-end",
        width: 58,
        minWidth: 58,
        maxWidth: 58,
        editable: false,
        sortable: false,
        filter: false,
        suppressMovable: true,
        cellRenderer: renderInsertRowCell,
        headerClass: "add-col-header",
        cellClass: "add-col-cell"
      }
    ];
  }, [renderInsertRowCell, translationColumns]);

  const defaultColDef = useMemo<ColDef<GridRow>>(
    () => ({
      editable: true,
      resizable: true,
      sortable: false,
      filter: false,
      cellClassRules: {
        "invalid-cell": (params) => isCellInvalid(params, config)
      }
    }),
    [config]
  );

  const fitColumnsToWidth = useCallback(() => {
    gridRef.current?.api.sizeColumnsToFit();
  }, []);

  const handleGridSizeChanged = useCallback((_event: GridSizeChangedEvent<GridRow>) => {
    fitColumnsToWidth();
  }, [fitColumnsToWidth]);

  const handleFirstDataRendered = useCallback((_event: FirstDataRenderedEvent<GridRow>) => {
    fitColumnsToWidth();
  }, [fitColumnsToWidth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fitColumnsToWidth();
    }, 0);
    return () => clearTimeout(timer);
  }, [fitColumnsToWidth, isSettingsOpen, config.languagesTo.length]);

  return (
    <div className="app-shell">
      <Toolbar
        isSettingsOpen={isSettingsOpen}
        onOpen={handleOpen}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onExport={handleExport}
        onImport={handleImport}
        onToggleSettings={handleToggleSettings}
        onDeleteSelected={handleDeleteSelected}
      />

      <div className={`content ${isSettingsOpen ? "settings-open" : ""}`}>
        <main className="grid-area" aria-label="Grid container">
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
              paginationPageSizeSelector={PAGE_SIZES as unknown as number[]}
              rowSelection={{
                mode: "multiRow",
                enableSelectionWithoutKeys: true,
                checkboxes: true,
                headerCheckbox: true
              }}
              selectionColumnDef={{
                width: 44,
                minWidth: 44,
                maxWidth: 44,
                resizable: false,
                suppressSizeToFit: true
              }}
              suppressClipboardPaste={false}
              rowClassRules={{
                "topic-row": (params) => params.data?.type === "topic"
              }}
              onCellMouseDown={handleCellMouseDown}
              onCellMouseOver={handleCellMouseOver}
              onColumnHeaderClicked={handleColumnHeaderClicked}
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
            Last action: {lastAction}
            {currentFilePath ? ` | File: ${currentFilePath}` : ""}
          </p>
        </main>

        <SettingsPanel
          isOpen={isSettingsOpen}
          config={config}
          setConfig={setConfig}
          applyLanguagesTo={applyLanguagesTo}
        />
      </div>
    </div>
  );
}

export default App;



