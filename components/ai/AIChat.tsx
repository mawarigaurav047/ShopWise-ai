'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Send, X, BrainCircuit, Scale, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/index';
import { getDynamicRecommendations } from '../../utils/mockAiSearch';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  recommendations?: Product[];
  timestamp: string;
}


export const AIChat: React.FC = () => {
  const { toggleCompare, isCompared } = useShop();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! 👋 I'm your ShopWise AI Copilot. Ask me for product recommendations — e.g. \"Best AC under ₹45,000\".",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));
    const recs = getDynamicRecommendations(text);
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: recs.length > 0
        ? `Found ${recs.length} great match${recs.length > 1 ? 'es' : ''} for you!`
        : `I couldn't find exact matches for "${text}". Try browsing our full catalog.`,
      recommendations: recs,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-xl hover:scale-105 hover:shadow-indigo-500/40 transition-all duration-300"
        title="Open AI Copilot"
      >
        <Sparkles className="h-6 w-6 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex h-[500px] w-96 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <BrainCircuit className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide">ShopWise AI Copilot</h3>
            <span className="text-[10px] opacity-85">Personal Shopping Assistant</span>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-zinc-800 border border-zinc-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>

            {msg.recommendations && (
              <div className="mt-2 w-full space-y-2">
                {msg.recommendations.map((p) => {
                  const compared = isCompared(p.id);
                  return (
                    <div key={p.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-2">
                      <Link href={`/products/${p.id}`} onClick={() => setOpen(false)} className="flex items-center gap-2 flex-1">
                        <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover bg-zinc-50" />
                        <div className="text-[11px] leading-tight">
                          <span className="font-semibold text-zinc-950 line-clamp-1">{p.name}</span>
                          <span className="text-zinc-500 block">₹{p.price.toLocaleString('en-IN')}</span>
                        </div>
                      </Link>
                      <button
                        onClick={() => toggleCompare(p)}
                        className={`rounded-lg p-1.5 border transition-colors ${
                          compared ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'border-zinc-200 text-zinc-500 hover:text-indigo-600 hover:bg-zinc-50'
                        }`}
                        title={compared ? 'In compare list' : 'Add to compare'}
                      >
                        {compared ? <Check className="h-3.5 w-3.5" /> : <Scale className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <span className="mt-1 text-[9px] text-zinc-400 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start">
            <div className="rounded-2xl rounded-bl-none border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-zinc-200 bg-white p-3 flex gap-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border border-zinc-200 px-3.5 py-2 text-xs outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
