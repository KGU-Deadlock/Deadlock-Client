# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monorepo with two client applications for a quiz/interview prep platform (hellocs.site):
- **`/web`** — React 19 + Vite web application
- **`/mobile`** — React Native (Expo) app that wraps the web app in a WebView

Backend API: `https://api.hellocs.site` (WebSocket: `/v1/ws`)

## Commands

### Web (`/web`, uses pnpm)
```bash
pnpm install
pnpm dev              # Dev server at http://localhost:5173
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm lint             # ESLint check
pnpm format           # ESLint auto-fix
pnpm generate:api-models  # Generate TypeScript types from OpenAPI spec
```

### Mobile (`/mobile`, uses npm)
```bash
npm install
npm start             # Expo dev server
npm run android       # Android emulator
npm run ios           # iOS simulator
npm run lint          # ESLint check
```

## Architecture

### Web App

**Routing**: Stackflow (activity-based navigation). Each page is an "activity". Configured in `src/app/stackflow.tsx` and `src/app/stackflow-route.tsx`. Fallback activity: `LoginPage`.

**State**:
- Zustand (`src/model/`) for client state (auth, quiz, user)
- React Query (`src/api/`) for server state and data fetching
- HTTP client: Ky

**Styling**: TailwindCSS 4.2 + tailwind-merge + CVA (class-variance-authority) for component variants.

**Directory convention** — feature-based organization:
- `src/pages/` — Stackflow activities (home, quiz, ranking, streak, login, interview, onboarding, user)
- `src/components/` — UI components grouped by feature + `common/`
- `src/model/` — Zustand stores and custom hooks per feature
- `src/api/` — API query files per feature; `src/api/config/` has the generated OpenAPI types

**Path alias**: `@/*` → `src/*`

### Mobile App

The mobile app is primarily a WebView wrapper. Key architecture:

**Native Bridge** (`/mobile/bridge/index.ts`): Exposes native capabilities to the web app via `@webview-bridge`. Currently provides:
- `isLoggedIn` state
- `logout()` — native logout
- `startRecording()` / `stopRecording()` — audio recording with STT

**WebView handlers** (`/mobile/webview/`):
- `createHandleWebViewMessage.ts` — processes incoming bridge messages
- `createHandleShouldStartLoad.ts` — handles navigation/deep linking
- `micStateBridgeScript.ts` — injected JS for microphone state

To add a new native capability: define it in `bridge/index.ts`, implement the logic, then call from the web via `window.bridge.methodName()`.

## Code Quality

### Commit Message Format (enforced via commitlint)
```
emoji [type] subject
```
Example: `✨ [feat] 퀴즈 타이머 추가`

- Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`, `rename`, `remove`
- Subject: Korean preferred, max 100 chars, no trailing period
- Emoji mapping defined in `.commit-types.cjs`

### ESLint
- Import ordering enforced by path group: `@/app` → `@/pages` → `@/components` → `@/api` → `@/model` → etc.
- TypeScript strict rules + React hooks plugin

## Deployment

CI/CD via GitHub Actions (`.github/workflows/deploy.yml`):
- Triggers on push to `main` (path filter: `web/**`) or PR
- Self-hosted runner: `[self-hosted, client-deadlock]`
- Builds Docker image (Node 22 build → Nginx 1.27 serve) and deploys via docker-compose
- Required secrets: `VITE_API_BASE_URL`, `API_SWAGGER_URL`, `DISCORD_WEBHOOK_URL`

Nginx serves the SPA and proxies:
- `/grafana/` → Grafana service
- API requests → `http://app:8080`

## Environment

Web `.env`:
```
VITE_API_BASE_URL=https://api.hellocs.site
API_SWAGGER_URL=https://api.hellocs.site/v3/api-docs
```

Vite dev proxy: `/api/`, `/v3/`, `/swagger-ui/` → `https://hellocs.site`
