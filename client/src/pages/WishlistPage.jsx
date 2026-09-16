import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import { useCommerce } from '../state/CommerceContext.jsx';

export default function WishlistPage() {
  const { wishlist } = useCommerce();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then((items) => setProducts(Array.isArray(items) ? items : [])).catch(() => setProducts([])).finally(() => setLoading(false));
  }, []);

  const saved = products.filter((product) => wishlist.includes(product._id));

  return <div className="commerce-page"><SiteHeader /><main className="commerce-shell">
    <div className="commerce-heading"><p className="eyebrow">Your collection</p><h1>Wishlist</h1><p>Keep considered pieces close while you shape your space.</p></div>
    {loading ? <p className="commerce-status">Preparing your saved pieces…</p> : saved.length ? <div className="catalog-grid">{saved.map((product) => <ProductCard key={product._id} product={product} />)}</div> : <div className="commerce-empty"><Heart size={28} /><h2>Your wishlist is quiet.</h2><p>Save pieces from the catalogue and return to them here.</p><Link to="/shop" className="commerce-primary">Explore the collection</Link></div>}
  </main><SiteFooter /></div>;
}
