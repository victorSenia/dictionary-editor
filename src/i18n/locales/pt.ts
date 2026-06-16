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
      showAiPanel: "Abrir rascunho de IA",
      hideAiPanel: "Fechar rascunho de IA",
      showSettings: "Mostrar configurações",
      hideSettings: "Ocultar configurações",
      removeSelectedRows: "Remover linhas selecionadas",
      language: "Linguagem",
      showOnlyInvalid: "Mostrar apenas inválido",
      noInvalidRows: "Não há linhas inválidas",
      selectRowsToRemove: "Selecione linhas para remover",
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
      languagesTo: "Idiomas de destino",
      articles: "Artigos",
      delimiter: "Delimitador de coluna",
      additionalInformationDelimiter: "Delimitador de informações adicionais",
      translationDelimiter: "Delimitador de tradução",
      topicFlag: "Prefixo do tópico",
      topicDelimiter: "Delimitador de tópico"
    },
    courseHeader: {
      aria: "Curso",
      courseName: "Nome do curso"
    },
    actions: {
      addRow: "+ Adicionar palavra",
      addTopic: "+ Adicionar tópico"
    },
    aiPanel: {
      title: "Rascunho de IA",
      requestSection: "Solicitação",
      requestMode: "Modo",
      requestModeAuto: "Automático",
      requestModeVocabulary: "Geração completa",
      requestModeTranslations: "Apenas traduções",
      parsingSection: "Análise",
      responseSection: "Resposta",
      topic: "Tópico",
      wordCount: "Palavras",
      requestNotes: "Instruções",
      request: "Solicitação",
      generateRequest: "Gerar solicitação",
      sendRequest: "Enviar solicitação",
      sendingRequest: "Enviando solicitação…",
      requestFailed: "A solicitação de IA falhou.",
      requestTimedOut: "A solicitação de IA excedeu o tempo limite.",
      patternBuilder: "Padrão da linha",
      patternGap: "Separador de padrão",
      patternSeparatorNone: "(nenhum)",
      patternSeparatorTab: "Tabulação",
      addField: "Adicionar campo",
      moveLeft: "Mover para a esquerda",
      moveRight: "Mover para a direita",
      removeField: "Remover campo",
      patternPreview: "Formato da linha",
      parseDelimiterHint: "Várias traduções são separadas usando “{{delimiter}}” nas Configurações.",
      parseDelimiterHintNone: "Várias traduções não são separadas porque o delimitador de tradução está vazio nas Configurações.",
      suggestPattern: "Sugerir padrão",
      patternSuggested: "O padrão correspondeu a {{matched}}/{{total}} linhas",
      parseResponse: "Analisar resposta",
      response: "Resposta editável",
      parseError: "Não foi possível analisar a resposta",
      parsedRows: "{{count}} linhas analisadas",
      parseResultNotParsedPrefix: "Não analisado:",
      parseResultNotParsed: "Não analisado:\n{{lines}}",
      parseResultAllParsed: "Todas as linhas não vazias foram analisadas.",
      parseResultEmpty: "A resposta está vazia",
      parseResultNoMatch: "Nenhuma linha correspondeu aos presets regex",
      parseResultMatched: "Presets regex correspondentes",
      parsingConfigurationMissingPattern: "A configuração de análise de IA não tem padrão de item",
      fillTranslations: "Preencher traduções",
      addRows: "Adicionar à tabela",
      moreActions: "Mais ações",
      replaceRows: "Substituir tabela",
      replaceConfirm: "Substituir todas as linhas atuais da tabela por linhas da resposta de IA?"
    },
    aiPrompt: {
      taskVocabulary: "Tarefa: crie linhas de vocabulário concisas.",
      taskTranslation: "Tarefa: traduza as palavras listadas.",
      requirementsLine: "Requisitos: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Inclua traduções para todos os idiomas de destino.",
      multipleTranslationsAllowed: "Várias traduções por idioma são permitidas.",
      addBriefNotes: "Adicione notas breves apenas quando forem úteis, como plurais, flexões ou uso.",
      includeArticlesWhenNatural: "Se artigos forem naturais no idioma de origem, inclua-os.",
      course: "Curso: {{course}}",
      topic: "Tópico: {{topic}}",
      entryCount: "Contagem de entradas: {{count}}",
      sourceLanguage: "Idioma de origem: {{language}}",
      targetLanguages: "Idiomas de destino: {{languages}}",
      words: "Palavras:"
    },
    grid: {
      containerAria: "Contêiner de grade",
      article: "Artigo",
      word: "Palavra",
      additionalInfo: "Informações Adicionais",
      toLanguage: "{{language}}"
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
      addRow: "Adicionar palavra",
      addTopic: "Adicionar tópico",
      removeRow: "Remover linha",
      removeSelectedRows: "Remover linhas selecionadas",
      clearSelectedCells: "Limpar células selecionadas",
      autosaveRestored: "Salvamento automático restaurado",
      copy: "Cópia",
      copySelected: "Copiar selecionado",
      pasteFailed: "Falha ao colar",
      pasteInsert: "Colar Inserir",
      addAiRows: "Adicionar linhas de IA",
      replaceAiRows: "Substituir por linhas de IA",
      generateAiRequest: "Gerar solicitação de IA",
      parseAiRegex: "Analisar resposta da IA",
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
      noRowsToShow: "Nenhuma linha para mostrar",
      pageSizeSelectorLabel: "Tamanho da página:",
      ariaPageSizeSelectorLabel: "Tamanho da página"
    }
  }
} as const;







