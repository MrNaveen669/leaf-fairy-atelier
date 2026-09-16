import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'leaf-fairy-commerce-v1';
const CommerceContext = createContext(null);

function readState() {
  if (typeof window === 'undefined') return { wishlist: [], cart: [] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return {
      wishlist: Array.isArray(parsed?.wishlist) ? parsed.wishlist.filter(Boolean) : [],
      cart: Array.isArray(parsed?.cart) ? parsed.cart.filter((line) => line?.productId && line.quantity > 0) : [],
    };
  } catch {
    return { wishlist: [], cart: [] };
  }
}

export function CommerceProvider({ children }) {
  const [state, setState] = useState(readState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, ...state }));
  }, [state]);

  const value = useMemo(() => ({
    wishlist: state.wishlist,
    cart: state.cart,
    wishlistCount: state.wishlist.length,
    cartCount: state.cart.reduce((sum, line) => sum + line.quantity, 0),
    isWishlisted: (productId) => state.wishlist.includes(productId),
    toggleWishlist: (productId) => setState((current) => ({
      ...current,
      wishlist: current.wishlist.includes(productId)
        ? current.wishlist.filter((id) => id !== productId)
        : [...current.wishlist, productId],
    })),
    addToCart: (productId, quantity = 1, options = {}) => setState((current) => {
      const optionKey = JSON.stringify(options);
      const existing = current.cart.find((line) => line.productId === productId && JSON.stringify(line.options || {}) === optionKey);
      return {
        ...current,
        cart: existing
          ? current.cart.map((line) => line === existing ? { ...line, quantity: line.quantity + quantity } : line)
          : [...current.cart, { productId, quantity, options }],
      };
    }),
    setCartQuantity: (productId, quantity) => setState((current) => ({
      ...current,
      cart: quantity <= 0
        ? current.cart.filter((line) => line.productId !== productId)
        : current.cart.map((line) => line.productId === productId ? { ...line, quantity } : line),
    })),
    removeFromCart: (productId) => setState((current) => ({ ...current, cart: current.cart.filter((line) => line.productId !== productId) })),
    clearCart: () => setState((current) => ({ ...current, cart: [] })),
  }), [state]);

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const value = useContext(CommerceContext);
  if (!value) throw new Error('useCommerce must be used inside CommerceProvider');
  return value;
}
