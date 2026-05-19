export const fr = {
  translation: {
    app: {
      title: "Éditeur de dictionnaire"
    },
    toolbar: {
      aria: "Barre d'outils de l'éditeur",
      new: "Nouveau",
      open: "Ouvrir",
      save: "Enregistrer",
      saveAs: "Enregistrer sous",
      cancel: "Annuler",
      reapply: "Réappliquer",
      export: "Exporter",
      import: "Importer",
      showAiPanel: "Ouvrir le brouillon IA",
      hideAiPanel: "Fermer le brouillon IA",
      showSettings: "Afficher les paramètres",
      hideSettings: "Masquer les paramètres",
      removeSelectedRows: "Supprimer les lignes sélectionnées",
      language: "Langue",
      showOnlyInvalid: "Afficher uniquement invalide",
      noInvalidRows: "Il n’y a aucune ligne invalide",
      selectRowsToRemove: "Sélectionnez les lignes à supprimer",
    },
    settings: {
      title: "Paramètres",
      aria: "Panneau Paramètres",
      showArticleColumn: "Afficher la colonne de l'article",
      showArticleColumnHint: "S'il est désactivé, il est recommandé de supprimer les articles de la configuration.",
      showAdditionalInformationColumn: "Afficher la colonne d'informations supplémentaires",
      addLanguage: "Ajouter une langue",
      addArticle: "Ajouter un article",
      removeItem: "Supprimer l'élément",
      languageErrorEmpty: "La langue ne peut pas être vide",
      languageErrorExists: "La langue \"{{language}}\" existe déjà",
      languageFrom: "Langue source",
      languagesTo: "Langues cibles",
      articles: "Articles",
      delimiter: "Délimiteur de colonne",
      additionalInformationDelimiter: "Délimiteur d'informations supplémentaires",
      translationDelimiter: "Délimiteur de traduction",
      topicFlag: "Préfixe du sujet",
      topicDelimiter: "Délimiteur de sujet"
    },
    courseHeader: {
      aria: "Cours",
      courseName: "Nom du cours"
    },
    actions: {
      addRow: "+ Ajouter un mot",
      addTopic: "+ Ajouter un sujet"
    },
    aiPanel: {
      title: "Brouillon IA",
      requestSection: "Requête",
      requestMode: "Mode",
      requestModeAuto: "Auto",
      requestModeVocabulary: "Génération complète",
      requestModeTranslations: "Traductions uniquement",
      parsingSection: "Analyse",
      responseSection: "Réponse",
      topic: "Sujet",
      wordCount: "Mots",
      requestNotes: "Instructions",
      request: "Requête",
      generateRequest: "Générer la requête",
      linePrefixPreset: "Préfixe de ligne",
      patternBuilder: "Modèle de ligne",
      patternGap: "Séparateur de modèle",
      patternSeparatorNone: "(aucun)",
      patternSeparatorTab: "Tabulation",
      addField: "Ajouter un champ",
      moveLeft: "Déplacer à gauche",
      moveRight: "Déplacer à droite",
      removeField: "Supprimer le champ",
      patternPreview: "Forme de ligne",
      parseDelimiterHint: "Les traductions multiples sont séparées avec « {{delimiter}} » depuis les paramètres.",
      parseDelimiterHintNone: "Les traductions multiples ne sont pas séparées, car le délimiteur de traduction est vide dans les paramètres.",
      suggestPattern: "Suggérer un modèle",
      patternSuggested: "Le modèle correspond à {{matched}}/{{total}} lignes",
      parseResponse: "Analyser la réponse",
      response: "Réponse modifiable",
      parseError: "Impossible d’analyser la réponse",
      parsedRows: "{{count}} lignes analysées",
      parseResultNotParsedPrefix: "Non analysé :",
      parseResultNotParsed: "Non analysé :\n{{lines}}",
      parseResultAllParsed: "Toutes les lignes non vides ont été analysées.",
      parseResultEmpty: "La réponse est vide",
      parseResultNoMatch: "Aucune ligne ne correspond aux préréglages regex",
      parseResultMatched: "Préréglages regex correspondants",
      parsingConfigurationMissingPattern: "La configuration d’analyse IA n’a pas de modèle d’élément",
      fillTranslations: "Remplir les traductions",
      addRows: "Ajouter au tableau",
      moreActions: "Plus d’actions",
      replaceRows: "Remplacer le tableau",
      replaceConfirm: "Remplacer toutes les lignes actuelles du tableau par les lignes de la réponse IA ?"
    },
    aiPrompt: {
      taskVocabulary: "Tâche : créer des lignes de vocabulaire concises.",
      taskTranslation: "Tâche : traduire les mots listés.",
      requirementsLine: "Exigences : {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Inclure les traductions pour toutes les langues cibles.",
      multipleTranslationsAllowed: "Plusieurs traductions par langue sont autorisées.",
      addBriefNotes: "Ajouter de brèves notes seulement si elles sont utiles, comme les pluriels, la flexion ou l’usage.",
      includeArticlesWhenNatural: "Si les articles sont naturels dans la langue source, les inclure.",
      course: "Cours : {{course}}",
      topic: "Sujet : {{topic}}",
      entryCount: "Nombre d’entrées : {{count}}",
      sourceLanguage: "Langue source : {{language}}",
      targetLanguages: "Langues cibles : {{languages}}",
      words: "Mots :"
    },
    grid: {
      containerAria: "Conteneur de grille",
      article: "Article",
      word: "Mot",
      additionalInfo: "Informations supplémentaires",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "Dernière action : {{action}}",
      file: "Fichier : {{path}}",
      none: "Aucun"
    },
    action: {
      new: "Nouveau",
      open: "Ouvrir",
      import: "Importer",
      save: "Enregistrer",
      saveAs: "Enregistrer sous",
      cancel: "Annuler",
      reapply: "Réappliquer",
      export: "Exporter",
      addRow: "Ajouter un mot",
      addTopic: "Ajouter un sujet",
      removeRow: "Supprimer la ligne",
      removeSelectedRows: "Supprimer les lignes sélectionnées",
      clearSelectedCells: "Effacer les cellules sélectionnées",
      autosaveRestored: "Sauvegarde automatique restaurée",
      copy: "Copie",
      copySelected: "Copier la sélection",
      pasteFailed: "Le collage a échoué",
      pasteInsert: "Coller Insérer",
      addAiRows: "Ajouter des lignes IA",
      replaceAiRows: "Remplacer par des lignes IA",
      generateAiRequest: "Générer une requête IA",
      parseAiRegex: "Analyser la réponse IA",
      addTranslationColumn: "Ajouter une colonne de traduction",
      reorderTranslationColumns: "Réorganiser les colonnes de traduction",
      removeTranslationColumn: "Supprimer la colonne de traduction",
      renameTranslationColumn: "Renommer la colonne de traduction",
      cannotRemoveLastTranslationColumn: "Impossible de supprimer la dernière colonne de traduction",
      languageNotFound: "Langue \"{{language}}\" introuvable",
      languageExists: "La langue \"{{language}}\" existe déjà",
      reorderTranslation: "Réorganiser la traduction",
      editTranslation: "Modifier la traduction",
      addTranslation: "Ajouter une traduction",
      removeTranslation: "Supprimer la traduction"
    },
    validation: {
      translationContainsColumnDelimiter:
        "La traduction contient un délimiteur de colonne interdit \"{{delimiter}}\"",
      containsColumnDelimiter: "Contient le délimiteur de colonne interdit \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Contient le délimiteur d'informations supplémentaires interdites \"{{delimiter}}\"",
      containsTopicFlag: "Contient l'indicateur de sujet interdit \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Les sujets vides ne sont pas autorisés",
      emptyWordNotAllowed: "Les mots vides ne sont pas autorisés",
      emptyTranslationNotAllowed: "Les traductions vides ne sont pas autorisées",
      articleNotInConfig: "L'article \"{{article}}\" n'est pas dans les articles configurés"
    },
    translation: {
      renameColumn: "Renommer la colonne",
      renameFailed: "Échec du changement de nom",
      deleteColumn: "Supprimer la colonne",
      saveRename: "Enregistrer",
      cancelRename: "Annuler",
      moveUp: "Monter",
      moveDown: "Descendre",
      remove: "Supprimer la traduction",
      add: "Ajouter une traduction",
      removeRow: "Supprimer la ligne"
    },
    dialog: {
      cancel: "Annuler",
      ok: "Valider"
    },
    clipboard: {
      confirmTooManyColumns:
        "Les données collées comportent {{maxBufferColumns}} colonnes, mais seul {{availableColumns}} rentre dans la cellule sélectionnée. Les colonnes supplémentaires seront ignorées. Continuer?",
      confirmOverwrite: "Certaines cellules cibles contiennent déjà des données. Le collage écrasera les valeurs existantes. Continuer?"
    },
    agGrid: {
      page: "Page",
      more: "Plus",
      to: "à",
      of: "de",
      next: "Suivant",
      last: "Dernier",
      first: "D'abord",
      previous: "Précédent",
      loadingOoo: "Chargement...",
      selectAll: "Sélectionner tout",
      searchOoo: "Recherche...",
      blanks: "(Blancs)",
      noRowsToShow: "Aucune ligne à afficher",
      pageSizeSelectorLabel: "Taille de page :",
      ariaPageSizeSelectorLabel: "Taille de page"
    }
  }
} as const;









