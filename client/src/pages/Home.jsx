import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Leaf, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { api } from '../api/client.js';
import { heroImg } from '../data/siteContent.js';

const fallbackSpaceImages = [
  'https://raw.githubusercontent.com/MrNaveen669/leaf-fairy-atelier/main/src/assets/hero.jpg',
  'https://raw.githubusercontent.com/MrNaveen669/leaf-fairy-atelier/main/src/assets/col-trees.jpg',
  'https://raw.githubusercontent.com/MrNaveen669/leaf-fairy-atelier/main/src/assets/col-botanical.jpg',
  'https://raw.githubusercontent.com/MrNaveen669/leaf-fairy-atelier/main/src/assets/col-florals.jpg',
  'https://raw.githubusercontent.com/MrNaveen669/leaf-fairy-atelier/main/src/assets/col-decor.jpg',
];

const perks = [
  [Leaf, 'Lifelike & Hand-finished'],
  [ShieldCheck, '3 Year Colour Assurance'],
  [PackageCheck, 'Pan India Delivery'],
  [Sparkles, 'White Glove Installation'],
];

export default function Home() {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/collections'),
      api.get('/products'),
      api.get('/projects'),
    ]).then(([c, p, pr]) => {
      setCollections(c);
      setProducts(p);
      setProjects(pr);
    }).catch(console.error);
  }, []);

  const bestSellers = useMemo(() => products.slice(0, 5), [products]);
  const spaceCards = [
    ['Living Room', projects[0]?.image || fallbackSpaceImages[0]],
    ['Entrance', projects[1]?.image || fallbackSpaceImages[1]],
    ['Bedroom', projects[2]?.image || fallbackSpaceImages[2]],
    ['Office', projects[3]?.image || fallbackSpaceImages[3]],
    ['Hospitality', projects[4]?.image || fallbackSpaceImages[4]],
  ];

  const statement = collections[0];

  return (
    <div className="lux-page">
      <SiteHeader />
      <main>
        <section className="editorial-hero">
          <img src={heroImg} alt="Luxury interior with a sculptural artificial tree" className="hero-photo" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="micro-label">Artificial botanicals<br />for extraordinary spaces</p>
            <h1>Nature,<br /><em>reimagined</em><br />for modern living.</h1>
            <p className="hero-intro">Premium artificial trees, plants and floral compositions designed to bring timeless beauty to your home, hotel or workspace.</p>
            <div className="hero-actions">
              <a href="#collections" className="lux-btn lux-btn-gold">Shop the collection <ArrowRight size={14} /></a>
              <Link to="/contact" className="lux-btn lux-btn-outline">Explore bespoke</Link>
            </div>
          </div>
          <div className="hero-sideword">Spaces<br />that<br />feel<br />more<br />alive</div>
          <div className="hero-perks">
            {perks.map(([Icon, text]) => <div key={text}><Icon size={21} /><span>{text}</span></div>)}
          </div>
        </section>

        <section id="collections" className="light-section category-section">
          <div className="section-heading-row">
            <div><h2>Shop by Category</h2><span className="heading-rule" /></div>
            <a href="#collections" className="section-link">Discover our collections <ArrowRight size={13} /></a>
          </div>
          <div className="category-grid">
            {collections.slice(0, 4).map((c) => (
              <Link key={c.slug} to={`/collections/${c.slug}`} className="arch-card">
                <img src={c.image} alt={c.alt} />
                <div className="arch-overlay" />
                <div className="arch-copy"><h3>{c.title}</h3><p>{c.summary}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="light-section products-section">
          <div className="section-heading-row compact">
            <div><h2>Best Sellers</h2><span className="heading-rule" /></div>
            <p className="subtle-label">Customer favourites, curated for you.</p>
          </div>
          <div className="best-grid">
            {bestSellers.map((product, index) => (
              <article className="best-card" key={product._id || product.name}>
                <div className="best-image-wrap">
                  {index === 0 && <span className="bestseller-tag">Bestseller</span>}
                  <button className="heart-btn" aria-label={`Save ${product.name}`}><Heart size={17} /></button>
                  <img src={product.image} alt={product.alt} />
                </div>
                <div className="best-copy">
                  <h3>{product.name}</h3>
                  <p className="price-range">{product.priceRange}</p>
                  <p className="stars">★★★★★ <span>({12 + index * 7})</span></p>
                  <Link className="soft-cta" to={`/collections/${product.collectionSlug}`}>View piece <ArrowRight size={13} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="statement-edit">
          <div className="statement-copy">
            <p className="micro-label gold">Featured edit</p>
            <h2>The Statement<br /><em>Olive</em></h2>
            <p>Hand-finished. Architectural in scale. Designed to look remarkable from every angle.</p>
            {statement && <Link to={`/collections/${statement.slug}`} className="lux-btn lux-btn-gold">Shop the edit <ArrowRight size={14} /></Link>}
          </div>
          <div className="statement-image"><img src={statement?.image || heroImg} alt="Statement artificial olive tree in a luxury interior" /></div>
          <div className="statement-quote"><p>“More than<br />a plant.<br />A presence.”</p><span>01 &nbsp;&nbsp; 02 &nbsp;&nbsp; 03</span></div>
        </section>

        <section id="spaces" className="light-section spaces-section">
          <div className="section-heading-row compact">
            <div><h2>Shop by Space</h2><span className="heading-rule" /></div>
            <p className="subtle-label">Beautiful solutions for every corner.</p>
          </div>
          <div className="space-grid">
            {spaceCards.map(([name, image]) => (
              <Link to="/contact" key={name} className="space-card">
                <img src={image} alt={`${name} styled with artificial botanicals`} />
                <div className="space-fade" />
                <h3>{name}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="bespoke-band">
          <div className="bespoke-copy">
            <h2>Bespoke by Leaf Fairy</h2>
            <h3>Can’t find the right scale?</h3>
            <p>Our atelier creates bespoke botanical compositions for residences, hospitality and commercial interiors.</p>
            <Link to="/contact" className="lux-btn lux-btn-gold">Book a consultation <ArrowRight size={14} /></Link>
          </div>
          <div className="bespoke-image"><img src={fallbackSpaceImages[2]} alt="Close detail of lush artificial foliage" /></div>
          <div className="bespoke-dark">
            <p>Nature in<br />every detail.</p>
            <span>From lifelike foliage to artisanal planters, every layer is considered.</span>
            <b>Leaf Fairy Atelier</b>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
