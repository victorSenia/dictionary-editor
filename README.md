# Dictionary Editor

Desktop editor for dictionary files in a LEO-style format.

Live site:
- https://victorsenia.github.io/dictionary-editor/

## Tech Stack
- Electron
- React
- TypeScript
- Vite

## Features
- Open, edit, validate, import, and export dictionary files
- Edit course vocabulary drafts in the same application shell
- Parse and edit configuration/header values:
  - source language
  - editable target language list
  - editable articles list
  - field delimiters (word/translation/additional info/topic)
- Parse and edit content rows:
  - topic rows
  - word rows
- Grid-based editing:
  - inline row editing
  - translation item editing in cells (add/remove/reorder)
  - drag-and-drop row reordering
  - row selection, copy/paste insert, pagination
- AI draft helper:
  - generate an editable AI request from the current course/topic context
  - expand known language keys in prompts, for example `de` -> `Deutsch`
  - parse pasted AI responses with an explicit visual line pattern
  - suggest and fill the line pattern from the current AI response
  - add parsed rows for full vocabulary generation
  - fill missing translations for selected existing rows
- Native file dialogs and autosave sidecar support when running in Electron
- Browser and single-file HTML fallback when Electron APIs are unavailable

## AI Draft Workflow
1. Open the AI panel.
2. Choose request mode:
   - `Auto` selects full generation or translations-only from the current selection.
   - `Full generation` creates new word rows.
   - `Translations only` fills missing target-language cells for selected rows.
3. Generate or edit the request text.
4. Paste the AI response.
5. Use `Suggest pattern` or `Parse response`.
   - If no parsing pattern is configured, parsing first suggests a pattern from the response and fills the visual pattern builder.
   - A pattern that matches no response lines is rejected.
   - Partial matches are shown as warnings.
6. Use `Add` or `Fill translations` to apply the parsed result.

The AI response parser does not use a hidden default parsing configuration. It parses only with the visual line pattern shown in the UI.

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
  - `https://github.com/victorsenia/dictionary-editor/releases`
- Latest release:
  - `https://github.com/victorsenia/dictionary-editor/releases/latest`
- Asset is listed under **Assets** as:
  - `dictionary-editor-single.html`

## Package Windows Installer (.exe)
```bash
npm run dist
```

Installer artifacts are generated in `dist/`.

## Test
```bash
npm test
```
