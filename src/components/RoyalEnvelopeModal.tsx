import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Heart, Crown } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingData } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";

interface RoyalEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoyalEnvelopeModal: React.FC<RoyalEnvelopeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isBroken, setIsBroken] = useState(false);
  const { couple } = weddingData;

  const handleBreakSeal = () => {
    if (isBroken) return;
    soundFX.playWaxSealStamp();
    setTimeout(() => {
      soundFX.playHarpArpeggio();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#d6b572", "#fb7185", "#fef08a", "#ffffff"],
      });
    }, 200);
    setIsBroken(true);
  };

  const handleClose = () => {
    soundFX.playChime(700);
    setIsBroken(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md select-none"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 transition-colors z-50 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg relative flex flex-col items-center"
          >
            {!isBroken ? (
              // UNOPENED ENVELOPE
              <div
                onClick={handleBreakSeal}
                className="w-full aspect-[16/10] max-h-[340px] bg-gradient-to-br from-[#2a1b18] via-[#1c1214] to-[#120a0d] rounded-2xl border-2 border-amber-300/40 p-6 flex flex-col items-center justify-center relative shadow-[0_25px_60px_rgba(0,0,0,0.9)] cursor-pointer group hover:border-amber-300 transition-all overflow-hidden"
              >
                {/* Envelope Fold Pattern */}
                <div className="absolute inset-x-0 top-0 h-1/2 border-b border-amber-300/20 bg-gradient-to-b from-stone-900/60 to-transparent pointer-events-none" />

                {/* Golden corner filigrees */}
                <div className="absolute top-3 left-3 text-amber-300/50 text-xs font-mono">✦</div>
                <div className="absolute top-3 right-3 text-amber-300/50 text-xs font-mono">✦</div>
                <div className="absolute bottom-3 left-3 text-amber-300/50 text-xs font-mono">✦</div>
                <div className="absolute bottom-3 right-3 text-amber-300/50 text-xs font-mono">✦</div>

                {/* Subtitle */}
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-amber-200/70 mb-3">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  Royal Wedding Invitation
                </div>

                {/* Names */}
                <h3 className="font-script text-4xl sm:text-5xl text-amber-300 tracking-wide font-normal mb-8">
                  {couple.groom} &amp; {couple.bride}
                </h3>

                {/* THE WAX SEAL */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 border-2 border-amber-400/80 shadow-[0_4px_20px_rgba(190,18,60,0.6)] flex flex-col items-center justify-center text-amber-200 cursor-pointer relative z-10"
                >
                  <span className="font-serif font-bold text-sm tracking-widest text-amber-200 drop-shadow">
                    A &amp; A
                  </span>
                  <span className="text-[8px] font-mono uppercase tracking-tighter text-amber-300/80">
                    SEALED
                  </span>

                  {/* Pulsing glow ring */}
                  <div className="absolute -inset-1.5 rounded-full border border-amber-300/40 animate-ping opacity-30" />
                </motion.div>

                {/* Tap Hint */}
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/60 mt-5 animate-pulse">
                  Tap Wax Seal To Unfold
                </span>
              </div>
            ) : (
              // UNROLLED ROYAL PARCHMENT SCROLL
              <motion.div
                initial={{ opacity: 0, scaleY: 0.2 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#fdfbf7] text-stone-900 rounded-2xl p-8 sm:p-10 border-4 border-amber-700/30 shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative overflow-hidden"
              >
                {/* Parchment decorative borders */}
                <div className="absolute inset-2 border border-amber-800/20 rounded-xl pointer-events-none" />
                <div className="absolute inset-3 border border-dashed border-amber-800/15 rounded-lg pointer-events-none" />

                <div className="text-center relative z-10">
                  <div className="flex items-center justify-center gap-2 text-amber-800/70 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em]">
                      By the Grace of the Almighty
                    </span>
                    <Sparkles className="w-4 h-4" />
                  </div>

                  <p className="font-serif italic text-stone-600 text-xs sm:text-sm mb-4">
                    The honour of your esteemed presence and heartfelt blessings is requested at the auspicious wedding of
                  </p>

                  <h2 className="font-script text-5xl sm:text-6xl text-amber-900 tracking-wide font-normal mb-1">
                    {couple.groom}
                  </h2>
                  <div className="font-serif italic text-amber-800 text-lg sm:text-xl font-light mb-1">
                    wrought in love with
                  </div>
                  <h2 className="font-script text-5xl sm:text-6xl text-amber-900 tracking-wide font-normal mb-5">
                    {couple.bride}
                  </h2>

                  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto mb-5" />

                  <div className="flex flex-col gap-1 text-xs sm:text-sm font-serif text-stone-750 mb-6">
                    <p className="font-semibold text-stone-900">
                      On Friday, the Eighteenth of December
                    </p>
                    <p className="text-amber-900 font-mono text-xs">
                      Two Thousand and Twenty-Six &bull; 6:30 PM
                    </p>
                    <p className="mt-1 font-light italic">
                      {couple.weddingVenue}
                    </p>
                  </div>

                  <p className="font-serif italic text-xs text-stone-600 max-w-xs mx-auto mb-6">
                    "Two souls intertwined by destiny, blessed by love, beginning their forever."
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                    <span className="font-script text-2xl text-amber-900">
                      Aarav &amp; Ananya
                    </span>
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
