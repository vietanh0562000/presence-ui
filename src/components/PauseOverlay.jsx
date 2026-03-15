// src/components/PauseOverlay.jsx
// Modal that appears when the user taps "pause".
// Gives options to continue, reflect on partial answers, or exit.

import { useLanguage } from '../contexts/LanguageContext'

export default function PauseOverlay({ count, onContinue, onFinishNow, onExit }) {
  const { t } = useLanguage()

  return (
    <div className="pause-overlay">
      <div className="pause-box">
        <div className="pause-icon">🌿</div>
        <div className="pause-title">{t.needToStepAway}</div>
        <div className="pause-sub">
          {t.pauseLine1}<br />
          {t.pauseLine2}
        </div>

        <div className="pause-saved">
          {t.sensesSaved(count)}
        </div>

        <div className="pause-actions">
          <button className="pa-continue" onClick={onContinue}>
            {t.keepGoing}
          </button>

          {count > 0 && (
            <button className="pa-finish" onClick={onFinishNow}>
              {t.reflectOnWhat}
            </button>
          )}

          <button className="pa-exit" onClick={onExit}>
            {t.saveAndExit}
          </button>
        </div>
      </div>
    </div>
  )
}
