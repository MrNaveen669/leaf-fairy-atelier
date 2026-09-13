import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { api } from '../api/client.js';
import { catalogCollectionLinks } from '../data/catalogContent.js';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get('/collections').then(setCollections).catch(() => {});
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const collectionLinks = collections.length
    ? collections.slice(0, 4).map((collection) => ({ label: collection.title, to: `/collections/${collection.slug}` }))
    : catalogCollectionLinks.map((collection) => ({ label: collection.title, to: `/collections/${collection.slug}` }));

  const links = [
    { label: 'Shop', to: '/shop' },
    ...collectionLinks,
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
            <input readOnly aria-label="Catalogue search coming soon" placeholder="Search coming soon" title="Catalogue search is coming soon" />
          </label>
          <button type="button" aria-label="Account coming soon" title="Account area coming soon" className="hidden sm:grid"><UserRound size={18} /></button>
          <button type="button" aria-label="Wishlist coming soon" title="Wishlist coming soon" className="hidden sm:grid"><Heart size={18} /></button>
          <button type="button" aria-label="Bag coming soon" title="Bag coming soon" className="hidden sm:grid"><ShoppingBag size={18} /></button>
          <button
            type="button"
            className="menu-toggle lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav">
          {links.map((link) => (
            <NavLink onClick={() => setOpen(false)} key={`${link.label}-${link.to}`} to={link.to}>{link.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
