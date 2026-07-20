import React from "react";
import { motion } from "motion/react";
import { Heart, Stars } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const FinalSection: React.FC = () => {
  return (
    <div
      id="section-final-ending"
      className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden z-10 py-24 select-none"
    >
      {/* Decorative Drifting Lanterns Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute bg-gradient-to-t from-amber-400 to-rose-400 rounded-full blur-[2px] opacity-40 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            style={{
              width: `${Math.random() * 8 + 6}px`,
              height: `${Math.random() * 12 + 10}px`,
              left: `${10 + idx * 8}%`,
              bottom: "-5%",
            }}
            animate={{
              y: [-20, -1000],
              x: [0, Math.sin(idx) * 60, Math.sin(idx) * -40],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 12 + idx * 3,
              repeat: Infinity,
              ease: "linear",
              delay: idx * 1.5,
            }}
          />
        ))}

        {/* Shimmering Fireworks overlay spikes */}
        {[...Array(6)].map((_, idx) => (
          <motion.div
            key={`firework-${idx}`}
            className="absolute rounded-full"
            style={{
              top: `${20 + Math.random() * 30}%`,
              left: `${15 + Math.random() * 70}%`,
              width: "4px",
              height: "4px",
              background: idx % 2 === 0 ? "#fcd34d" : "#fda4af",
              boxShadow: "0 0 12px 6px currentColor",
            }}
            animate={{
              scale: [0, 25, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 3 + idx,
              repeat: Infinity,
              ease: "easeOut",
              delay: idx * 2.5,
            }}
          />
        ))}
      </div>

      {/* Main Ending core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl relative z-10 flex flex-col items-center"
      >
        {/* Animated Overlapping Wedding Rings & Pulse Heart */}
        <div className="relative w-48 h-32 mb-12 flex items-center justify-center">
          {/* Left golden ring */}
          <motion.div
            className="absolute w-24 h-24 rounded-full border-[3px] border-amber-300 shadow-[0_0_15px_rgba(214,181,114,0.3)]"
            style={{ left: "15%", transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 15, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right golden ring */}
          <motion.div
            className="absolute w-24 h-24 rounded-full border-[3px] border-amber-300 shadow-[0_0_15px_rgba(214,181,114,0.3)]"
            style={{ right: "15%", transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, -15, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Overlap core pulsing heart */}
          <motion.div
            className="absolute z-10"
            animate={{ scale: [0.9, 1.12, 0.9] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
          </motion.div>
        </div>

        {/* Text endings */}
        <motion.p
          className="font-mono text-xs text-amber-300 tracking-[0.4em] uppercase mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          &bull; Forever Begins Now &bull;
        </motion.p>

        <h3 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-stone-100 mb-6 leading-tight">
          Thank You
        </h3>

        <p className="font-serif text-xl sm:text-2xl text-amber-100 font-light italic mb-10 tracking-wide">
          For Being Part Of Our Forever.
        </p>

        {/* Sparkle subtitle separator */}
        <div className="flex items-center gap-3 text-amber-300/40 mb-10">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/30" />
          <Stars className="w-4 h-4 text-amber-200" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/30" />
        </div>

        <h4 className="font-script text-5xl sm:text-7xl text-amber-300/90 tracking-widest font-normal">
          Our Love Continues...
        </h4>

        {/* Stars quote indicator */}
        <p className="text-[10px] tracking-widest font-mono text-stone-500 uppercase mt-12">
          Aarav &amp; Ananya &bull; {weddingData.couple.weddingDate}
        </p>
      </motion.div>
    </div>
  );
};
