import React from 'react';
import { CartItem, OrderFormData } from '../types';

interface OrderSuccessModalProps {
  orderData: {
    orderId: string;
    form: OrderFormData;
    items: CartItem[];
    total: number;
  } | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderData,
  onClose,
}) => {
  if (!orderData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-10 relative border border-white/20 shadow-2xl text-center">
        {/* Animated Checkmark Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
          <span className="material-symbols-outlined text-3xl">check</span>
        </div>

        <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 block mb-1">
          Transaction Verified
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
          Welcome to the Void
        </h2>
        <p className="text-xs sm:text-sm text-[#c4c7c7] font-light max-w-md mx-auto mb-6">
          Your order has been safely placed with our cryogenic bottling lab. A dispatch itinerary has been dispatched to{' '}
          <strong className="text-white font-medium">{orderData.form.email || 'your email'}</strong>.
        </p>

        {/* Order Reference Box */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-3 mb-6">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#c4c7c7]">ORDER REFERENCE</span>
            <span className="text-white font-semibold">{orderData.orderId}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#c4c7c7]">DELIVERY TO</span>
            <span className="text-white truncate max-w-[200px]">
              {orderData.form.firstName} {orderData.form.lastName} · {orderData.form.city || 'Express'}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#c4c7c7]">TOTAL CHARGED</span>
            <span className="text-white font-bold tabular-nums">
              ${orderData.total.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-white/10 text-[11px] text-[#c4c7c7]/80 flex items-center gap-2">
            <span className="material-symbols-outlined text-xs text-sky-400">
              local_shipping
            </span>
            <span>Insulated cryogenic courier dispatch within 24 hours</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white hover:bg-[#e5e2e1] text-black font-semibold text-xs tracking-wider uppercase py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
        >
          Return to LUMINA Collection
        </button>
      </div>
    </div>
  );
};
