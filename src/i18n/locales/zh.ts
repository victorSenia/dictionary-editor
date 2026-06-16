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
      showAiPanel: "打开 AI 草稿",
      hideAiPanel: "关闭 AI 草稿",
      showSettings: "显示设置",
      hideSettings: "隐藏设置",
      removeSelectedRows: "删除选定的行",
      language: "语言",
      showOnlyInvalid: "仅显示无效",
      noInvalidRows: "没有无效行",
      selectRowsToRemove: "选择要删除的行",
    },
    settings: {
      title: "设置",
      aria: "设置面板",
      showArticleColumn: "显示冠词列",
      showArticleColumnHint: "如果禁用，建议从配置中删除冠词。",
      showAdditionalInformationColumn: "显示附加信息列",
      addLanguage: "添加语言",
      addArticle: "添加冠词",
      removeItem: "删除项目",
      languageErrorEmpty: "语言不能为空",
      languageErrorExists: "语言“{{language}}”已存在",
      languageFrom: "源语言",
      languagesTo: "目标语言",
      articles: "冠词",
      delimiter: "列分隔符",
      additionalInformationDelimiter: "附加信息分隔符",
      translationDelimiter: "翻译分隔符",
      topicFlag: "主题前缀",
      topicDelimiter: "主题分隔符"
    },
    courseHeader: {
      aria: "课程",
      courseName: "课程名称"
    },
    actions: {
      addRow: "+ 添加单词",
      addTopic: "+ 添加主题"
    },
    aiPanel: {
      title: "AI 草稿",
      requestSection: "请求",
      requestMode: "模式",
      requestModeAuto: "自动",
      requestModeVocabulary: "完整生成",
      requestModeTranslations: "仅翻译",
      parsingSection: "解析",
      responseSection: "响应",
      topic: "主题",
      wordCount: "单词",
      requestNotes: "说明",
      request: "请求",
      generateRequest: "生成请求",
      sendRequest: "发送请求",
      sendingRequest: "正在发送请求…",
      requestFailed: "AI 请求失败。",
      requestTimedOut: "AI 请求超时。",
      patternBuilder: "行模式",
      patternGap: "模式分隔符",
      patternSeparatorNone: "（无）",
      patternSeparatorTab: "制表符",
      addField: "添加字段",
      moveLeft: "向左移动",
      moveRight: "向右移动",
      removeField: "移除字段",
      patternPreview: "行形状",
      parseDelimiterHint: "多个翻译会使用设置中的“{{delimiter}}”分隔。",
      parseDelimiterHintNone: "由于设置中的翻译分隔符为空，多个翻译不会被分隔。",
      suggestPattern: "建议模式",
      patternSuggested: "模式匹配了 {{matched}}/{{total}} 行",
      parseResponse: "解析响应",
      response: "可编辑响应",
      parseError: "无法解析响应",
      parsedRows: "已解析 {{count}} 行",
      parseResultNotParsedPrefix: "未解析：",
      parseResultNotParsed: "未解析：\n{{lines}}",
      parseResultAllParsed: "所有非空行均已解析。",
      parseResultEmpty: "响应为空",
      parseResultNoMatch: "没有行匹配 regex 预设",
      parseResultMatched: "匹配的 regex 预设",
      parsingConfigurationMissingPattern: "AI 解析配置没有项目模式",
      fillTranslations: "填充翻译",
      addRows: "添加到表格",
      moreActions: "更多操作",
      replaceRows: "替换表格",
      replaceConfirm: "是否用 AI 响应中的行替换当前表格的所有行？"
    },
    aiPrompt: {
      taskVocabulary: "任务：创建简洁的词汇行。",
      taskTranslation: "任务：翻译列出的单词。",
      requirementsLine: "要求：{{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "包含所有目标语言的翻译。",
      multipleTranslationsAllowed: "允许每种语言有多个翻译。",
      addBriefNotes: "仅在有用时添加简短说明，例如复数形式、词形变化或用法。",
      includeArticlesWhenNatural: "如果冠词在源语言中是自然的，请包含它们。",
      course: "课程：{{course}}",
      topic: "主题：{{topic}}",
      entryCount: "条目数：{{count}}",
      sourceLanguage: "源语言：{{language}}",
      targetLanguages: "目标语言：{{languages}}",
      words: "单词："
    },
    grid: {
      containerAria: "网格容器",
      article: "冠词",
      word: "单词",
      additionalInfo: "附加信息",
      toLanguage: "{{language}}"
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
      addRow: "添加单词",
      addTopic: "添加主题",
      removeRow: "删除行",
      removeSelectedRows: "删除选定的行",
      clearSelectedCells: "清除选定的单元格",
      autosaveRestored: "自动保存已恢复",
      copy: "复制",
      copySelected: "复制所选内容",
      pasteFailed: "粘贴失败",
      pasteInsert: "粘贴插入",
      addAiRows: "添加 AI 行",
      replaceAiRows: "替换为 AI 行",
      generateAiRequest: "生成 AI 请求",
      parseAiRegex: "解析 AI 响应",
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
      articleNotInConfig: "冠词“{{article}}”不在已配置的冠词中"
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
      noRowsToShow: "没有可显示的行",
      pageSizeSelectorLabel: "页面大小:",
      ariaPageSizeSelectorLabel: "页面大小"
    }
  }
} as const;







