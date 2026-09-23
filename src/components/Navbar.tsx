import React from 'react';
import { ActiveScreen } from '../types';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenStory: () => void;
  onOpenScience: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenStory,
  onOpenScience,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 h-20 flex justify-between items-center">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-2xl md:text-3xl font-display font-bold tracking-tight text-[#e5e2e1] hover:text-white transition-colors focus:outline-none flex items-center gap-2"
        >
          <span>LUMINA</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={() => onNavigate('collection')}
            className={`text-sm lg:text-base font-normal tracking-wide transition-all duration-200 py-1 border-b-2 ${
              activeScreen === 'collection'
                ? 'text-[#e5e2e1] border-[#c9c6c5] font-medium'
                : 'text-[#c4c7c7] border-transparent hover:text-white hover:border-white/30'
            }`}
          >
            Flavors
          </button>
          <button
            onClick={() => onNavigate('lab')}
            className={`text-sm lg:text-base font-normal tracking-wide transition-all duration-200 py-1 border-b-2 ${
              activeScreen === 'lab'
                ? 'text-[#e5e2e1] border-[#c9c6c5] font-medium'
                : 'text-[#c4c7c7] border-transparent hover:text-white hover:border-white/30'
            }`}
          >
            Experience
          </button>
          <button
            onClick={onOpenStory}
            className="text-sm lg:text-base font-normal tracking-wide text-[#c4c7c7] border-b-2 border-transparent hover:text-white hover:border-white/30 transition-all duration-200 py-1"
          >
            Story
          </button>
          <button
            onClick={onOpenScience}
            className="text-sm lg:text-base font-normal tracking-wide text-[#c4c7c7] border-b-2 border-transparent hover:text-white hover:border-white/30 transition-all duration-200 py-1"
          >
            Science
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-2.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-[#e5e2e1] transition-all flex items-center justify-center group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-105 transition-transform">
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('checkout')}
            className="hidden sm:inline-flex items-center gap-2 bg-[#e5e2e1] hover:bg-white text-[#141313] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <span>Order Now</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#e5e2e1] rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141313]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onNavigate('collection');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-3 rounded-xl text-base transition-colors flex items-center justify-between ${
                activeScreen === 'collection' ? 'bg-white/10 text-white font-medium' : 'text-[#c4c7c7] hover:bg-white/5'
              }`}
            >
              <span>Flavors Collection</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
            <button
              onClick={() => {
                onNavigate('lab');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-3 rounded-xl text-base transition-colors flex items-center justify-between ${
                activeScreen === 'lab' ? 'bg-white/10 text-white font-medium' : 'text-[#c4c7c7] hover:bg-white/5'
              }`}
            >
              <span>Flavor Lab Experience</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
            <button
              onClick={() => {
                onOpenStory();
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-3 rounded-xl text-base text-[#c4c7c7] hover:bg-white/5 transition-colors flex items-center justify-between"
            >
              <span>Our Story</span>
              <span className="material-symbols-outlined text-sm">auto_stories</span>
            </button>
            <button
              onClick={() => {
                onOpenScience();
                setMobileMenuOpen(false);
              }}
              className="text-left px-4 py-3 rounded-xl text-base text-[#c4c7c7] hover:bg-white/5 transition-colors flex items-center justify-between"
            >
              <span>Flavor Science</span>
              <span className="material-symbols-outlined text-sm">science</span>
            </button>
            <button
              onClick={() => {
                onNavigate('checkout');
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full bg-white text-black font-semibold text-xs tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
