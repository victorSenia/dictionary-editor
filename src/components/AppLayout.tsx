import { AgGridReact } from "ag-grid-react";
import RowEndActions from "./RowEndActions";
import SettingsPanel from "./SettingsPanel";
import Toolbar from "./Toolbar";
import AiPanel from "./AiPanel";
import CourseHeader from "./CourseHeader";
import type { AppController } from "../hooks/useAppController";
import type { GridRow } from "../types/grid";

type Props = {
  controller: AppController;
};

export default function AppLayout({ controller }: Props) {
  const {
    activeLanguage,
    ai,
    applyLanguagesTo,
    canCancel,
    canReapply,
    config,
    gridProps,
    isElectronMode,
    isRtl,
    isSettingsOpen,
    rowActions,
    selectionAndDrag,
    setConfig,
    setShowAdditionalInformationColumn,
    setShowArticleColumn,
    showAdditionalInformationColumn,
    showArticleColumn,
    showOnlyInvalid,
    statusText,
    t,
    toolbarActions
  } = controller;

  return (
    <div className={`app-shell ${isRtl ? "rtl" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
      <Toolbar
        isSettingsOpen={isSettingsOpen}
        showOnlyInvalid={showOnlyInvalid}
        isAiPanelOpen={ai.isAiPanelOpen}
        language={activeLanguage}
        showSaveAs={isElectronMode}
        canCancel={canCancel}
        canReapply={canReapply}
        deleteSelectedDisabled={!selectionAndDrag.hasSelectedCells}
        onLanguageChange={toolbarActions.handleLanguageChange}
        onNew={toolbarActions.handleNew}
        onOpen={toolbarActions.handleOpen}
        onSave={toolbarActions.handleSave}
        onSaveAs={toolbarActions.handleSaveAs}
        onCancel={toolbarActions.handleCancel}
        onReapply={toolbarActions.handleReapply}
        onToggleSettings={toolbarActions.handleToggleSettings}
        onToggleAiPanel={toolbarActions.handleToggleAiPanel}
        onToggleShowOnlyInvalid={toolbarActions.handleToggleShowOnlyInvalid}
        onDeleteSelected={toolbarActions.handleDeleteRowsWithSelectedCells}
      />
      <CourseHeader config={config} setConfig={setConfig} />

      <div className={`content ${isSettingsOpen ? "settings-open" : ""} ${ai.isAiPanelOpen ? "ai-open" : ""}`}>
        <main className="grid-area" aria-label={t("grid.containerAria")}>
          <div className="ag-theme-alpine grid-host">
            <AgGridReact<GridRow> {...gridProps} enableRtl={isRtl} />
          </div>
          <RowEndActions
            addRowLabel={t("actions.addRow")}
            addTopicLabel={t("actions.addTopic")}
            onAddRow={rowActions.handleAddRow}
            onAddTopic={rowActions.handleAddTopic}
          />
          <p className="status">{statusText}</p>
        </main>

        {ai.isAiPanelOpen ? (
          <main className="ai-workspace">
            <AiPanel
              config={config}
              requestContext={ai.aiRequestContext}
              requestModeChoice={ai.aiRequestModeChoice}
              onRequestModeChoiceChange={ai.setAiRequestModeChoice}
              response={ai.aiResponse}
              parseMessage={ai.aiParseMessage}
              onResponseChange={ai.handleAiResponseChange}
              onParseMessageChange={ai.setAiParseMessage}
              lastAppliedAiSignature={ai.lastAppliedAiSignature}
              onAddRows={ai.handleAddAiRows}
              onResponseParsed={ai.handleRegexRowsParsed}
              onRequestGenerated={ai.handleAiRequestGenerated}
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
