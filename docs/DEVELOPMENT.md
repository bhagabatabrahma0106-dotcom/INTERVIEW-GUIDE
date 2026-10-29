# Developer and QA guide

## Scripts
- `npm ci` installs from the committed lockfile
- `npm run dev` starts the development server
- `npm run lint` runs Oxlint
- `npm run build` performs TypeScript checks and generates a Vite build
- `npm run preview` previews the production build

## Architecture
- Client-side React Router pages, local source question bank, Zustand state persistence.
- No backend API, remote question service or cloud account storage in this repository.
- React Three Fiber scenes are optional visual enhancements, not required to read interview content.

## Manual acceptance checklist
1. Verify all routes, category links and search results.
2. Start a mock interview; test timer expiry, answer handling, skip and finish.
3. Bookmark, complete and refresh a page; check local persistence.
4. Test reduced-motion preferences, keyboard navigation, mobile layout and 3D error fallback.
5. Review question correctness and attribution before publishing new items.
6. Ensure GitHub Actions lint/build checks pass.

## Scope restriction
This maintenance pass does not alter `src/pages/ProfilePage.tsx`, profile images or the separate portfolio repositories.
