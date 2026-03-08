// src/components/Reflection.jsx
// Final screen: shows the AI reflection, the user's answers, and a mood picker.
// Also saves the session to the Spring Boot backend via Clerk-authenticated requests.

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { QUESTIONS, MOODS } from '../data/questions'
import { fetchReflection, saveSession, updateMood } from '../utils/api'
import { useTyping } from '../hooks/useTyping'

export default function Reflection({ answers, onRestart }) {
  const { getToken } = useAuth()

  const [aiRaw,      setAiRaw]      = useState('')
  const [loading,    setLoading]    = useState(true)
  const [mood,       setMood]       = useState(null)
  const [savedId,    setSavedId]    = useState(null)   // MongoDB _id from backend
  const [saveStatus, setSaveStatus] = useState('idle') // 'idle' | 'saving' | 'saved' | 'error'

  const isPartial = answers.length < QUESTIONS.length
  const real      = answers.filter(a => a.answer !== '—')

  const { shown, done } = useTyping(aiRaw)

  // Step 1: fetch reflection text from Claude
  useEffect(() => {
    fetchReflection(answers, isPartial)
      .then(text => {
        setAiRaw(text)
        // Step 2: save the session — Clerk token attached automatically
        persistSession(text)
      })
      .finally(() => setLoading(false))
  }, [])

  const persistSession = async (reflection) => {
    setSaveStatus('saving')
    const saved = await saveSession(
      { answers, isPartial, totalQuestions: QUESTIONS.length, aiReflection: reflection },
      getToken
    )
    if (saved?.id) {
      setSavedId(saved.id)
      setSaveStatus('saved')
    } else {
      setSaveStatus('error')
    }
  }

  const handleMood = async (m) => {
    setMood(m)
    if (savedId) await updateMood(savedId, m, getToken)
  }

  return (
    <div className="screen reflection">
      <div className="reflection-title">✦ Your moment, reflected</div>

      {isPartial && (
        <div className="partial-note">
          {answers.length} of {QUESTIONS.length} senses · that's enough
        </div>
      )}

      {/* AI reflection card */}
      <div className="rcard">
        <h3>What Claude felt in your words</h3>
        <div className="ai-text">
          {loading ? (
            <div className="dots"><span /><span /><span /></div>
          ) : (
            <>
              {shown}
              {!done && <span className="cursor-blink" />}
            </>
          )}
        </div>
      </div>

      {/* Sensory answers recap */}
      <div className="rcard">
        <h3>Your senses, right now</h3>
        {real.map((a, i) => (
          <div key={i} className="answer-line">
            <div className="answer-icon">{a.icon}</div>
            <div>
              <div className="answer-sense">{a.sense}</div>
              <div className="answer-text">{a.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mood picker */}
      <div className="rcard">
        <h3>How do you feel in this moment?</h3>
        <div className="mood-close">
          {MOODS.map(m => (
            <button
              key={m}
              className={`mood-tag ${mood === m ? 'mood-tag-chosen' : ''}`}
              onClick={() => handleMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Subtle save indicator */}
      <div style={{ fontSize: '.65rem', letterSpacing: '1.5px', color: 'var(--dim)', marginTop: '4px' }}>
        {saveStatus === 'saving' && '◌ saving…'}
        {saveStatus === 'saved'  && '✦ session saved'}
        {saveStatus === 'error'  && '· saved locally only'}
      </div>

      <button className="again-btn" onClick={onRestart}>
        Begin again ↺
      </button>
    </div>
  )
}
