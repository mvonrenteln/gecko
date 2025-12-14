# Gecko Frontend (Next.js)

Nachfolger der AngularJS-App-Shell. Enthält SSR/ISR-Routing, modulare Services und E2E-Tests für die Kernflüsse (Audio laden, Transkript bearbeiten und Export).

## Commands

- `npm run dev` – startet SSR-Dev-Server
- `npm run build` – Produktions-Build
- `npm run start` – Starten des gebauten Servers
- `npm run lint` – ESLint Checks
- `npm run type-check` – TypeScript
- `npm run test:e2e` – Playwright Szenarien (mit gestartetem Dev-Server via `npm run dev`)

Die Seite nutzt Tailwind + CSS Modules und bindet legacy `static/css/app.css` ein, solange AngularJS parallel läuft.
