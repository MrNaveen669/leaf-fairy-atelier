import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDownUp, RotateCcw, SlidersHorizontal } from 'lucide-react';
import SiteFooter from '../components/SiteFooter.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { api } from '../api/client.js';
import {
  getCollectionPresentation,
  orderCatalogCollections,
  catalogShopImage,
  sortCatalogProducts,
} from '../data/catalogContent.js';

function CatalogState({ eyebrow, title, body, action }) {
  return (
    <section className="catalog-state" aria-live="polite">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
      {action}
    </section>
  );
}

export default function ShopPage() {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCollection, setActiveCollection] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError('');

    const [collectionsResult, productsResult] = await Promise.allSettled([
      api.get('/collections'),
      api.get('/products'),
    ]);

    if (collectionsResult.status === 'fulfilled' && Array.isArray(collectionsResult.value)) {
      setCollections(collectionsResult.value);
    } else {
      setCollections([]);
    }

    if (productsResult.status === 'fulfilled' && Array.isArray(productsResult.value)) {
      setProducts(productsResult.value);
    } else {
      setProducts([]);
      setError('We could not load the catalogue right now.');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const availableCollections = useMemo(() => {
    const source = collections.length
      ? collections
      : [...new Set(products.map((product) => product.collectionSlug))]
        .filter(Boolean)
        .map((slug) => ({ slug, title: getCollectionPresentation(slug, slug).title }));

    return orderCatalogCollections(source).map((collection) => ({
      ...collection,
      displayTitle: getCollectionPresentation(collection.slug, collection.title).title,
    }));
  }, [collections, products]);

  const visibleProducts = useMemo(() => {
    const filtered = activeCollection === 'all'
      ? products
      : products.filter((product) => product.collectionSlug === activeCollection);

    return sortCatalogProducts(filtered, sortBy);
  }, [activeCollection, products, sortBy]);

  const productCountLabel = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'piece' : 'pieces'}`;

  return (
    <div className="catalog-page">
      <SiteHeader />
      <main>
        {loading ? (
          <CatalogState
            eyebrow="Leaf Fairy Atelier"
            title="Preparing the collection."
            body="A considered selection is on its way."
            action={<span className="catalog-loader" aria-label="Loading" />}
          />
        ) : error ? (
          <CatalogState
            eyebrow="Catalogue unavailable"
            title="We couldn’t load the collection."
            body="Please try again in a moment."
            action={<button type="button" className="catalog-action" onClick={loadCatalog}><RotateCcw size={14} /> Try again</button>}
          />
        ) : (
          <>
            <section className="catalog-shop-intro" aria-labelledby="shop-title">
              <div className="catalog-shop-copy">
                <p className="eyebrow">Leaf Fairy Atelier</p>
                <h1 id="shop-title">Shop the collection.</h1>
                <p>Thoughtfully composed artificial botanicals, vessels and floral forms for considered interiors.</p>
              </div>
              <img src={catalogShopImage} alt="Olive tree in a warm luxury interior" loading="eager" />
            </section>

            <section className="catalog-content" aria-labelledby="shop-title">
              <div className="catalog-toolbar">
                <div className="catalog-filter-group" aria-label="Filter by collection">
                  <span className="catalog-filter-label"><SlidersHorizontal size={14} /> Filter</span>
                  <div className="catalog-filter-options">
                    <button type="button" className={activeCollection === 'all' ? 'is-active' : ''} aria-pressed={activeCollection === 'all'} onClick={() => setActiveCollection('all')}>All pieces</button>
                    {availableCollections.map((collection) => (
                      <button
                        type="button"
                        key={collection.slug}
                        className={activeCollection === collection.slug ? 'is-active' : ''}
                        aria-pressed={activeCollection === collection.slug}
                        onClick={() => setActiveCollection(collection.slug)}
                      >
                        {collection.displayTitle}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="catalog-order-group">
                  <p className="catalog-count">{productCountLabel}</p>
                  <label className="catalog-sort">
                    <ArrowDownUp size={14} aria-hidden="true" />
                    <span>Sort</span>
                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
                      <option value="newest">Newest</option>
                      <option value="name">Name A–Z</option>
                    </select>
                  </label>
                </div>
              </div>

              {visibleProducts.length ? (
                <div className="catalog-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.name}
                      product={product}
                      collectionLabel={getCollectionPresentation(product.collectionSlug).title}
                    />
                  ))}
                </div>
              ) : (
                <CatalogState
                  eyebrow="No pieces found"
                  title="Nothing is listed in this edit yet."
                  body="Try another collection to explore the atelier."
                  action={activeCollection !== 'all' && <button type="button" className="catalog-action" onClick={() => setActiveCollection('all')}>Show all pieces</button>}
                />
              )}
            </section>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
