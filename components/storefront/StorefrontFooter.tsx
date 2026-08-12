'use client';

import React, { useState } from 'react';
import { Send, Globe, AtSign, MessageCircle, Rss, Check } from 'lucide-react';

const footerColumns = [
  {
    title: 'Categories',
    links: ['Headphones', 'Keyboards', 'Mice', 'Monitors', 'Accessories'],
  },
  {
    title: 'Shop',
    links: ['Deals', 'Sale', 'New Arrivals', 'Bestsellers', 'Gift Cards'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Partners', 'News', 'Careers', 'Contacts'],
  },
  {
    title: 'Support',
    links: ['Returns & Refunds', 'Warranty', 'Shipping', 'Track Order', 'FAQ'],
  },
];

export function StorefrontFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 2500);
  };

  return (
    <footer className="border-t border-slate-200 bg-white">
      {/* Newsletter */}
      <div className="border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-900">
              Join the VoltGear newsletter
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Get early access to drops, deals, and tech tips. No spam.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
            <button
              type="submit"
              className={`flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-bold text-white transition-all duration-300 active:scale-[0.98] ${
                subscribed ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {subscribed ? (
                <>
                  <Check className="h-4 w-4" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-lg font-black text-white">
              V
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Volt<span className="text-orange-500">Gear</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            Premium electronics and gadgets for the modern setup. Curated gear,
            honest prices, fast delivery.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[Globe, AtSign, MessageCircle, Rss].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-orange-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-500 transition-colors hover:text-orange-600">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} VoltGear. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-orange-600">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600">Terms of Service</a>
            <a href="#" className="hover:text-orange-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default StorefrontFooter;
