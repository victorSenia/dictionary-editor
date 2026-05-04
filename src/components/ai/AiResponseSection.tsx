
type AiResponseSectionProps = {
  t: (key: string) => string;
  response: string;
  parseMessage: string;
  parseMessageStatus: string;
  addRowsLabel: string;
  addRowsDisabled: boolean;
  onResponseChange: (response: string) => void;
  onParseCurrentResponse: () => void;
  onAddRows: () => void;
};

export default function AiResponseSection({
  t,
  response,
  parseMessage,
  parseMessageStatus,
  addRowsLabel,
  addRowsDisabled,
  onResponseChange,
  onParseCurrentResponse,
  onAddRows
}: AiResponseSectionProps) {
  return (
    <section className="ai-section">
      <h3>{t("aiPanel.responseSection")}</h3>
      <label>
        {t("aiPanel.response")}
        <textarea rows={10} value={response} onChange={(event) => onResponseChange(event.target.value)} />
      </label>
      <button type="button" className="secondary-button full-width-button" onClick={onParseCurrentResponse}>
        {t("aiPanel.parseResponse")}
      </button>
      {parseMessage ? <pre className={`parse-message ${parseMessageStatus ? `parse-message-${parseMessageStatus}` : ""}`}>{parseMessage}</pre> : null}
      <div className="ai-actions">
        <button type="button" className="primary-button" onClick={onAddRows} disabled={addRowsDisabled}>
          {addRowsLabel}
        </button>
      </div>
    </section>
  );
}
