import React, { useState } from 'react';
import { FlavorProduct, FlavorId } from '../types';
import { DETAIL_IMAGES } from '../data/products';

interface FlavorLabScreenProps {
  products: FlavorProduct[];
  selectedProduct: FlavorProduct;
  onSelectFlavorId: (id: FlavorId) => void;
  onAddToCartWithQty: (product: FlavorProduct, quantity: number) => void;
  onOrderWhatsAppWithQty: (product: FlavorProduct, quantity: number) => void;
  onGoToCheckout: () => void;
}

export const FlavorLabScreen: React.FC<FlavorLabScreenProps> = ({
  products,
  selectedProduct,
  onSelectFlavorId,
  onAddToCartWithQty,
  onOrderWhatsAppWithQty,
  onGoToCheckout,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'details' | 'serving'>('ingredients');

  const increment = () => setQuantity((prev) => Math.min(prev + 1, 12));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  // Determine hero bottle visual: if strawberry, use the specific floating render, otherwise high-res bottle
  const bottleVisual =
    selectedProduct.id === 'strawberry'
      ? DETAIL_IMAGES.strawberryDetailBottle
      : selectedProduct.bottleImage;

  return (
    <section className="relative pt-28 pb-20 px-6 md:px-12 xl:pr-96 min-h-screen overflow-hidden">
      {/* Dynamic Background Glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[700px] md:h-[900px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 -z-10"
        style={{
          backgroundColor: selectedProduct.glowColor,
          opacity: 0.22,
        }}
      />

      {/* Mobile/Tablet Horizontal Flavor Selector Bar */}
      <div className="xl:hidden mb-8 overflow-x-auto hide-scrollbar -mx-6 px-6">
        <div className="flex gap-2 min-w-max pb-2">
          {products.map((p) => {
            const isActive = p.id === selectedProduct.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectFlavorId(p.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white/5 text-[#c4c7c7] border border-white/5 hover:bg-white/10'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{
                    color: isActive ? p.accentColor : 'inherit',
                  }}
                >
                  {p.icon}
                </span>
                <span>{p.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: Floating 3D Bottle Stage with Floating Botanical Ingredients */}
        <div className="lg:col-span-7 relative h-[480px] sm:h-[580px] lg:h-[720px] flex justify-center items-center">
          {/* Main Hero Floating Bottle */}
          <div className="relative z-10 w-full max-w-[440px] lg:max-w-[500px] flex justify-center items-center">
            <img
              src={bottleVisual}
              alt={`${selectedProduct.name} Bottle`}
              className="w-full h-auto max-h-[500px] lg:max-h-[640px] object-contain floating select-none drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Floating Ingredients & Petals */}
          {selectedProduct.id === 'strawberry' ? (
            <>
              {/* Fresh Strawberry Slice Floating */}
              <img
                src={DETAIL_IMAGES.strawberryPiece}
                alt="Wild Strawberry"
                className="absolute top-1/6 left-6 sm:left-12 w-16 sm:w-20 h-16 sm:h-20 object-contain floating-delayed-1 z-20 pointer-events-none drop-shadow-xl"
              />
              {/* Delicate Translucent Petal */}
              <img
                src={DETAIL_IMAGES.rosePetal}
                alt="Botanical Petal"
                className="absolute bottom-1/4 right-8 sm:right-16 w-12 sm:w-16 h-12 sm:h-16 object-contain floating-delayed-2 z-20 pointer-events-none drop-shadow-xl"
              />
              {/* Frozen Silky Milk Splash */}
              <img
                src={DETAIL_IMAGES.milkSplash}
                alt="Silky Splash"
                className="absolute top-1/2 right-4 sm:right-12 w-24 sm:w-32 h-24 sm:h-32 object-contain floating-delayed-3 z-0 opacity-40 pointer-events-none"
              />
            </>
          ) : (
            <>
              {/* Universal botanical particles for other flavors */}
              <div
                className="absolute top-1/4 left-10 w-12 h-12 rounded-full blur-md opacity-70 floating-delayed-1 pointer-events-none"
                style={{ backgroundColor: selectedProduct.accentColor }}
              />
              <img
                src={DETAIL_IMAGES.rosePetal}
                alt="Botanical Essence"
                className="absolute bottom-1/4 right-12 w-14 h-14 object-contain floating-delayed-2 z-20 pointer-events-none drop-shadow-xl opacity-80"
              />
              <div
                className="absolute bottom-1/3 left-16 w-8 h-8 rounded-full blur-sm opacity-50 floating-delayed-3 pointer-events-none"
                style={{ backgroundColor: selectedProduct.accentColor }}
              />
            </>
          )}
        </div>

        {/* Right: Contiguous Purchase Module & Tabs */}
        <div className="lg:col-span-5 space-y-6 z-10 relative">
          <div>
            <span
              className="text-xs font-mono font-medium tracking-[0.2em] uppercase mb-2.5 block transition-colors duration-500"
              style={{
                color: selectedProduct.accentColor,
                textShadow: `0 0 20px ${selectedProduct.accentColor}80`,
              }}
            >
              {selectedProduct.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
              {selectedProduct.name}
            </h1>
            <p className="text-sm sm:text-base text-[#c4c7c7] font-light leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Pricing & Add to Cart Purchase Card */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <div>
                <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  ${(selectedProduct.price * quantity).toFixed(2)}
                </span>
                <span className="text-xs text-[#c4c7c7] ml-2 block sm:inline">
                  (${selectedProduct.price.toFixed(2)} / unit)
                </span>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1.5 border border-white/10">
                <button
                  onClick={decrement}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="text-base font-medium text-white w-6 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={increment}
                  aria-label="Increase quantity"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                onClick={() => onAddToCartWithQty(selectedProduct, quantity)}
                className="bg-white hover:bg-[#e5e2e1] text-black text-xs font-semibold tracking-wider uppercase py-4 px-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  shopping_bag
                </span>
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={() => onOrderWhatsAppWithQty(selectedProduct, quantity)}
                className="bg-transparent border border-white/20 hover:border-white/40 text-[#e5e2e1] hover:text-white text-xs font-semibold tracking-wider uppercase py-4 px-6 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-400">
                  chat
                </span>
                <span>WHATSAPP</span>
              </button>
            </div>
          </div>

          {/* Interactive Specification Tabs */}
          <div className="glass-card rounded-2xl overflow-hidden mt-6">
            <div className="flex border-b border-white/10 bg-black/20">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`flex-1 py-4 text-xs font-medium tracking-wider uppercase transition-colors relative ${
                  activeTab === 'ingredients'
                    ? 'text-white font-semibold'
                    : 'text-[#c4c7c7] hover:text-white hover:bg-white/5'
                }`}
              >
                Ingredients
                {activeTab === 'ingredients' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_white]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-4 text-xs font-medium tracking-wider uppercase transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-white font-semibold'
                    : 'text-[#c4c7c7] hover:text-white hover:bg-white/5'
                }`}
              >
                Details
                {activeTab === 'details' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_white]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('serving')}
                className={`flex-1 py-4 text-xs font-medium tracking-wider uppercase transition-colors relative ${
                  activeTab === 'serving'
                    ? 'text-white font-semibold'
                    : 'text-[#c4c7c7] hover:text-white hover:bg-white/5'
                }`}
              >
                Serving
                {activeTab === 'serving' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_white]" />
                )}
              </button>
            </div>

            <div className="p-6 text-sm text-[#c4c7c7] leading-relaxed">
              {activeTab === 'ingredients' && (
                <ul className="space-y-3">
                  {selectedProduct.ingredients.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: selectedProduct.accentColor,
                          boxShadow: `0 0 10px ${selectedProduct.accentColor}`,
                        }}
                      />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#c4c7c7]/70 block">
                      Volume
                    </span>
                    <span className="text-white font-medium text-sm">
                      {selectedProduct.details.volume}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#c4c7c7]/70 block">
                      Shelf Life
                    </span>
                    <span className="text-white font-medium text-sm">
                      {selectedProduct.details.shelfLife}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#c4c7c7]/70 block">
                      Extraction
                    </span>
                    <span className="text-white font-medium text-sm">
                      {selectedProduct.details.coldPressed
                        ? 'Cryo Cold-Pressed'
                        : 'Slow Decoction'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#c4c7c7]/70 block">
                      Energy
                    </span>
                    <span className="text-white font-medium text-sm">
                      {selectedProduct.details.energy}
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-mono uppercase text-[#c4c7c7]/70 block mb-1">
                      Aroma & Flavor Notes
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {selectedProduct.details.flavorNotes.map((note, idx) => (
                        <span key={idx} className="text-white/90">
                          {note}
                          {idx < selectedProduct.details.flavorNotes.length - 1 && ' · '}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'serving' && (
                <ul className="space-y-3">
                  {selectedProduct.servingNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[16px] text-white/50 mt-0.5">
                        check_circle
                      </span>
                      <span className="text-white/90">{note}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Fixed Side Navigation (Exact Screen 3 Sidebar) */}
      <aside className="fixed right-0 top-0 h-full w-80 z-40 bg-[#0e0e0e]/85 backdrop-blur-2xl border-l border-white/10 shadow-[40px_0_100px_rgba(0,0,0,0.8)] hidden xl:flex flex-col p-8 pt-28">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-white">
            Flavor Lab
          </h2>
          <p className="text-xs text-[#c4c7c7] mt-1 font-light">
            The Void and the Light
          </p>
        </div>

        <ul className="flex-1 space-y-3">
          {products.map((p) => {
            const isActive = p.id === selectedProduct.id;
            return (
              <li key={p.id}>
                <button
                  onClick={() => onSelectFlavorId(p.id)}
                  className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 text-left group ${
                    isActive
                      ? 'bg-white/10 text-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.18)] border border-white/20'
                      : 'text-[#c4c7c7] opacity-70 hover:opacity-100 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px] transition-colors"
                    style={{
                      color: isActive ? p.accentColor : 'inherit',
                    }}
                  >
                    {p.icon}
                  </span>
                  <span className="text-xs font-medium tracking-wide">
                    {p.subtitle}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Bottom CTA to Checkout */}
        <button
          onClick={onGoToCheckout}
          className="w-full bg-[#c9c6c5] hover:bg-white text-[#141313] font-semibold text-xs tracking-wider uppercase py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg mt-auto flex items-center justify-center gap-2"
        >
          <span>Checkout Now</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </aside>
    </section>
  );
};
