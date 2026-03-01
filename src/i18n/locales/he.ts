export const he = {
  translation: {
    app: {
      title: "עורך מילון"
    },
    toolbar: {
      aria: "סרגל כלים של עורך",
      new: "חדש",
      open: "פתח",
      save: "שמור",
      saveAs: "שמור בשם",
      cancel: "ביטול",
      reapply: "החל שוב",
      export: "ייצוא",
      import: "ייבוא",
      showSettings: "הצג הגדרות",
      hideSettings: "הסתר הגדרות",
      removeSelectedRows: "הסר שורות נבחרות",
      language: "שָׂפָה",
      showOnlyInvalid: "הצג רק לא חוקי"
    },
    settings: {
      title: "הגדרות",
      aria: "חלונית הגדרות",
      showArticleColumn: "הצג עמודת תווית יידוע",
      showArticleColumnHint: "אם מושבת, מומלץ להסיר ארטיקלים מהתצורה.",
      showAdditionalInformationColumn: "הצג עמודת מידע נוסף",
      addLanguage: "הוסף שפה",
      addArticle: "הוסף ארטיקל",
      removeItem: "הסר פריט",
      languageErrorEmpty: "השפה לא יכולה להיות ריקה",
      languageErrorExists: "השפה \"{{language}}\" כבר קיימת",
      languageFrom: "שפת המקור",
      languagesTo: "שפות יעד (מופרדות בפסיק)",
      articles: "ארטיקלים (מופרדים בפסיקים)",
      delimiter: "מפריד עמודות",
      additionalInformationDelimiter: "מפריד מידע נוסף",
      translationDelimiter: "תוחם תרגום",
      topicFlag: "קידומת נושא",
      topicDelimiter: "תוחם נושאים",
      rootTopic: "נושא שורש"
    },
    actions: {
      addRow: "+ הוסף שורה",
      addTopic: "+ הוסף נושא"
    },
    grid: {
      containerAria: "מיכל רשת",
      article: "תווית יידוע",
      word: "מִלָה",
      additionalInfo: "מידע נוסף",
      toLanguage: "אל {{language}}"
    },
    status: {
      lastAction: "פעולה אחרונה: {{action}}",
      file: "קובץ: {{path}}",
      none: "אַף לֹא אֶחָד"
    },
    action: {
      new: "חדש",
      open: "פתח",
      import: "ייבוא",
      save: "שמור",
      saveAs: "שמור בשם",
      cancel: "ביטול",
      reapply: "החל שוב",
      export: "ייצוא",
      addRow: "הוסף שורה",
      addTopic: "הוסף נושא",
      removeRow: "הסר שורה",
      removeSelectedRows: "הסר שורות נבחרות",
      clearSelectedCells: "נקה תאים נבחרים",
      autosaveRestored: "שמירה אוטומטית שוחזרה",
      copy: "לְהַעְתִיק",
      copySelected: "העתק נבחר",
      pasteFailed: "ההדבקה נכשלה",
      pasteInsert: "הדבק הוספה",
      addTranslationColumn: "הוסף עמודת תרגום",
      reorderTranslationColumns: "סדר מחדש את עמודות התרגום",
      removeTranslationColumn: "הסר את עמודת התרגום",
      renameTranslationColumn: "שנה את שם עמודת התרגום",
      cannotRemoveLastTranslationColumn: "לא ניתן להסיר את עמודת התרגום האחרונה",
      languageNotFound: "השפה \"{{language}}\" לא נמצאה",
      languageExists: "השפה \"{{language}}\" כבר קיימת",
      reorderTranslation: "סדר מחדש את התרגום",
      editTranslation: "ערוך תרגום",
      addTranslation: "הוסף תרגום",
      removeTranslation: "הסר תרגום"
    },
    validation: {
      translationContainsColumnDelimiter:
        "התרגום מכיל מפריד עמודות אסור \"{{delimiter}}\"",
      containsColumnDelimiter: "מכיל מפריד עמודות אסור \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "מכיל מפריד מידע נוסף אסור \"{{delimiter}}\"",
      containsTopicFlag: "מכיל דגל נושא אסור \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "אסור לנושא ריק",
      emptyWordNotAllowed: "אסור להשתמש במילה ריקה",
      emptyTranslationNotAllowed: "תרגום ריק אסור",
      articleNotInConfig: "הארטיקל \"{{article}}\" אינו נמצא בארטיקלים שהוגדרו"
    },
    translation: {
      renameColumn: "שנה את שם העמודה",
      renameFailed: "שינוי השם נכשל",
      deleteColumn: "מחק עמודה",
      saveRename: "שמור",
      cancelRename: "ביטול",
      moveUp: "לזוז למעלה",
      moveDown: "לזוז למטה",
      remove: "הסר תרגום",
      add: "הוסף תרגום",
      removeRow: "הסר שורה"
    },
    dialog: {
      cancel: "לְבַטֵל",
      ok: "אישור"
    },
    clipboard: {
      confirmTooManyColumns:
        "לנתונים שהודבקו יש {{maxBufferColumns}} עמודות, אך רק {{availableColumns}} מתאים מהתא שנבחר. תתעלם מעמודות נוספות. לְהַמשִׁיך?",
      confirmOverwrite: "חלק מתאי היעד כבר מכילים נתונים. הדבקה תחליף ערכים קיימים. לְהַמשִׁיך?"
    },    topic: {
      new: "נושא חדש"
    },
    agGrid: {
      page: "עַמוּד",
      more: "יוֹתֵר",
      to: "אֶל",
      of: "שֶׁל",
      next: "הַבָּא",
      last: "אַחֲרוֹן",
      first: "רֵאשִׁית",
      previous: "קוֹדֵם",
      loadingOoo: "טְעִינָה...",
      selectAll: "בחר הכל",
      searchOoo: "לְחַפֵּשׂ...",
      blanks: "(ריק)",
      noRowsToShow: "אין שורות להצגה"
    }
  }
} as const;







