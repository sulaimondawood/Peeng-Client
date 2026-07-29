# Peeng — Client (Frontend)

Peeng is a developer-first, self-hostable realtime endpoint monitoring platform. This repository contains the TypeScript + React single-page web client (the console) used to manage workspaces, monitors, incidents and team members.

This README explains how to get the client running, environment variables you may need, the app structure, developer notes, and troubleshooting — enough to use or contribute without reading the codebase.

---

## Table of contents
- What this is
- Features
- Stack
- Project structure
- How to run (quickstart)
- Environment variables
- Authentication & local state
- Routes & pages overview
- Building & deployment
- Troubleshooting
- Contributing
- License & links

---

## What this is
Peeng Client is a Vite + React single-page app that provides a console for creating workspaces, adding HTTP monitors, viewing incidents and response-time metrics, and managing members. The frontend communicates with a Peeng backend API and stores session/auth data in the browser's localStorage.

## Features
- SPA monitoring console with marketing and auth pages.
- Multi-tenant (workspace) support and workspace switching.
- Configurable HTTP health checks (method, status, interval, thresholds).
- Incident open/close and incident details.
- Dashboard with live-feel operational feed and charts.
- Self-hostable; can be served statically (Vercel, Netlify, custom host).

## Stack
- Language: TypeScript (React)
- Bundler / Dev server: Vite
- CSS: Tailwind CSS
- Key libraries: react-router-dom, @tanstack/react-query, axios, lucide-react, recharts

## Project structure (top-level)

```text
src/                    # Application source
  main.tsx              # React entry — mounts App
  App.tsx               # Root composition (providers + routes)
  pages/                # Pages (public, auth, dashboard)
  context/              # React context providers (AuthContext, StateContext)
  lib/                  # API wrappers and local-storage helpers
  utils/routes/         # AppRoutes and path constants
  layouts/              # Layout components (MarketingLayout, AuthLayout, ProtectedRoutesLayout)
index.html              # Vite HTML entry
package.json            # scripts and dependencies
vite.config.ts          # Vite configuration
tsconfig.json           # TypeScript config
vercel.json             # Vercel deployment config (if using Vercel)
```

How it fits together: App.tsx composes a QueryClientProvider (react-query), AuthProvider (authentication & workspace state), and a StateProvider (toasts, UI state). AppRoutes (src/utils/routes/routes.tsx) defines marketing, auth, onboarding, and protected dashboard routes.

## How to run (quickstart)

Prerequisites
- Node.js (recommended v18+)
- npm (or yarn/pnpm)
- Git
- Optional: a running Peeng backend API for a fully functional experience

Clone and install
```bash
git clone https://github.com/sulaimondawood/Peeng-Client.git
cd Peeng-Client
npm install
```

Run locally (development)
```bash
npm run dev
# Open http://localhost:3000
```

Build and preview production
```bash
npm run build
npm run preview
```

Useful scripts (from package.json)
- `npm run dev` — start Vite dev server (default port 3000)
- `npm run build` — produce production build in `dist/`
- `npm run preview` — preview the production build
- `npm run clean` — remove `dist` and `server.js`
- `npm run lint` — TypeScript type-check (no emit)

## Environment variables

This project uses Vite. Environment variables must be prefixed with `VITE_`.

Create a file named `.env.local` in the project root with at least the API base URL:

```bash
# .env.local (example)
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=10000
VITE_APP_TITLE=Peeng Console
```

- VITE_API_URL — required: backend base URL the client will call
- VITE_API_TIMEOUT — optional: request timeout in ms
- VITE_APP_TITLE — optional UI title shown in the app

After updating env vars, restart the dev server.

## Authentication & local state

The client persists auth and workspace state in localStorage. The keys used by the app are:
- `peeng_access_token` — stored access token
- `peeng_user` — JSON string of the user session object
- `peeng_memberships` — JSON string of workspace/membership list
- `peeng_last_workspace_id` — the last/active workspace id

Files of interest:
- `src/context/AuthContext.tsx` — main auth provider that initializes auth state using react-query and localStorage.
- `src/lib/api/auth-storage.ts` — helper functions that read/write the keys above.

Developer tip: for quick local testing without a full auth flow, you can manually set these keys in the browser devtools Console. Example:
```js
localStorage.setItem('peeng_access_token', 'test-token');
localStorage.setItem('peeng_user', JSON.stringify({ id: 'user-1', email: 'dev@example.com' }));
localStorage.setItem('peeng_memberships', JSON.stringify([{ tenantId: 't1', role: 'owner' }]));
localStorage.setItem('peeng_last_workspace_id', 't1');
```

## Routes & pages overview

Main routes are defined in `src/utils/routes/routes.tsx`.

Public / marketing:
- `/` — Landing page (marketing, quickstart)
- `/features` — Features page

Auth:
- `/auth/login`, `/auth/register`, `/auth/forgot`, `/auth/reset`, `/auth/verify`

Onboarding:
- Invite accept and no-workspace pages paths (used for bootstrap/onboarding flows)

Protected (dashboard):
- `/dashboard` — overview
- `/dashboard/monitors` — monitor list
- `/dashboard/monitors/create` — create monitor
- `/dashboard/monitors/:monitorId` — monitor detail
- `/dashboard/incidents` — incidents list
- `/dashboard/incidents/:incidentId` — incident detail
- `/dashboard/settings` — settings pages
- `/dashboard/members` or `/dashboard/team` — team management
- `/dashboard/status-pages` — status pages feature

## Building & deployment

Static hosting: `npm run build` outputs a static `dist/` directory that can be served from any static host. Ensure you provide the required environment variables to the host (Vercel, Netlify, etc.).

Vercel: this repo includes `vercel.json` to assist deployment. Provide the `VITE_API_URL` env var in the Vercel project settings.

History API fallback: when serving the SPA from a static server or reverse proxy, ensure the server rewrites unknown routes to `index.html` so client-side routing works.

## Troubleshooting

1. Blank page / runtime error
   - Open browser devtools Console to inspect errors
   - Confirm `VITE_API_URL` is set and reachable

2. CORS errors when calling API
   - Configure backend to allow CORS for `http://localhost:3000` (or your frontend origin)

3. Authentication issues (401/403)
   - Verify tokens in localStorage and that backend validation is aligned with the token format

4. TypeScript build errors
   - Run `npm run lint` and fix type errors reported by `tsc`

5. Port conflict on 3000
   - Stop the other service or change the `dev` script port in `package.json`

## Contributing

Contributions are welcome.

1. Fork the repository and create a branch for your feature/fix.
2. Run and test locally.
3. Keep changes small and scope-limited; open a Pull Request describing the change.

Helpful checks before opening a PR:
```bash
npm run lint
npm run build
```

Code locations to review when contributing:
- UI and pages: `src/pages/`
- Routing: `src/utils/routes/routes.tsx`
- Auth flow: `src/context/AuthContext.tsx`
- Local storage helpers: `src/lib/api/auth-storage.ts`

## License & links
- If you intend to open-source this project, add a `LICENSE` file (MIT recommended).
- Frontend quickstart references the main Peeng repository used in the landing page: https://github.com/sulaimondawood/Peeng

---

If you want, I can also:
- open a Pull Request that adds this README to the repository, or
- create a minimal `.env.example` with the env keys shown above.

