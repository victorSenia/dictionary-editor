type RowEndActionsProps = {
  addRowLabel: string;
  addTopicLabel: string;
  onAddRow: () => void;
  onAddTopic: () => void;
};

function RowEndActions({ addRowLabel, addTopicLabel, onAddRow, onAddTopic }: RowEndActionsProps) {
  return (
    <div className="row-end-actions">
      <button type="button" className="bottom-action-button new-button" onClick={onAddRow}>
        {addRowLabel}
      </button>
      <button type="button" className="bottom-action-button new-button" onClick={onAddTopic}>
        {addTopicLabel}
      </button>
    </div>
  );
}

export default RowEndActions;
