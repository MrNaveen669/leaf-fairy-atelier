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

- Design system: PARTIAL — reusable palette tokens, typography, spacing, buttons, focus states, and motion preferences now exist; no full component system.
- Header/navigation: PARTIAL — announcement bar, responsive sticky shell, collection/contact links, utility placeholders, and accessible mobile drawer exist; full commerce navigation is deferred.
- Homepage: ALIGNED — arched category cards, best sellers, statement olive editorial, shop by space, bespoke/brand row, contact section. Approved homepage structure implemented.
- PLP/catalog: ALIGNED — editorial all-shop and collection listings, responsive image-first grid, category filtering, supported sort choices, and loading/empty/error states.
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
- Responsive UX: PARTIAL — shell is responsive with touch-sized controls, scroll lock, Escape handling, focus states, and reduced-motion support; broader page accessibility and edge states need work.
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

`Phase 1.1 — Frontend Foundation & Global Luxury Shell — DONE`
`Phase 1.2 — Luxury Homepage — DONE`
`Phase 1.3 — Shop / PLP / Collections — DONE`

## Next Milestone

`Phase 1.4 — Product Detail Page`

## Phase 1.1 Notes

- Refined `styles.css` and Tailwind tokens around the specified forest, ivory, parchment, sage, clay, and restrained antique-gold palette.
- Refined `SiteHeader.jsx` with announcement bar, hero/solid modes, utility placeholders, responsive navigation, body scroll lock, Escape close, and reduced-motion-compatible transitions.
- Refined `SiteFooter.jsx` with forest/ivory atelier layout, navigation/contact groups, and newsletter placeholder.
- Mega menu and utility destinations remain intentionally deferred to the navigation/catalog milestone.

## Phase 1.2 Notes

- Replaced collections grid with arched category cards (4-col desktop, 2-col mobile).
- Added Best Sellers section pulling from product API.
- Replaced "How We Work" with Statement Olive dark editorial section.
- Reframed portfolio as Shop by Space (5 room categories).
- Added Bespoke + "Nature in every detail" brand row.
- Removed testimonials and generic process sections from homepage.
- New CSS: `.arch-card`, `.statement-olive`, `.space-card`, `.brand-row`, `.bestseller-card`.
- New data: `categories`, `spaces`, `statementOlive` in `siteContent.js`.

## Phase 1.3 Notes

- Added `/shop` with an editorial all-products listing, local listing art, category filter, and only data-supported Newest/Name A–Z sort choices.
- Refined collection listings with compact responsive product cards, collection navigation, product counts, and loading/empty/error states.
- Product cards retain the existing WhatsApp enquiry flow; PDP click-through remains intentionally deferred until Phase 1.4.
- Local category media is used as a graceful image fallback while the API’s product-image URLs remain remote.

## Security Note

Credential rotation/revocation required if previously valid.
