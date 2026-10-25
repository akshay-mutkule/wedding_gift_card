import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  Sun,
  Wind,
  PhoneCall,
  Car,
  Navigation,
  CheckCircle,
  Eye,
  Info,
  Calendar,
} from "lucide-react";
import { palaceHotspots, conciergeGuide } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";

export const PalaceTourSection: React.FC = () => {
  const [activeSpotId, setActiveSpotId] = useState<string>("mandap");

  const currentSpot =
    palaceHotspots.find((spot) => spot.id === activeSpotId) || palaceHotspots[0];

  const handleSpotChange = (id: string) => {
    soundFX.playChime(850);
    setActiveSpotId(id);
  };

  const openVenueInMaps = () => {
    soundFX.playChime(1000);
    const query = encodeURIComponent(
      "Amber Fort Road, The Royal Palace Resort, Jaipur, Rajasthan"
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return (
    <section
      id="section-palace-tour"
      className="relative py-24 sm:py-32 w-full px-4 overflow-hidden z-10"
    >
      {/* Decorative architectural background halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-300/30 text-amber-300 text-xs font-mono uppercase tracking-widest"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Palace Grounds &bull; शाही महल दर्शन
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-wide"
          >
            Explore <span className="italic font-serif gold-text-gradient">The Royal Palace</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Step into the timeless majesty of Jaipur&apos;s heritage sandstone arches,
            illuminated lotus lakes, and glittering mirror ballrooms where every ceremony unfolds.
          </motion.p>
        </div>

        {/* INTERACTIVE PALACE ESTATE EXPLORER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* LEFT: Interactive Stylized Palace Map & Hotspot Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl glass-panel border border-amber-300/20">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-mono text-amber-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Select Palace Venue
                </span>
                <span className="text-stone-500 font-mono text-[11px]">
                  5 Royal Grounds
                </span>
              </div>

              {/* Hotspot buttons list */}
              <div className="space-y-2.5">
                {palaceHotspots.map((spot, idx) => {
                  const isActive = spot.id === activeSpotId;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => handleSpotChange(spot.id)}
                      className={`w-full p-3.5 rounded-xl text-left transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border-amber-400 shadow-[0_4px_20px_rgba(214,181,114,0.15)] translate-x-1"
                          : "bg-stone-900/40 border-stone-800/80 hover:border-amber-300/30 text-stone-400 hover:text-stone-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                            isActive
                              ? "bg-amber-400 text-stone-950"
                              : "bg-stone-800 text-stone-400"
                          }`}
                        >
                          0{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-serif text-base font-medium leading-tight ${
                                isActive ? "text-amber-200" : "text-stone-300"
                              }`}
                            >
                              {spot.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-amber-300/70 font-sans">
                            {spot.hindiTitle} &bull; {spot.timing.split("•")[0]}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-transform ${
                          isActive
                            ? "bg-amber-400 shadow-[0_0_8px_#f59e0b] scale-125"
                            : "bg-stone-700"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stylized Illustrated Architectural Map Mini-Preview */}
            <div className="relative h-44 rounded-2xl glass-panel border border-amber-300/20 overflow-hidden p-4 flex flex-col justify-between">
              {/* Grid backdrop */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #d6b572 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-300/80 font-mono uppercase tracking-wider">
                <span>Estate Blueprint • Amber Foothills</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Grounds Map
                </span>
              </div>

              {/* Pins placed relative to percentage coordinates */}
              <div className="relative w-full h-24 my-auto">
                {palaceHotspots.map((spot) => {
                  const isCurrent = spot.id === activeSpotId;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => handleSpotChange(spot.id)}
                      style={{
                        left: `${spot.mapCoordinates.x}%`,
                        top: `${spot.mapCoordinates.y}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                      title={spot.name}
                    >
                      <div
                        className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                          isCurrent
                            ? "w-7 h-7 bg-amber-400 text-stone-950 font-bold text-xs ring-4 ring-amber-400/30 scale-125"
                            : "w-4 h-4 bg-stone-800 border border-amber-300/50 hover:scale-125 hover:bg-amber-300"
                        }`}
                      >
                        {isCurrent && <MapPin className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] text-stone-400 font-sans">
                <span>North Gate: Amber Fort Road</span>
                <span>South Gate: Lotus Lake Pavilion</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Selected Venue Showcase View (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl glass-panel border border-amber-300/30 overflow-hidden shadow-2xl relative"
              >
                {/* Image Hero with Vignette */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <img
                    src={currentSpot.image}
                    alt={currentSpot.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  {/* Hindi Royal Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-300/40 text-amber-300 font-serif text-sm tracking-widest">
                    {currentSpot.hindiTitle}
                  </div>

                  {/* Timing Pill */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700 text-stone-200 text-xs font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {currentSpot.timing}
                  </div>

                  {/* Spot title overlay at bottom of image */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-amber-400 block mb-1">
                      {currentSpot.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-medium leading-tight">
                      {currentSpot.name}
                    </h3>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Spot Narrative Description */}
                  <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
                    {currentSpot.description}
                  </p>

                  {/* Royal Vibe Callout */}
                  <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-semibold block mb-0.5">
                        Palace Atmosphere &amp; Decor Vibe
                      </span>
                      <p className="text-xs text-stone-300 leading-normal font-light">
                        {currentSpot.vibe}
                      </p>
                    </div>
                  </div>

                  {/* Feature Badges */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2.5">
                      Ground Amenities &amp; Ceremonial Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentSpot.features.map((feature, i) => (
                        <div
                          key={i}
                          className="px-3 py-2 rounded-lg bg-stone-900/70 border border-stone-800 text-stone-200 text-xs flex items-center gap-2"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation CTA button */}
                  <div className="pt-2 flex items-center justify-between border-t border-stone-800/80">
                    <div className="text-xs text-stone-400 font-light">
                      The Royal Palace Resort &bull; Jaipur, Rajasthan
                    </div>
                    <button
                      onClick={openVenueInMaps}
                      className="px-4 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Open in Maps
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM UTILITIES: JAIPUR WEATHER FORECAST & GUEST CONCIERGE DESK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weather Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl glass-panel border border-amber-300/20 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-stone-100 font-medium">
                    Jaipur Winter Climate Forecast
                  </h4>
                  <p className="text-[11px] font-mono text-amber-200/70 uppercase tracking-wider">
                    December 16 - 18, 2026
                  </p>
                </div>
              </div>
              <span className="font-serif text-3xl font-light text-amber-300">
                {conciergeGuide.weatherForecast.temp}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4 p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 text-center">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Sky Condition
                </span>
                <span className="text-xs text-stone-200 font-medium">
                  {conciergeGuide.weatherForecast.condition}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Humidity
                </span>
                <span className="text-xs text-stone-200 font-medium">
                  {conciergeGuide.weatherForecast.humidity} (Crisp)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                  Sunset Hour
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  {conciergeGuide.weatherForecast.sunset.split(" ")[0]} PM
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300/90 font-light italic flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {conciergeGuide.weatherForecast.dressVibe}
            </p>
          </motion.div>

          {/* Concierge & Guest Helpdesk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl glass-panel border border-amber-300/20 relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-stone-100 font-medium">
                  Palace Concierge &amp; Transfers
                </h4>
                <p className="text-[11px] font-mono text-amber-200/70 uppercase tracking-wider">
                  24/7 Guest Assistance Desk
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-stone-300 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">&bull;</span>
                <span>{conciergeGuide.airportDistance}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">&bull;</span>
                <span>{conciergeGuide.railwayDistance}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">&bull;</span>
                <span>{conciergeGuide.valetParking}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                Concierge Helpline:
              </span>
              <span className="font-mono text-amber-300 font-medium">
                +91 141 289 0000
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
