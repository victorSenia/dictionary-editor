export const hi = {
  translation: {
    app: {
      title: "शब्दकोश संपादक"
    },
    toolbar: {
      aria: "संपादक टूलबार",
      new: "नया",
      open: "खोलें",
      save: "सहेजें",
      saveAs: "इस नाम से सहेजें",
      cancel: "रद्द करें",
      reapply: "फिर लागू करें",
      export: "निर्यात",
      import: "आयात",
      showSettings: "सेटिंग दिखाएँ",
      hideSettings: "सेटिंग्स छिपाएँ",
      removeSelectedRows: "चयनित पंक्तियाँ हटाएँ",
      language: "भाषा",
      showOnlyInvalid: "केवल अमान्य दिखाएं"
    },
    settings: {
      title: "सेटिंग्स",
      aria: "सेटिंग्स पैनल",
      showArticleColumn: "उपपद कॉलम दिखाएँ",
      showArticleColumnHint: "यदि अक्षम है, तो कॉन्फ़िगरेशन से आर्टिकल हटाने की अनुशंसा की जाती है।",
      showAdditionalInformationColumn: "अतिरिक्त जानकारी कॉलम दिखाएँ",
      addLanguage: "भाषा जोड़ें",
      addArticle: "आर्टिकल जोड़ें",
      removeItem: "वस्तु निकालें",
      languageErrorEmpty: "भाषा खाली नहीं हो सकती",
      languageErrorExists: "भाषा \"{{language}}\" पहले से मौजूद है",
      languageFrom: "स्रोत भाषा",
      languagesTo: "लक्ष्य भाषाएँ (अल्पविराम से अलग)",
      articles: "आर्टिकल (कॉमा से अलग)",
      delimiter: "कॉलम सीमांकक",
      additionalInformationDelimiter: "अतिरिक्त जानकारी सीमांकक",
      translationDelimiter: "अनुवाद सीमांकक",
      topicFlag: "विषय उपसर्ग",
      topicDelimiter: "विषय सीमांकक",
      rootTopic: "मूल विषय"
    },
    actions: {
      addRow: "+ पंक्ति जोड़ें",
      addTopic: "+ विषय जोड़ें"
    },
    grid: {
      containerAria: "ग्रिड कंटेनर",
      article: "उपपद",
      word: "शब्द",
      additionalInfo: "अतिरिक्त जानकारी",
      toLanguage: "{{language}} को"
    },
    status: {
      lastAction: "अंतिम क्रिया: {{action}}",
      file: "फ़ाइल: {{path}}",
      none: "कोई नहीं"
    },
    action: {
      new: "नया",
      open: "खोलें",
      import: "आयात",
      save: "सहेजें",
      saveAs: "इस नाम से सहेजें",
      cancel: "रद्द करें",
      reapply: "फिर लागू करें",
      export: "निर्यात",
      addRow: "लाइन जोड़ो",
      addTopic: "विषय जोड़ें",
      removeRow: "पंक्ति हटाएँ",
      removeSelectedRows: "चयनित पंक्तियाँ हटाएँ",
      clearSelectedCells: "चयनित सेल साफ़ करें",
      autosaveRestored: "स्वतः सहेजना पुनर्स्थापित",
      copy: "प्रतिलिपि",
      copySelected: "प्रतिलिपि चयनित",
      pasteFailed: "चिपकाना विफल",
      pasteInsert: "चिपकाएँ सम्मिलित करें",
      addTranslationColumn: "अनुवाद कॉलम जोड़ें",
      reorderTranslationColumns: "अनुवाद कॉलम पुन: व्यवस्थित करें",
      removeTranslationColumn: "अनुवाद कॉलम हटाएँ",
      renameTranslationColumn: "अनुवाद कॉलम का नाम बदलें",
      cannotRemoveLastTranslationColumn: "अंतिम अनुवाद कॉलम नहीं हटाया जा सकता",
      languageNotFound: "भाषा \"{{language}}\" नहीं मिली",
      languageExists: "भाषा \"{{language}}\" पहले से मौजूद है",
      reorderTranslation: "अनुवाद पुनः व्यवस्थित करें",
      editTranslation: "अनुवाद संपादित करें",
      addTranslation: "अनुवाद जोड़ें",
      removeTranslation: "अनुवाद हटाएँ"
    },
    validation: {
      translationContainsColumnDelimiter:
        "अनुवाद में निषिद्ध स्तंभ सीमांकक \"{{delimiter}}\" शामिल है",
      containsColumnDelimiter: "निषिद्ध स्तंभ सीमांकक \"{{delimiter}}\" शामिल है",
      containsAdditionalInformationDelimiter:
        "निषिद्ध अतिरिक्त जानकारी सीमांकक \"{{delimiter}}\" शामिल है",
      containsTopicFlag: "निषिद्ध विषय ध्वज \"{{topicFlag}}\" शामिल है",
      emptyTopicNotAllowed: "खाली विषय की अनुमति नहीं है",
      emptyWordNotAllowed: "खाली शब्द की अनुमति नहीं है",
      emptyTranslationNotAllowed: "खाली अनुवाद की अनुमति नहीं है",
      articleNotInConfig: "आर्टिकल \"{{article}}\" कॉन्फ़िगर किए गए आर्टिकल में नहीं है"
    },
    translation: {
      renameColumn: "कॉलम का नाम बदलें",
      renameFailed: "नाम बदलें विफल",
      deleteColumn: "कॉलम हटाएं",
      saveRename: "सहेजें",
      cancelRename: "रद्द करें",
      moveUp: "बढ़ाना",
      moveDown: "नीचे की ओर",
      remove: "अनुवाद हटाएँ",
      add: "अनुवाद जोड़ें",
      removeRow: "पंक्ति हटाएँ"
    },
    dialog: {
      cancel: "रद्द करना",
      ok: "ठीक है"
    },
    clipboard: {
      confirmTooManyColumns:
        "चिपकाए गए डेटा में {{maxBufferColumns}} कॉलम हैं, लेकिन केवल {{availableColumns}} चयनित सेल से फिट होते हैं। अतिरिक्त कॉलमों पर ध्यान नहीं दिया जाएगा. जारी रखना?",
      confirmOverwrite: "कुछ लक्ष्य कोशिकाओं में पहले से ही डेटा मौजूद है। चिपकाने से मौजूदा मान अधिलेखित हो जाएंगे. जारी रखना?"
    },
    agGrid: {
      page: "पेज",
      more: "अधिक",
      to: "को",
      of: "का",
      next: "अगला",
      last: "अंतिम",
      first: "पहला",
      previous: "पहले का",
      loadingOoo: "लोड हो रहा है...",
      selectAll: "सबका चयन करें",
      searchOoo: "खोज...",
      blanks: "(रिक्त स्थान)",
      noRowsToShow: "दिखाने के लिए कोई पंक्ति नहीं"
    }
  }
} as const;







