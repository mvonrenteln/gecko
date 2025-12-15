# Gecko Frontend (Next.js)

Successor to the AngularJS app shell. Provides SSR/ISR routing and modular services for the core flows (loading audio, editing transcripts, and exporting data). Playwright E2E coverage is temporarily disabled until the setup is fixed.

## Commands

- `npm run dev` – start the SSR dev server
- `npm run build` – production build
- `npm run start` – serve the built app
- `npm run lint` – ESLint checks
- `npm run type-check` – TypeScript validation
- `npm test` – run unit tests with Vitest

The page uses Tailwind + CSS Modules and keeps the legacy `static/css/app.css` while AngularJS runs in parallel.
