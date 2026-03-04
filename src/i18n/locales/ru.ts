export const ru = {
  translation: {
    app: {
      title: "Редактор словаря"
    },
    toolbar: {
      aria: "Панель инструментов редактора",
      new: "Новый",
      open: "Открыть",
      save: "Сохранить",
      saveAs: "Сохранить как",
      cancel: "Отмена",
      reapply: "Применить снова",
      export: "Экспорт",
      import: "Импорт",
      showSettings: "Показать настройки",
      hideSettings: "Скрыть настройки",
      removeSelectedRows: "Удалить выбранные строки",
      language: "Язык",
      showOnlyInvalid: "Показать только недействительные"
    },
    settings: {
      title: "Настройки",
      aria: "Панель настроек",
      showArticleColumn: "Показать столбец артикля",
      showArticleColumnHint: "Если отключено, рекомендуется удалить артикли из конфига.",
      showAdditionalInformationColumn: "Показать столбец дополнительной информации",
      addLanguage: "Добавить язык",
      addArticle: "Добавить артикль",
      removeItem: "Удалить элемент",
      languageErrorEmpty: "Язык не может быть пустым",
      languageErrorExists: "Язык «{{language}}» уже существует.",
      languageFrom: "Исходный язык",
      languagesTo: "Целевые языки (через запятую)",
      articles: "Артикли (через запятую)",
      delimiter: "Разделитель столбцов",
      additionalInformationDelimiter: "Дополнительный разделитель информации",
      translationDelimiter: "Разделитель перевода",
      topicFlag: "Префикс темы",
      topicDelimiter: "Разделитель тем",
      rootTopic: "Основная тема"
    },
    actions: {
      addRow: "+ Добавить строку",
      addTopic: "+ Добавить тему"
    },
    grid: {
      containerAria: "Сетчатый контейнер",
      article: "Артикль",
      word: "Слово",
      additionalInfo: "Дополнительная информация",
      toLanguage: "В {{language}}"
    },
    status: {
      lastAction: "Последнее действие: {{action}}",
      file: "Файл: {{path}}",
      none: "Никто"
    },
    action: {
      new: "Новый",
      open: "Открыть",
      import: "Импорт",
      save: "Сохранить",
      saveAs: "Сохранить как",
      cancel: "Отмена",
      reapply: "Применить снова",
      export: "Экспорт",
      addRow: "Добавить строку",
      addTopic: "Добавить тему",
      removeRow: "Удалить строку",
      removeSelectedRows: "Удалить выбранные строки",
      clearSelectedCells: "Очистить выбранные ячейки",
      autosaveRestored: "Автосохранение восстановлено",
      copy: "Копировать",
      copySelected: "Копировать выбранное",
      pasteFailed: "Вставить не удалось",
      pasteInsert: "Вставить вставку",
      addTranslationColumn: "Добавить столбец перевода",
      reorderTranslationColumns: "Изменение порядка столбцов перевода",
      removeTranslationColumn: "Удалить столбец перевода",
      renameTranslationColumn: "Переименовать столбец перевода",
      cannotRemoveLastTranslationColumn: "Невозможно удалить последний столбец перевода",
      languageNotFound: "Язык «{{language}}» не найден",
      languageExists: "Язык «{{language}}» уже существует.",
      reorderTranslation: "Изменение порядка перевода",
      editTranslation: "Редактировать перевод",
      addTranslation: "Добавить перевод",
      removeTranslation: "Удалить перевод"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Перевод содержит запрещенный разделитель столбцов «{{delimiter}}».",
      containsColumnDelimiter: "Содержит запрещенный разделитель столбцов «{{delimiter}}».",
      containsAdditionalInformationDelimiter:
        "Содержит разделитель запрещенной дополнительной информации «{{delimiter}}».",
      containsTopicFlag: "Содержит флаг запрещенной темы «{{topicFlag}}».",
      emptyTopicNotAllowed: "Пустая тема не допускается",
      emptyWordNotAllowed: "Пустое слово не допускается",
      emptyTranslationNotAllowed: "Пустой перевод не допускается",
      articleNotInConfig: "Артикля «{{article}}» нет в настроенных артиклях."
    },
    translation: {
      renameColumn: "Переименовать столбец",
      renameFailed: "Переименование не удалось",
      deleteColumn: "Удалить столбец",
      saveRename: "Сохранить",
      cancelRename: "Отмена",
      moveUp: "Вверх",
      moveDown: "Двигаться вниз",
      remove: "Удалить перевод",
      add: "Добавить перевод",
      removeRow: "Удалить строку"
    },
    dialog: {
      cancel: "Отмена",
      ok: "Подтвердить"
    },
    clipboard: {
      confirmTooManyColumns:
        "Вставленные данные содержат {{maxBufferColumns}} столбцов, но в выбранную ячейку помещается только {{availableColumns}}. Дополнительные столбцы будут игнорироваться. Продолжать?",
      confirmOverwrite: "Некоторые целевые ячейки уже содержат данные. Вставка перезапишет существующие значения. Продолжать?"
    },
    agGrid: {
      page: "Страница",
      more: "Более",
      to: "к",
      of: "из",
      next: "Следующий",
      last: "Последний",
      first: "Первый",
      previous: "Предыдущий",
      loadingOoo: "Загрузка...",
      selectAll: "Выбрать все",
      searchOoo: "Поиск...",
      blanks: "(Пробелы)",
      noRowsToShow: "Нет строк для отображения"
    }
  }
} as const;







