export const nl = {
  translation: {
    app: {
      title: "Woordenboek-editor"
    },
    toolbar: {
      aria: "Werkbalk Editor",
      new: "Nieuw",
      open: "Openen",
      save: "Opslaan",
      saveAs: "Opslaan als",
      cancel: "Annuleren",
      reapply: "Opnieuw toepassen",
      export: "Exporteren",
      import: "Importeren",
      showSettings: "Instellingen tonen",
      hideSettings: "Instellingen verbergen",
      removeSelectedRows: "Geselecteerde rijen verwijderen",
      language: "Taal",
      showOnlyInvalid: "Alleen weergeven Ongeldig"
    },
    settings: {
      title: "Instellingen",
      aria: "Paneel Instellingen",
      showArticleColumn: "Kolom voor lidwoord tonen",
      showArticleColumnHint: "Indien uitgeschakeld, wordt aanbevolen om artikelen uit config te verwijderen.",
      showAdditionalInformationColumn: "Kolom met aanvullende informatie tonen",
      addLanguage: "Taal toevoegen",
      addArticle: "Artikel toevoegen",
      removeItem: "Artikel verwijderen",
      languageErrorEmpty: "Taal kan niet leeg zijn",
      languageErrorExists: "Taal \"{{language}}\" bestaat al",
      languageFrom: "Brontaal",
      languagesTo: "Doeltalen (door komma's gescheiden)",
      articles: "Artikelen (door komma's gescheiden)",
      delimiter: "Kolomscheidingsteken",
      additionalInformationDelimiter: "Scheidingsteken voor aanvullende informatie",
      translationDelimiter: "Vertaalscheidingsteken",
      topicFlag: "Onderwerpvoorvoegsel",
      topicDelimiter: "Onderwerpscheidingsteken",
      rootTopic: "Root-onderwerp"
    },
    actions: {
      addRow: "+ Rij toevoegen",
      addTopic: "+ Onderwerp toevoegen"
    },
    grid: {
      containerAria: "Rastercontainer",
      article: "Lidwoord",
      word: "Woord",
      additionalInfo: "Aanvullende informatie",
      toLanguage: "Naar {{language}}"
    },
    status: {
      lastAction: "Laatste actie: {{action}}",
      file: "Bestand: {{path}}",
      none: "Geen"
    },
    action: {
      new: "Nieuw",
      open: "Openen",
      import: "Importeren",
      save: "Opslaan",
      saveAs: "Opslaan als",
      cancel: "Annuleren",
      reapply: "Opnieuw toepassen",
      export: "Exporteren",
      addRow: "Rij toevoegen",
      addTopic: "Onderwerp toevoegen",
      removeRow: "Rij verwijderen",
      removeSelectedRows: "Geselecteerde rijen verwijderen",
      clearSelectedCells: "Wis geselecteerde cellen",
      autosaveRestored: "Automatisch opslaan hersteld",
      copy: "Kopiëren",
      copySelected: "Kopieer geselecteerd",
      pasteFailed: "Plakken is mislukt",
      pasteInsert: "Plak het invoegsel",
      addTranslationColumn: "Vertaalkolom toevoegen",
      reorderTranslationColumns: "Vertaalkolommen opnieuw rangschikken",
      removeTranslationColumn: "Vertaalkolom verwijderen",
      renameTranslationColumn: "Hernoem de vertaalkolom",
      cannotRemoveLastTranslationColumn: "Kan de laatste vertaalkolom niet verwijderen",
      languageNotFound: "Taal \"{{language}}\" niet gevonden",
      languageExists: "Taal \"{{language}}\" bestaat al",
      reorderTranslation: "Vertaling opnieuw ordenen",
      editTranslation: "Vertaling bewerken",
      addTranslation: "Vertaling toevoegen",
      removeTranslation: "Vertaling verwijderen"
    },
    validation: {
      translationContainsColumnDelimiter:
        "De vertaling bevat het verboden kolomscheidingsteken \"{{delimiter}}\"",
      containsColumnDelimiter: "Bevat het verboden kolomscheidingsteken \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Bevat verboden aanvullende informatiescheidingsteken \"{{delimiter}}\"",
      containsTopicFlag: "Bevat verboden onderwerpvlag \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Een leeg onderwerp is niet toegestaan",
      emptyWordNotAllowed: "Een leeg woord is niet toegestaan",
      emptyTranslationNotAllowed: "Lege vertalingen zijn niet toegestaan",
      articleNotInConfig: "Artikel \"{{article}}\" staat niet in geconfigureerde artikelen"
    },
    translation: {
      renameColumn: "Kolom hernoemen",
      renameFailed: "Naam wijzigen is mislukt",
      deleteColumn: "Kolom verwijderen",
      saveRename: "Opslaan",
      cancelRename: "Annuleren",
      moveUp: "Ga omhoog",
      moveDown: "Ga naar beneden",
      remove: "Vertaling verwijderen",
      add: "Vertaling toevoegen",
      removeRow: "Rij verwijderen"
    },
    dialog: {
      cancel: "Annuleren",
      ok: "Bevestigen"
    },
    clipboard: {
      confirmTooManyColumns:
        "Geplakte gegevens hebben {{maxBufferColumns}} kolommen, maar alleen {{availableColumns}} past in de geselecteerde cel. Extra kolommen worden genegeerd. Doorgaan?",
      confirmOverwrite: "Sommige doelcellen bevatten al gegevens. Door te plakken worden bestaande waarden overschreven. Doorgaan?"
    },
    agGrid: {
      page: "Pagina",
      more: "Meer",
      to: "naar",
      of: "van",
      next: "Volgende",
      last: "Laatst",
      first: "Eerst",
      previous: "Vorig",
      loadingOoo: "Laden...",
      selectAll: "Selecteer Alles",
      searchOoo: "Zoekopdracht...",
      blanks: "(spaties)",
      noRowsToShow: "Er zijn geen rijen om weer te geven"
    }
  }
} as const;








