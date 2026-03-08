# 🌿 Presence App (Frontend)

Vite + React 18. Auth via Clerk. Calls Spring Boot backend for session storage.

## Setup

**1. Create a Clerk application**
https://dashboard.clerk.com → Create application

**2. Create `.env`**
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY
VITE_BACKEND_URL=http://localhost:8080
```

**3. Run**
```bash
npm install
npm run dev
# → http://localhost:5173
```

## How auth works

- `main.jsx` wraps everything in `<ClerkProvider>`
- `App.jsx` uses `<SignedIn>` / `<SignedOut>` — unauthenticated users are redirected to Clerk's hosted sign-in page automatically
- `useUser()` gives the current user's name and email
- `useClerk().signOut()` signs out
- `useAuth().getToken()` is passed into every backend API call to attach a fresh JWT

## Key files

```
src/
├── main.jsx              # ClerkProvider wraps the app
├── App.jsx               # SignedIn/SignedOut gate, screen router
├── components/
│   ├── Reflection.jsx    # Calls saveSession(session, getToken) after grounding
│   └── ...
└── utils/
    └── api.js            # All backend calls accept getToken as last arg
```
