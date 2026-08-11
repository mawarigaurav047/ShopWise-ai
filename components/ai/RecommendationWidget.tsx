'use client';

import React from 'react';
import Link from 'next/link';
import { BrainCircuit, Check, Scale, Star, Leaf, TrendingUp } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { products as allProducts } from '../../data/products';
import { ShoppingPriority } from '../../types/index';

const QUICK_PRIORITIES: { key: ShoppingPriority; label: string; icon: React.ReactNode }[] = [
  { key: 'premium-quality', label: 'High Ratings', icon: <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> },
  { key: 'budget-friendly', label: 'Best Price', icon: <span className="text-sm font-extrabold">₹</span> },
  { key: 'energy-efficient', label: 'Energy Star', icon: <Leaf className="h-4 w-4 text-emerald-500" /> },
  { key: 'best-value', label: 'Best Value', icon: <TrendingUp className="h-4 w-4 text-indigo-500" /> },
];

export const RecommendationWidget: React.FC = () => {
  const { aiPreferences, togglePriority, toggleCompare, isCompared } = useShop();

  // Get top AI-recommended products
  const recommended = [...allProducts]
    .sort((a, b) => {
      let sa = a.aiMatch.score;
      let sb = b.aiMatch.score;
      if (aiPreferences.priorities.includes('energy-efficient')) {
        if (a.aiMatch.efficiencyBadge) sa += 8;
        if (b.aiMatch.efficiencyBadge) sb += 8;
      }
      if (aiPreferences.priorities.includes('budget-friendly')) {
        sa += (200000 - a.price) / 5000;
        sb += (200000 - b.price) / 5000;
      }
      if (aiPreferences.priorities.includes('premium-quality')) {
        sa += a.rating * 3;
        sb += b.rating * 3;
      }
      return sb - sa;
    })
    .slice(0, 3);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-950">AI Preference Tuning</h3>
          <p className="text-[11px] text-zinc-500">Configure how the AI ranks products</p>
        </div>
      </div>

      {/* Priority Toggles */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {QUICK_PRIORITIES.map(({ key, label, icon }) => {
          const active = aiPreferences.priorities.includes(key);
          return (
            <button
              key={key}
              onClick={() => togglePriority(key)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 transition-all text-center ${
                active
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'border-zinc-200 text-zinc-500 hover:bg-zinc-50'
              }`}
            >
              {icon}
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Recommended List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Top Matches For You:
        </h4>
        <div className="space-y-2">
          {recommended.map((product) => {
            const compared = isCompared(product.id);
            return (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-2.5 hover:bg-zinc-50 transition-colors"
              >
                <Link href={`/products/${product.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover bg-zinc-200 shrink-0"
                  />
                  <div className="text-[11px] leading-tight min-w-0">
                    <span className="font-semibold text-zinc-900 line-clamp-1 block">{product.name}</span>
                    <div className="mt-1 flex items-center gap-2 text-zinc-500">
                      <span>₹{product.price.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <span className="text-indigo-600 font-semibold">AI {product.aiMatch.score}%</span>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`rounded-lg p-1.5 border transition-colors shrink-0 ${
                    compared
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : 'border-zinc-200 bg-white text-zinc-500 hover:text-indigo-600'
                  }`}
                  title={compared ? 'In compare list' : 'Add to comparison'}
                >
                  {compared ? <Check className="h-3.5 w-3.5" /> : <Scale className="h-3.5 w-3.5" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
