import { useEffect, useState } from "react";

type TranslationHeaderProps = {
  displayName: string;
  column: { getColId: () => string };
  onRename: (fromLanguage: string, toLanguage: string) => boolean;
  onDelete: (language: string) => boolean;
};

export default function TranslationHeader({
  displayName,
  column,
  onRename,
  onDelete
}: TranslationHeaderProps) {
  const colId = column.getColId();
  const language = colId.startsWith("to-") ? colId.slice(3) : displayName.replace(/^To\s+/, "");
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(language);

  useEffect(() => {
    setValue(language);
  }, [language]);

  if (!isEditing) {
    return (
      <div className="translation-header">
        <span>{displayName}</span>
        <span className="translation-header-actions">
          <button
            className="translation-header-btn translation-header-btn-edit"
            aria-label="Rename column"
            title="Rename column"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsEditing(true);
            }}
          >
            {"\u270E"}
          </button>
          <button
            className="translation-header-btn translation-header-btn-danger"
            aria-label="Delete column"
            title="Delete column"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(language);
            }}
          >
            {"\u2716"}
          </button>
        </span>
      </div>
    );
  }

  return (
    <div className="translation-header">
      <input
        className="translation-header-input"
        type="text"
        value={value}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => setValue(event.target.value)}
      />
      <span className="translation-header-actions">
        <button
          className="translation-header-btn translation-header-btn-edit"
          aria-label="Save rename"
          title="Save"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            const ok = onRename(language, value);
            if (ok) {
              setIsEditing(false);
            }
          }}
        >
          {"\u2713"}
        </button>
        <button
          className="translation-header-btn"
          aria-label="Cancel rename"
          title="Cancel"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setValue(language);
            setIsEditing(false);
          }}
        >
          {"\u2715"}
        </button>
      </span>
    </div>
  );
}
