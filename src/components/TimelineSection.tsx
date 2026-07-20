import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, MapPin, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const TimelineSection: React.FC = () => {
  const { timeline, scrapbook } = weddingData;
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [hoveredGalleryIndex, setHoveredGalleryIndex] = useState<number | null>(null);

  // Auto-play the 3D Carousel background/active index every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCarouselIndex((prev) => (prev + 1) % timeline.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [timeline.length]);

  const handlePrevCarousel = () => {
    setActiveCarouselIndex((prev) => (prev === 0 ? timeline.length - 1 : prev - 1));
  };

  const handleNextCarousel = () => {
    setActiveCarouselIndex((prev) => (prev + 1) % timeline.length);
  };

  return (
    <div className="w-full flex flex-col items-center select-none py-16 px-4 md:px-8 space-y-32 relative z-10">
      {/* SECTION 1: "Our First Smile" - Ken Burns & Parallax Banner */}
      <section id="section-first-smile" className="w-full max-w-6xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase block mb-3">
            Section One
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light tracking-wider text-stone-100">
            Our First <span className="font-script text-amber-300 text-5xl md:text-6xl italic">Smile</span>
          </h3>
          <p className="text-stone-400 font-light max-w-lg mx-auto text-sm md:text-base mt-4 leading-relaxed">
            Where a brief conversation ignited a flame that would light up our entire universe.
          </p>
        </motion.div>

        {/* Ken Burns & Parallax Multi-layered display */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Ken Burns Frame */}
          <div className="lg:col-span-7 relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] group border border-amber-300/10">
            {/* The active zooming image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={timeline[0].image}
                alt={timeline[0].title}
                className="w-full h-full object-cover origin-center animate-kenburns scale-[1.05]"
                referrerPolicy="no-referrer"
              />
              {/* Glass Dark Overlay for captions */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />
            </div>

            {/* Drifting Floating Hearts inside the Ken Burns Frame */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="absolute text-rose-400/40"
                  style={{
                    left: `${20 + idx * 18}%`,
                    bottom: `${5 + Math.random() * 15}%`,
                  }}
                  animate={{
                    y: [-10, -80, -10],
                    x: [0, Math.sin(idx) * 20, 0],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.1, 0.4, 0.1],
                  }}
                  transition={{
                    duration: 6 + idx * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-5 h-5 fill-rose-500/20" />
                </motion.div>
              ))}
            </div>

            {/* Float Caption card in front */}
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-xl text-stone-100 z-10">
              <div className="flex items-center gap-2 text-rose-300 text-xs tracking-widest mb-1 font-mono uppercase">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                {timeline[0].date}
              </div>
              <h4 className="font-serif text-lg md:text-xl text-amber-200 tracking-wider mb-2">
                {timeline[0].title}
              </h4>
              <p className="text-xs md:text-sm font-light text-stone-300 italic">
                "{timeline[0].quote}"
              </p>
            </div>
          </div>

          {/* Details & Parallax Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel p-8 rounded-2xl relative border-l-2 border-l-amber-300/40 shadow-xl"
            >
              <div className="flex items-center gap-2 text-amber-200 text-xs tracking-widest uppercase font-mono mb-4">
                <MapPin className="w-4 h-4 text-amber-400" />
                The Encounter Detail
              </div>
              <p className="text-stone-300 font-light text-sm md:text-base leading-relaxed mb-6">
                {timeline[0].description}
              </p>

              {/* Step checklist */}
              <ul className="space-y-3.5">
                {timeline[0].details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.15 }}
                    className="flex items-start gap-3 text-xs md:text-sm text-stone-300"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/10 border border-amber-300/30 text-[10px] text-amber-300 font-mono font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="font-light">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: "Our Beautiful Journey" - 3D Glassmorphism Card Carousel */}
      <section id="section-beautiful-journey" className="w-full max-w-6xl flex flex-col items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase block mb-3">
            Section Two
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light tracking-wider text-stone-100">
            Our Beautiful <span className="font-script text-amber-300 text-5xl md:text-6xl italic">Journey</span>
          </h3>
          <p className="text-stone-400 font-light max-w-lg mx-auto text-sm md:text-base mt-4">
            Interactive 3D carousel tracking key chapters that defined our golden alliance.
          </p>
        </motion.div>

        {/* 3D Glass Carousel Display Frame */}
        <div className="w-full relative flex items-center justify-center min-h-[450px]">
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-20">
            <button
              onClick={handlePrevCarousel}
              className="p-3 rounded-full bg-stone-900/60 border border-amber-300/20 hover:border-amber-300 text-amber-200 transition-all shadow-lg backdrop-blur"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-20">
            <button
              onClick={handleNextCarousel}
              className="p-3 rounded-full bg-stone-900/60 border border-amber-300/20 hover:border-amber-300 text-amber-200 transition-all shadow-lg backdrop-blur"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Render Active Carousel Card in 3D Space */}
          <div className="w-full max-w-3xl px-14 sm:px-12 relative flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              {timeline.map((item, idx) => {
                if (idx !== activeCarouselIndex) return null;

                return (
                  <motion.div
                    key={item.id}
                    className="w-full glass-panel rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.9)] border border-amber-300/20 grid grid-cols-1 md:grid-cols-12 md:min-h-[380px]"
                    initial={{ opacity: 0, rotateY: 12, scale: 0.95, z: -30 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
                    exit={{ opacity: 0, rotateY: -12, scale: 0.95, z: -30 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    style={{ perspective: 1200 }}
                  >
                    {/* Image side */}
                    <div className="md:col-span-5 relative min-h-[200px] md:min-h-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out scale-100 hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      {/* Left border gold shine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-transparent" />
                    </div>

                    {/* Text Details side */}
                    <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        {/* Tag details */}
                        <div className="flex items-center gap-3 text-xs font-mono text-rose-300 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            {item.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-serif text-2xl md:text-3xl text-amber-100 tracking-wider mb-4 font-normal">
                          {item.title}
                        </h4>

                        {/* Content text */}
                        <p className="text-xs md:text-sm font-light text-stone-300 leading-relaxed mb-6">
                          {item.description}
                        </p>
                      </div>

                      {/* Floating Quote Block */}
                      <div className="pt-4 border-t border-stone-800/60">
                        <p className="text-xs md:text-sm italic text-amber-200/80 font-serif">
                          "{item.quote}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Indicator Bar Dots */}
        <div className="flex items-center gap-2.5 mt-8 z-10">
          {timeline.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCarouselIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeCarouselIndex
                  ? "w-8 bg-amber-300"
                  : "w-2 bg-stone-700 hover:bg-stone-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: "Moments We Treasure" - Masonry Sparkle Gallery */}
      <section id="section-moments-treasure" className="w-full max-w-6xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase block mb-3">
            Section Three
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light tracking-wider text-stone-100">
            Moments We <span className="font-script text-amber-300 text-5xl md:text-6xl italic">Treasure</span>
          </h3>
          <p className="text-stone-400 font-light max-w-lg mx-auto text-sm md:text-base mt-4">
            A beautiful, sparkling collage of our pre-wedding and royal memoirs, detailed with fine gold borders.
          </p>
        </motion.div>

        {/* Masonry/Grid of Memories */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scrapbook.map((item, index) => {
            const isTall = index % 2 === 1; // Creates nice staggered density
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative rounded-xl overflow-hidden bg-stone-900 group shadow-lg flex flex-col ${
                  isTall ? "lg:row-span-2" : ""
                } border border-amber-400/10 hover:border-amber-400/40 transition-all duration-500`}
                onMouseEnter={() => setHoveredGalleryIndex(index)}
                onMouseLeave={() => setHoveredGalleryIndex(null)}
              >
                {/* Polaroid-Style Double Gold Border Framing */}
                <div className="p-3 pb-5 flex flex-col h-full justify-between">
                  {/* Photo with inner shadow container */}
                  <div className="relative overflow-hidden rounded-lg bg-stone-950 aspect-4/3 w-full flex-grow-0 mb-3 border border-stone-850">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-[3000ms] group-hover:scale-110 group-hover:rotate-1"
                      referrerPolicy="no-referrer"
                    />

                    {/* Animated Golden Sparkle Icons Overlay on Hover */}
                    <AnimatePresence>
                      {hoveredGalleryIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-stone-950/20 flex items-center justify-center pointer-events-none z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Sparkles drifting */}
                          <Sparkles className="w-10 h-10 text-amber-300/80 animate-bounce" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Golden shine sweep */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>

                  {/* Caption & Metadata Polaroid text */}
                  <div className="px-1 text-left flex flex-col justify-end">
                    <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono tracking-wider mb-1">
                      <span>{item.date}</span>
                      <Heart className="w-2.5 h-2.5 text-rose-400/40 fill-rose-500/10 group-hover:text-rose-400 group-hover:fill-rose-500/20 transition-colors" />
                    </div>
                    <h5 className="font-serif text-sm text-amber-200 group-hover:text-amber-100 transition-colors tracking-wide">
                      {item.title}
                    </h5>
                    <p className="font-script text-amber-300/70 text-lg mt-1 tracking-wide leading-none">
                      {item.polaroidCaption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
