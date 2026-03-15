// src/i18n/translations.js
// All user-facing UI strings except questions/chips (those live in questions.js).

const translations = {
  en: {
    // App
    signOut: 'sign out',
    langToggle: 'VI',

    // Welcome
    appTitle: 'PRESENCE',
    appSub: 'a grounding ritual',
    begin: 'Begin',
    unfinishedSession: 'Unfinished session',
    sensesExplored: (n, total, ago) => `${n} of ${total} senses explored · ${ago}`,
    continue: '↩ Continue',
    startFresh: 'Start fresh',

    // Breathe
    firstJustBreathe: 'First — just breathe',
    breatheWord: 'breathe',
    breatheIn: 'Breathe in…',
    hold: 'Hold…',
    breatheOut: 'Breathe out…',
    lastBreath: 'last breath',
    breathsToBegin: (n) => `${n} breaths to begin`,

    // SenseScreen
    pause: 'pause ··',
    senseOf: (n, total) => `Sense ${n} of ${total}`,
    writeFreely: 'write freely…',
    skip: 'skip',
    continueBtn: 'Continue →',

    // PauseOverlay
    needToStepAway: 'Need to step away?',
    pauseLine1: "That's completely okay.",
    pauseLine2: 'Your progress is saved and waiting for you.',
    sensesSaved: (n) => `✦ ${n} ${n === 1 ? 'sense' : 'senses'} saved`,
    keepGoing: '↩ Keep going',
    reflectOnWhat: 'Reflect on what I have →',
    saveAndExit: 'Save & exit',

    // Reflection
    yourMomentReflected: '✦ Your moment, reflected',
    partialNote: (n, total) => `${n} of ${total} senses · that's enough`,
    whatClaudeFelt: 'What Claude felt in your words',
    yourSensesNow: 'Your senses, right now',
    howDoYouFeel: 'How do you feel in this moment?',
    saving: '◌ saving…',
    sessionSaved: '✦ session saved',
    savedLocallyOnly: '· saved locally only',
    beginAgain: 'Begin again ↺',
  },

  vi: {
    // App
    signOut: 'đăng xuất',
    langToggle: 'EN',

    // Welcome
    appTitle: 'PRESENCE',
    appSub: 'một nghi lễ định tâm',
    begin: 'Bắt đầu',
    unfinishedSession: 'Phiên chưa hoàn thành',
    sensesExplored: (n, total, ago) => `${n} trên ${total} giác quan đã khám phá · ${ago}`,
    continue: '↩ Tiếp tục',
    startFresh: 'Bắt đầu lại',

    // Breathe
    firstJustBreathe: 'Trước tiên — hãy thở',
    breatheWord: 'thở',
    breatheIn: 'Hít vào…',
    hold: 'Giữ…',
    breatheOut: 'Thở ra…',
    lastBreath: 'hơi thở cuối',
    breathsToBegin: (n) => `${n} hơi thở để bắt đầu`,

    // SenseScreen
    pause: 'tạm dừng ··',
    senseOf: (n, total) => `Giác quan ${n} / ${total}`,
    writeFreely: 'viết tự do…',
    skip: 'bỏ qua',
    continueBtn: 'Tiếp tục →',

    // PauseOverlay
    needToStepAway: 'Cần nghỉ một chút?',
    pauseLine1: 'Hoàn toàn ổn thôi.',
    pauseLine2: 'Tiến trình của bạn đã được lưu và đang chờ bạn.',
    sensesSaved: (n) => `✦ ${n} giác quan đã lưu`,
    keepGoing: '↩ Tiếp tục',
    reflectOnWhat: 'Suy ngẫm với những gì tôi có →',
    saveAndExit: 'Lưu & thoát',

    // Reflection
    yourMomentReflected: '✦ Khoảnh khắc của bạn, được phản chiếu',
    partialNote: (n, total) => `${n} trên ${total} giác quan · như vậy là đủ`,
    whatClaudeFelt: 'Điều Claude cảm nhận trong lời của bạn',
    yourSensesNow: 'Các giác quan của bạn, ngay lúc này',
    howDoYouFeel: 'Bạn cảm thấy thế nào lúc này?',
    saving: '◌ đang lưu…',
    sessionSaved: '✦ phiên đã lưu',
    savedLocallyOnly: '· chỉ lưu cục bộ',
    beginAgain: 'Bắt đầu lại ↺',
  },
}

export default translations
