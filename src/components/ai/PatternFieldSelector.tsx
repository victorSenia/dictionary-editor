import { getPatternFieldLabel } from "../../ai/patterns/fieldUtils";
import type { AiPatternField } from "../../ai/types";

type PatternFieldSelectorProps = {
  t: (key: string, options?: Record<string, string>) => string;
  patternFields: AiPatternField[];
  availablePatternFields: AiPatternField[];
  availableTargetLanguages: string[];
  onAddField: (field: AiPatternField) => void;
};

export default function PatternFieldSelector({
  t,
  patternFields,
  availablePatternFields,
  availableTargetLanguages,
  onAddField
}: PatternFieldSelectorProps) {
  const fields = [
    ...availablePatternFields,
    ...availableTargetLanguages.map((language) => `translation:${language}` as AiPatternField)
  ].filter((field) => !patternFields.includes(field));

  if (fields.length === 0) {
    return null;
  }

  return (
    <label className="compact-field pattern-add-field">
      {t("aiPanel.addField")}
      <select value="" onChange={(event) => onAddField(event.target.value as AiPatternField)}>
        <option value="" />
        {fields.map((field) => (
          <option key={field} value={field}>{getPatternFieldLabel(field, t)}</option>
        ))}
      </select>
    </label>
  );
}
