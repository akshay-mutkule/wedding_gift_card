import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { weddingImages } from "../data/weddingData";

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Preparing a timeless love story...",
  "Weaving golden threads of memory...",
  "Preloading pre-wedding photos...",
  "Tuning the romance orchestra...",
  "Polishing the custom glassmorphism panels...",
  "Opening the pages of forever...",
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Cycle loading messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);

    return () => clearInterval(messageInterval);
  }, []);

  // Preload images
  useEffect(() => {
    const imageUrls = Object.values(weddingImages);
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setProgress(100);
      return;
    }

    const timer = setTimeout(() => {
      // Safety timeout in case an image fails to load
      setProgress(100);
    }, 5000);

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        const calculatedProgress = Math.min(
          Math.floor((loadedCount / totalImages) * 100),
          100
        );
        setProgress((prev) => Math.max(prev, calculatedProgress));
      };
      img.onerror = () => {
        // Continue progress even on error
        loadedCount++;
        const calculatedProgress = Math.min(
          Math.floor((loadedCount / totalImages) * 100),
          100
        );
        setProgress((prev) => Math.max(prev, calculatedProgress));
      };
    });

    return () => clearTimeout(timer);
  }, []);

  // Soft progress acceleration for visual luxury
  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Increment quickly to keep experience fast & satisfying
          return prev + 5;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [progress]);

  // When progress reaches 100%, trigger completion with a slight delay for visual satisfaction
  useEffect(() => {
    if (progress >= 100) {
      const finalDelay = setTimeout(() => {
        onComplete();
      }, 200);
      return () => clearTimeout(finalDelay);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      id="loading-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Abstract Elegant Golden Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-rose-500/5 blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center max-w-md px-6 text-center z-10">
        {/* Glowing Golden Ring Layout */}
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          {/* Outermost rotating gold ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-amber-400/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner pulse ring */}
          <motion.div
            className="absolute inset-2 rounded-full border border-rose-400/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Golden ring core */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-double border-amber-300/30 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          {/* Center Heart Icon */}
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-10 h-10 text-rose-400 fill-rose-500/20 filter drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" />
          </motion.div>
        </div>

        {/* Brand Names */}
        <h2 className="font-serif text-2xl tracking-[0.2em] text-amber-100 mb-2">
          AARAV <span className="text-rose-400/80">&</span> ANANYA
        </h2>
        <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-8">
          The Wedding Celebration
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 h-[2px] bg-stone-800 rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="font-mono text-xs tracking-wider text-amber-200 mb-6">
          {progress}%
        </div>

        {/* Changing Love Messages */}
        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="text-sm font-light text-stone-300 italic"
              initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -5, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
