"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Check,
  Trophy,
  DollarSign,
  Zap,
  Loader2,
  BrainCircuit,
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";

function AIShoppingContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [userQuery, setUserQuery] = useState(
    initialQuery || "I need an inverter AC or refrigerator under ₹40,000"
  );

  // UI States
  const [maxBudget, setMaxBudget] = useState(45000);
  const [efficiencyPriority, setEfficiencyPriority] = useState<"Low" | "Medium" | "High" | "Very High">("Very High");
  const [selectedPriority, setSelectedPriority] = useState<"Lowest Price" | "Energy Efficiency" | "Best Brand" | "Warranty">("Energy Efficiency");

  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rankedProducts, setRankedProducts] = useState<Product[]>([]);

  const fetchSemanticMatches = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    try {
      setLoading(true);
      setHasSearched(true);

      // Auto-adjust budget slider if detected in prompt
      const match = q.toLowerCase().match(/under\s*(?:₹|rs\.?)?\s*(\d+)(k?)/);
      if (match) {
        let val = parseInt(match[1], 10);
        if (match[2] === 'k') val *= 1000;
        if (val < 1000) val *= 1000;
        setMaxBudget(val);
      }

      const guestId = typeof window !== 'undefined' ? localStorage.getItem('guest_user_id') || 'guest_session' : 'guest_session';
      const res = await fetch(`/api/products?query=${encodeURIComponent(q)}&limit=3`, {
        headers: {
          'x-user-id': guestId,
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setRankedProducts(json.data);
        } else {
          setRankedProducts([]);
        }
      } else {
        setRankedProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch semantic matches from database API:", err);
      setRankedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search automatically if a query parameter exists in the URL
  useEffect(() => {
    if (initialQuery) {
      fetchSemanticMatches(initialQuery);
    }
  }, [initialQuery]);

  const handleRunAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    fetchSemanticMatches(userQuery);
  };

  const bestMatch = rankedProducts[0] || null;
  const bestValue = rankedProducts[1] || null;
  const bestEfficiency = rankedProducts[2] || null;

  // Helper to ensure whyMatches is rendered as an array of items
  const getWhyMatchesList = (why: string | string[] | undefined): string[] => {
    if (Array.isArray(why)) return why;
    if (typeof why === "string" && why.trim().length > 0) return [why];
    return [];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* HERO / QUESTIONNAIRE */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Shopping Assistant · pgvector Powered</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold">
            Tell me what you&apos;re looking for.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            I understand natural language budgets, categories, and use-cases using PostgreSQL vector embeddings.
          </p>
        </div>

        {/* Input prompt */}
        <form onSubmit={handleRunAI} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Describe your requirements
            </label>
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g. I need a laptop under 90000 for coding and long battery..."
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. What&apos;s most important?
              </label>
              <div className="flex flex-wrap gap-2">
                {(["Lowest Price", "Energy Efficiency", "Best Brand", "Warranty"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedPriority(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedPriority === item
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. Max Budget
                </label>
                <span className="text-sm font-bold text-indigo-300">
                  ₹{maxBudget.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={20000}
                max={150000}
                step={5000}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                4. Energy Efficiency
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(["Low", "Medium", "High", "Very High"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setEfficiencyPriority(level)}
                    className={`py-1.5 rounded-lg text-[11px] font-bold border ${
                      efficiencyPriority === level
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-white/5 border-white/10 text-slate-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span>
                <strong className="text-white">Budget:</strong> ₹{maxBudget.toLocaleString("en-IN")}
              </span>
              <span>
                <strong className="text-white">Priority:</strong> {selectedPriority}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-75 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching PostgreSQL Vectors...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Find My Best Match</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="space-y-8 animate-pulse">
          <div className="p-6 rounded-3xl bg-indigo-50/80 border border-indigo-200 flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white animate-bounce">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Running 768-dimensional Vector Similarity Search...
              </h3>
              <p className="text-xs text-slate-500">
                Scanning product embeddings in PostgreSQL database using cosine distance (<code className="text-indigo-600">&lt;=&gt;</code>).
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-100 border border-zinc-200 h-80 rounded-2xl" />
        </div>
      )}

      {/* AI RECOMMENDATION RESULTS */}
      {!loading && hasSearched && (
        <div className="space-y-10">
          <div className="border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              ✨ Ranked Semantic Matches ({rankedProducts.length} Found)
            </h2>
            <p className="text-sm text-slate-500">
              Vector-evaluated from database for: &ldquo;{userQuery}&rdquo;
            </p>
          </div>

          {rankedProducts.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border text-center text-slate-600">
              No products found matching &ldquo;{userQuery}&rdquo;. Try searching for &quot;laptop&quot;, &quot;AC&quot;, &quot;TV&quot;, or &quot;refrigerator&quot;.
            </div>
          ) : (
            <>
              {bestMatch && (
                <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/60 border-2 border-indigo-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>🥇 #1 Best Overall Match ({bestMatch.aiMatch?.score ?? 96}% Confidence)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-5">
                      <ProductCard product={bestMatch} showAIExplanation={true} />
                    </div>

                    <div className="md:col-span-7 space-y-4">
                      <h3 className="text-xl font-bold text-slate-900">
                        Why {bestMatch.name} won 1st place:
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {getWhyMatchesList(bestMatch.aiMatch?.whyMatches).map((reason, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>

                      {bestMatch.aiMatch?.potentialDrawback && (
                        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900">
                          <span className="font-bold">⚠ Potential drawback: </span>
                          <span>{bestMatch.aiMatch.potentialDrawback}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary & Tertiary Recommendations - Strictly Conditionally Rendered */}
              {(bestValue || bestEfficiency) && (
                <div
                  className={`grid gap-6 ${
                    bestValue && bestEfficiency
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1 max-w-xl'
                  }`}
                >
                  {bestValue && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span>🥈 #2 Alternative Pick ({bestValue.aiMatch?.score ?? 90}% Match)</span>
                      </div>
                      <ProductCard product={bestValue} showAIExplanation={true} />
                    </div>
                  )}

                  {bestEfficiency && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                        <Zap className="w-5 h-5 text-indigo-600" />
                        <span>🥉 #3 Semantic Match ({bestEfficiency.aiMatch?.score ?? 85}% Match)</span>
                      </div>
                      <ProductCard product={bestEfficiency} showAIExplanation={true} />
                    </div>
                  )}
                </div>
              )}

            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function AIShoppingAssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-semibold text-slate-500">
          Loading AI Assistant...
        </div>
      }
    >
      <AIShoppingContent />
    </Suspense>
  );
}
