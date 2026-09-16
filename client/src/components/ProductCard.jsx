import { useEffect, useState } from 'react';
import { ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCatalogProductFallback } from '../data/catalogContent.js';
import { whatsappLink } from '../lib/contact.js';
import { useCommerce } from '../state/CommerceContext.jsx';

function hasPrice(product) { return typeof product.priceRange === 'string' && product.priceRange.trim().length > 0; }

export default function ProductCard({ product, collectionLabel }) {
  const fallbackImage = getCatalogProductFallback(product);
  const productPath = product._id ? `/products/${product._id}` : null;
  const [imageSource, setImageSource] = useState(product.image || fallbackImage);
  const { isWishlisted, toggleWishlist } = useCommerce();
  const saved = product._id ? isWishlisted(product._id) : false;

  useEffect(() => { setImageSource(product.image || fallbackImage); }, [product.image, fallbackImage]);

  return <article className="catalog-product-card">
    <div className="catalog-product-media">
      {product._id && <button type="button" className={`catalog-wishlist${saved ? ' is-saved' : ''}`} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={saved} onClick={() => toggleWishlist(product._id)}><Heart size={16} fill={saved ? 'currentColor' : 'none'} /></button>}
      {productPath ? <Link className="catalog-product-media-link" to={productPath} aria-label={`View ${product.name}`}><img src={imageSource} alt={product.alt || product.name} loading="lazy" onError={() => { if (imageSource !== fallbackImage) setImageSource(fallbackImage); }} /></Link> : <img src={imageSource} alt={product.alt || product.name} loading="lazy" onError={() => { if (imageSource !== fallbackImage) setImageSource(fallbackImage); }} />}
    </div>
    <div className="catalog-product-copy">{collectionLabel && <p className="catalog-product-kicker">{collectionLabel}</p>}<h3>{productPath ? <Link to={productPath}>{product.name}</Link> : product.name}</h3>{hasPrice(product) && <p className="catalog-product-price">{product.priceRange}</p>}<a className="catalog-enquiry-link" href={whatsappLink(`Hello Leaf Fairy, I would like to enquire about ${product.name}.`)} target="_blank" rel="noreferrer"><MessageCircle size={14} aria-hidden="true" />Enquire<ArrowUpRight size={14} aria-hidden="true" /></a></div>
  </article>;
}
