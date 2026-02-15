# Dictionary Editor

Desktop editor for dictionary files in a LEO-style format.

## Tech Stack
- Electron
- React
- TypeScript
- Vite

## Features
- Open, edit, validate, import, and export dictionary files
- Parse and edit configuration/header values:
  - source language and target languages
  - articles list
  - field delimiters (word/translation/additional info/topic)
- Parse and edit content rows:
  - topic rows
  - word rows
- Grid-based editing:
  - inline row editing
  - translation item editing in cells (add/remove/reorder)
  - drag-and-drop row reordering
  - row selection, copy/paste insert, pagination
- Native file dialogs and autosave sidecar support

## Requirements
- Node.js 18+
- npm

All tooling is installed as local dev dependencies. No global installs are required.

## Setup
```bash
npm install
```

## Development
```bash
npm run dev
```

This starts:
- Vite dev server for the renderer
- Electron app connected to the dev server

## Build
```bash
npm run build
```

Output:
- `dist/renderer/` for renderer assets
- `dist-electron/` for Electron main process output

## Single-file Build (Standalone HTML)
Build a standalone renderer HTML file:

```bash
npm run build:renderer:single-file
```

Output:
- `dist/renderer-singlefile/index.html`

This file is generated and should not be edited manually.

Where to find it locally:
- Path: `dist/renderer-singlefile/index.html`
- In terminal:
  - `ls dist/renderer-singlefile` (Git Bash / Linux / macOS)
  - `dir dist\\renderer-singlefile` (Windows CMD/PowerShell)

## Single-file Release (GitHub Actions)
The repository includes a release workflow at:
- `.github/workflows/release-single-file.yml`

It runs when a version tag is pushed (pattern `v*`), builds the single-file renderer, and uploads it as a GitHub Release asset (`dictionary-editor-single.html`).

Release steps:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Where to download it from GitHub:
- Releases page:
  - `../../releases`
- Latest release:
  - `../../releases/latest`
- Asset is listed under **Assets** as:
  - `dictionary-editor-single.html`

## Package Windows Installer (.exe)
```bash
npm run dist
```

Installer artifacts are generated in `dist/`.

## Useful Scripts
- `npm run build:renderer`
- `npm run build:renderer:single-file`
- `npm run build:renderer:all`
- `npm run build:electron`
