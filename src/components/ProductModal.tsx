import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatNaira, getWhatsAppUrl, generateWhatsAppMessage } from '../utils/helpers';
import { X, Plus, Minus, ShoppingBag, MessageCircle, Check, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('Mixed (Wholesale)');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');

  // Sync state whenever product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Mixed (Wholesale)');
      setSelectedColor(product.colors[0] || 'Default');
      setQuantity(1);
      setActiveImage(product.image);
    }
  }, [product]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const minQty = 1;
  const totalPrice = product.pricePerPiece * quantity;
  
  // Reseller profit projection estimation (street price ~ ₦8,000 - ₦10,000 per piece)
  const estimatedRetailPrice = Math.round(product.pricePerPiece * 1.7);
  const estimatedTotalResale = estimatedRetailPrice * quantity;
  const estimatedProfit = estimatedTotalResale - totalPrice;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(minQty, prev - 1));

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const singleItemCart = [{
      cartItemId: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      unitPrice: product.pricePerPiece,
      minQuantity: minQty
    }];
    const encoded = generateWhatsAppMessage(singleItemCart, {
      name: '',
      phone: '',
      deliveryMethod: 'pickup',
      stateOrAddress: 'To be confirmed',
      notes: 'Direct inquiry from product page'
    });
    window.open(getWhatsAppUrl(encoded), '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-zinc-100 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/70 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close product popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Imagery Showcase */}
          <div className="md:w-1/2 bg-zinc-950 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-zinc-800">
            <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-contain md:object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-amber-400 text-zinc-950 text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto w-full py-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img ? 'border-amber-400 scale-105' : 'border-zinc-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Fabric specification tag */}
            <div className="w-full mt-4 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
              <span className="font-medium text-zinc-300">Fabric Grade:</span>
              <span className="text-amber-400 font-semibold">{product.fabric}</span>
            </div>
          </div>

          {/* Right: Customization Controls & Purchase */}
          <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col gap-5">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-1">
                {product.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Showcase */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">Wholesale Unit Price</span>
                <span className="text-2xl font-black text-amber-400 tabular-nums">
                  {formatNaira(product.pricePerPiece)}
                </span>
                <span className="text-xs text-zinc-500 ml-1">/ piece</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 block">Total for {quantity} pcs</span>
                <span className="text-xl font-bold text-white tabular-nums">
                  {formatNaira(totalPrice)}
                </span>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-zinc-300">Select Size:</span>
                <span className="text-amber-400 text-[11px]">Mixed bundle recommended for resellers</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold shadow-md'
                        : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Variant Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-zinc-300">Select Color / Option:</span>
                <span className="text-zinc-400 text-[11px] font-mono">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedColor === color
                        ? 'bg-zinc-100 text-zinc-950 border-white font-bold shadow-sm'
                        : 'bg-zinc-800/70 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    {selectedColor === color && <Check className="w-3 h-3 text-zinc-950" />}
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Presets */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-zinc-300">Quantity (Pieces):</span>
                <span className="text-xs text-amber-400 font-medium">
                  {quantity >= 6 ? 'Bulk Wholesale Tier Applied' : 'Single / Retail Unit'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-950 border border-zinc-700 rounded-lg p-1">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setQuantity(isNaN(val) || val < 1 ? 1 : val);
                    }}
                    className="w-14 text-center font-bold text-base tabular-nums text-white bg-transparent focus:outline-none"
                    aria-label="Enter quantity"
                  />
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 flex-1">
                  {[
                    { label: '1 Pc', qty: 1 },
                    { label: '3 Pcs', qty: 3 },
                    { label: '6 Pcs', qty: 6 },
                    { label: '12 Pcs', qty: 12 },
                    { label: '24 Pcs', qty: 24 },
                  ].map((preset) => (
                    <button
                      key={preset.qty}
                      type="button"
                      onClick={() => setQuantity(preset.qty)}
                      className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                        quantity === preset.qty
                          ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold shadow-sm'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reseller Profit Margin Projection */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2.5">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-white block">Flexible Ordering:</span>
                <span className="text-zinc-400">
                  Buy as little as <strong className="text-zinc-200">1 piece</strong> to test quality, or order 6+ pieces for bulk reselling.
                  {quantity >= 6 && (
                    <span className="block mt-1 text-emerald-400">
                      Est. resale margin on {quantity} pcs: +{formatNaira(estimatedProfit)}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-zinc-800">
              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-zinc-950 font-black text-sm transition-all shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity} {quantity === 1 ? 'Piece' : 'Pieces'} to Bag • {formatNaira(totalPrice)}</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 hover:text-emerald-300 font-semibold text-xs transition-colors border border-zinc-700 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick Inquiry via WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
