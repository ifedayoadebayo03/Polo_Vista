import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../data/products';
import { Search, ArrowUpDown, X } from 'lucide-react';

interface ShopFiltersProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'name') => void;
  totalResults: number;
}

export const ShopFilters: React.FC<ShopFiltersProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-zinc-800">
      {/* Top row: Search and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search joggers, cargos, 2-piece sets, colors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-400 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select & Result Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs text-zinc-400 font-mono">
            {totalResults} {totalResults === 1 ? 'item' : 'items'}
          </span>

          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured" className="bg-zinc-900 text-zinc-100">Featured</option>
              <option value="price-asc" className="bg-zinc-900 text-zinc-100">Price: Low to High</option>
              <option value="price-desc" className="bg-zinc-900 text-zinc-100">Price: High to Low</option>
              <option value="name" className="bg-zinc-900 text-zinc-100">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs (Interactive filter control - buttons allowed per skill §1.A) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === category
                ? 'bg-amber-400 text-zinc-950 font-black shadow-sm'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
