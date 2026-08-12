'use client';

import React from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
  MapPin,
  Globe,
  AtSign,
  MessageCircle,
  Rss,
  Menu,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const helpLinks = [
  { label: 'Returns & Refunds', icon: RotateCcw },
  { label: 'Warranty Information', icon: ShieldCheck },
  { label: 'Shipping & Delivery', icon: Truck },
  { label: 'Track Order', icon: MapPin },
];

const navLinks = ['Categories', 'Deals', 'Sale', 'Partners', 'News', 'About Us', 'Contacts'];

export function StorefrontHeader() {
  const { cartCount } = useShop();

  return (
    <header className="sticky top-0 z-50">
      {/* ── Announcement / Help bar ─────────────────────────────── */}
      <div className="hidden bg-slate-900 text-slate-300 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-5">
            {helpLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-1.5 transition-colors hover:text-orange-400"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+12345678900" className="flex items-center gap-1.5 font-semibold text-white hover:text-orange-400">
              <Phone className="h-3.5 w-3.5" />
              +1 (234) 567 89 00
            </a>
            <span className="h-4 w-px bg-slate-700" />
            <div className="flex items-center gap-3">
              {[Globe, AtSign, MessageCircle, Rss].map((Icon, i) => (
                <a key={i} href="#" className="transition-colors hover:text-orange-400" aria-label="social link">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ─────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          {/* Logo */}
          <Link href="/storefront" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-lg font-black text-white">
              V
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Volt<span className="text-orange-500">Gear</span>
            </span>
          </Link>

          {/* Search */}
          <div className="relative hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search for headphones, keyboards, monitors…"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-orange-600" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-orange-600" aria-label="Account">
              <User className="h-5 w-5" />
            </button>
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-orange-600"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Nav links */}
        <nav className="border-t border-slate-100">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-6">
            <button className="flex items-center gap-2 py-3 pr-6 text-sm font-bold text-slate-900 lg:hidden">
              <Menu className="h-4 w-4" /> Menu
            </button>
            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:text-orange-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default StorefrontHeader;
