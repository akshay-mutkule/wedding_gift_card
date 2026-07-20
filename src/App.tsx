import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, ChevronUp, Clock, BookOpen, Images, Gift } from "lucide-react";

// Components
import { AmbientBackground } from "./components/AmbientBackground";
import { LoadingScreen } from "./components/LoadingScreen";
import { HeroSection } from "./components/HeroSection";
import { TimelineSection } from "./components/TimelineSection";
import { SlideshowSection } from "./components/SlideshowSection";
import { MemoryBookSection } from "./components/MemoryBookSection";
import { FinalSection } from "./components/FinalSection";
import { MusicPlayer } from "./components/MusicPlayer";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isStoryOpened, setIsStoryOpened] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [activeSection, setActiveSection] = useState("home");

  // Track mouse move to generate cursor sparkle trails
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Spawn sparkle with small probability for visual elegance (not overly cluttered)
      if (Math.random() < 0.12) {
        const newSparkle: Sparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY + window.scrollY, // Map to document coordinates
          size: Math.random() * 8 + 6,
        };
        setSparkles((prev) => [...prev, newSparkle].slice(-15)); // Cap at 15 sparkles for performance
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter out expired sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => prev.slice(1));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  // Track scroll depth for active section highlighting and Scroll-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Scroll To Top toggle
      if (scrollPosition > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Check current active section
      const sections = [
        { id: "home", el: document.getElementById("hero-landing") },
        { id: "timeline", el: document.getElementById("section-first-smile") },
        { id: "slideshow", el: document.getElementById("section-slideshow") },
        { id: "scrapbook", el: document.getElementById("section-memory-book") },
        { id: "vows", el: document.getElementById("section-final-ending") },
      ];

      for (const sect of sections) {
        if (sect.el) {
          const rect = sect.el.getBoundingClientRect();
          // If top of section is within upper half of viewport, mark as active
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(sect.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenStory = () => {
    // Scroll smoothly to first timeline element
    setIsStoryOpened(true);
    setTimeout(() => {
      const startSect = document.getElementById("section-first-smile");
      if (startSect) {
        startSect.scrollIntoView({ behavior: "smooth" });
      }
    }, 20);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen w-full bg-stone-950 font-sans text-stone-100 overflow-x-hidden selection:bg-amber-300/30 selection:text-amber-200">
      {/* Dynamic Ambient Background Canvas (Petals, bokeh, sparkles) */}
      <AmbientBackground />

      {/* CURSOR SPARKLES OVERLAY TRAIL */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {sparkles.map((sp) => (
            <motion.div
              key={sp.id}
              className="absolute pointer-events-none"
              style={{
                left: sp.x,
                top: sp.y,
              }}
              initial={{ opacity: 0.8, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1.2, rotate: 45 }}
              exit={{ opacity: 0, scale: 0.2, rotate: 90 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <svg
                width={sp.size}
                height={sp.size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-200/80 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
              >
                <path
                  d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* STAGE 1: LUXURIOUS LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* MAIN STORY CORES */}
      {!isLoading && (
        <div className="relative flex flex-col min-h-screen">
          
          {/* FLOATING GLASS NAVIGATION BAR */}
          <AnimatePresence>
            {isStoryOpened && (
              <motion.header
                id="floating-header"
                className="fixed top-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[90%] flex items-center justify-center"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <nav className="glass-panel px-6 py-3 rounded-full flex items-center justify-around w-full shadow-lg border border-amber-300/10">
                  {/* Jump button: Home */}
                  <button
                    onClick={() => document.getElementById("hero-landing")?.scrollIntoView({ behavior: "smooth" })}
                    className={`text-[9px] sm:text-xs tracking-wider sm:tracking-widest font-mono uppercase transition-colors ${
                      activeSection === "home" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                    }`}
                  >
                    Home
                  </button>

                  <span className="text-stone-750 text-[9px] sm:text-[10px]">•</span>

                  {/* Jump button: Love Story */}
                  <button
                    onClick={() => document.getElementById("section-first-smile")?.scrollIntoView({ behavior: "smooth" })}
                    className={`text-[9px] sm:text-xs tracking-wider sm:tracking-widest font-mono uppercase transition-colors flex items-center gap-1 sm:gap-1.5 ${
                      activeSection === "timeline" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                    }`}
                  >
                    <Clock className="hidden sm:inline-block w-3 h-3" />
                    Story
                  </button>

                  <span className="text-stone-750 text-[9px] sm:text-[10px]">•</span>

                  {/* Jump button: Slideshow */}
                  <button
                    onClick={() => document.getElementById("section-slideshow")?.scrollIntoView({ behavior: "smooth" })}
                    className={`text-[9px] sm:text-xs tracking-wider sm:tracking-widest font-mono uppercase transition-colors flex items-center gap-1 sm:gap-1.5 ${
                      activeSection === "slideshow" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                    }`}
                  >
                    <Images className="hidden sm:inline-block w-3 h-3" />
                    Slideshow
                  </button>

                  <span className="text-stone-750 text-[9px] sm:text-[10px]">•</span>

                  {/* Jump button: Scrapbook */}
                  <button
                    onClick={() => document.getElementById("section-memory-book")?.scrollIntoView({ behavior: "smooth" })}
                    className={`text-[9px] sm:text-xs tracking-wider sm:tracking-widest font-mono uppercase transition-colors flex items-center gap-1 sm:gap-1.5 ${
                      activeSection === "scrapbook" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                    }`}
                  >
                    <BookOpen className="hidden sm:inline-block w-3 h-3" />
                    Scrapbook
                  </button>

                  <span className="text-stone-750 text-[9px] sm:text-[10px]">•</span>

                  {/* Jump button: Vows */}
                  <button
                    onClick={() => document.getElementById("section-final-ending")?.scrollIntoView({ behavior: "smooth" })}
                    className={`text-[9px] sm:text-xs tracking-wider sm:tracking-widest font-mono uppercase transition-colors flex items-center gap-1 sm:gap-1.5 ${
                      activeSection === "vows" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                    }`}
                  >
                    <Gift className="hidden sm:inline-block w-3 h-3" />
                    Vows
                  </button>
                </nav>
              </motion.header>
            )}
          </AnimatePresence>

          {/* LANDING PAGE INTRO */}
          <HeroSection onOpenStory={handleOpenStory} />

          {/* MULTI-SECTION CHRONOLOGY SCORES */}
          <AnimatePresence>
            {isStoryOpened && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col w-full"
              >
                {/* Sections 1, 2, 3: First Smile, Journey timeline, masonry gallery */}
                <TimelineSection />

                {/* Section 4: Full screen cinematic slideshow */}
                <section id="section-slideshow" className="w-full bg-stone-950/40 border-y border-stone-900/60">
                  <SlideshowSection />
                </section>

                {/* Section 5: Physical scrapbook pages flipping */}
                <section id="section-memory-book" className="w-full">
                  <MemoryBookSection />
                </section>

                {/* Section 6: Grand Finale Lanterns / Overlapping Rings */}
                <FinalSection />
              </motion.div>
            )}
          </AnimatePresence>

          {/* SYSTEM AUDIO SYMPHONY DECK */}
          <MusicPlayer isStoryOpened={isStoryOpened} />

          {/* SCROLL BACK TO TOP FLOATING BUTTON */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                id="scroll-to-top-button"
                onClick={handleScrollToTop}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-stone-900 border border-amber-300/30 text-amber-200 flex items-center justify-center hover:border-amber-300 hover:text-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.55)] backdrop-blur transition-all cursor-pointer"
                title="Scroll To Top"
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
