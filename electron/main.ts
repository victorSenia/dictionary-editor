import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

const isDev = !!process.env.VITE_DEV_SERVER_URL;
const IPC_CHANNELS = {
  OPEN_FILE: "file:open",
  SAVE_FILE: "file:save",
  SAVE_FILE_AS: "file:saveAs",
  READ_AUTOSAVE: "autosave:read",
  WRITE_AUTOSAVE: "autosave:write"
} as const;

type OpenFileResult = { path: string; content: string } | null;
type SaveFileResult = { path: string } | null;
type AutosaveReadResult = { path: string; content: string } | null;
type AutosaveWriteResult = { path: string };

function resolveAutosavePath(sourceFilePath: unknown): string {
  if (typeof sourceFilePath === "string" && sourceFilePath.trim() !== "") {
    return `${sourceFilePath}.autosave.json`;
  }
  return path.join(app.getPath("userData"), "dictionary-editor.autosave.json");
}

function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.OPEN_FILE, async (): Promise<OpenFileResult> => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"]
    });

    if (canceled || filePaths.length === 0) {
      return null;
    }

    const selectedPath = filePaths[0];
    const content = await readFile(selectedPath, "utf8");
    return { path: selectedPath, content };
  });

  ipcMain.handle(
    IPC_CHANNELS.SAVE_FILE,
    async (_event, filePath: unknown, content: unknown): Promise<SaveFileResult> => {
      if (typeof filePath !== "string" || typeof content !== "string") {
        throw new Error("Invalid saveFile arguments");
      }

      await writeFile(filePath, content, "utf8");
      return { path: filePath };
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.SAVE_FILE_AS,
    async (_event, content: unknown): Promise<SaveFileResult> => {
      if (typeof content !== "string") {
        throw new Error("Invalid saveFileAs arguments");
      }

      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: "document.txt"
      });

      if (canceled || !filePath) {
        return null;
      }

      await writeFile(filePath, content, "utf8");
      return { path: filePath };
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.READ_AUTOSAVE,
    async (_event, sourceFilePath: unknown): Promise<AutosaveReadResult> => {
      const autosavePath = resolveAutosavePath(sourceFilePath);
      try {
        const content = await readFile(autosavePath, "utf8");
        return { path: autosavePath, content };
      } catch {
        return null;
      }
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.WRITE_AUTOSAVE,
    async (_event, sourceFilePath: unknown, content: unknown): Promise<AutosaveWriteResult> => {
      if (typeof content !== "string") {
        throw new Error("Invalid writeAutosave arguments");
      }

      const autosavePath = resolveAutosavePath(sourceFilePath);
      await writeFile(autosavePath, content, "utf8");
      return { path: autosavePath };
    }
  );
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL as string);
    win.webContents.openDevTools({ mode: "detach" });
    return;
  }

  win.loadFile(path.join(app.getAppPath(), "dist", "renderer", "index.html"));
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
