import { useEffect, useMemo, useState } from 'react';
import { ArrowDownUp, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import { api } from '../api/client.js';
import {
  catalogCollectionLinks,
  getCollectionPresentation,
  sortCatalogProducts,
} from '../data/catalogContent.js';

function CollectionState({ eyebrow, title, body, action }) {
  return (
    <section className="catalog-state" aria-live="polite">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {body && <p>{body}</p>}
      {action}
    </section>
  );
}

export default function CollectionPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadCollection() {
      setLoading(true);
      setError('');
      setData(null);

      try {
        const collection = await api.get(`/collections/${slug}`);
        if (active) setData(collection);
      } catch (requestError) {
        if (active) setError(requestError.message || 'Request failed');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCollection();
    return () => { active = false; };
  }, [slug, retryKey]);

  const presentation = getCollectionPresentation(data?.slug || slug, data?.title);
  const products = useMemo(
    () => sortCatalogProducts(data?.products || [], sortBy),
    [data?.products, sortBy],
  );
  const productCountLabel = `${products.length} ${products.length === 1 ? 'piece' : 'pieces'}`;
  const description = data?.heroLine || data?.summary;
  const notFound = error === 'Collection not found';

  return (
    <div className="catalog-page">
      <SiteHeader />
      <main>
        {loading ? (
          <CollectionState
            eyebrow="Leaf Fairy Atelier"
            title="Preparing the edit."
            body="A considered collection is on its way."
            action={<span className="catalog-loader" aria-label="Loading" />}
          />
        ) : error || !data ? (
          <CollectionState
            eyebrow={notFound ? 'Collection not found' : 'Collection unavailable'}
            title={notFound ? 'This collection is not available.' : 'We couldn’t load this collection.'}
            body={notFound ? 'Explore the other Leaf Fairy collections.' : 'Please try again in a moment.'}
            action={notFound ? (
              <Link to="/shop" className="catalog-action">Browse all pieces</Link>
            ) : (
              <button type="button" className="catalog-action" onClick={() => setRetryKey((value) => value + 1)}><RotateCcw size={14} /> Try again</button>
            )}
          />
        ) : (
          <>
            <section className={`catalog-collection-hero ${presentation.image ? 'has-media' : 'is-plain'}`} aria-labelledby="collection-title">
              <div className="catalog-collection-copy">
                <p className="eyebrow">{data.kicker || 'The Edit'}</p>
                <h1 id="collection-title">{presentation.title}</h1>
                {description && <p>{description}</p>}
              </div>
              {presentation.image && (
                <div className="catalog-collection-media">
                  <img src={presentation.image} alt={data.alt || presentation.title} loading="eager" />
                </div>
              )}
            </section>

            <section className="catalog-content" aria-labelledby="collection-title">
              <div className="catalog-toolbar">
                <nav className="catalog-filter-group" aria-label="Browse collections">
                  <span className="catalog-filter-label"><SlidersHorizontal size={14} /> Browse</span>
                  <div className="catalog-filter-options">
                    {catalogCollectionLinks.map((collection) => (
                      <Link
                        key={collection.slug}
                        className={collection.slug === data.slug ? 'is-active' : ''}
                        to={`/collections/${collection.slug}`}
                      >
                        {collection.title}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="catalog-order-group">
                  <p className="catalog-count">{productCountLabel}</p>
                  <label className="catalog-sort">
                    <ArrowDownUp size={14} aria-hidden="true" />
                    <span>Sort</span>
                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort collection products">
                      <option value="newest">Newest</option>
                      <option value="name">Name A–Z</option>
                    </select>
                  </label>
                </div>
              </div>

              {products.length ? (
                <div className="catalog-grid">
                  {products.map((product) => (
                    <ProductCard key={product._id || product.name} product={product} collectionLabel={presentation.title} />
                  ))}
                </div>
              ) : (
                <CollectionState
                  eyebrow="No pieces listed"
                  title="This edit is being composed."
                  body="Please explore another collection in the meantime."
                  action={<Link to="/shop" className="catalog-action">Browse all pieces</Link>}
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
