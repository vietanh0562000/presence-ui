// src/utils/storage.js
// Handles saving and loading draft sessions from localStorage.

const SAVE_KEY = 'presence_draft'

export function saveDraft(idx, answers) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ idx, answers, savedAt: Date.now() }))
  } catch {}
}

export function loadDraft() {
  try {
    const data = localStorage.getItem(SAVE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch {}
}

// Returns a human-readable string like "5m ago", "2h ago", "yesterday"
export function timeAgo(timestamp) {
  const m = Math.round((Date.now() - timestamp) / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  return h < 24 ? `${h}h ago` : 'yesterday'
}
