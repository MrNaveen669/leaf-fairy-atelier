import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, Mail, MapPin, Check } from "lucide-react";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";
import {
  PLACEHOLDER_ADDRESS,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PHONE,
  STUDIO_HOURS,
  whatsappLink,
} from "@/config/contact";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .refine((v) => v === "" || /^[\d+\s()-]{7,20}$/.test(v), "Please enter a valid phone number"),
  space: z.string().trim().max(60).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about the space")
    .max(1000, "Please keep it under 1000 characters"),
});

type Errors = Partial<Record<keyof z.infer<typeof enquirySchema>, string>>;

export function ContactSection({ prefill }: { prefill?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const result = enquirySchema.safeParse(data);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    form.reset();
  }

  const field =
    "w-full border-b border-border bg-transparent py-3 text-sm text-cream placeholder:text-muted-foreground/70 focus:border-brass focus:outline-none transition-colors";

  return (
    <section id="enquire" className="scroll-mt-24 border-t py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <Reveal>
          <p className="eyebrow">Enquiries</p>
          <h2 className="mt-5 text-4xl leading-tight lg:text-5xl">
            Tell us about
            <br />
            <span className="text-brass-gradient">your space.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Share a few details and our styling team will respond within one working day with an
            approach, indicative scale and a price band.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <p className="flex items-start gap-3 text-muted-foreground">
              <Phone size={16} className="mt-0.5 text-brass" />
              <span>
                <span className="text-cream">{PLACEHOLDER_PHONE}</span>
                <br />
                <span className="text-xs tracking-widest text-brass uppercase">
                  [phone placeholder — replace in src/config/contact.ts]
                </span>
              </span>
            </p>
            <p className="flex items-start gap-3 text-muted-foreground">
              <Mail size={16} className="mt-0.5 text-brass" />
              {PLACEHOLDER_EMAIL}
            </p>
            <p className="flex items-start gap-3 text-muted-foreground">
              <MapPin size={16} className="mt-0.5 text-brass" />
              <span>
                {PLACEHOLDER_ADDRESS}
                <br />
                {STUDIO_HOURS}
              </span>
            </p>
          </div>

          <a
            href={whatsappLink(
              prefill ?? "Hello Leaf Fairy — I'd like to discuss styling for my space.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-ghost-cream mt-10"
          >
            <MessageCircle size={16} /> Message on WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-lux p-8 lg:p-10">
            {sent ? (
              <div className="flex min-h-80 flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brass text-brass">
                  <Check size={24} />
                </span>
                <h3 className="mt-6 text-2xl">Thank you — your enquiry is noted.</h3>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  A member of the styling team will be in touch within one working day. For anything
                  urgent, WhatsApp is the fastest route to us.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="btn-base btn-ghost-cream mt-8"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-7">
                <div>
                  <label htmlFor="name" className="eyebrow">
                    Name
                  </label>
                  <input id="name" name="name" className={field} placeholder="Your full name" />
                  {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="eyebrow">
                      Email
                    </label>
                    <input id="email" name="email" className={field} placeholder="you@email.com" />
                    {errors.email && (
                      <p className="mt-2 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="eyebrow">
                      Phone (optional)
                    </label>
                    <input id="phone" name="phone" className={field} placeholder="+91" />
                    {errors.phone && (
                      <p className="mt-2 text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="space" className="eyebrow">
                    Type of space
                  </label>
                  <select id="space" name="space" className={field} defaultValue="Residence">
                    {["Residence", "Hotel / Hospitality", "Office / Commercial", "Retail", "Other"].map(
                      (o) => (
                        <option key={o} value={o} className="bg-card">
                          {o}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow">
                    Your brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={prefill ?? ""}
                    className={`${field} resize-none`}
                    placeholder="Room, ceiling height, palette, timeline…"
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>
                <button type="submit" className="btn-base btn-brass w-full">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
