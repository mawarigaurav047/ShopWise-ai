'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, ShoppingCart, Plus, Scale, BrainCircuit, Check, X } from 'lucide-react';
import { Product } from '../../types/index';
import { useShop } from '../../context/ShopContext';

interface CompareTableProps {
  products: Product[];
}

export const CompareTable: React.FC<CompareTableProps> = ({ products }) => {
  const { addToCart, toggleCompare, clearCompare } = useShop();

  // Collect all unique spec labels across compared products
  const allSpecLabels = Array.from(
    new Set(products.flatMap((p) => p.specs.map((s) => s.label)))
  );

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
        <Scale className="h-12 w-12 text-zinc-300" />
        <h3 className="mt-4 text-base font-semibold text-zinc-950">Compare List is Empty</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Add up to 4 products to compare by clicking the ⚖ icon on any product card.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-950">
          Comparing {products.length} of 4 items
        </h2>
        <button
          onClick={clearCompare}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="w-48 p-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                Product Details
              </th>
              {products.map((product) => (
                <th key={product.id} className="p-4 relative bg-white">
                  <button
                    onClick={() => toggleCompare(product)}
                    className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
                    title="Remove from comparison"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex flex-col items-center text-center mt-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 rounded-lg object-cover shadow-sm mb-3 bg-zinc-100"
                    />
                    <Link
                      href={`/products/${product.id}`}
                      className="text-sm font-bold text-zinc-950 line-clamp-2 hover:text-indigo-600"
                    >
                      {product.name}
                    </Link>
                    <span className="mt-2 text-base font-extrabold text-indigo-600">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </th>
              ))}
              {Array.from({ length: Math.max(0, 4 - products.length) }).map((_, i) => (
                <th key={`empty-${i}`} className="p-4 text-center text-zinc-400 border-l border-zinc-100 bg-zinc-50/20">
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-zinc-300">
                      <Plus className="h-5 w-5" />
                    </div>
                    <span className="mt-2 text-xs font-medium">Add Product</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {/* AI Score Row */}
            <tr className="hover:bg-zinc-50/50">
              <td className="p-4 text-xs font-semibold text-zinc-600 bg-zinc-50/50">AI Match Score</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center font-bold">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50/50 px-2.5 py-1 text-xs text-indigo-700">
                    <BrainCircuit className="h-3.5 w-3.5" />
                    <span>{product.aiMatch.score} / 100</span>
                  </div>
                </td>
              ))}
              {Array.from({ length: 4 - products.length }).map((_, i) => (
                <td key={`empty-ai-${i}`} className="p-4 bg-zinc-50/10" />
              ))}
            </tr>

            {/* AI Drawback Row */}
            <tr className="hover:bg-zinc-50/50">
              <td className="p-4 text-xs font-semibold text-zinc-600 bg-zinc-50/50">Potential Drawback</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-xs text-amber-700 leading-relaxed italic">
                  {product.aiMatch.potentialDrawback}
                </td>
              ))}
              {Array.from({ length: 4 - products.length }).map((_, i) => (
                <td key={`empty-draw-${i}`} className="p-4 bg-zinc-50/10" />
              ))}
            </tr>

            {/* Key Strengths Row */}
            <tr className="hover:bg-zinc-50/50">
              <td className="p-4 text-xs font-semibold text-zinc-600 bg-zinc-50/50">Key Strengths</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-xs">
                  <ul className="space-y-1.5">
                    {product.aiMatch.keyStrengths.slice(0, 3).map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-emerald-700">
                        <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
              {Array.from({ length: 4 - products.length }).map((_, i) => (
                <td key={`empty-str-${i}`} className="p-4 bg-zinc-50/10" />
              ))}
            </tr>

            {/* Dynamic Specification Rows */}
            {allSpecLabels.slice(0, 10).map((label) => (
              <tr key={label} className="hover:bg-zinc-50/50">
                <td className="p-4 text-xs font-semibold text-zinc-600 bg-zinc-50/50">{label}</td>
                {products.map((product) => {
                  const val = product.specs.find((s) => s.label === label)?.value;
                  return (
                    <td key={product.id} className="p-4 text-xs text-zinc-800">
                      {val ?? <span className="text-zinc-400">—</span>}
                    </td>
                  );
                })}
                {Array.from({ length: 4 - products.length }).map((_, i) => (
                  <td key={`empty-spec-${label}-${i}`} className="p-4 bg-zinc-50/10" />
                ))}
              </tr>
            ))}

            {/* Actions Row */}
            <tr className="hover:bg-zinc-50/50">
              <td className="p-4 text-xs font-semibold text-zinc-600 bg-zinc-50/50">Add to Cart</td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </td>
              ))}
              {Array.from({ length: 4 - products.length }).map((_, i) => (
                <td key={`empty-cart-${i}`} className="p-4 bg-zinc-50/10" />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
