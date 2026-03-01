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
      showSettings: "Ayarları Göster",
      hideSettings: "Ayarları Gizle",
      removeSelectedRows: "Seçilen Satırları Kaldır",
      language: "Dil",
      showOnlyInvalid: "Yalnızca Geçersizi Göster"
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
      languagesTo: "Hedef diller (virgülle ayrılmış)",
      articles: "Artikeller (virgülle ayrılmış)",
      delimiter: "Sütun sınırlayıcı",
      additionalInformationDelimiter: "Ek bilgi sınırlayıcı",
      translationDelimiter: "Çeviri sınırlayıcı",
      topicFlag: "Konu öneki",
      topicDelimiter: "Konu sınırlayıcı",
      rootTopic: "Kök konu"
    },
    actions: {
      addRow: "+ Satır Ekle",
      addTopic: "+ Konu Ekle"
    },
    grid: {
      containerAria: "Izgara kabı",
      article: "Tanımlık",
      word: "Kelime",
      additionalInfo: "Ek Bilgi",
      toLanguage: "{{language}}'a"
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
      addRow: "Satır Ekle",
      addTopic: "Konu Ekle",
      removeRow: "Satırı kaldır",
      removeSelectedRows: "Seçilen Satırları Kaldır",
      clearSelectedCells: "Seçilen Hücreleri Temizle",
      autosaveRestored: "Otomatik Kaydetme Geri Yüklendi",
      copy: "Kopyala",
      copySelected: "Seçileni Kopyala",
      pasteFailed: "Yapıştırma başarısız oldu",
      pasteInsert: "Yapıştır Ekle",
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
    },    topic: {
      new: "Yeni Konu"
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
      noRowsToShow: "Gösterilecek satır yok"
    }
  }
} as const;








