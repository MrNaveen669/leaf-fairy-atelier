import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { api } from '../api/client.js';
import {
  heroImg,
  homepageCategories,
  homepageProducts,
  homepageSpaces,
  imageLibrary,
} from '../data/siteContent.js';

const perks = [
  [Leaf, 'Lifelike & Hand-finished'],
  [ShieldCheck, '3 Year Colour Assurance'],
  [PackageCheck, 'Pan India Delivery'],
  [Sparkles, 'White Glove Installation'],
];

function validPrice(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export default function Home() {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadHomepageData() {
      const [collectionsResult, productsResult] = await Promise.allSettled([
        api.get('/collections'),
        api.get('/products'),
      ]);

      if (!active) return;

      if (collectionsResult.status === 'fulfilled' && Array.isArray(collectionsResult.value)) {
        setCollections(collectionsResult.value);
      }

      if (productsResult.status === 'fulfilled' && Array.isArray(productsResult.value)) {
        setProducts(productsResult.value);
      }
    }

    loadHomepageData();
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => {
    const summariesBySlug = new Map(collections.map(({ slug, summary }) => [slug, summary]));

    return homepageCategories.map((category) => ({
      ...category,
      summary: summariesBySlug.get(category.slug) || category.summary,
    }));
  }, [collections]);

  const bestSellers = useMemo(() => {
    const productsByName = new Map(products.map((product) => [product.name, product]));

    return homepageProducts.map((fallback) => {
      const liveProduct = productsByName.get(fallback.name);

      return {
        ...fallback,
        collectionSlug: liveProduct?.collectionSlug || fallback.collectionSlug,
        name: liveProduct?.name || fallback.name,
        priceRange: validPrice(liveProduct?.priceRange) ? liveProduct.priceRange : fallback.priceRange,
      };
    });
  }, [products]);

  return (
    <div className="lux-page">
      <SiteHeader />
      <main>
        <section className="editorial-hero" aria-labelledby="hero-title">
          <img src={heroImg} alt="Luxury interior with a sculptural artificial tree" className="hero-photo" loading="eager" fetchPriority="high" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-copy">
            <p className="micro-label">Artificial botanicals<br />for extraordinary spaces</p>
            <h1 id="hero-title">Nature,<br /><em>reimagined</em><br />for modern living.</h1>
            <p className="hero-intro">Premium artificial trees, plants and floral compositions designed to bring timeless beauty to your home, hotel or workspace.</p>
            <div className="hero-actions">
              <a href="#collections" className="lux-btn lux-btn-gold">Shop the collection <ArrowRight size={14} /></a>
              <Link to="/contact" className="lux-btn lux-btn-outline">Explore bespoke</Link>
            </div>
          </div>
          <div className="hero-sideword">Spaces<br />that<br />feel<br />more<br />alive</div>
          <div className="hero-perks" aria-label="Leaf Fairy service assurances">
            {perks.map(([Icon, text]) => <div key={text}><Icon size={21} /><span>{text}</span></div>)}
          </div>
        </section>

        <section id="collections" className="light-section category-section" aria-labelledby="categories-title">
          <div className="section-heading-row">
            <div><h2 id="categories-title">Shop by Category</h2><span className="heading-rule" /></div>
            <a href="#collections" className="section-link">Discover our collections <ArrowRight size={13} /></a>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link key={category.slug} to={`/collections/${category.slug}`} className="arch-card">
                <img src={category.image} alt={category.alt} loading="lazy" style={{ objectPosition: category.position }} />
                <div className="arch-overlay" aria-hidden="true" />
                <div className="arch-copy"><h3>{category.title}</h3><p>{category.summary}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="light-section products-section" aria-labelledby="best-sellers-title">
          <div className="section-heading-row compact">
            <div><h2 id="best-sellers-title">Best Sellers</h2><span className="heading-rule" /></div>
            <p className="subtle-label">Atelier favourites, selected for every kind of space.</p>
          </div>
          <div className="best-grid">
            {bestSellers.map((product) => (
              <article className="best-card" key={product._id || product.name}>
                <div className="best-image-wrap"><img src={product.image} alt={product.alt} loading="lazy" style={{ objectPosition: product.position }} /></div>
                <div className="best-copy">
                  <h3>{product.name}</h3>
                  <p className="price-range">{product.priceRange}</p>
                  <Link className="soft-cta" to={`/collections/${product.collectionSlug}`}>View piece <ArrowRight size={13} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="statement-edit" aria-labelledby="statement-olive-title">
          <div className="statement-copy">
            <p className="micro-label gold">Featured edit</p>
            <h2 id="statement-olive-title">The Statement<br /><em>Olive</em></h2>
            <p>Hand-finished. Architectural in scale. Designed to look remarkable from every angle.</p>
            <Link to="/collections/statement-trees" className="lux-btn lux-btn-gold">Shop the edit <ArrowRight size={14} /></Link>
          </div>
          <div className="statement-image"><img src={imageLibrary.statementOlive} alt="Statement artificial olive tree in a luxury interior" loading="lazy" /></div>
          <div className="statement-quote"><p>“More than<br />a plant.<br />A presence.”</p><span>01 &nbsp;&nbsp; 02 &nbsp;&nbsp; 03</span></div>
        </section>

        <section id="spaces" className="light-section spaces-section" aria-labelledby="spaces-title">
          <div className="section-heading-row compact">
            <div><h2 id="spaces-title">Shop by Space</h2><span className="heading-rule" /></div>
            <p className="subtle-label">Beautiful solutions for every corner.</p>
          </div>
          <div className="space-grid">
            {homepageSpaces.map((space) => (
              <Link to="/contact" key={space.title} className="space-card">
                <img src={space.image} alt={space.alt} loading="lazy" style={{ objectPosition: space.position }} />
                <div className="space-fade" aria-hidden="true" />
                <h3>{space.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="bespoke-band" aria-labelledby="bespoke-title">
          <div className="bespoke-copy">
            <h2 id="bespoke-title">Bespoke by Leaf Fairy</h2>
            <h3>Can’t find the right scale?</h3>
            <p>Our atelier creates bespoke botanical compositions for residences, hospitality and commercial interiors.</p>
            <Link to="/contact" className="lux-btn lux-btn-gold">Book a consultation <ArrowRight size={14} /></Link>
          </div>
          <div className="bespoke-image"><img src={imageLibrary.artificialPlants} alt="Layered artificial foliage and sculptural planters" loading="lazy" /></div>
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
