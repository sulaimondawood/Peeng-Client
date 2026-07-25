import React from 'react';
import { useAppState } from '../context/StateContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, addToast } = useAppState();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none font-sans">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border flex items-start gap-3 shadow-2xl transition-all duration-300 animate-slide-up ${isSuccess
              ? 'bg-emerald-950/95 border-emerald-900/60 text-emerald-300'
              : isError
                ? 'bg-rose-950/95 border-rose-900/60 text-rose-300'
                : isWarning
                  ? 'bg-amber-950/95 border-amber-900/60 text-amber-300'
                  : 'bg-zinc-900/95 border-zinc-800 text-zinc-300'
              }`}
          >
            {/* Visual Type Indicators */}
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            {isWarning && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
            {!isSuccess && !isError && !isWarning && <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />}

            {/* Notification content body */}
            <div className="flex-1 text-xxs font-mono leading-relaxed break-words pr-2">
              {toast.message}
            </div>

            {/* Dismiss Cross */}
            <button
              onClick={() => {
                // Clicking triggers immediate fade out or we let it auto timeout
              }}
              className="p-0.5 rounded-lg hover:bg-black/20 text-current/60 hover:text-current transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default ToastContainer;
