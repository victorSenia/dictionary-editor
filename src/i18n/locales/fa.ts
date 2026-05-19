export const fa = {
  translation: {
    app: {
      title: "ویرایشگر فرهنگ لغت"
    },
    toolbar: {
      aria: "نوار ابزار ویرایشگر",
      new: "جدید",
      open: "باز کردن",
      save: "ذخیره",
      saveAs: "ذخیره به عنوان",
      cancel: "لغو",
      reapply: "اعمال مجدد",
      export: "خروجی",
      import: "وارد کردن",
      showAiPanel: "باز کردن پیش‌نویس AI",
      hideAiPanel: "بستن پیش‌نویس AI",
      showSettings: "نمایش تنظیمات",
      hideSettings: "تنظیمات را مخفی کنید",
      removeSelectedRows: "ردیف های انتخاب شده را حذف کنید",
      language: "زبان",
      showOnlyInvalid: "نمایش فقط نامعتبر است",
      noInvalidRows: "هیچ ردیف نامعتبری وجود ندارد",
      selectRowsToRemove: "ردیف‌ها را برای حذف انتخاب کنید",
    },
    settings: {
      title: "تنظیمات",
      aria: "پنل تنظیمات",
      showArticleColumn: "نمایش ستون حرف تعریف",
      showArticleColumnHint: "اگر غیرفعال است، توصیه می‌شود حروف تعریف را از پیکربندی حذف کنید.",
      showAdditionalInformationColumn: "نمایش ستون اطلاعات اضافی",
      addLanguage: "زبان اضافه کنید",
      addArticle: "اضافه کردن حرف تعریف",
      removeItem: "حذف مورد",
      languageErrorEmpty: "زبان نمی تواند خالی باشد",
      languageErrorExists: "زبان \"⁨{{language}}⁩\" از قبل وجود دارد",
      languageFrom: "زبان مبدأ",
      languagesTo: "زبان های هدف",
      articles: "حروف تعریف",
      delimiter: "جداکننده ستون",
      additionalInformationDelimiter: "جداکننده اطلاعات اضافی",
      translationDelimiter: "جداکننده ترجمه",
      topicFlag: "پیشوند موضوع",
      topicDelimiter: "جداکننده موضوع"
    },
    courseHeader: {
      aria: "دوره",
      courseName: "نام دوره"
    },
    actions: {
      addRow: "+ افزودن واژه",
      addTopic: "+ اضافه کردن موضوع"
    },
    aiPanel: {
      title: "پیش‌نویس AI",
      requestSection: "درخواست",
      requestMode: "حالت",
      requestModeAuto: "خودکار",
      requestModeVocabulary: "تولید کامل",
      requestModeTranslations: "فقط ترجمه‌ها",
      parsingSection: "تجزیه",
      responseSection: "پاسخ",
      topic: "موضوع",
      wordCount: "واژه‌ها",
      requestNotes: "دستورالعمل‌ها",
      request: "درخواست",
      generateRequest: "ایجاد درخواست",
      linePrefixPreset: "پیشوند خط",
      patternBuilder: "الگوی خط",
      patternGap: "جداکننده الگو",
      patternSeparatorNone: "(هیچ‌کدام)",
      patternSeparatorTab: "تب",
      addField: "افزودن فیلد",
      moveLeft: "انتقال به چپ",
      moveRight: "انتقال به راست",
      removeField: "حذف فیلد",
      patternPreview: "شکل خط",
      parseDelimiterHint: "ترجمه‌های متعدد با «⁨{{delimiter}}⁩» از تنظیمات جدا می‌شوند.",
      parseDelimiterHintNone: "ترجمه‌های متعدد جدا نمی‌شوند، چون جداکننده ترجمه در تنظیمات خالی است.",
      suggestPattern: "پیشنهاد الگو",
      patternSuggested: "الگو با ⁨{{matched}}⁩ از ⁨{{total}}⁩ خط مطابقت داشت",
      parseResponse: "تجزیه پاسخ",
      response: "پاسخ قابل ویرایش",
      parseError: "امکان تجزیه پاسخ وجود ندارد",
      parsedRows: "⁨{{count}}⁩ ردیف تجزیه شد",
      parseResultNotParsedPrefix: "تجزیه نشد:",
      parseResultNotParsed: "تجزیه نشد:\n⁨{{lines}}⁩",
      parseResultAllParsed: "همه خط‌های غیرخالی تجزیه شدند.",
      parseResultEmpty: "پاسخ خالی است",
      parseResultNoMatch: "هیچ خطی با پیش‌تنظیم‌های regex مطابقت نداشت",
      parseResultMatched: "پیش‌تنظیم‌های regex مطابق",
      parsingConfigurationMissingPattern: "پیکربندی تجزیه AI الگوی آیتم ندارد",
      fillTranslations: "پر کردن ترجمه‌ها",
      addRows: "افزودن به جدول",
      moreActions: "اقدام‌های بیشتر",
      replaceRows: "جایگزینی جدول",
      replaceConfirm: "همه ردیف‌های فعلی جدول با ردیف‌های پاسخ AI جایگزین شوند؟"
    },
    aiPrompt: {
      taskVocabulary: "وظیفه: ردیف‌های واژگان کوتاه ایجاد کنید.",
      taskTranslation: "وظیفه: واژه‌های فهرست‌شده را ترجمه کنید.",
      requirementsLine: "الزامات: ⁨{{allLanguages}}⁩، ⁨{{multipleTranslations}}⁩، ⁨{{notes}}⁩، ⁨{{articles}}⁩",
      includeTranslationsForAllTargetLanguages: "ترجمه‌ها را برای همه زبان‌های مقصد اضافه کنید.",
      multipleTranslationsAllowed: "چند ترجمه برای هر زبان مجاز است.",
      addBriefNotes: "فقط در صورت مفید بودن، یادداشت‌های کوتاه مانند جمع، صرف یا کاربرد را اضافه کنید.",
      includeArticlesWhenNatural: "اگر حرف تعریف در زبان مبدأ طبیعی است، آن را اضافه کنید.",
      course: "دوره: ⁨{{course}}⁩",
      topic: "موضوع: ⁨{{topic}}⁩",
      entryCount: "تعداد ورودی‌ها: ⁨{{count}}⁩",
      sourceLanguage: "زبان مبدأ: ⁨{{language}}⁩",
      targetLanguages: "زبان‌های مقصد: ⁨{{languages}}⁩",
      words: "واژه‌ها:"
    },
    grid: {
      containerAria: "ظرف توری",
      article: "حرف تعریف",
      word: "کلمه",
      additionalInfo: "اطلاعات اضافی",
      toLanguage: "⁨{{language}}⁩"
    },
    status: {
      lastAction: "آخرین اقدام: ⁨{{action}}⁩",
      file: "فایل: ⁨{{path}}⁩",
      none: "هیچ کدام"
    },
    action: {
      new: "جدید",
      open: "باز کردن",
      import: "وارد کردن",
      save: "ذخیره",
      saveAs: "ذخیره به عنوان",
      cancel: "لغو",
      reapply: "اعمال مجدد",
      export: "خروجی",
      addRow: "افزودن واژه",
      addTopic: "اضافه کردن موضوع",
      removeRow: "ردیف را حذف کنید",
      removeSelectedRows: "ردیف های انتخاب شده را حذف کنید",
      clearSelectedCells: "سلول های انتخاب شده را پاک کنید",
      autosaveRestored: "ذخیره خودکار بازیابی شد",
      copy: "کپی کنید",
      copySelected: "کپی انتخاب شده",
      pasteFailed: "چسباندن ناموفق بود",
      pasteInsert: "چسباندن درج",
      addAiRows: "افزودن ردیف‌های AI",
      replaceAiRows: "جایگزینی با ردیف‌های AI",
      generateAiRequest: "ایجاد درخواست AI",
      parseAiRegex: "تجزیه پاسخ AI",
      addTranslationColumn: "اضافه کردن ستون ترجمه",
      reorderTranslationColumns: "ترتیب مجدد ستون های ترجمه",
      removeTranslationColumn: "حذف ستون ترجمه",
      renameTranslationColumn: "تغییر نام ستون ترجمه",
      cannotRemoveLastTranslationColumn: "آخرین ستون ترجمه حذف نمی شود",
      languageNotFound: "زبان \"⁨{{language}}⁩\" یافت نشد",
      languageExists: "زبان \"⁨{{language}}⁩\" از قبل وجود دارد",
      reorderTranslation: "سفارش مجدد ترجمه",
      editTranslation: "ویرایش ترجمه",
      addTranslation: "ترجمه اضافه کنید",
      removeTranslation: "حذف ترجمه"
    },
    validation: {
      translationContainsColumnDelimiter:
        "ترجمه حاوی جداکننده ستون ممنوع \"⁨{{delimiter}}⁩\" است",
      containsColumnDelimiter: "حاوی جداکننده ستون ممنوع \"⁨{{delimiter}}⁩\"",
      containsAdditionalInformationDelimiter:
        "حاوی اطلاعات اضافی ممنوع \"⁨{{delimiter}}⁩\"",
      containsTopicFlag: "حاوی پرچم موضوع ممنوع \"⁨{{topicFlag}}⁩\"",
      emptyTopicNotAllowed: "موضوع خالی مجاز نمی باشد",
      emptyWordNotAllowed: "کلمه خالی مجاز نیست",
      emptyTranslationNotAllowed: "ترجمه خالی مجاز نیست",
      articleNotInConfig: "حرف تعریف \"⁨{{article}}⁩\" در حروف تعریف پیکربندی‌شده نیست"
    },
    translation: {
      renameColumn: "تغییر نام ستون",
      renameFailed: "تغییر نام انجام نشد",
      deleteColumn: "حذف ستون",
      saveRename: "ذخیره",
      cancelRename: "لغو",
      moveUp: "حرکت به بالا",
      moveDown: "به پایین حرکت کنید",
      remove: "حذف ترجمه",
      add: "ترجمه اضافه کنید",
      removeRow: "ردیف را حذف کنید"
    },
    dialog: {
      cancel: "لغو کنید",
      ok: "تایید"
    },
    clipboard: {
      confirmTooManyColumns:
        "داده‌های جای‌گذاری‌شده دارای ⁨{{maxBufferColumns}}⁩ ستون هستند، اما فقط ⁨{{availableColumns}}⁩ از سلول انتخاب‌شده جای می‌گیرد. ستون های اضافی نادیده گرفته می شوند. ادامه دهید؟",
      confirmOverwrite: "برخی از سلول های هدف قبلاً حاوی داده هستند. چسباندن مقادیر موجود را بازنویسی می کند. ادامه دهید؟"
    },
    agGrid: {
      page: "صفحه",
      more: "بیشتر",
      to: "به",
      of: "از",
      next: "بعدی",
      last: "آخرین",
      first: "اول",
      previous: "قبلی",
      loadingOoo: "در حال بارگیری...",
      selectAll: "همه را انتخاب کنید",
      searchOoo: "جستجو...",
      blanks: "(جاهای خالی)",
      noRowsToShow: "هیچ ردیفی برای نمایش وجود ندارد",
      pageSizeSelectorLabel: "اندازه صفحه:",
      ariaPageSizeSelectorLabel: "اندازه صفحه"
    }
  }
} as const;







