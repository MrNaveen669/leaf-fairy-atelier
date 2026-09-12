import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Reveal from '../components/Reveal.jsx';
import { api } from '../api/client.js';
import { categories,heroImg,spaces,statementOlive,stats } from '../data/siteContent.js';

export default function Home(){
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    api.get('/products').then(setProducts).catch(()=>{});
  },[]);

  const bestSellers=products.slice(0,4);

  return (
    <div className="min-h-screen">
      <SiteHeader/>

      <main>

        {/* ── Hero ── */}
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <img src={heroImg} alt="Sculptural artificial olive tree in a matte black planter inside a dark, brass-accented luxury interior" className="absolute inset-0 h-full w-full object-cover"/>
          <div className="veil absolute inset-0"/>
          <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
            <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[.22,1,.36,1]}} className="max-w-3xl">
              <p className="eyebrow">Artificial botanicals · Mumbai atelier</p>
              <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-8xl">Evergreen luxury,<br/><span className="text-brass-gradient italic">perfectly composed.</span></h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted lg:text-lg">Premium artificial trees, botanicals, florals and decor accessories — hand-composed for homes, hotels and flagship interiors that cannot afford to look temporary.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#shop-by-category" className="btn-base btn-brass">View Collections</a>
                <Link to="/contact" className="btn-base btn-ghost-cream">Book a Styling Consult</Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 lg:grid-cols-4 lg:px-10">
            {stats.map((s,i)=><Reveal key={s.label} delay={i*.07}><p className="font-display text-4xl text-brass lg:text-5xl">{s.value}</p><p className="mt-2 text-xs uppercase tracking-[.18em] text-muted">{s.label}</p></Reveal>)}
          </div>
        </section>

        {/* ── 1. Shop by Category — Arched Cards ── */}
        <section id="shop-by-category" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <p className="eyebrow">Shop by Category</p>
              <h2 className="mt-5 text-4xl lg:text-5xl">Curated botanical disciplines.</h2>
              <div className="rule-brass mt-7"/>
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
              {categories.map((c,i)=>(
                <Reveal key={c.slug} delay={i*.08}>
                  <Link to={`/collections/${c.slug}`} className="arch-card group block">
                    <img src={c.image} alt={c.alt} loading="lazy"/>
                    <div className="arch-card__overlay">
                      <span className="arch-card__label">{c.title}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. Best Sellers ── */}
        {bestSellers.length>0&&(
          <section className="border-t border-border bg-card py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-8">
                  <div>
                    <p className="eyebrow">Best Sellers</p>
                    <h2 className="mt-5 text-4xl lg:text-5xl">Most-loved pieces.</h2>
                  </div>
                  <a href="#shop-by-category" className="text-xs uppercase tracking-[.18em] text-brass hover:text-ivory transition-colors">View all collections <ArrowUpRight size={12} className="inline ml-1"/></a>
                </div>
              </Reveal>
              <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
                {bestSellers.map((p,i)=>(
                  <Reveal key={p._id||p.name} delay={i*.07}>
                    <article className="bestseller-card group">
                      <div className="overflow-hidden">
                        <img src={p.image} alt={p.alt} loading="lazy"/>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl leading-snug">{p.name}</h3>
                        <p className="mt-2 font-display text-base text-brass">{p.priceRange}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 3. Statement Olive Editorial ── */}
        <section className="statement-olive">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="statement-olive__inner">
              <Reveal>
                <div>
                  <p className="eyebrow">Signature Piece</p>
                  <h2 className="mt-6 text-4xl leading-[1.1] lg:text-6xl">{statementOlive.title}</h2>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-muted lg:text-lg">{statementOlive.copy}</p>
                  <Link to="/collections/statement-trees" className="btn-base btn-brass mt-8">Explore Statement Trees <ArrowUpRight size={15}/></Link>
                </div>
              </Reveal>
              <Reveal delay={.15}>
                <div className="overflow-hidden">
                  <img src={statementOlive.image} alt={statementOlive.alt} className="w-full object-cover lg:h-[28rem]" loading="lazy"/>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 4. Shop by Space ── */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <p className="eyebrow">Shop by Space</p>
              <h2 className="mt-5 text-4xl lg:text-5xl">Styled for every room.</h2>
              <div className="rule-brass mt-7"/>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {spaces.map((s,i)=>(
                <Reveal key={s.label} delay={i*.06}>
                  <div className="space-card aspect-[3/4]">
                    <img src={s.image} alt={s.alt} loading="lazy"/>
                    <div className="space-card__overlay">
                      <span className="space-card__label">{s.label}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Bespoke + Nature in Every Detail ── */}
        <section className="border-t border-border bg-card py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="brand-row">
              {/* Left: Bespoke */}
              <Reveal>
                <div>
                  <p className="eyebrow">Bespoke by Leaf Fairy</p>
                  <h3 className="mt-5 text-3xl lg:text-4xl">Commissioned to your space.</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">Every vessel, stem and species is specified to your palette, scale and ceiling height. Our atelier composes from brief to installation — no catalogue compromises.</p>
                  <Link to="/contact" className="btn-base btn-brass mt-8">Book a Consultation <ArrowUpRight size={15}/></Link>
                </div>
              </Reveal>

              {/* Center: Image */}
              <Reveal delay={.1}>
                <div className="overflow-hidden">
                  <img src="https://raw.githubusercontent.com/MrNaveen669/leaf-fairy-atelier/main/src/assets/col-botanical.jpg" alt="Detail of artificial botanical arrangement in a brass vessel" className="w-full object-cover aspect-[4/5] lg:aspect-[3/4]" loading="lazy"/>
                </div>
              </Reveal>

              {/* Right: Nature in Every Detail */}
              <Reveal delay={.2}>
                <div>
                  <p className="eyebrow">Philosophy</p>
                  <h3 className="mt-5 text-3xl lg:text-4xl">Nature in every detail.</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">We study the way light falls through a real canopy, the imperfection of a hand-turned trunk, the weight of a stone planter. Every Leaf Fairy piece begins with observation and ends with a finished interior.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Contact / Enquiry ── */}
        <ContactSection/>

      </main>

      <SiteFooter/>
    </div>
  );
}
