import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, X, AlertTriangle, Info } from 'lucide-react';

interface ConfirmationModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmationModal({
  id = 'confirmation-modal',
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmationModalProps) {
  
  // Disable body scroll when modal is active
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

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
          accentBar: 'bg-rose-500',
          bgIcon: 'bg-rose-950/30 border-rose-900/30 text-rose-400',
          btnConfirm: 'bg-rose-600 hover:bg-rose-500 border-rose-500/25 text-white focus:ring-rose-500',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
          accentBar: 'bg-amber-500',
          bgIcon: 'bg-amber-950/30 border-amber-900/30 text-amber-400',
          btnConfirm: 'bg-amber-600 hover:bg-amber-500 border-amber-500/25 text-white focus:ring-amber-500',
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-6 h-6 text-indigo-400" />,
          accentBar: 'bg-indigo-500',
          bgIcon: 'bg-indigo-950/30 border-indigo-900/30 text-indigo-400',
          btnConfirm: 'bg-indigo-600 hover:bg-indigo-550 border-indigo-500/25 text-white focus:ring-indigo-500',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs cursor-pointer"
            id={`${id}-backdrop`}
          />

          {/* Modal Card Frame */}
          <motion.div
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full shadow-2xl relative overflow-hidden z-10 font-sans"
            id={`${id}-card`}
          >
            {/* Top accent visual bar */}
            <div className={`absolute top-0 left-0 w-full h-1 ${styles.accentBar}`} />

            {/* Header / Dismiss */}
            <div className="p-4 border-b border-slate-850/60 bg-slate-950/25 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Authorization Challenge
              </span>
              <button
                onClick={onClose}
                className="p-1 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-850 transition-colors focus:outline-none"
                aria-label="Close dialog"
                id={`${id}-close-btn`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 ${styles.bgIcon}`}>
                  {styles.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-100 tracking-tight leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              {/* Cyber Audit Warning Indicator */}
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-lg text-[10px] text-slate-405 font-mono leading-relaxed">
                <span className="text-rose-400 font-semibold">[Warning]:</span> This instruction triggers manual access revocation and key invalidation in the consensus store. Active routing entries will be terminated immediately.
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 bg-slate-950/40 border-t border-slate-850/60 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-slate-200 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-1 focus:ring-slate-700 cursor-pointer"
                id={`${id}-cancel-btn`}
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-1.5 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-1 cursor-pointer ${styles.btnConfirm}`}
                id={`${id}-confirm-btn`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
