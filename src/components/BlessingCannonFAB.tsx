import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { soundFX } from "../utils/soundFX";

export const BlessingCannonFAB: React.FC = () => {
  const triggerBlessingCannon = () => {
    soundFX.playWeddingBlessing();

    // Dual corner cannons
    const end = Date.now() + 1000;
    const colors = ["#d6b572", "#fb7185", "#f43f5e", "#fef08a", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <motion.button
      id="blessing-cannon-fab"
      onClick={triggerBlessingCannon}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-20 sm:right-24 z-40 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-stone-900/90 border border-amber-300/40 text-amber-200 hover:text-amber-100 hover:border-amber-300 shadow-[0_4px_25px_rgba(251,191,36,0.25)] backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all group"
      title="Shower Petals & Blessings"
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-4 h-4 text-amber-300 group-hover:text-amber-200" />
      </motion.div>
      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider hidden xs:inline">
        Shower Blessings
      </span>
      <span className="text-sm">🌸</span>
    </motion.button>
  );
};
