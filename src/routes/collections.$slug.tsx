import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { collections, type Product } from "@/data/site";
import { whatsappLink } from "@/config/contact";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = collections.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection unavailable — Leaf Fairy" }, { name: "robots", content: "noindex" }],
      };
    }
    const { title, summary } = loaderData.collection;
    const pageTitle = `${title} — Leaf Fairy`;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: summary.slice(0, 158) },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: summary.slice(0, 158) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionPage,
  notFoundComponent: CollectionNotFound,
});

function CollectionNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl">Collection not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That collection doesn't exist. Browse the four Leaf Fairy collections instead.
      </p>
      <Link to="/" className="btn-base btn-brass mt-8">
        Back to home
      </Link>
    </div>
  );
}

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const others = collections.filter((c) => c.slug !== collection.slug);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[72vh] items-end overflow-hidden">
          <img
            src={collection.image}
            alt={collection.alt}
            width={1024}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="veil absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-16 lg:px-10 lg:pb-24">
            <Link
              to="/"
              className="link-underline inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase hover:text-cream"
            >
              <ArrowLeft size={14} /> All collections
            </Link>
            <p className="eyebrow mt-8">{collection.kicker}</p>
            <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] lg:text-7xl">
              {collection.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {collection.heroLine}
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b pb-8">
                <div>
                  <p className="eyebrow">The Range</p>
                  <h2 className="mt-3 text-3xl lg:text-4xl">Selected pieces</h2>
                </div>
                <p className="max-w-md text-sm text-muted-foreground">
                  Prices are indicative bands in INR and vary with height, vessel and finish. Every
                  piece can be made to your specification.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collection.products.map((p: Product, i: number) => (
                <Reveal key={p.name} delay={(i % 3) * 0.08}>
                  <article className="card-lux group flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-4/5 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.alt}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-2xl">{p.name}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>
                      <p className="mt-5 text-xs tracking-[0.18em] text-brass uppercase">
                        {p.priceRange}
                      </p>
                      <a
                        href={whatsappLink(
                          `Hello Leaf Fairy — I'd like to enquire about "${p.name}" from the ${collection.title} collection.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-base btn-ghost-cream mt-6 w-full"
                      >
                        <MessageCircle size={15} /> Enquire about this piece
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="eyebrow">Continue</p>
            <h2 className="mt-3 text-3xl lg:text-4xl">Other collections</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="card-lux group relative block overflow-hidden"
                >
                  <img
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-64 w-full object-cover opacity-70 transition-all duration-[1.2s] group-hover:scale-105 group-hover:opacity-95"
                  />
                  <div className="veil absolute inset-0" />
                  <div className="absolute bottom-0 p-6">
                    <p className="eyebrow">{c.kicker}</p>
                    <h3 className="mt-2 text-2xl">{c.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactSection
          prefill={`Hello Leaf Fairy — I'm interested in the ${collection.title} collection.`}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
