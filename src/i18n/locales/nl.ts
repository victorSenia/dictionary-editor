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
      showAiPanel: "AI-concept openen",
      hideAiPanel: "AI-concept sluiten",
      showSettings: "Instellingen tonen",
      hideSettings: "Instellingen verbergen",
      removeSelectedRows: "Geselecteerde rijen verwijderen",
      language: "Taal",
      showOnlyInvalid: "Alleen weergeven Ongeldig",
      noInvalidRows: "Er zijn geen ongeldige rijen",
      selectRowsToRemove: "Selecteer rijen om te verwijderen",
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
      languagesTo: "Doeltalen",
      articles: "Artikelen",
      delimiter: "Kolomscheidingsteken",
      additionalInformationDelimiter: "Scheidingsteken voor aanvullende informatie",
      translationDelimiter: "Vertaalscheidingsteken",
      topicFlag: "Onderwerpvoorvoegsel",
      topicDelimiter: "Onderwerpscheidingsteken"
    },
    courseHeader: {
      aria: "Cursus",
      courseName: "Cursusnaam"
    },
    actions: {
      addRow: "+ Woord toevoegen",
      addTopic: "+ Onderwerp toevoegen"
    },
    aiPanel: {
      title: "AI-concept",
      requestSection: "Verzoek",
      requestMode: "Modus",
      requestModeAuto: "Automatisch",
      requestModeVocabulary: "Volledige generatie",
      requestModeTranslations: "Alleen vertalingen",
      parsingSection: "Parseren",
      responseSection: "Antwoord",
      topic: "Onderwerp",
      wordCount: "Woorden",
      requestNotes: "Instructies",
      request: "Verzoek",
      generateRequest: "Verzoek genereren",
      linePrefixPreset: "Regelprefix",
      patternBuilder: "Regelpatroon",
      patternGap: "Patroonscheiding",
      patternSeparatorNone: "(geen)",
      patternSeparatorTab: "Tab",
      addField: "Veld toevoegen",
      moveLeft: "Naar links verplaatsen",
      moveRight: "Naar rechts verplaatsen",
      removeField: "Veld verwijderen",
      patternPreview: "Regelvorm",
      parseDelimiterHint: "Meerdere vertalingen worden gesplitst met “{{delimiter}}” uit Instellingen.",
      parseDelimiterHintNone: "Meerdere vertalingen worden niet gesplitst omdat het vertaalscheidingsteken leeg is in Instellingen.",
      suggestPattern: "Patroon voorstellen",
      patternSuggested: "Patroon kwam overeen met {{matched}}/{{total}} regels",
      parseResponse: "Antwoord parseren",
      response: "Bewerkbaar antwoord",
      parseError: "Kan antwoord niet parseren",
      parsedRows: "{{count}} rijen geparseerd",
      parseResultNotParsedPrefix: "Niet geparseerd:",
      parseResultNotParsed: "Niet geparseerd:\n{{lines}}",
      parseResultAllParsed: "Alle niet-lege regels zijn geparseerd.",
      parseResultEmpty: "Antwoord is leeg",
      parseResultNoMatch: "Geen regels kwamen overeen met regex-presets",
      parseResultMatched: "Overeenkomende regex-presets",
      parsingConfigurationMissingPattern: "AI-parserconfiguratie heeft geen itempatroon",
      fillTranslations: "Vertalingen invullen",
      addRows: "Toevoegen aan tabel",
      moreActions: "Meer acties",
      replaceRows: "Tabel vervangen",
      replaceConfirm: "Alle huidige tabelrijen vervangen door rijen uit het AI-antwoord?"
    },
    aiPrompt: {
      taskVocabulary: "Taak: Maak beknopte woordenschatrijen.",
      taskTranslation: "Taak: Vertaal de vermelde woorden.",
      requirementsLine: "Vereisten: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Neem vertalingen op voor alle doeltalen.",
      multipleTranslationsAllowed: "Meerdere vertalingen per taal zijn toegestaan.",
      addBriefNotes: "Voeg alleen korte notities toe wanneer nuttig, zoals meervouden, verbuiging of gebruik.",
      includeArticlesWhenNatural: "Als lidwoorden natuurlijk zijn in de brontaal, neem ze dan op.",
      course: "Cursus: {{course}}",
      topic: "Onderwerp: {{topic}}",
      entryCount: "Aantal items: {{count}}",
      sourceLanguage: "Brontaal: {{language}}",
      targetLanguages: "Doeltalen: {{languages}}",
      words: "Woorden:"
    },
    grid: {
      containerAria: "Rastercontainer",
      article: "Lidwoord",
      word: "Woord",
      additionalInfo: "Aanvullende informatie",
      toLanguage: "{{language}}"
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
      addRow: "Woord toevoegen",
      addTopic: "Onderwerp toevoegen",
      removeRow: "Rij verwijderen",
      removeSelectedRows: "Geselecteerde rijen verwijderen",
      clearSelectedCells: "Wis geselecteerde cellen",
      autosaveRestored: "Automatisch opslaan hersteld",
      copy: "Kopiëren",
      copySelected: "Kopieer geselecteerd",
      pasteFailed: "Plakken is mislukt",
      pasteInsert: "Plak het invoegsel",
      addAiRows: "AI-rijen toevoegen",
      replaceAiRows: "Vervangen door AI-rijen",
      generateAiRequest: "AI-verzoek genereren",
      parseAiRegex: "AI-antwoord analyseren",
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
      noRowsToShow: "Er zijn geen rijen om weer te geven",
      pageSizeSelectorLabel: "Paginagrootte:",
      ariaPageSizeSelectorLabel: "Paginagrootte"
    }
  }
} as const;








