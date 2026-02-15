import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import type {
  GetRowIdParams
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import RowEndActions from "./components/RowEndActions";
import SettingsPanel from "./components/SettingsPanel";
import Toolbar from "./components/Toolbar";
import { hasElectronApi } from "./io/fileAccess";
import { useAutosave } from "./hooks/useAutosave";
import { useGridClipboard } from "./hooks/useGridClipboard";
import { useGridLayout } from "./hooks/useGridLayout";
import { useGridColumns } from "./hooks/useGridColumns";
import { useRowActions } from "./hooks/useRowActions";
import { useGridSelectionAndRowDrag } from "./hooks/useGridSelectionAndRowDrag";
import { useTranslationColumns } from "./hooks/useTranslationColumns";
import { useEditorHistory } from "./hooks/useEditorHistory";
import { useAppTitle, useAppUiState, useStatusText } from "./hooks/useAppUiState";
import { useDocumentWorkflow } from "./hooks/useDocumentWorkflow";
import { useEditorDocumentState } from "./hooks/useEditorDocumentState";
import { useGridViewModel } from "./hooks/useGridViewModel";
import type { LastActionState } from "./types/lastAction";
import type { GridRow } from "./types/grid";
import {
  DEFAULT_PAGE_SIZE
} from "./constants/grid";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const AUTOSAVE_DEBOUNCE_MS = 600;
const AUTOSAVE_ENABLED = false;

function App() {
  const { t, i18n } = useTranslation();
  const gridRef = useRef<AgGridReact<GridRow>>(null);
  const [lastAction, setLastAction] = useState<LastActionState>(null);
  const isElectronMode = hasElectronApi();
  const {
    isSettingsOpen,
    showOnlyInvalid,
    pageSize,
    setShowOnlyInvalid,
    handleToggleSettings,
    handleToggleShowOnlyInvalid,
    handleLanguageChange,
    handlePaginationChanged
  } = useAppUiState({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    changeLanguage: i18n.changeLanguage.bind(i18n)
  });
  const {
    showArticleColumn,
    setShowArticleColumn,
    config,
    setConfig,
    rows,
    setRows,
    applyLanguagesTo,
    displayedRows
  } = useEditorDocumentState({ showOnlyInvalid });
  const {
    canCancel,
    canReapply,
    cancel: handleCancel,
    reapply: handleReapply,
    markResetOnNextChange
  } = useEditorHistory({
    rows,
    config,
    showArticleColumn,
    setRows,
    setConfig,
    setShowArticleColumn,
    onCancelApplied: () => setLastAction({ key: "action.cancel" }),
    onReapplyApplied: () => setLastAction({ key: "action.reapply" })
  });

  const { handleAddRow, handleAddTopic } = useRowActions({
    gridRef,
    config,
    topicLabel: t("topic.new"),
    setRows,
    setLastAction
  });

  const {
    currentFilePath,
    setCurrentFilePath,
    headerEditResetToken,
    handleOpen,
    handleSaveAs,
    handleSave
  } = useDocumentWorkflow({
    gridRef,
    autosaveEnabled: AUTOSAVE_ENABLED,
    config,
    rows,
    setConfig,
    setRows,
    setShowArticleColumn,
    setShowOnlyInvalid,
    setLastAction,
    markResetOnNextChange
  });

  const getRowId = useCallback((params: GetRowIdParams<GridRow>) => params.data?.id ?? "", []);

  const { translationColumns, onColumnHeaderClicked: handleColumnHeaderClicked } = useTranslationColumns({
    config,
    rows,
    headerEditResetToken,
    applyLanguagesTo,
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
    onRowDragEnd: handleRowDragEnd,
    selectedCellKeys,
    isCellSelected,
    clearCellSelection,
    hasSelectedCells,
    deleteRowsWithSelectedCells: handleDeleteRowsWithSelectedCells
  } = useGridSelectionAndRowDrag({
    gridRef,
    setRows,
    setLastAction
  });
  const { onCellKeyDown: handleCellKeyDown } = useGridClipboard({
    gridRef,
    config,
    rows,
    selectedCellKeys,
    clearSelectedCells: clearCellSelection,
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
  const { handleGridSizeChanged, handleFirstDataRendered } = useGridLayout({
    gridRef,
    isSettingsOpen,
    languageColumnsCount: config.languagesTo.length
  });
  const gridProps = useGridViewModel({
    gridRef,
    rowData: displayedRows,
    getRowId,
    columnDefs,
    pageSize,
    onCellMouseDown: handleCellMouseDown,
    onCellMouseOver: handleCellMouseOver,
    onColumnHeaderClicked: handleColumnHeaderClicked,
    onCellKeyDown: handleCellKeyDown,
    onGridSizeChanged: handleGridSizeChanged,
    onFirstDataRendered: handleFirstDataRendered,
    onPaginationChanged: handlePaginationChanged,
    onRowDragMove: handleRowDragMove,
    onRowDragEnd: handleRowDragEnd,
    config,
    isCellSelected,
    setConfig,
    setLastAction,
    t
  });
  useAppTitle({ title: t("app.title") });
  const statusText = useStatusText({ t, lastAction, currentFilePath });

  return (
    <div className="app-shell">
      <Toolbar
        isSettingsOpen={isSettingsOpen}
        showOnlyInvalid={showOnlyInvalid}
        language={i18n.resolvedLanguage ?? i18n.language ?? "en"}
        showSaveAs={isElectronMode}
        canCancel={canCancel}
        canReapply={canReapply}
        deleteSelectedDisabled={!hasSelectedCells}
        onLanguageChange={handleLanguageChange}
        onOpen={handleOpen}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onCancel={handleCancel}
        onReapply={handleReapply}
        onToggleSettings={handleToggleSettings}
        onToggleShowOnlyInvalid={handleToggleShowOnlyInvalid}
        onDeleteSelected={handleDeleteRowsWithSelectedCells}
      />

      <div className={`content ${isSettingsOpen ? "settings-open" : ""}`}>
        <main className="grid-area" aria-label={t("grid.containerAria")}>
          <div className="ag-theme-alpine grid-host">
            <AgGridReact<GridRow> {...gridProps} />
          </div>
          <RowEndActions onAddRow={handleAddRow} onAddTopic={handleAddTopic} />
          <p className="status">{statusText}</p>
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
