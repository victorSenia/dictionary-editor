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
      showSettings: "Показати налаштування",
      hideSettings: "Приховати налаштування",
      removeSelectedRows: "Видалити вибрані рядки",
      language: "Мова",
      showOnlyInvalid: "Показати лише недійсні"
    },
    settings: {
      title: "Налаштування",
      aria: "Панель налаштувань",
      showArticleColumn: "Показати колонку артикля",
      showArticleColumnHint: "Якщо вимкнено, рекомендовано видалити статті з конфігурації.",
      showAdditionalInformationColumn: "Показати колонку додаткової інформації",
      addLanguage: "Додайте мову",
      addArticle: "Додати статтю",
      removeItem: "Видалити товар",
      languageErrorEmpty: "Мова не може бути пустою",
      languageErrorExists: "Мова \"{{language}}\" вже існує",
      languageFrom: "Мова оригіналу",
      languagesTo: "Цільові мови (розділені комами)",
      articles: "Статті (через кому)",
      delimiter: "Розділювач стовпців",
      additionalInformationDelimiter: "Роздільник додаткової інформації",
      translationDelimiter: "Розділювач перекладу",
      topicFlag: "Префікс теми",
      topicDelimiter: "Розмежувач теми",
      rootTopic: "Корінна тема"
    },
    actions: {
      addRow: "+ Додати рядок",
      addTopic: "+ Додати тему"
    },
    grid: {
      containerAria: "Контейнер-сітка",
      article: "Артикль",
      word: "Слово",
      additionalInfo: "Додаткова інформація",
      toLanguage: "До {{language}}"
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
      addRow: "Додати рядок",
      addTopic: "Додати тему",
      removeRow: "Видалити рядок",
      removeSelectedRows: "Видалити вибрані рядки",
      clearSelectedCells: "Очистити виділені клітинки",
      autosaveRestored: "Автозбереження відновлено",
      copy: "Копія",
      copySelected: "Копіювати вибране",
      pasteFailed: "Не вставити",
      pasteInsert: "Вставити вставку",
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
      articleNotInConfig: "Статті \"{{article}}\" немає в налаштованих статтях"
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
    },    topic: {
      new: "Нова тема"
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
      noRowsToShow: "Немає рядків для показу"
    }
  }
} as const;







