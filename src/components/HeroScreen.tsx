import React from 'react';
import { ThreeBottleHero } from './ThreeBottleHero';
import { FlavorId, FlavorProduct } from '../types';

interface HeroScreenProps {
  selectedFlavor: FlavorProduct;
  onSelectFlavorId: (id: FlavorId) => void;
  onExploreCollection: () => void;
  onOpenLab: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({
  selectedFlavor,
  onSelectFlavorId,
  onExploreCollection,
  onOpenLab,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center pt-28 pb-12 px-6 md:px-16 overflow-hidden">
      {/* Dynamic atmospheric radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 -z-10"
        style={{
          backgroundColor: selectedFlavor.glowColor,
          opacity: 0.28,
        }}
      />

      {/* Hero Typography */}
      <div className="text-center z-20 mt-4 md:mt-8 pointer-events-none max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-display font-bold text-[#e5e2e1] tracking-tight uppercase leading-[1.05] drop-shadow-2xl">
          Taste the
          <br />
          Extraordinary.
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light text-[#c4c7c7] mt-5 md:mt-6 max-w-2xl mx-auto leading-relaxed">
          A symphony of sensory design. Experience the void and the light through precision-engineered flavor profiles.
        </p>
      </div>

      {/* 3D Bottle Vessel Canvas in Center */}
      <div className="relative w-full max-w-[550px] h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center my-auto z-10">
        <ThreeBottleHero
          accentColor={selectedFlavor.accentColor}
          onClick={onOpenLab}
        />
        {/* Subtle touch hint */}
        <div className="absolute bottom-2 text-[11px] font-mono tracking-widest uppercase text-white/40 pointer-events-none hidden sm:block">
          [ Drag to rotate · Click vessel to enter lab ]
        </div>
      </div>

      {/* Bottom Docked Discover & Flavor Selector */}
      <div className="w-full z-30 flex flex-col items-center mt-4">
        {/* Scroll / Discover trigger */}
        <button
          onClick={onExploreCollection}
          className="mb-6 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#c4c7c7] mb-1 group-hover:text-white transition-colors">
            DISCOVER
          </span>
          <span className="material-symbols-outlined text-[#e5e2e1] scroll-indicator text-lg">
            expand_more
          </span>
        </button>

        {/* Flavor Selector Chips Dock */}
        <div className="glass-panel rounded-full px-5 sm:px-8 py-3.5 flex items-center gap-3 sm:gap-6 overflow-x-auto max-w-[95vw] sm:max-w-none hide-scrollbar shadow-2xl">
          {/* THE VOID CHIP */}
          <button
            onClick={() => onSelectFlavorId('void')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 group cursor-pointer ${
              selectedFlavor.id === 'void' ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedFlavor.id === 'void'
                  ? 'bg-black border-2 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-[#1c1b1b] border border-white/10 hover:border-white/30'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#e5e2e1]">
                dark_mode
              </span>
            </div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wider transition-colors ${
                selectedFlavor.id === 'void' ? 'text-white font-semibold' : 'text-[#c4c7c7] group-hover:text-white'
              }`}
            >
              THE VOID
            </span>
          </button>

          <div className="w-px h-7 bg-white/10" />

          {/* ROSE CHIP */}
          <button
            onClick={() => onSelectFlavorId('rose')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 group cursor-pointer ${
              selectedFlavor.id === 'rose' ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedFlavor.id === 'rose'
                  ? 'bg-[#353434] border-2 border-[#fb6f92] shadow-[0_0_22px_rgba(251,111,146,0.5)]'
                  : 'bg-[#201f1f] border border-white/10 hover:border-[#fb6f92]/40'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  selectedFlavor.id === 'rose' ? 'text-[#fb6f92]' : 'text-[#c4c7c7] group-hover:text-[#fb6f92]'
                }`}
              >
                local_florist
              </span>
            </div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wider transition-colors ${
                selectedFlavor.id === 'rose' ? 'text-[#fb6f92] font-semibold' : 'text-[#c4c7c7] group-hover:text-[#fb6f92]'
              }`}
            >
              ROSE
            </span>
          </button>

          {/* BADAM CHIP */}
          <button
            onClick={() => onSelectFlavorId('badam')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 group cursor-pointer ${
              selectedFlavor.id === 'badam' ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedFlavor.id === 'badam'
                  ? 'bg-[#353434] border-2 border-[#ffb703] shadow-[0_0_22px_rgba(255,183,3,0.5)]'
                  : 'bg-[#201f1f] border border-white/10 hover:border-[#ffb703]/40'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  selectedFlavor.id === 'badam' ? 'text-[#ffb703]' : 'text-[#c4c7c7] group-hover:text-[#ffb703]'
                }`}
              >
                energy_savings_leaf
              </span>
            </div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wider transition-colors ${
                selectedFlavor.id === 'badam' ? 'text-[#ffb703] font-semibold' : 'text-[#c4c7c7] group-hover:text-[#ffb703]'
              }`}
            >
              BADAM
            </span>
          </button>

          {/* BERRY (STRAWBERRY) CHIP */}
          <button
            onClick={() => onSelectFlavorId('strawberry')}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 group cursor-pointer ${
              selectedFlavor.id === 'strawberry' ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedFlavor.id === 'strawberry'
                  ? 'bg-[#353434] border-2 border-[#ff4d6d] shadow-[0_0_22px_rgba(255,77,109,0.5)]'
                  : 'bg-[#201f1f] border border-white/10 hover:border-[#ff4d6d]/40'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  selectedFlavor.id === 'strawberry' ? 'text-[#ff4d6d]' : 'text-[#c4c7c7] group-hover:text-[#ff4d6d]'
                }`}
              >
                water_drop
              </span>
            </div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wider transition-colors ${
                selectedFlavor.id === 'strawberry' ? 'text-[#ff4d6d] font-semibold' : 'text-[#c4c7c7] group-hover:text-[#ff4d6d]'
              }`}
            >
              BERRY
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
