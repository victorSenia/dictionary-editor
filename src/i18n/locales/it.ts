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
      showSettings: "Mostra Impostazioni",
      hideSettings: "Nascondi impostazioni",
      removeSelectedRows: "Rimuovi righe selezionate",
      language: "Lingua",
      showOnlyInvalid: "Mostra solo non valido"
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
      languagesTo: "Lingue di destinazione (separate da virgole)",
      articles: "Articoli (separati da virgole)",
      delimiter: "Delimitatore di colonna",
      additionalInformationDelimiter: "Delimitatore di informazioni aggiuntive",
      translationDelimiter: "Delimitatore di traduzione",
      topicFlag: "Prefisso argomento",
      topicDelimiter: "Delimitatore di argomento",
      rootTopic: "Argomento principale"
    },
    actions: {
      addRow: "+ Aggiungi riga",
      addTopic: "+ Aggiungi argomento"
    },
    grid: {
      containerAria: "Contenitore a griglia",
      article: "Articolo",
      word: "Parola",
      additionalInfo: "Informazioni aggiuntive",
      toLanguage: "A {{language}}"
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
      addRow: "Aggiungi riga",
      addTopic: "Aggiungi argomento",
      removeRow: "Rimuovi riga",
      removeSelectedRows: "Rimuovi righe selezionate",
      clearSelectedCells: "Cancella celle selezionate",
      autosaveRestored: "Salvataggio automatico ripristinato",
      copy: "Copia",
      copySelected: "Copia selezionata",
      pasteFailed: "Incolla non riuscito",
      pasteInsert: "Incolla Inserisci",
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
    },    topic: {
      new: "Nuovo argomento"
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
      noRowsToShow: "Nessuna riga da mostrare"
    }
  }
} as const;








