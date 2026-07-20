import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, BookCheck, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const MemoryBookSection: React.FC = () => {
  const { scrapbook } = weddingData;
  const [activePageIndex, setActivePageIndex] = useState(0); // Holds the active single page index
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPages = scrapbook.length;
  const totalSpreads = Math.ceil(totalPages / 2);

  const handleNextPage = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (activePageIndex < totalPages - 1) {
        setFlipDirection("next");
        setIsFlipping(true);
        setTimeout(() => {
          setActivePageIndex((prev) => prev + 1);
          setIsFlipping(false);
        }, 500);
      }
    } else {
      const currentSpreadIndex = Math.floor(activePageIndex / 2);
      if (currentSpreadIndex < totalSpreads - 1) {
        setFlipDirection("next");
        setIsFlipping(true);
        setTimeout(() => {
          setActivePageIndex((prev) => (currentSpreadIndex + 1) * 2);
          setIsFlipping(false);
        }, 500);
      }
    }
  };

  const handlePrevPage = () => {
    if (isFlipping) return;
    if (isMobile) {
      if (activePageIndex > 0) {
        setFlipDirection("prev");
        setIsFlipping(true);
        setTimeout(() => {
          setActivePageIndex((prev) => prev - 1);
          setIsFlipping(false);
        }, 500);
      }
    } else {
      const currentSpreadIndex = Math.floor(activePageIndex / 2);
      if (currentSpreadIndex > 0) {
        setFlipDirection("prev");
        setIsFlipping(true);
        setTimeout(() => {
          setActivePageIndex((prev) => (currentSpreadIndex - 1) * 2);
          setIsFlipping(false);
        }, 500);
      }
    }
  };

  // Decorative dried rose/leaves SVG
  const RoseDecorator: React.FC = () => (
    <svg className="w-16 h-16 absolute -top-4 -left-4 text-rose-300/40 opacity-70 rotate-[-12deg]" viewBox="0 0 100 100" fill="currentColor">
      <path d="M50,15 C45,2 25,2 25,20 C25,35 50,55 50,55 C50,55 75,35 75,20 C75,2 55,2 50,15 Z" />
      <path d="M50,55 L50,85 C50,85 45,90 50,95 C55,90 50,85 50,85" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M50,65 Q35,70 30,65 Q35,60 50,65" fill="currentColor" />
    </svg>
  );

  // Decorative Golden Leaf SVG
  const GoldenLeafDecorator: React.FC = () => (
    <svg className="w-12 h-12 absolute -top-2 -right-2 text-amber-300/30 rotate-[45deg]" viewBox="0 0 100 100" fill="currentColor">
      <path d="M10,90 Q40,80 50,50 Q60,20 90,10 Q80,40 50,50 Q20,60 10,90" />
    </svg>
  );

  // Wax Seal Graphic SVG Vector
  const WaxSeal: React.FC = () => (
    <div className="absolute -bottom-4 -right-4 w-12 h-12 flex items-center justify-center select-none rotate-12 z-20">
      {/* Outer organic red-gold seal */}
      <div className="absolute inset-0 rounded-full bg-rose-850/80 border-2 border-amber-500/30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform scale-110" style={{ borderRadius: '43% 57% 50% 50% / 54% 46% 54% 46%' }} />
      {/* Inner seal ring with hearts initials */}
      <div className="relative w-8 h-8 rounded-full border border-amber-300/40 flex items-center justify-center text-amber-200/90 font-serif text-[10px] font-bold">
        A &amp; A
      </div>
    </div>
  );

  const leftPageIndex = Math.floor(activePageIndex / 2) * 2;
  const rightPageIndex = leftPageIndex + 1;

  const leftPage = scrapbook[leftPageIndex];
  const rightPage = scrapbook[rightPageIndex];
  const activePage = scrapbook[activePageIndex];

  return (
    <div className="w-full flex flex-col items-center py-16 px-4 md:px-8 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase block mb-3">
          Memory Book
        </span>
        <h3 className="font-serif text-3xl md:text-5xl font-light tracking-wider text-stone-100">
          The Scrapbook <span className="font-script text-amber-300 text-5xl md:text-6xl italic">Memoirs</span>
        </h3>
        <p className="text-stone-400 font-light max-w-lg mx-auto text-sm md:text-base mt-4">
          Flip through the physical scrapbook capturing clumsy coffee spills, sunset embraces, and the walk home.
        </p>
      </motion.div>

      {/* Album Leather-bound casing container */}
      <div className="w-full max-w-5xl relative flex items-center justify-center">
        {/* Book shadow casing overlay */}
        <div className="absolute inset-0 -m-4 bg-stone-950/40 rounded-3xl filter blur-xl pointer-events-none" />

        {/* PHYSICAL ALBUM WRAPPER */}
        <div className="w-full bg-stone-900 border-4 border-amber-700/30 rounded-2xl p-4 md:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.95)] relative overflow-hidden">
          {/* Suede leather texture background overlay */}
          <div className="absolute inset-0 bg-stone-950/20 pointer-events-none mix-blend-overlay" />

          {/* Book Inner Spread (Gutter in center) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-[#fbf8f2] text-stone-900 rounded-xl overflow-hidden relative min-h-[500px] md:min-h-[550px]">
            {/* Book Spine Center Gutter Shadow Overlay */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-stone-900/15 via-stone-950/40 to-stone-900/15 z-20 pointer-events-none" />

            <AnimatePresence mode="wait">
              {isMobile ? (
                // MOBILE SINGLE PAGE VIEW
                activePage && (
                  <motion.div
                    key={`mobile-${activePageIndex}`}
                    className="p-6 flex flex-col justify-between relative bg-stone-50 min-h-[480px] w-full"
                    initial={{ opacity: 0, x: flipDirection === "next" ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: flipDirection === "next" ? -50 : 50 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Page decorations */}
                    {activePage.decorator === "rose" && <RoseDecorator />}
                    {activePage.decorator === "gold-leaf" && <GoldenLeafDecorator />}

                    {/* Polaroid layout */}
                    <div className="w-full flex flex-col items-center">
                      {/* Polaroid Outer Box Frame */}
                      <div className="bg-white p-3 pb-6 rounded-md shadow-md border border-stone-200/40 transform -rotate-1 hover:rotate-0 transition-transform duration-500 w-full max-w-[240px]">
                        <div className="aspect-square w-full rounded overflow-hidden relative bg-stone-950 border border-stone-100">
                          <img
                            src={activePage.image}
                            alt={activePage.title}
                            className="w-full h-full object-cover select-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="mt-3 text-center font-script text-lg text-stone-700 tracking-wide select-none">
                          {activePage.polaroidCaption}
                        </div>
                      </div>
                    </div>

                    {/* Story Text Box */}
                    <div className="mt-6 flex flex-col relative z-10 pl-1 pb-4">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-amber-700 mb-1.5 font-semibold">
                        <span>{activePage.date}</span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
                          Memory Book
                        </span>
                      </div>
                      <h4 className="font-serif text-base text-stone-850 tracking-wide font-bold mb-1.5">
                        {activePage.title}
                      </h4>
                      <p className="font-sans text-xs font-light leading-relaxed text-stone-600 italic">
                        "{activePage.memory}"
                      </p>
                    </div>

                    {/* Wax seal detail */}
                    <WaxSeal />
                  </motion.div>
                )
              ) : (
                // DESKTOP SPREAD VIEW
                <>
                  {leftPage && (
                    <motion.div
                      key={`left-${Math.floor(activePageIndex / 2)}`}
                      className="p-8 md:p-12 flex flex-col justify-between relative bg-stone-50 border-r border-stone-200/50 min-h-[480px]"
                      initial={isFlipping && flipDirection === "next" ? { rotateY: 90, transformOrigin: "right center", opacity: 0 } : { opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={isFlipping && flipDirection === "prev" ? { rotateY: 90, transformOrigin: "right center", opacity: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.55 }}
                    >
                      {/* Page decorations */}
                      {leftPage.decorator === "rose" && <RoseDecorator />}
                      {leftPage.decorator === "gold-leaf" && <GoldenLeafDecorator />}

                      {/* Polaroid layout */}
                      <div className="w-full flex flex-col items-center">
                        {/* Polaroid Outer Box Frame */}
                        <div className="bg-white p-4 pb-8 rounded-md shadow-md border border-stone-200/40 transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-full max-w-[280px]">
                          <div className="aspect-square w-full rounded overflow-hidden relative bg-stone-950 border border-stone-100">
                            <img
                              src={leftPage.image}
                              alt={leftPage.title}
                              className="w-full h-full object-cover select-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="mt-4 text-center font-script text-xl md:text-2xl text-stone-700 tracking-wide select-none">
                            {leftPage.polaroidCaption}
                          </div>
                        </div>
                      </div>

                      {/* Story Text Box */}
                      <div className="mt-8 flex flex-col relative z-10 pl-2">
                        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-amber-700 mb-2 font-semibold">
                          <span>{leftPage.date}</span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
                            Memory Book
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-stone-850 tracking-wide font-bold mb-2">
                          {leftPage.title}
                        </h4>
                        <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-stone-600 italic">
                          "{leftPage.memory}"
                        </p>
                      </div>

                      {/* Wax seal detail */}
                      <WaxSeal />
                    </motion.div>
                  )}

                  {rightPage ? (
                    <motion.div
                      key={`right-${Math.floor(activePageIndex / 2)}`}
                      className="p-8 md:p-12 flex flex-col justify-between relative bg-stone-50 min-h-[480px]"
                      initial={isFlipping && flipDirection === "prev" ? { rotateY: -90, transformOrigin: "left center", opacity: 0 } : { opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={isFlipping && flipDirection === "next" ? { rotateY: -90, transformOrigin: "left center", opacity: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.55 }}
                    >
                      {/* Page decorations */}
                      {rightPage.decorator === "rose" && <RoseDecorator />}
                      {rightPage.decorator === "gold-leaf" && <GoldenLeafDecorator />}

                      {/* Polaroid layout */}
                      <div className="w-full flex flex-col items-center">
                        {/* Polaroid Outer Box Frame */}
                        <div className="bg-white p-4 pb-8 rounded-md shadow-md border border-stone-200/40 transform rotate-3 hover:rotate-0 transition-transform duration-500 w-full max-w-[280px]">
                          <div className="aspect-square w-full rounded overflow-hidden relative bg-stone-950 border border-stone-100">
                            <img
                              src={rightPage.image}
                              alt={rightPage.title}
                              className="w-full h-full object-cover select-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="mt-4 text-center font-script text-xl md:text-2xl text-stone-700 tracking-wide select-none">
                            {rightPage.polaroidCaption}
                          </div>
                        </div>
                      </div>

                      {/* Story Text Box */}
                      <div className="mt-8 flex flex-col relative z-10 pl-2">
                        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-amber-700 mb-2 font-semibold">
                          <span>{rightPage.date}</span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
                            Our Promises
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-stone-850 tracking-wide font-bold mb-2">
                          {rightPage.title}
                        </h4>
                        <p className="font-sans text-xs md:text-sm font-light leading-relaxed text-stone-600 italic">
                          "{rightPage.memory}"
                        </p>
                      </div>

                      {/* Wax seal detail */}
                      <WaxSeal />
                    </motion.div>
                  ) : (
                    // Empty right page filler
                    <div className="hidden md:flex p-12 flex-col items-center justify-center bg-stone-100/50 text-center relative select-none">
                      <BookCheck className="w-12 h-12 text-stone-300 mb-4" />
                      <p className="font-serif text-stone-400 font-light text-sm italic">
                        "And the story continues to unfold..."
                      </p>
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BOOK FLIP PAGE SWITCHER CONTROLS */}
        <div className="absolute -bottom-8 flex items-center gap-6 z-10">
          <button
            onClick={handlePrevPage}
            disabled={(isMobile ? activePageIndex === 0 : Math.floor(activePageIndex / 2) === 0) || isFlipping}
            className={`p-3 rounded-full bg-stone-900 border text-amber-200 transition-all ${
              (isMobile ? activePageIndex === 0 : Math.floor(activePageIndex / 2) === 0) ? "opacity-30 cursor-not-allowed border-stone-850" : "border-amber-300/20 hover:border-amber-300 cursor-pointer"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-serif text-xs text-amber-200/60 tracking-widest uppercase">
            {isMobile ? `Page ${activePageIndex + 1} of ${totalPages}` : `Spread ${Math.floor(activePageIndex / 2) + 1} of ${totalSpreads}`}
          </span>

          <button
            onClick={handleNextPage}
            disabled={(isMobile ? activePageIndex === totalPages - 1 : Math.floor(activePageIndex / 2) === totalSpreads - 1) || isFlipping}
            className={`p-3 rounded-full bg-stone-900 border text-amber-200 transition-all ${
              (isMobile ? activePageIndex === totalPages - 1 : Math.floor(activePageIndex / 2) === totalSpreads - 1) ? "opacity-30 cursor-not-allowed border-stone-850" : "border-amber-300/20 hover:border-amber-300 cursor-pointer"
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
