import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";
import { Reveal } from "@/components/Reveal";
import { assurances } from "@/data/site";

const title = "Contact & Styling Consultations — Leaf Fairy";
const description =
  "Book a styling consultation with Leaf Fairy, Mumbai. Premium artificial trees, botanicals and florals for homes, hotels and flagship interiors.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="px-6 pt-40 pb-8 lg:px-10 lg:pt-48">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] lg:text-7xl">
              Book a styling consultation.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              We work with homeowners, hoteliers and design practices across India. Consultations
              are complimentary for projects in Mumbai.
            </p>
          </div>
        </section>

        <section className="px-6 pb-4 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <div className="card-lux h-full p-6">
                  <h2 className="text-xl">{a.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
