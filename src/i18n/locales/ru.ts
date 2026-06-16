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
      showAiPanel: "Открыть AI-черновик",
      hideAiPanel: "Закрыть AI-черновик",
      showSettings: "Показать настройки",
      hideSettings: "Скрыть настройки",
      removeSelectedRows: "Удалить выбранные строки",
      language: "Язык",
      showOnlyInvalid: "Показать только недействительные",
      noInvalidRows: "Недопустимых строк нет",
      selectRowsToRemove: "Выберите строки для удаления",
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
      languagesTo: "Целевые языки",
      articles: "Артикли",
      delimiter: "Разделитель столбцов",
      additionalInformationDelimiter: "Дополнительный разделитель информации",
      translationDelimiter: "Разделитель перевода",
      topicFlag: "Префикс темы",
      topicDelimiter: "Разделитель тем"
    },
    courseHeader: {
      aria: "Курс",
      courseName: "Название курса"
    },
    actions: {
      addRow: "+ Добавить слово",
      addTopic: "+ Добавить тему"
    },
    aiPanel: {
      title: "AI-черновик",
      requestSection: "Запрос",
      requestMode: "Режим",
      requestModeAuto: "Авто",
      requestModeVocabulary: "Полная генерация",
      requestModeTranslations: "Только переводы",
      parsingSection: "Разбор",
      responseSection: "Ответ",
      topic: "Тема",
      wordCount: "Слова",
      requestNotes: "Инструкции",
      request: "Запрос",
      generateRequest: "Сгенерировать запрос",
      sendRequest: "Отправить запрос",
      sendingRequest: "Запрос отправляется…",
      requestFailed: "Не удалось выполнить запрос к ИИ.",
      requestTimedOut: "Время ожидания ответа ИИ истекло.",
      patternBuilder: "Шаблон строки",
      patternGap: "Разделитель шаблона",
      patternSeparatorNone: "(нет)",
      patternSeparatorTab: "Табуляция",
      addField: "Добавить поле",
      moveLeft: "Переместить влево",
      moveRight: "Переместить вправо",
      removeField: "Удалить поле",
      patternPreview: "Форма строки",
      parseDelimiterHint: "Несколько переводов разделяются с помощью «{{delimiter}}» из настроек.",
      parseDelimiterHintNone: "Несколько переводов не разделяются, потому что разделитель перевода в настройках пустой.",
      suggestPattern: "Предложить шаблон",
      patternSuggested: "Шаблон совпал с {{matched}}/{{total}} строками",
      parseResponse: "Разобрать ответ",
      response: "Редактируемый ответ",
      parseError: "Не удалось разобрать ответ",
      parsedRows: "Разобрано строк: {{count}}",
      parseResultNotParsedPrefix: "Не разобрано:",
      parseResultNotParsed: "Не разобрано:\n{{lines}}",
      parseResultAllParsed: "Все непустые строки разобраны.",
      parseResultEmpty: "Ответ пуст",
      parseResultNoMatch: "Нет строк, совпавших с regex-пресетами",
      parseResultMatched: "Совпавшие regex-пресеты",
      parsingConfigurationMissingPattern: "В конфигурации AI-разбора нет шаблона элемента",
      fillTranslations: "Заполнить переводы",
      addRows: "Добавить в таблицу",
      moreActions: "Больше действий",
      replaceRows: "Заменить таблицу",
      replaceConfirm: "Заменить все текущие строки таблицы строками из AI-ответа?"
    },
    aiPrompt: {
      taskVocabulary: "Задача: создать краткие словарные строки.",
      taskTranslation: "Задача: перевести перечисленные слова.",
      requirementsLine: "Требования: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Включите переводы для всех целевых языков.",
      multipleTranslationsAllowed: "Допускается несколько переводов на язык.",
      addBriefNotes: "Добавляйте краткие заметки только при необходимости, например формы множественного числа, склонение или употребление.",
      includeArticlesWhenNatural: "Если артикли естественны для исходного языка, включите их.",
      course: "Курс: {{course}}",
      topic: "Тема: {{topic}}",
      entryCount: "Количество записей: {{count}}",
      sourceLanguage: "Исходный язык: {{language}}",
      targetLanguages: "Целевые языки: {{languages}}",
      words: "Слова:"
    },
    grid: {
      containerAria: "Сетчатый контейнер",
      article: "Артикль",
      word: "Слово",
      additionalInfo: "Дополнительная информация",
      toLanguage: "{{language}}"
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
      addRow: "Добавить слово",
      addTopic: "Добавить тему",
      removeRow: "Удалить строку",
      removeSelectedRows: "Удалить выбранные строки",
      clearSelectedCells: "Очистить выбранные ячейки",
      autosaveRestored: "Автосохранение восстановлено",
      copy: "Копировать",
      copySelected: "Копировать выбранное",
      pasteFailed: "Вставить не удалось",
      pasteInsert: "Вставить вставку",
      addAiRows: "Добавить AI-строки",
      replaceAiRows: "Заменить AI-строками",
      generateAiRequest: "Сгенерировать AI-запрос",
      parseAiRegex: "Разобрать AI-ответ",
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
      noRowsToShow: "Нет строк для отображения",
      pageSizeSelectorLabel: "Размер страницы:",
      ariaPageSizeSelectorLabel: "Размер страницы"
    }
  }
} as const;







