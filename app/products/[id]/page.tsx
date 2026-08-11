'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, ShoppingCart, Heart, Scale, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../../../types/index';
import { useShop } from '../../../context/ShopContext';
import AIExplanationCard from '../../../components/ai/AIExplanationCard';
import { ProductDetailSkeleton } from '../../../components/ui/ProductCardSkeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isCompared } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function loadProductDetail() {
      try {
        setLoading(true);
        setNotFound(false);
        const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setProduct(json.data);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadProductDetail();
  }, [id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (notFound || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900">Product not found</h1>
        <p className="text-sm text-zinc-500">The product you are looking for does not exist in our catalog.</p>
        <Link href="/" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);
  const images = (product.images && product.images.length > 0) ? product.images : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-indigo-600 capitalize">
          {product.category ? product.category.replace('-', ' ') : 'Category'}
        </Link>
        <span>/</span>
        <span className="text-zinc-800 font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ── Image Gallery ─────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200">
            <img
              src={images[activeImage] || product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
                {product.discount}% OFF
              </span>
            )}
            {product.aiMatch?.efficiencyBadge && (
              <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                🌿 {product.aiMatch.efficiencyBadge}
              </span>
            )}
          </div>

          {/* Thumbnail row */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-20 w-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === index ? 'border-indigo-600 scale-95 shadow-md' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info & Actions ────────────────────────────────────────── */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-1 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-2.5">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg text-amber-700 font-bold text-xs">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-zinc-500 font-medium">{product.reviewCount.toLocaleString('en-IN')} verified customer reviews</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-zinc-950">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <span className="text-base text-zinc-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <div className="text-xs text-emerald-600 font-semibold">
              Inclusive of all taxes · Free standard delivery
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-600 leading-relaxed">{product.description}</p>

          {/* Add to Cart & Buy CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-zinc-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 font-bold text-sm"
                >
                  −
                </button>
                <span className="px-3 py-2 text-sm font-bold text-zinc-800 min-w-[2.5rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-zinc-600 hover:bg-zinc-100 font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>

            {/* Wishlist and Compare */}
            <div className="flex gap-3">
              <button
                onClick={() => toggleWishlist(product)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                }`}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? 'fill-rose-600' : ''}`} />
                {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </button>

              <button
                onClick={() => toggleCompare(product)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                  compared
                    ? 'bg-orange-50 border-orange-300 text-orange-600'
                    : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                }`}
              >
                {compared ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
                {compared ? 'In Compare List' : 'Compare Product'}
              </button>
            </div>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 text-center">
            <div className="p-3 bg-zinc-50 rounded-xl space-y-1">
              <ShieldCheck className="h-4 w-4 text-indigo-600 mx-auto" />
              <div className="text-[11px] font-bold text-zinc-800">Genuine Warranty</div>
              <div className="text-[10px] text-zinc-400">Direct from Brand</div>
            </div>
            <div className="p-3 bg-zinc-50 rounded-xl space-y-1">
              <Truck className="h-4 w-4 text-emerald-600 mx-auto" />
              <div className="text-[11px] font-bold text-zinc-800">Free Delivery</div>
              <div className="text-[10px] text-zinc-400">In 2–4 business days</div>
            </div>
            <div className="p-3 bg-zinc-50 rounded-xl space-y-1">
              <RotateCcw className="h-4 w-4 text-amber-600 mx-auto" />
              <div className="text-[11px] font-bold text-zinc-800">7 Days Return</div>
              <div className="text-[10px] text-zinc-400">Hassle-free replacement</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI EXPLANABILITY & INSIGHTS ──────────────────────────────────── */}
      {product.aiMatch && (
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-zinc-900">Explainable AI Analysis</h2>
          <AIExplanationCard aiMatch={product.aiMatch} productName={product.name} />
        </section>
      )}


      {/* ── SPECIFICATIONS TABLE ─────────────────────────────────────────── */}
      {product.specs && product.specs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-zinc-900">Technical Specifications</h2>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <div className="divide-y divide-zinc-100">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 p-4 text-sm ${i % 2 === 0 ? 'bg-zinc-50/50' : 'bg-white'}`}
                >
                  <span className="font-semibold text-zinc-500">{spec.label}</span>
                  <span className="col-span-2 text-zinc-800 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
