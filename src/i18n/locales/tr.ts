export const tr = {
  translation: {
    app: {
      title: "Sözlük Düzenleyici"
    },
    toolbar: {
      aria: "Düzenleyici araç çubuğu",
      new: "Yeni",
      open: "Aç",
      save: "Kaydet",
      saveAs: "Farklı kaydet",
      cancel: "İptal",
      reapply: "Yeniden uygula",
      export: "Dışa aktar",
      import: "İçe aktar",
      showAiPanel: "AI taslağını aç",
      hideAiPanel: "AI taslağını kapat",
      showSettings: "Ayarları Göster",
      hideSettings: "Ayarları Gizle",
      removeSelectedRows: "Seçilen Satırları Kaldır",
      language: "Dil",
      showOnlyInvalid: "Yalnızca Geçersizi Göster",
      noInvalidRows: "Geçersiz satır yok",
      selectRowsToRemove: "Kaldırılacak satırları seç",
    },
    settings: {
      title: "Ayarlar",
      aria: "Ayarlar paneli",
      showArticleColumn: "Tanımlık sütununu göster",
      showArticleColumnHint: "Devre dışı bırakılırsa artikellerin config'ten kaldırılması önerilir.",
      showAdditionalInformationColumn: "Ek Bilgi sütununu göster",
      addLanguage: "Dil ekle",
      addArticle: "Artikel ekle",
      removeItem: "Öğeyi kaldır",
      languageErrorEmpty: "Dil boş olamaz",
      languageErrorExists: "\"{{language}}\" dili zaten mevcut",
      languageFrom: "Kaynak dil",
      languagesTo: "Hedef diller",
      articles: "Artikeller",
      delimiter: "Sütun sınırlayıcı",
      additionalInformationDelimiter: "Ek bilgi sınırlayıcı",
      translationDelimiter: "Çeviri sınırlayıcı",
      topicFlag: "Konu öneki",
      topicDelimiter: "Konu sınırlayıcı"
    },
    courseHeader: {
      aria: "Kurs",
      courseName: "Kurs adı"
    },
    actions: {
      addRow: "+ Kelime ekle",
      addTopic: "+ Konu Ekle"
    },
    aiPanel: {
      title: "AI Taslağı",
      requestSection: "İstek",
      requestMode: "Mod",
      requestModeAuto: "Otomatik",
      requestModeVocabulary: "Tam oluşturma",
      requestModeTranslations: "Yalnızca çeviriler",
      parsingSection: "Ayrıştırma",
      responseSection: "Yanıt",
      topic: "Konu",
      wordCount: "Kelimeler",
      requestNotes: "Talimatlar",
      request: "İstek",
      generateRequest: "İstek oluştur",
      sendRequest: "İsteği gönder",
      sendingRequest: "İstek gönderiliyor…",
      requestFailed: "Yapay zekâ isteği başarısız oldu.",
      requestTimedOut: "Yapay zekâ isteği zaman aşımına uğradı.",
      patternBuilder: "Satır deseni",
      patternGap: "Desen ayırıcı",
      patternSeparatorNone: "(yok)",
      patternSeparatorTab: "Sekme",
      addField: "Alan ekle",
      moveLeft: "Sola taşı",
      moveRight: "Sağa taşı",
      removeField: "Alanı kaldır",
      patternPreview: "Satır şekli",
      parseDelimiterHint: "Birden fazla çeviri, Ayarlar’daki “{{delimiter}}” ile ayrılır.",
      parseDelimiterHintNone: "Çeviri sınırlayıcı Ayarlar’da boş olduğu için birden fazla çeviri ayrılmaz.",
      suggestPattern: "Desen öner",
      patternSuggested: "Desen {{matched}}/{{total}} satırla eşleşti",
      parseResponse: "Yanıtı ayrıştır",
      response: "Düzenlenebilir yanıt",
      parseError: "Yanıt ayrıştırılamadı",
      parsedRows: "{{count}} satır ayrıştırıldı",
      parseResultNotParsedPrefix: "Ayrıştırılmadı:",
      parseResultNotParsed: "Ayrıştırılmadı:\n{{lines}}",
      parseResultAllParsed: "Boş olmayan tüm satırlar ayrıştırıldı.",
      parseResultEmpty: "Yanıt boş",
      parseResultNoMatch: "Hiçbir satır regex ön ayarlarıyla eşleşmedi",
      parseResultMatched: "Eşleşen regex ön ayarları",
      parsingConfigurationMissingPattern: "AI ayrıştırma yapılandırmasında öğe deseni yok",
      fillTranslations: "Çevirileri doldur",
      addRows: "Tabloya ekle",
      moreActions: "Daha fazla eylem",
      replaceRows: "Tabloyu değiştir",
      replaceConfirm: "Geçerli tüm tablo satırları AI yanıtı satırlarıyla değiştirilsin mi?"
    },
    aiPrompt: {
      taskVocabulary: "Görev: Kısa kelime bilgisi satırları oluşturun.",
      taskTranslation: "Görev: Listelenen kelimeleri çevirin.",
      requirementsLine: "Gereksinimler: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "Tüm hedef diller için çevirileri ekleyin.",
      multipleTranslationsAllowed: "Dil başına birden çok çeviriye izin verilir.",
      addBriefNotes: "Yalnızca yararlı olduğunda çoğul biçimler, çekim veya kullanım gibi kısa notlar ekleyin.",
      includeArticlesWhenNatural: "Kaynak dilde artikeller doğalsa bunları ekleyin.",
      course: "Kurs: {{course}}",
      topic: "Konu: {{topic}}",
      entryCount: "Girdi sayısı: {{count}}",
      sourceLanguage: "Kaynak dil: {{language}}",
      targetLanguages: "Hedef diller: {{languages}}",
      words: "Kelimeler:"
    },
    grid: {
      containerAria: "Izgara kabı",
      article: "Tanımlık",
      word: "Kelime",
      additionalInfo: "Ek Bilgi",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "Son işlem: {{action}}",
      file: "Dosya: {{path}}",
      none: "Hiçbiri"
    },
    action: {
      new: "Yeni",
      open: "Aç",
      import: "İçe aktar",
      save: "Kaydet",
      saveAs: "Farklı kaydet",
      cancel: "İptal",
      reapply: "Yeniden uygula",
      export: "Dışa aktar",
      addRow: "Kelime ekle",
      addTopic: "Konu Ekle",
      removeRow: "Satırı kaldır",
      removeSelectedRows: "Seçilen Satırları Kaldır",
      clearSelectedCells: "Seçilen Hücreleri Temizle",
      autosaveRestored: "Otomatik Kaydetme Geri Yüklendi",
      copy: "Kopyala",
      copySelected: "Seçileni Kopyala",
      pasteFailed: "Yapıştırma başarısız oldu",
      pasteInsert: "Yapıştır Ekle",
      addAiRows: "AI satırları ekle",
      replaceAiRows: "AI satırlarıyla değiştir",
      generateAiRequest: "AI isteği oluştur",
      parseAiRegex: "AI yanıtını ayrıştır",
      addTranslationColumn: "Çeviri Sütunu Ekle",
      reorderTranslationColumns: "Çeviri Sütunlarını Yeniden Sırala",
      removeTranslationColumn: "Çeviri Sütunu Kaldır",
      renameTranslationColumn: "Çeviri Sütunu Yeniden Adlandırın",
      cannotRemoveLastTranslationColumn: "Son çeviri sütunu kaldırılamıyor",
      languageNotFound: "\"{{language}}\" dili bulunamadı",
      languageExists: "\"{{language}}\" dili zaten mevcut",
      reorderTranslation: "Çeviriyi Yeniden Sırala",
      editTranslation: "Çeviriyi Düzenle",
      addTranslation: "Çeviri ekle",
      removeTranslation: "Çeviriyi Kaldır"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Çeviri yasak sütun sınırlayıcısı \"{{delimiter}}\" içeriyor",
      containsColumnDelimiter: "Yasak sütun sınırlayıcısı \"{{delimiter}}\" içerir",
      containsAdditionalInformationDelimiter:
        "Yasaklanmış ek bilgi sınırlayıcısı \"{{delimiter}}\" içeriyor",
      containsTopicFlag: "Yasak konu işareti \"{{topicFlag}}\" içeriyor",
      emptyTopicNotAllowed: "Boş konuya izin verilmiyor",
      emptyWordNotAllowed: "Boş kelimeye izin verilmiyor",
      emptyTranslationNotAllowed: "Boş çeviriye izin verilmiyor",
      articleNotInConfig: "\"{{article}}\" artikeli yapılandırılmış artikellerde yok"
    },
    translation: {
      renameColumn: "Sütunu yeniden adlandır",
      renameFailed: "Yeniden adlandırma başarısız oldu",
      deleteColumn: "Sütunu sil",
      saveRename: "Kaydet",
      cancelRename: "İptal",
      moveUp: "Yukarı taşı",
      moveDown: "Aşağı taşı",
      remove: "Çeviriyi Kaldır",
      add: "Çeviri ekle",
      removeRow: "Satırı kaldır"
    },
    dialog: {
      cancel: "İptal etmek",
      ok: "Onayla"
    },
    clipboard: {
      confirmTooManyColumns:
        "Yapıştırılan verilerde {{maxBufferColumns}} sütun var, ancak seçilen hücreden yalnızca {{availableColumns}} sığıyor. Ekstra sütunlar dikkate alınmayacaktır. Devam etmek?",
      confirmOverwrite: "Bazı hedef hücreler zaten veri içeriyor. Yapıştırma işlemi mevcut değerlerin üzerine yazılacaktır. Devam etmek?"
    },
    agGrid: {
      page: "Sayfa",
      more: "Daha",
      to: "ile",
      of: "ile ilgili",
      next: "Sonraki",
      last: "Son",
      first: "Birinci",
      previous: "Öncesi",
      loadingOoo: "Yükleniyor...",
      selectAll: "Tümünü Seç",
      searchOoo: "Aramak...",
      blanks: "(Boşluklar)",
      noRowsToShow: "Gösterilecek satır yok",
      pageSizeSelectorLabel: "Sayfa boyutu:",
      ariaPageSizeSelectorLabel: "Sayfa boyutu"
    }
  }
} as const;








