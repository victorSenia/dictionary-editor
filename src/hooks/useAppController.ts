import { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useTranslation } from "react-i18next";
import type { GetRowIdParams } from "ag-grid-community";
import { DEFAULT_PAGE_SIZE } from "../constants/grid";
import { hasElectronApi } from "../io/fileAccess";
import type { GridRow } from "../types/grid";
import type { LastActionState } from "../types/lastAction";
import { useAiDraftHelper } from "./useAiDraftHelper";
import { useAppTitle, useAppUiState, useStatusText } from "./useAppUiState";
import { useAutosave } from "./useAutosave";
import { useDocumentWorkflow } from "./useDocumentWorkflow";
import { useEditorDocumentState } from "./useEditorDocumentState";
import { useEditorHistory } from "./useEditorHistory";
import { useGridClipboard } from "./useGridClipboard";
import { useGridColumns } from "./useGridColumns";
import { useGridLayout } from "./useGridLayout";
import { useGridSelectionAndRowDrag } from "./useGridSelectionAndRowDrag";
import { useGridViewModel } from "./useGridViewModel";
import { useRowActions } from "./useRowActions";
import { useTranslationColumns } from "./useTranslationColumns";

const AUTOSAVE_DEBOUNCE_MS = 600;
const AUTOSAVE_ENABLED = false;
const RTL_LANGUAGES = new Set(["ar", "he", "ur", "fa"]);

function isRtlLanguage(language: string): boolean {
  return RTL_LANGUAGES.has(language.toLowerCase().split("-")[0]);
}

export function useAppController() {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const isRtl = isRtlLanguage(activeLanguage);

  useEffect(() => {
    document.documentElement.lang = activeLanguage;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [activeLanguage, isRtl]);
  const gridRef = useRef<AgGridReact<GridRow>>(null);
  const [lastAction, setLastAction] = useState<LastActionState>(null);
  const isElectronMode = hasElectronApi();

  const uiState = useAppUiState({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    changeLanguage: i18n.changeLanguage.bind(i18n)
  });

  const documentState = useEditorDocumentState({ showOnlyInvalid: uiState.showOnlyInvalid });
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
    displayedRows,
    hasInvalidRows
  } = documentState;

  const history = useEditorHistory({
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

  const rowActions = useRowActions({ gridRef, config, setRows, setLastAction });
  const documentWorkflow = useDocumentWorkflow({
    gridRef,
    autosaveEnabled: AUTOSAVE_ENABLED,
    config,
    rows,
    setConfig,
    setRows,
    setShowArticleColumn,
    setShowAdditionalInformationColumn,
    setShowOnlyInvalid: uiState.setShowOnlyInvalid,
    setLastAction,
    markResetOnNextChange: history.markResetOnNextChange
  });

  const getRowId = useCallback((params: GetRowIdParams<GridRow>) => params.data?.rowId ?? "", []);
  const translationColumnState = useTranslationColumns({
    config,
    headerEditResetToken: documentWorkflow.headerEditResetToken,
    applyLanguagesTo,
    setRows,
    setLastAction
  });
  const { columnDefs } = useGridColumns({
    showArticleColumn,
    showAdditionalInformationColumn,
    translationColumns: translationColumnState.translationColumns,
    setRows,
    setLastAction,
    t
  });
  const selectionAndDrag = useGridSelectionAndRowDrag({ gridRef, rows, setRows, setLastAction });
  const clipboard = useGridClipboard({
    gridRef,
    config,
    rows,
    selectedCellKeys: selectionAndDrag.selectedCellKeys,
    clearSelectedCells: selectionAndDrag.clearCellSelection,
    setRows,
    setLastAction
  });

  const ai = useAiDraftHelper({
    config,
    rows,
    selectedCellKeys: selectionAndDrag.selectedCellKeys,
    setRows,
    setLastAction,
    t
  });

  useAutosave({
    enabled: AUTOSAVE_ENABLED,
    debounceMs: AUTOSAVE_DEBOUNCE_MS,
    config,
    rows,
    filePath: documentWorkflow.currentFilePath,
    setConfig,
    setRows,
    setFilePath: documentWorkflow.setCurrentFilePath,
    setLastAction
  });

  const gridLayout = useGridLayout({
    gridRef,
    isSettingsOpen: uiState.isSettingsOpen,
    isAiPanelOpen: ai.isAiPanelOpen,
    languageColumnsCount: config.languagesTo.length,
    showArticleColumn,
    showAdditionalInformationColumn
  });
  const gridProps = useGridViewModel({
    gridRef,
    rowData: displayedRows,
    getRowId,
    columnDefs,
    pageSize: uiState.pageSize,
    onCellMouseDown: selectionAndDrag.onCellMouseDown,
    onCellMouseOver: selectionAndDrag.onCellMouseOver,
    onColumnHeaderClicked: translationColumnState.onColumnHeaderClicked,
    onCellKeyDown: clipboard.onCellKeyDown,
    onGridSizeChanged: gridLayout.handleGridSizeChanged,
    onFirstDataRendered: gridLayout.handleFirstDataRendered,
    onDisplayedColumnsChanged: gridLayout.handleDisplayedColumnsChanged,
    onPaginationChanged: uiState.handlePaginationChanged,
    onRowDragMove: selectionAndDrag.onRowDragMove,
    onRowDragEnd: selectionAndDrag.onRowDragEnd,
    config,
    isCellSelected: selectionAndDrag.isCellSelected,
    setConfig,
    setLastAction,
    t
  });

  useAppTitle({ title: t("app.title") });
  const statusText = useStatusText({ t, lastAction, currentFilePath: documentWorkflow.currentFilePath });

  return {
    activeLanguage,
    ai,
    applyLanguagesTo,
    canCancel: history.canCancel,
    canReapply: history.canReapply,
    config,
    gridProps,
    isElectronMode,
    isRtl,
    isSettingsOpen: uiState.isSettingsOpen,
    rowActions,
    selectionAndDrag,
    setConfig,
    setShowAdditionalInformationColumn,
    setShowArticleColumn,
    showAdditionalInformationColumn,
    showArticleColumn,
    showOnlyInvalid: uiState.showOnlyInvalid,
    hasInvalidRows,
    statusText,
    t,
    toolbarActions: {
      handleCancel: history.cancel,
      handleDeleteRowsWithSelectedCells: selectionAndDrag.deleteRowsWithSelectedCells,
      handleLanguageChange: uiState.handleLanguageChange,
      handleNew: documentWorkflow.handleNew,
      handleOpen: documentWorkflow.handleOpen,
      handleReapply: history.reapply,
      handleSave: documentWorkflow.handleSave,
      handleSaveAs: documentWorkflow.handleSaveAs,
      handleToggleAiPanel: ai.toggleAiPanel,
      handleToggleSettings: uiState.handleToggleSettings,
      handleToggleShowOnlyInvalid: uiState.handleToggleShowOnlyInvalid
    }
  };
}

export type AppController = ReturnType<typeof useAppController>;
