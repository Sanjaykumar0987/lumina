import React, { useState } from 'react';
import { CartItem, OrderFormData } from '../types';

interface CheckoutScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (formData: OrderFormData) => void;
  onWhatsAppCheckout: () => void;
  onContinueShopping: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onWhatsAppCheckout,
  onContinueShopping,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    email: '',
    newsletter: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8.0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your shopping bag is empty. Please add flavors to proceed.');
      return;
    }

    const newErrors: Record<string, string> = {};
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required to receive verification';
    }
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder(formData);
    }, 1200);
  };

  return (
    <section className="relative pt-28 pb-24 px-6 md:px-16 lg:px-20 max-w-[1440px] mx-auto min-h-screen">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff4d6d]/5 rounded-full blur-[140px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Forms (7 cols) */}
        <div className="lg:col-span-7 space-y-10 z-10">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[#e5e2e1] tracking-tight mb-3">
              Secure Checkout
            </h1>
            <p className="text-sm sm:text-base text-[#c4c7c7] font-light">
              Complete your transaction to enter the void.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Contact Information */}
            <section className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#c9c6c5]">
                  mail
                </span>
                <span>Contact Information</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email Address"
                    required
                    className={`input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl ${
                      errors.email ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <label className="flex items-center gap-3 cursor-pointer pt-1 select-none">
                  <input
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    type="checkbox"
                    className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#c9c6c5] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-[#c4c7c7]">
                    Send me exclusive updates and flavor drops.
                  </span>
                </label>
              </div>
            </section>

            {/* Section 2: Shipping Address */}
            <section className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#c9c6c5]">
                  local_shipping
                </span>
                <span>Shipping Address</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="First Name"
                  required
                  className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Last Name"
                  className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl"
                />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Address Line 1"
                  required
                  className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl md:col-span-2"
                />
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="City"
                  className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl"
                />
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Postal Code"
                  className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl"
                />
              </div>
            </section>

            {/* Section 3: Payment Method */}
            <section className="glass-panel rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#c9c6c5]">
                  credit_card
                </span>
                <span>Payment Method</span>
              </h2>

              <div className="space-y-4">
                <input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  type="text"
                  maxLength={19}
                  placeholder="Card Number (Encrypted Sandbox)"
                  defaultValue="4242 ···· ···· 4242"
                  className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl font-mono"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    type="text"
                    maxLength={5}
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl font-mono"
                  />
                  <input
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    type="password"
                    maxLength={4}
                    placeholder="CVC"
                    defaultValue="888"
                    className="input-glass w-full p-4 text-sm text-[#e5e2e1] placeholder:text-[#c4c7c7]/50 rounded-xl font-mono"
                  />
                </div>
              </div>
            </section>

            {/* Mobile Submit Button inside Form */}
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-white hover:bg-[#e5e2e1] text-black font-semibold text-xs tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSACTING...</span>
                ) : (
                  <>
                    <span>PLACE ORDER · ${total.toFixed(2)}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary Drawer (5 cols, sticky) */}
        <aside className="lg:col-span-5 sticky top-28 z-20">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col h-full border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-white">
                Order Summary
              </h2>
              <span className="text-xs text-[#c4c7c7] font-mono">
                {cart.reduce((n, item) => n + item.quantity, 0)} items
              </span>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-12 text-center text-[#c4c7c7] space-y-4">
                <span className="material-symbols-outlined text-4xl opacity-40">
                  shopping_bag
                </span>
                <p className="text-sm font-light">Your shopping bag is empty.</p>
                <button
                  onClick={onContinueShopping}
                  className="px-4 py-2 text-xs text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 hide-scrollbar mb-6">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 items-center group p-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-20 rounded-lg overflow-hidden relative flex-shrink-0 bg-[#1c1b1b] border border-white/10 flex items-center justify-center p-1">
                      <img
                        src={item.product.studioImage}
                        alt={item.product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Info & Stepper */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">
                        {item.product.subtitle}
                      </h3>
                      <p className="text-[11px] font-mono text-[#c4c7c7]/80 truncate">
                        The Void and the Light
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            remove
                          </span>
                        </button>
                        <span className="text-xs font-semibold text-white tabular-nums w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            add
                          </span>
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[11px] text-[#c4c7c7]/60 hover:text-red-400 ml-2 transition-colors"
                          title="Remove item"
                        >
                          remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Totals Section */}
            <div className="border-t border-white/10 pt-4 space-y-2 mb-6 text-sm">
              <div className="flex justify-between text-[#c4c7c7] font-light">
                <span>Subtotal</span>
                <span className="text-white font-medium tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#c4c7c7] font-light">
                <span>Shipping</span>
                <span className="text-white font-medium">
                  {shipping === 0 ? 'Complimentary Express' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-xl font-display font-semibold text-white pt-2 border-t border-white/5">
                <span>Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 mt-auto">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-[#c9c6c5] hover:bg-white text-[#141313] font-semibold text-xs tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(201,198,197,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSACTING ORDER...</span>
                ) : (
                  <>
                    <span>PLACE ORDER</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-white/10" />
                <span className="flex-shrink-0 mx-3 text-[11px] font-mono text-[#c4c7c7]/70">
                  OR
                </span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              <button
                type="button"
                onClick={onWhatsAppCheckout}
                disabled={cart.length === 0}
                className="w-full bg-transparent border border-white/20 hover:border-white/40 text-[#e5e2e1] hover:text-white font-semibold text-xs tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-400">
                  chat
                </span>
                <span>ORDER VIA WHATSAPP</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onContinueShopping}
                  className="text-xs text-[#c4c7c7]/70 hover:text-white transition-colors"
                >
                  ← Continue browsing flavors
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
