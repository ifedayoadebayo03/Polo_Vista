import React, { useEffect } from 'react';
import { STORE_PHONE, STORE_PHONE_INTL, STORE_LOCATION, STORE_HOURS, LOGO_IMAGE_PATH } from '../data/products';
import { X, MapPin, Phone, MessageCircle, Clock, Truck, Store, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface YabaLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YabaLocationModal: React.FC<YabaLocationModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-6 z-10 text-zinc-100"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-zinc-800">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-amber-400 shrink-0">
              <img src={LOGO_IMAGE_PATH} alt="Polo Vista Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-black font-display text-white">
                Polo Vista Clothes Store
              </h3>
              <p className="text-xs text-amber-400 font-semibold">
                Wholesale Showroom & Pickup Shop
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Physical Pickup Address:</strong>
                <p className="text-zinc-300 mt-0.5">{STORE_LOCATION}</p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Landmarks: Near Tejuosho Ultra-Modern Market & Yaba Commercial Bus Terminal, Lagos Mainland.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Operating Hours:</strong>
                <p className="text-zinc-300 mt-0.5">{STORE_HOURS}</p>
                <p className="text-[11px] text-zinc-400">Sunday: Closed (WhatsApp orders processed Monday morning).</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Nationwide Waybill & Park Dispatch:</strong>
                <p className="text-zinc-300 mt-0.5">
                  We waybill bulk bales daily to all 36 Nigerian states through Jibowu / Ojota / Maza-Maza transport parks, Peace Mass, GIG Logistics, and ABC Transport.
                </p>
              </div>
            </div>
          </div>

          {/* Contact buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-zinc-800">
            <a
              href={`https://wa.me/${STORE_PHONE_INTL}?text=${encodeURIComponent(
                'Hello! I want to visit your Yaba shop or confirm address directions.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Shop</span>
            </a>

            <a
              href={`tel:${STORE_PHONE}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {STORE_PHONE}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
