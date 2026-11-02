import React from 'react';
import { LOGO_IMAGE_PATH, STORE_PHONE, STORE_LOCATION, STORE_HOURS } from '../data/products';
import { Phone, MapPin, Clock, MessageCircle, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLocation: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLocation, onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs relative">
      {/* Signature Danfo Stripe Accent Bar */}
      <div className="danfo-stripe-bar h-2 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-amber-400">
                <img src={LOGO_IMAGE_PATH} alt="Polo Vista Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-lg font-black font-display text-white uppercase block leading-tight">
                  Polo Vista
                </span>
                <span className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase">
                  Clothes Store
                </span>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Nigeria’s trusted wholesale hub for streetwear hoodies, heavyweight fleece joggers, cargo sweatpants, and stylish 2-piece sets. Physical pickup in Yaba, Lagos with nationwide waybill delivery.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Wholesale Categories
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Joggers & Cargos');
                    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Cargos & Baggy Sweatpants
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('2-Piece Sets');
                    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  2-Piece Co-ord Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Streetwear Tees');
                    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Graphic Tees & Jerseys
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Wholesale Bundles');
                    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Bales & Bundle Offers (₦25k / ₦50k)
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Visiting */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Showroom & Pickup
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_LOCATION}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_HOURS}</span>
              </div>
              <div className="pt-1">
                <button
                  onClick={onOpenLocation}
                  className="text-amber-400 hover:text-amber-300 font-bold underline"
                >
                  View Driving Directions & Landmarks
                </button>
              </div>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Direct Orders
            </h4>
            <div className="space-y-3">
              <a
                href={`tel:${STORE_PHONE}`}
                className="flex items-center gap-2.5 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: {STORE_PHONE}</span>
              </a>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Wholesale Minimum: 6 pieces per style, or 1/2 bale bundle. In-person inspection and pickup available at our Yaba shop.
              </p>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600">
          <p>© {new Date().getFullYear()} Polo Vista Clothes Store. All rights reserved. Yaba, Lagos, Nigeria.</p>
          <p className="text-[11px]">Direct Factory Wholesale Streetwear & Loungewear Distribution</p>
        </div>
      </div>
    </footer>
  );
};
