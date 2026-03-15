// src/components/SenseScreen.jsx
// The main grounding question flow. Shows one question at a time
// with quick-tap chips and a free-text textarea.

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { pickQuestions } from '../data/questions'
import { saveDraft, clearDraft } from '../utils/storage'
import PauseOverlay from './PauseOverlay'

export default function SenseScreen({ initialIdx = 0, initialAnswers = [], onComplete, onExit }) {
  const { lang, t } = useLanguage()
  const [questions] = useState(() => pickQuestions())
  const [idx,     setIdx]     = useState(initialIdx)
  const [answers, setAnswers] = useState(initialAnswers)
  const [input,   setInput]   = useState('')
  const [tapped,  setTapped]  = useState([])
  const [visible, setVisible] = useState(true)
  const [paused,  setPaused]  = useState(false)

  const q = questions[idx]

  // Localised question fields for the current language
  const qText  = q[lang].question
  const qHint  = q[lang].hint
  const qChips = q[lang].chips

  // Auto-save after every answered question
  useEffect(() => { saveDraft(idx, answers) }, [idx, answers])

  const transition = (cb) => {
    setVisible(false)
    setTimeout(() => { cb(); setVisible(true) }, 280)
  }

  const advance = (skip = false) => {
    const ans     = skip ? '—' : (input.trim() || '—')
    const updated = [...answers, { ...q, answer: ans }]
    setAnswers(updated)

    if (idx + 1 >= questions.length) {
      clearDraft()
      onComplete(updated)
    } else {
      transition(() => { setIdx(idx + 1); setInput(''); setTapped([]) })
    }
  }

  const tapChip = (chip) => {
    const has = tapped.includes(chip)
    setTapped(has ? tapped.filter(c => c !== chip) : [...tapped, chip])
    setInput(v =>
      has
        ? v.replace(', ' + chip, '').replace(chip + ', ', '').replace(chip, '').trim().replace(/,\s*$/, '')
        : (v.trim() ? v.trim() + ', ' + chip : chip)
    )
  }

  const handleFinishNow = () => {
    if (answers.length > 0) { clearDraft(); onComplete(answers) }
  }

  const handleExit = () => {
    saveDraft(idx, answers)
    onExit()
  }

  const fadeStyle = { opacity: visible ? 1 : 0, transition: 'opacity .28s' }

  return (
    <>
      {paused && (
        <PauseOverlay
          count={answers.length}
          onContinue={() => setPaused(false)}
          onFinishNow={handleFinishNow}
          onExit={handleExit}
        />
      )}

      <div className="screen sense">
        {/* Top bar: progress dots + pause button */}
        <div className="sense-topbar">
          <div className="sense-progress">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`pdot ${i < idx ? 'pdot-done' : i === idx ? 'pdot-active' : ''}`}
              />
            ))}
          </div>
          <button className="pause-trigger" onClick={() => setPaused(true)}>
            {t.pause}
          </button>
        </div>

        <div className="sense-number" style={fadeStyle}>
          {t.senseOf(idx + 1, questions.length)}
        </div>
        <div className="sense-icon" style={fadeStyle}>{q.icon}</div>
        <div className="sense-question" style={fadeStyle}>{qText}</div>
        <div className="sense-hint" style={fadeStyle}>{qHint}</div>

        {qChips.length > 0 && (
          <div className="quick-chips">
            {qChips.map(chip => (
              <div
                key={chip}
                className={`chip ${tapped.includes(chip) ? 'chip-tapped' : ''}`}
                onClick={() => tapChip(chip)}
              >
                {chip}
              </div>
            ))}
          </div>
        )}

        <textarea
          className="sense-textarea"
          rows={3}
          placeholder={t.writeFreely}
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />

        <div className="btn-row">
          <button className="skip-btn" onClick={() => advance(true)}>{t.skip}</button>
          <button className="next-btn" onClick={() => advance(false)}>{t.continueBtn}</button>
        </div>
      </div>
    </>
  )
}
