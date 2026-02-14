type ToolbarProps = {
  isSettingsOpen: boolean;
  onOpen: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onExport: () => void;
  onImport: () => void;
  onToggleSettings: () => void;
  onDeleteSelected: () => void;
};

function Toolbar({
  isSettingsOpen,
  onOpen,
  onSave,
  onSaveAs,
  onExport,
  onImport,
  onToggleSettings,
  onDeleteSelected
}: ToolbarProps) {
  return (
    <header className="toolbar" role="toolbar" aria-label="Editor toolbar">
      <button type="button" onClick={onOpen}>
        Open
      </button>
      <button type="button" onClick={onSave}>
        Save
      </button>
      <button type="button" onClick={onSaveAs}>
        Save As
      </button>
      <button type="button" onClick={onExport}>
        Export
      </button>
      <button type="button" onClick={onImport}>
        Import
      </button>
      <button
        type="button"
        className={`toggle-button ${isSettingsOpen ? "active" : ""}`}
        onClick={onToggleSettings}
        aria-pressed={isSettingsOpen}
      >
        {isSettingsOpen ? "Hide Settings" : "Show Settings"}
      </button>
      <button type="button" className="danger-button" onClick={onDeleteSelected}>
        Remove Selected Rows
      </button>
    </header>
  );
}

export default Toolbar;
