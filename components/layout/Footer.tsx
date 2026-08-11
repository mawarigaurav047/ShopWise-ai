import React from 'react';
import Link from 'next/link';
import { Sparkles, Globe, Share2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Info */}
          <div className="space-y-4 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
                ShopWise AI
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
              Empowering your smart shopping experience with artificial intelligence, live product comparisons, and real sentiment tracking.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Shop Catalog
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/category/audio" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                      Audio & Acoustics
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/laptops" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                      Computers & Laptops
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/wearables" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                      Wearables & Health
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/smart-home" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                      Smart Home & Living
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  AI Features
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/ai-shopping" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                      AI Shopper Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/compare" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                      Product Compare Engine
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                      Sentiment Analysis
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Company & Help
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                    About ShopWise
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} ShopWise AI Inc. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for AI-driven Commerce.
          </p>
        </div>
      </div>
    </footer>
  );
};
