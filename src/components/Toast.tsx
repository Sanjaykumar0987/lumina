import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  actionText,
  onAction,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm sm:max-w-md">
      <div className="glass-panel border border-white/25 rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-4 bg-black/90">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
          <span className="material-symbols-outlined text-[18px]">
            shopping_bag
          </span>
        </div>
        <p className="text-xs sm:text-sm text-white font-medium flex-1">
          {message}
        </p>
        {actionText && onAction && (
          <button
            onClick={() => {
              onAction();
              onClose();
            }}
            className="text-xs font-semibold text-white underline underline-offset-2 hover:text-[#c9c6c5] whitespace-nowrap"
          >
            {actionText}
          </button>
        )}
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
          aria-label="Dismiss"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};
