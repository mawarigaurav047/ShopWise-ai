'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Plus, Trash2, ShoppingCart, Check, X, BrainCircuit, Trophy, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/index';

export default function ComparePage() {
  const { compareList, toggleCompare, clearCompare, addToCart } = useShop();

  // Determine AI winner (highest score)
  const winner = compareList.reduce<Product | null>(
    (best, p) => (!best || p.aiMatch.score > best.aiMatch.score ? p : best),
    null
  );

  // Collect all unique spec labels across compared products
  const allSpecLabels = Array.from(
    new Set(compareList.flatMap((p) => p.specs.map((s) => s.label)))
  );

  const slots = Array.from({ length: 4 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="h-5 w-5 text-orange-500" />
            <h1 className="text-2xl font-extrabold text-zinc-900">Compare Products</h1>
          </div>
          <p className="text-sm text-zinc-500">Side-by-side comparison of up to 4 products</p>
        </div>
        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-700 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" /> Clear All
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <Scale className="h-12 w-12 text-zinc-300 mx-auto" />
          <h2 className="text-lg font-bold text-zinc-800">No products to compare</h2>
          <p className="text-sm text-zinc-500">Add products to compare by clicking the ⚖ icon on any product card.</p>
          <Link href="/" className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-indigo-600 hover:underline">
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* AI Verdict Banner */}
          {compareList.length > 1 && winner && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-950 to-violet-900 text-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-zinc-900 shadow">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-0.5">
                  🤖 AI Verdict
                </div>
                <h3 className="text-base font-bold">
                  Best Pick: <span className="text-yellow-300">{winner.name}</span>
                </h3>
                <p className="text-indigo-200 text-sm mt-0.5 line-clamp-2">
                  {winner.aiMatch.whyMatches}
                </p>
              </div>
              <div className="text-2xl font-black text-yellow-300 shrink-0">
                {winner.aiMatch.score}%
              </div>
            </div>
          )}

          {/* Compare Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  {/* First col label */}
                  <th className="w-44 bg-zinc-50 px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                    Feature
                  </th>
                  {/* Product columns */}
                  {slots.map((_, i) => {
                    const p = compareList[i];
                    return (
                      <th key={i} className={`px-4 py-3 min-w-[200px] border-l border-zinc-200 ${p && winner && p.id === winner.id ? 'bg-indigo-50' : 'bg-white'}`}>
                        {p ? (
                          <div className="space-y-2 text-left">
                            {/* Winner crown */}
                            {compareList.length > 1 && winner && p.id === winner.id && (
                              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1">
                                <Trophy className="h-3 w-3 text-yellow-500 fill-yellow-500" /> AI Top Pick
                              </div>
                            )}
                            <Link href={`/products/${p.id}`}>
                              <img src={p.image} alt={p.name} className="h-20 w-20 object-cover rounded-xl border border-zinc-200 hover:opacity-90 transition-opacity" />
                            </Link>
                            <Link href={`/products/${p.id}`} className="text-sm font-bold text-zinc-800 hover:text-indigo-700 block leading-snug line-clamp-2">
                              {p.name}
                            </Link>
                            <div className="text-base font-extrabold text-zinc-950">₹{p.price.toLocaleString('en-IN')}</div>
                            <button
                              onClick={() => toggleCompare(p)}
                              className="text-[11px] text-red-400 hover:text-red-600 flex items-center gap-0.5"
                            >
                              <X className="h-3 w-3" /> Remove
                            </button>
                          </div>
                        ) : (
                          <Link
                            href="/"
                            className="flex flex-col items-center justify-center h-28 gap-2 rounded-xl border-2 border-dashed border-zinc-200 hover:border-indigo-400 text-zinc-400 hover:text-indigo-500 transition-colors"
                          >
                            <Plus className="h-6 w-6" />
                            <span className="text-xs font-medium">Add Product</span>
                          </Link>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {/* AI Score Row */}
                <tr className="border-b border-zinc-100 bg-indigo-50/40">
                  <td className="px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wide">AI Match Score</td>
                  {slots.map((_, i) => {
                    const p = compareList[i];
                    return (
                      <td key={i} className="px-4 py-3 border-l border-zinc-200 text-center">
                        {p && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm border border-indigo-200">
                            <BrainCircuit className="h-3.5 w-3.5" />
                            {p.aiMatch.score}%
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Rating Row */}
                <tr className="border-b border-zinc-100">
                  <td className="px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wide">Rating</td>
                  {slots.map((_, i) => {
                    const p = compareList[i];
                    return (
                      <td key={i} className="px-4 py-3 border-l border-zinc-200 text-center text-sm font-semibold text-amber-600">
                        {p && `${p.rating}★ (${p.reviewCount.toLocaleString()})`}
                      </td>
                    );
                  })}
                </tr>

                {/* Efficiency Badge Row */}
                <tr className="border-b border-zinc-100 bg-emerald-50/30">
                  <td className="px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wide">Energy Rating</td>
                  {slots.map((_, i) => {
                    const p = compareList[i];
                    return (
                      <td key={i} className="px-4 py-3 border-l border-zinc-200 text-center">
                        {p && (
                          p.aiMatch.efficiencyBadge
                            ? <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">{p.aiMatch.efficiencyBadge}</span>
                            : <span className="text-xs text-zinc-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Dynamic Spec Rows */}
                {allSpecLabels.slice(0, 10).map((label, ri) => (
                  <tr key={label} className={`border-b border-zinc-100 ${ri % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}`}>
                    <td className="px-4 py-3 text-xs font-semibold text-zinc-600">{label}</td>
                    {slots.map((_, i) => {
                      const p = compareList[i];
                      const specVal = p?.specs.find((s) => s.label === label)?.value;
                      return (
                        <td key={i} className="px-4 py-3 border-l border-zinc-200 text-sm text-zinc-700">
                          {specVal ?? (p ? <span className="text-zinc-300">—</span> : null)}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* AI Drawback Row */}
                <tr className="border-b border-amber-100 bg-amber-50/30">
                  <td className="px-4 py-3 text-xs font-bold text-amber-700 uppercase tracking-wide">⚠ Drawback</td>
                  {slots.map((_, i) => {
                    const p = compareList[i];
                    return (
                      <td key={i} className="px-4 py-3 border-l border-zinc-200 text-xs text-amber-800 leading-relaxed">
                        {p?.aiMatch.potentialDrawback}
                      </td>
                    );
                  })}
                </tr>

                {/* Add to Cart Row */}
                <tr className="bg-zinc-50">
                  <td className="px-4 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wide">Action</td>
                  {slots.map((_, i) => {
                    const p = compareList[i];
                    return (
                      <td key={i} className="px-4 py-4 border-l border-zinc-200 text-center">
                        {p && (
                          <button
                            onClick={() => addToCart(p)}
                            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                          >
                            <ShoppingCart className="h-4 w-4" /> Add to Cart
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
