import React from 'react';
import { STORE_PHONE, STORE_PHONE_INTL } from '../data/products';
import { Package, Phone, MessageCircle, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface WholesaleBannerProps {
  onAddBundle: (bundleType: 'full' | 'half') => void;
  onOpenLocation: () => void;
}

export const WholesaleBanner: React.FC<WholesaleBannerProps> = ({
  onAddBundle,
  onOpenLocation,
}) => {
  return (
    <section className="py-10 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
      {/* Danfo Lagos Top Stripe */}
      <div className="danfo-stripe absolute top-0 left-0 right-0 h-1.5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-400/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual poster from chat image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-xl overflow-hidden border-2 border-amber-400/50 shadow-2xl max-w-sm w-full bg-zinc-950">
                <img
                  src="/assets/aistudio/2026-11-02-132023_a7a574b2.png"
                  alt="Wholesale Sweatpants Price List Yaba Lagos"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-amber-400 text-zinc-950 font-black text-[11px] px-2 py-0.5 rounded shadow">
                  ORIGINAL YABA PRICING
                </div>
              </div>
            </div>

            {/* Price Details & Direct Add */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-black text-amber-400">
                  Wholesale Bale & Bundle Headquarters
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                  Bulk Joggers & Sweatpants Bundle
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                  Direct stock from our Yaba Lagos physical warehouse. Mixed size run (S to XXL) and 10 assorted colors (Black, Grey, Red, Navy, Beige, White) ready for immediate boutique resale.
                </p>
              </div>

              {/* Wholesale Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-amber-400/50 transition-colors flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">FULL BUNDLE BALE</span>
                      <span className="text-[11px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">
                        Best Value
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white mt-1 tabular-nums">
                      ₦50,000 <span className="text-xs font-normal text-zinc-400">/ bale</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Approx. 24 pieces assorted colors & sizes (₦2,083/piece unit cost).
                    </p>
                  </div>
                  <button
                    onClick={() => onAddBundle('full')}
                    className="w-full py-2.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Add Full Bundle (₦50,000)</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-amber-400/50 transition-colors flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">HALF BUNDLE STARTER</span>
                      <span className="text-[11px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                        Reseller Starter
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white mt-1 tabular-nums">
                      ₦25,000 <span className="text-xs font-normal text-zinc-400">/ half bale</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      12 pieces assorted colors & mixed sizes (₦2,083/piece unit cost).
                    </p>
                  </div>
                  <button
                    onClick={() => onAddBundle('half')}
                    className="w-full py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 border border-zinc-600"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Add Half Bundle (₦25,000)</span>
                  </button>
                </div>
              </div>

              {/* Contact & Store Points */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                <button
                  onClick={onOpenLocation}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold underline decoration-zinc-600">Pickup Shop @ Yaba, Lagos</span>
                </button>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <a
                  href={`tel:${STORE_PHONE}`}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call to Order: <strong className="text-white">{STORE_PHONE}</strong></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
