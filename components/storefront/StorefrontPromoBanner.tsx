import React from 'react';
import { Truck, Tag, ArrowRight } from 'lucide-react';

export function StorefrontPromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 lg:px-14">
        {/* accent glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-2">
          {/* Free shipping */}
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <Truck className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white text-balance">
                Free Shipping on Orders Over $100
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Fast, tracked delivery to your door at no extra cost. Stock up on
                your favorite gear and let us handle the rest.
              </p>
            </div>
          </div>

          {/* Limited-time gear */}
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
              <Tag className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="text-2xl font-black tracking-tight text-white text-balance">
                Limited-Time Gear Discounts
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Selected accessories are marked down for a limited time only.
                Grab them before the deals expire.
              </p>
              <a
                href="#bestsellers"
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600 active:scale-[0.98]"
              >
                Shop the Sale
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorefrontPromoBanner;
