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
      showSettings: "إظهار الإعدادات",
      hideSettings: "إخفاء الإعدادات",
      removeSelectedRows: "إزالة الصفوف المحددة",
      language: "لغة",
      showOnlyInvalid: "إظهار غير صالح فقط"
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
      languageErrorExists: "اللغة \"{{language}}\" موجودة بالفعل",
      languageFrom: "لغة المصدر",
      languagesTo: "اللغات المستهدفة (مفصولة بفواصل)",
      articles: "أدوات التعريف (مفصولة بفواصل)",
      delimiter: "محدد العمود",
      additionalInformationDelimiter: "محدد معلومات إضافية",
      translationDelimiter: "محدد الترجمة",
      topicFlag: "بادئة الموضوع",
      topicDelimiter: "محدد الموضوع",
      rootTopic: "موضوع الجذر"
    },
    actions: {
      addRow: "+ إضافة صف",
      addTopic: "+ إضافة موضوع"
    },
    grid: {
      containerAria: "حاوية الشبكة",
      article: "أداة التعريف",
      word: "كلمة",
      additionalInfo: "معلومات إضافية",
      toLanguage: "إلى {{language}}"
    },
    status: {
      lastAction: "الإجراء الأخير: {{action}}",
      file: "الملف: {{path}}",
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
      addRow: "إضافة صف",
      addTopic: "إضافة موضوع",
      removeRow: "إزالة الصف",
      removeSelectedRows: "إزالة الصفوف المحددة",
      clearSelectedCells: "مسح الخلايا المحددة",
      autosaveRestored: "تمت استعادة الحفظ التلقائي",
      copy: "ينسخ",
      copySelected: "نسخ المحدد",
      pasteFailed: "فشل اللصق",
      pasteInsert: "لصق إدراج",
      addTranslationColumn: "إضافة عمود الترجمة",
      reorderTranslationColumns: "إعادة ترتيب أعمدة الترجمة",
      removeTranslationColumn: "إزالة عمود الترجمة",
      renameTranslationColumn: "إعادة تسمية عمود الترجمة",
      cannotRemoveLastTranslationColumn: "لا يمكن إزالة عمود الترجمة الأخير",
      languageNotFound: "لم يتم العثور على اللغة \"{{language}}\".",
      languageExists: "اللغة \"{{language}}\" موجودة بالفعل",
      reorderTranslation: "إعادة ترتيب الترجمة",
      editTranslation: "تحرير الترجمة",
      addTranslation: "أضف الترجمة",
      removeTranslation: "إزالة الترجمة"
    },
    validation: {
      translationContainsColumnDelimiter:
        "تحتوي الترجمة على محدد عمود ممنوع \"{{delimiter}}\"",
      containsColumnDelimiter: "يحتوي على محدد العمود المحظور \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "يحتوي على محدد المعلومات الإضافية المحظورة \"{{delimiter}}\"",
      containsTopicFlag: "يحتوي على علامة موضوع محظور \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "غير مسموح بالموضوع الفارغ",
      emptyWordNotAllowed: "الكلمة الفارغة غير مسموح بها",
      emptyTranslationNotAllowed: "الترجمة الفارغة غير مسموح بها",
      articleNotInConfig: "أداة التعريف \"{{article}}\" ليست ضمن أدوات التعريف المكوّنة"
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
        "تحتوي البيانات التي تم لصقها على أعمدة {{maxBufferColumns}}، ولكن يتم احتواؤها فقط {{availableColumns}} من الخلية المحددة. سيتم تجاهل الأعمدة الإضافية. يكمل؟",
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
      noRowsToShow: "لا توجد صفوف لإظهارها"
    }
  }
} as const;







