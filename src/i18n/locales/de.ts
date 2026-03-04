export const de = {
  translation: {
    app: {
      title: "Wörterbuch-Editor"
    },
    toolbar: {
      aria: "Editor-Symbolleiste",
      new: "Neu",
      open: "Öffnen",
      save: "Speichern",
      saveAs: "Speichern unter",
      cancel: "Abbrechen",
      reapply: "Wiederholen",
      export: "Exportieren",
      import: "Importieren",
      showSettings: "Einstellungen anzeigen",
      hideSettings: "Einstellungen ausblenden",
      removeSelectedRows: "Ausgewählte Zeilen entfernen",
      language: "Sprache",
      showOnlyInvalid: "Nur ungültig anzeigen"
    },
    settings: {
      title: "Einstellungen",
      aria: "Einstellungsfeld",
      showArticleColumn: "Artikelspalte anzeigen",
      showArticleColumnHint: "Wenn deaktiviert, wird empfohlen, Artikel aus der Konfiguration zu entfernen.",
      showAdditionalInformationColumn: "Spalte für zusätzliche Informationen anzeigen",
      addLanguage: "Sprache hinzufügen",
      addArticle: "Artikel hinzufügen",
      removeItem: "Artikel entfernen",
      languageErrorEmpty: "Sprache kann nicht leer sein",
      languageErrorExists: "Die Sprache „{{language}}“ existiert bereits",
      languageFrom: "Ausgangssprache",
      languagesTo: "Zielsprachen (durch Kommas getrennt)",
      articles: "Artikel (durch Kommas getrennt)",
      delimiter: "Spaltentrennzeichen",
      additionalInformationDelimiter: "Zusätzliches Informationstrennzeichen",
      translationDelimiter: "Übersetzungstrennzeichen",
      topicFlag: "Themenpräfix",
      topicDelimiter: "Thementrennzeichen",
      rootTopic: "Stammthema"
    },
    actions: {
      addRow: "+ Zeile hinzufügen",
      addTopic: "+ Thema hinzufügen"
    },
    grid: {
      containerAria: "Gitterbehälter",
      article: "Artikel",
      word: "Wort",
      additionalInfo: "Zusätzliche Informationen",
      toLanguage: "An {{language}}"
    },
    status: {
      lastAction: "Letzte Aktion: {{action}}",
      file: "Datei: {{path}}",
      none: "Keiner"
    },
    action: {
      new: "Neu",
      open: "Öffnen",
      import: "Importieren",
      save: "Speichern",
      saveAs: "Speichern unter",
      cancel: "Abbrechen",
      reapply: "Wiederholen",
      export: "Exportieren",
      addRow: "Zeile hinzufügen",
      addTopic: "Thema hinzufügen",
      removeRow: "Zeile entfernen",
      removeSelectedRows: "Ausgewählte Zeilen entfernen",
      clearSelectedCells: "Ausgewählte Zellen löschen",
      autosaveRestored: "Automatische Speicherung wiederhergestellt",
      copy: "Kopie",
      copySelected: "Ausgewählte kopieren",
      pasteFailed: "Das Einfügen ist fehlgeschlagen",
      pasteInsert: "Einfügen einfügen",
      addTranslationColumn: "Übersetzungsspalte hinzufügen",
      reorderTranslationColumns: "Übersetzungsspalten neu anordnen",
      removeTranslationColumn: "Übersetzungsspalte entfernen",
      renameTranslationColumn: "Übersetzungsspalte umbenennen",
      cannotRemoveLastTranslationColumn: "Die letzte Übersetzungsspalte kann nicht entfernt werden",
      languageNotFound: "Sprache „{{language}}“ nicht gefunden",
      languageExists: "Die Sprache „{{language}}“ existiert bereits",
      reorderTranslation: "Übersetzung neu anordnen",
      editTranslation: "Übersetzung bearbeiten",
      addTranslation: "Übersetzung hinzufügen",
      removeTranslation: "Übersetzung entfernen"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Die Übersetzung enthält das verbotene Spaltentrennzeichen „{{delimiter}}“.",
      containsColumnDelimiter: "Enthält das verbotene Spaltentrennzeichen „{{delimiter}}“.",
      containsAdditionalInformationDelimiter:
        "Enthält das verbotene zusätzliche Informationstrennzeichen „{{delimiter}}“",
      containsTopicFlag: "Enthält das verbotene Themenflag „{{topicFlag}}“",
      emptyTopicNotAllowed: "Leere Themen sind nicht zulässig",
      emptyWordNotAllowed: "Leere Wörter sind nicht erlaubt",
      emptyTranslationNotAllowed: "Eine leere Übersetzung ist nicht zulässig",
      articleNotInConfig: "Der Artikel „{{article}}“ ist nicht in den konfigurierten Artikeln enthalten"
    },
    translation: {
      renameColumn: "Spalte umbenennen",
      renameFailed: "Umbenennen fehlgeschlagen",
      deleteColumn: "Spalte löschen",
      saveRename: "Speichern",
      cancelRename: "Abbrechen",
      moveUp: "Bewegen Sie sich nach oben",
      moveDown: "Bewegen Sie sich nach unten",
      remove: "Übersetzung entfernen",
      add: "Übersetzung hinzufügen",
      removeRow: "Zeile entfernen"
    },
    dialog: {
      cancel: "Stornieren",
      ok: "Bestätigen"
    },
    clipboard: {
      confirmTooManyColumns:
        "Eingefügte Daten haben {{maxBufferColumns}} Spalten, aber nur {{availableColumns}} passen in die ausgewählte Zelle. Zusätzliche Spalten werden ignoriert. Weitermachen?",
      confirmOverwrite: "Einige Zielzellen enthalten bereits Daten. Durch das Einfügen werden vorhandene Werte überschrieben. Weitermachen?"
    },
    agGrid: {
      page: "Seite",
      more: "Mehr",
      to: "Zu",
      of: "von",
      next: "Nächste",
      last: "Zuletzt",
      first: "Erste",
      previous: "Vorherige",
      loadingOoo: "Laden...",
      selectAll: "Wählen Sie „Alle“ aus",
      searchOoo: "Suchen...",
      blanks: "(Leerzeichen)",
      noRowsToShow: "Keine Zeilen zum Anzeigen"
    }
  }
} as const;








