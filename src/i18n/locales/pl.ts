export const pl = {
  translation: {
    app: {
      title: "Edytor słownika"
    },
    toolbar: {
      aria: "Pasek narzędzi edytora",
      new: "Nowy",
      open: "Otwórz",
      save: "Zapisz",
      saveAs: "Zapisz jako",
      cancel: "Anuluj",
      reapply: "Zastosuj ponownie",
      export: "Eksportuj",
      import: "Importuj",
      showAiPanel: "Otwórz szkic AI",
      hideAiPanel: "Zamknij szkic AI",
      showSettings: "Pokaż ustawienia",
      hideSettings: "Ukryj ustawienia",
      removeSelectedRows: "Usuń wybrane wiersze",
      language: "Język",
      showOnlyInvalid: "Pokaż tylko nieprawidłowe",
      noInvalidRows: "Nie ma nieprawidłowych wierszy",
      selectRowsToRemove: "Wybierz wiersze do usunięcia",
    },
    settings: {
      title: "Ustawienia",
      aria: "Panel ustawień",
      showArticleColumn: "Pokaż kolumnę rodzajnika",
      showArticleColumnHint: "Jeśli wyłączone, zaleca się usunięcie rodzajników z konfiguracji.",
      showAdditionalInformationColumn: "Pokaż kolumnę dodatkowych informacji",
      addLanguage: "Dodaj język",
      addArticle: "Dodaj rodzajnik",
      removeItem: "Usuń element",
      languageErrorEmpty: "Język nie może być pusty",
      languageErrorExists: "Język „{{language}}” już istnieje",
      languageFrom: "Język źródłowy",
      languagesTo: "Języki docelowe",
      articles: "Rodzajniki",
      delimiter: "Ogranicznik kolumny",
      additionalInformationDelimiter: "Dodatkowy ogranicznik informacji",
      translationDelimiter: "Ogranicznik tłumaczenia",
      topicFlag: "Przedrostek tematu",
      topicDelimiter: "Ogranicznik tematu"
    },
    courseHeader: {
      aria: "Kurs",
      courseName: "Nazwa kursu"
    },
    actions: {
      addRow: "+ Dodaj słowo",
      addTopic: "+ Dodaj temat"
    },
    aiPanel: {
      title: "Szkic AI",
      requestSection: "Żądanie",
      requestMode: "Tryb",
      requestModeAuto: "Automatycznie",
      requestModeVocabulary: "Pełne generowanie",
      requestModeTranslations: "Tylko tłumaczenia",
      parsingSection: "Parsowanie",
      responseSection: "Odpowiedź",
      topic: "Temat",
      wordCount: "Słowa",
      requestNotes: "Instrukcje",
      request: "Żądanie",
      generateRequest: "Wygeneruj żądanie",
      linePrefixPreset: "Prefiks wiersza",
      patternBuilder: "Wzorzec wiersza",
      patternGap: "Separator wzorca",
      patternSeparatorNone: "(brak)",
      patternSeparatorTab: "Tabulator",
      addField: "Dodaj pole",
      moveLeft: "Przenieś w lewo",
      moveRight: "Przenieś w prawo",
      removeField: "Usuń pole",
      patternPreview: "Kształt wiersza",
      parseDelimiterHint: "Wiele tłumaczeń jest dzielonych przy użyciu „{{delimiter}}” z ustawień.",
      parseDelimiterHintNone: "Wiele tłumaczeń nie jest dzielonych, ponieważ ogranicznik tłumaczenia w ustawieniach jest pusty.",
      suggestPattern: "Zaproponuj wzorzec",
      patternSuggested: "Wzorzec dopasował {{matched}}/{{total}} wierszy",
      parseResponse: "Przeanalizuj odpowiedź",
      response: "Edytowalna odpowiedź",
      parseError: "Nie można przeanalizować odpowiedzi",
      parsedRows: "Przeanalizowano {{count}} wierszy",
      parseResultNotParsedPrefix: "Nie przeanalizowano:",
      parseResultNotParsed: "Nie przeanalizowano:\n{{lines}}",
      parseResultAllParsed: "Wszystkie niepuste wiersze zostały przeanalizowane.",
      parseResultEmpty: "Odpowiedź jest pusta",
      parseResultNoMatch: "Żaden wiersz nie pasował do presetów regex",
      parseResultMatched: "Dopasowane presety regex",
      parsingConfigurationMissingPattern: "Konfiguracja parsowania AI nie ma wzorca elementu",
      fillTranslations: "Uzupełnij tłumaczenia",
      addRows: "Dodaj do tabeli",
      moreActions: "Więcej działań",
      replaceRows: "Zastąp tabelę",
      replaceConfirm: "Zastąpić wszystkie bieżące wiersze tabeli wierszami z odpowiedzi AI?"
    },
    aiPrompt: {
      taskVocabulary: "Zadanie: Utwórz zwięzłe wiersze słownictwa.",
      taskTranslation: "Zadanie: Przetłumacz wymienione słowa.",
      requirementsLine: "Wymagania: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Uwzględnij tłumaczenia dla wszystkich języków docelowych.",
      multipleTranslationsAllowed: "Dozwolonych jest wiele tłumaczeń na język.",
      addBriefNotes: "Dodaj krótkie notatki tylko wtedy, gdy są przydatne, np. formy liczby mnogiej, odmianę lub użycie.",
      includeArticlesWhenNatural: "Jeśli rodzajniki są naturalne w języku źródłowym, uwzględnij je.",
      course: "Kurs: {{course}}",
      topic: "Temat: {{topic}}",
      entryCount: "Liczba wpisów: {{count}}",
      sourceLanguage: "Język źródłowy: {{language}}",
      targetLanguages: "Języki docelowe: {{languages}}",
      words: "Słowa:"
    },
    grid: {
      containerAria: "Pojemnik z siatką",
      article: "Rodzajnik",
      word: "Słowo",
      additionalInfo: "Dodatkowe informacje",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "Ostatnia akcja: {{action}}",
      file: "Plik: {{path}}",
      none: "Nic"
    },
    action: {
      new: "Nowy",
      open: "Otwórz",
      import: "Importuj",
      save: "Zapisz",
      saveAs: "Zapisz jako",
      cancel: "Anuluj",
      reapply: "Zastosuj ponownie",
      export: "Eksportuj",
      addRow: "Dodaj słowo",
      addTopic: "Dodaj temat",
      removeRow: "Usuń wiersz",
      removeSelectedRows: "Usuń wybrane wiersze",
      clearSelectedCells: "Wyczyść wybrane komórki",
      autosaveRestored: "Przywrócono automatyczne zapisywanie",
      copy: "Kopia",
      copySelected: "Kopiuj wybrane",
      pasteFailed: "Wklejanie nie powiodło się",
      pasteInsert: "Wklej wstawkę",
      addAiRows: "Dodaj wiersze AI",
      replaceAiRows: "Zastąp wierszami AI",
      generateAiRequest: "Wygeneruj żądanie AI",
      parseAiRegex: "Przeanalizuj odpowiedź AI",
      addTranslationColumn: "Dodaj kolumnę tłumaczenia",
      reorderTranslationColumns: "Zmień kolejność kolumn tłumaczeń",
      removeTranslationColumn: "Usuń kolumnę tłumaczenia",
      renameTranslationColumn: "Zmień nazwę kolumny tłumaczenia",
      cannotRemoveLastTranslationColumn: "Nie można usunąć ostatniej kolumny tłumaczenia",
      languageNotFound: "Nie znaleziono języka „{{language}}”.",
      languageExists: "Język „{{language}}” już istnieje",
      reorderTranslation: "Zmień kolejność tłumaczenia",
      editTranslation: "Edytuj tłumaczenie",
      addTranslation: "Dodaj tłumaczenie",
      removeTranslation: "Usuń tłumaczenie"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Tłumaczenie zawiera zabroniony ogranicznik kolumny „{{delimiter}}”",
      containsColumnDelimiter: "Zawiera zabroniony ogranicznik kolumny „{{delimiter}}”",
      containsAdditionalInformationDelimiter:
        "Zawiera niedozwolony ogranicznik informacji dodatkowych „{{delimiter}}”",
      containsTopicFlag: "Zawiera flagę zabronionego tematu „{{topicFlag}}”",
      emptyTopicNotAllowed: "Pusty temat nie jest dozwolony",
      emptyWordNotAllowed: "Puste słowo jest niedozwolone",
      emptyTranslationNotAllowed: "Puste tłumaczenie jest niedozwolone",
      articleNotInConfig: "Rodzajnika „{{article}}” nie ma w skonfigurowanych rodzajnikach"
    },
    translation: {
      renameColumn: "Zmień nazwę kolumny",
      renameFailed: "Zmiana nazwy nie powiodła się",
      deleteColumn: "Usuń kolumnę",
      saveRename: "Zapisz",
      cancelRename: "Anuluj",
      moveUp: "Podnieść",
      moveDown: "Opuszczać",
      remove: "Usuń tłumaczenie",
      add: "Dodaj tłumaczenie",
      removeRow: "Usuń wiersz"
    },
    dialog: {
      cancel: "Anulować",
      ok: "Potwierdź"
    },
    clipboard: {
      confirmTooManyColumns:
        "Wklejone dane mają {{maxBufferColumns}} kolumn, ale z wybranej komórki pasują tylko {{availableColumns}}. Dodatkowe kolumny zostaną zignorowane. Kontynuować?",
      confirmOverwrite: "Niektóre komórki docelowe zawierają już dane. Wklejenie spowoduje nadpisanie istniejących wartości. Kontynuować?"
    },
    agGrid: {
      page: "Strona",
      more: "Więcej",
      to: "Do",
      of: "z",
      next: "Następny",
      last: "Ostatni",
      first: "Pierwszy",
      previous: "Poprzedni",
      loadingOoo: "Załadunek...",
      selectAll: "Wybierz wszystko",
      searchOoo: "Szukaj...",
      blanks: "(Puste miejsca)",
      noRowsToShow: "Brak wierszy do pokazania",
      pageSizeSelectorLabel: "Rozmiar strony:",
      ariaPageSizeSelectorLabel: "Rozmiar strony"
    }
  }
} as const;







