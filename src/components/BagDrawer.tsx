import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { formatNaira, generateWhatsAppMessage, getWhatsAppUrl } from '../utils/helpers';
import { STORE_PHONE, STORE_LOCATION } from '../data/products';
import { X, Trash2, Plus, Minus, MessageCircle, Phone, Copy, Check, MapPin, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;
    const encoded = generateWhatsAppMessage(cart, {
      name: customerName,
      phone: customerPhone,
      deliveryMethod,
      stateOrAddress: deliveryAddress,
      notes: orderNotes,
    });
    window.open(getWhatsAppUrl(encoded), '_blank');
  };

  const handleCopySummary = () => {
    if (cart.length === 0) return;
    const encoded = generateWhatsAppMessage(cart, {
      name: customerName,
      phone: customerPhone,
      deliveryMethod,
      stateOrAddress: deliveryAddress,
      notes: orderNotes,
    });
    const plainText = decodeURIComponent(encoded);
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        />

        {/* Slide-over panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 flex flex-col shadow-2xl text-zinc-100"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center font-black text-sm">
                  PV
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black font-display text-white">
                    Wholesale Bag
                  </h2>
                  <p className="text-xs text-zinc-400">
                    {totalQuantity} {totalQuantity === 1 ? 'piece' : 'pieces'} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-zinc-500 hover:text-red-400 transition-colors px-2 py-1"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close bag drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Line Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-zinc-800/80">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                  <div className="w-16 h-16 rounded-full bg-zinc-800/70 flex items-center justify-center text-amber-400 mb-3">
                    <X className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Your bag is empty</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mb-5">
                    Browse our Yaba wholesale store and add items in your preferred sizes and quantities.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold transition-all shadow-sm"
                  >
                    Start Browsing Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-3.5">
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.cartItemId)}
                              className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Size & Color Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-zinc-400">
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-medium">
                              Size: {item.size}
                            </span>
                            {item.color && (
                              <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 font-medium">
                                Color: {item.color}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-md p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded text-zinc-300 hover:bg-zinc-800 text-xs"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded text-zinc-300 hover:bg-zinc-800 text-xs"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-bold text-white tabular-nums">
                              {formatNaira(item.unitPrice * item.quantity)}
                            </div>
                            <div className="text-[10px] text-zinc-500 font-mono">
                              ({formatNaira(item.unitPrice)}/pc)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Details & Checkout Form (when cart is not empty) */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col gap-4">
                {/* Delivery Option Toggle */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-zinc-300">How would you like to receive your order?</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        deliveryMethod === 'pickup'
                          ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Pickup @ Yaba</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        deliveryMethod === 'delivery'
                          ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Nationwide Waybill</span>
                    </button>
                  </div>
                </div>

                {/* Customer Inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Adebayo"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">WhatsApp Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Destination State / Park / Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Abuja (Peace Mass Park) or Port Harcourt"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                {/* Totals Breakdown */}
                <div className="pt-2 border-t border-zinc-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Total Quantity</span>
                    <span className="font-mono text-zinc-200">{totalQuantity} Pieces</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Fulfillment Location</span>
                    <span className="text-zinc-200">
                      {deliveryMethod === 'pickup' ? 'Yaba, Lagos Store' : 'Nationwide Dispatch'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-1">
                    <span>Estimated Total</span>
                    <span className="text-amber-400 tabular-nums">{formatNaira(subtotal)}</span>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>Send Order on WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCopySummary}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                    </button>

                    <a
                      href={`tel:${STORE_PHONE}`}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call Store</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
