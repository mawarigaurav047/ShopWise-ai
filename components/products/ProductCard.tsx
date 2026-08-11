'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Scale, ShoppingCart, Star, Zap, BrainCircuit, Check } from 'lucide-react';
import { Product } from '../../types/index';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  showAIBadge?: boolean;
  showAIExplanation?: boolean;
}

export function ProductCard({ product, showAIBadge = true, showAIExplanation }: ProductCardProps) {

  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isCompared } = useShop();

  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-indigo-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-zinc-400';
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-lg hover:border-zinc-300 transition-all duration-300">

      {/* ── Image Area ─────────────────────────────────────────────────────── */}
      <Link href={`/products/${product.id}`} className="relative block aspect-[4/3] bg-zinc-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white shadow">
            -{product.discount}%
          </div>
        )}

        {/* Efficiency Badge */}
        {product.aiMatch.efficiencyBadge && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-600/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow">
            <Zap className="h-2.5 w-2.5" />
            {product.aiMatch.efficiencyBadge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className={`absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
            wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-zinc-400 hover:text-rose-500 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4 gap-2">

        {/* Brand + Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
            {product.brand}
          </span>
          {/* Rating */}
          <div className="flex items-center gap-0.5 text-xs text-zinc-500">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-zinc-800">{product.rating}</span>
            <span>({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-zinc-900 line-clamp-2 leading-snug hover:text-indigo-700">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* AI Match Badge */}
        {showAIBadge && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs">
              <BrainCircuit className="h-3.5 w-3.5 text-indigo-500" />
              <span className="font-semibold text-indigo-700">AI Match: {product.aiMatch.score}%</span>
            </div>
            {/* Mini score bar */}
            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getAIScoreColor(product.aiMatch.score)}`}
                style={{ width: `${product.aiMatch.score}%` }}
              />
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-extrabold text-zinc-950">{formatPrice(product.price)}</span>
          {product.discount > 0 && (
            <span className="text-xs text-zinc-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>

          {/* Compare Toggle */}
          <button
            onClick={() => toggleCompare(product)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              compared
                ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'
                : 'bg-white border-zinc-200 text-zinc-500 hover:border-orange-400 hover:text-orange-500'
            }`}
            title={compared ? 'Remove from Compare' : 'Compare'}
          >
            {compared ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

