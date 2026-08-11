'use client';

import React, { useState } from 'react';
import { BrainCircuit, Check, X, ChevronDown, ChevronUp, Zap, ShieldAlert } from 'lucide-react';
import { AIMatchMetadata } from '../../types/index';

interface AIExplanationCardProps {
  aiMatch: AIMatchMetadata;
  productName?: string;
  compact?: boolean;
}

export default function AIExplanationCard({
  aiMatch,
  productName = 'this product',
  compact = false,
}: AIExplanationCardProps) {

  const [expanded, setExpanded] = useState(!compact);

  const getScoreConfig = (score: number) => {
    if (score >= 90) return { label: 'Excellent Match', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500' };
    if (score >= 75) return { label: 'Strong Match', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200', bar: 'bg-indigo-500' };
    if (score >= 60) return { label: 'Good Match', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500' };
    return { label: 'Partial Match', color: 'text-zinc-600', bg: 'bg-zinc-50', border: 'border-zinc-200', bar: 'bg-zinc-400' };
  };

  const config = getScoreConfig(aiMatch.score);

  return (
    <div className={`rounded-2xl border ${config.border} ${config.bg} overflow-hidden`}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-inherit">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-sm">
            <BrainCircuit className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">ShopWise AI Analysis</div>
            <div className={`text-sm font-extrabold ${config.color}`}>
              {aiMatch.score}% — {config.label}
            </div>
          </div>
        </div>

        {/* Score Donut */}
        <div className="relative h-12 w-12 flex items-center justify-center">
          <svg className="absolute inset-0" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="15.9" stroke="currentColor" strokeWidth="3" className="text-zinc-200" />
            <circle
              cx="18" cy="18" r="15.9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${aiMatch.score} ${100 - aiMatch.score}`}
              strokeDashoffset="25"
              className={
                aiMatch.score >= 90 ? 'text-emerald-500' :
                aiMatch.score >= 75 ? 'text-indigo-500' :
                aiMatch.score >= 60 ? 'text-amber-500' : 'text-zinc-400'
              }
              style={{ transition: 'stroke-dasharray 0.8s ease' }}
            />
          </svg>
          <span className={`text-xs font-black ${config.color}`}>{aiMatch.score}</span>
        </div>

        {compact && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
          >
            {expanded ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
          </button>
        )}
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      {expanded && (
        <div className="px-4 py-4 space-y-4">

          {/* Efficiency Badge */}
          {aiMatch.efficiencyBadge && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100/70 rounded-lg px-3 py-1.5 w-fit">
              <Zap className="h-3.5 w-3.5" />
              {aiMatch.efficiencyBadge} Certified
            </div>
          )}

          {/* Why It Matches */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              Why AI recommends this
            </h4>
            <p className="text-sm text-zinc-700 leading-relaxed">{aiMatch.whyMatches}</p>
          </div>

          {/* Key Strengths */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Key Strengths
            </h4>
            <ul className="space-y-1.5">
              {aiMatch.keyStrengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-zinc-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Potential Drawback */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Potential Drawback
              </h4>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">{aiMatch.potentialDrawback}</p>
          </div>

          {/* AI Transparency Footer */}
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 pt-1 border-t border-black/5">
            <BrainCircuit className="h-3 w-3" />
            <span>AI score is based on your saved preferences, product specs, and review analysis. Not a paid ranking.</span>
          </div>
        </div>
      )}
    </div>
  );
}
