export const zh = {
  translation: {
    app: {
      title: "词典编辑器"
    },
    toolbar: {
      aria: "编辑器工具栏",
      new: "新建",
      open: "打开",
      save: "保存",
      saveAs: "另存为",
      cancel: "取消",
      reapply: "重新应用",
      export: "导出",
      import: "导入",
      showSettings: "显示设置",
      hideSettings: "隐藏设置",
      removeSelectedRows: "删除选定的行",
      language: "语言",
      showOnlyInvalid: "仅显示无效"
    },
    settings: {
      title: "设置",
      aria: "设置面板",
      showArticleColumn: "显示冠词列",
      showArticleColumnHint: "如果禁用，建议从配置中删除文章。",
      showAdditionalInformationColumn: "显示附加信息列",
      addLanguage: "添加语言",
      addArticle: "添加文章",
      removeItem: "删除项目",
      languageErrorEmpty: "语言不能为空",
      languageErrorExists: "语言“{{language}}”已存在",
      languageFrom: "源语言",
      languagesTo: "目标语言（以逗号分隔）",
      articles: "文章（以逗号分隔）",
      delimiter: "列分隔符",
      additionalInformationDelimiter: "附加信息分隔符",
      translationDelimiter: "翻译分隔符",
      topicFlag: "主题前缀",
      topicDelimiter: "主题分隔符",
      rootTopic: "根主题"
    },
    actions: {
      addRow: "+ 添加行",
      addTopic: "+ 添加主题"
    },
    grid: {
      containerAria: "网格容器",
      article: "冠词",
      word: "单词",
      additionalInfo: "附加信息",
      toLanguage: "至 {{language}}"
    },
    status: {
      lastAction: "最后操作：{{action}}",
      file: "文件：{{path}}",
      none: "没有任何"
    },
    action: {
      new: "新建",
      open: "打开",
      import: "导入",
      save: "保存",
      saveAs: "另存为",
      cancel: "取消",
      reapply: "重新应用",
      export: "导出",
      addRow: "添加行",
      addTopic: "添加主题",
      removeRow: "删除行",
      removeSelectedRows: "删除选定的行",
      clearSelectedCells: "清除选定的单元格",
      autosaveRestored: "自动保存已恢复",
      copy: "复制",
      copySelected: "复制所选内容",
      pasteFailed: "粘贴失败",
      pasteInsert: "粘贴插入",
      addTranslationColumn: "添加翻译栏",
      reorderTranslationColumns: "重新排序翻译列",
      removeTranslationColumn: "删除翻译栏",
      renameTranslationColumn: "重命名翻译栏",
      cannotRemoveLastTranslationColumn: "无法删除最后一个翻译列",
      languageNotFound: "未找到语言“{{language}}”",
      languageExists: "语言“{{language}}”已存在",
      reorderTranslation: "重新排序翻译",
      editTranslation: "编辑翻译",
      addTranslation: "添加翻译",
      removeTranslation: "删除翻译"
    },
    validation: {
      translationContainsColumnDelimiter:
        "翻译包含禁止的列分隔符“{{delimiter}}”",
      containsColumnDelimiter: "包含禁止的列分隔符“{{delimiter}}”",
      containsAdditionalInformationDelimiter:
        "包含禁止的附加信息分隔符“{{delimiter}}”",
      containsTopicFlag: "包含禁止主题标志“{{topicFlag}}”",
      emptyTopicNotAllowed: "不允许为空主题",
      emptyWordNotAllowed: "不允许出现空词",
      emptyTranslationNotAllowed: "不允许空译",
      articleNotInConfig: "文章“{{article}}”不在配置的文章中"
    },
    translation: {
      renameColumn: "重命名列",
      renameFailed: "重命名失败",
      deleteColumn: "删除列",
      saveRename: "保存",
      cancelRename: "取消",
      moveUp: "向上移动",
      moveDown: "下移",
      remove: "删除翻译",
      add: "添加翻译",
      removeRow: "删除行"
    },
    dialog: {
      cancel: "取消",
      ok: "确认"
    },
    clipboard: {
      confirmTooManyColumns:
        "粘贴的数据具有 {{maxBufferColumns}} 列，但只有 {{availableColumns}} 适合所选单元格。额外的列将被忽略。继续？",
      confirmOverwrite: "一些目标单元格已经包含数据。粘贴将覆盖现有值。继续？"
    },    topic: {
      new: "新主题"
    },
    agGrid: {
      page: "页",
      more: "更多的",
      to: "到",
      of: "的",
      next: "下一个",
      last: "最后的",
      first: "第一的",
      previous: "以前的",
      loadingOoo: "加载中...",
      selectAll: "选择全部",
      searchOoo: "搜索...",
      blanks: "（空白）",
      noRowsToShow: "没有可显示的行"
    }
  }
} as const;







