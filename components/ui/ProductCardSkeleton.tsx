import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 animate-pulse space-y-3">
      <div className="aspect-[4/3] w-full rounded-xl bg-zinc-200" />
      <div className="flex justify-between items-center">
        <div className="h-3 w-16 bg-zinc-200 rounded" />
        <div className="h-3 w-12 bg-zinc-200 rounded" />
      </div>
      <div className="h-4 w-full bg-zinc-200 rounded" />
      <div className="h-4 w-3/4 bg-zinc-200 rounded" />
      <div className="h-6 w-1/3 bg-zinc-200 rounded mt-2" />
      <div className="flex gap-2 pt-2">
        <div className="h-9 flex-1 bg-zinc-200 rounded-xl" />
        <div className="h-9 w-9 bg-zinc-200 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-pulse">
      <div className="h-4 w-48 bg-zinc-200 rounded" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-zinc-200" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-zinc-200" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-4 w-24 bg-zinc-200 rounded" />
          <div className="h-8 w-3/4 bg-zinc-200 rounded" />
          <div className="h-4 w-36 bg-zinc-200 rounded" />
          <div className="h-10 w-44 bg-zinc-200 rounded" />
          <div className="h-20 w-full bg-zinc-200 rounded-xl" />
          <div className="flex gap-3">
            <div className="h-12 w-32 bg-zinc-200 rounded-xl" />
            <div className="h-12 flex-1 bg-zinc-200 rounded-xl" />
          </div>
          <div className="h-48 w-full bg-zinc-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
