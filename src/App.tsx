import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkles,
  ChevronUp,
  Clock,
  BookOpen,
  Images,
  Gift,
  Calendar,
  HelpCircle,
  MessageSquareHeart,
  Mail,
  Volume2,
  VolumeX,
  Award,
} from "lucide-react";

// Components
import { AmbientBackground } from "./components/AmbientBackground";
import { LoadingScreen } from "./components/LoadingScreen";
import { HeroSection } from "./components/HeroSection";
import { CountdownSection } from "./components/CountdownSection";
import { TimelineSection } from "./components/TimelineSection";
import { RoyalItinerarySection } from "./components/RoyalItinerarySection";
import { SlideshowSection } from "./components/SlideshowSection";
import { MemoryBookSection } from "./components/MemoryBookSection";
import { LoveQuizSection } from "./components/LoveQuizSection";
import { WishesWallSection } from "./components/WishesWallSection";
import { FinalSection } from "./components/FinalSection";
import { MusicPlayer } from "./components/MusicPlayer";
import { RoyalEnvelopeModal } from "./components/RoyalEnvelopeModal";
import { KeepsakeModal } from "./components/KeepsakeModal";
import { BlessingCannonFAB } from "./components/BlessingCannonFAB";
import { soundFX } from "./utils/soundFX";

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
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);

  // Track mouse move to generate cursor sparkle trails
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.12) {
        const newSparkle: Sparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY + window.scrollY,
          size: Math.random() * 8 + 6,
        };
        setSparkles((prev) => [...prev, newSparkle].slice(-15));
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

      if (scrollPosition > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = [
        { id: "home", el: document.getElementById("hero-landing") },
        { id: "countdown", el: document.getElementById("section-countdown") },
        { id: "timeline", el: document.getElementById("section-first-smile") },
        { id: "itinerary", el: document.getElementById("section-itinerary") },
        { id: "slideshow", el: document.getElementById("section-slideshow") },
        { id: "scrapbook", el: document.getElementById("section-memory-book") },
        { id: "quiz", el: document.getElementById("section-quiz") },
        { id: "wishes", el: document.getElementById("section-wishes") },
        { id: "vows", el: document.getElementById("section-final-ending") },
      ];

      for (const sect of sections) {
        if (sect.el) {
          const rect = sect.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
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
    setIsStoryOpened(true);
    setTimeout(() => {
      const startSect = document.getElementById("section-countdown");
      if (startSect) {
        startSect.scrollIntoView({ behavior: "smooth" });
      }
    }, 20);
  };

  const handleScrollToTop = () => {
    soundFX.playChime(750);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSFX = () => {
    const nextState = !sfxEnabled;
    setSfxEnabled(nextState);
    soundFX.enabled = nextState;
    if (nextState) {
      soundFX.playChime(1000);
    }
  };

  const scrollToId = (id: string) => {
    soundFX.playChime(850);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
                className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] flex items-center justify-center"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <nav className="glass-panel px-4 sm:px-6 py-2.5 rounded-full flex items-center justify-between w-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-amber-300/20 backdrop-blur-xl">
                  {/* Left: Scroll Navigation Links */}
                  <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-0.5">
                    <button
                      onClick={() => scrollToId("hero-landing")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors ${
                        activeSection === "home" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      Home
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-countdown")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors flex items-center gap-1 ${
                        activeSection === "countdown" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      <Clock className="w-3 h-3 hidden sm:inline" />
                      Countdown
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-first-smile")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors ${
                        activeSection === "timeline" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      Story
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-itinerary")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors flex items-center gap-1 ${
                        activeSection === "itinerary" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      <Calendar className="w-3 h-3 hidden sm:inline" />
                      Itinerary
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-slideshow")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors flex items-center gap-1 ${
                        activeSection === "slideshow" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      <Images className="w-3 h-3 hidden sm:inline" />
                      Gallery
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-memory-book")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors flex items-center gap-1 ${
                        activeSection === "scrapbook" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      <BookOpen className="w-3 h-3 hidden sm:inline" />
                      Scrapbook
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-quiz")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors flex items-center gap-1 ${
                        activeSection === "quiz" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      <HelpCircle className="w-3 h-3 hidden sm:inline" />
                      Trivia
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-wishes")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors flex items-center gap-1 ${
                        activeSection === "wishes" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      <MessageSquareHeart className="w-3 h-3 hidden sm:inline" />
                      Wishes
                    </button>

                    <span className="text-stone-750 text-[9px]">•</span>

                    <button
                      onClick={() => scrollToId("section-final-ending")}
                      className={`text-[9px] sm:text-xs tracking-wider font-mono uppercase whitespace-nowrap transition-colors flex items-center gap-1 ${
                        activeSection === "vows" ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-100"
                      }`}
                    >
                      <Gift className="w-3 h-3 hidden sm:inline" />
                      Vows
                    </button>
                  </div>

                  {/* Right: Quick Action Controls */}
                  <div className="flex items-center gap-2 pl-3 border-l border-stone-800 shrink-0">
                    {/* Unbox Envelope Modal */}
                    <button
                      onClick={() => {
                        soundFX.playWaxSealStamp();
                        setIsEnvelopeOpen(true);
                      }}
                      className="p-1.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-300/40 text-amber-200 transition-colors"
                      title="Open Royal Envelope"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>

                    {/* Keepsake Card Modal */}
                    <button
                      onClick={() => {
                        soundFX.playChime(900);
                        setIsKeepsakeOpen(true);
                      }}
                      className="p-1.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-300/40 text-amber-200 transition-colors"
                      title="Download Keepsake Card"
                    >
                      <Award className="w-3.5 h-3.5" />
                    </button>

                    {/* Sound FX Toggle */}
                    <button
                      onClick={toggleSFX}
                      className="p-1.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-300/40 text-stone-300 transition-colors"
                      title={sfxEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
                    >
                      {sfxEnabled ? (
                        <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                      )}
                    </button>
                  </div>
                </nav>
              </motion.header>
            )}
          </AnimatePresence>

          {/* LANDING PAGE INTRO */}
          <HeroSection
            onOpenStory={handleOpenStory}
            onOpenEnvelope={() => setIsEnvelopeOpen(true)}
            onOpenKeepsake={() => setIsKeepsakeOpen(true)}
          />

          {/* MULTI-SECTION CHRONOLOGY & ADVANCED EXPERIENCES */}
          <AnimatePresence>
            {isStoryOpened && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col w-full"
              >
                {/* 1. Auspicious Live Countdown & Milestones */}
                <CountdownSection />

                {/* 2. First Smile, Journey timeline, 3D carousel */}
                <TimelineSection />

                {/* 3. The Royal Itinerary & Ceremonies */}
                <RoyalItinerarySection />

                {/* 4. Full screen cinematic photo slideshow */}
                <section id="section-slideshow" className="w-full bg-stone-950/40 border-y border-stone-900/60">
                  <SlideshowSection />
                </section>

                {/* 5. Physical scrapbook pages with polaroids */}
                <section id="section-memory-book" className="w-full">
                  <MemoryBookSection />
                </section>

                {/* 6. Romantic Couple Trivia Challenge */}
                <LoveQuizSection />

                {/* 7. Digital Guestbook & Live Wishes Wall */}
                <WishesWallSection />

                {/* 8. Grand Finale Lanterns / Overlapping Rings */}
                <FinalSection />
              </motion.div>
            )}
          </AnimatePresence>

          {/* FLOATING ROSE PETAL & GLITTER BLESSING CANNON */}
          {isStoryOpened && <BlessingCannonFAB />}

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

          {/* 3D ROYAL WAX-SEALED ENVELOPE UNBOXING MODAL */}
          <RoyalEnvelopeModal
            isOpen={isEnvelopeOpen}
            onClose={() => setIsEnvelopeOpen(false)}
          />

          {/* DIGITAL KEEPSAKE INVITATION CARD GENERATOR MODAL */}
          <KeepsakeModal
            isOpen={isKeepsakeOpen}
            onClose={() => setIsKeepsakeOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
