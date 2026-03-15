// src/components/Breathe.jsx
// Guides the user through 3 breath cycles before the grounding questions.
// Adjust BREATH_CYCLES or the timing constants to change the rhythm.

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const BREATH_CYCLES = 3
const INHALE_MS     = 4000
const HOLD_MS       = 3000
const EXHALE_MS     = 4000

export default function Breathe({ onDone }) {
  const { t } = useLanguage()

  const [phase,     setPhase]     = useState('inhale')
  const [remaining, setRemaining] = useState(BREATH_CYCLES)
  const [opacity,   setOpacity]   = useState(1)
  const count = useRef(0)

  // Derive display strings from phase + remaining so they update with language changes
  const instruction = phase === 'inhale' ? t.breatheIn : phase === 'hold' ? t.hold : t.breatheOut
  const countText   = remaining === 1 ? t.lastBreath : t.breathsToBegin(remaining)

  const fade = useCallback((newPhase) => {
    setOpacity(0)
    setTimeout(() => { setPhase(newPhase); setOpacity(1) }, 300)
  }, [])

  const run = useCallback(() => {
    if (count.current >= BREATH_CYCLES) { onDone(); return }

    setRemaining(BREATH_CYCLES - count.current)
    fade('inhale')

    const t1 = setTimeout(() => fade('hold'),   INHALE_MS)
    const t2 = setTimeout(() => fade('exhale'), INHALE_MS + HOLD_MS)
    const t3 = setTimeout(() => { count.current++; run() }, INHALE_MS + HOLD_MS + EXHALE_MS)

    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onDone, fade])

  useEffect(() => {
    const cleanup = run()
    return cleanup
  }, [run])

  return (
    <div className="screen breathe">
      <div className="breathe-label">{t.firstJustBreathe}</div>

      <div className={`breathe-circle-wrap phase-${phase}`}>
        <div className="breathe-ring" />
        <div className="breathe-ring breathe-ring-2" />
        <div className="breathe-ring breathe-ring-3" />
        <div className="breathe-core">
          <span className="breathe-word">{t.breatheWord}</span>
        </div>
      </div>

      <div className="breathe-instruction" style={{ opacity }}>
        {instruction}
      </div>
      <div className="breathe-count">{countText}</div>
    </div>
  )
}
