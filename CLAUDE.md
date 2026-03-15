# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

There are no lint or test commands configured.

## Environment Setup

Copy `.env.example` to `.env` and fill in:
- `VITE_CLERK_PUBLISHABLE_KEY` — from your Clerk dashboard
- `VITE_BACKEND_URL` — Spring Boot backend URL (default: `http://localhost:8080`)

The Anthropic API key for Claude reflections is also required (set in the backend or directly in `src/utils/api.js`).

## Architecture

**Presence** is a React 18 + Vite SPA for a 7-sense mindfulness grounding exercise. It has no routing library — navigation is a state machine in `App.jsx`.

### Screen Flow

```
welcome → breathe → sense (questionnaire) → reflection → (back to welcome)
```

### Key Files

- `src/App.jsx` — Root component; manages `screen` state and Clerk auth gates (`<SignedIn>/<SignedOut>`)
- `src/components/` — One component per screen (`Welcome`, `Breathe`, `SenseScreen`, `Reflection`) plus `PauseOverlay` and `ParticleCanvas` (canvas-based ambient background)
- `src/data/questions.js` — The 7 hardcoded sense questions and mood tags
- `src/utils/api.js` — All external calls: Claude API (`fetchReflection`), and backend REST endpoints (`saveSession`, `updateMood`, `fetchStats`, `fetchHistory`)
- `src/utils/storage.js` — `localStorage` draft persistence helpers (`saveDraft`, `loadDraft`, `clearDraft`)
- `src/hooks/useTyping.js` — Typewriter character-by-character animation hook

### Authentication

Clerk wraps the app in `main.jsx`. Unauthenticated users are redirected to Clerk's hosted sign-in. Use `useAuth().getToken()` to get a fresh JWT for every API call to the Spring Boot backend. All backend requests include `Authorization: Bearer <token>`.

### Draft / Resume Flow

`SenseScreen` auto-saves progress to `localStorage` under key `presence_draft` as `{ idx, answers, savedAt }`. The `Welcome` screen checks for a saved draft and shows a resume/discard banner. Drafts are cleared on session completion.

### AI Reflection

`fetchReflection` in `api.js` calls the Anthropic API directly from the browser (`https://api.anthropic.com/v1/messages`, model `claude-sonnet-4-20250514`). The reflection is displayed via the `useTyping` hook. If the API call fails, a fallback text is shown.

### Backend API (Spring Boot)

All routes are prefixed `/api/sessions`:
- `POST /` — save completed/partial session
- `PATCH /{id}/mood` — update mood tag
- `GET /stats` — fetch statistics
- `GET /` — fetch session history

### Styling

Global CSS in `src/index.css` / `src/App.css`. Dark theme with warm earth tones. Design tokens (colors, fonts) are CSS variables. `ParticleCanvas` renders 80 floating particles on a `<canvas>` behind all screens.

## Deployment

Docker image is built and pushed to `ghcr.io` on merge to `master` via `.github/workflows/cd.yml`, then deployed to a DigitalOcean droplet. Environment variables (`VITE_CLERK_PUBLISHABLE_KEY`, `VITE_BACKEND_URL`) are injected at Docker build time in the CD workflow.
