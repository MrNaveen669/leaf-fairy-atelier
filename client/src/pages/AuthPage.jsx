import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { useAuth } from '../state/AuthContext.jsx';

export default function AuthPage({ mode = 'login' }) {
  const { account, login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  if (account) return <Navigate to="/account" replace />;
  const isRegister = mode === 'register';
  const submit = (event) => { event.preventDefault(); if (isRegister) register(form); else login(form); navigate('/account'); };
  return <div className="account-page"><SiteHeader /><main className="auth-shell"><section className="auth-story"><p className="eyebrow">Leaf Fairy Atelier</p><h1>{isRegister ? 'Create your atelier account.' : 'Welcome back.'}</h1><p>Keep your wishlist, addresses and future orders together in one considered place.</p></section><form className="auth-card" onSubmit={submit}><p className="eyebrow">{isRegister ? 'New account' : 'Customer account'}</p><h2>{isRegister ? 'Register' : 'Sign in'}</h2>{isRegister && <label>Full name<input required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>}<label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required minLength="6" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label><button className="account-primary" type="submit">{isRegister ? 'Create account' : 'Sign in'}</button><p className="auth-switch">{isRegister ? 'Already have an account?' : 'New to Leaf Fairy?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create one'}</Link></p><p className="auth-disclaimer">Account access is currently a storefront foundation; secure server authentication will replace this local session before production commerce.</p></form></main><SiteFooter /></div>;
}
