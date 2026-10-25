import React from "react";
import { motion } from "motion/react";
import { Heart, Calendar, MapPin, Mail, Sparkles, Download } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";

interface HeroSectionProps {
  onOpenStory: () => void;
  onOpenEnvelope: () => void;
  onOpenKeepsake: () => void;
  onOpenRSVP: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenStory,
  onOpenEnvelope,
  onOpenKeepsake,
  onOpenRSVP,
}) => {

  const { couple } = weddingData;

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleHeartClick = () => {
    soundFX.playWeddingBlessing();
    onOpenStory();
  };

  return (
    <div
      id="hero-landing"
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 py-16"
    >
      {/* Decorative Gold Rings Backdrop Outline */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <div className="w-[600px] h-[600px] rounded-full border border-amber-300 animate-pulse" />
        <div className="w-[500px] h-[500px] rounded-full border border-amber-300 absolute ml-24 mt-24 animate-pulse duration-1000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl flex flex-col items-center justify-center select-none"
      >
        {/* Animated Introductory golden text quotes */}
        <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-400/40" />
          <p className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-amber-200/60 font-light">
            Two Hearts &bull; One Journey &bull; One Forever
          </p>
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-400/40" />
        </motion.div>

        {/* Cinematic Main Title */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.15em] text-stone-100 leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          Our Love <span className="italic font-serif text-amber-100 font-medium">Story</span>
        </motion.h1>

        {/* Gold Calligraphy Names */}
        <motion.div
          variants={itemVariants}
          className="my-8 md:my-10 flex flex-col items-center relative"
        >
          {/* Couple Names Calligraphy with custom glow */}
          <h2 className="font-script text-6xl sm:text-8xl md:text-9xl text-amber-300 tracking-wider font-normal drop-shadow-[0_8px_24px_rgba(173,120,43,0.3)] relative z-10">
            {couple.groom} <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-rose-300 mx-2 inline-block align-middle">&amp;</span> {couple.bride}
          </h2>

          {/* Golden glow light behind name */}
          <div className="absolute -inset-10 bg-amber-400/10 rounded-full filter blur-3xl opacity-60 z-0" />
        </motion.div>

        {/* Wedding Metadata (Date, Location) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-stone-300 font-light tracking-widest text-xs sm:text-sm mb-10"
        >
          <span className="flex items-center gap-2 border-b border-stone-800/60 pb-1 sm:border-0 sm:pb-0">
            <Calendar className="w-4 h-4 text-amber-300/80" />
            {couple.weddingDate}
          </span>
          <span className="hidden sm:inline text-stone-700">|</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-300/80" />
            {couple.weddingVenue}
          </span>
        </motion.div>

        {/* Majestic Pulsing Heart Trigger */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col items-center justify-center cursor-pointer mb-8"
          onClick={handleHeartClick}
        >
          {/* Concentric Pulsing Light Rings */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-amber-300/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-rose-400/20"
            animate={{ scale: [1.2, 1.6, 1.2], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Central Pulsing Heart Frame */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-20 h-20 rounded-full bg-stone-900/90 border border-amber-300/40 flex items-center justify-center shadow-[0_8px_32px_rgba(251,113,133,0.25)] hover:border-amber-300 hover:shadow-[0_8px_32px_rgba(245,158,11,0.4)] transition-all duration-300 group z-10"
          >
            {/* Ambient Red Glow inside frame */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/10 to-amber-500/10 opacity-60 group-hover:opacity-100 transition-opacity" />
            
            {/* The Heart Symbol itself */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-10 h-10 text-rose-400 fill-rose-500/35 group-hover:text-rose-300 group-hover:fill-rose-400/50 filter drop-shadow-[0_0_12px_rgba(251,113,133,0.6)] transition-all duration-300" />
            </motion.div>

            {/* Subtle light rotate border */}
            <div className="absolute inset-[-2px] rounded-full border border-dashed border-amber-400/20 group-hover:border-amber-400/50 animate-spin duration-15000" />
          </motion.div>

          {/* Elegant Prompt label below heart */}
          <motion.div
            className="mt-5 flex flex-col items-center gap-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-serif text-sm text-amber-200 tracking-[0.25em] uppercase font-medium">
              Click Heart to Enter
            </span>
            <span className="font-sans text-[10px] text-stone-400/80 tracking-[0.3em] uppercase">
              ✨ Open Our Love Story ✨
            </span>
          </motion.div>
        </motion.div>

        {/* ADVANCED QUICK INTERACTION ACTIONS: RSVP Pass, Royal Envelope & Keepsake Card */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <button
            onClick={() => {
              soundFX.playChime(1050);
              onOpenRSVP();
            }}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            RSVP &bull; Royal Boarding Pass
          </button>

          <button
            onClick={() => {
              soundFX.playWaxSealStamp();
              onOpenEnvelope();
            }}
            className="px-4 py-2 rounded-full glass-panel border border-amber-300/30 hover:border-amber-300 text-stone-200 hover:text-amber-100 text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all hover:bg-stone-900 shadow-md cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-amber-300" />
            Royal Wax-Sealed Envelope
          </button>

          <button
            onClick={() => {
              soundFX.playChime(900);
              onOpenKeepsake();
            }}
            className="px-4 py-2 rounded-full glass-panel border border-amber-300/30 hover:border-amber-300 text-stone-200 hover:text-amber-100 text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all hover:bg-stone-900 shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            Keepsake Card
          </button>
        </motion.div>


      </motion.div>
    </div>
  );
};

