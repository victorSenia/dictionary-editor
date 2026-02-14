# Dictionary Editor

Desktop editor for dictionary files used by LEO-style parse format.

## Project Overview
- Built with Electron + React + TypeScript + Vite.
- Opens, edits, validates, imports, and exports dictionary files.
- Supports configuration header parsing and row parsing for:
  - source language and target languages
  - articles list
  - delimiters (word/translation/additional info/topic)
  - topic rows and word rows
- Provides grid-based editing with:
  - inline row editing
  - translation item editing inside cells (add/remove/reorder)
  - drag-and-drop row reorder
  - row selection, copy/paste insert, pagination
- Saves files through Electron native dialogs and supports autosave sidecar files.

## Requirements
- Node.js 18+ and npm
- No global npm packages are required (`vite`, `electron`, etc. are local dev dependencies)

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Windows Installer (.exe)
```bash
npm run dist
```

Artifacts are generated in `dist/`.
