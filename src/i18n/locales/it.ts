export const it = {
  translation: {
    app: {
      title: "Redattore del dizionario"
    },
    toolbar: {
      aria: "Barra degli strumenti dell'editor",
      new: "Nuovo",
      open: "Apri",
      save: "Salva",
      saveAs: "Salva con nome",
      cancel: "Annulla",
      reapply: "Riapplica",
      export: "Esporta",
      import: "Importa",
      showAiPanel: "Apri bozza IA",
      hideAiPanel: "Chiudi bozza IA",
      showSettings: "Mostra Impostazioni",
      hideSettings: "Nascondi impostazioni",
      removeSelectedRows: "Rimuovi righe selezionate",
      language: "Lingua",
      showOnlyInvalid: "Mostra solo non valido",
      noInvalidRows: "Non ci sono righe non valide",
      selectRowsToRemove: "Seleziona le righe da rimuovere",
    },
    settings: {
      title: "Impostazioni",
      aria: "Pannello Impostazioni",
      showArticleColumn: "Mostra colonna articolo",
      showArticleColumnHint: "Se disabilitato, si consiglia di rimuovere gli articoli dalla configurazione.",
      showAdditionalInformationColumn: "Mostra colonna informazioni aggiuntive",
      addLanguage: "Aggiungi lingua",
      addArticle: "Aggiungi articolo",
      removeItem: "Rimuovi l'articolo",
      languageErrorEmpty: "La lingua non può essere vuota",
      languageErrorExists: "La lingua \"{{language}}\" esiste già",
      languageFrom: "Lingua di partenza",
      languagesTo: "Lingue di destinazione",
      articles: "Articoli",
      delimiter: "Delimitatore di colonna",
      additionalInformationDelimiter: "Delimitatore di informazioni aggiuntive",
      translationDelimiter: "Delimitatore di traduzione",
      topicFlag: "Prefisso argomento",
      topicDelimiter: "Delimitatore di argomento"
    },
    courseHeader: {
      aria: "Corso",
      courseName: "Nome del corso"
    },
    actions: {
      addRow: "+ Aggiungi parola",
      addTopic: "+ Aggiungi argomento"
    },
    aiPanel: {
      title: "Bozza AI",
      requestSection: "Richiesta",
      requestMode: "Modalità",
      requestModeAuto: "Automatica",
      requestModeVocabulary: "Generazione completa",
      requestModeTranslations: "Solo traduzioni",
      parsingSection: "Analisi",
      responseSection: "Risposta",
      topic: "Argomento",
      wordCount: "Parole",
      requestNotes: "Istruzioni",
      request: "Richiesta",
      generateRequest: "Genera richiesta",
      linePrefixPreset: "Prefisso riga",
      patternBuilder: "Schema riga",
      patternGap: "Separatore schema",
      patternSeparatorNone: "(nessuno)",
      patternSeparatorTab: "Tabulazione",
      addField: "Aggiungi campo",
      moveLeft: "Sposta a sinistra",
      moveRight: "Sposta a destra",
      removeField: "Rimuovi campo",
      patternPreview: "Forma della riga",
      parseDelimiterHint: "Le traduzioni multiple vengono divise usando “{{delimiter}}” dalle impostazioni.",
      parseDelimiterHintNone: "Le traduzioni multiple non vengono divise perché il delimitatore di traduzione è vuoto nelle impostazioni.",
      suggestPattern: "Suggerisci schema",
      patternSuggested: "Lo schema corrisponde a {{matched}}/{{total}} righe",
      parseResponse: "Analizza risposta",
      response: "Risposta modificabile",
      parseError: "Impossibile analizzare la risposta",
      parsedRows: "{{count}} righe analizzate",
      parseResultNotParsedPrefix: "Non analizzato:",
      parseResultNotParsed: "Non analizzato:\n{{lines}}",
      parseResultAllParsed: "Tutte le righe non vuote sono state analizzate.",
      parseResultEmpty: "La risposta è vuota",
      parseResultNoMatch: "Nessuna riga corrisponde ai preset regex",
      parseResultMatched: "Preset regex corrispondenti",
      parsingConfigurationMissingPattern: "La configurazione di analisi AI non ha uno schema elemento",
      fillTranslations: "Compila traduzioni",
      addRows: "Aggiungi alla tabella",
      moreActions: "Altre azioni",
      replaceRows: "Sostituisci tabella",
      replaceConfirm: "Sostituire tutte le righe attuali della tabella con le righe della risposta AI?"
    },
    aiPrompt: {
      taskVocabulary: "Attività: crea righe di vocabolario concise.",
      taskTranslation: "Attività: traduci le parole elencate.",
      requirementsLine: "Requisiti: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Includi traduzioni per tutte le lingue di destinazione.",
      multipleTranslationsAllowed: "Sono consentite più traduzioni per lingua.",
      addBriefNotes: "Aggiungi brevi note solo quando utili, ad esempio plurali, flessioni o uso.",
      includeArticlesWhenNatural: "Se gli articoli sono naturali nella lingua di origine, includili.",
      course: "Corso: {{course}}",
      topic: "Argomento: {{topic}}",
      entryCount: "Numero di voci: {{count}}",
      sourceLanguage: "Lingua di origine: {{language}}",
      targetLanguages: "Lingue di destinazione: {{languages}}",
      words: "Parole:"
    },
    grid: {
      containerAria: "Contenitore a griglia",
      article: "Articolo",
      word: "Parola",
      additionalInfo: "Informazioni aggiuntive",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "Ultima azione: {{action}}",
      file: "Percorso file: {{path}}",
      none: "Nessuno"
    },
    action: {
      new: "Nuovo",
      open: "Apri",
      import: "Importa",
      save: "Salva",
      saveAs: "Salva con nome",
      cancel: "Annulla",
      reapply: "Riapplica",
      export: "Esporta",
      addRow: "Aggiungi parola",
      addTopic: "Aggiungi argomento",
      removeRow: "Rimuovi riga",
      removeSelectedRows: "Rimuovi righe selezionate",
      clearSelectedCells: "Cancella celle selezionate",
      autosaveRestored: "Salvataggio automatico ripristinato",
      copy: "Copia",
      copySelected: "Copia selezionata",
      pasteFailed: "Incolla non riuscito",
      pasteInsert: "Incolla Inserisci",
      addAiRows: "Aggiungi righe IA",
      replaceAiRows: "Sostituisci con righe IA",
      generateAiRequest: "Genera richiesta IA",
      parseAiRegex: "Analizza risposta IA",
      addTranslationColumn: "Aggiungi colonna di traduzione",
      reorderTranslationColumns: "Riordina le colonne di traduzione",
      removeTranslationColumn: "Rimuovi la colonna di traduzione",
      renameTranslationColumn: "Rinomina colonna di traduzione",
      cannotRemoveLastTranslationColumn: "Impossibile rimuovere l'ultima colonna di traduzione",
      languageNotFound: "Lingua \"{{language}}\" non trovata",
      languageExists: "La lingua \"{{language}}\" esiste già",
      reorderTranslation: "Riordina la traduzione",
      editTranslation: "Modifica traduzione",
      addTranslation: "Aggiungi traduzione",
      removeTranslation: "Rimuovi la traduzione"
    },
    validation: {
      translationContainsColumnDelimiter:
        "La traduzione contiene un delimitatore di colonna vietato \"{{delimiter}}\"",
      containsColumnDelimiter: "Contiene il delimitatore di colonna vietato \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Contiene informazioni aggiuntive vietate delimitatore \"{{delimiter}}\"",
      containsTopicFlag: "Contiene il flag di argomento proibito \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Non è consentito un argomento vuoto",
      emptyWordNotAllowed: "Non è consentita la parola vuota",
      emptyTranslationNotAllowed: "Non è consentita la traduzione vuota",
      articleNotInConfig: "L'articolo \"{{article}}\" non è presente negli articoli configurati"
    },
    translation: {
      renameColumn: "Rinomina colonna",
      renameFailed: "Rinomina non riuscita",
      deleteColumn: "Elimina colonna",
      saveRename: "Salva",
      cancelRename: "Annulla",
      moveUp: "Vai su",
      moveDown: "Spostati giù",
      remove: "Rimuovi la traduzione",
      add: "Aggiungi traduzione",
      removeRow: "Rimuovi riga"
    },
    dialog: {
      cancel: "Cancellare",
      ok: "Conferma"
    },
    clipboard: {
      confirmTooManyColumns:
        "I dati incollati hanno {{maxBufferColumns}} colonne, ma solo {{availableColumns}} si adattano alla cella selezionata. Le colonne aggiuntive verranno ignorate. Continuare?",
      confirmOverwrite: "Alcune celle obiettivo contengono già dati. Incollare sovrascriverà i valori esistenti. Continuare?"
    },
    agGrid: {
      page: "Pagina",
      more: "Di più",
      to: "A",
      of: "Di",
      next: "Prossimo",
      last: "Scorso",
      first: "Primo",
      previous: "Precedente",
      loadingOoo: "Caricamento...",
      selectAll: "Seleziona tutto",
      searchOoo: "Ricerca...",
      blanks: "(Vuoti)",
      noRowsToShow: "Nessuna riga da mostrare",
      pageSizeSelectorLabel: "Dimensione pagina:",
      ariaPageSizeSelectorLabel: "Dimensione pagina"
    }
  }
} as const;








