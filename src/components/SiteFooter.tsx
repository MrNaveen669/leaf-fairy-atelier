import { Link } from "@tanstack/react-router";
import { collections } from "@/data/site";
import {
  PLACEHOLDER_ADDRESS,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PHONE,
  STUDIO_HOURS,
} from "@/config/contact";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 lg:px-10 lg:py-20">
        <div>
          <p className="font-display text-3xl tracking-[0.12em] text-cream">Leaf Fairy</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Evergreen luxury, perfectly composed. Premium artificial trees, botanicals, florals and
            decor accessories — crafted in Mumbai for homes, hotels and flagship interiors.
          </p>
          <div className="rule-brass mt-6" />
        </div>

        <div>
          <p className="eyebrow">Collections</p>
          <ul className="mt-5 space-y-3">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-cream"
                >
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-cream"
              >
                Contact & Consultations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Studio</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>{PLACEHOLDER_ADDRESS}</li>
            <li>
              <span className="text-cream">{PLACEHOLDER_PHONE}</span>{" "}
              <span className="text-brass">[phone placeholder]</span>
            </li>
            <li>{PLACEHOLDER_EMAIL}</li>
            <li>{STUDIO_HOURS}</li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs tracking-[0.14em] text-muted-foreground uppercase md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Leaf Fairy. All rights reserved.</p>
          <p>Crafted in Mumbai</p>
        </div>
      </div>
    </footer>
  );
}
