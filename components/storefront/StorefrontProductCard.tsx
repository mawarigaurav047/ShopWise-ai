'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../types/index';
import { useShop } from '../../context/ShopContext';

interface StorefrontProductCardProps {
  product: Product;
  badge?: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

export function StorefrontProductCard({ product, badge = 'BESTSELLER' }: StorefrontProductCardProps) {
  const { addToCart } = useShop();
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

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100">
      {/* ── Image frame ─────────────────────────────────────────── */}
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-slate-50 p-5"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            crossOrigin="anonymous"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* Bestseller badge */}
        <span className="absolute left-4 top-4 rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
          {badge}
        </span>

        {/* Discount */}
        {product.discount > 0 && (
          <span className="absolute right-4 top-4 rounded-md bg-slate-900 px-2 py-1 text-[11px] font-bold text-white">
            -{product.discount}%
          </span>
        )}
      </Link>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-orange-600">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
          <Link href={`/products/${product.id}`} className="hover:text-orange-600">
            {product.name}
          </Link>
        </h3>

        {/* Stock availability */}
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`h-2 w-2 rounded-full ${
              !inStock ? 'bg-red-400' : lowStock ? 'bg-amber-400' : 'bg-emerald-500'
            }`}
          />
          <span
            className={
              !inStock ? 'text-red-500' : lowStock ? 'text-amber-600' : 'text-emerald-600'
            }
          >
            {!inStock ? 'Out of Stock' : lowStock ? `Only ${stock} left` : 'In Stock'}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(product.price)}
          </span>
          {product.discount > 0 && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={handleAdd}
            disabled={!inStock}
            className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              !inStock
                ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                : added
                  ? 'bg-emerald-500 text-white'
                  : 'bg-orange-500 text-white shadow-sm shadow-orange-200 hover:bg-orange-600 active:scale-[0.98]'
            }`}
          >
            {!inStock ? (
              'Unavailable'
            ) : added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Add to Cart
              </>
            )}
          </button>
          <Link
            href={`/products/${product.id}`}
            aria-label={`Learn more about ${product.name}`}
            className="flex h-11 items-center justify-center gap-1 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
          >
            Learn More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StorefrontProductCard;
