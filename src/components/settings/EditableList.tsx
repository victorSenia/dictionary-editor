import type { KeyboardEvent } from "react";

type EditableListProps = {
  items: string[];
  itemKeyPrefix: string;
  addAriaLabel: string;
  removeAriaLabel: string;
  canRemove?: boolean;
  onChangeAt: (index: number, value: string) => void;
  onBlurAt?: (index: number) => void;
  onKeyDownAt?: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  getItemErrorAt?: (index: number) => string | null;
  onAdd: () => void;
  onRemoveAt: (index: number) => void;
};

export default function EditableList({
  items,
  itemKeyPrefix,
  addAriaLabel,
  removeAriaLabel,
  canRemove = true,
  onChangeAt,
  onBlurAt,
  onKeyDownAt,
  getItemErrorAt,
  onAdd,
  onRemoveAt
}: EditableListProps) {
  return (
    <div className="settings-list">
      {items.map((item, index) => {
        const error = getItemErrorAt?.(index) ?? null;

        return (
          <div key={`${itemKeyPrefix}-${index}`} className="settings-list-row">
            <div className="settings-list-item">
              <input
                className={`settings-list-input ${error ? "settings-list-input-invalid" : ""}`}
                type="text"
                value={item}
                onChange={(event) => onChangeAt(index, event.target.value)}
                onBlur={() => onBlurAt?.(index)}
                onKeyDown={(event) => onKeyDownAt?.(index, event)}
                aria-invalid={!!error}
              />
              <button
                type="button"
                className="translation-item-btn translation-item-btn-danger"
                aria-label={removeAriaLabel}
                title={removeAriaLabel}
                disabled={!canRemove}
                onClick={() => onRemoveAt(index)}
              >
                {"\u00D7"}
              </button>
            </div>
            {error ? <p className="settings-field-error">{error}</p> : null}
          </div>
        );
      })}
      <button
        type="button"
        className="translation-item-btn translation-item-btn-new"
        aria-label={addAriaLabel}
        title={addAriaLabel}
        onClick={onAdd}
      >
        +
      </button>
    </div>
  );
}
