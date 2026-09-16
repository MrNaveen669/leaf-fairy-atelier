import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import CartPage from './pages/CartPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

export default function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<ShopPage />} />
    <Route path="/collections/:slug" element={<CollectionPage />} />
    <Route path="/products/:id" element={<ProductPage />} />
    <Route path="/wishlist" element={<WishlistPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/register" element={<AuthPage mode="register" />} />
    <Route path="/account" element={<AccountPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<div className="min-h-screen grid place-items-center p-8"><div className="text-center"><p className="eyebrow">404</p><h1 className="mt-4 text-5xl">Page not found.</h1><a href="/" className="btn-base btn-brass mt-8">Return home</a></div></div>} />
  </Routes>;
}
