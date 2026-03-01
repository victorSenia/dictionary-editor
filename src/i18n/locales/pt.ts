export const pt = {
  translation: {
    app: {
      title: "Editor de dicionário"
    },
    toolbar: {
      aria: "Barra de ferramentas do editor",
      new: "Novo",
      open: "Abrir",
      save: "Salvar",
      saveAs: "Salvar como",
      cancel: "Cancelar",
      reapply: "Reaplicar",
      export: "Exportar",
      import: "Importar",
      showSettings: "Mostrar configurações",
      hideSettings: "Ocultar configurações",
      removeSelectedRows: "Remover linhas selecionadas",
      language: "Linguagem",
      showOnlyInvalid: "Mostrar apenas inválido"
    },
    settings: {
      title: "Configurações",
      aria: "Painel de configurações",
      showArticleColumn: "Mostrar coluna do artigo",
      showArticleColumnHint: "Se desativado, é recomendado remover artigos da configuração.",
      showAdditionalInformationColumn: "Mostrar coluna de informações adicionais",
      addLanguage: "Adicionar idioma",
      addArticle: "Adicionar artigo",
      removeItem: "Remover item",
      languageErrorEmpty: "A linguagem não pode estar vazia",
      languageErrorExists: "O idioma \"{{language}}\" já existe",
      languageFrom: "Idioma de origem",
      languagesTo: "Idiomas de destino (separados por vírgula)",
      articles: "Artigos (separados por vírgula)",
      delimiter: "Delimitador de coluna",
      additionalInformationDelimiter: "Delimitador de informações adicionais",
      translationDelimiter: "Delimitador de tradução",
      topicFlag: "Prefixo do tópico",
      topicDelimiter: "Delimitador de tópico",
      rootTopic: "Tópico raiz"
    },
    actions: {
      addRow: "+ Adicionar linha",
      addTopic: "+ Adicionar tópico"
    },
    grid: {
      containerAria: "Contêiner de grade",
      article: "Artigo",
      word: "Palavra",
      additionalInfo: "Informações Adicionais",
      toLanguage: "Para {{language}}"
    },
    status: {
      lastAction: "Última ação: {{action}}",
      file: "Arquivo: {{path}}",
      none: "Nenhum"
    },
    action: {
      new: "Novo",
      open: "Abrir",
      import: "Importar",
      save: "Salvar",
      saveAs: "Salvar como",
      cancel: "Cancelar",
      reapply: "Reaplicar",
      export: "Exportar",
      addRow: "Adicionar linha",
      addTopic: "Adicionar tópico",
      removeRow: "Remover linha",
      removeSelectedRows: "Remover linhas selecionadas",
      clearSelectedCells: "Limpar células selecionadas",
      autosaveRestored: "Salvamento automático restaurado",
      copy: "Cópia",
      copySelected: "Copiar selecionado",
      pasteFailed: "Falha ao colar",
      pasteInsert: "Colar Inserir",
      addTranslationColumn: "Adicionar coluna de tradução",
      reorderTranslationColumns: "Reordenar colunas de tradução",
      removeTranslationColumn: "Remover coluna de tradução",
      renameTranslationColumn: "Renomear coluna de tradução",
      cannotRemoveLastTranslationColumn: "Não é possível remover a última coluna de tradução",
      languageNotFound: "Idioma \"{{language}}\" não encontrado",
      languageExists: "O idioma \"{{language}}\" já existe",
      reorderTranslation: "Reordenar tradução",
      editTranslation: "Editar tradução",
      addTranslation: "Adicionar tradução",
      removeTranslation: "Remover tradução"
    },
    validation: {
      translationContainsColumnDelimiter:
        "A tradução contém delimitador de coluna proibido \"{{delimiter}}\"",
      containsColumnDelimiter: "Contém delimitador de coluna proibido \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Contém delimitador de informações adicionais proibidas \"{{delimiter}}\"",
      containsTopicFlag: "Contém sinalizador de tópico proibido \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Tópico vazio não é permitido",
      emptyWordNotAllowed: "Palavra vazia não é permitida",
      emptyTranslationNotAllowed: "A tradução vazia não é permitida",
      articleNotInConfig: "O artigo \"{{article}}\" não está nos artigos configurados"
    },
    translation: {
      renameColumn: "Renomear coluna",
      renameFailed: "Falha ao renomear",
      deleteColumn: "Excluir coluna",
      saveRename: "Salvar",
      cancelRename: "Cancelar",
      moveUp: "Subir",
      moveDown: "Mover para baixo",
      remove: "Remover tradução",
      add: "Adicionar tradução",
      removeRow: "Remover linha"
    },
    dialog: {
      cancel: "Cancelar",
      ok: "Confirmar"
    },
    clipboard: {
      confirmTooManyColumns:
        "Os dados colados possuem colunas {{maxBufferColumns}}, mas apenas {{availableColumns}} cabem na célula selecionada. Colunas extras serão ignoradas. Continuar?",
      confirmOverwrite: "Algumas células de destino já contêm dados. Colar substituirá os valores existentes. Continuar?"
    },    topic: {
      new: "Novo tópico"
    },
    agGrid: {
      page: "Página",
      more: "Mais",
      to: "para",
      of: "de",
      next: "Próximo",
      last: "Durar",
      first: "Primeiro",
      previous: "Anterior",
      loadingOoo: "Carregando...",
      selectAll: "Selecionar tudo",
      searchOoo: "Procurar...",
      blanks: "(Espaços em branco)",
      noRowsToShow: "Nenhuma linha para mostrar"
    }
  }
} as const;







