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
      showAiPanel: "AI-Entwurf öffnen",
      hideAiPanel: "AI-Entwurf schließen",
      showSettings: "Einstellungen anzeigen",
      hideSettings: "Einstellungen ausblenden",
      removeSelectedRows: "Ausgewählte Zeilen entfernen",
      language: "Sprache",
      showOnlyInvalid: "Nur ungültig anzeigen",
      noInvalidRows: "Es gibt keine ungültigen Zeilen",
      selectRowsToRemove: "Zeilen zum Entfernen auswählen",
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
      languagesTo: "Zielsprachen",
      articles: "Artikel",
      delimiter: "Spaltentrennzeichen",
      additionalInformationDelimiter: "Zusätzliches Informationstrennzeichen",
      translationDelimiter: "Übersetzungstrennzeichen",
      topicFlag: "Themenpräfix",
      topicDelimiter: "Thementrennzeichen"
    },
    courseHeader: {
      aria: "Kurs",
      courseName: "Kursname"
    },
    actions: {
      addRow: "+ Wort hinzufügen",
      addTopic: "+ Thema hinzufügen"
    },
    aiPanel: {
      title: "AI-Entwurf",
      requestSection: "Anfrage",
      requestMode: "Modus",
      requestModeAuto: "Automatisch",
      requestModeVocabulary: "Vollständige Generierung",
      requestModeTranslations: "Nur Übersetzungen",
      parsingSection: "Analyse",
      responseSection: "Antwort",
      topic: "Thema",
      wordCount: "Wörter",
      requestNotes: "Anweisungen",
      request: "Anfrage",
      generateRequest: "Anfrage generieren",
      sendRequest: "Anfrage senden",
      sendingRequest: "Anfrage wird gesendet…",
      requestFailed: "Die KI-Anfrage ist fehlgeschlagen.",
      requestTimedOut: "Zeitüberschreitung bei der KI-Anfrage.",
      patternBuilder: "Zeilenmuster",
      patternGap: "Mustertrennzeichen",
      fieldPrefix: "Feldpräfix",
      fieldSuffix: "Feldsuffix",
      fieldPrefixNamed: "{{field}}-Präfix",
      fieldSuffixNamed: "{{field}}-Suffix",
      patternSeparator: "Mustertrennzeichen",
      patternSeparatorNone: "(keins)",
      patternSeparatorTab: "Tabulator",
      addField: "Feld hinzufügen",
      moveLeft: "Nach links",
      moveRight: "Nach rechts",
      removeField: "Feld entfernen",
      patternPreview: "Zeilenform",
      parseDelimiterHint: "Mehrere Übersetzungen werden mit „{{delimiter}}“ aus den Einstellungen getrennt.",
      parseDelimiterHintNone: "Mehrere Übersetzungen werden nicht getrennt, weil das Übersetzungstrennzeichen in den Einstellungen leer ist.",
      suggestPattern: "Muster vorschlagen",
      patternSuggested: "Muster passte auf {{matched}}/{{total}} Zeilen",
      parseResponse: "Antwort analysieren",
      response: "Bearbeitbare Antwort",
      parseError: "Antwort konnte nicht analysiert werden",
      parsedRows: "{{count}} Zeilen analysiert",
      parseResultNotParsedPrefix: "Nicht analysiert:",
      parseResultNotParsed: "Nicht analysiert:\n{{lines}}",
      parseResultAllParsed: "Alle nicht leeren Zeilen wurden analysiert.",
      parseResultEmpty: "Antwort ist leer",
      parseResultNoMatch: "Keine Zeilen passten zu Regex-Voreinstellungen",
      parseResultMatched: "Passende Regex-Voreinstellungen",
      parsingConfigurationMissingPattern: "AI-Analysekonfiguration hat kein Elementmuster",
      fillTranslations: "Übersetzungen ausfüllen",
      addRows: "Zur Tabelle hinzufügen",
      moreActions: "Weitere Aktionen",
      replaceRows: "Tabelle ersetzen",
      replaceConfirm: "Alle aktuellen Tabellenzeilen durch Zeilen aus der AI-Antwort ersetzen?"
    },
    aiPrompt: {
      taskVocabulary: "Aufgabe: Prägnante Vokabelzeilen erstellen.",
      taskTranslation: "Aufgabe: Die aufgelisteten Wörter übersetzen.",
      requirementsLine: "Anforderungen: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Übersetzungen für alle Zielsprachen einschließen.",
      multipleTranslationsAllowed: "Mehrere Übersetzungen pro Sprache sind erlaubt.",
      addBriefNotes: "Kurze Hinweise nur hinzufügen, wenn sie nützlich sind, z. B. Pluralformen, Flexion oder Verwendung.",
      includeArticlesWhenNatural: "Wenn Artikel in der Ausgangssprache üblich sind, einschließen.",
      course: "Kurs: {{course}}",
      topic: "Thema: {{topic}}",
      entryCount: "Anzahl der Einträge: {{count}}",
      sourceLanguage: "Ausgangssprache: {{language}}",
      targetLanguages: "Zielsprachen: {{languages}}",
      words: "Wörter:"
    },
    grid: {
      containerAria: "Gitterbehälter",
      article: "Artikel",
      word: "Wort",
      additionalInfo: "Zusätzliche Informationen",
      toLanguage: "{{language}}"
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
      addRow: "Wort hinzufügen",
      addTopic: "Thema hinzufügen",
      removeRow: "Zeile entfernen",
      removeSelectedRows: "Ausgewählte Zeilen entfernen",
      clearSelectedCells: "Ausgewählte Zellen löschen",
      autosaveRestored: "Automatische Speicherung wiederhergestellt",
      copy: "Kopie",
      copySelected: "Ausgewählte kopieren",
      pasteFailed: "Das Einfügen ist fehlgeschlagen",
      pasteInsert: "Einfügen einfügen",
      addAiRows: "AI-Zeilen hinzufügen",
      replaceAiRows: "Durch AI-Zeilen ersetzen",
      generateAiRequest: "AI-Anfrage generieren",
      parseAiRegex: "AI-Antwort analysieren",
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
      noRowsToShow: "Keine Zeilen zum Anzeigen",
      pageSizeSelectorLabel: "Seitengröße:",
      ariaPageSizeSelectorLabel: "Seitengröße"
    }
  }
} as const;








