'use client';

import React from 'react';
import Link from 'next/link';
import { User, Heart, BrainCircuit, Leaf, TrendingUp, Star, Shield, Zap, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ShoppingPriority } from '../../types/index';
import ProductCard from '../../components/products/ProductCard';
import { useUser, SignInButton } from '@clerk/nextjs';

const PRIORITY_OPTIONS: { key: ShoppingPriority; label: string; icon: React.ReactNode }[] = [
  { key: 'best-value', label: 'Best Value', icon: <TrendingUp className="h-4 w-4" /> },
  { key: 'energy-efficient', label: 'Energy Efficient', icon: <Leaf className="h-4 w-4" /> },
  { key: 'premium-quality', label: 'Premium Quality', icon: <Star className="h-4 w-4" /> },
  { key: 'budget-friendly', label: 'Budget Friendly', icon: <Shield className="h-4 w-4" /> },
  { key: 'latest-tech', label: 'Latest Tech', icon: <Zap className="h-4 w-4" /> },
];

const MOCK_ORDERS = [
  { id: 'SW-2024-0032', date: 'July 28, 2026', amount: 42990, status: 'Delivered', items: 'Samsung WindFree 1.5 Ton AC' },
  { id: 'SW-2024-0017', date: 'June 14, 2026', amount: 74999, status: 'Delivered', items: 'Samsung Galaxy S24 5G' },
  { id: 'SW-2024-0009', date: 'April 3, 2026', amount: 38990, status: 'Delivered', items: 'LG 8kg Front Load Washer' },
];

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();
  const { wishlist, toggleWishlist, aiPreferences, updateAIPreferences, togglePriority } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* ── Profile Header ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm flex-wrap gap-4">
        <div className="flex items-center gap-5">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="Avatar" className="h-16 w-16 rounded-2xl object-cover border border-indigo-200" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold text-xl">
              {user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : <User className="h-8 w-8" />}
            </div>
          )}
          <div>
            <h1 className="text-xl font-extrabold text-zinc-900">{user?.fullName || 'My Account'}</h1>
            <div className="text-sm text-zinc-500 mt-0.5">{user?.primaryEmailAddress?.emailAddress || 'ShopWise AI Member'}</div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full w-fit">
              <BrainCircuit className="h-3.5 w-3.5" /> AI-powered preferences active
            </div>
          </div>
        </div>

        {!isSignedIn && (
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer">
              Sign In to Sync
            </button>
          </SignInButton>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── LEFT: AI Preferences Tuner ──────────────────────────────────── */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-600" />
              <h2 className="text-base font-extrabold text-zinc-900">AI Preference Tuner</h2>
            </div>

            {/* Priority Toggles */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Shopping Priorities</label>
              <div className="flex flex-wrap gap-2">
                {PRIORITY_OPTIONS.map(({ key, label, icon }) => {
                  const active = aiPreferences.priorities.includes(key);
                  return (
                    <button
                      key={key}
                      onClick={() => togglePriority(key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {icon}
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Limit Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider">Max Budget Limit</span>
                <span className="font-bold text-indigo-600">₹{aiPreferences.budgetLimit.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={aiPreferences.budgetLimit}
                onChange={(e) => updateAIPreferences({ budgetLimit: Number(e.target.value) })}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>₹10,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* Energy Star Checkbox */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={aiPreferences.requireEnergyStar}
                onChange={(e) => updateAIPreferences({ requireEnergyStar: e.target.checked })}
                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300"
              />
              <span className="text-xs font-semibold text-zinc-700">Only recommend 4★ & 5★ Energy Rated</span>
            </label>
          </div>
        </aside>

        {/* ── RIGHT: Orders & Wishlist ─────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Saved Wishlist */}
          <section className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500" />
                <h2 className="text-base font-extrabold text-zinc-900">Saved Wishlist ({wishlist.length})</h2>
              </div>
              {wishlist.length > 0 && (
                <Link href="/compare" className="text-xs font-bold text-indigo-600 hover:underline">
                  Compare Wishlist →
                </Link>
              )}
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-zinc-200 rounded-xl space-y-2">
                <Heart className="h-8 w-8 text-zinc-300 mx-auto" />
                <p className="text-xs text-zinc-500">Your wishlist is empty. Tap the heart on any product to save it!</p>
                <Link href="/" className="inline-block text-xs font-bold text-indigo-600 hover:underline">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>

          {/* Past Orders */}
          <section className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
              <h2 className="text-base font-extrabold text-zinc-900">Order History</h2>
            </div>

            <div className="divide-y divide-zinc-100">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="py-3.5 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div>
                    <div className="font-bold text-zinc-800">{order.items}</div>
                    <div className="text-zinc-400 text-[11px] mt-0.5">{order.id} • {order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-zinc-900">₹{order.amount.toLocaleString('en-IN')}</div>
                    <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px] mt-0.5">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
