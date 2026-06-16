export const ko = {
  translation: {
    app: {
      title: "사전 편집자"
    },
    toolbar: {
      aria: "에디터 툴바",
      new: "새로 만들기",
      open: "열기",
      save: "저장",
      saveAs: "다른 이름으로 저장",
      cancel: "취소",
      reapply: "다시 적용",
      export: "내보내기",
      import: "가져오기",
      showAiPanel: "AI 초안 열기",
      hideAiPanel: "AI 초안 닫기",
      showSettings: "설정 표시",
      hideSettings: "설정 숨기기",
      removeSelectedRows: "선택한 행 제거",
      language: "언어",
      showOnlyInvalid: "유효하지 않은 것만 표시",
      noInvalidRows: "잘못된 행이 없습니다",
      selectRowsToRemove: "제거할 행 선택",
    },
    settings: {
      title: "설정",
      aria: "설정 패널",
      showArticleColumn: "관사 열 표시",
      showArticleColumnHint: "비활성화된 경우 구성에서 관사를 제거하는 것이 좋습니다.",
      showAdditionalInformationColumn: "추가 정보 열 표시",
      addLanguage: "언어 추가",
      addArticle: "관사 추가",
      removeItem: "항목 삭제",
      languageErrorEmpty: "언어는 비워둘 수 없습니다.",
      languageErrorExists: "언어 \"{{language}}\"이(가) 이미 존재합니다.",
      languageFrom: "소스 언어",
      languagesTo: "대상 언어",
      articles: "관사",
      delimiter: "열 구분 기호",
      additionalInformationDelimiter: "추가 정보 구분 기호",
      translationDelimiter: "번역 구분 기호",
      topicFlag: "주제 접두어",
      topicDelimiter: "주제 구분 기호"
    },
    courseHeader: {
      aria: "강좌",
      courseName: "강좌 이름"
    },
    actions: {
      addRow: "+ 단어 추가",
      addTopic: "+ 주제 추가"
    },
    aiPanel: {
      title: "AI 초안",
      requestSection: "요청",
      requestMode: "모드",
      requestModeAuto: "자동",
      requestModeVocabulary: "전체 생성",
      requestModeTranslations: "번역만",
      parsingSection: "파싱",
      responseSection: "응답",
      topic: "주제",
      wordCount: "단어",
      requestNotes: "지침",
      request: "요청",
      generateRequest: "요청 생성",
      sendRequest: "요청 보내기",
      sendingRequest: "요청 보내는 중…",
      requestFailed: "AI 요청에 실패했습니다.",
      requestTimedOut: "AI 요청 시간이 초과되었습니다.",
      patternBuilder: "줄 패턴",
      patternGap: "패턴 구분자",
      patternSeparatorNone: "(없음)",
      patternSeparatorTab: "탭",
      addField: "필드 추가",
      moveLeft: "왼쪽으로 이동",
      moveRight: "오른쪽으로 이동",
      removeField: "필드 제거",
      patternPreview: "줄 형태",
      parseDelimiterHint: "여러 번역은 설정의 “{{delimiter}}”로 분리됩니다.",
      parseDelimiterHintNone: "설정의 번역 구분 기호가 비어 있어 여러 번역이 분리되지 않습니다.",
      suggestPattern: "패턴 제안",
      patternSuggested: "패턴이 {{matched}}/{{total}}개 줄과 일치했습니다",
      parseResponse: "응답 파싱",
      response: "편집 가능한 응답",
      parseError: "응답을 파싱할 수 없습니다",
      parsedRows: "{{count}}개 행이 파싱됨",
      parseResultNotParsedPrefix: "파싱되지 않음:",
      parseResultNotParsed: "파싱되지 않음:\n{{lines}}",
      parseResultAllParsed: "비어 있지 않은 모든 줄이 파싱되었습니다.",
      parseResultEmpty: "응답이 비어 있습니다",
      parseResultNoMatch: "regex 프리셋과 일치하는 줄이 없습니다",
      parseResultMatched: "일치한 regex 프리셋",
      parsingConfigurationMissingPattern: "AI 파싱 구성에 항목 패턴이 없습니다",
      fillTranslations: "번역 채우기",
      addRows: "테이블에 추가",
      moreActions: "추가 작업",
      replaceRows: "테이블 바꾸기",
      replaceConfirm: "현재 테이블의 모든 행을 AI 응답 행으로 바꾸시겠습니까?"
    },
    aiPrompt: {
      taskVocabulary: "작업: 간결한 어휘 행을 만드세요.",
      taskTranslation: "작업: 나열된 단어를 번역하세요.",
      requirementsLine: "요구 사항: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "모든 대상 언어의 번역을 포함하세요.",
      multipleTranslationsAllowed: "언어당 여러 번역이 허용됩니다.",
      addBriefNotes: "복수형, 굴절, 용법처럼 유용한 경우에만 짧은 메모를 추가하세요.",
      includeArticlesWhenNatural: "원본 언어에서 관사가 자연스러운 경우 포함하세요.",
      course: "과정: {{course}}",
      topic: "주제: {{topic}}",
      entryCount: "항목 수: {{count}}",
      sourceLanguage: "원본 언어: {{language}}",
      targetLanguages: "대상 언어: {{languages}}",
      words: "단어:"
    },
    grid: {
      containerAria: "그리드 컨테이너",
      article: "관사",
      word: "단어",
      additionalInfo: "추가 정보",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "마지막 작업: {{action}}",
      file: "파일: {{path}}",
      none: "없음"
    },
    action: {
      new: "새로 만들기",
      open: "열기",
      import: "가져오기",
      save: "저장",
      saveAs: "다른 이름으로 저장",
      cancel: "취소",
      reapply: "다시 적용",
      export: "내보내기",
      addRow: "단어 추가",
      addTopic: "주제 추가",
      removeRow: "행 삭제",
      removeSelectedRows: "선택한 행 제거",
      clearSelectedCells: "선택한 셀 지우기",
      autosaveRestored: "자동 저장이 복원되었습니다.",
      copy: "복사",
      copySelected: "선택 항목 복사",
      pasteFailed: "붙여넣기 실패",
      pasteInsert: "삽입 붙여넣기",
      addAiRows: "AI 행 추가",
      replaceAiRows: "AI 행으로 바꾸기",
      generateAiRequest: "AI 요청 생성",
      parseAiRegex: "AI 응답 구문 분석",
      addTranslationColumn: "번역 열 추가",
      reorderTranslationColumns: "번역 열 재정렬",
      removeTranslationColumn: "번역 열 제거",
      renameTranslationColumn: "번역 열 이름 바꾸기",
      cannotRemoveLastTranslationColumn: "마지막 번역 열을 제거할 수 없습니다.",
      languageNotFound: "언어 \"{{language}}\"을(를) 찾을 수 없습니다",
      languageExists: "언어 \"{{language}}\"이(가) 이미 존재합니다.",
      reorderTranslation: "번역 재정렬",
      editTranslation: "번역 편집",
      addTranslation: "번역 추가",
      removeTranslation: "번역 제거"
    },
    validation: {
      translationContainsColumnDelimiter:
        "번역에는 금지된 열 구분 기호 \"{{delimiter}}\"이 포함되어 있습니다.",
      containsColumnDelimiter: "금지된 열 구분 기호 \"{{delimiter}}\"을 포함합니다.",
      containsAdditionalInformationDelimiter:
        "금지된 추가 정보 구분 기호 \"{{delimiter}}\"이(가) 포함되어 있습니다.",
      containsTopicFlag: "금지된 주제 플래그 \"{{topicFlag}}\"을 포함합니다.",
      emptyTopicNotAllowed: "빈 주제는 허용되지 않습니다.",
      emptyWordNotAllowed: "빈 단어는 허용되지 않습니다.",
      emptyTranslationNotAllowed: "빈 번역은 허용되지 않습니다.",
      articleNotInConfig: "관사 \"{{article}}\"이(가) 구성된 관사에 없습니다."
    },
    translation: {
      renameColumn: "열 이름 바꾸기",
      renameFailed: "이름 바꾸기 실패",
      deleteColumn: "열 삭제",
      saveRename: "저장",
      cancelRename: "취소",
      moveUp: "위로 이동",
      moveDown: "아래로 이동",
      remove: "번역 제거",
      add: "번역 추가",
      removeRow: "행 삭제"
    },
    dialog: {
      cancel: "취소",
      ok: "확인"
    },
    clipboard: {
      confirmTooManyColumns:
        "붙여넣은 데이터에 {{maxBufferColumns}} 열이 있지만 선택한 셀에는 {{availableColumns}}만 맞습니다. 추가 열은 무시됩니다. 계속하다?",
      confirmOverwrite: "일부 대상 셀에는 이미 데이터가 포함되어 있습니다. 붙여넣으면 기존 값을 덮어쓰게 됩니다. 계속하다?"
    },
    agGrid: {
      page: "페이지",
      more: "더",
      to: "에게",
      of: "~의",
      next: "다음",
      last: "마지막",
      first: "첫 번째",
      previous: "이전의",
      loadingOoo: "로드 중...",
      selectAll: "모두 선택",
      searchOoo: "찾다...",
      blanks: "(공백)",
      noRowsToShow: "표시할 행이 없습니다.",
      pageSizeSelectorLabel: "페이지 크기:",
      ariaPageSizeSelectorLabel: "페이지 크기"
    }
  }
} as const;







