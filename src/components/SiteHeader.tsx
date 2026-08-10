import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { collections } from "@/data/site";

const navLinks = [
  { label: "Home", to: "/" as const },
  ...collections.map((c) => ({ label: c.title, to: "/collections/$slug" as const, slug: c.slug })),
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/92 border-b backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.14em] text-cream">Leaf Fairy</span>
          <span className="mt-1 text-[9px] tracking-[0.34em] text-brass uppercase">
            Mumbai · Est. Atelier
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) =>
            "slug" in l ? (
              <Link
                key={l.slug}
                to="/collections/$slug"
                params={{ slug: l.slug! }}
                className="link-underline text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-cream"
                activeProps={{ className: "text-brass" }}
              >
                {l.label}
              </Link>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="link-underline text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-cream"
                activeProps={{ className: "text-brass" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <Link to="/contact" hash="enquire" className="btn-base btn-brass hidden lg:inline-flex">
          Book a Consult
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-cream lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="bg-background/98 border-t backdrop-blur-md lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((l) =>
              "slug" in l ? (
                <Link
                  key={l.slug}
                  to="/collections/$slug"
                  params={{ slug: l.slug! }}
                  onClick={() => setOpen(false)}
                  className="border-b py-4 text-sm tracking-[0.18em] uppercase"
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b py-4 text-sm tracking-[0.18em] uppercase"
                >
                  {l.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-base btn-brass mt-6 mb-2"
            >
              Book a Consult
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
