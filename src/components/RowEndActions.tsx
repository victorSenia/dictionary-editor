import { useTranslation } from "react-i18next";

type RowEndActionsProps = {
  showOnlyInvalid: boolean;
  showOnlyInvalidDisabled: boolean;
  deleteSelectedDisabled: boolean;
  onAddRow: () => void;
  onAddTopic: () => void;
  onToggleShowOnlyInvalid: () => void;
  onDeleteSelected: () => void;
};

function RowEndActions({
  showOnlyInvalid,
  showOnlyInvalidDisabled,
  deleteSelectedDisabled,
  onAddRow,
  onAddTopic,
  onToggleShowOnlyInvalid,
  onDeleteSelected,
}: RowEndActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="row-end-actions">
      <button
        type="button"
        className="bottom-action-button new-button"
        onClick={onAddRow}
      >
        {t("actions.addRow")}
      </button>
      <button
        type="button"
        className="bottom-action-button new-button"
        onClick={onAddTopic}
      >
        {t("actions.addTopic")}
      </button>

      <div className="row-end-actions-separator" />

      <button
        type="button"
        className={`bottom-action-button toggle-button ${showOnlyInvalid ? "active" : ""}`}
        onClick={onToggleShowOnlyInvalid}
        aria-pressed={showOnlyInvalid}
        disabled={showOnlyInvalidDisabled}
        title={showOnlyInvalidDisabled ? t("toolbar.noInvalidRows") : t("toolbar.showOnlyInvalid")}
      >
        {t("toolbar.showOnlyInvalid")}
      </button>

      <div className="row-end-actions-separator" />

      <button
        type="button"
        className="bottom-action-button danger-button"
        onClick={onDeleteSelected}
        disabled={deleteSelectedDisabled}
        title={deleteSelectedDisabled ? t("toolbar.selectRowsToRemove") : t("toolbar.removeSelectedRows")}
      >
        {t("toolbar.removeSelectedRows")}
      </button>
    </div>
  );
}

export default RowEndActions;
