export const vi = {
  translation: {
    app: {
      title: "Trình soạn thảo từ điển"
    },
    toolbar: {
      aria: "Thanh công cụ soạn thảo",
      new: "Mới",
      open: "Mở",
      save: "Lưu",
      saveAs: "Lưu thành",
      cancel: "Hủy",
      reapply: "Áp dụng lại",
      export: "Xuất",
      import: "Nhập",
      showSettings: "Hiển thị cài đặt",
      hideSettings: "Ẩn cài đặt",
      removeSelectedRows: "Xóa các hàng đã chọn",
      language: "Ngôn ngữ",
      showOnlyInvalid: "Chỉ hiển thị không hợp lệ"
    },
    settings: {
      title: "Cài đặt",
      aria: "Bảng cài đặt",
      showArticleColumn: "Hiển thị cột mạo từ",
      showArticleColumnHint: "Nếu bị tắt, bạn nên xóa mạo từ khỏi cấu hình.",
      showAdditionalInformationColumn: "Hiển thị cột thông tin bổ sung",
      addLanguage: "Thêm ngôn ngữ",
      addArticle: "Thêm mạo từ",
      removeItem: "Xóa mục",
      languageErrorEmpty: "Ngôn ngữ không thể trống",
      languageErrorExists: "Ngôn ngữ \"{{language}}\" đã tồn tại",
      languageFrom: "Ngôn ngữ nguồn",
      languagesTo: "Ngôn ngữ đích (được phân tách bằng dấu phẩy)",
      articles: "Mạo từ (phân tách bằng dấu phẩy)",
      delimiter: "Dấu phân cách cột",
      additionalInformationDelimiter: "Dấu phân cách thông tin bổ sung",
      translationDelimiter: "Dấu phân cách dịch",
      topicFlag: "Tiền tố chủ đề",
      topicDelimiter: "Dấu phân cách chủ đề",
      rootTopic: "chủ đề gốc"
    },
    actions: {
      addRow: "+ Thêm hàng",
      addTopic: "+ Thêm chủ đề"
    },
    grid: {
      containerAria: "Thùng chứa lưới",
      article: "Mạo từ",
      word: "Từ",
      additionalInfo: "Thông tin bổ sung",
      toLanguage: "Tới {{language}}"
    },
    status: {
      lastAction: "Hành động cuối cùng: {{action}}",
      file: "Tập tin: {{path}}",
      none: "Không có"
    },
    action: {
      new: "Mới",
      open: "Mở",
      import: "Nhập",
      save: "Lưu",
      saveAs: "Lưu thành",
      cancel: "Hủy",
      reapply: "Áp dụng lại",
      export: "Xuất",
      addRow: "Thêm hàng",
      addTopic: "Thêm chủ đề",
      removeRow: "Xóa hàng",
      removeSelectedRows: "Xóa các hàng đã chọn",
      clearSelectedCells: "Xóa các ô đã chọn",
      autosaveRestored: "Đã khôi phục tự động lưu",
      copy: "Sao chép",
      copySelected: "Sao chép đã chọn",
      pasteFailed: "Dán không thành công",
      pasteInsert: "Dán Chèn",
      addTranslationColumn: "Thêm cột dịch",
      reorderTranslationColumns: "Sắp xếp lại các cột dịch",
      removeTranslationColumn: "Xóa cột dịch",
      renameTranslationColumn: "Đổi tên cột dịch",
      cannotRemoveLastTranslationColumn: "Không thể xóa cột dịch cuối cùng",
      languageNotFound: "Không tìm thấy ngôn ngữ \"{{language}}\"",
      languageExists: "Ngôn ngữ \"{{language}}\" đã tồn tại",
      reorderTranslation: "Sắp xếp lại bản dịch",
      editTranslation: "Chỉnh sửa bản dịch",
      addTranslation: "Thêm bản dịch",
      removeTranslation: "Xóa bản dịch"
    },
    validation: {
      translationContainsColumnDelimiter:
        "Bản dịch có chứa dấu phân cách cột bị cấm \"{{delimiter}}\"",
      containsColumnDelimiter: "Chứa dấu phân cách cột bị cấm \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "Chứa dấu phân cách thông tin bổ sung bị cấm \"{{delimiter}}\"",
      containsTopicFlag: "Chứa cờ chủ đề bị cấm \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "Chủ đề trống không được phép",
      emptyWordNotAllowed: "Từ trống không được phép",
      emptyTranslationNotAllowed: "Không được phép dịch trống",
      articleNotInConfig: "Mạo từ \"{{article}}\" không có trong các mạo từ được cấu hình"
    },
    translation: {
      renameColumn: "Đổi tên cột",
      renameFailed: "Đổi tên không thành công",
      deleteColumn: "Xóa cột",
      saveRename: "Lưu",
      cancelRename: "Hủy",
      moveUp: "Di chuyển lên",
      moveDown: "Di chuyển xuống",
      remove: "Xóa bản dịch",
      add: "Thêm bản dịch",
      removeRow: "Xóa hàng"
    },
    dialog: {
      cancel: "Hủy bỏ",
      ok: "Xác nhận"
    },
    clipboard: {
      confirmTooManyColumns:
        "Dữ liệu đã dán có {{maxBufferColumns}} cột nhưng chỉ {{availableColumns}} vừa với ô đã chọn. Các cột bổ sung sẽ bị bỏ qua. Tiếp tục?",
      confirmOverwrite: "Một số ô mục tiêu đã chứa dữ liệu. Việc dán sẽ ghi đè lên các giá trị hiện có. Tiếp tục?"
    },
    agGrid: {
      page: "Trang",
      more: "Hơn",
      to: "ĐẾN",
      of: "của",
      next: "Kế tiếp",
      last: "Cuối cùng",
      first: "Đầu tiên",
      previous: "Trước",
      loadingOoo: "Đang tải...",
      selectAll: "Chọn tất cả",
      searchOoo: "Tìm kiếm...",
      blanks: "(Trống)",
      noRowsToShow: "Không có hàng nào để hiển thị"
    }
  }
} as const;







