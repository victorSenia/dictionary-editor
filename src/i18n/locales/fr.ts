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
      showSettings: "Afficher les paramètres",
      hideSettings: "Masquer les paramètres",
      removeSelectedRows: "Supprimer les lignes sélectionnées",
      language: "Langue",
      showOnlyInvalid: "Afficher uniquement invalide"
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
      languagesTo: "Langues cibles (séparées par des virgules)",
      articles: "Articles (séparés par des virgules)",
      delimiter: "Délimiteur de colonne",
      additionalInformationDelimiter: "Délimiteur d'informations supplémentaires",
      translationDelimiter: "Délimiteur de traduction",
      topicFlag: "Préfixe du sujet",
      topicDelimiter: "Délimiteur de sujet",
      rootTopic: "Sujet racine"
    },
    actions: {
      addRow: "+ Ajouter une ligne",
      addTopic: "+ Ajouter un sujet"
    },
    grid: {
      containerAria: "Conteneur de grille",
      article: "Article",
      word: "Mot",
      additionalInfo: "Informations supplémentaires",
      toLanguage: "À {{language}}"
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
      addRow: "Ajouter une ligne",
      addTopic: "Ajouter un sujet",
      removeRow: "Supprimer la ligne",
      removeSelectedRows: "Supprimer les lignes sélectionnées",
      clearSelectedCells: "Effacer les cellules sélectionnées",
      autosaveRestored: "Sauvegarde automatique restaurée",
      copy: "Copie",
      copySelected: "Copier la sélection",
      pasteFailed: "Le collage a échoué",
      pasteInsert: "Coller Insérer",
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
      noRowsToShow: "Aucune ligne à afficher"
    }
  }
} as const;









