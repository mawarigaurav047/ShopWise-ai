'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/index';
import { Category } from '../../types/index';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  initialProducts: Product[];
  categories?: Category[];
  selectedCategorySlug?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  initialProducts,
  categories = [],
  selectedCategorySlug = 'all',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategorySlug);
  const [sortBy, setSortBy] = useState<string>('featured');

  const processedProducts = useMemo(() => {
    let result = [...initialProducts];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'ai-score') return b.aiMatch.score - a.aiMatch.score;
      // Default: featured first
      return a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1;
    });

    return result;
  }, [initialProducts, activeCategory, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters and Sorting Controls bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-5">
        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              activeCategory === 'all'
                ? 'bg-zinc-950 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat.slug
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium outline-none focus:border-indigo-500"
          >
            <option value="featured">Featured</option>
            <option value="ai-score">AI Score (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {processedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SlidersHorizontal className="h-10 w-10 text-zinc-300 animate-pulse" />
          <h3 className="mt-4 text-sm font-semibold text-zinc-950">No products found</h3>
          <p className="mt-1 text-xs text-zinc-500">Try changing your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};
