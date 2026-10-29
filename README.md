# Data & Analytics Interview Guide | React Application

An interactive interview-preparation web application for data and analytics topics. It includes a searchable question bank, topic navigation, bookmarks, completion tracking, timed mock-interview sessions, dashboard/progress screens and optional 3D visual elements.

## Features

- Practice topics covering SQL, Excel, Python, Tableau, statistics and related data concepts.
- Browse questions by category or use full-text search.
- Bookmark and mark questions as completed.
- Run a **10-question mock interview** with a 2-minute timer per question.
- Track recent activity and streak information using local browser storage through Zustand's persistence middleware.
- Optional Three.js / React Three Fiber graphics with error-boundary fallbacks.

**This is a self-study tool.** Mock interview results are self-assessed practice, not a formal evaluation, qualification or recruiting service.

## Technology

React 19, TypeScript, Vite 8, React Router, Zustand, Framer Motion, React Three Fiber/Three.js and supporting UI libraries. Package versions and dependency details are recorded in [package.json](package.json).

## Local development

Requires Node.js **22.12+** with npm.

```bash
npm ci
npm run dev
```

Vite normally serves locally at `http://localhost:5173`.

### Verification

```bash
npm run lint
npm run build
npm run preview
```

The GitHub Actions workflow runs `npm ci`, Oxlint and the TypeScript/Vite production build for pushes and PRs. It does **not** run browser-level end-to-end tests, deployment or external data validation.

## Structure

| Location | Responsibility |
|---|---|
| [src/data/questions.ts](src/data/questions.ts) | Curated local question bank |
| [src/data/categories.ts](src/data/categories.ts) | Topic definitions and category metadata |
| [src/pages/](src/pages/) | Topic, search, question, mock interview, progress and settings screens |
| [src/store/useAppStore.ts](src/store/useAppStore.ts) | Local saved progress, bookmarks, mock sessions and streaks |
| [src/components/](src/components/) | UI components, interactive content and 3D features |
| [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) | Development and QA checklist |

## Privacy and limitations

No user authentication or cloud account synchronization is implemented in this source. Browser-local saved state may be lost if storage is cleared, and storing progress locally is not equivalent to secure long-term backup. For accessibility, test keyboard navigation, reduced-motion settings and 3D fallbacks on supported browsers.

The application's existing **profile page and profile images have not been changed** in this documentation-focused update.

**Maintainer:** [bhagabatabrahma0106-dotcom](https://github.com/bhagabatabrahma0106-dotcom).
