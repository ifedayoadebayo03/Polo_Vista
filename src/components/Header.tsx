import React from 'react';
import { ShoppingBag, Phone, MapPin } from 'lucide-react';
import { LOGO_IMAGE_PATH, STORE_PHONE } from '../data/products';
import { motion } from 'motion/react';

interface HeaderProps {
  totalCartCount: number;
  onOpenBag: () => void;
  onOpenLocation: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  totalCartCount,
  onOpenBag,
  onOpenLocation,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 transition-all">
      {/* Danfo Lagos Ribbon Announcement Bar */}
      <div className="w-full bg-amber-400 text-zinc-950 text-xs font-semibold px-4 py-1.5 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-950 animate-ping inline-block" />
          <span className="uppercase tracking-wider font-bold">Polo Vista Wholesale Yaba Lagos</span>
          <span className="text-zinc-800" aria-hidden="true">•</span>
          <span className="hidden sm:inline">Bundle ₦50,000 / Half Bundle ₦25,000</span>
          <span className="text-zinc-800 hidden sm:inline" aria-hidden="true">•</span>
          <span className="hidden md:inline">Nationwide Delivery Across Nigeria</span>
        </div>
        <div className="flex items-center gap-4 text-xs shrink-0">
          <a
            href={`tel:${STORE_PHONE}`}
            className="flex items-center gap-1.5 hover:underline font-bold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call: {STORE_PHONE}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation - Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-amber-400 shrink-0 shadow-md transition-transform group-hover:scale-105">
            <img
              src={LOGO_IMAGE_PATH}
              alt="Polo Vista Clothes Store Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight font-display text-white uppercase leading-none">
              Polo Vista
            </span>
            <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase mt-0.5">
              Clothes Store • Yaba Wholesale
            </span>
          </div>
        </a>

        {/* Zone 2: Concise Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <button
            onClick={() => {
              onSelectCategory('All');
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            All Products
          </button>
          <button
            onClick={() => {
              onSelectCategory('Joggers & Cargos');
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Cargos & Sweatpants
          </button>
          <button
            onClick={() => {
              onSelectCategory('2-Piece Sets');
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            2-Piece Sets
          </button>
          <button
            onClick={() => {
              onSelectCategory('Wholesale Bundles');
              document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Wholesale Bales
          </button>
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Pickup Shop @ Yaba</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action - Cart / Bag */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBag}
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-white hover:text-amber-300 font-semibold text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label={`Open shopping bag with ${totalCartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Wholesale Bag</span>
            {totalCartCount > 0 ? (
              <motion.span
                key={totalCartCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="bg-amber-400 text-zinc-950 font-black text-xs px-2 py-0.5 rounded-full tabular-nums"
              >
                {totalCartCount}
              </motion.span>
            ) : (
              <span className="text-xs text-zinc-500 tabular-nums">0</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
