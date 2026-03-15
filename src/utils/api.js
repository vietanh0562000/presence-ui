// src/utils/api.js
//
// Auth is now fully handled by Clerk.
// Session API functions accept a `getToken` argument — pass Clerk's
// `useAuth().getToken` from whatever component calls them.
//
// Example usage in a component:
//   const { getToken } = useAuth()
//   await saveSession(session, getToken)

const CLAUDE_API   = 'https://api.anthropic.com/v1/messages'
const CLAUDE_MODEL = 'claude-sonnet-4-20250514'
const BACKEND_URL  = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'

const FALLBACK = {
  en: 'You are here. Right now, in this body, in this light, breathing this air — you exist fully. That is enough. That has always been enough.',
  vi: 'Bạn đang ở đây. Ngay lúc này, trong cơ thể này, trong ánh sáng này, đang thở bầu không khí này — bạn tồn tại trọn vẹn. Như vậy là đủ. Như vậy luôn luôn là đủ.',
}

// ─── Auth header helper ──────────────────────────────────────

/**
 * Calls Clerk's getToken() to get a fresh JWT, returns fetch headers.
 * Pass `{ template: 'your-template' }` if you've set up a JWT template in Clerk.
 */
async function authHeaders(getToken) {
  const token = await getToken()
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

// ─── Claude API ──────────────────────────────────────────────

export async function fetchReflection(answers, isPartial, lang = 'en') {
  const summary = answers
    .filter(a => a.answer !== '—')
    .map(a => {
      const senseName = typeof a.sense === 'object' ? a.sense.en : a.sense
      return `${senseName}: ${a.answer}`
    })
    .join('\n')

  const partialNote = isPartial
    ? 'Note: they only completed part of the exercise — acknowledge that briefly and warmly.'
    : ''

  const langNote = lang === 'vi'
    ? 'Write your response in Vietnamese.'
    : ''

  const prompt = `Someone just did a mindfulness grounding exercise. Their observations:\n\n${summary}\n\n${partialNote}\n\nWrite one warm paragraph (3–4 sentences) reflecting their present moment back poetically. Second person. Brief and human. ${langNote}`.trim()

  try {
    const res  = await fetch(CLAUDE_API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        model:    CLAUDE_MODEL,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await res.json()
    return data.content?.[0]?.text || FALLBACK[lang]
  } catch {
    return FALLBACK[lang]
  }
}

// ─── Sessions API ─────────────────────────────────────────────
// All functions take `getToken` as their last argument.
// This is Clerk's `useAuth().getToken` — a function that returns a Promise<string>.

export async function saveSession(session, getToken) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/sessions`, {
      method:  'POST',
      headers: await authHeaders(getToken),
      body:    JSON.stringify({
        date:           new Date().toISOString().split('T')[0],
        answers:        session.answers,
        moodTag:        session.moodTag || null,
        isPartial:      session.isPartial ?? false,
        totalQuestions: session.totalQuestions ?? 7,
        aiReflection:   session.aiReflection || null,
      }),
    })
    if (!res.ok) throw new Error(`${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('[presence] saveSession failed:', err)
    return null
  }
}

export async function updateMood(sessionId, moodTag, getToken) {
  if (!sessionId) return null
  try {
    const res = await fetch(`${BACKEND_URL}/api/sessions/${sessionId}/mood`, {
      method:  'PATCH',
      headers: await authHeaders(getToken),
      body:    JSON.stringify({ moodTag }),
    })
    if (!res.ok) throw new Error(`${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('[presence] updateMood failed:', err)
    return null
  }
}

export async function fetchStats(getToken) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/sessions/stats`, {
      headers: await authHeaders(getToken),
    })
    if (!res.ok) throw new Error(`${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('[presence] fetchStats failed:', err)
    return null
  }
}

export async function fetchHistory(getToken) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/sessions`, {
      headers: await authHeaders(getToken),
    })
    if (!res.ok) throw new Error(`${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('[presence] fetchHistory failed:', err)
    return []
  }
}
