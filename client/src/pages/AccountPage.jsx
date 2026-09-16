import { Navigate, Link } from 'react-router-dom';
import { Heart, MapPin, Package, LogOut } from 'lucide-react';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { useAuth } from '../state/AuthContext.jsx';
import { useCommerce } from '../state/CommerceContext.jsx';

export default function AccountPage() {
  const { account, logout } = useAuth(); const { wishlistCount } = useCommerce();
  if (!account) return <Navigate to="/login" replace />;
  return <div className="account-page"><SiteHeader /><main className="account-shell"><div className="account-heading"><p className="eyebrow">Private client area</p><h1>Welcome, {account.name || 'Client'}.</h1><p>{account.email}</p></div><div className="account-grid"><Link to="/wishlist" className="account-tile"><Heart /><span>Wishlist</span><strong>{wishlistCount} saved pieces</strong></Link><div className="account-tile is-muted"><Package /><span>Orders</span><strong>Order history will appear after secure checkout is enabled.</strong></div><div className="account-tile is-muted"><MapPin /><span>Addresses</span><strong>Secure address management is prepared for the backend account phase.</strong></div></div><button type="button" className="account-logout" onClick={logout}><LogOut size={15} /> Sign out</button></main><SiteFooter /></div>;
}
