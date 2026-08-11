'use client';

import React, { use, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { categories } from '../../../data/categories';
import { Product } from '../../../types/index';
import ProductCard from '../../../components/products/ProductCard';
import { ProductCardSkeleton } from '../../../components/ui/ProductCardSkeleton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = use(params);
  const category = categories.find((c) => c.slug === slug);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [brands, setBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [energyStar, setEnergyStar] = useState(false);
  const [sortBy, setSortBy] = useState<'ai-score' | 'price-asc' | 'price-desc' | 'rating'>('ai-score');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    async function loadCategoryProducts() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?category=${encodeURIComponent(slug)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setProducts(json.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch category products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryProducts();
  }, [slug]);

  const allBrands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))];
  }, [products]);

  const toggleBrand = (brand: string) => {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (brands.length > 0 && !brands.includes(p.brand)) return false;
      if (p.rating < minRating) return false;
      if (energyStar && !p.aiMatch?.efficiencyBadge) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'ai-score') return (b.aiMatch?.score ?? 0) - (a.aiMatch?.score ?? 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [products, minPrice, maxPrice, brands, minRating, energyStar, sortBy]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Category not found</h1>
        <Link href="/" className="mt-4 inline-flex items-center gap-1 text-indigo-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ── Breadcrumb & Category Header ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-zinc-700 font-medium">{category.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">{category.name}</h1>
              <p className="text-sm text-zinc-500">{category.description}</p>
            </div>
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            <Filter className="h-4 w-4" />
            Filters {brands.length > 0 ? `(${brands.length})` : ''}
          </button>
        </div>
      </div>

      {/* ── Main Layout: Filters Sidebar + Products Grid ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* ── Filter Sidebar ──────────────────────────────────────────────── */}
        <aside className={`lg:block ${filterOpen ? 'block' : 'hidden'} space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-fit sticky top-20`}>
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-indigo-600" /> Filters
            </span>
            <button
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(200000);
                setBrands([]);
                setMinRating(0);
                setEnergyStar(false);
              }}
              className="text-xs text-indigo-600 hover:underline"
            >
              Reset all
            </button>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
              Max Price: ₹{maxPrice.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>₹10,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          {/* Brand Filter */}
          {allBrands.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Brand</label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {allBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer hover:text-zinc-900">
                    <input
                      type="checkbox"
                      checked={brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Minimum Rating */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Minimum Rating</label>
            <div className="flex gap-1.5">
              {[0, 3.5, 4.0, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-colors ${
                    minRating === r
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-zinc-200 text-zinc-600 hover:border-indigo-300'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Energy Efficiency Toggle */}
          <div className="pt-2 border-t border-zinc-100">
            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={energyStar}
                onChange={(e) => setEnergyStar(e.target.checked)}
                className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-semibold text-xs text-zinc-800">BEE Star Rated Only</span>
            </label>
          </div>
        </aside>

        {/* ── Product Grid + Sort Bar ──────────────────────────────────────── */}
        <main className="lg:col-span-3 space-y-6">

          {/* Sort bar */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-zinc-200 shadow-sm text-sm">
            <span className="text-zinc-500 text-xs font-medium">
              Showing <strong className="text-zinc-800">{filtered.length}</strong> of {products.length} models
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-zinc-700 focus:outline-none focus:border-indigo-500"
              >
                <option value="ai-score">AI Match Score</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-zinc-200">
              <span className="text-4xl">🔍</span>
              <h3 className="text-base font-bold text-zinc-800 mt-3">No products match your filters</h3>
              <p className="text-xs text-zinc-500 mt-1">Try resetting the filters or increasing the max price.</p>
              <button
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(200000);
                  setBrands([]);
                  setMinRating(0);
                  setEnergyStar(false);
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
