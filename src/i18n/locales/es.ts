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
      showSettings: "Mostrar configuración",
      hideSettings: "Ocultar configuración",
      removeSelectedRows: "Eliminar filas seleccionadas",
      language: "Idioma",
      showOnlyInvalid: "Mostrar sólo no válido"
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
      languagesTo: "Idiomas de destino (separados por comas)",
      articles: "Artículos (separados por comas)",
      delimiter: "Delimitador de columna",
      additionalInformationDelimiter: "Delimitador de información adicional",
      translationDelimiter: "Delimitador de traducción",
      topicFlag: "Prefijo de tema",
      topicDelimiter: "Delimitador de tema",
      rootTopic: "Tema raíz"
    },
    actions: {
      addRow: "+ Agregar fila",
      addTopic: "+ Agregar tema"
    },
    grid: {
      containerAria: "Contenedor de rejilla",
      article: "Artículo",
      word: "Palabra",
      additionalInfo: "Información adicional",
      toLanguage: "A {{language}}"
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
      addRow: "Agregar fila",
      addTopic: "Agregar tema",
      removeRow: "Quitar fila",
      removeSelectedRows: "Eliminar filas seleccionadas",
      clearSelectedCells: "Borrar celdas seleccionadas",
      autosaveRestored: "Autoguardado restaurado",
      copy: "Copiar",
      copySelected: "Copiar seleccionado",
      pasteFailed: "Error al pegar",
      pasteInsert: "Pegar Insertar",
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
      noRowsToShow: "No hay filas para mostrar"
    }
  }
} as const;







