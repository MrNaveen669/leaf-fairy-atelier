# Leaf Fairy — Codebase Memory

## Project
Leaf Fairy — premium/luxury botanical e-commerce platform.

## Source of Truth
PRD/TRD/UI-UX/Backend Schema → approved screenshots → this memory → current code → README.

## Current Implementation
- Frontend: React 19, Vite 6, JavaScript/JSX, React Router 6, Tailwind directives + custom CSS.
- Backend: Node/Express 4, MongoDB/Mongoose, Zod enquiry validation.
- Public catalogue remains enquiry-led; `priceRange` is display-only and there is no authoritative numeric sellable price, variant inventory, payment or order API yet.
- Routes now include `/`, `/shop`, collections, PDP, `/wishlist`, `/cart`, `/checkout`, `/login`, `/register`, `/account`, `/contact`.

## Commerce State
- Phase 1.5 guest cart/wishlist uses isolated versioned localStorage state keyed by stable product IDs; catalogue data is resolved from the current API rather than duplicated as merchant snapshots.
- Cart supports add/remove/quantity/clear and wishlist supports toggle/persistence/counts.
- Header, ProductCard and PDP are connected to commerce state.
- Client cart is non-authoritative. Future checkout must revalidate numeric pricing, variants, inventory, discounts, shipping and tax server-side.

## Checkout + Account Foundation
- Phase 1.6 storefront routes and premium UI foundation exist for login, registration, account dashboard and checkout delivery details.
- Account session is deliberately a local storefront prototype only; it is NOT production authentication. Passwords are not persisted by the client context.
- Checkout does not fabricate totals, shipping, tax, payment, inventory or order placement. Until backend commerce exists it ends in an atelier order-enquiry handoff.
- Orders and address-management UI are represented as unavailable account capabilities rather than fake persisted commerce records.
- Production auth must use the TRD security model: hashed passwords, HTTP-only secure/SameSite session cookies or equivalent secure token strategy, rate limiting, reset expiry, and server authorization.

## Existing UI Worth Preserving
Luxury editorial botanical direction, approved homepage, aligned PLP/PDP, responsive global shell, enquiry experience, and restrained forest/ivory/gold design system.

## Known Data / Architecture Limitations
- Product data lacks numeric transactional price, structured variants/SKU, inventory and multiple product media.
- Backend currently exposes catalogue/content/enquiry APIs only; auth/account/checkout/order/payment APIs are not implemented.
- Current MongoDB/JavaScript implementation must not be automatically migrated to PostgreSQL/Prisma or TypeScript without an explicit milestone.
- No tests, lint, typecheck or CI currently exist.

## Rules for Future Tasks
1. Read this file first; do not re-audit the repo.
2. Inspect only files relevant to the active milestone and relevant spec sections.
3. Preserve approved UI and working code; no unrelated refactors.
4. Anything merchant-editable must remain data-driven/admin-ready; do not hardcode catalog/CMS data merely to match screenshots.
5. Local cart/account state must never become authoritative pricing/payment/order data.
6. Avoid unnecessary dependencies and broad scans.
7. Update only affected memory sections after meaningful changes.

## Current Milestone
`Phase 1.1 — Frontend Foundation / Global Luxury Shell — DONE`
`Phase 1.2 — Luxury Homepage — DONE`
`Phase 1.3 — Shop / PLP / Collections — DONE`
`Phase 1.4 — Product Detail Page — DONE`
`Phase 1.5 — Wishlist + Cart — IMPLEMENTED; local production-build verification still required`
`Phase 1.6 — Checkout + Auth + Account — FRONTEND FOUNDATION IMPLEMENTED; secure backend auth/transactional checkout blocked by current catalogue/backend data`

## Next Milestone
`Phase 1.7 — Backend / Commerce Database`

## Security Note
Credential rotation/revocation required if previously valid. Never restore exposed credentials.
