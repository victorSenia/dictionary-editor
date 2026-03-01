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
      showSettings: "نمایش تنظیمات",
      hideSettings: "تنظیمات را مخفی کنید",
      removeSelectedRows: "ردیف های انتخاب شده را حذف کنید",
      language: "زبان",
      showOnlyInvalid: "نمایش فقط نامعتبر است"
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
      languageErrorExists: "زبان \"{{language}}\" از قبل وجود دارد",
      languageFrom: "زبان مبدأ",
      languagesTo: "زبان های هدف (با کاما از هم جدا شده اند)",
      articles: "حروف تعریف (با کاما جدا شده)",
      delimiter: "جداکننده ستون",
      additionalInformationDelimiter: "جداکننده اطلاعات اضافی",
      translationDelimiter: "جداکننده ترجمه",
      topicFlag: "پیشوند موضوع",
      topicDelimiter: "جداکننده موضوع",
      rootTopic: "موضوع ریشه ای"
    },
    actions: {
      addRow: "+ افزودن ردیف",
      addTopic: "+ اضافه کردن موضوع"
    },
    grid: {
      containerAria: "ظرف توری",
      article: "حرف تعریف",
      word: "کلمه",
      additionalInfo: "اطلاعات اضافی",
      toLanguage: "به {{language}}"
    },
    status: {
      lastAction: "آخرین اقدام: {{action}}",
      file: "فایل: {{path}}",
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
      addRow: "ردیف اضافه کنید",
      addTopic: "اضافه کردن موضوع",
      removeRow: "ردیف را حذف کنید",
      removeSelectedRows: "ردیف های انتخاب شده را حذف کنید",
      clearSelectedCells: "سلول های انتخاب شده را پاک کنید",
      autosaveRestored: "ذخیره خودکار بازیابی شد",
      copy: "کپی کنید",
      copySelected: "کپی انتخاب شده",
      pasteFailed: "چسباندن ناموفق بود",
      pasteInsert: "چسباندن درج",
      addTranslationColumn: "اضافه کردن ستون ترجمه",
      reorderTranslationColumns: "ترتیب مجدد ستون های ترجمه",
      removeTranslationColumn: "حذف ستون ترجمه",
      renameTranslationColumn: "تغییر نام ستون ترجمه",
      cannotRemoveLastTranslationColumn: "آخرین ستون ترجمه حذف نمی شود",
      languageNotFound: "زبان \"{{language}}\" یافت نشد",
      languageExists: "زبان \"{{language}}\" از قبل وجود دارد",
      reorderTranslation: "سفارش مجدد ترجمه",
      editTranslation: "ویرایش ترجمه",
      addTranslation: "ترجمه اضافه کنید",
      removeTranslation: "حذف ترجمه"
    },
    validation: {
      translationContainsColumnDelimiter:
        "ترجمه حاوی جداکننده ستون ممنوع \"{{delimiter}}\" است",
      containsColumnDelimiter: "حاوی جداکننده ستون ممنوع \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "حاوی اطلاعات اضافی ممنوع \"{{delimiter}}\"",
      containsTopicFlag: "حاوی پرچم موضوع ممنوع \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "موضوع خالی مجاز نمی باشد",
      emptyWordNotAllowed: "کلمه خالی مجاز نیست",
      emptyTranslationNotAllowed: "ترجمه خالی مجاز نیست",
      articleNotInConfig: "حرف تعریف \"{{article}}\" در حروف تعریف پیکربندی‌شده نیست"
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
        "داده‌های جای‌گذاری‌شده دارای {{maxBufferColumns}} ستون هستند، اما فقط {{availableColumns}} از سلول انتخاب‌شده جای می‌گیرد. ستون های اضافی نادیده گرفته می شوند. ادامه دهید؟",
      confirmOverwrite: "برخی از سلول های هدف قبلاً حاوی داده هستند. چسباندن مقادیر موجود را بازنویسی می کند. ادامه دهید؟"
    },    topic: {
      new: "موضوع جدید"
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
      noRowsToShow: "هیچ ردیفی برای نمایش وجود ندارد"
    }
  }
} as const;







