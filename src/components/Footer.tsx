import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenStory: () => void;
  onOpenScience: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenStory,
  onOpenScience,
}) => {
  const [modalContent, setModalContent] = useState<{
    title: string;
    body: string;
  } | null>(null);

  const openGuide = () => {
    setModalContent({
      title: 'LUMINA Sensory & Brewing Guide',
      body: 'For peak aromatic expression: Chill bottle between 2°C and 4°C. Invert twice gently to integrate suspended botanical micro-particles. Uncap and let breathe in ambient glass for 45 seconds before the initial sip. Avoid mixing with tap water or ice made from chlorinated tap water.',
    });
  };

  const openPrivacy = () => {
    setModalContent({
      title: 'Privacy Protocol',
      body: 'LUMINA adheres to stringent end-to-end data stewardship. Your personal contact details and delivery coordinates are strictly utilized for cryogenic shipping and order confirmations. We never monetize, lease, or expose customer identities.',
    });
  };

  const openTerms = () => {
    setModalContent({
      title: 'Terms of Indulgence',
      body: 'All LUMINA botanical elixirs are crafted in verified sterile laboratories. Products must remain refrigerated upon receipt. We guarantee sensory integrity up to the marked batch date. Returns or replacements for compromised thermal seals are honored within 48 hours of courier delivery.',
    });
  };

  return (
    <>
      <footer className="relative w-full border-t border-white/5 bg-[#0e0e0e] z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="text-3xl font-display font-bold text-[#c9c6c5] tracking-tight">
              LUMINA
            </div>
            <p className="text-xs text-[#c4c7c7] font-light leading-relaxed max-w-xs">
              The intersection of advanced flavor science and luxurious sensory indulgence.
            </p>
            <p className="text-xs font-mono text-[#c4c7c7]/60 pt-2">
              © 2024 LUMINA. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Nav Links Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#c4c7c7] font-light">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors"
                >
                  The Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="hover:text-white transition-colors"
                >
                  Flavor Lab Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('checkout')}
                  className="hover:text-white transition-colors"
                >
                  Secure Checkout
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Heritage Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Philosophy
            </h4>
            <ul className="space-y-2 text-sm text-[#c4c7c7] font-light">
              <li>
                <button onClick={onOpenStory} className="hover:text-white transition-colors">
                  Our Origins & The Void
                </button>
              </li>
              <li>
                <button onClick={onOpenScience} className="hover:text-white transition-colors">
                  Cryo-Extraction Science
                </button>
              </li>
              <li>
                <button onClick={openGuide} className="hover:text-white transition-colors">
                  Sensory Brewing Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Concierge Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Governance
            </h4>
            <ul className="space-y-2 text-sm text-[#c4c7c7] font-light">
              <li>
                <button onClick={openPrivacy} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={openTerms} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/?text=Hello%20LUMINA%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20batches."
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 sm:p-8 relative border border-white/20">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
            <h3 className="text-2xl font-display font-semibold text-white mb-4">
              {modalContent.title}
            </h3>
            <p className="text-sm text-[#c4c7c7] font-light leading-relaxed">
              {modalContent.body}
            </p>
            <button
              onClick={() => setModalContent(null)}
              className="mt-6 w-full py-3 bg-white text-black font-semibold text-xs rounded-xl uppercase tracking-wider"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </>
  );
};
