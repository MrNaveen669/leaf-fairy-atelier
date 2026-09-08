# Leaf Fairy Atelier — MERN Phase 1

Phase 1 restructures the existing Leaf Fairy Atelier site from TypeScript + TanStack Start into a plain JavaScript MERN project while preserving the existing brochure/catalog experience.

## Stack

- **Client:** React + Vite + JavaScript/JSX + React Router + Tailwind + Framer Motion
- **Server:** Node.js + Express + JavaScript
- **Database:** MongoDB + Mongoose
- **Validation:** Zod on both the contact form and the POST `/api/enquiries` API

There is no TypeScript, TanStack Start, TanStack Router, SSR, cart, checkout, orders, authentication, payments, or admin dashboard in this phase.

## Structure

```text
client/   React/Vite SPA
server/   Express REST API + Mongoose models + seed script
```

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env` from `server/.env.example` and set `MONGODB_URI`.

```env
MONGODB_URI=mongodb://127.0.0.1:27017/leaf-fairy-atelier
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

`JWT_SECRET` remains in `.env.example` only as a future-phase placeholder. Authentication is intentionally not implemented in Phase 1.

3. Seed MongoDB:

```bash
npm run seed
```

4. Start client and server together:

```bash
npm run dev
```

Client: `http://localhost:5173`  
API: `http://localhost:5000/api`

## API

- `GET /api/collections`
- `GET /api/collections/:slug` (includes products)
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products?collection=:slug`
- `GET /api/projects`
- `GET /api/projects?category=Residential`
- `GET /api/testimonials`
- `POST /api/enquiries`

## Contact form change

The old site validated the enquiry form client-side and then discarded successful submissions. Phase 1 keeps the same interaction but now POSTs validated form data to `/api/enquiries`, where it is validated again and persisted in MongoDB.

## Content and image migration

Catalog, project, and testimonial copy is converted faithfully from the old `src/data/site.ts` into `server/seed/seed.js`. Product `priceRange` remains a display string; it is **not** a transactional price.

For portability in this generated migration package, the original five image assets are referenced from their existing public GitHub raw paths rather than replaced with new imagery. If you want the project fully self-contained, copy the original `src/assets/*.jpg` files into `client/src/assets/` and replace those URLs with local imports; no design/content change is required.

The existing stats, assurances, and process-step copy lives in `client/src/data/siteContent.js`. This is deliberate: the Phase 1 model contract only specifies Collection, Product, Project, Testimonial, and Enquiry models, and these marketing snippets do not need CRUD yet.

## Production

Build the SPA:

```bash
npm run build
```

Then run the Express server with `NODE_ENV=production`; it serves `client/dist` in addition to `/api`.

## Phase 1 vs future phases

**Included now:** JS/JSX migration, React Router SPA, Express API, Mongo/Mongoose catalog data, seed script, real enquiry persistence, existing WhatsApp enquiry links and existing visual direction.

**Intentionally deferred:** cart, checkout, orders, numeric sellable prices, stock/inventory, users/authentication, payments, wishlist, admin UI, catalog editing APIs, and other e-commerce behavior. Those belong to Phase 2+ and should be designed against this simpler base instead of being mixed into the structural migration.
