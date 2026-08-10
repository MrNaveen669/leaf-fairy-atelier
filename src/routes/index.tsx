import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";
import { Reveal } from "@/components/Reveal";
import {
  assurances,
  collections,
  heroImg,
  processSteps,
  projects,
  stats,
  testimonials,
  type Project,
} from "@/data/site";

const title = "Leaf Fairy — Premium Artificial Trees, Plants & Luxury Decor, Mumbai";
const description =
  "Evergreen luxury, perfectly composed. Leaf Fairy crafts premium artificial trees, botanicals, florals and decor accessories for homes, hotels and flagship interiors in Mumbai.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const filters = ["All", "Residential", "Hospitality", "Commercial"] as const;

function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <img
            src={heroImg}
            alt="Sculptural artificial olive tree in a matte black planter inside a dark, brass-accented luxury interior"
            width={1920}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="veil absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="eyebrow">Artificial botanicals · Mumbai atelier</p>
              <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-8xl">
                Evergreen luxury,
                <br />
                <span className="text-brass-gradient italic">perfectly composed.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                Premium artificial trees, botanicals, florals and decor accessories — hand-composed
                for homes, hotels and flagship interiors that cannot afford to look temporary.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#collections" className="btn-base btn-brass">
                  View Collections
                </a>
                <Link to="/contact" className="btn-base btn-ghost-cream">
                  Book a Styling Consult
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y bg-card">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 lg:grid-cols-4 lg:px-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="text-center lg:text-left">
                  <p className="font-display text-4xl text-brass lg:text-5xl">{s.value}</p>
                  <p className="mt-2 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* COLLECTIONS */}
        <section id="collections" className="scroll-mt-20 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">The Collections</p>
                <h2 className="mt-5 text-4xl leading-tight lg:text-5xl">
                  Four disciplines, one standard of finish.
                </h2>
                <div className="rule-brass mt-7" />
              </div>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {collections.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 2) * 0.1}>
                  <article className="card-lux group relative h-full overflow-hidden">
                    <div className="relative h-96 overflow-hidden lg:h-[28rem]">
                      <img
                        src={c.image}
                        alt={c.alt}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                      />
                      <div className="veil absolute inset-0" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <p className="eyebrow">{c.kicker}</p>
                      <h3 className="mt-3 text-3xl lg:text-4xl">{c.title}</h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {c.summary}
                      </p>
                      <Link
                        to="/collections/$slug"
                        params={{ slug: c.slug }}
                        className="btn-base btn-brass mt-7"
                      >
                        Explore {c.title} <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="scroll-mt-20 border-t py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-8">
                <div className="max-w-xl">
                  <p className="eyebrow">Selected Work</p>
                  <h2 className="mt-5 text-4xl leading-tight lg:text-5xl">
                    Spaces we've composed.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`border px-5 py-2 text-xs tracking-[0.18em] uppercase transition-colors ${
                        filter === f
                          ? "border-brass text-brass"
                          : "border-border text-muted-foreground hover:text-cream"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 0.08}>
                  <button
                    type="button"
                    onClick={() => setActive(p)}
                    className="card-lux group relative block w-full overflow-hidden text-left"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.alt}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="h-full w-full object-cover opacity-75 transition-all duration-[1.2s] group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="veil absolute inset-0" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[10px] tracking-[0.28em] text-brass uppercase">
                        {p.category} · {p.location}
                      </p>
                      <h3 className="mt-2 text-2xl">{p.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground">{p.scope}</p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="border-t bg-card py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="max-w-xl">
                <p className="eyebrow">The Process</p>
                <h2 className="mt-5 text-4xl leading-tight lg:text-5xl">
                  Considered from first visit to final leaf.
                </h2>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.08}>
                  <div className="border-t pt-6">
                    <p className="font-display text-5xl text-brass/70">{s.step}</p>
                    <h3 className="mt-4 text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ASSURANCES */}
        <section className="border-t py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="max-w-xl">
                <p className="eyebrow">Our Assurance</p>
                <h2 className="mt-5 text-4xl leading-tight lg:text-5xl">What we guarantee.</h2>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {assurances.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.06}>
                  <div className="card-lux h-full p-7">
                    <h3 className="text-xl">{a.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS — sample placeholder content, see src/data/site.ts */}
        <section className="border-t bg-card py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">In Their Words</p>
                  <h2 className="mt-5 text-4xl leading-tight lg:text-5xl">Client notes.</h2>
                </div>
                <p className="max-w-sm text-xs tracking-[0.14em] text-brass uppercase">
                  Sample placeholder quotes — to be replaced with real, attributed client
                  testimonials
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.role} delay={i * 0.08}>
                  <figure className="card-lux flex h-full flex-col p-8">
                    <span className="font-display text-5xl leading-none text-brass/60">&ldquo;</span>
                    <blockquote className="mt-3 flex-1 font-display text-xl leading-relaxed italic">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                      {t.name} — {t.role}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />

      {active && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card-lux max-h-[90vh] w-full max-w-3xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={active.image}
                alt={active.alt}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-72 w-full object-cover"
              />
              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 border border-border bg-background/70 p-2 text-cream"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-8">
              <p className="eyebrow">
                {active.category} · {active.location}
              </p>
              <h3 className="mt-3 text-3xl">{active.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.detail}</p>
              <p className="mt-6 text-xs tracking-[0.18em] text-brass uppercase">{active.scope}</p>
              <Link to="/contact" className="btn-base btn-brass mt-8">
                Discuss a similar project
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
