# Leaf Fairy — Codebase Memory

## Project

Leaf Fairy — premium/luxury botanical e-commerce platform.

## Current Repository

`/mnt/newvolume/WebAksh/Leaf Fairy/leaf-fairy-atelier`

## Source of Truth

- PRD: `docs/01-PRD-Leaf-Fairy.md`
- TRD: `docs/02-TRD-Leaf-Fairy.md`
- UI/UX Specification: `docs/03-UI-UX-Specification-Leaf-Fairy.md`
- Backend Database Schema: `docs/04-Backend-Schema-Leaf-Fairy.md`

These documents override stale README assumptions.

## Current Implementation

- Frontend: React 19 with Vite 6, JavaScript/JSX.
- Routing: React Router DOM 6.
- Styling: Tailwind CSS 3 directives plus custom global CSS.
- Animation: Framer Motion.
- Backend: Node.js with Express 4 and ESM.
- Database/ODM: MongoDB with Mongoose.
- Validation: Zod for enquiry requests.
- Pages/routes: `/`, `/collections/:slug`, `/contact`, and a 404 fallback.
- API: `GET /api/health`; collection list/detail; product list/detail; projects list; testimonials list; validated `POST /api/enquiries`.
- Current data is catalogue/enquiry-led; `priceRange` is display-only.

## Target Architecture

The TRD and backend schema plan a future React/Vite/TypeScript frontend, Node backend, PostgreSQL database, Prisma ORM, feature-oriented modules, authentication, commerce, and admin APIs. This is target state, not the current implementation.

## Existing UI Worth Preserving

- Luxury/editorial botanical visual direction with restrained motion and serif display type.
- Full-bleed hero and collection storytelling.
- Collection product-card/grid presentation.
- Projects and testimonials sections.
- Contact/enquiry experience with client and server validation.

## Important Paths

- [client/src/App.jsx](../client/src/App.jsx) — routing.
- [client/src/pages/](../client/src/pages/) — current screens.
- [client/src/components/](../client/src/components/) — shared UI.
- [client/src/styles.css](../client/src/styles.css) — global visual foundation.
- [client/src/api/client.js](../client/src/api/client.js) — API wrapper.
- [server/server.js](../server/server.js) — API bootstrap and production serving.
- [server/routes/](../server/routes/), [server/controllers/](../server/controllers/), [server/models/](../server/models/) — API/data layers.
- [server/seed/seed.js](../server/seed/seed.js) — disposable content bootstrap.

## Current Feature Status

- Design system: PARTIAL — visual tokens and utility classes exist; no full component system.
- Header/navigation: PARTIAL — responsive header and collection/contact links; no full commerce navigation.
- Homepage: PARTIAL — hero, collections, projects, testimonials, and enquiry CTA exist.
- PLP/catalog: PARTIAL — collection product grid exists; no full shop, sort, filters, or pagination.
- PDP: MISSING.
- Search: MISSING.
- Wishlist: MISSING.
- Cart: MISSING.
- Checkout: MISSING.
- Auth: MISSING.
- Account: MISSING.
- Backend APIs: PARTIAL — public catalogue/content, health, and enquiry endpoints only.
- Database: PARTIAL — MongoDB/Mongoose models for collections, products, projects, testimonials, and enquiries.
- Admin: MISSING.
- CMS: MISSING.
- Responsive UX: PARTIAL — responsive layout and mobile menu exist; accessibility and edge states need work.
- SEO: MISSING — no route metadata, structured data, sitemap, or robots configuration.

## Known Issues

- `server/seed/seed.js` clears and reinserts catalogue collections; treat it as destructive disposable-environment tooling.
- Product data lacks transactional variants, inventory, and numeric sellable prices.
- Images use remote GitHub raw URLs rather than an owned asset pipeline.
- API empty/error states, mobile-menu accessibility, and reduced-motion handling need improvement.
- No tests, lint, typecheck, or CI are currently present.

## Rules for Future Codex Tasks

1. Read `docs/CODEBASE_MEMORY.md` first.
2. Do not re-audit the full repository unless explicitly requested.
3. Inspect only files relevant to the current task.
4. PRD/TRD/UI-UX/Backend Schema are higher authority than README.
5. Preserve useful existing UI where practical.
6. Avoid unnecessary dependency installation.
7. Do not migrate MongoDB → PostgreSQL unless explicitly instructed.
8. Do not convert JavaScript → TypeScript unless explicitly instructed.
9. Update this memory only when meaningful project state changes.
10. Keep this file compact.

## Current Milestone

`Phase 0 — Stabilized`

## Next Milestone

`Phase 1.1 — Frontend foundation and global luxury shell`

## Security Note

Credential rotation/revocation required if previously valid.
