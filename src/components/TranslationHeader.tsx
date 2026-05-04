import { useEffect, useState } from "react";

type TranslationHeaderProps = {
  displayName: string;
  column: { getColId: () => string };
  columnPrefix: string;
  resetToken?: number;
  labels: {
    renameColumn: string;
    deleteColumn: string;
    saveRename: string;
    cancelRename: string;
    renameFailed: string;
  };
  onRename: (fromLanguage: string, toLanguage: string) => { ok: boolean; error?: string };
  onDelete: (language: string) => boolean;
};

export default function TranslationHeader({
  displayName,
  column,
  columnPrefix,
  resetToken = 0,
  labels,
  onRename,
  onDelete
}: TranslationHeaderProps) {
  const colId = column.getColId();
  const language = colId.startsWith(columnPrefix)
    ? colId.slice(columnPrefix.length)
    : displayName.replace(/^To\s+/, "");
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(language);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setValue(language);
    setError("");
  }, [language]);

  useEffect(() => {
    setValue(language);
    setError("");
    setIsEditing(false);
  }, [language, resetToken]);

  if (!isEditing) {
    return (
      <div className="translation-header">
        <span>{displayName}</span>
        <span className="translation-header-actions">
          <button
            className="translation-header-btn translation-header-btn-edit"
            aria-label={labels.renameColumn}
            title={labels.renameColumn}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setError("");
              setIsEditing(true);
            }}
          >
            {"\u270E"}
          </button>
          <button
            className="translation-header-btn translation-header-btn-danger"
            aria-label={labels.deleteColumn}
            title={labels.deleteColumn}
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
    <div
      className="translation-header translation-header-editing"
      onPointerDownCapture={(event) => event.stopPropagation()}
      onMouseDownCapture={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div
        className="translation-header-main"
        onPointerDownCapture={(event) => event.stopPropagation()}
        onMouseDownCapture={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <input
          className={`translation-header-input ${error ? "translation-header-input-invalid" : ""}`}
          type="text"
          value={value}
          aria-invalid={!!error}
          onPointerDownCapture={(event) => event.stopPropagation()}
          onMouseDownCapture={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) {
              setError("");
            }
          }}
        />
        <span className="translation-header-actions">
          <button
            className="translation-header-btn translation-header-btn-edit"
            aria-label={labels.saveRename}
            title={labels.saveRename}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              const result = onRename(language, value);
              if (result.ok) {
                setError("");
                setIsEditing(false);
                return;
              }
              setError(result.error ?? labels.renameFailed);
            }}
          >
            {"\u2713"}
          </button>
          <button
            className="translation-header-btn"
            aria-label={labels.cancelRename}
            title={labels.cancelRename}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setError("");
              setValue(language);
              setIsEditing(false);
            }}
          >
            {"\u2715"}
          </button>
        </span>
      </div>
      {error ? <p className="translation-header-error">{error}</p> : null}
    </div>
  );
}
