export const IPC_CHANNELS = {
  OPEN_FILE: "file:open",
  SAVE_FILE: "file:save",
  SAVE_FILE_AS: "file:saveAs",
  READ_AUTOSAVE: "autosave:read",
  WRITE_AUTOSAVE: "autosave:write"
} as const;

export type AllowedChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

export const BLOCKED_IPC_CHANNEL_ERROR = "Blocked IPC channel";
export const INVALID_SAVE_FILE_ARGS_ERROR = "Invalid saveFile arguments";
export const INVALID_SAVE_FILE_AS_ARGS_ERROR = "Invalid saveFileAs arguments";
export const INVALID_WRITE_AUTOSAVE_ARGS_ERROR = "Invalid writeAutosave arguments";

export const MAIN_WINDOW_WIDTH = 1200;
export const MAIN_WINDOW_HEIGHT = 800;

export const DEFAULT_DOCUMENT_NAME_EN = "document.txt";
export const DEFAULT_DOCUMENT_NAME_DE = "dokument.txt";
export const DEFAULT_DOCUMENT_NAME_UK = "\u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442.txt";

export const AUTOSAVE_FILE_SUFFIX = ".autosave.json";
export const FALLBACK_AUTOSAVE_FILE_NAME = "dictionary-editor.autosave.json";
