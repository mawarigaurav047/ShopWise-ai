import React from 'react';
import type { Metadata } from 'next';
import { products } from '../../data/products';
import StorefrontHeader from '../../components/storefront/StorefrontHeader';
import StorefrontHero from '../../components/storefront/StorefrontHero';
import StorefrontProductCard from '../../components/storefront/StorefrontProductCard';
import StorefrontPromoBanner from '../../components/storefront/StorefrontPromoBanner';
import StorefrontFooter from '../../components/storefront/StorefrontFooter';

export const metadata: Metadata = {
  title: 'VoltGear — Premium Electronics & Gadgets Store',
  description:
    'Shop premium electronics and gadgets — headphones, mechanical keyboards, mice, and high-resolution monitors. Discounts up to 50% off, free shipping over $100.',
};

export default function StorefrontPage() {
  const bestsellers = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <StorefrontHeader />
      <StorefrontHero />

      {/* ── Bestsellers ─────────────────────────────────────────── */}
      <section id="bestsellers" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Top Picks
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 text-balance lg:text-4xl">
                Bestsellers & Featured Gear
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Our most-loved products, chosen by thousands of customers for
              quality, value, and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bestsellers.map((product) => (
              <StorefrontProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <StorefrontPromoBanner />
      <StorefrontFooter />
    </div>
  );
}
