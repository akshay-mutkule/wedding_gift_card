import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ChevronLeft, ChevronRight, Maximize, Minimize, Shuffle, Repeat, RefreshCw } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { ImageAsset } from "../types";

export const SlideshowSection: React.FC = () => {
  const [images, setImages] = useState<ImageAsset[]>(weddingData.slideshowImages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState<
    "zoom" | "fade" | "blur" | "slide-left" | "slide-right"
  >("zoom");
  const [progress, setProgress] = useState(0);

  const slideshowContainerRef = useRef<HTMLDivElement | null>(null);

  // Transition lists for premium toggle
  const transitionTypes: ("zoom" | "fade" | "blur" | "slide-left" | "slide-right")[] = [
    "zoom",
    "fade",
    "blur",
    "slide-left",
    "slide-right",
  ];

  // Auto-play interval setting (5000ms)
  const slideDuration = 5000;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setProgress(0);
  }, [images.length]);

  // Keypress listener for slide control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Slideshow timer & progress bar
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (isPlaying) {
      // Slideshow core interval
      timer = setInterval(() => {
        handleNext();
      }, slideDuration);

      // Smooth progress bar runner
      const tick = 100; // ms
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (tick / slideDuration) * 100;
        });
      }, tick);
    }

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [isPlaying, handleNext]);

  // Shuffle toggle
  const handleToggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      // Shuffle images array
      const shuffled = [...images].sort(() => Math.random() - 0.5);
      setImages(shuffled);
      setCurrentIndex(0);
    } else {
      // Restore default list
      setImages(weddingData.slideshowImages);
      setCurrentIndex(0);
    }
    setProgress(0);
  };

  // Fullscreen trigger
  const handleToggleFullscreen = () => {
    if (!slideshowContainerRef.current) return;

    if (!document.fullscreenElement) {
      slideshowContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error(`Fullscreen failed: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Detect fullscreen change by browser triggers (esc key)
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  // Determine animation transition styles variants
  const getVariants = () => {
    switch (transitionStyle) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "blur":
        return {
          initial: { opacity: 0, filter: "blur(12px)" },
          animate: { opacity: 1, filter: "blur(0px)" },
          exit: { opacity: 0, filter: "blur(12px)" },
        };
      case "slide-left":
        return {
          initial: { opacity: 0, x: 200 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -200 },
        };
      case "slide-right":
        return {
          initial: { opacity: 0, x: -200 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 200 },
        };
      case "zoom":
      default:
        return {
          initial: { opacity: 0, scale: 1.15 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
        };
    }
  };

  const currentImage = images[currentIndex] || images[0];

  return (
    <div className="w-full flex flex-col items-center py-16 px-4 md:px-8 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <span className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase block mb-3">
          Section Four
        </span>
        <h3 className="font-serif text-3xl md:text-5xl font-light tracking-wider text-stone-100">
          Our Forever <span className="font-script text-amber-300 text-5xl md:text-6xl italic">Slideshow</span>
        </h3>
        <p className="text-stone-400 font-light max-w-lg mx-auto text-sm md:text-base mt-4">
          A high-definition, auto-playing cinema experience detailing our sacred memories.
        </p>
      </motion.div>

      {/* Main Slideshow Frame Container */}
      <div
        ref={slideshowContainerRef}
        className={`w-full max-w-5xl rounded-2xl overflow-hidden glass-panel border border-amber-300/10 flex flex-col justify-between relative shadow-2xl ${
          isFullscreen ? "h-screen w-screen max-w-none rounded-none border-0" : "h-[450px] md:h-[600px]"
        }`}
      >
        {/* Animated Slide Frame */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-stone-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              variants={getVariants()}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              {/* Luxury dark vignettes gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40 opacity-90" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* TOP RAIL: Features Bar (Fullscreen, Shuffle, Loop toggle) */}
        <div className="relative p-6 flex justify-between items-center z-10 w-full">
          {/* Active Transition type label switcher */}
          <button
            onClick={() => {
              const currentIdx = transitionTypes.indexOf(transitionStyle);
              const nextIdx = (currentIdx + 1) % transitionTypes.length;
              setTransitionStyle(transitionTypes[nextIdx]);
            }}
            className="text-[10px] sm:text-xs tracking-widest font-mono uppercase bg-stone-900/60 border border-amber-300/20 px-3.5 py-1.5 rounded-full text-amber-300 hover:border-amber-300 transition flex items-center gap-2 backdrop-blur"
          >
            <RefreshCw className="w-3 h-3 animate-spin duration-3000" />
            Style: {transitionStyle}
          </button>

          {/* Luxury Controls stack */}
          <div className="flex items-center gap-3">
            {/* Shuffle button */}
            <button
              onClick={handleToggleShuffle}
              className={`p-2 rounded-full border transition-all backdrop-blur ${
                isShuffle
                  ? "bg-amber-300/20 border-amber-300 text-amber-200 shadow-md"
                  : "bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
              title="Shuffle Slideshow"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-full border transition-all backdrop-blur ${
                isPlaying
                  ? "bg-stone-900/60 border-stone-800 text-amber-300 hover:text-amber-100"
                  : "bg-amber-400/10 border-amber-300 text-amber-200"
              }`}
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Fullscreen toggle button */}
            <button
              onClick={handleToggleFullscreen}
              className="p-2 rounded-full bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-all backdrop-blur"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* BOTTOM RAIL: Captions overlay & quotes */}
        <div className="relative p-6 md:p-8 flex flex-col items-center justify-end z-10 text-center w-full bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent">
          {/* Subcaption block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl flex flex-col items-center"
            >
              <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-rose-300 uppercase mb-2">
                {currentImage.caption || "Forever & Always"}
              </span>
              <p className="font-serif text-lg md:text-2xl text-amber-100 font-light italic leading-relaxed mb-1 font-semibold">
                "{currentImage.quote}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Manual Arrows overlay inside rail */}
          <div className="flex items-center gap-8 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-stone-900/40 border border-stone-800/40 text-stone-400 hover:text-stone-100 hover:border-amber-300/30 transition backdrop-blur"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Slide Indicators */}
            <span className="font-mono text-xs text-stone-400 tracking-wider">
              {currentIndex + 1} <span className="text-stone-700">/</span> {images.length}
            </span>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-stone-900/40 border border-stone-800/40 text-stone-400 hover:text-stone-100 hover:border-amber-300/30 transition backdrop-blur"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PROGRESS BAR: Top margin of the frame */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stone-900 overflow-hidden z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-rose-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* THUMBNAIL STRIP */}
      <div className="flex justify-center items-center gap-3 mt-6 w-full max-w-5xl overflow-x-auto py-3 px-1">
        {images.map((img, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              setProgress(0);
            }}
            whileHover={{ scale: 1.05 }}
            className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border transition-all ${
              idx === currentIndex
                ? "border-amber-300 scale-105 shadow-md shadow-amber-500/10"
                : "border-stone-850 opacity-40 hover:opacity-80"
            }`}
          >
            <img
              src={img.src}
              alt={`thumbnail-${idx}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
