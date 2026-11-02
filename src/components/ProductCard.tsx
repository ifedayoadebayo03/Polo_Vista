import React from 'react';
import { Product } from '../types';
import { formatNaira } from '../utils/helpers';
import { Plus, Eye, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
}) => {
  return (
    <div className="group relative flex flex-col rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-lg">
      {/* Product Image Container (65-75% visual weight) */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-4/5 w-full bg-zinc-950 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge - Unboxed / Clean or Single text tag */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-zinc-950/90 text-amber-400 border border-amber-400/30 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
            {product.badge}
          </div>
        )}

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/40 backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-zinc-950 text-xs font-bold shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-all">
            <Eye className="w-3.5 h-3.5" />
            <span>Customize Size & Qty</span>
          </span>
        </div>

        {/* MOQ Tag bottom right */}
        <div className="absolute bottom-2.5 right-2.5 bg-zinc-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-zinc-800">
          MOQ: {product.minQuantity} pcs
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category & Material */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="uppercase tracking-wider font-semibold text-[11px] text-zinc-400">
            {product.category}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onSelectProduct(product)}
          className="text-sm sm:text-base font-bold text-white line-clamp-2 hover:text-amber-400 transition-colors cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Fabric description */}
        <p className="text-xs text-zinc-400 line-clamp-1">
          {product.fabric}
        </p>

        {/* Pricing Block */}
        <div className="mt-auto pt-2 border-t border-zinc-800/80 flex items-baseline justify-between">
          <div>
            <div className="text-base sm:text-lg font-black text-white tabular-nums">
              {formatNaira(product.pricePerPiece)}
              <span className="text-xs font-normal text-zinc-400 ml-1">/ piece</span>
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono">
              {product.bundlePrice ? (
                <span>Bundle: {formatNaira(product.bundlePrice)}</span>
              ) : (
                <span>Pack ({product.minQuantity} pcs): {formatNaira(product.wholesalePackPrice)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onQuickAdd(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-zinc-950 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-sm"
            title="Quick add mixed size pack"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>

          <button
            onClick={() => onSelectProduct(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Options</span>
          </button>
        </div>
      </div>
    </div>
  );
};
