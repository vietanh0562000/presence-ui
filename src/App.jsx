// src/App.jsx
// Auth is fully delegated to Clerk.
// <SignedOut> shows Clerk's hosted sign-in page.
// <SignedIn> renders the app — useUser() gives us the current user.

import { useState } from 'react'
import { SignedIn, SignedOut, RedirectToSignIn, useUser, useClerk } from '@clerk/clerk-react'
import { useLanguage } from './contexts/LanguageContext'
import ParticleCanvas from './components/ParticleCanvas'
import Welcome        from './components/Welcome'
import Breathe        from './components/Breathe'
import SenseScreen    from './components/SenseScreen'
import Reflection     from './components/Reflection'
import { loadDraft, clearDraft } from './utils/storage'

function PresenceApp() {
  const { user }    = useUser()
  const { signOut } = useClerk()
  const { t, toggle } = useLanguage()

  const [screen,        setScreen]        = useState('welcome')
  const [answers,       setAnswers]       = useState([])
  const [resumeIdx,     setResumeIdx]     = useState(0)
  const [resumeAnswers, setResumeAnswers] = useState([])
  const [draft,         setDraft]         = useState(() => loadDraft())

  const goHome = () => { setDraft(loadDraft()); setScreen('welcome') }

  const handleBegin = () => {
    setResumeIdx(0); setResumeAnswers([]); setScreen('breathe')
  }

  const handleResume = () => {
    if (draft) { setResumeIdx(draft.idx); setResumeAnswers(draft.answers); setScreen('sense') }
  }

  const handleRestart = () => {
    clearDraft(); setDraft(null)
    setResumeIdx(0); setResumeAnswers([])
    setScreen('breathe')
  }

  const handleComplete = (ans) => { setAnswers(ans); setScreen('reflection') }

  const topBarStyle = {
    position: 'fixed', top: 20, right: 20, zIndex: 10,
    display: 'flex', alignItems: 'center', gap: 14,
  }

  const dimBtnStyle = {
    background: 'none', border: 'none', color: 'var(--dim)',
    fontSize: '.65rem', letterSpacing: '1.5px', textTransform: 'uppercase',
    cursor: 'pointer', fontFamily: "'Jost', sans-serif",
  }

  return (
    <div className="presence-app">
      <ParticleCanvas />

      {/* Top-right: first name + language toggle + sign out */}
      <div style={topBarStyle}>
        {user && (
          <span style={{ fontSize: '.68rem', color: 'var(--dim)', letterSpacing: '1px' }}>
            {user.firstName || user.emailAddresses?.[0]?.emailAddress}
          </span>
        )}
        <button onClick={toggle} style={dimBtnStyle}>
          {t.langToggle}
        </button>
        <button onClick={() => signOut()} style={dimBtnStyle}>
          {t.signOut}
        </button>
      </div>

      {screen === 'welcome'    && <Welcome    onBegin={handleBegin} onResume={handleResume} draft={draft} />}
      {screen === 'breathe'    && <Breathe    onDone={() => setScreen('sense')} />}
      {screen === 'sense'      && <SenseScreen initialIdx={resumeIdx} initialAnswers={resumeAnswers} onComplete={handleComplete} onExit={goHome} />}
      {screen === 'reflection' && <Reflection answers={answers} onRestart={handleRestart} />}
    </div>
  )
}

export default function App() {
  return (
    <>
      <SignedOut>
        {/* Redirects to Clerk's hosted sign-in page */}
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <PresenceApp />
      </SignedIn>
    </>
  )
}
