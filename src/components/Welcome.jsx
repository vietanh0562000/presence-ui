// src/components/Welcome.jsx

import { timeAgo, clearDraft } from '../utils/storage'
import { QUESTIONS } from '../data/questions'

export default function Welcome({ onBegin, onResume, draft }) {
  const ago = draft ? timeAgo(draft.savedAt) : null

  const handleDiscard = () => {
    clearDraft()
    onBegin()
  }

  return (
    <div className="screen welcome">
      <div className="welcome-orb">🌿</div>
      <div className="app-title">PRESENCE</div>
      <div className="app-sub">a grounding ritual</div>

      <button className="begin-btn" onClick={onBegin}>
        Begin
      </button>

      {draft && (
        <div className="resume-banner">
          <div className="resume-label">Unfinished session</div>
          <div className="resume-info">
            {draft.answers.length} of {QUESTIONS.length} senses explored · {ago}
          </div>
          <div className="resume-row">
            <button className="resume-btn" onClick={onResume}>↩ Continue</button>
            <button className="discard-btn" onClick={handleDiscard}>Start fresh</button>
          </div>
        </div>
      )}
    </div>
  )
}
