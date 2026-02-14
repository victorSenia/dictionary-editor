import { contextBridge, ipcRenderer } from "electron";

const IPC_CHANNELS = {
  OPEN_FILE: "file:open",
  SAVE_FILE: "file:save",
  SAVE_FILE_AS: "file:saveAs",
  READ_AUTOSAVE: "autosave:read",
  WRITE_AUTOSAVE: "autosave:write"
} as const;

type AllowedChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];
type OpenFileResult = { path: string; content: string } | null;
type SaveFileResult = { path: string } | null;
type AutosaveReadResult = { path: string; content: string } | null;
type AutosaveWriteResult = { path: string };

const ALLOWED_CHANNELS = new Set<AllowedChannel>(Object.values(IPC_CHANNELS));

function invoke<T>(channel: AllowedChannel, ...args: unknown[]): Promise<T> {
  if (!ALLOWED_CHANNELS.has(channel)) {
    throw new Error("Blocked IPC channel");
  }
  return ipcRenderer.invoke(channel, ...args) as Promise<T>;
}

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: (): Promise<OpenFileResult> => invoke<OpenFileResult>(IPC_CHANNELS.OPEN_FILE),
  saveFile: (filePath: string, content: string): Promise<SaveFileResult> =>
    invoke<SaveFileResult>(IPC_CHANNELS.SAVE_FILE, filePath, content),
  saveFileAs: (content: string): Promise<SaveFileResult> =>
    invoke<SaveFileResult>(IPC_CHANNELS.SAVE_FILE_AS, content),
  readAutosave: (sourceFilePath: string | null): Promise<AutosaveReadResult> =>
    invoke<AutosaveReadResult>(IPC_CHANNELS.READ_AUTOSAVE, sourceFilePath),
  writeAutosave: (sourceFilePath: string | null, content: string): Promise<AutosaveWriteResult> =>
    invoke<AutosaveWriteResult>(IPC_CHANNELS.WRITE_AUTOSAVE, sourceFilePath, content)
});
