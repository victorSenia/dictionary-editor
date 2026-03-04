export const inLocale = {
  translation: {
    app: {
      title: "Editor Kamus"
    },
    toolbar: {
      aria: "Bilah alat penyunting",
      new: "Baru",
      open: "Buka",
      save: "Simpan",
      saveAs: "Simpan sebagai",
      cancel: "Batal",
      reapply: "Terapkan ulang",
      export: "Ekspor",
      import: "Impor",
      showSettings: "Tampilkan Pengaturan",
      hideSettings: "Sembunyikan Pengaturan",
      removeSelectedRows: "Hapus Baris yang Dipilih",
      language: "Bahasa",
      showOnlyInvalid: "Tampilkan Hanya Tidak Valid"
    },
    settings: {
      title: "Pengaturan",
      aria: "Panel pengaturan",
      showArticleColumn: "Tampilkan kolom artikel",
      showArticleColumnHint: "Jika dinonaktifkan, disarankan untuk menghapus artikel dari konfigurasi.",
      showAdditionalInformationColumn: "Tampilkan kolom info tambahan",
      addLanguage: "Tambahkan bahasa",
      addArticle: "Tambahkan artikel",
      removeItem: "Hapus barang",
      languageErrorEmpty: "Bahasa tidak boleh kosong",
      languageErrorExists: "Bahasa \"{{language}}\" sudah ada",
      languageFrom: "Bahasa sumber",
      languagesTo: "Bahasa target (dipisahkan koma)",
      articles: "Artikel (dipisahkan koma)",
      delimiter: "Pembatas kolom",
      additionalInformationDelimiter: "Pembatas info tambahan",
      translationDelimiter: "Pembatas terjemahan",
      topicFlag: "Awalan topik",
      topicDelimiter: "Pembatas topik",
      rootTopic: "Topik dasar"
    },
    actions: {
      addRow: "+ Tambahkan Baris",
      addTopic: "+ Tambahkan Topik"
    },
    grid: {
      containerAria: "Wadah kisi",
      article: "Artikel",
      word: "Kata",
      additionalInfo: "Info Tambahan",
      toLanguage: "Ke {{language}}"
    },
    status: {
      lastAction: "Tindakan terakhir: {{action}}",
      file: "Berkas: {{path}}",
      none: "Tidak ada"
    },
    action: {
      new: "Baru",
      open: "Buka",
      import: "Impor",
      save: "Simpan",
      saveAs: "Simpan sebagai",
      cancel: "Batal",
      reapply: "Terapkan ulang",
      export: "Ekspor",
      addRow: "Tambahkan Baris",
      addTopic: "Tambahkan Topik",
      removeRow: "Hapus baris",
      removeSelectedRows: "Hapus Baris yang Dipilih",
      clearSelectedCells: "Hapus Sel yang Dipilih",
      autosaveRestored: "Penyimpanan Otomatis Dipulihkan",
      copy: "Menyalin",
      copySelected: "Salin yang Dipilih",
      pasteFailed: "Gagal menempel",
      pasteInsert: "Tempel Sisipkan",
      addTranslationColumn: "Tambahkan Kolom Terjemahan",
      reorderTranslationColumns: "Susun Ulang Kolom Terjemahan",
      removeTranslationColumn: "Hapus Kolom Terjemahan",
      renameTranslationColumn: "Ganti Nama Kolom Terjemahan",
      cannotRemoveLastTranslationColumn: "Tidak dapat menghapus kolom terjemahan terakhir",
      languageNotFound: "Bahasa \"{{language}}\" tidak ditemukan",
      languageExists: "Bahasa \"{{language}}\" sudah ada",
      reorderTranslation: "Susun Ulang Terjemahan",
      editTranslation: "Sunting Terjemahan",
      addTranslation: "Tambahkan terjemahan",
      removeTranslation: "Hapus Terjemahan"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Terjemahan berisi pembatas kolom terlarang \"{{delimiter}}\"",
      containsColumnDelimiter: "Berisi pembatas kolom terlarang \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Berisi pembatas informasi tambahan terlarang \"{{delimiter}}\"",
      containsTopicFlag: "Berisi tanda topik terlarang \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Topik kosong tidak diperbolehkan",
      emptyWordNotAllowed: "Kata kosong tidak diperbolehkan",
      emptyTranslationNotAllowed: "Terjemahan kosong tidak diperbolehkan",
      articleNotInConfig: "Artikel \"{{article}}\" tidak ada dalam artikel yang dikonfigurasi"
    },
    translation: {
      renameColumn: "Ganti nama kolom",
      renameFailed: "Gagal mengganti nama",
      deleteColumn: "Hapus kolom",
      saveRename: "Simpan",
      cancelRename: "Batal",
      moveUp: "Naik",
      moveDown: "Pindah ke bawah",
      remove: "Hapus Terjemahan",
      add: "Tambahkan terjemahan",
      removeRow: "Hapus baris"
    },
    dialog: {
      cancel: "Membatalkan",
      ok: "Baik"
    },
    clipboard: {
      confirmTooManyColumns:
        "Data yang ditempel memiliki kolom {{maxBufferColumns}}, namun hanya {{availableColumns}} yang muat dari sel yang dipilih. Kolom tambahan akan diabaikan. Melanjutkan?",
      confirmOverwrite: "Beberapa sel target sudah berisi data. Menempel akan menimpa nilai yang ada. Melanjutkan?"
    },
    agGrid: {
      page: "Halaman",
      more: "Lagi",
      to: "ke",
      of: "dari",
      next: "Berikutnya",
      last: "Terakhir",
      first: "Pertama",
      previous: "Sebelumnya",
      loadingOoo: "Memuat...",
      selectAll: "Pilih Semua",
      searchOoo: "Mencari...",
      blanks: "(Kosong)",
      noRowsToShow: "Tidak ada baris untuk ditampilkan"
    }
  }
} as const;







