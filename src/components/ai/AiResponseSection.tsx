type AiResponseSectionProps = {
  t: (key: string) => string;
  response: string;
  onResponseChange: (response: string) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function AiResponseSection({
  t,
  response,
  onResponseChange,
  isOpen,
  onOpenChange
}: AiResponseSectionProps) {
  return (
    <details
      open={isOpen}
      className="ai-section"
      onToggle={(event) => onOpenChange(event.currentTarget.open)}
    >
      <summary>{t("aiPanel.responseSection")}</summary>
      <label className="wide-field">
        <textarea
          rows={10}
          value={response}
          onChange={(event) => onResponseChange(event.target.value)}
          aria-label={t("aiPanel.responseSection")}
        />
      </label>
    </details>
  );
}
