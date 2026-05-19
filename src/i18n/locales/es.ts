export const es = {
  translation: {
    app: {
      title: "Editor de diccionario"
    },
    toolbar: {
      aria: "Barra de herramientas del editor",
      new: "Nuevo",
      open: "Abrir",
      save: "Guardar",
      saveAs: "Guardar como",
      cancel: "Cancelar",
      reapply: "Reaplicar",
      export: "Exportar",
      import: "Importar",
      showAiPanel: "Abrir borrador de IA",
      hideAiPanel: "Cerrar borrador de IA",
      showSettings: "Mostrar configuración",
      hideSettings: "Ocultar configuración",
      removeSelectedRows: "Eliminar filas seleccionadas",
      language: "Idioma",
      showOnlyInvalid: "Mostrar sólo no válido",
      noInvalidRows: "No hay filas no válidas",
      selectRowsToRemove: "Seleccione filas para eliminar",
    },
    settings: {
      title: "Ajustes",
      aria: "Panel de configuración",
      showArticleColumn: "Mostrar columna de artículo",
      showArticleColumnHint: "Si está deshabilitado, se recomienda eliminar los artículos de la configuración.",
      showAdditionalInformationColumn: "Mostrar columna de información adicional",
      addLanguage: "Agregar idioma",
      addArticle: "Agregar artículo",
      removeItem: "Quitar elemento",
      languageErrorEmpty: "El lenguaje no puede estar vacío.",
      languageErrorExists: "El idioma \"{{language}}\" ya existe",
      languageFrom: "Idioma de origen",
      languagesTo: "Idiomas de destino",
      articles: "Artículos",
      delimiter: "Delimitador de columna",
      additionalInformationDelimiter: "Delimitador de información adicional",
      translationDelimiter: "Delimitador de traducción",
      topicFlag: "Prefijo de tema",
      topicDelimiter: "Delimitador de tema"
    },
    courseHeader: {
      aria: "Curso",
      courseName: "Nombre del curso"
    },
    actions: {
      addRow: "+ Añadir palabra",
      addTopic: "+ Agregar tema"
    },
    aiPanel: {
      title: "Borrador de IA",
      requestSection: "Solicitud",
      requestMode: "Modo",
      requestModeAuto: "Automático",
      requestModeVocabulary: "Generación completa",
      requestModeTranslations: "Solo traducciones",
      parsingSection: "Análisis",
      responseSection: "Respuesta",
      topic: "Tema",
      wordCount: "Palabras",
      requestNotes: "Instrucciones",
      request: "Solicitud",
      generateRequest: "Generar solicitud",
      linePrefixPreset: "Prefijo de línea",
      patternBuilder: "Patrón de línea",
      patternGap: "Separador de patrón",
      patternSeparatorNone: "(ninguno)",
      patternSeparatorTab: "Tabulación",
      addField: "Añadir campo",
      moveLeft: "Mover a la izquierda",
      moveRight: "Mover a la derecha",
      removeField: "Eliminar campo",
      patternPreview: "Forma de línea",
      parseDelimiterHint: "Las traducciones múltiples se dividen usando “{{delimiter}}” desde Configuración.",
      parseDelimiterHintNone: "Las traducciones múltiples no se dividen porque el delimitador de traducción está vacío en Configuración.",
      suggestPattern: "Sugerir patrón",
      patternSuggested: "El patrón coincidió con {{matched}}/{{total}} líneas",
      parseResponse: "Analizar respuesta",
      response: "Respuesta editable",
      parseError: "No se pudo analizar la respuesta",
      parsedRows: "{{count}} filas analizadas",
      parseResultNotParsedPrefix: "No analizado:",
      parseResultNotParsed: "No analizado:\n{{lines}}",
      parseResultAllParsed: "Todas las líneas no vacías fueron analizadas.",
      parseResultEmpty: "La respuesta está vacía",
      parseResultNoMatch: "Ninguna línea coincidió con los ajustes regex",
      parseResultMatched: "Ajustes regex coincidentes",
      parsingConfigurationMissingPattern: "La configuración de análisis de IA no tiene patrón de elemento",
      fillTranslations: "Completar traducciones",
      addRows: "Añadir a la tabla",
      moreActions: "Más acciones",
      replaceRows: "Reemplazar tabla",
      replaceConfirm: "¿Reemplazar todas las filas actuales de la tabla con filas de la respuesta de IA?"
    },
    aiPrompt: {
      taskVocabulary: "Tarea: Crear filas de vocabulario concisas.",
      taskTranslation: "Tarea: Traducir las palabras listadas.",
      requirementsLine: "Requisitos: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Incluya traducciones para todos los idiomas de destino.",
      multipleTranslationsAllowed: "Se permiten varias traducciones por idioma.",
      addBriefNotes: "Añada notas breves solo cuando sean útiles, como plurales, flexión o uso.",
      includeArticlesWhenNatural: "Si los artículos son naturales en el idioma de origen, inclúyalos.",
      course: "Curso: {{course}}",
      topic: "Tema: {{topic}}",
      entryCount: "Número de entradas: {{count}}",
      sourceLanguage: "Idioma de origen: {{language}}",
      targetLanguages: "Idiomas de destino: {{languages}}",
      words: "Palabras:"
    },
    grid: {
      containerAria: "Contenedor de rejilla",
      article: "Artículo",
      word: "Palabra",
      additionalInfo: "Información adicional",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "Última acción: {{action}}",
      file: "Archivo: {{path}}",
      none: "Ninguno"
    },
    action: {
      new: "Nuevo",
      open: "Abrir",
      import: "Importar",
      save: "Guardar",
      saveAs: "Guardar como",
      cancel: "Cancelar",
      reapply: "Reaplicar",
      export: "Exportar",
      addRow: "Añadir palabra",
      addTopic: "Agregar tema",
      removeRow: "Quitar fila",
      removeSelectedRows: "Eliminar filas seleccionadas",
      clearSelectedCells: "Borrar celdas seleccionadas",
      autosaveRestored: "Autoguardado restaurado",
      copy: "Copiar",
      copySelected: "Copiar seleccionado",
      pasteFailed: "Error al pegar",
      pasteInsert: "Pegar Insertar",
      addAiRows: "Añadir filas de IA",
      replaceAiRows: "Reemplazar con filas de IA",
      generateAiRequest: "Generar solicitud de IA",
      parseAiRegex: "Analizar respuesta de IA",
      addTranslationColumn: "Agregar columna de traducción",
      reorderTranslationColumns: "Reordenar columnas de traducción",
      removeTranslationColumn: "Eliminar columna de traducción",
      renameTranslationColumn: "Cambiar el nombre de la columna de traducción",
      cannotRemoveLastTranslationColumn: "No se puede eliminar la última columna de traducción",
      languageNotFound: "Idioma \"{{language}}\" no encontrado",
      languageExists: "El idioma \"{{language}}\" ya existe",
      reorderTranslation: "Reordenar traducción",
      editTranslation: "Editar traducción",
      addTranslation: "Agregar traducción",
      removeTranslation: "Eliminar traducción"
    },
    validation: {
      translationContainsColumnDelimiter:
        "La traducción contiene un delimitador de columna prohibido \"{{delimiter}}\"",
      containsColumnDelimiter: "Contiene el delimitador de columna prohibido \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Contiene información adicional prohibida delimitador \"{{delimiter}}\"",
      containsTopicFlag: "Contiene el indicador de tema prohibido \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "No se permiten temas vacíos",
      emptyWordNotAllowed: "No se permiten palabras vacías",
      emptyTranslationNotAllowed: "No se permiten traducciones vacías",
      articleNotInConfig: "El artículo \"{{article}}\" no está en los artículos configurados"
    },
    translation: {
      renameColumn: "Cambiar nombre de columna",
      renameFailed: "Error al cambiar el nombre",
      deleteColumn: "Eliminar columna",
      saveRename: "Guardar",
      cancelRename: "Cancelar",
      moveUp: "Subir",
      moveDown: "Bajar",
      remove: "Eliminar traducción",
      add: "Agregar traducción",
      removeRow: "Quitar fila"
    },
    dialog: {
      cancel: "Cancelar",
      ok: "Aceptar"
    },
    clipboard: {
      confirmTooManyColumns:
        "Los datos pegados tienen {{maxBufferColumns}} columnas, pero solo {{availableColumns}} caben en la celda seleccionada. Se ignorarán las columnas adicionales. ¿Continuar?",
      confirmOverwrite: "Algunas celdas objetivo ya contienen datos. Al pegar se sobrescribirán los valores existentes. ¿Continuar?"
    },
    agGrid: {
      page: "Página",
      more: "Más",
      to: "a",
      of: "de",
      next: "Próximo",
      last: "Último",
      first: "Primero",
      previous: "Anterior",
      loadingOoo: "Cargando...",
      selectAll: "Seleccionar todo",
      searchOoo: "Buscar...",
      blanks: "(espacios en blanco)",
      noRowsToShow: "No hay filas para mostrar",
      pageSizeSelectorLabel: "Tamaño de página:",
      ariaPageSizeSelectorLabel: "Tamaño de página"
    }
  }
} as const;







