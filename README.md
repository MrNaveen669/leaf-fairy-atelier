# Leaf Fairy Luxe

Build a luxury, premium single-page website for "Leaf Fairy" — a brand crafting premium artificial trees, plants, florals and luxury decor accessories, styled for homes, hotels and flagship interiors (based in Mumbai). This is a rebuild/rebrand of an earlier "LeafVelly" concept — reuse the same overall content strategy and structure, but elevate it to a fully polished, production-ready 10/10 site, not a placeholder demo.

=== BRAND ===
- Name: Leaf Fairy
- Tagline: "Evergreen luxury, perfectly composed."
- Tone: quiet, confident luxury — like a couture atelier, not a generic plant shop
- Logo: elegant wordmark "Leaf Fairy" (serif or refined sans), no literal fairy clipart — keep it sophisticated

=== KEY FIX vs the old demo ===
- ALL "Explore" buttons under each collection must actually navigate to a real, fully built category page (not dead anchor links) — use client-side routing (React Router) with a page per collection: Statement Trees, Botanical Studies, Florals & Orchids, Decor Accessories. Each category page needs its own hero, a grid of realistic sample products (name, short description, image placeholder, indicative price range in INR), and a "Enquire about this piece" CTA that opens WhatsApp/contact.
- Use a REAL placeholder contact number format clearly marked as [PHONE PLACEholder] in a way that's obvious it needs to be swapped (e.g. use a config file /src/config/contact.ts with a clearly named PLACEHOLDER_PHONE constant) so it's easy for the client to update — do not silently fabricate a real-looking business phone number as if it were verified.
- Do NOT include unverifiable press/media logos (no "As seen in Architectural Digest / Elle Decor" etc.) unless the user later confirms real press mentions — replace that section with a genuine trust-building element instead, like certifications, guarantee badges, or a "by the numbers" stats bar.
- Testimonials should be clearly fictional/sample placeholders in a code comment, structured so real ones can be swapped in easily.

=== PAGES / SECTIONS ===
1. Home: hero (large botanical image, tagline, dual CTA "View Collections" / "Book a Styling Consult"), trust stats bar, 4 collection cards linking to real category pages, portfolio/case-study grid (filterable: All/Residential/Hospitality/Commercial), process section (4 steps), testimonials (marked as sample), contact section with form + WhatsApp button
2. Individual category pages (4) as described above
3. Simple portfolio project detail (optional nice-to-have, can be a modal or page)
4. Contact page/section with a working front-end form (no backend required, just client-side validation + a friendly submit confirmation state)

=== VISUAL DIRECTION ===
- Deep, elegant palette: charcoal/near-black backgrounds, warm brass/gold accents, cream text, rich botanical greens as secondary accent
- Generous whitespace, refined serif display type for headings, clean sans-serif body
- Subtle scroll reveal animations (Framer Motion), tasteful — not flashy
- Fully responsive, mobile-first
- Use elegant image placeholders (high-quality botanical/interior stock-style descriptions) with clear alt text since real photography isn't available yet

Build this as a complete, polished, real product — not a demo shell. Every nav link and CTA should go somewhere real.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://leaf-fairy-atelier.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6371eb22-4017-4f52-91cc-15120d7c4743).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
