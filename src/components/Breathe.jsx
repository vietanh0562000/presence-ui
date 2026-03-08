// src/components/Breathe.jsx
// Guides the user through 3 breath cycles before the grounding questions.
// Adjust BREATH_CYCLES or the timing constants to change the rhythm.

import { useState, useEffect, useRef, useCallback } from 'react'

const BREATH_CYCLES   = 3
const INHALE_MS       = 4000
const HOLD_MS         = 3000
const EXHALE_MS       = 4000

export default function Breathe({ onDone }) {
  const [instruction, setInstruction] = useState('Breathe in…')
  const [countText,   setCountText]   = useState(`${BREATH_CYCLES} breaths to begin`)
  const [opacity,     setOpacity]     = useState(1)
  const count = useRef(0)

  const fade = useCallback((text) => {
    setOpacity(0)
    setTimeout(() => { setInstruction(text); setOpacity(1) }, 300)
  }, [])

  const run = useCallback(() => {
    if (count.current >= BREATH_CYCLES) { onDone(); return }

    const remaining = BREATH_CYCLES - count.current
    setCountText(remaining === 1 ? 'last breath' : `${remaining} breaths to begin`)
    fade('Breathe in…')

    const t1 = setTimeout(() => fade('Hold…'),          INHALE_MS + 300)
    const t2 = setTimeout(() => fade('Breathe out…'),   INHALE_MS + HOLD_MS + 600)
    const t3 = setTimeout(() => { count.current++; run() }, INHALE_MS + HOLD_MS + EXHALE_MS + 600)

    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onDone, fade])

  useEffect(() => {
    const cleanup = run()
    return cleanup
  }, [run])

  return (
    <div className="screen breathe">
      <div className="breathe-label">First — just breathe</div>

      <div className="breathe-circle-wrap">
        <div className="breathe-ring" />
        <div className="breathe-ring breathe-ring-2" />
        <div className="breathe-ring breathe-ring-3" />
        <div className="breathe-core">
          <span className="breathe-word">breathe</span>
        </div>
      </div>

      <div className="breathe-instruction" style={{ opacity }}>
        {instruction}
      </div>
      <div className="breathe-count">{countText}</div>
    </div>
  )
}
