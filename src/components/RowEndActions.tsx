type RowEndActionsProps = {
  onAddRow: () => void;
  onAddTopic: () => void;
};

function RowEndActions({ onAddRow, onAddTopic }: RowEndActionsProps) {
  return (
    <div className="row-end-actions">
      <button type="button" className="bottom-action-button new-button" onClick={onAddRow}>
        + Add Row
      </button>
      <button type="button" className="bottom-action-button new-button" onClick={onAddTopic}>
        + Add Topic
      </button>
    </div>
  );
}

export default RowEndActions;
