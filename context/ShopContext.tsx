'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { useAuth } from '@clerk/nextjs';
import { Product, CartItem, UserAIPreferences, ShoppingPriority } from '../types/index';

// ─── Context Shape ────────────────────────────────────────────────────────────
export interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => Promise<void> | void;
  removeFromCart: (productId: string) => Promise<void> | void;
  updateQuantity: (productId: string, quantity: number) => Promise<void> | void;
  clearCart: () => Promise<void> | void;
  cartCount: number;
  cartTotal: number;
  isCartSyncing: boolean;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;

  // Compare (max 4 items)
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isCompared: (productId: string) => boolean;
  clearCompare: () => void;

  // AI Preferences
  aiPreferences: UserAIPreferences;
  updateAIPreferences: (prefs: Partial<UserAIPreferences>) => void;
  togglePriority: (priority: ShoppingPriority) => void;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const defaultAIPreferences: UserAIPreferences = {
  priorities: ['best-value'],
  budgetLimit: 100000,
  preferredBrands: [],
  requireEnergyStar: false,
  minimumRating: 4,
  preferredCategory: 'all',
};

// ─── Context ──────────────────────────────────────────────────────────────────
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ShopProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, userId, isLoaded: authLoaded } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [aiPreferences, setAiPreferences] = useState<UserAIPreferences>(defaultAIPreferences);
  const [isCartSyncing, setIsCartSyncing] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Track previous authentication status to detect login vs logout transitions
  const prevAuthRef = useRef<{ isLoaded: boolean; isSignedIn?: boolean; userId?: string | null }>({
    isLoaded: false,
    isSignedIn: undefined,
    userId: null,
  });

  // ── 1. Initial Local Storage Hydration for Wishlist, Compare, AI Prefs ────────
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('sw_wishlist');
      const storedCompare = localStorage.getItem('sw_compare');
      const storedPrefs = localStorage.getItem('sw_aiprefs');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      if (storedCompare) setCompareList(JSON.parse(storedCompare));
      if (storedPrefs) setAiPreferences(JSON.parse(storedPrefs));
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // ── 2. Smart Cart Sync & Auth State Management (Clerk + Postgres) ─────────────
  useEffect(() => {
    if (!authLoaded || !hydrated) return;

    const prevAuth = prevAuthRef.current;

    // Helper: read guest cart items safely from localStorage
    const getLocalGuestCart = (): CartItem[] => {
      try {
        const stored = localStorage.getItem('guest_cart') || localStorage.getItem('sw_cart');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    };

    const syncCartOnAuthChange = async () => {
      // Case A: USER LOGGED OUT (transition from signed in to signed out)
      if (prevAuth.isLoaded && prevAuth.isSignedIn && !isSignedIn) {
        console.log('[Cart Sync] User logged out -> Clearing local cart & guest_cart');
        setCart([]);
        try {
          localStorage.removeItem('guest_cart');
          localStorage.removeItem('sw_cart');
        } catch {}
        prevAuthRef.current = { isLoaded: true, isSignedIn: false, userId: null };
        return;
      }

      // Case B: USER LOGGED IN (transition to signed in or initial authenticated load)
      if (isSignedIn && userId) {
        // Prevent duplicate sync if userId and auth state didn't change
        if (prevAuth.isSignedIn && prevAuth.userId === userId) {
          return;
        }

        setIsCartSyncing(true);
        console.log(`[Cart Sync] User authenticated (${userId}) -> Running smart merge strategy`);

        try {
          const guestItems = getLocalGuestCart();

          if (guestItems.length > 0) {
            console.log(`[Cart Sync] Found ${guestItems.length} guest items to merge into DB cart`);
            // a & b. Merge guest items into PostgreSQL
            const res = await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'merge',
                items: guestItems.map((item) => ({
                  productId: item.product.id,
                  quantity: item.quantity,
                })),
              }),
            });

            const data = await res.json();
            if (data.success && Array.isArray(data.items)) {
              // c. Clear guest items from localStorage after syncing
              localStorage.removeItem('guest_cart');
              localStorage.removeItem('sw_cart');
              // d. Set active cart state directly from updated DB response
              setCart(data.items);
            }
          } else {
            // Crucial: Local guest cart is empty -> Load DB cart directly without overwriting
            console.log('[Cart Sync] Guest cart is empty -> Loading DB cart as source of truth');
            const res = await fetch('/api/cart', { method: 'GET' });
            const data = await res.json();
            if (data.success && Array.isArray(data.items)) {
              setCart(data.items);
            }
          }
        } catch (err) {
          console.error('[Cart Sync] Failed to sync cart with DB:', err);
        } finally {
          setIsCartSyncing(false);
          prevAuthRef.current = { isLoaded: true, isSignedIn: true, userId };
        }
        return;
      }

      // Case C: GUEST USER (not signed in on initial load)
      if (!isSignedIn) {
        if (!prevAuth.isLoaded) {
          const guestItems = getLocalGuestCart();
          setCart(guestItems);
        }
        prevAuthRef.current = { isLoaded: true, isSignedIn: false, userId: null };
      }
    };

    syncCartOnAuthChange();
  }, [authLoaded, isSignedIn, userId, hydrated]);

  // ── 3. Persist Guest Cart in LocalStorage (only when NOT signed in) ───────────
  useEffect(() => {
    if (!hydrated || !authLoaded) return;
    if (!isSignedIn) {
      try {
        localStorage.setItem('guest_cart', JSON.stringify(cart));
        localStorage.setItem('sw_cart', JSON.stringify(cart));
      } catch {}
    }
  }, [cart, isSignedIn, hydrated, authLoaded]);

  // Persist wishlist
  useEffect(() => {
    if (hydrated) localStorage.setItem('sw_wishlist', JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  // Persist compare
  useEffect(() => {
    if (hydrated) localStorage.setItem('sw_compare', JSON.stringify(compareList));
  }, [compareList, hydrated]);

  // Persist AI prefs
  useEffect(() => {
    if (hydrated) localStorage.setItem('sw_aiprefs', JSON.stringify(aiPreferences));
  }, [aiPreferences, hydrated]);

  // ── 4. Cart Actions with DB & LocalStorage Synchronization ────────────────────
  const addToCart = useCallback(
    async (product: Product, qty = 1) => {
      // 1. Optimistic UI update
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        }
        return [...prev, { product, quantity: qty }];
      });

      // 2. If authenticated, persist to PostgreSQL
      if (isSignedIn) {
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id, quantity: qty }),
          });
          const data = await res.json();
          if (data.success && Array.isArray(data.items)) {
            setCart(data.items);
          }
        } catch (err) {
          console.error('[Cart] Failed to add item to DB:', err);
        }
      }
    },
    [isSignedIn]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      // 1. Optimistic UI update
      setCart((prev) => prev.filter((item) => item.product.id !== productId));

      // 2. If authenticated, delete from PostgreSQL
      if (isSignedIn) {
        try {
          const res = await fetch(`/api/cart?productId=${encodeURIComponent(productId)}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (data.success && Array.isArray(data.items)) {
            setCart(data.items);
          }
        } catch (err) {
          console.error('[Cart] Failed to remove item from DB:', err);
        }
      }
    },
    [isSignedIn]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      // 1. Optimistic UI update
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );

      // 2. If authenticated, update quantity in PostgreSQL
      if (isSignedIn) {
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'set', productId, quantity }),
          });
          const data = await res.json();
          if (data.success && Array.isArray(data.items)) {
            setCart(data.items);
          }
        } catch (err) {
          console.error('[Cart] Failed to update quantity in DB:', err);
        }
      }
    },
    [isSignedIn, removeFromCart]
  );

  const clearCart = useCallback(async () => {
    setCart([]);
    try {
      localStorage.removeItem('guest_cart');
      localStorage.removeItem('sw_cart');
    } catch {}

    if (isSignedIn) {
      try {
        await fetch('/api/cart?clearAll=true', { method: 'DELETE' });
      } catch (err) {
        console.error('[Cart] Failed to clear DB cart:', err);
      }
    }
  }, [isSignedIn]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  // ── Wishlist Actions ────────────────────────────────────────────────────────
  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.some((p) => p.id === productId),
    [wishlist]
  );

  // ── Compare Actions ─────────────────────────────────────────────────────────
  const toggleCompare = useCallback((product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  }, []);

  const isCompared = useCallback(
    (productId: string) => compareList.some((p) => p.id === productId),
    [compareList]
  );

  const clearCompare = useCallback(() => setCompareList([]), []);

  // ── AI Preferences ──────────────────────────────────────────────────────────
  const updateAIPreferences = useCallback((prefs: Partial<UserAIPreferences>) => {
    setAiPreferences((prev) => ({ ...prev, ...prefs }));
  }, []);

  const togglePriority = useCallback((priority: ShoppingPriority) => {
    setAiPreferences((prev) => {
      const priorities = prev.priorities.includes(priority)
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority];
      return { ...prev, priorities: priorities.length > 0 ? priorities : ['best-value'] };
    });
  }, []);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartSyncing,
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        toggleCompare,
        isCompared,
        clearCompare,
        aiPreferences,
        updateAIPreferences,
        togglePriority,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
