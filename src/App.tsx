import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import RowEndActions from "./components/RowEndActions";
import { DEFAULT_PAGE_SIZE } from "./constants/grid";
import type { GridRow } from "./types/grid";
import { useEditorHistory } from "./hooks/useEditorHistory";
import { useAppTitle, useAppUiState, useStatusText } from "./hooks/useAppUiState";
import { useGridColumns } from "./hooks/useGridColumns";
import { useGridClipboard } from "./hooks/useGridClipboard";
import { useGridLayout } from "./hooks/useGridLayout";
import { useGridSelectionAndRowDrag } from "./hooks/useGridSelectionAndRowDrag";
import { useGridViewModel } from "./hooks/useGridViewModel";
import { useRowActions } from "./hooks/useRowActions";
import { useTranslationColumns } from "./hooks/useTranslationColumns";
import type { LastActionState } from "./types/lastAction";
import type {
  GetRowIdParams
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SettingsPanel from "./components/SettingsPanel";
import Toolbar from "./components/Toolbar";
import AiPanel from "./components/AiPanel";
import CourseHeader from "./components/CourseHeader";
import { hasElectronApi } from "./io/fileAccess";
import { useAutosave } from "./hooks/useAutosave";
import { useDocumentWorkflow } from "./hooks/useDocumentWorkflow";
import { useEditorDocumentState } from "./hooks/useEditorDocumentState";
import { useAiDraftHelper } from "./hooks/useAiDraftHelper";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const AUTOSAVE_DEBOUNCE_MS = 600;
const AUTOSAVE_ENABLED = false;
const RTL_LANGUAGES = new Set(["ar", "he", "ur", "fa"]);

function App() {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const baseLanguage = activeLanguage.toLowerCase().split("-")[0];
  const isRtl = RTL_LANGUAGES.has(baseLanguage);
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
    showAdditionalInformationColumn,
    setShowAdditionalInformationColumn,
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
    showAdditionalInformationColumn,
    setRows,
    setConfig,
    setShowArticleColumn,
    setShowAdditionalInformationColumn,
    onCancelApplied: () => setLastAction({ key: "action.cancel" }),
    onReapplyApplied: () => setLastAction({ key: "action.reapply" })
  });

  const { handleAddRow, handleAddTopic } = useRowActions({
    gridRef,
    config,
    setRows,
    setLastAction
  });

  const {
    currentFilePath,
    setCurrentFilePath,
    headerEditResetToken,
    handleNew,
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
    setShowAdditionalInformationColumn,
    setShowOnlyInvalid,
    setLastAction,
    markResetOnNextChange
  });

  const getRowId = useCallback((params: GetRowIdParams<GridRow>) => params.data?.rowId ?? "", []);

  const { translationColumns, onColumnHeaderClicked: handleColumnHeaderClicked } = useTranslationColumns({
    config,
    headerEditResetToken,
    applyLanguagesTo,
    setRows,
    setLastAction
  });
  const { columnDefs } = useGridColumns({
    showArticleColumn,
    showAdditionalInformationColumn,
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
    rows,
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

  const {
    isAiPanelOpen,
    aiResponse,
    aiParseMessage,
    lastAppliedAiSignature,
    aiRequestModeChoice,
    aiRequestContext,
    setAiRequestModeChoice,
    setAiParseMessage,
    handleAiResponseChange,
    handleAddAiRows,
    handleRegexRowsParsed,
    handleAiRequestGenerated,
    toggleAiPanel
  } = useAiDraftHelper({
    config,
    rows,
    selectedCellKeys,
    setRows,
    setLastAction,
    t
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
  const { handleGridSizeChanged, handleFirstDataRendered, handleDisplayedColumnsChanged } = useGridLayout({
    gridRef,
    isSettingsOpen,
    isAiPanelOpen,
    languageColumnsCount: config.languagesTo.length,
    showArticleColumn,
    showAdditionalInformationColumn
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
    onDisplayedColumnsChanged: handleDisplayedColumnsChanged,
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
  useEffect(() => {
    document.documentElement.lang = activeLanguage;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [activeLanguage, isRtl]);

  return (
    <div className={`app-shell ${isRtl ? "rtl" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
      <Toolbar
        isSettingsOpen={isSettingsOpen}
        showOnlyInvalid={showOnlyInvalid}
        isAiPanelOpen={isAiPanelOpen}
        language={activeLanguage}
        showSaveAs={isElectronMode}
        canCancel={canCancel}
        canReapply={canReapply}
        deleteSelectedDisabled={!hasSelectedCells}
        onLanguageChange={handleLanguageChange}
        onNew={handleNew}
        onOpen={handleOpen}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onCancel={handleCancel}
        onReapply={handleReapply}
        onToggleSettings={handleToggleSettings}
        onToggleAiPanel={toggleAiPanel}
        onToggleShowOnlyInvalid={handleToggleShowOnlyInvalid}
        onDeleteSelected={handleDeleteRowsWithSelectedCells}
      />
      <CourseHeader config={config} setConfig={setConfig} />

      <div
        className={`content ${isSettingsOpen ? "settings-open" : ""} ${
          isAiPanelOpen ? "ai-open" : ""
        }`}
      >
        <main className="grid-area" aria-label={t("grid.containerAria")}>
          <div className="ag-theme-alpine grid-host">
            <AgGridReact<GridRow> {...gridProps} enableRtl={isRtl} />
          </div>
          <RowEndActions
            addRowLabel={t("actions.addRow")}
            addTopicLabel={t("actions.addTopic")}
            onAddRow={handleAddRow}
            onAddTopic={handleAddTopic}
          />
          <p className="status">{statusText}</p>
        </main>

        {isAiPanelOpen ? (
          <main className="ai-workspace">
            <AiPanel
              config={config}
              requestContext={aiRequestContext}
              requestModeChoice={aiRequestModeChoice}
              onRequestModeChoiceChange={setAiRequestModeChoice}
              response={aiResponse}
              parseMessage={aiParseMessage}
              onResponseChange={handleAiResponseChange}
              onParseMessageChange={setAiParseMessage}
              onParsingConfigurationChange={() => undefined}
              lastAppliedAiSignature={lastAppliedAiSignature}
              onAddRows={handleAddAiRows}
              onResponseParsed={handleRegexRowsParsed}
              onRequestGenerated={handleAiRequestGenerated}
            />
          </main>
        ) : null}

        <SettingsPanel
          isOpen={isSettingsOpen}
          config={config}
          setConfig={setConfig}
          applyLanguagesTo={applyLanguagesTo}
          showArticleColumn={showArticleColumn}
          setShowArticleColumn={setShowArticleColumn}
          showAdditionalInformationColumn={showAdditionalInformationColumn}
          setShowAdditionalInformationColumn={setShowAdditionalInformationColumn}
        />
      </div>
    </div>
  );
}

export default App;
