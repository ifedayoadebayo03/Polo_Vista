import React, { useEffect, useState } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { ToastNotification } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingBagButtonProps {
  totalItems: number;
  latestToast: ToastNotification | null;
  onOpenBag: () => void;
  bumpTrigger: number; // incremented whenever an item is added
}

export const FloatingBagButton: React.FC<FloatingBagButtonProps> = ({
  totalItems,
  latestToast,
  onOpenBag,
  bumpTrigger,
}) => {
  const [isBumping, setIsBumping] = useState(false);

  // Trigger button bounce whenever bumpTrigger updates
  useEffect(() => {
    if (bumpTrigger > 0) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [bumpTrigger]);

  // Hidden while the bag is empty
  if (totalItems <= 0) return null;

  return (
    <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end pointer-events-none">
      {/* Toast Feedback appearing directly above the floating bag button */}
      <AnimatePresence>
        {latestToast && (
          <motion.div
            key={latestToast.id}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 350 }}
            className="mb-3 pointer-events-auto bg-zinc-900 border-2 border-amber-400 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 max-w-xs text-xs sm:text-sm font-semibold backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="line-clamp-1">
              <span className="text-amber-400 font-bold">Added: </span>
              <span className="text-zinc-100">{latestToast.productName}</span>
              <span className="text-zinc-400 text-xs ml-1 font-mono">({latestToast.quantity} pcs)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Yellow Bag Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isBumping ? 1.18 : 1,
          opacity: 1,
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 20,
        }}
        onClick={onOpenBag}
        className="pointer-events-auto relative w-15 h-15 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-2xl flex items-center justify-center cursor-pointer active:scale-90 transition-colors border-2 border-zinc-950 focus:outline-none focus:ring-4 focus:ring-amber-400/40"
        aria-label={`Open Wholesale Shopping Bag with ${totalItems} items`}
      >
        <ShoppingBag className="w-6 h-6 stroke-[2.2]" />

        {/* Small live badge on the button showing count */}
        <motion.span
          key={totalItems}
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className="absolute -top-1.5 -right-1.5 bg-zinc-950 text-amber-400 border-2 border-amber-400 font-black text-xs min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center tabular-nums shadow-md"
        >
          {totalItems}
        </motion.span>
      </motion.button>
    </div>
  );
};
