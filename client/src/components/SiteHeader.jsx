import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { api } from '../api/client.js';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    api.get('/collections').then(setCollections).catch(() => {});
  }, []);

  const links = [
    { label: 'Shop', to: '/#collections' },
    ...collections.slice(0, 4).map((c) => ({ label: c.title, to: `/collections/${c.slug}` })),
    { label: 'By Space', to: '/#spaces' },
    { label: 'Bespoke', to: '/contact' },
  ];

  return (
    <header className="store-header">
      <div className="announcement-bar">
        <span>Evergreen beauty. A brighter tomorrow.</span>
        <span className="hidden sm:inline">Mumbai &nbsp; | &nbsp; Pan India Delivery &nbsp; | &nbsp; Trade Enquiries</span>
      </div>

      <div className="store-nav">
        <Link to="/" className="brand-lockup" aria-label="Leaf Fairy home">
          <span className="brand-mark">♧</span>
          <span><strong>Leaf Fairy</strong><small>ATELIER</small></span>
        </Link>

        <nav className="desktop-nav">
          {links.map((link) => (
            <NavLink key={`${link.label}-${link.to}`} to={link.to}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <label className="nav-search hidden xl:flex">
            <Search size={15} />
            <input aria-label="Search" placeholder="Search trees, plants, planters..." />
          </label>
          <button aria-label="Account" className="hidden sm:grid"><UserRound size={18} /></button>
          <button aria-label="Wishlist" className="hidden sm:grid"><Heart size={18} /></button>
          <button aria-label="Bag" className="hidden sm:grid"><ShoppingBag size={18} /></button>
          <button className="menu-toggle lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav">
          {links.map((link) => (
            <NavLink onClick={() => setOpen(false)} key={`${link.label}-${link.to}`} to={link.to}>{link.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
