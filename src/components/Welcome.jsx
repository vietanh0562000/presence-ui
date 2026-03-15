// src/components/Welcome.jsx

import { useLanguage } from '../contexts/LanguageContext'
import { timeAgo, clearDraft } from '../utils/storage'
import { QUESTIONS } from '../data/questions'

export default function Welcome({ onBegin, onResume, draft, getToken }) {
  const { t } = useLanguage()
  const ago = draft ? timeAgo(draft.savedAt) : null

  const handleDiscard = () => {
    clearDraft(getToken)
    onBegin()
  }

  return (
    <div className="screen welcome">
      <div className="welcome-orb">🌿</div>
      <div className="app-title">{t.appTitle}</div>
      <div className="app-sub">{t.appSub}</div>

      <button className="begin-btn" onClick={onBegin}>
        {t.begin}
      </button>

      {draft && (
        <div className="resume-banner">
          <div className="resume-label">{t.unfinishedSession}</div>
          <div className="resume-info">
            {t.sensesExplored(draft.answers.length, QUESTIONS.length, ago)}
          </div>
          <div className="resume-row">
            <button className="resume-btn" onClick={onResume}>{t.continue}</button>
            <button className="discard-btn" onClick={handleDiscard}>{t.startFresh}</button>
          </div>
        </div>
      )}
    </div>
  )
}
