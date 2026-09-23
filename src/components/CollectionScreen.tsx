import React, { useState } from 'react';
import { FlavorProduct } from '../types';

interface CollectionScreenProps {
  products: FlavorProduct[];
  onSelectFlavor: (product: FlavorProduct) => void;
  onAddToCart: (product: FlavorProduct) => void;
  onOrderWhatsApp: (product: FlavorProduct) => void;
}

export const CollectionScreen: React.FC<CollectionScreenProps> = ({
  products,
  onSelectFlavor,
  onAddToCart,
  onOrderWhatsApp,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'signature' | 'reserve'>('all');

  const mainThree = [
    products.find((p) => p.id === 'strawberry') || products[0],
    products.find((p) => p.id === 'badam') || products[1],
    products.find((p) => p.id === 'rose') || products[2],
  ];

  const secondary = products.filter(
    (p) => p.id === 'geerthanda' || p.id === 'chocolate'
  );

  return (
    <section className="relative pt-32 pb-24 px-6 md:px-16 lg:px-20 max-w-[1440px] mx-auto min-h-screen">
      {/* Header */}
      <header className="text-center mb-24 md:mb-32 relative z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 leading-[1.08] tracking-tight">
          DISCOVER THE
          <br />
          LUMINA COLLECTION
        </h1>
        <p className="text-base sm:text-lg text-[#c4c7c7] mt-6 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the intersection of advanced flavor science and luxurious indulgence. Hover to explore.
        </p>

        {/* Collection Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                : 'text-[#c4c7c7] bg-white/5 hover:bg-white/10'
            }`}
          >
            All Expressions ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('signature')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
              activeTab === 'signature'
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                : 'text-[#c4c7c7] bg-white/5 hover:bg-white/10'
            }`}
          >
            Core Trilogy
          </button>
          <button
            onClick={() => setActiveTab('reserve')}
            className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
              activeTab === 'reserve'
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                : 'text-[#c4c7c7] bg-white/5 hover:bg-white/10'
            }`}
          >
            Alchemical Series
          </button>
        </div>
      </header>

      {/* Main Showcase Grid (Exact Screen 2 Layout) */}
      {(activeTab === 'all' || activeTab === 'signature') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12 xl:gap-20 relative z-10 mb-20">
          {mainThree.map((product, idx) => {
            const isElevated = idx === 1; // Badam sits higher (lg:-mt-24)
            return (
              <div
                key={product.id}
                className={`bottle-hover-group flex flex-col items-center group relative h-[580px] sm:h-[620px] justify-end pb-10 transition-transform duration-500 ${
                  isElevated ? 'lg:-mt-20' : ''
                }`}
              >
                {/* Dynamic colored background aura on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] -z-10 blur-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${product.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Floating 3D Render Bottle Image */}
                <div
                  onClick={() => onSelectFlavor(product)}
                  className="cursor-pointer absolute top-4 sm:top-6 z-20 w-full flex justify-center"
                >
                  <img
                    src={product.bottleImage}
                    alt={`${product.name} Bottle`}
                    className="bottle-img w-56 sm:w-64 h-[300px] sm:h-[340px] object-contain drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>

                {/* Glassmorphic Panel Bottom Card */}
                <div className="glass-panel w-full rounded-[32px] p-6 sm:p-8 text-center relative z-10 mt-auto pt-44 sm:pt-48 flex flex-col items-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#c4c7c7]/70 mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#e5e2e1] mb-1.5">
                    {product.subtitle}
                  </h3>
                  <p className="text-sm font-light text-[#c4c7c7] mb-5">
                    {product.tagline}
                  </p>

                  {/* Actions & Price (Reveals on hover desktop, always accessible on touch) */}
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex items-center justify-between px-2 pt-2 border-t border-white/10 md:hidden">
                      <span className="text-lg font-bold text-white tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onSelectFlavor(product)}
                        className="text-xs text-white/70 hover:text-white underline underline-offset-4"
                      >
                        Inspect in Lab →
                      </button>
                    </div>

                    <div className="reveal-on-hover flex flex-col gap-3 w-full">
                      <div className="flex items-center justify-between px-2">
                        <span className="font-display text-2xl font-bold text-white tabular-nums">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => onSelectFlavor(product)}
                          className="text-xs text-white/80 hover:text-white flex items-center gap-1 font-medium transition-colors"
                        >
                          <span>Flavor Lab</span>
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                          </span>
                        </button>
                      </div>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-white text-black text-xs font-semibold tracking-wider uppercase py-3.5 px-6 rounded-full w-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base">
                          shopping_bag
                        </span>
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => onOrderWhatsApp(product)}
                        className="glass-panel border border-white/20 text-[#e5e2e1] text-xs font-medium tracking-wide py-3 px-6 rounded-full w-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">
                          chat
                        </span>
                        <span>Order via WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Secondary / Reserve Collection */}
      {(activeTab === 'all' || activeTab === 'reserve') && (
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest uppercase text-[#c4c7c7] block mb-2">
              Limited Archive
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white">
              Alchemical Reserve Releases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {secondary.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 group hover:border-white/30 transition-all duration-300"
              >
                <div
                  onClick={() => onSelectFlavor(product)}
                  className="cursor-pointer w-40 h-48 flex-shrink-0 flex items-center justify-center relative"
                >
                  <img
                    src={product.bottleImage}
                    alt={product.name}
                    className="h-full object-contain group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-xl"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-mono tracking-wider text-[#c4c7c7] block">
                    {product.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#c4c7c7] mt-2 font-light line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xl font-bold text-white tabular-nums">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectFlavor(product)}
                        className="px-4 py-2 text-xs border border-white/20 hover:border-white/40 rounded-full text-white transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-4 py-2 text-xs bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
