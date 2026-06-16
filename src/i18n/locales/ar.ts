export const ar = {
  translation: {
    app: {
      title: "محرر القاموس"
    },
    toolbar: {
      aria: "شريط أدوات المحرر",
      new: "جديد",
      open: "فتح",
      save: "حفظ",
      saveAs: "حفظ باسم",
      cancel: "إلغاء",
      reapply: "إعادة تطبيق",
      export: "تصدير",
      import: "استيراد",
      showAiPanel: "فتح مسودة الذكاء الاصطناعي",
      hideAiPanel: "إغلاق مسودة الذكاء الاصطناعي",
      showSettings: "إظهار الإعدادات",
      hideSettings: "إخفاء الإعدادات",
      removeSelectedRows: "إزالة الصفوف المحددة",
      language: "لغة",
      showOnlyInvalid: "إظهار غير صالح فقط",
      noInvalidRows: "لا توجد صفوف غير صالحة",
      selectRowsToRemove: "حدد الصفوف المراد إزالتها",
    },
    settings: {
      title: "إعدادات",
      aria: "لوحة الإعدادات",
      showArticleColumn: "إظهار عمود أداة التعريف",
      showArticleColumnHint: "إذا تم تعطيله، فمن المستحسن إزالة أدوات التعريف من التكوين.",
      showAdditionalInformationColumn: "إظهار عمود المعلومات الإضافية",
      addLanguage: "أضف لغة",
      addArticle: "أضف أداة تعريف",
      removeItem: "إزالة العنصر",
      languageErrorEmpty: "لا يمكن أن تكون اللغة فارغة",
      languageErrorExists: "اللغة \"⁨{{language}}⁩\" موجودة بالفعل",
      languageFrom: "لغة المصدر",
      languagesTo: "اللغات المستهدفة",
      articles: "أدوات التعريف",
      delimiter: "محدد العمود",
      additionalInformationDelimiter: "محدد معلومات إضافية",
      translationDelimiter: "محدد الترجمة",
      topicFlag: "بادئة الموضوع",
      topicDelimiter: "محدد الموضوع"
    },
    courseHeader: {
      aria: "الدورة",
      courseName: "اسم الدورة"
    },
    actions: {
      addRow: "+ إضافة كلمة",
      addTopic: "+ إضافة موضوع"
    },
    aiPanel: {
      title: "مسودة AI",
      requestSection: "الطلب",
      requestMode: "الوضع",
      requestModeAuto: "تلقائي",
      requestModeVocabulary: "إنشاء كامل",
      requestModeTranslations: "الترجمات فقط",
      parsingSection: "التحليل",
      responseSection: "الاستجابة",
      topic: "الموضوع",
      wordCount: "الكلمات",
      requestNotes: "التعليمات",
      request: "الطلب",
      generateRequest: "إنشاء الطلب",
      sendRequest: "إرسال الطلب",
      sendingRequest: "جارٍ إرسال الطلب…",
      requestFailed: "فشل طلب الذكاء الاصطناعي.",
      requestTimedOut: "انتهت مهلة طلب الذكاء الاصطناعي.",
      patternBuilder: "نمط السطر",
      patternGap: "فاصل النمط",
      patternSeparatorNone: "(بدون)",
      patternSeparatorTab: "تبويب",
      addField: "إضافة حقل",
      moveLeft: "نقل إلى اليسار",
      moveRight: "نقل إلى اليمين",
      removeField: "إزالة الحقل",
      patternPreview: "شكل السطر",
      parseDelimiterHint: "تُقسَّم الترجمات المتعددة باستخدام \"⁨{{delimiter}}⁩\" من الإعدادات.",
      parseDelimiterHintNone: "لا تُقسَّم الترجمات المتعددة لأن محدد الترجمة فارغ في الإعدادات.",
      suggestPattern: "اقتراح نمط",
      patternSuggested: "تطابق النمط مع ⁨{{matched}}⁩ من أصل ⁨{{total}}⁩ سطرًا",
      parseResponse: "تحليل الاستجابة",
      response: "استجابة قابلة للتحرير",
      parseError: "تعذر تحليل الاستجابة",
      parsedRows: "تم تحليل ⁨{{count}}⁩ صفًا",
      parseResultNotParsedPrefix: "لم يتم التحليل:",
      parseResultNotParsed: "لم يتم التحليل:\n⁨{{lines}}⁩",
      parseResultAllParsed: "تم تحليل جميع الأسطر غير الفارغة.",
      parseResultEmpty: "الاستجابة فارغة",
      parseResultNoMatch: "لم تطابق أي أسطر إعدادات regex المسبقة",
      parseResultMatched: "إعدادات regex المسبقة المطابقة",
      parsingConfigurationMissingPattern: "لا يحتوي إعداد تحليل AI على نمط عنصر",
      fillTranslations: "ملء الترجمات",
      addRows: "إضافة إلى الجدول",
      moreActions: "إجراءات أخرى",
      replaceRows: "استبدال الجدول",
      replaceConfirm: "هل تريد استبدال كل صفوف الجدول الحالية بصفوف استجابة AI؟"
    },
    aiPrompt: {
      taskVocabulary: "المهمة: أنشئ صفوف مفردات موجزة.",
      taskTranslation: "المهمة: ترجم الكلمات المدرجة.",
      requirementsLine: "المتطلبات: ⁨{{allLanguages}}⁩، ⁨{{multipleTranslations}}⁩، ⁨{{notes}}⁩، ⁨{{articles}}⁩",
      includeTranslationsForAllTargetLanguages: "ضمّن الترجمات لكل اللغات المستهدفة.",
      multipleTranslationsAllowed: "يُسمح بترجمات متعددة لكل لغة.",
      addBriefNotes: "أضف ملاحظات مختصرة فقط عند فائدتها، مثل صيغ الجمع أو التصريف أو الاستخدام.",
      includeArticlesWhenNatural: "إذا كانت أدوات التعريف طبيعية في لغة المصدر، فقم بتضمينها.",
      course: "الدورة: ⁨{{course}}⁩",
      topic: "الموضوع: ⁨{{topic}}⁩",
      entryCount: "عدد الإدخالات: ⁨{{count}}⁩",
      sourceLanguage: "لغة المصدر: ⁨{{language}}⁩",
      targetLanguages: "اللغات المستهدفة: ⁨{{languages}}⁩",
      words: "الكلمات:"
    },
    grid: {
      containerAria: "حاوية الشبكة",
      article: "أداة التعريف",
      word: "كلمة",
      additionalInfo: "معلومات إضافية",
      toLanguage: "⁨{{language}}⁩"
    },
    status: {
      lastAction: "الإجراء الأخير: ⁨{{action}}⁩",
      file: "الملف: ⁨{{path}}⁩",
      none: "لا أحد"
    },
    action: {
      new: "جديد",
      open: "فتح",
      import: "استيراد",
      save: "حفظ",
      saveAs: "حفظ باسم",
      cancel: "إلغاء",
      reapply: "إعادة تطبيق",
      export: "تصدير",
      addRow: "إضافة كلمة",
      addTopic: "إضافة موضوع",
      removeRow: "إزالة الصف",
      removeSelectedRows: "إزالة الصفوف المحددة",
      clearSelectedCells: "مسح الخلايا المحددة",
      autosaveRestored: "تمت استعادة الحفظ التلقائي",
      copy: "ينسخ",
      copySelected: "نسخ المحدد",
      pasteFailed: "فشل اللصق",
      pasteInsert: "لصق إدراج",
      addAiRows: "إضافة صفوف AI",
      replaceAiRows: "استبدال بصفوف AI",
      generateAiRequest: "إنشاء طلب AI",
      parseAiRegex: "تحليل استجابة AI",
      addTranslationColumn: "إضافة عمود الترجمة",
      reorderTranslationColumns: "إعادة ترتيب أعمدة الترجمة",
      removeTranslationColumn: "إزالة عمود الترجمة",
      renameTranslationColumn: "إعادة تسمية عمود الترجمة",
      cannotRemoveLastTranslationColumn: "لا يمكن إزالة عمود الترجمة الأخير",
      languageNotFound: "لم يتم العثور على اللغة \"⁨{{language}}⁩\".",
      languageExists: "اللغة \"⁨{{language}}⁩\" موجودة بالفعل",
      reorderTranslation: "إعادة ترتيب الترجمة",
      editTranslation: "تحرير الترجمة",
      addTranslation: "أضف الترجمة",
      removeTranslation: "إزالة الترجمة"
    },
    validation: {
      translationContainsColumnDelimiter:
        "تحتوي الترجمة على محدد عمود ممنوع \"⁨{{delimiter}}⁩\"",
      containsColumnDelimiter: "يحتوي على محدد العمود المحظور \"⁨{{delimiter}}⁩\"",
      containsAdditionalInformationDelimiter:
        "يحتوي على محدد المعلومات الإضافية المحظورة \"⁨{{delimiter}}⁩\"",
      containsTopicFlag: "يحتوي على علامة موضوع محظور \"⁨{{topicFlag}}⁩\"",
      emptyTopicNotAllowed: "غير مسموح بالموضوع الفارغ",
      emptyWordNotAllowed: "الكلمة الفارغة غير مسموح بها",
      emptyTranslationNotAllowed: "الترجمة الفارغة غير مسموح بها",
      articleNotInConfig: "أداة التعريف \"⁨{{article}}⁩\" ليست ضمن أدوات التعريف المكوّنة"
    },
    translation: {
      renameColumn: "إعادة تسمية العمود",
      renameFailed: "فشلت إعادة التسمية",
      deleteColumn: "حذف العمود",
      saveRename: "حفظ",
      cancelRename: "إلغاء",
      moveUp: "تحرك للأعلى",
      moveDown: "تحرك للأسفل",
      remove: "إزالة الترجمة",
      add: "أضف الترجمة",
      removeRow: "إزالة الصف"
    },
    dialog: {
      cancel: "يلغي",
      ok: "موافق"
    },
    clipboard: {
      confirmTooManyColumns:
        "تحتوي البيانات التي تم لصقها على أعمدة ⁨{{maxBufferColumns}}⁩، ولكن يتم احتواؤها فقط ⁨{{availableColumns}}⁩ من الخلية المحددة. سيتم تجاهل الأعمدة الإضافية. يكمل؟",
      confirmOverwrite: "تحتوي بعض الخلايا المستهدفة على بيانات بالفعل. سيؤدي اللصق إلى استبدال القيم الموجودة. يكمل؟"
    },
    agGrid: {
      page: "صفحة",
      more: "أكثر",
      to: "ل",
      of: "ل",
      next: "التالي",
      last: "آخر",
      first: "أولاً",
      previous: "سابق",
      loadingOoo: "تحميل...",
      selectAll: "حدد الكل",
      searchOoo: "يبحث...",
      blanks: "(الفراغات)",
      noRowsToShow: "لا توجد صفوف لإظهارها",
      pageSizeSelectorLabel: "حجم الصفحة:",
      ariaPageSizeSelectorLabel: "حجم الصفحة"
    }
  }
} as const;







