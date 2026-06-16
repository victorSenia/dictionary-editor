export const uk = {
  translation: {
    app: {
      title: "Редактор словників"
    },
    toolbar: {
      aria: "Панель інструментів редактора",
      new: "Новий",
      open: "Відкрити",
      save: "Зберегти",
      saveAs: "Зберегти як",
      cancel: "Скасувати",
      reapply: "Повторити",
      export: "Експорт",
      import: "Імпорт",
      showAiPanel: "Відкрити AI-чернетку",
      hideAiPanel: "Закрити AI-чернетку",
      showSettings: "Показати налаштування",
      hideSettings: "Приховати налаштування",
      removeSelectedRows: "Видалити вибрані рядки",
      language: "Мова",
      showOnlyInvalid: "Показати лише недійсні",
      noInvalidRows: "Немає невалідних рядків",
      selectRowsToRemove: "Виберіть рядки для видалення",
    },
    settings: {
      title: "Налаштування",
      aria: "Панель налаштувань",
      showArticleColumn: "Показати колонку артикля",
      showArticleColumnHint: "Якщо вимкнено, рекомендовано видалити артиклі з конфігурації.",
      showAdditionalInformationColumn: "Показати колонку додаткової інформації",
      addLanguage: "Додайте мову",
      addArticle: "Додати артикль",
      removeItem: "Видалити товар",
      languageErrorEmpty: "Мова не може бути пустою",
      languageErrorExists: "Мова \"{{language}}\" вже існує",
      languageFrom: "Мова оригіналу",
      languagesTo: "Цільові мови",
      articles: "Артиклі",
      delimiter: "Розділювач стовпців",
      additionalInformationDelimiter: "Роздільник додаткової інформації",
      translationDelimiter: "Розділювач перекладу",
      topicFlag: "Префікс теми",
      topicDelimiter: "Розмежувач теми"
    },
    courseHeader: {
      aria: "Курс",
      courseName: "Назва курсу"
    },
    actions: {
      addRow: "+ Додати слово",
      addTopic: "+ Додати тему"
    },
    aiPanel: {
      title: "AI-чернетка",
      requestSection: "Запит",
      requestMode: "Режим",
      requestModeAuto: "Авто",
      requestModeVocabulary: "Повна генерація",
      requestModeTranslations: "Лише переклади",
      parsingSection: "Розбір",
      responseSection: "Відповідь",
      topic: "Тема",
      wordCount: "Слова",
      requestNotes: "Інструкції",
      request: "Запит",
      generateRequest: "Згенерувати запит",
      sendRequest: "Надіслати запит",
      sendingRequest: "Надсилання запиту…",
      requestFailed: "Не вдалося виконати запит до ШІ.",
      requestTimedOut: "Час очікування відповіді ШІ минув.",
      patternBuilder: "Шаблон рядка",
      patternGap: "Розділювач шаблону",
      patternSeparatorNone: "(немає)",
      patternSeparatorTab: "Табуляція",
      addField: "Додати поле",
      moveLeft: "Перемістити ліворуч",
      moveRight: "Перемістити праворуч",
      removeField: "Видалити поле",
      patternPreview: "Форма рядка",
      parseDelimiterHint: "Кілька перекладів розділяються за допомогою «{{delimiter}}» з налаштувань.",
      parseDelimiterHintNone: "Кілька перекладів не розділяються, бо розділювач перекладу в налаштуваннях порожній.",
      suggestPattern: "Запропонувати шаблон",
      patternSuggested: "Шаблон збігся з {{matched}}/{{total}} рядками",
      parseResponse: "Розібрати відповідь",
      response: "Редагована відповідь",
      parseError: "Не вдалося розібрати відповідь",
      parsedRows: "Розібрано рядків: {{count}}",
      parseResultNotParsedPrefix: "Не розібрано:",
      parseResultNotParsed: "Не розібрано:\n{{lines}}",
      parseResultAllParsed: "Усі непорожні рядки розібрано.",
      parseResultEmpty: "Відповідь порожня",
      parseResultNoMatch: "Жоден рядок не збігся з regex-пресетами",
      parseResultMatched: "Збіглися regex-пресети",
      parsingConfigurationMissingPattern: "У конфігурації AI-розбору немає шаблону елемента",
      fillTranslations: "Заповнити переклади",
      addRows: "Додати до таблиці",
      moreActions: "Більше дій",
      replaceRows: "Замінити таблицю",
      replaceConfirm: "Замінити всі поточні рядки таблиці рядками з AI-відповіді?"
    },
    aiPrompt: {
      taskVocabulary: "Завдання: створити стислі словникові рядки.",
      taskTranslation: "Завдання: перекласти перелічені слова.",
      requirementsLine: "Вимоги: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Додайте переклади для всіх цільових мов.",
      multipleTranslationsAllowed: "Дозволено кілька перекладів для однієї мови.",
      addBriefNotes: "Додавайте короткі примітки лише за потреби, наприклад форми множини, відмінювання або вживання.",
      includeArticlesWhenNatural: "Якщо артиклі природні для вихідної мови, додайте їх.",
      course: "Курс: {{course}}",
      topic: "Тема: {{topic}}",
      entryCount: "Кількість записів: {{count}}",
      sourceLanguage: "Вихідна мова: {{language}}",
      targetLanguages: "Цільові мови: {{languages}}",
      words: "Слова:"
    },
    grid: {
      containerAria: "Контейнер-сітка",
      article: "Артикль",
      word: "Слово",
      additionalInfo: "Додаткова інформація",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "Остання дія: {{action}}",
      file: "Файл: {{path}}",
      none: "Жодного"
    },
    action: {
      new: "Новий",
      open: "Відкрити",
      import: "Імпорт",
      save: "Зберегти",
      saveAs: "Зберегти як",
      cancel: "Скасувати",
      reapply: "Повторити",
      export: "Експорт",
      addRow: "Додати слово",
      addTopic: "Додати тему",
      removeRow: "Видалити рядок",
      removeSelectedRows: "Видалити вибрані рядки",
      clearSelectedCells: "Очистити виділені клітинки",
      autosaveRestored: "Автозбереження відновлено",
      copy: "Копія",
      copySelected: "Копіювати вибране",
      pasteFailed: "Не вставити",
      pasteInsert: "Вставити вставку",
      addAiRows: "Додати AI-рядки",
      replaceAiRows: "Замінити AI-рядками",
      generateAiRequest: "Згенерувати AI-запит",
      parseAiRegex: "Розібрати AI-відповідь",
      addTranslationColumn: "Додати стовпець перекладу",
      reorderTranslationColumns: "Змінити порядок стовпців перекладу",
      removeTranslationColumn: "Видалити стовпець перекладу",
      renameTranslationColumn: "Перейменувати стовпець перекладу",
      cannotRemoveLastTranslationColumn: "Неможливо видалити останній стовпець перекладу",
      languageNotFound: "Мова \"{{language}}\" не знайдена",
      languageExists: "Мова \"{{language}}\" вже існує",
      reorderTranslation: "Повторне замовлення перекладу",
      editTranslation: "Редагувати переклад",
      addTranslation: "Додати переклад",
      removeTranslation: "Видалити переклад"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Переклад містить заборонений роздільник стовпців \"{{delimiter}}\"",
      containsColumnDelimiter: "Містить заборонений роздільник стовпців \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Містить роздільник забороненої додаткової інформації \"{{delimiter}}\"",
      containsTopicFlag: "Містить позначку забороненої теми \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Порожня тема не допускається",
      emptyWordNotAllowed: "Порожнє слово не допускається",
      emptyTranslationNotAllowed: "Порожній переклад не допускається",
      articleNotInConfig: "Артикля \"{{article}}\" немає в налаштованих артиклях"
    },
    translation: {
      renameColumn: "Перейменувати стовпець",
      renameFailed: "Не вдалося перейменувати",
      deleteColumn: "Видалити стовпець",
      saveRename: "Зберегти",
      cancelRename: "Скасувати",
      moveUp: "Рухатися вгору",
      moveDown: "Рухатися вниз",
      remove: "Видалити переклад",
      add: "Додати переклад",
      removeRow: "Видалити рядок"
    },
    dialog: {
      cancel: "Скасувати",
      ok: "Підтвердити"
    },
    clipboard: {
      confirmTooManyColumns:
        "Вставлені дані мають {{maxBufferColumns}} стовпців, але лише {{availableColumns}} вписуються у вибрану клітинку. Додаткові стовпці ігноруватимуться. Продовжити?",
      confirmOverwrite: "Деякі цільові клітинки вже містять дані. Вставлення перезапише існуючі значення. Продовжити?"
    },
    agGrid: {
      page: "Сторінка",
      more: "більше",
      to: "до",
      of: "з",
      next: "Далі",
      last: "Останній",
      first: "перше",
      previous: "Попередній",
      loadingOoo: "Завантаження...",
      selectAll: "Виберіть усі",
      searchOoo: "пошук...",
      blanks: "(Бланки)",
      noRowsToShow: "Немає рядків для показу",
      pageSizeSelectorLabel: "Розмір сторінки:",
      ariaPageSizeSelectorLabel: "Розмір сторінки"
    }
  }
} as const;







