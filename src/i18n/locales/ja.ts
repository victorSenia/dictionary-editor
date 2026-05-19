export const ja = {
  translation: {
    app: {
      title: "辞書エディタ"
    },
    toolbar: {
      aria: "エディタツールバー",
      new: "新規",
      open: "開く",
      save: "保存",
      saveAs: "名前を付けて保存",
      cancel: "キャンセル",
      reapply: "再適用",
      export: "エクスポート",
      import: "インポート",
      showAiPanel: "AIドラフトを開く",
      hideAiPanel: "AIドラフトを閉じる",
      showSettings: "設定を表示",
      hideSettings: "設定を非表示にする",
      removeSelectedRows: "選択した行を削除",
      language: "言語",
      showOnlyInvalid: "無効のみを表示",
      noInvalidRows: "無効な行はありません",
      selectRowsToRemove: "削除する行を選択",
    },
    settings: {
      title: "設定",
      aria: "設定パネル",
      showArticleColumn: "冠詞列を表示",
      showArticleColumnHint: "無効にした場合は、構成から冠詞を削除することをお勧めします。",
      showAdditionalInformationColumn: "追加情報列を表示",
      addLanguage: "言語を追加する",
      addArticle: "冠詞を追加",
      removeItem: "アイテムを削除する",
      languageErrorEmpty: "言語を空にすることはできません",
      languageErrorExists: "言語「{{language}}」はすでに存在します",
      languageFrom: "ソース言語",
      languagesTo: "ターゲット言語",
      articles: "冠詞",
      delimiter: "列区切り文字",
      additionalInformationDelimiter: "追加情報の区切り文字",
      translationDelimiter: "翻訳区切り文字",
      topicFlag: "トピックの接頭辞",
      topicDelimiter: "トピック区切り文字"
    },
    courseHeader: {
      aria: "コース",
      courseName: "コース名"
    },
    actions: {
      addRow: "+ 単語を追加",
      addTopic: "+ トピックを追加"
    },
    aiPanel: {
      title: "AI 下書き",
      requestSection: "リクエスト",
      requestMode: "モード",
      requestModeAuto: "自動",
      requestModeVocabulary: "完全生成",
      requestModeTranslations: "翻訳のみ",
      parsingSection: "解析",
      responseSection: "応答",
      topic: "トピック",
      wordCount: "単語",
      requestNotes: "指示",
      request: "リクエスト",
      generateRequest: "リクエストを生成",
      linePrefixPreset: "行プレフィックス",
      patternBuilder: "行パターン",
      patternGap: "パターン区切り",
      patternSeparatorNone: "（なし）",
      patternSeparatorTab: "タブ",
      addField: "フィールドを追加",
      moveLeft: "左へ移動",
      moveRight: "右へ移動",
      removeField: "フィールドを削除",
      patternPreview: "行の形式",
      parseDelimiterHint: "複数の翻訳は設定の「{{delimiter}}」で分割されます。",
      parseDelimiterHintNone: "設定の翻訳区切り文字が空のため、複数の翻訳は分割されません。",
      suggestPattern: "パターンを提案",
      patternSuggested: "パターンは {{matched}}/{{total}} 行に一致しました",
      parseResponse: "応答を解析",
      response: "編集可能な応答",
      parseError: "応答を解析できませんでした",
      parsedRows: "{{count}} 行を解析しました",
      parseResultNotParsedPrefix: "未解析:",
      parseResultNotParsed: "未解析:\n{{lines}}",
      parseResultAllParsed: "空でないすべての行を解析しました。",
      parseResultEmpty: "応答が空です",
      parseResultNoMatch: "regex プリセットに一致する行がありません",
      parseResultMatched: "一致した regex プリセット",
      parsingConfigurationMissingPattern: "AI 解析設定に項目パターンがありません",
      fillTranslations: "翻訳を入力",
      addRows: "表に追加",
      moreActions: "その他の操作",
      replaceRows: "表を置換",
      replaceConfirm: "現在の表のすべての行を AI 応答の行に置き換えますか？"
    },
    aiPrompt: {
      taskVocabulary: "タスク: 簡潔な語彙行を作成します。",
      taskTranslation: "タスク: 一覧の単語を翻訳します。",
      requirementsLine: "要件: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "すべての対象言語の翻訳を含めてください。",
      multipleTranslationsAllowed: "言語ごとに複数の翻訳を許可します。",
      addBriefNotes: "複数形、語形変化、用法など、有用な場合のみ短いメモを追加してください。",
      includeArticlesWhenNatural: "元の言語で冠詞が自然な場合は含めてください。",
      course: "コース: {{course}}",
      topic: "トピック: {{topic}}",
      entryCount: "項目数: {{count}}",
      sourceLanguage: "元の言語: {{language}}",
      targetLanguages: "対象言語: {{languages}}",
      words: "単語:"
    },
    grid: {
      containerAria: "グリッドコンテナ",
      article: "冠詞",
      word: "言葉",
      additionalInfo: "追加情報",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "最後のアクション: {{action}}",
      file: "ファイル: {{path}}",
      none: "なし"
    },
    action: {
      new: "新規",
      open: "開く",
      import: "インポート",
      save: "保存",
      saveAs: "名前を付けて保存",
      cancel: "キャンセル",
      reapply: "再適用",
      export: "エクスポート",
      addRow: "単語を追加",
      addTopic: "トピックの追加",
      removeRow: "行を削除",
      removeSelectedRows: "選択した行を削除",
      clearSelectedCells: "選択したセルをクリア",
      autosaveRestored: "自動保存が復元されました",
      copy: "コピー",
      copySelected: "選択したものをコピー",
      pasteFailed: "貼り付けに失敗しました",
      pasteInsert: "挿入を貼り付け",
      addAiRows: "AI行を追加",
      replaceAiRows: "AI行で置換",
      generateAiRequest: "AIリクエストを生成",
      parseAiRegex: "AI応答を解析",
      addTranslationColumn: "翻訳列を追加",
      reorderTranslationColumns: "翻訳列の並べ替え",
      removeTranslationColumn: "翻訳列の削除",
      renameTranslationColumn: "翻訳列の名前を変更",
      cannotRemoveLastTranslationColumn: "最後の翻訳列を削除できません",
      languageNotFound: "言語「{{language}}」が見つかりません",
      languageExists: "言語「{{language}}」はすでに存在します",
      reorderTranslation: "翻訳の並べ替え",
      editTranslation: "翻訳の編集",
      addTranslation: "翻訳を追加",
      removeTranslation: "翻訳の削除"
    },
    validation: {
      translationContainsColumnDelimiter:
        "翻訳に禁止された列区切り文字「{{delimiter}}」が含まれています",
      containsColumnDelimiter: "禁止された列区切り文字「{{delimiter}}」が含まれています",
      containsAdditionalInformationDelimiter:
        "禁止された追加情報区切り文字「{{delimiter}}」が含まれています",
      containsTopicFlag: "禁止されたトピック フラグ「{{topicFlag}}」が含まれています",
      emptyTopicNotAllowed: "空のトピックは許可されません",
      emptyWordNotAllowed: "空の単語は許可されません",
      emptyTranslationNotAllowed: "空の翻訳は許可されません",
      articleNotInConfig: "冠詞「{{article}}」は設定された冠詞にありません"
    },
    translation: {
      renameColumn: "列名の変更",
      renameFailed: "名前の変更に失敗しました",
      deleteColumn: "列の削除",
      saveRename: "保存",
      cancelRename: "キャンセル",
      moveUp: "上に移動",
      moveDown: "下に移動",
      remove: "翻訳の削除",
      add: "翻訳を追加",
      removeRow: "行を削除"
    },
    dialog: {
      cancel: "キャンセル",
      ok: "確認"
    },
    clipboard: {
      confirmTooManyColumns:
        "貼り付けられたデータには {{maxBufferColumns}} 列がありますが、選択したセルからは {{availableColumns}} のみが適合します。余分な列は無視されます。続く？",
      confirmOverwrite: "一部のターゲット セルにはすでにデータが含まれています。貼り付けると、既存の値が上書きされます。続く？"
    },
    agGrid: {
      page: "ページ",
      more: "もっと",
      to: "に",
      of: "の",
      next: "次",
      last: "最後",
      first: "初め",
      previous: "前の",
      loadingOoo: "読み込み中...",
      selectAll: "すべて選択",
      searchOoo: "検索...",
      blanks: "(空白)",
      noRowsToShow: "表示する行がありません",
      pageSizeSelectorLabel: "ページサイズ:",
      ariaPageSizeSelectorLabel: "ページサイズ"
    }
  }
} as const;







