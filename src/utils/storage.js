// src/utils/storage.js
// Draft persistence: API is the source of truth; localStorage is a fast local cache.
//
// The draft session ID (_id from MongoDB) is stored separately under DRAFT_ID_KEY
// so saveDraft can PATCH the existing record instead of POSTing a new one each time.

import { saveDraftApi, loadDraftApi, clearDraftApi } from './api'

const CACHE_KEY    = 'presence_draft'
const DRAFT_ID_KEY = 'presence_draft_id'

export function saveDraft(idx, answers, getToken) {
  // Sync cache write for instant reads
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ idx, answers, savedAt: Date.now() }))
  } catch {}

  // Background API sync — PATCH if we have an ID, POST otherwise
  if (getToken && answers?.length) {
    const draftId = localStorage.getItem(DRAFT_ID_KEY) ?? null
    saveDraftApi({ answers, draftId }, getToken).then(id => {
      if (id && !draftId) {
        try { localStorage.setItem(DRAFT_ID_KEY, id) } catch {}
      }
    })
  }
}

export async function loadDraft(getToken) {
  // Try API first so drafts survive across devices / browsers
  if (getToken) {
    const remote = await loadDraftApi(getToken)
    if (remote) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(remote))
        if (remote._id) localStorage.setItem(DRAFT_ID_KEY, remote._id)
      } catch {}
      return remote
    }
  }

  // Fall back to local cache
  try {
    const data = localStorage.getItem(CACHE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export function clearDraft(getToken) {
  const draftId = localStorage.getItem(DRAFT_ID_KEY) ?? null
  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(DRAFT_ID_KEY)
  } catch {}
  if (getToken) clearDraftApi(draftId, getToken)
}

// Returns a human-readable string like "5m ago", "2h ago", "yesterday"
export function timeAgo(timestamp) {
  const m = Math.round((Date.now() - timestamp) / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  return h < 24 ? `${h}h ago` : 'yesterday'
}
