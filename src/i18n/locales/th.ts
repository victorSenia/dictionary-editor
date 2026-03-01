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
      showSettings: "แสดงการตั้งค่า",
      hideSettings: "ซ่อนการตั้งค่า",
      removeSelectedRows: "ลบแถวที่เลือก",
      language: "ภาษา",
      showOnlyInvalid: "แสดงเฉพาะไม่ถูกต้อง"
    },
    settings: {
      title: "การตั้งค่า",
      aria: "แผงการตั้งค่า",
      showArticleColumn: "แสดงคอลัมน์คำนำหน้านาม",
      showArticleColumnHint: "หากปิดใช้งาน ขอแนะนำให้ลบบทความออกจากการกำหนดค่า",
      showAdditionalInformationColumn: "แสดงคอลัมน์ข้อมูลเพิ่มเติม",
      addLanguage: "เพิ่มภาษา",
      addArticle: "เพิ่มบทความ",
      removeItem: "ลบรายการ",
      languageErrorEmpty: "ภาษาต้องไม่เว้นว่าง",
      languageErrorExists: "ภาษา \"{{language}}\" มีอยู่แล้ว",
      languageFrom: "ภาษาต้นฉบับ",
      languagesTo: "ภาษาเป้าหมาย (คั่นด้วยเครื่องหมายจุลภาค)",
      articles: "บทความ (คั่นด้วยลูกน้ำ)",
      delimiter: "ตัวคั่นคอลัมน์",
      additionalInformationDelimiter: "ตัวคั่นข้อมูลเพิ่มเติม",
      translationDelimiter: "ตัวคั่นการแปล",
      topicFlag: "คำนำหน้าหัวข้อ",
      topicDelimiter: "ตัวคั่นหัวข้อ",
      rootTopic: "หัวข้อราก"
    },
    actions: {
      addRow: "+ เพิ่มแถว",
      addTopic: "+ เพิ่มหัวข้อ"
    },
    grid: {
      containerAria: "ภาชนะกริด",
      article: "คำนำหน้านาม",
      word: "คำ",
      additionalInfo: "ข้อมูลเพิ่มเติม",
      toLanguage: "ถึง {{language}}"
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
      addRow: "เพิ่มแถว",
      addTopic: "เพิ่มหัวข้อ",
      removeRow: "ลบแถว",
      removeSelectedRows: "ลบแถวที่เลือก",
      clearSelectedCells: "ล้างเซลล์ที่เลือก",
      autosaveRestored: "บันทึกอัตโนมัติคืนค่าแล้ว",
      copy: "สำเนา",
      copySelected: "คัดลอกที่เลือก",
      pasteFailed: "วางไม่สำเร็จ",
      pasteInsert: "วางส่วนแทรก",
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
      articleNotInConfig: "บทความ \"{{article}}\" ไม่ได้อยู่ในบทความที่กำหนดค่า"
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
    },    topic: {
      new: "หัวข้อใหม่"
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
      noRowsToShow: "ไม่มีแถวที่จะแสดง"
    }
  }
} as const;







