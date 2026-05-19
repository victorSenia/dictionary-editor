export const th = {
  translation: {
    app: {
      title: "ตัวแก้ไขพจนานุกรม"
    },
    toolbar: {
      aria: "แถบเครื่องมือแก้ไข",
      new: "ใหม่",
      open: "เปิด",
      save: "บันทึก",
      saveAs: "บันทึกเป็น",
      cancel: "ยกเลิก",
      reapply: "นำไปใช้ซ้ำ",
      export: "ส่งออก",
      import: "นำเข้า",
      showAiPanel: "เปิดฉบับร่าง AI",
      hideAiPanel: "ปิดฉบับร่าง AI",
      showSettings: "แสดงการตั้งค่า",
      hideSettings: "ซ่อนการตั้งค่า",
      removeSelectedRows: "ลบแถวที่เลือก",
      language: "ภาษา",
      showOnlyInvalid: "แสดงเฉพาะไม่ถูกต้อง",
      noInvalidRows: "ไม่มีแถวที่ไม่ถูกต้อง",
      selectRowsToRemove: "เลือกแถวที่จะลบ",
    },
    settings: {
      title: "การตั้งค่า",
      aria: "แผงการตั้งค่า",
      showArticleColumn: "แสดงคอลัมน์คำนำหน้านาม",
      showArticleColumnHint: "หากปิดใช้งาน ขอแนะนำให้ลบคำนำหน้านามออกจากการกำหนดค่า",
      showAdditionalInformationColumn: "แสดงคอลัมน์ข้อมูลเพิ่มเติม",
      addLanguage: "เพิ่มภาษา",
      addArticle: "เพิ่มคำนำหน้านาม",
      removeItem: "ลบรายการ",
      languageErrorEmpty: "ภาษาต้องไม่เว้นว่าง",
      languageErrorExists: "ภาษา \"{{language}}\" มีอยู่แล้ว",
      languageFrom: "ภาษาต้นฉบับ",
      languagesTo: "ภาษาเป้าหมาย",
      articles: "คำนำหน้านาม",
      delimiter: "ตัวคั่นคอลัมน์",
      additionalInformationDelimiter: "ตัวคั่นข้อมูลเพิ่มเติม",
      translationDelimiter: "ตัวคั่นการแปล",
      topicFlag: "คำนำหน้าหัวข้อ",
      topicDelimiter: "ตัวคั่นหัวข้อ"
    },
    courseHeader: {
      aria: "หลักสูตร",
      courseName: "ชื่อหลักสูตร"
    },
    actions: {
      addRow: "+ เพิ่มคำ",
      addTopic: "+ เพิ่มหัวข้อ"
    },
    aiPanel: {
      title: "ฉบับร่าง AI",
      requestSection: "คำขอ",
      requestMode: "โหมด",
      requestModeAuto: "อัตโนมัติ",
      requestModeVocabulary: "สร้างแบบเต็ม",
      requestModeTranslations: "เฉพาะคำแปล",
      parsingSection: "การแยกวิเคราะห์",
      responseSection: "คำตอบ",
      topic: "หัวข้อ",
      wordCount: "คำ",
      requestNotes: "คำสั่ง",
      request: "คำขอ",
      generateRequest: "สร้างคำขอ",
      linePrefixPreset: "คำนำหน้าบรรทัด",
      patternBuilder: "รูปแบบบรรทัด",
      patternGap: "ตัวคั่นรูปแบบ",
      patternSeparatorNone: "(ไม่มี)",
      patternSeparatorTab: "แท็บ",
      addField: "เพิ่มฟิลด์",
      moveLeft: "ย้ายไปซ้าย",
      moveRight: "ย้ายไปขวา",
      removeField: "ลบฟิลด์",
      patternPreview: "รูปแบบบรรทัด",
      parseDelimiterHint: "คำแปลหลายรายการจะถูกแยกโดยใช้ “{{delimiter}}” จากการตั้งค่า",
      parseDelimiterHintNone: "คำแปลหลายรายการจะไม่ถูกแยก เพราะตัวคั่นการแปลในตั้งค่าว่างอยู่",
      suggestPattern: "แนะนำรูปแบบ",
      patternSuggested: "รูปแบบตรงกับ {{matched}}/{{total}} บรรทัด",
      parseResponse: "แยกวิเคราะห์คำตอบ",
      response: "คำตอบที่แก้ไขได้",
      parseError: "ไม่สามารถแยกวิเคราะห์คำตอบได้",
      parsedRows: "แยกวิเคราะห์แล้ว {{count}} แถว",
      parseResultNotParsedPrefix: "ไม่ได้แยกวิเคราะห์:",
      parseResultNotParsed: "ไม่ได้แยกวิเคราะห์:\n{{lines}}",
      parseResultAllParsed: "แยกวิเคราะห์บรรทัดที่ไม่ว่างทั้งหมดแล้ว",
      parseResultEmpty: "คำตอบว่างเปล่า",
      parseResultNoMatch: "ไม่มีบรรทัดใดตรงกับ preset regex",
      parseResultMatched: "preset regex ที่ตรงกัน",
      parsingConfigurationMissingPattern: "การกำหนดค่าการแยกวิเคราะห์ AI ไม่มีรูปแบบรายการ",
      fillTranslations: "เติมคำแปล",
      addRows: "เพิ่มในตาราง",
      moreActions: "การดำเนินการเพิ่มเติม",
      replaceRows: "แทนที่ตาราง",
      replaceConfirm: "แทนที่แถวตารางปัจจุบันทั้งหมดด้วยแถวจากคำตอบ AI หรือไม่?"
    },
    aiPrompt: {
      taskVocabulary: "งาน: สร้างแถวคำศัพท์แบบกระชับ",
      taskTranslation: "งาน: แปลคำที่แสดงไว้",
      requirementsLine: "ข้อกำหนด: {{allLanguages}} {{multipleTranslations}} {{notes}} {{articles}}",
      includeTranslationsForAllTargetLanguages: "รวมคำแปลสำหรับภาษาปลายทางทั้งหมด",
      multipleTranslationsAllowed: "อนุญาตให้มีหลายคำแปลต่อภาษา",
      addBriefNotes: "เพิ่มหมายเหตุสั้น ๆ เฉพาะเมื่อมีประโยชน์ เช่น รูปพหูพจน์ การผันคำ หรือการใช้งาน",
      includeArticlesWhenNatural: "หากคำนำหน้านามเป็นธรรมชาติในภาษาต้นทาง ให้รวมไว้ด้วย",
      course: "หลักสูตร: {{course}}",
      topic: "หัวข้อ: {{topic}}",
      entryCount: "จำนวนรายการ: {{count}}",
      sourceLanguage: "ภาษาต้นทาง: {{language}}",
      targetLanguages: "ภาษาปลายทาง: {{languages}}",
      words: "คำ:"
    },
    grid: {
      containerAria: "ภาชนะกริด",
      article: "คำนำหน้านาม",
      word: "คำ",
      additionalInfo: "ข้อมูลเพิ่มเติม",
      toLanguage: "{{language}}"
    },
    status: {
      lastAction: "การดำเนินการล่าสุด: {{action}}",
      file: "ไฟล์: {{path}}",
      none: "ไม่มี"
    },
    action: {
      new: "ใหม่",
      open: "เปิด",
      import: "นำเข้า",
      save: "บันทึก",
      saveAs: "บันทึกเป็น",
      cancel: "ยกเลิก",
      reapply: "นำไปใช้ซ้ำ",
      export: "ส่งออก",
      addRow: "เพิ่มคำ",
      addTopic: "เพิ่มหัวข้อ",
      removeRow: "ลบแถว",
      removeSelectedRows: "ลบแถวที่เลือก",
      clearSelectedCells: "ล้างเซลล์ที่เลือก",
      autosaveRestored: "บันทึกอัตโนมัติคืนค่าแล้ว",
      copy: "สำเนา",
      copySelected: "คัดลอกที่เลือก",
      pasteFailed: "วางไม่สำเร็จ",
      pasteInsert: "วางส่วนแทรก",
      addAiRows: "เพิ่มแถว AI",
      replaceAiRows: "แทนที่ด้วยแถว AI",
      generateAiRequest: "สร้างคำขอ AI",
      parseAiRegex: "แยกวิเคราะห์คำตอบ AI",
      addTranslationColumn: "เพิ่มคอลัมน์การแปล",
      reorderTranslationColumns: "เรียงลำดับคอลัมน์การแปลใหม่",
      removeTranslationColumn: "ลบคอลัมน์การแปล",
      renameTranslationColumn: "เปลี่ยนชื่อคอลัมน์การแปล",
      cannotRemoveLastTranslationColumn: "ไม่สามารถลบคอลัมน์การแปลล่าสุด",
      languageNotFound: "ไม่พบภาษา \"{{language}}\"",
      languageExists: "ภาษา \"{{language}}\" มีอยู่แล้ว",
      reorderTranslation: "เรียงลำดับการแปลใหม่",
      editTranslation: "แก้ไขคำแปล",
      addTranslation: "เพิ่มคำแปล",
      removeTranslation: "ลบการแปล"
    },
    validation: {
      translationContainsColumnDelimiter:
        "การแปลมีตัวคั่นคอลัมน์ที่ต้องห้าม \"{{delimiter}}\"",
      containsColumnDelimiter: "มีตัวคั่นคอลัมน์ที่ต้องห้าม \"{{delimiter}}\"",
      containsAdditionalInformationDelimiter:
        "มีตัวคั่นข้อมูลเพิ่มเติมที่ต้องห้าม \"{{delimiter}}\"",
      containsTopicFlag: "มีการตั้งค่าสถานะหัวข้อต้องห้าม \"{{topicFlag}}\"",
      emptyTopicNotAllowed: "ไม่อนุญาตให้มีหัวข้อที่ว่างเปล่า",
      emptyWordNotAllowed: "ไม่อนุญาตให้ใช้คำที่ว่างเปล่า",
      emptyTranslationNotAllowed: "ไม่อนุญาตให้แปลที่ว่างเปล่า",
      articleNotInConfig: "คำนำหน้านาม \"{{article}}\" ไม่ได้อยู่ในคำนำหน้านามที่กำหนดค่า"
    },
    translation: {
      renameColumn: "เปลี่ยนชื่อคอลัมน์",
      renameFailed: "การเปลี่ยนชื่อล้มเหลว",
      deleteColumn: "ลบคอลัมน์",
      saveRename: "บันทึก",
      cancelRename: "ยกเลิก",
      moveUp: "เลื่อนขึ้น",
      moveDown: "เลื่อนลง",
      remove: "ลบการแปล",
      add: "เพิ่มคำแปล",
      removeRow: "ลบแถว"
    },
    dialog: {
      cancel: "ยกเลิก",
      ok: "ตกลง"
    },
    clipboard: {
      confirmTooManyColumns:
        "ข้อมูลที่วางมีคอลัมน์ {{maxBufferColumns}} แต่มีเพียง {{availableColumns}} เท่านั้นที่พอดีจากเซลล์ที่เลือก คอลัมน์เพิ่มเติมจะถูกละเว้น ดำเนินการต่อ?",
      confirmOverwrite: "เซลล์เป้าหมายบางเซลล์มีข้อมูลอยู่แล้ว การวางจะเขียนทับค่าที่มีอยู่ ดำเนินการต่อ?"
    },
    agGrid: {
      page: "หน้าหนังสือ",
      more: "มากกว่า",
      to: "ถึง",
      of: "ของ",
      next: "ต่อไป",
      last: "ล่าสุด",
      first: "อันดับแรก",
      previous: "ก่อนหน้า",
      loadingOoo: "กำลังโหลด...",
      selectAll: "เลือกทั้งหมด",
      searchOoo: "ค้นหา...",
      blanks: "(ช่องว่าง)",
      noRowsToShow: "ไม่มีแถวที่จะแสดง",
      pageSizeSelectorLabel: "ขนาดหน้า:",
      ariaPageSizeSelectorLabel: "ขนาดหน้า"
    }
  }
} as const;







