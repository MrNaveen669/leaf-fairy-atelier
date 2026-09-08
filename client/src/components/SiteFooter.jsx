import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="site-footer-premium">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand-lockup">
            <span className="brand-mark">♧</span>
            <span><strong>Leaf Fairy</strong><small>ATELIER</small></span>
          </Link>
          <p>Nature lives better indoors.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/">All Products</Link>
          <Link to="/collections/statement-trees">Statement Trees</Link>
          <Link to="/collections/botanical-studies">Plants</Link>
          <Link to="/collections/florals-orchids">Florals & Orchids</Link>
          <Link to="/collections/decor-accessories">Planters & Décor</Link>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <Link to="/contact">Shipping & Delivery</Link>
          <Link to="/contact">Returns & Refunds</Link>
          <Link to="/contact">Care Guide</Link>
          <Link to="/contact">FAQs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-col">
          <h4>Our Story</h4>
          <Link to="/contact">About Leaf Fairy</Link>
          <Link to="/contact">Our Process</Link>
          <Link to="/contact">Bespoke Services</Link>
          <Link to="/contact">Trade Program</Link>
        </div>

        <div className="newsletter">
          <h4>Join our world</h4>
          <p>Get inspiration, new arrivals and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" aria-label="Email address" placeholder="Your email address" />
            <button type="submit" aria-label="Join newsletter"><ArrowRight size={14} /></button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Leaf Fairy Atelier. All rights reserved.</span>
        <span>Plants &nbsp; | &nbsp; People &nbsp; | &nbsp; A brighter tomorrow</span>
      </div>
    </footer>
  );
}
