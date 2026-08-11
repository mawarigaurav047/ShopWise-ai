'use client';

import { useShop } from '../context/ShopContext';

/**
 * useCart Hook
 * Provides direct access to cart state, item count, totals,
 * sync status, and cart modification functions (add, remove, update, clear).
 */
export function useCart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartSyncing,
  } = useShop();

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartSyncing,
  };
}

export default useCart;
