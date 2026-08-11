'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Sparkles, Scale, User, Menu, X, Search } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, compareList } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ai-shopping?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              ShopWise AI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive('/') ? 'text-indigo-600' : 'text-zinc-600'
            }`}
          >
            Home
          </Link>
          <Link
            href="/ai-shopping"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive('/ai-shopping') ? 'text-indigo-600' : 'text-zinc-600'
            }`}
          >
            <Sparkles className="h-4 w-4 text-violet-500 animate-pulse" />
            AI Shopper
          </Link>
          <Link
            href="/compare"
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-indigo-600 ${
              isActive('/compare') ? 'text-indigo-600' : 'text-zinc-600'
            }`}
          >
            <Scale className="h-4 w-4" />
            Compare
            {compareList.length > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ml-0.5">
                {compareList.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Ask AI to find products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-60 rounded-full border border-zinc-200 bg-zinc-50 pl-9 pr-4 text-xs outline-none transition-all focus:w-72 focus:border-indigo-500 focus:bg-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          </form>

          <Link
            href="/ai-shopping"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-indigo-600"
            title="AI Chat Assistant"
          >
            <Sparkles className="h-4 w-4 text-violet-500" />
          </Link>

          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-indigo-600"
            title="Shopping Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-indigo-600"
            title="My Profile"
          >
            <User className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-zinc-700">
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50 text-zinc-700"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white p-4">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search / Ask AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-sm outline-none"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          </form>
          <div className="flex flex-col gap-3">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-medium py-1.5 ${isActive('/') ? 'text-indigo-600' : 'text-zinc-600'}`}>Home</Link>
            <Link href="/ai-shopping" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 text-sm font-medium py-1.5 ${isActive('/ai-shopping') ? 'text-indigo-600' : 'text-zinc-600'}`}>
              <Sparkles className="h-4 w-4 text-violet-500" /> AI Shopper Dashboard
            </Link>
            <Link href="/compare" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 text-sm font-medium py-1.5 ${isActive('/compare') ? 'text-indigo-600' : 'text-zinc-600'}`}>
              <Scale className="h-4 w-4" /> Compare ({compareList.length})
            </Link>
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 text-sm font-medium py-1.5 ${isActive('/profile') ? 'text-indigo-600' : 'text-zinc-600'}`}>
              <User className="h-4 w-4" /> Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
