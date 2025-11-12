import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useGestureControls } from '@/hooks/useGestureControls.bootflow.mobile';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxHeight?: string;
}

export const BottomSheet = ({ isOpen, onClose, title, children, maxHeight = '90vh' }: BottomSheetProps) => {
  const { bind } = useGestureControls({
    onSwipeDown: onClose,
    swipeThreshold: 50,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            {...bind()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-slate-800 bg-slate-950 shadow-2xl safe-area-inset-bottom"
            style={{
              maxHeight,
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div className="h-1 w-12 rounded-full bg-slate-700 mx-auto absolute top-2 left-1/2 transform -translate-x-1/2" />
              {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
              <button
                onClick={onClose}
                className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - 60px)` }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

