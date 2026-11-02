import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, ToastNotification, Category } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { FloatingBagButton } from './components/FloatingBagButton';
import { BagDrawer } from './components/BagDrawer';
import { WholesaleBanner } from './components/WholesaleBanner';
import { ShopFilters } from './components/ShopFilters';
import { YabaLocationModal } from './components/YabaLocationModal';
import { Footer } from './components/Footer';

export default function App() {
  // Cart State (with localStorage persistence)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('polovista_wholesale_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  
  // Feedback state for floating button and toast
  const [bumpTrigger, setBumpTrigger] = useState(0);
  const [latestToast, setLatestToast] = useState<ToastNotification | null>(null);

  // Filter & Search state
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('polovista_wholesale_cart', JSON.stringify(cart));
    } catch (err) {
      console.warn('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  // Total quantity of pieces across all items
  const totalCartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Add to Bag with Toast and Bump Feedback
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => {
    const effectiveColor = color || product.colors[0] || 'Standard';
    const effectiveSize = size || product.sizes[0] || 'Mixed (Wholesale)';
    const cartItemId = `${product.id}-${effectiveSize}-${effectiveColor}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prevCart,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          size: effectiveSize,
          color: effectiveColor,
          quantity,
          unitPrice: product.pricePerPiece,
          minQuantity: 1,
        },
      ];
    });

    // Trigger floating bag button bump and toast
    setBumpTrigger((prev) => prev + 1);
    const toastId = Math.random().toString(36).substring(2, 9);
    setLatestToast({
      id: toastId,
      message: `Added: ${product.name}`,
      productName: product.name,
      quantity,
      timestamp: Date.now(),
    });

    // Auto-dismiss toast after 3 seconds
    setTimeout(() => {
      setLatestToast((current) => (current?.id === toastId ? null : current));
    }, 3200);
  };

  // Quick Add 1 piece
  const handleQuickAdd = (product: Product) => {
    handleAddToCart(
      product,
      product.sizes[0] || 'Mixed (Wholesale)',
      product.colors[0] || 'Default',
      1
    );
  };

  // Add Full or Half Wholesale Bale from banner
  const handleAddBundle = (bundleType: 'full' | 'half') => {
    const bundleProduct = PRODUCTS.find((p) => p.id === 'bundle-special-sweatpants') || PRODUCTS[0];
    const qty = bundleType === 'full' ? 24 : 12;
    handleAddToCart(
      bundleProduct,
      'Mixed (Wholesale)',
      'Mixed Assorted',
      qty
    );
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter((product) => product.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q) ||
          product.colors.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerPiece - b.pricePerPiece);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerPiece - a.pricePerPiece);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Featured: items with badge or featured flag first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* Top Navigation */}
      <Header
        totalCartCount={totalCartCount}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat as Category)}
        activeCategory={activeCategory}
      />

      {/* Hero Section */}
      <Hero
        onExploreShop={() => {
          document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      {/* Official Wholesale Price & Bundle Highlight Banner */}
      <WholesaleBanner
        onAddBundle={handleAddBundle}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      {/* Main Shop / Products Section */}
      <main id="shop-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs uppercase tracking-widest font-black text-amber-400">
              Showroom Catalog
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Wholesale Streetwear & Apparel
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Select an item to choose exact sizes, colors, and the exact quantity you want (1 piece, small packs, or wholesale bales).
          </p>
        </div>

        {/* Filters, Search and Sorting */}
        <ShopFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 pt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onQuickAdd={(p) => handleQuickAdd(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <p className="text-zinc-400 text-sm mb-3">No products found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Product Customizer & Quick View Pop-up */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Bag Drawer (with WhatsApp Checkout) */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Bag Button (Appears when bag > 0, bumps on add, shows toast) */}
      <FloatingBagButton
        totalItems={totalCartCount}
        latestToast={latestToast}
        onOpenBag={() => setIsBagOpen(true)}
        bumpTrigger={bumpTrigger}
      />

      {/* Yaba Pickup Shop Directions & Info Modal */}
      <YabaLocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenLocation={() => setIsLocationOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat as Category)}
      />
    </div>
  );
}
