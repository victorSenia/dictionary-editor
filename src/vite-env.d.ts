/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    openFile: () => Promise<{ path: string; content: string } | null>;
    saveFile: (path: string, content: string) => Promise<{ path: string } | null>;
    saveFileAs: (content: string) => Promise<{ path: string } | null>;
    readAutosave: (sourceFilePath: string | null) => Promise<{ path: string; content: string } | null>;
    writeAutosave: (
      sourceFilePath: string | null,
      content: string
    ) => Promise<{ path: string }>;
  };
}
