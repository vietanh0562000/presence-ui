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

async function authHeaders(getToken) {
  const token = await getToken()
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
}

// ─── Answer normalizer ────────────────────────────────────────
// Converts the frontend's bilingual question objects to the flat
// { sense, icon, question, answer } shape the backend expects.

function normalizeAnswers(answers) {
  return answers.map(a => ({
    sense:    typeof a.sense === 'object' ? (a.sense.en ?? '') : (a.sense ?? ''),
    icon:     a.icon ?? '',
    question: a.en?.question ?? (typeof a.question === 'string' ? a.question : ''),
    answer:   a.answer ?? '—',
  }))
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

  const langNote = lang === 'vi' ? 'Write your response in Vietnamese.' : ''

  const prompt = `Someone just did a mindfulness grounding exercise. Their observations:\n\n${summary}\n\n${partialNote}\n\nWrite one warm paragraph (3–4 sentences) reflecting their present moment back poetically. Second person. Brief and human. ${langNote}`.trim()

  try {
    const res  = await fetch(CLAUDE_API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        model:      CLAUDE_MODEL,
        max_tokens: 1000,
        messages:   [{ role: 'user', content: prompt }],
      }),
    })
    const data = await res.json()
    return data.content?.[0]?.text || FALLBACK[lang]
  } catch {
    return FALLBACK[lang]
  }
}

// ─── Draft API ────────────────────────────────────────────────
// Drafts reuse the sessions collection (isPartial=true, no aiReflection).
// The draft session ID is tracked by the caller (storage.js) so we can
// PATCH the existing record instead of creating a new one every save.

// draftId: existing session ID to PATCH, or null to POST a new one.
// Returns the session ID (new or existing) so the caller can persist it.
export async function saveDraftApi({ answers, draftId }, getToken) {
  if (!answers?.length) return null

  const body = JSON.stringify({
    answers:        normalizeAnswers(answers),
    isPartial:      true,
    totalQuestions: 7,
    aiReflection:   null,
  })

  try {
    if (draftId) {
      console.log(body)
      await fetch(`${BACKEND_URL}/api/sessions/${draftId}`, {
        method:  'PATCH',
        headers: await authHeaders(getToken),
        body,
      })
      return draftId
    } else {
      const res = await fetch(`${BACKEND_URL}/api/sessions`, {
        method:  'POST',
        headers: await authHeaders(getToken),
        body,
      })
      if (!res.ok) return null
      const data = await res.json()
      return data.id ?? null
    }
  } catch (err) {
    console.error('[presence] saveDraftApi failed:', err)
    return null
  }
}

export async function loadDraftApi(getToken) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/sessions/latest-unfinished`, {
      headers: await authHeaders(getToken),
    })
    if (!res.ok || res.status === 204) return null

    const draft = await res.json()
    return {
      idx:     draft.answers?.length ?? 0,
      answers: draft.answers,
      savedAt: draft.updatedAt ? new Date(draft.updatedAt).getTime() : Date.now(),
      _id:     draft.id,
    }
  } catch {
    return null
  }
}

export async function clearDraftApi(draftId, getToken) {
  if (!draftId) return
  try {
    await fetch(`${BACKEND_URL}/api/sessions/${draftId}`, {
      method:  'DELETE',
      headers: await authHeaders(getToken),
    })
  } catch (err) {
    console.error('[presence] clearDraftApi failed:', err)
  }
}

// ─── Sessions API ─────────────────────────────────────────────

export async function saveSession(session, getToken) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/sessions`, {
      method:  'POST',
      headers: await authHeaders(getToken),
      body:    JSON.stringify({
        date:           new Date().toISOString().split('T')[0],
        answers:        normalizeAnswers(session.answers),
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
