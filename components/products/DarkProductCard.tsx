'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from '../../types/index';
import { useShop } from '../../context/ShopContext';

interface DarkProductCardProps {
  product: Product;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

export function DarkProductCard({ product }: DarkProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wishlisted = isWishlisted(product.id);
  const [added, setAdded] = useState(false);

  const stock = product.stock ?? 0;
  const inStock = stock > 0;
  const lowStock = inStock && stock <= 20;

  const handleAdd = () => {
    if (!inStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  // Stock pill config
  const stockPill = !inStock
    ? { label: 'Out of Stock', dot: 'bg-red-400', ring: 'text-red-300 border-red-500/30 bg-red-500/10' }
    : lowStock
      ? { label: `Only ${stock} left`, dot: 'bg-amber-400', ring: 'text-amber-300 border-amber-500/30 bg-amber-500/10' }
      : { label: 'In Stock', dot: 'bg-emerald-400', ring: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-950/50">
      {/* ── Image Frame ─────────────────────────────────────────────── */}
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 p-3"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl ring-1 ring-white/10">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            crossOrigin="anonymous"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* subtle top glow on hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Discount tag */}
        {product.discount > 0 && (
          <span className="absolute left-4 top-4 rounded-lg bg-rose-500 px-2 py-1 text-[11px] font-extrabold text-white shadow-md shadow-rose-900/40">
            -{product.discount}%
          </span>
        )}

        {/* Stock pill */}
        <span
          className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold backdrop-blur-md ${stockPill.ring}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${stockPill.dot}`} />
          {stockPill.label}
        </span>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 ${
            wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-black/40 text-zinc-300 hover:bg-black/60 hover:text-rose-400'
          }`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-zinc-200">{product.rating}</span>
            <span className="text-zinc-500">({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-white">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Price tag */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-xl font-extrabold tracking-tight text-white">
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <span className="text-xs text-zinc-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`mt-1 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
            !inStock
              ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
              : added
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-indigo-500 text-white shadow-lg shadow-indigo-950/50 hover:bg-indigo-400 hover:shadow-indigo-900/60 active:scale-[0.98]'
          }`}
        >
          {!inStock ? (
            'Unavailable'
          ) : added ? (
            <>
              <Check className="h-4 w-4" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default DarkProductCard;
