import { DEFAULT_DOCUMENT_NAME, TEXT_FILE_MIME_TYPE } from "../constants/files";

export type FileOpenResult = { path: string; content: string } | null;
export type FileSaveResult = { path: string } | null;
export type AutosaveResult = { path: string; content: string } | null;

function getElectronApi() {
  return window.electronAPI;
}

export function hasElectronApi(): boolean {
  return Boolean(getElectronApi());
}

function getFileName(path: string | null | undefined): string {
  if (!path) {
    return DEFAULT_DOCUMENT_NAME;
  }
  const parts = path.split(/[\\/]/);
  const last = parts[parts.length - 1];
  return last && last.trim() !== "" ? last : DEFAULT_DOCUMENT_NAME;
}

async function openFileBrowser(): Promise<FileOpenResult> {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "*/*";

  const file = await new Promise<File | null>((resolve) => {
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.oncancel = () => resolve(null);
    input.click();
  });

  if (!file) {
    return null;
  }

  const content = await file.text();
  return { path: file.name, content };
}

function saveFileBrowser(content: string, fileName: string): FileSaveResult {
  const blob = new Blob([content], { type: TEXT_FILE_MIME_TYPE });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return { path: fileName };
}

export async function openFileUniversal(): Promise<FileOpenResult> {
  const electron = getElectronApi();
  if (electron) {
    return electron.openFile();
  }
  return openFileBrowser();
}

export async function saveFileAsUniversal(
  content: string,
  suggestedPath: string | null = null
): Promise<FileSaveResult> {
  const electron = getElectronApi();
  if (electron) {
    return electron.saveFileAs(content);
  }
  return saveFileBrowser(content, getFileName(suggestedPath));
}

export async function saveFileUniversal(path: string, content: string): Promise<FileSaveResult> {
  const electron = getElectronApi();
  if (electron) {
    return electron.saveFile(path, content);
  }
  return saveFileBrowser(content, getFileName(path));
}

export async function readAutosaveUniversal(sourceFilePath: string | null): Promise<AutosaveResult> {
  const electron = getElectronApi();
  if (!electron) {
    return null;
  }
  return electron.readAutosave(sourceFilePath);
}

export async function writeAutosaveUniversal(
  sourceFilePath: string | null,
  content: string
): Promise<{ path: string } | null> {
  const electron = getElectronApi();
  if (!electron) {
    return null;
  }
  return electron.writeAutosave(sourceFilePath, content);
}
