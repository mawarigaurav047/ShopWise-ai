import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Wireless & Wired Headphones', image: '/storefront/cat-headphones.png' },
  { name: 'Mechanical Keyboards', image: '/storefront/cat-keyboard.png' },
  { name: 'Optical and Laser Mice', image: '/storefront/cat-mouse.png' },
  { name: 'High-Resolution Monitors', image: '/storefront/cat-monitor.png' },
];

export function StorefrontHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        {/* Split hero */}
        <div className="grid items-center gap-8 rounded-3xl bg-slate-50 p-8 lg:grid-cols-2 lg:p-14">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-600">
              Up to 50% off
            </span>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 text-balance lg:text-5xl">
              Take Your Gadgets to the Next Level!
            </h1>
            <p className="max-w-md text-base leading-relaxed text-slate-600 text-pretty">
              Discover the latest tech innovations — from studio-grade audio to
              high-refresh displays. Upgrade your setup today with discounts up to
              50% off across our best-selling gear.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#bestsellers"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-orange-500 px-7 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-300 active:scale-[0.98]"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 text-sm font-bold text-slate-800 transition-all duration-300 hover:border-orange-300 hover:text-orange-600">
                <Play className="h-4 w-4 fill-current" />
                Watch Video
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/storefront/hero-gadgets.png"
                alt="A collection of premium tech gadgets including headphones, a keyboard, and a mouse"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Category indicator cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#bestsellers"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                <img
                  src={cat.image || '/placeholder.svg'}
                  alt={cat.name}
                  className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-snug text-slate-900 text-pretty group-hover:text-orange-600">
                  {cat.name}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-orange-500">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StorefrontHero;
