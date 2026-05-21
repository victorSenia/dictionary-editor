# Test layout

- `ai/` — AI request, parsing, and insertion behavior.
- `grid/` — grid validation, cell keys, clipboard copy/paste/delete behavior.
- `io/` — dictionary parsing/serialization, autosave payloads, config line handling.
- `utils/` — dictionary helper and language transition behavior.
- `fixtures/` — sample dictionary files used by integration-style parser tests.
- `helpers/` — reusable test helpers.

`helpers/sourceModule.ts` imports source modules through an in-memory esbuild bundle. This avoids both bad earlier workarounds:

- no generated extensionless proxy files inside `src`;
- no copied temp `src` tree in the OS temp folder.

The helper only reads source files and creates an in-memory JavaScript data URL for Node's test runner. The only real files in this archive are the test files themselves.
