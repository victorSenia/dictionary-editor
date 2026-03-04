export const bn = {
  translation: {
    app: {
      title: "অভিধান সম্পাদক"
    },
    toolbar: {
      aria: "সম্পাদক টুলবার",
      new: "নতুন",
      open: "খুলুন",
      save: "সংরক্ষণ",
      saveAs: "নাম দিয়ে সংরক্ষণ",
      cancel: "বাতিল",
      reapply: "পুনরায় প্রয়োগ",
      export: "রপ্তানি",
      import: "আমদানি",
      showSettings: "সেটিংস দেখান",
      hideSettings: "সেটিংস লুকান",
      removeSelectedRows: "নির্বাচিত সারি সরান",
      language: "ভাষা",
      showOnlyInvalid: "শুধুমাত্র অবৈধ দেখান"
    },
    settings: {
      title: "সেটিংস",
      aria: "সেটিংস প্যানেল",
      showArticleColumn: "আর্টিকেল কলাম দেখান",
      showArticleColumnHint: "অক্ষম থাকলে, কনফিগারেশন থেকে আর্টিকেলগুলো সরানোর পরামর্শ দেওয়া হয়।",
      showAdditionalInformationColumn: "অতিরিক্ত তথ্য কলাম দেখান",
      addLanguage: "ভাষা যোগ করুন",
      addArticle: "আর্টিকেল যোগ করুন",
      removeItem: "আইটেম সরান",
      languageErrorEmpty: "ভাষা খালি হতে পারে না",
      languageErrorExists: "\"{{language}}\" ভাষা আগে থেকেই বিদ্যমান",
      languageFrom: "উৎস ভাষা",
      languagesTo: "টার্গেট ভাষা (কমা দিয়ে আলাদা করা)",
      articles: "আর্টিকেল (কমা দিয়ে পৃথক করা)",
      delimiter: "কলাম ডিলিমিটার",
      additionalInformationDelimiter: "অতিরিক্ত তথ্য ডিলিমিটার",
      translationDelimiter: "অনুবাদ ডিলিমিটার",
      topicFlag: "বিষয় উপসর্গ",
      topicDelimiter: "টপিক ডিলিমিটার",
      rootTopic: "মূল বিষয়"
    },
    actions: {
      addRow: "+ সারি যোগ করুন",
      addTopic: "+ বিষয় যোগ করুন"
    },
    grid: {
      containerAria: "গ্রিড ধারক",
      article: "আর্টিকেল",
      word: "শব্দ",
      additionalInfo: "অতিরিক্ত তথ্য",
      toLanguage: "প্রতি {{language}}"
    },
    status: {
      lastAction: "শেষ কাজ: {{action}}",
      file: "ফাইল: {{path}}",
      none: "কোনোটিই নয়"
    },
    action: {
      new: "নতুন",
      open: "খুলুন",
      import: "আমদানি",
      save: "সংরক্ষণ",
      saveAs: "নাম দিয়ে সংরক্ষণ",
      cancel: "বাতিল",
      reapply: "পুনরায় প্রয়োগ",
      export: "রপ্তানি",
      addRow: "সারি যোগ করুন",
      addTopic: "বিষয় যোগ করুন",
      removeRow: "সারি সরান",
      removeSelectedRows: "নির্বাচিত সারি সরান",
      clearSelectedCells: "নির্বাচিত কোষ সাফ করুন",
      autosaveRestored: "অটোসেভ পুনরুদ্ধার করা হয়েছে",
      copy: "কপি",
      copySelected: "কপি নির্বাচিত",
      pasteFailed: "পেস্ট ব্যর্থ হয়েছে",
      pasteInsert: "পেস্ট সন্নিবেশ",
      addTranslationColumn: "অনুবাদ কলাম যোগ করুন",
      reorderTranslationColumns: "অনুবাদ কলাম পুনরায় সাজান",
      removeTranslationColumn: "অনুবাদ কলাম সরান",
      renameTranslationColumn: "অনুবাদ কলাম পুনঃনামকরণ করুন",
      cannotRemoveLastTranslationColumn: "শেষ অনুবাদ কলাম সরানো যাবে না",
      languageNotFound: "\"{{language}}\" ভাষা পাওয়া যায়নি",
      languageExists: "\"{{language}}\" ভাষা আগে থেকেই বিদ্যমান",
      reorderTranslation: "অনুবাদ পুনরায় সাজান",
      editTranslation: "অনুবাদ সম্পাদনা করুন",
      addTranslation: "অনুবাদ যোগ করুন",
      removeTranslation: "অনুবাদ সরান"
    },
    validation: {
      translationContainsColumnDelimiter:
        "অনুবাদে নিষিদ্ধ কলাম ডিলিমিটার \"{{delimiter}}\" রয়েছে",
      containsColumnDelimiter: "নিষিদ্ধ কলাম ডিলিমিটার \"{{delimiter}}\" রয়েছে",
      containsAdditionalInformationDelimiter:
        "নিষিদ্ধ অতিরিক্ত তথ্য বিভাজক \"{{delimiter}}\" রয়েছে",
      containsTopicFlag: "নিষিদ্ধ বিষয় পতাকা \"{{topicFlag}}\" রয়েছে",
      emptyTopicNotAllowed: "খালি বিষয় অনুমোদিত নয়",
      emptyWordNotAllowed: "খালি শব্দ অনুমোদিত নয়",
      emptyTranslationNotAllowed: "খালি অনুবাদ অনুমোদিত নয়",
      articleNotInConfig: "আর্টিকেল \"{{article}}\" কনফিগার করা আর্টিকেলগুলোর মধ্যে নেই"
    },
    translation: {
      renameColumn: "কলাম পুনঃনামকরণ করুন",
      renameFailed: "পুনঃনামকরণ ব্যর্থ হয়েছে৷",
      deleteColumn: "কলাম মুছুন",
      saveRename: "সংরক্ষণ",
      cancelRename: "বাতিল",
      moveUp: "উপরে সরান",
      moveDown: "নিচে সরান",
      remove: "অনুবাদ সরান",
      add: "অনুবাদ যোগ করুন",
      removeRow: "সারি সরান"
    },
    dialog: {
      cancel: "বাতিল করুন",
      ok: "ঠিক আছে"
    },
    clipboard: {
      confirmTooManyColumns:
        "আটকানো ডেটাতে {{maxBufferColumns}} কলাম আছে, কিন্তু নির্বাচিত ঘর থেকে শুধুমাত্র {{availableColumns}} ফিট। অতিরিক্ত কলাম উপেক্ষা করা হবে. চালিয়ে যান?",
      confirmOverwrite: "কিছু টার্গেট সেল ইতিমধ্যেই ডেটা ধারণ করে। পেস্ট করা বিদ্যমান মান ওভাররাইট করবে। চালিয়ে যান?"
    },
    agGrid: {
      page: "পাতা",
      more: "আরও",
      to: "থেকে",
      of: "এর",
      next: "পরবর্তী",
      last: "শেষ",
      first: "প্রথম",
      previous: "আগের",
      loadingOoo: "লোড হচ্ছে...",
      selectAll: "সব নির্বাচন করুন",
      searchOoo: "অনুসন্ধান করুন...",
      blanks: "(ফাঁকা)",
      noRowsToShow: "দেখানোর জন্য কোন সারি নেই"
    }
  }
} as const;







