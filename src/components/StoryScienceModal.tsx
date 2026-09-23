import React from 'react';

interface StoryScienceModalProps {
  mode: 'story' | 'science' | null;
  onClose: () => void;
}

export const StoryScienceModal: React.FC<StoryScienceModalProps> = ({
  mode,
  onClose,
}) => {
  if (!mode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-10 relative border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {mode === 'story' ? (
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#c4c7c7] block mb-2">
              Our Origins
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
              The Void and the Light
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#c4c7c7] font-light leading-relaxed">
              <p>
                LUMINA was founded on a singular obsession: to strip away the synthetic noise of modern confections and reconstruct the purest sensory essences nature ever forged.
              </p>
              <p>
                We call our canvas <em className="text-white font-normal">The Void</em>. Pitch darkness, cryogenic stillness, and absolute purity. From this zero-state, each botanical profile is illuminated—a single burst of pristine flavor engineered to linger on the olfactory senses.
              </p>
              <p>
                From alpine wild strawberries harvested at sunrise to centuries-old Badam and Damask rose distillation techniques, LUMINA represents the luxury of unhurried craftsmanship.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#c4c7c7] font-mono">
              <span>BOTTLED AT CRYOGENIC SOURCE</span>
              <span>100% RECYCLABLE BLACK FLINT GLASS</span>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#c4c7c7] block mb-2">
              Flavor Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
              Advanced Extraction Science
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#c4c7c7] font-light leading-relaxed">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#ff4d6d]">
                    ac_unit
                  </span>
                  <span>Cryo-Fractional Distillation</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#c4c7c7]">
                  Raw botanical petals and whole berries are exposed to sub-zero flash freezing, preserving delicate volatile esters usually degraded by pasteurization heat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#ffb703]">
                    water_drop
                  </span>
                  <span>Alpine Glacial Carrier</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#c4c7c7]">
                  Every batch uses filtered micro-structured spring water with balanced alkaline minerality, designed to amplify aroma without masking nuanced flavor notes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#fb6f92]">
                    spa
                  </span>
                  <span>Zero Synthetic Modifiers</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#c4c7c7]">
                  Free of artificial colorants, synthetic emulsifiers, and processed corn syrups. Only unadulterated botanical compounds and organic cane nectar.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#c4c7c7] font-mono">
              <span>ISO 22000 CERTIFIED LAB</span>
              <span>PATENTED RETENTION CURVE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
