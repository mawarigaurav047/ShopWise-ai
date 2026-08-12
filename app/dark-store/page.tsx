'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import DarkProductCard from '../../components/products/DarkProductCard';

export default function DarkStorePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Ambient background accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 -left-40 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Curated Collection
          </span>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Shop the Full Range
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-zinc-400">
            Premium electronics and appliances, presented in a sleek dark showcase with
            live stock indicators and instant add-to-cart.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <DarkProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
