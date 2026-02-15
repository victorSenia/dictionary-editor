export const resources = {
  en: {
    translation: {
      app: {
        title: "Dictionary Editor"
      },
      toolbar: {
        aria: "Editor toolbar",
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
      languages: {
        en: "English",
        de: "German",
        uk: "Ukrainian"
      },
      topic: {
        new: "New Topic"
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
  },
  de: {
    translation: {
      app: {
        title: "Wörterbuch-Editor"
      },
      toolbar: {
        aria: "Editor-Symbolleiste",
        open: "Öffnen",
        save: "Speichern",
        saveAs: "Speichern unter",
        cancel: "Rückgängig",
        reapply: "Wiederholen",
        export: "Exportieren",
        import: "Importieren",
        showSettings: "Einstellungen anzeigen",
        hideSettings: "Einstellungen ausblenden",
        removeSelectedRows: "Ausgewählte Zeilen entfernen",
        language: "Sprache",
        showOnlyInvalid: "Nur Ungültige anzeigen"
      },
      settings: {
        title: "Einstellungen",
        aria: "Einstellungsbereich",
        showArticleColumn: "Artikelspalte anzeigen",
        showArticleColumnHint:
          "Wenn deaktiviert, wird empfohlen, Artikel aus der Konfiguration zu entfernen.",
        addLanguage: "Sprache hinzufügen",
        addArticle: "Artikel hinzufügen",
        removeItem: "Element entfernen",
        languageErrorEmpty: "Language cannot be empty",
        languageErrorExists: "Language \"{{language}}\" already exists",
        languageFrom: "Ausgangssprache",
        languagesTo: "Zielsprachen (kommagetrennt)",
        articles: "Artikel (kommagetrennt)",
        delimiter: "Trennzeichen",
        additionalInformationDelimiter: "Trennzeichen Zusatzinfo",
        translationDelimiter: "Trennzeichen Übersetzung",
        topicFlag: "Themen-Präfix",
        topicDelimiter: "Themen-Trennzeichen",
        rootTopic: "Stammthema"
      },
      actions: {
        addRow: "+ Zeile hinzufügen",
        addTopic: "+ Thema hinzufügen"
      },
      grid: {
        containerAria: "Rasterbereich",
        article: "Artikel",
        word: "Wort",
        additionalInfo: "Zusatzinfo",
        toLanguage: "Nach {{language}}"
      },
      status: {
        lastAction: "Letzte Aktion: {{action}}",
        file: "Datei: {{path}}",
        none: "Keine"
      },
      action: {
        open: "Öffnen",
        import: "Importieren",
        save: "Speichern",
        saveAs: "Speichern unter",
        cancel: "Rückgängig",
        reapply: "Wiederholen",
        export: "Exportieren",
        addRow: "Zeile hinzufügen",
        addTopic: "Thema hinzufügen",
        removeRow: "Zeile entfernen",
        removeSelectedRows: "Ausgewählte Zeilen entfernen",
        clearSelectedCells: "Ausgewählte Zellen leeren",
        autosaveRestored: "Autospeicher wiederhergestellt",
        copy: "Kopieren",
        copySelected: "Auswahl kopieren",
        pasteFailed: "Einfügen fehlgeschlagen",
        pasteInsert: "Einfügen",
        addTranslationColumn: "Übersetzungsspalte hinzufügen",
        reorderTranslationColumns: "Übersetzungsspalten neu anordnen",
        removeTranslationColumn: "Übersetzungsspalte entfernen",
        renameTranslationColumn: "Übersetzungsspalte umbenennen",
        cannotRemoveLastTranslationColumn: "Letzte Übersetzungsspalte kann nicht entfernt werden",
        languageNotFound: "Sprache \"{{language}}\" nicht gefunden",
        languageExists: "Sprache \"{{language}}\" existiert bereits",
        reorderTranslation: "Übersetzung neu anordnen",
        editTranslation: "Übersetzung bearbeiten",
        addTranslation: "Übersetzung hinzufügen",
        removeTranslation: "Übersetzung entfernen"
      },
      validation: {
        translationContainsColumnDelimiter:
          "Übersetzung enthält unerlaubtes Spaltentrennzeichen \"{{delimiter}}\"",
        containsColumnDelimiter: "Enthält unerlaubtes Spaltentrennzeichen \"{{delimiter}}\"",
        containsAdditionalInformationDelimiter:
          "Enthält unerlaubtes Zusatzinfo-Trennzeichen \"{{delimiter}}\"",
        containsTopicFlag: "Enthält unerlaubtes Themen-Präfix \"{{topicFlag}}\"",
        emptyTopicNotAllowed: "Leeres Thema ist nicht erlaubt",
        emptyWordNotAllowed: "Leeres Wort ist nicht erlaubt",
        emptyTranslationNotAllowed: "Leere Übersetzung ist nicht erlaubt",
        articleNotInConfig: "Artikel \"{{article}}\" ist nicht in den konfigurierten Artikeln"
      },
      translation: {
        renameColumn: "Spalte umbenennen",
        renameFailed: "Umbenennung fehlgeschlagen",
        deleteColumn: "Spalte löschen",
        saveRename: "Speichern",
        cancelRename: "Abbrechen",
        moveUp: "Nach oben",
        moveDown: "Nach unten",
        remove: "Übersetzung entfernen",
        add: "Übersetzung hinzufügen",
        removeRow: "Zeile entfernen"
      },
      languages: {
        en: "Englisch",
        de: "Deutsch",
        uk: "Ukrainisch"
      },
      topic: {
        new: "Neues Thema"
      },
      agGrid: {
        page: "Seite",
        more: "Mehr",
        to: "bis",
        of: "von",
        next: "Nächste",
        last: "Letzte",
        first: "Erste",
        previous: "Vorherige",
        loadingOoo: "Lädt...",
        selectAll: "Alle auswählen",
        searchOoo: "Suchen...",
        blanks: "(Leer)",
        noRowsToShow: "Keine Zeilen vorhanden"
      }
    }
  },
  uk: {
    translation: {
      app: {
        title: "Редактор словника"
      },
      toolbar: {
        aria: "Панель інструментів редактора",
        open: "Відкрити",
        save: "Зберегти",
        saveAs: "Зберегти як",
        cancel: "Скасувати",
        reapply: "Повторити",
        export: "Експорт",
        import: "Імпорт",
        showSettings: "Показати налаштування",
        hideSettings: "Сховати налаштування",
        removeSelectedRows: "Видалити вибрані рядки",
        language: "Мова",
        showOnlyInvalid: "Показати лише невалідні"
      },
      settings: {
        title: "Налаштування",
        aria: "Панель налаштувань",
        showArticleColumn: "Показувати стовпець артикля",
        showArticleColumnHint:
          "Якщо вимкнено, рекомендовано видалити артиклі з конфігурації.",
        addLanguage: "Додати мову",
        addArticle: "Додати артикль",
        removeItem: "Видалити елемент",
        languageErrorEmpty: "Language cannot be empty",
        languageErrorExists: "Language \"{{language}}\" already exists",
        languageFrom: "Мова джерела",
        languagesTo: "Мови перекладу (через кому)",
        articles: "Артиклі (через кому)",
        delimiter: "Роздільник",
        additionalInformationDelimiter: "Роздільник дод. інформації",
        translationDelimiter: "Роздільник перекладів",
        topicFlag: "Префікс теми",
        topicDelimiter: "Роздільник теми",
        rootTopic: "Коренева тема"
      },
      actions: {
        addRow: "+ Додати рядок",
        addTopic: "+ Додати тему"
      },
      grid: {
        containerAria: "Область таблиці",
        article: "Артикль",
        word: "Слово",
        additionalInfo: "Дод. інформація",
        toLanguage: "До {{language}}"
      },
      status: {
        lastAction: "Остання дія: {{action}}",
        file: "Файл: {{path}}",
        none: "Немає"
      },
      action: {
        open: "Відкрити",
        import: "Імпорт",
        save: "Зберегти",
        saveAs: "Зберегти як",
        cancel: "Скасувати",
        reapply: "Повторити",
        export: "Експорт",
        addRow: "Додати рядок",
        addTopic: "Додати тему",
        removeRow: "Видалити рядок",
        removeSelectedRows: "Видалити вибрані рядки",
        clearSelectedCells: "Очистити вибрані клітинки",
        autosaveRestored: "Автозбереження відновлено",
        copy: "Копіювати",
        copySelected: "Копіювати вибране",
        pasteFailed: "Помилка вставки",
        pasteInsert: "Вставка",
        addTranslationColumn: "Додати стовпець перекладу",
        reorderTranslationColumns: "Змінити порядок стовпців перекладу",
        removeTranslationColumn: "Видалити стовпець перекладу",
        renameTranslationColumn: "Перейменувати стовпець перекладу",
        cannotRemoveLastTranslationColumn: "Не можна видалити останній стовпець перекладу",
        languageNotFound: "Мову \"{{language}}\" не знайдено",
        languageExists: "Мова \"{{language}}\" вже існує",
        reorderTranslation: "Змінити порядок перекладу",
        editTranslation: "Редагувати переклад",
        addTranslation: "Додати переклад",
        removeTranslation: "Видалити переклад"
      },
      validation: {
        translationContainsColumnDelimiter:
          "Переклад містить заборонений роздільник стовпців \"{{delimiter}}\"",
        containsColumnDelimiter: "Містить заборонений роздільник стовпців \"{{delimiter}}\"",
        containsAdditionalInformationDelimiter:
          "Містить заборонений роздільник додаткової інформації \"{{delimiter}}\"",
        containsTopicFlag: "Містить заборонений префікс теми \"{{topicFlag}}\"",
        emptyTopicNotAllowed: "Порожня тема не дозволена",
        emptyWordNotAllowed: "Порожнє слово не дозволено",
        emptyTranslationNotAllowed: "Порожній переклад не дозволено",
        articleNotInConfig: "Артикль \"{{article}}\" відсутній у налаштованих артиклях"
      },
      translation: {
        renameColumn: "Перейменувати стовпець",
        renameFailed: "Не вдалося перейменувати",
        deleteColumn: "Видалити стовпець",
        saveRename: "Зберегти",
        cancelRename: "Скасувати",
        moveUp: "Вгору",
        moveDown: "Вниз",
        remove: "Видалити переклад",
        add: "Додати переклад",
        removeRow: "Видалити рядок"
      },
      languages: {
        en: "Англійська",
        de: "Німецька",
        uk: "Українська"
      },
      topic: {
        new: "Нова тема"
      },
      agGrid: {
        page: "Сторінка",
        more: "Більше",
        to: "до",
        of: "з",
        next: "Наступна",
        last: "Остання",
        first: "Перша",
        previous: "Попередня",
        loadingOoo: "Завантаження...",
        selectAll: "Вибрати все",
        searchOoo: "Пошук...",
        blanks: "(Порожньо)",
        noRowsToShow: "Немає рядків для відображення"
      }
    }
  }
} as const;

export type AppLanguage = keyof typeof resources;

