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
      showSettings: "Pokaż ustawienia",
      hideSettings: "Ukryj ustawienia",
      removeSelectedRows: "Usuń wybrane wiersze",
      language: "Język",
      showOnlyInvalid: "Pokaż tylko nieprawidłowe"
    },
    settings: {
      title: "Ustawienia",
      aria: "Panel ustawień",
      showArticleColumn: "Pokaż kolumnę rodzajnika",
      showArticleColumnHint: "Jeśli wyłączone, zaleca się usunięcie artykułów z konfiguracji.",
      showAdditionalInformationColumn: "Pokaż kolumnę dodatkowych informacji",
      addLanguage: "Dodaj język",
      addArticle: "Dodaj artykuł",
      removeItem: "Usuń element",
      languageErrorEmpty: "Język nie może być pusty",
      languageErrorExists: "Język „{{language}}” już istnieje",
      languageFrom: "Język źródłowy",
      languagesTo: "Języki docelowe (oddzielone przecinkami)",
      articles: "Artykuły (oddzielone przecinkami)",
      delimiter: "Ogranicznik kolumny",
      additionalInformationDelimiter: "Dodatkowy ogranicznik informacji",
      translationDelimiter: "Ogranicznik tłumaczenia",
      topicFlag: "Przedrostek tematu",
      topicDelimiter: "Ogranicznik tematu",
      rootTopic: "Temat główny"
    },
    actions: {
      addRow: "+ Dodaj wiersz",
      addTopic: "+ Dodaj temat"
    },
    grid: {
      containerAria: "Pojemnik z siatką",
      article: "Rodzajnik",
      word: "Słowo",
      additionalInfo: "Dodatkowe informacje",
      toLanguage: "Do {{language}}"
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
      addRow: "Dodaj wiersz",
      addTopic: "Dodaj temat",
      removeRow: "Usuń wiersz",
      removeSelectedRows: "Usuń wybrane wiersze",
      clearSelectedCells: "Wyczyść wybrane komórki",
      autosaveRestored: "Przywrócono automatyczne zapisywanie",
      copy: "Kopia",
      copySelected: "Kopiuj wybrane",
      pasteFailed: "Wklejanie nie powiodło się",
      pasteInsert: "Wklej wstawkę",
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
      articleNotInConfig: "Artykułu „{{article}}” nie ma w skonfigurowanych artykułach"
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
    },    topic: {
      new: "Nowy temat"
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
      noRowsToShow: "Brak wierszy do pokazania"
    }
  }
} as const;







