import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import {
  AUTOSAVE_FILE_SUFFIX,
  DEFAULT_DOCUMENT_NAME_DE,
  DEFAULT_DOCUMENT_NAME_EN,
  DEFAULT_DOCUMENT_NAME_UK,
  FALLBACK_AUTOSAVE_FILE_NAME,
  INVALID_SAVE_FILE_ARGS_ERROR,
  INVALID_SAVE_FILE_AS_ARGS_ERROR,
  INVALID_WRITE_AUTOSAVE_ARGS_ERROR,
  IPC_CHANNELS,
  MAIN_WINDOW_HEIGHT,
  MAIN_WINDOW_WIDTH
} from "./constants";
import type {
  AutosaveReadResult,
  AutosaveWriteResult,
  OpenFileResult,
  SaveFileResult
} from "./ipcTypes";

const isDev = !!process.env.VITE_DEV_SERVER_URL;

function resolveAutosavePath(sourceFilePath: unknown): string {
  if (typeof sourceFilePath === "string" && sourceFilePath.trim() !== "") {
    return `${sourceFilePath}${AUTOSAVE_FILE_SUFFIX}`;
  }
  return path.join(app.getPath("userData"), FALLBACK_AUTOSAVE_FILE_NAME);
}

function getDefaultDocumentName(): string {
  const locale = app.getLocale().toLowerCase();
  if (locale.startsWith("de")) {
    return DEFAULT_DOCUMENT_NAME_DE;
  }
  if (locale.startsWith("uk")) {
    return DEFAULT_DOCUMENT_NAME_UK;
  }
  return DEFAULT_DOCUMENT_NAME_EN;
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
        throw new Error(INVALID_SAVE_FILE_ARGS_ERROR);
      }

      await writeFile(filePath, content, "utf8");
      return { path: filePath };
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.SAVE_FILE_AS,
    async (_event, content: unknown): Promise<SaveFileResult> => {
      if (typeof content !== "string") {
        throw new Error(INVALID_SAVE_FILE_AS_ARGS_ERROR);
      }

      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: getDefaultDocumentName()
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
        throw new Error(INVALID_WRITE_AUTOSAVE_ARGS_ERROR);
      }

      const autosavePath = resolveAutosavePath(sourceFilePath);
      await writeFile(autosavePath, content, "utf8");
      return { path: autosavePath };
    }
  );
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: MAIN_WINDOW_WIDTH,
    height: MAIN_WINDOW_HEIGHT,
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
