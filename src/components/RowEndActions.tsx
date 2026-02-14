import { useTranslation } from "react-i18next";

type RowEndActionsProps = {
  onAddRow: () => void;
  onAddTopic: () => void;
};

function RowEndActions({ onAddRow, onAddTopic }: RowEndActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="row-end-actions">
      <button type="button" className="bottom-action-button new-button" onClick={onAddRow}>
        {t("actions.addRow")}
      </button>
      <button type="button" className="bottom-action-button new-button" onClick={onAddTopic}>
        {t("actions.addTopic")}
      </button>
    </div>
  );
}

export default RowEndActions;
