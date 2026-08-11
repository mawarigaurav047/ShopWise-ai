// CartContext is no longer used — all cart state is managed by context/ShopContext.tsx
// This stub re-exports useShop as useCart for backward compatibility.
export { useShop as useCart } from './ShopContext';
export { ShopProvider as CartProvider } from './ShopContext';
