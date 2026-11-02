import React from 'react';
import { ArrowDown, MessageCircle, ShieldCheck, Truck, Store, Sparkles } from 'lucide-react';
import { STORE_PHONE, STORE_PHONE_INTL, LOGO_IMAGE_PATH } from '../data/products';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreShop: () => void;
  onOpenLocation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreShop, onOpenLocation }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-zinc-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start bg-zinc-900 border border-zinc-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Yaba Lagos Direct Factory Wholesale</span>
              <span className="text-zinc-600">·</span>
              <span className="text-amber-400 font-bold">New Batch In Stock</span>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight text-balance">
                High-Volume <span className="text-amber-400 underline decoration-amber-400/40 decoration-wavy decoration-2">Streetwear</span> & Bale Deals in Lagos.
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
                Direct wholesale supplier based in Yaba, Lagos. Source premium baggy sweatpants, utility cargos, trending two-piece co-ords, and heavyweight graphic tees with unbeatable profit margins for resellers.
              </p>
            </div>

            {/* Wholesale Price Box (from image) */}
            <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/90 border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg relative overflow-hidden">
              <div className="danfo-stripe-subtle absolute top-0 left-0 right-0 h-1.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Official Bundle Price List</span>
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                    ₦50,000 <span className="text-xs font-medium text-zinc-400">/ Full Bundle</span>
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-lg font-bold text-amber-300 tabular-nums">
                    ₦25,000 <span className="text-xs font-medium text-zinc-400">/ Half Bundle</span>
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Order any quantity — buy 1 piece or full bales.
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${STORE_PHONE_INTL}?text=${encodeURIComponent(
                    'Hello Polo Vista! I am interested in ordering your wholesale bundles from Yaba Lagos.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreShop}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Browse Products & Prices</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={onOpenLocation}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Store className="w-4 h-4 text-amber-400" />
                <span>Visit Yaba Pickup Shop</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-zinc-800/80 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Physical Yaba Lagos Shop</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Nationwide Waybill</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Single & Bulk Orders</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase using Real Photos */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Feature Card */}
              <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl p-3">
                <div className="danfo-stripe-bar h-2 w-full rounded-t" />
                
                <div className="relative aspect-4/3 rounded-xl overflow-hidden mt-2 bg-zinc-950">
                  <img
                    src="/assets/aistudio/2026-11-02-132023_a7a574b2.png"
                    alt="Polo Vista Wholesale Sweatpants Poster Yaba Lagos"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs uppercase font-bold text-amber-400 tracking-wider">Showroom Bestseller</p>
                      <p className="text-base font-bold">Wholesale Sweatpants Bale</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-400 text-zinc-950 font-black text-xs tabular-nums">
                      ₦50,000 / Bundle
                    </span>
                  </div>
                </div>

                {/* Sub-strip with thumbnails of other real pieces */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                    <img
                      src="/assets/aistudio/2026-11-02-131722_c54119bc.png"
                      alt="Danfo Yellow Star Trackpants"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 left-1 bg-zinc-950/80 px-1 py-0.5 rounded text-[10px] font-bold text-amber-400">
                      Star Pants
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                    <img
                      src="/assets/aistudio/2026-11-02-131802_6c5144b8.png"
                      alt="Chocolate Brown Cargo"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 left-1 bg-zinc-950/80 px-1 py-0.5 rounded text-[10px] font-bold text-amber-400">
                      Cargos
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                    <img
                      src="/assets/aistudio/2026-11-02-132046_c7a620ed.png"
                      alt="Queen 2-Piece Set"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 left-1 bg-zinc-950/80 px-1 py-0.5 rounded text-[10px] font-bold text-amber-400">
                      2-Piece Sets
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Verified Store Badge with Logo */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-5 -right-3 sm:-right-5 bg-zinc-900 border-2 border-amber-400 p-2.5 rounded-xl shadow-xl flex items-center gap-3 max-w-xs"
              >
                <div className="w-10 h-10 rounded-full bg-white p-0.5 shrink-0 overflow-hidden">
                  <img src={LOGO_IMAGE_PATH} alt="Polo Vista Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white uppercase">Pickup Shop @ Yaba</div>
                  <div className="text-[11px] text-zinc-400">Call {STORE_PHONE}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
