// src/components/PauseOverlay.jsx
// Modal that appears when the user taps "pause".
// Gives options to continue, reflect on partial answers, or exit.

export default function PauseOverlay({ count, onContinue, onFinishNow, onExit }) {
  return (
    <div className="pause-overlay">
      <div className="pause-box">
        <div className="pause-icon">🌿</div>
        <div className="pause-title">Need to step away?</div>
        <div className="pause-sub">
          That's completely okay.<br />
          Your progress is saved and waiting for you.
        </div>

        <div className="pause-saved">
          ✦ {count} {count === 1 ? 'sense' : 'senses'} saved
        </div>

        <div className="pause-actions">
          <button className="pa-continue" onClick={onContinue}>
            ↩ Keep going
          </button>

          {count > 0 && (
            <button className="pa-finish" onClick={onFinishNow}>
              Reflect on what I have →
            </button>
          )}

          <button className="pa-exit" onClick={onExit}>
            Save & exit
          </button>
        </div>
      </div>
    </div>
  )
}
