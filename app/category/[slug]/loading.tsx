import { ProductGridSkeleton } from '@/components/ui/ProductCardSkeleton';

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 bg-zinc-200 rounded animate-pulse" />
        <div className="h-8 w-48 bg-zinc-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block space-y-4">
          <div className="h-80 w-full bg-zinc-200 rounded-2xl animate-pulse" />
        </div>
        <div className="lg:col-span-3">
          <ProductGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}
