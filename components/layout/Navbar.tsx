'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import {
  Sparkles,
  Search,
  ShoppingCart,
  Heart,
  Scale,
  Menu,
  X,
  ChevronDown,
  User as UserIcon,
  LogIn,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useGuestSession } from '../../utils/useGuestSession';
import { categories } from '../../data/categories';
import { Category } from '../../types/index';

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlist, compareList } = useShop();
  const { guestId, truncatedId } = useGuestSession();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/ai-shopping?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">

          {/* ── Brand Logo & Session Badge (Desktop) ────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                ShopWise AI
              </span>
            </Link>

            {/* Subtle "Session Active" Pill Badge */}
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold tracking-tight shadow-xs select-none"
              title={`Active Session: ${guestId || 'active'}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{truncatedId || 'Guest: #active'}</span>
            </div>
          </div>

          {/* ── Category Mega-Nav (Desktop) ───────────────────────────────── */}
          <div ref={catRef} className="relative hidden xl:block">
            <button
              onClick={() => setCatMenuOpen(!catMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <Menu className="h-4 w-4" />
              <span>Categories</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${catMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {catMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-50">
                <div className="p-2">
                  {categories.map((cat: Category) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setCatMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 group transition-colors"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-zinc-800 group-hover:text-indigo-700">
                          {cat.name}
                        </div>
                        <div className="text-xs text-zinc-500 truncate">{cat.productCount}+ products</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── AI Search Bar ─────────────────────────────────────────────── */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden md:flex items-center max-w-md lg:max-w-lg"
          >
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-indigo-500 pointer-events-none">
                <Sparkles className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or describe your problem..."
                className="w-full h-10 pl-9 pr-10 rounded-full border border-zinc-300 bg-zinc-50 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* ── Action Buttons (Desktop) ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {/* Compare */}
            <Link
              href="/compare"
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-zinc-100 transition-colors group"
              title="Compare"
            >
              <Scale className="h-5 w-5 text-zinc-600 group-hover:text-indigo-600" />
              <span className="text-[10px] text-zinc-500 group-hover:text-indigo-600 font-medium">Compare</span>
              {compareList.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white shadow">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/profile"
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-zinc-100 transition-colors group"
              title="Wishlist"
            >
              <Heart className="h-5 w-5 text-zinc-600 group-hover:text-rose-500" />
              <span className="text-[10px] text-zinc-500 group-hover:text-rose-500 font-medium">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-zinc-100 transition-colors group"
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5 text-zinc-600 group-hover:text-indigo-600" />
              <span className="text-[10px] text-zinc-500 group-hover:text-indigo-600 font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white shadow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* AI Shopper CTA */}
            <Link
              href="/ai-shopping"
              className="ml-1 flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold shadow hover:shadow-indigo-300/50 hover:scale-105 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Shop</span>
            </Link>

            {/* ── Clerk Authentication UI (Desktop) ───────────────────────── */}
            <div className="ml-2 pl-2 border-l border-zinc-200 flex items-center">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer">
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'h-8 w-8 ring-2 ring-indigo-500/20',
                    },
                  }}
                />
              </Show>
            </div>
          </div>

          {/* ── Mobile Menu Toggle & Session Pill ─────────────────────────── */}
          <div className="flex items-center gap-2 md:hidden">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold"
              title={`Active Session: ${guestId || 'active'}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>{truncatedId || 'Guest'}</span>
            </div>

            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-zinc-100">
              <ShoppingCart className="h-5 w-5 text-zinc-700" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-zinc-100"
            >
              {mobileOpen ? <X className="h-5 w-5 text-zinc-700" /> : <Menu className="h-5 w-5 text-zinc-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Sparkles className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search or ask AI..."
              className="w-full h-10 pl-9 pr-4 rounded-full border border-zinc-300 bg-zinc-50 text-sm focus:outline-none focus:border-indigo-500"
            />
          </form>

          {/* User Status (Mobile) */}
          <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-center justify-between">
            <Show when="signed-in">
              <div className="flex items-center gap-3">
                <UserButton />
                <span className="text-xs font-semibold text-zinc-800">Account Active</span>
              </div>
            </Show>
            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-zinc-700">{truncatedId || 'Guest Active'}</span>
              </div>
              <SignInButton mode="modal">
                <button className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700">
                  Sign In
                </button>
              </SignInButton>
            </Show>
          </div>

          {/* Nav Links */}
          <nav className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-50 text-sm font-medium text-zinc-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <span>{cat.icon}</span>
                <span className="truncate">{cat.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex gap-3 border-t border-zinc-100 pt-3">
            <Link href="/compare" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700">
              <Scale className="h-4 w-4" /> Compare {compareList.length > 0 && `(${compareList.length})`}
            </Link>
            <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700">
              <UserIcon className="h-4 w-4" /> Profile
            </Link>
            <Link href="/ai-shopping" onClick={() => setMobileOpen(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4" /> AI Shop
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
