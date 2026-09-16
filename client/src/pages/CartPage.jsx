import { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import SiteFooter from '../components/SiteFooter.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import { getCatalogProductFallback } from '../data/catalogContent.js';
import { whatsappLink } from '../lib/contact.js';
import { useCommerce } from '../state/CommerceContext.jsx';

export default function CartPage() {
  const { cart, setCartQuantity, removeFromCart, clearCart } = useCommerce();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then((items) => setProducts(Array.isArray(items) ? items : [])).catch(() => setProducts([])).finally(() => setLoading(false));
  }, []);

  const lines = cart.map((line) => ({ ...line, product: products.find((product) => product._id === line.productId) })).filter((line) => line.product);
  const enquiry = lines.length ? `Hello Leaf Fairy, I would like to enquire about my bag:\n${lines.map((line) => `• ${line.product.name} × ${line.quantity}`).join('\n')}` : '';

  return <div className="commerce-page"><SiteHeader /><main className="commerce-shell">
    <div className="commerce-heading"><p className="eyebrow">Leaf Fairy Atelier</p><h1>Your Bag</h1><p>A considered edit of pieces for your interior.</p></div>
    {loading ? <p className="commerce-status">Preparing your bag…</p> : !lines.length ? <div className="commerce-empty"><ShoppingBag size={28} /><h2>Your bag is empty.</h2><p>Discover sculptural botanicals and save the pieces that suit your space.</p><Link to="/shop" className="commerce-primary">Shop the collection</Link></div> : <div className="cart-layout"><section className="cart-lines">{lines.map(({ product, quantity }) => <article className="cart-line" key={product._id}><Link to={`/products/${product._id}`} className="cart-line-image"><img src={product.image || getCatalogProductFallback(product)} alt={product.alt || product.name} /></Link><div className="cart-line-copy"><Link to={`/products/${product._id}`}><h2>{product.name}</h2></Link>{product.priceRange && <p>{product.priceRange}</p>}<div className="cart-quantity"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => setCartQuantity(product._id, quantity - 1)}><Minus size={13} /></button><span>{quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => setCartQuantity(product._id, quantity + 1)}><Plus size={13} /></button></div></div><button className="cart-remove" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product._id)}><Trash2 size={16} /></button></article>)}</section><aside className="cart-summary"><p className="eyebrow">Enquiry summary</p><h2>Complete your selection with the atelier.</h2><p>Current catalogue pricing is display-only, so no transactional subtotal or checkout total is shown.</p><a className="commerce-primary" href={whatsappLink(enquiry)} target="_blank" rel="noreferrer">Enquire about this bag</a><button className="commerce-text-button" onClick={clearCart}>Clear bag</button></aside></div>}
  </main><SiteFooter /></div>;
}
