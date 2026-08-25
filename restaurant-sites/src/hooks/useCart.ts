import { useCallback, useEffect, useState } from 'react';
import type { CartItem } from '@/types';

const STORAGE_KEY = 'foodiehub-cart-v1';

export function useCart() {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback((name: string, price: number) => {
    setCart((prev) => ({
      ...prev,
      [name]: {
        price,
        qty: (prev[name]?.qty ?? 0) + 1,
      },
    }));
    setToast(`${name} added to order`);
  }, []);

  const decrement = useCallback((name: string) => {
    setCart((prev) => {
      const existing = prev[name];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return {
        ...prev,
        [name]: { ...existing, qty: existing.qty - 1 },
      };
    });
  }, []);

  const increment = useCallback((name: string) => {
    setCart((prev) => {
      const existing = prev[name];
      if (!existing) return prev;
      return {
        ...prev,
        [name]: { ...existing, qty: existing.qty + 1 },
      };
    });
  }, []);

  const remove = useCallback((name: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);

  const itemCount = Object.values(cart).reduce((sum, i) => sum + i.qty, 0);
  const subtotal = Object.values(cart).reduce(
    (sum, i) => sum + i.qty * i.price,
    0,
  );

  return {
    cart,
    toast,
    addToCart,
    decrement,
    increment,
    remove,
    clear,
    itemCount,
    subtotal,
  };
}
