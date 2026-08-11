'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, BrainCircuit, Zap, ShieldCheck, TrendingUp, Flame } from 'lucide-react';
import { categories } from '../data/categories';
import { Product } from '../types/index';
import ProductCard from '../components/products/ProductCard';
import AIExplanationCard from '../components/ai/AIExplanationCard';
import { ProductCardSkeleton } from '../components/ui/ProductCardSkeleton';

const EXAMPLE_CHIPS = [
  'Best AC under ₹40,000',
  'Laptop for college students',
  'Energy-saving refrigerator for family',
  '55" TV with HDR under ₹50K',
  'Front-load washing machine with Wi-Fi',
];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [trending, setTrending] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeProducts() {
      try {
        setLoading(true);
        const [trendingRes, dealsRes] = await Promise.all([
          fetch('/api/products?trending=true'),
          fetch('/api/products?deal=true'),
        ]);

        if (trendingRes.ok) {
          const trendingData = await trendingRes.json();
          if (trendingData.success) {
            setTrending(trendingData.data);
          }
        }

        if (dealsRes.ok) {
          const dealsData = await dealsRes.json();
          if (dealsData.success) {
            setDeals(dealsData.data);
          }
        }
      } catch (error) {
        console.error('Failed to load homepage products from API:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHomeProducts();
  }, []);

  const handleSearch = (q: string) => {
    if (q.trim()) router.push(`/ai-shopping?q=${encodeURIComponent(q.trim())}`);
  };

  const topPick = trending[0] || deals[0];

  return (
    <div className="space-y-16 pb-20">

      {/* ━━ HERO SECTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        {/* Gradient blobs */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-semibold text-indigo-300">
              <Sparkles className="h-4 w-4 animate-pulse" />
              India&apos;s Most Intelligent Electronics Store
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Shop Smarter with{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                Explainable AI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Tell us what you need in plain English. Our AI matches you with the best electronics and appliances — and explains <em>exactly why</em>.
            </p>

            {/* AI Search Input */}
            <div className="relative max-w-xl mx-auto mt-8">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 gap-2 focus-within:border-indigo-500 focus-within:bg-white/15 transition-all">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                  placeholder="e.g. 5-Star AC under ₹40,000 for a medium bedroom"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-zinc-400 focus:outline-none"
                />
                <button
                  onClick={() => handleSearch(query)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  Ask AI
                </button>
              </div>
            </div>

            {/* Example prompt chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-xs text-zinc-300 font-medium">Try asking:</span>
              {EXAMPLE_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSearch(chip)}
                  className="text-xs bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 rounded-full px-3 py-1 transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature badges bar */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-300">
                <BrainCircuit className="h-4 w-4 text-indigo-400" />
                AI Match Scores on Every Product
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-300">
                <Zap className="h-4 w-4 text-amber-400" />
                BEE Energy Star Efficiency Ratings
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Brand-Direct Genuine Warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ CATEGORIES GRID ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900">Explore by Category</h2>
            <p className="text-sm text-zinc-500 mt-1">Smart electronics and appliances curated with AI metadata</p>
          </div>
          <Link href="/ai-shopping" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            Let AI choose for you <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex flex-col items-center text-center p-5 rounded-2xl border border-zinc-200 bg-white hover:border-indigo-500 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm font-bold text-zinc-800 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-zinc-400 mt-0.5">{cat.productCount} models</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ━━ TRENDING PRODUCTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-900">Trending Now</h2>
              <p className="text-sm text-zinc-500">Highest rated appliances backed by PostgreSQL backend</p>
            </div>
          </div>
          <Link href="/ai-shopping" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            Compare all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ━━ SPECIAL DEALS SECTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {deals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-900">Featured Deals & Discounts</h2>
              <p className="text-sm text-zinc-500">AI-vetted deals with highest value-for-money ratio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ━━ FEATURED AI EXPLANATION SPOTLIGHT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {topPick && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-violet-50 to-white border border-indigo-100 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
              <BrainCircuit className="h-4 w-4" />
              AI Match Spotlight
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{topPick.brand}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-tight">
                  {topPick.name}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {topPick.description}
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="text-2xl font-extrabold text-zinc-950">
                    ₹{topPick.price.toLocaleString('en-IN')}
                  </div>
                  <Link
                    href={`/products/${topPick.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-md shadow-indigo-600/20"
                  >
                    View Product Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <AIExplanationCard aiMatch={topPick.aiMatch} productName={topPick.name} />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ━━ CTA SECTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-700 text-white p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 mx-auto">
            <BrainCircuit className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to find your perfect appliance match?
          </h2>
          <p className="text-indigo-100 text-base max-w-xl mx-auto">
            Chat with our AI Copilot or tune your personal shopping priorities for budget, energy efficiency, and specs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/ai-shopping"
              className="px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Start AI Shopping Session →
            </Link>
            <Link
              href="/compare"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 transition-colors"
            >
              Compare Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
