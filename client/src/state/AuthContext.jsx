import { createContext, useContext, useMemo, useState } from 'react';

const KEY = 'leaf-fairy-account-v1';
const AuthContext = createContext(null);

function readAccount() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(readAccount);
  const persist = (next) => { setAccount(next); if (next) localStorage.setItem(KEY, JSON.stringify(next)); else localStorage.removeItem(KEY); };
  const value = useMemo(() => ({ account, login: ({ email }) => persist({ email, name: email.split('@')[0] }), register: ({ name, email }) => persist({ name, email }), logout: () => persist(null) }), [account]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
