import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, Sparkles, Music, Sun, Flame, Wine, ChevronRight, Navigation } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";

export const RoyalItinerarySection: React.FC = () => {
  const { events } = weddingData;
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0].id);

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case "music":
        return <Music className="w-4 h-4 text-amber-300" />;
      case "sun":
        return <Sun className="w-4 h-4 text-amber-300" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 text-amber-300" />;
      case "flame":
        return <Flame className="w-4 h-4 text-rose-400" />;
      case "glass":
        return <Wine className="w-4 h-4 text-amber-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-300" />;
    }
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <section id="section-itinerary" className="w-full py-24 px-4 sm:px-6 relative z-10 select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs font-mono tracking-widest uppercase mb-4">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            Ceremonial Celebrations
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 tracking-wider mb-4">
            The Royal <span className="italic text-amber-200 font-serif">Itinerary</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed font-light">
            Five exquisite events honoring timeless traditions, grand music, sacred mantras, and endless celebrations.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT: Event Selector List & Detailed Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Event Tabs / Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {events.map((evt, idx) => {
              const isSelected = evt.id === selectedEventId;
              return (
                <motion.div
                  key={evt.id}
                  onClick={() => {
                    soundFX.playChime(750 + idx * 60);
                    setSelectedEventId(evt.id);
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? "bg-amber-400/15 border-amber-300/60 shadow-[0_4px_24px_rgba(251,191,36,0.18)]"
                      : "bg-stone-900/60 border-stone-800/80 hover:border-amber-300/30 hover:bg-stone-900"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        isSelected
                          ? "bg-amber-400/20 border-amber-300/40"
                          : "bg-stone-950 border-stone-800"
                      }`}
                    >
                      {getEventIcon(evt.iconName)}
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-wider">
                          {evt.date}
                        </span>
                        <span className="text-stone-600 text-xs">•</span>
                        <span className="text-[10px] font-mono text-stone-400">
                          {evt.time}
                        </span>
                      </div>
                      <h4
                        className={`font-serif text-base sm:text-lg tracking-wide ${
                          isSelected ? "text-amber-100 font-medium" : "text-stone-300"
                        }`}
                      >
                        {evt.title}
                      </h4>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-amber-300 translate-x-1" : "text-stone-600"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Active Event Spotlight Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="glass-panel p-6 sm:p-10 rounded-3xl border border-amber-300/30 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
              >
                {/* Background watermarked floral stamp */}
                <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5 text-amber-200">
                  <div className="w-48 h-48 rounded-full border border-current flex items-center justify-center">
                    <Sparkles className="w-24 h-24" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-[10px] font-mono uppercase tracking-widest">
                    {selectedEvent.badge}
                  </span>
                  <span className="text-stone-500 text-xs font-mono">
                    Event 0{events.findIndex((e) => e.id === selectedEvent.id) + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl text-amber-100 font-normal tracking-wide mb-2">
                  {selectedEvent.title}
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-stone-300 mb-6 font-light">
                  "{selectedEvent.subTitle}"
                </p>

                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-8 bg-stone-950/40 p-4 rounded-xl border border-stone-800/80">
                  {selectedEvent.description}
                </p>

                {/* Event Key Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800/80 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                        Date &amp; Time
                      </div>
                      <div className="text-xs sm:text-sm text-stone-200 font-medium mt-0.5">
                        {selectedEvent.date}
                      </div>
                      <div className="text-[11px] text-amber-200/80 font-mono mt-0.5">
                        {selectedEvent.time}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800/80 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                        Venue Location
                      </div>
                      <div className="text-xs sm:text-sm text-stone-200 font-medium mt-0.5">
                        {selectedEvent.venue}
                      </div>
                      <div className="text-[11px] text-stone-400 font-sans mt-0.5">
                        The Royal Palace Resort, Jaipur
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dress code & Navigation buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                      Dress Code:
                    </span>
                    <span className="text-xs font-mono text-amber-200 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-300/20">
                      {selectedEvent.dressCode}
                    </span>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      "The Royal Palace Resort Jaipur Amber Fort Road"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playChime(880)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-amber-300 hover:text-amber-100 tracking-wider hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Open Map Directions
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
