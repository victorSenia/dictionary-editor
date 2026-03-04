export const en = {
  translation: {
    app: {
      title: "Dictionary Editor"
    },
    toolbar: {
      aria: "Editor toolbar",
      new: "New",
      open: "Open",
      save: "Save",
      saveAs: "Save As",
      cancel: "Cancel",
      reapply: "Reapply",
      export: "Export",
      import: "Import",
      showSettings: "Show Settings",
      hideSettings: "Hide Settings",
      removeSelectedRows: "Remove Selected Rows",
      language: "Language",
      showOnlyInvalid: "Show Only Invalid"
    },
    settings: {
      title: "Settings",
      aria: "Settings panel",
      showArticleColumn: "Show article column",
      showArticleColumnHint: "If disabled, it is recommended to remove articles from config.",
      showAdditionalInformationColumn: "Show additional info column",
      addLanguage: "Add language",
      addArticle: "Add article",
      removeItem: "Remove item",
      languageErrorEmpty: "Language cannot be empty",
      languageErrorExists: "Language \"{{language}}\" already exists",
      languageFrom: "Source language",
      languagesTo: "Target languages (comma-separated)",
      articles: "Articles (comma-separated)",
      delimiter: "Column delimiter",
      additionalInformationDelimiter: "Additional info delimiter",
      translationDelimiter: "Translation delimiter",
      topicFlag: "Topic prefix",
      topicDelimiter: "Topic delimiter",
      rootTopic: "Root topic"
    },
    actions: {
      addRow: "+ Add Row",
      addTopic: "+ Add Topic"
    },
    grid: {
      containerAria: "Grid container",
      article: "Article",
      word: "Word",
      additionalInfo: "Additional Info",
      toLanguage: "To {{language}}"
    },
    status: {
      lastAction: "Last action: {{action}}",
      file: "File: {{path}}",
      none: "None"
    },
    action: {
      new: "New",
      open: "Open",
      import: "Import",
      save: "Save",
      saveAs: "Save As",
      cancel: "Cancel",
      reapply: "Reapply",
      export: "Export",
      addRow: "Add Row",
      addTopic: "Add Topic",
      removeRow: "Remove Row",
      removeSelectedRows: "Remove Selected Rows",
      clearSelectedCells: "Clear Selected Cells",
      autosaveRestored: "Autosave Restored",
      copy: "Copy",
      copySelected: "Copy Selected",
      pasteFailed: "Paste failed",
      pasteInsert: "Paste Insert",
      addTranslationColumn: "Add Translation Column",
      reorderTranslationColumns: "Reorder Translation Columns",
      removeTranslationColumn: "Remove Translation Column",
      renameTranslationColumn: "Rename Translation Column",
      cannotRemoveLastTranslationColumn: "Cannot remove last translation column",
      languageNotFound: "Language \"{{language}}\" not found",
      languageExists: "Language \"{{language}}\" already exists",
      reorderTranslation: "Reorder Translation",
      editTranslation: "Edit Translation",
      addTranslation: "Add Translation",
      removeTranslation: "Remove Translation"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Translation contains forbidden column delimiter \"{{delimiter}}\"",
      containsColumnDelimiter: "Contains forbidden column delimiter \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Contains forbidden additional information delimiter \"{{delimiter}}\"",
      containsTopicFlag: "Contains forbidden topic flag \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Empty topic is not allowed",
      emptyWordNotAllowed: "Empty word is not allowed",
      emptyTranslationNotAllowed: "Empty translation is not allowed",
      articleNotInConfig: "Article \"{{article}}\" is not in configured articles"
    },
    translation: {
      renameColumn: "Rename column",
      renameFailed: "Rename failed",
      deleteColumn: "Delete column",
      saveRename: "Save",
      cancelRename: "Cancel",
      moveUp: "Move up",
      moveDown: "Move down",
      remove: "Remove translation",
      add: "Add translation",
      removeRow: "Remove row"
    },
    dialog: {
      cancel: "Cancel",
      ok: "OK"
    },
    clipboard: {
      confirmTooManyColumns:
        "Pasted data has {{maxBufferColumns}} columns, but only {{availableColumns}} fit from the selected cell. Extra columns will be ignored. Continue?",
      confirmOverwrite: "Some target cells already contain data. Pasting will overwrite existing values. Continue?"
    },
    languages: {
      en: "English",
      es: "Español",
      fr: "Français",
      in: "Bahasa Indonesia",
      pt: "Português",
      it: "Italiano",
      nl: "Nederlands",
      pl: "Polski",
      tr: "Türkçe",
      ru: "Русский",
      hi: "हिन्दी",
      bn: "বাংলা",
      ur: "اردو",
      zh: "中文",
      ja: "日本語",
      ko: "한국어",
      id: "Bahasa Indonesia",
      vi: "Tiếng Việt",
      th: "ไทย",
      uk: "Українська",
      de: "Deutsch",
      ar: "العربية",
      he: "עברית",
      fa: "فارسی"
    },
    agGrid: {
      page: "Page",
      more: "More",
      to: "to",
      of: "of",
      next: "Next",
      last: "Last",
      first: "First",
      previous: "Previous",
      loadingOoo: "Loading...",
      selectAll: "Select All",
      searchOoo: "Search...",
      blanks: "(Blanks)",
      noRowsToShow: "No rows to show"
    }
  }
} as const;




