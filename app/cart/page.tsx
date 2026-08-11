'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useShop();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const discount = couponApplied ? Math.floor(cartTotal * 0.1) : 0;
  const shipping = cartTotal > 50000 ? 0 : 299;
  const grandTotal = cartTotal - discount + shipping;

  const handleCoupon = () => {
    if (coupon.toUpperCase() === 'SHOPWISE10') setCouponApplied(true);
  };

  const handleOrder = () => {
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-5">
        <div className="flex h-20 w-20 items-center justify-center mx-auto rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-zinc-900">Order Placed! 🎉</h1>
        <p className="text-sm text-zinc-500">Thank you for shopping with ShopWise AI. Your order is being processed and will be delivered soon.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <ShoppingBag className="h-12 w-12 text-zinc-300 mx-auto" />
        <h1 className="text-xl font-bold text-zinc-800">Your cart is empty</h1>
        <p className="text-sm text-zinc-500">Browse our AI-curated product catalog and find the perfect match.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700"
        >
          <Sparkles className="h-4 w-4" /> Shop with AI
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-zinc-900">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 font-medium">Clear all</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Cart Items ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <Link href={`/products/${product.id}`} className="shrink-0">
                <img src={product.image} alt={product.name} className="h-20 w-20 object-cover rounded-xl border border-zinc-100 hover:opacity-90 transition-opacity" />
              </Link>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">{product.brand}</div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-sm font-bold text-zinc-800 hover:text-indigo-700 line-clamp-2 leading-snug">{product.name}</h3>
                </Link>
                <div className="text-sm font-extrabold text-zinc-950">₹{product.price.toLocaleString('en-IN')}</div>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                {/* Quantity Controls */}
                <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-2.5 py-1.5 hover:bg-zinc-100 text-zinc-600"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3 py-1.5 text-sm font-bold min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-2.5 py-1.5 hover:bg-zinc-100 text-zinc-600"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                {/* Subtotal */}
                <div className="text-sm font-extrabold text-indigo-700">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-zinc-300 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary ──────────────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-4 sticky top-20">
            <h2 className="text-base font-extrabold text-zinc-900">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-zinc-800">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon (SHOPWISE10)</span>
                  <span className="font-semibold">−₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span className={`font-semibold ${shipping === 0 ? 'text-emerald-600' : 'text-zinc-800'}`}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && <div className="text-[11px] text-zinc-400">Free shipping on orders above ₹50,000</div>}
              <div className="border-t border-zinc-200 pt-3 flex justify-between font-extrabold text-base text-zinc-950">
                <span>Total</span>
                <span className="text-indigo-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Coupon */}
            <div>
              <label className="text-xs font-semibold text-zinc-500 flex items-center gap-1 mb-1.5">
                <Tag className="h-3.5 w-3.5" /> Apply Coupon
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="SHOPWISE10"
                  className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  disabled={couponApplied}
                />
                <button
                  onClick={handleCoupon}
                  disabled={couponApplied || !coupon}
                  className="px-3 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && <div className="text-xs text-emerald-600 mt-1 font-medium">✓ 10% discount applied!</div>}
            </div>

            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md"
            >
              Place Order <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-center text-[11px] text-zinc-400">🔒 Secure checkout · No hidden charges</div>
          </div>
        </div>
      </div>
    </div>
  );
}
