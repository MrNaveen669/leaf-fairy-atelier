import { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { getCatalogProductFallback } from '../data/catalogContent.js';
import { whatsappLink } from '../lib/contact.js';

function hasPrice(product) {
  return typeof product.priceRange === 'string' && product.priceRange.trim().length > 0;
}

export default function ProductCard({ product, collectionLabel }) {
  const fallbackImage = getCatalogProductFallback(product);
  const [imageSource, setImageSource] = useState(product.image || fallbackImage);

  useEffect(() => {
    setImageSource(product.image || fallbackImage);
  }, [product.image, fallbackImage]);

  return (
    <article className="catalog-product-card">
      <div className="catalog-product-media">
        <img
          src={imageSource}
          alt={product.alt || product.name}
          loading="lazy"
          onError={() => {
            if (imageSource !== fallbackImage) setImageSource(fallbackImage);
          }}
        />
      </div>
      <div className="catalog-product-copy">
        {collectionLabel && <p className="catalog-product-kicker">{collectionLabel}</p>}
        <h3>{product.name}</h3>
        {hasPrice(product) && <p className="catalog-product-price">{product.priceRange}</p>}
        <a
          className="catalog-enquiry-link"
          href={whatsappLink(`Hello Leaf Fairy, I would like to enquire about ${product.name}.`)}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={14} aria-hidden="true" />
          Enquire
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
