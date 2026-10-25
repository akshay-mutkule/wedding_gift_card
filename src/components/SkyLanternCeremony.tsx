import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Send, Sparkles, Heart, Crown, RefreshCw } from "lucide-react";
import { LanternWish } from "../types";
import { initialLanternWishes } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";
import confetti from "canvas-confetti";

export const SkyLanternCeremony: React.FC = () => {
  const [lanterns, setLanterns] = useState<LanternWish[]>([]);
  const [totalReleased, setTotalReleased] = useState(148);
  const [authorName, setAuthorName] = useState("");
  const [wishText, setWishText] = useState("");
  const [selectedColor, setSelectedColor] = useState<LanternWish["color"]>("gold");
  const [diyaLit, setDiyaLit] = useState(false);
  const [activeFlyingLantern, setActiveFlyingLantern] = useState<LanternWish | null>(
    null
  );

  // Load lanterns and counter from localStorage
  useEffect(() => {
    try {
      const savedLanterns = localStorage.getItem("wedding_lantern_wishes_v1");
      const savedCount = localStorage.getItem("wedding_lanterns_count_v1");

      if (savedLanterns) {
        setLanterns(JSON.parse(savedLanterns));
      } else {
        setLanterns(initialLanternWishes);
      }

      if (savedCount) {
        setTotalReleased(parseInt(savedCount, 10));
      }
    } catch {}
  }, []);

  const handleReleaseLantern = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    soundFX.playLanternRise();

    const newLantern: LanternWish = {
      id: `lantern-${Date.now()}`,
      author: authorName.trim() || "Loving Well-Wisher",
      wish: wishText.trim(),
      color: selectedColor,
      timestamp: "Just now",
      xPos: Math.floor(Math.random() * 70) + 15,
    };

    // Trigger visual launch animation
    setActiveFlyingLantern(newLantern);
    const updated = [newLantern, ...lanterns];
    const newCount = totalReleased + 1;

    setLanterns(updated);
    setTotalReleased(newCount);

    try {
      localStorage.setItem("wedding_lantern_wishes_v1", JSON.stringify(updated.slice(0, 30)));
      localStorage.setItem("wedding_lanterns_count_v1", newCount.toString());
    } catch {}

    setWishText("");

    // Gentle gold petal burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#fbbf24", "#f59e0b", "#fde68a"],
    });

    // Remove flying active lantern after 8s transition
    setTimeout(() => {
      setActiveFlyingLantern(null);
    }, 8000);
  };

  const handleLightDiya = () => {
    soundFX.playWaxSealStamp();
    setDiyaLit(true);
    soundFX.playChime(1200);
  };

  const getColorClasses = (color: LanternWish["color"]) => {
    switch (color) {
      case "rose":
        return {
          glow: "shadow-[0_0_25px_rgba(244,63,94,0.6)]",
          border: "border-rose-400/50",
          bg: "bg-rose-500/20",
          text: "text-rose-300",
        };
      case "emerald":
        return {
          glow: "shadow-[0_0_25px_rgba(16,185,129,0.6)]",
          border: "border-emerald-400/50",
          bg: "bg-emerald-500/20",
          text: "text-emerald-300",
        };
      case "violet":
        return {
          glow: "shadow-[0_0_25px_rgba(168,85,247,0.6)]",
          border: "border-purple-400/50",
          bg: "bg-purple-500/20",
          text: "text-purple-300",
        };
      case "gold":
      default:
        return {
          glow: "shadow-[0_0_25px_rgba(251,191,36,0.6)]",
          border: "border-amber-400/50",
          bg: "bg-amber-500/20",
          text: "text-amber-300",
        };
    }
  };

  return (
    <section
      id="section-sky-lanterns"
      className="relative py-24 sm:py-32 w-full px-4 overflow-hidden z-10"
    >
      {/* Deep twilight sky background with twinkling stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09050d] via-[#120817] to-[#08020a] pointer-events-none" />

      {/* Floating starry particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200 animate-pulse"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 95}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDuration: `${(i % 4) + 2}s`,
            }}
          />
        ))}
      </div>

      {/* ACTIVE FLYING LANTERN ANIMATION ACROSS THE SKY */}
      <AnimatePresence>
        {activeFlyingLantern && (
          <motion.div
            key={activeFlyingLantern.id}
            initial={{ y: 350, opacity: 1, scale: 0.8 }}
            animate={{
              y: -500,
              opacity: [1, 0.9, 0.7, 0],
              scale: [0.8, 1.2, 0.6, 0.3],
            }}
            transition={{ duration: 7.5, ease: "easeOut" }}
            style={{ left: `${activeFlyingLantern.xPos}%` }}
            className="absolute pointer-events-none z-30 flex flex-col items-center"
          >
            {/* Glowing Lantern Box */}
            <div
              className={`w-14 h-18 rounded-t-xl rounded-b-md p-1.5 flex flex-col items-center justify-between shadow-[0_0_40px_#f59e0b] border border-amber-300/80 bg-gradient-to-t from-amber-600/90 via-amber-400/90 to-amber-200/90 text-stone-950`}
            >
              <div className="w-2 h-2 rounded-full bg-amber-100" />
              <div className="text-[9px] font-script font-bold text-center leading-tight">
                A &amp; A
              </div>
              <div className="w-5 h-2 rounded-full bg-orange-600 blur-[1px] animate-ping" />
            </div>
            {/* Glow Flame under lantern */}
            <div className="w-4 h-4 bg-orange-400 rounded-full blur-md -mt-1" />
            <span className="mt-1 text-[10px] font-mono text-amber-200/80 bg-black/60 px-2 py-0.5 rounded-full border border-amber-300/30 whitespace-nowrap">
              {activeFlyingLantern.author} &bull; {activeFlyingLantern.wish.substring(0, 20)}...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-300/30 text-amber-300 text-xs font-mono uppercase tracking-widest"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Deep Daan &bull; दीप दान एवं आकाश दीप
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-wide"
          >
            Light a Diya &bull;{" "}
            <span className="italic font-serif gold-text-gradient">
              Release a Sky Lantern
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-stone-300/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Send your warmest prayers and wishes into the midnight canopy above the Amber hills.
            Watch your lantern ascend into infinity alongside fellow wedding guests.
          </motion.p>

          {/* Global Counter Badge */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs flex items-center gap-2 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>
                <strong className="text-stone-100 text-sm font-sans font-semibold">
                  {totalReleased}
                </strong>{" "}
                Lanterns &amp; Diyas Blessed so far
              </span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE CEREMONY WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Light Diya & Lantern Launch Studio (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive Sacred Diya Altar */}
            <div className="p-6 rounded-3xl glass-panel border border-amber-300/30 relative overflow-hidden flex flex-col items-center text-center">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400 font-semibold mb-2">
                Sacred Vedic Diya Altar
              </span>
              <h3 className="font-serif text-2xl text-stone-100 font-medium mb-4">
                Illumine the Sacred Flame
              </h3>

              {/* The Diya Graphic */}
              <div
                onClick={handleLightDiya}
                className="relative my-4 cursor-pointer group select-none"
              >
                {/* Brass Diya Vessel */}
                <div className="relative w-32 h-16 rounded-b-full bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border border-amber-400/60 shadow-[0_10px_30px_rgba(180,83,9,0.4)] flex items-center justify-center transition-transform group-hover:scale-105">
                  <div className="absolute top-0 w-28 h-5 rounded-full bg-amber-500/40 border border-amber-300/40" />

                  {/* Flame Animation (If Lit) */}
                  {diyaLit ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.15, 1], rotate: [-2, 2, -2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-10 w-8 h-12 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 blur-[0.5px] shadow-[0_0_35px_#f59e0b] flex items-center justify-center"
                    >
                      <div className="w-3 h-5 rounded-full bg-white blur-[1px]" />
                    </motion.div>
                  ) : (
                    <div className="absolute -top-3 w-1.5 h-3 bg-stone-700 rounded-t" />
                  )}
                </div>

                {/* Diya Glow Halo */}
                {diyaLit && (
                  <div className="absolute -inset-8 bg-amber-400/20 rounded-full blur-xl pointer-events-none animate-pulse" />
                )}
              </div>

              <p className="text-xs text-stone-300 font-light mt-1 mb-4">
                {diyaLit
                  ? "✨ May this sacred light bestow perpetual grace, harmony, and joy upon Aarav & Ananya."
                  : "Touch the brass diya to ignite the sacred blessing flame."}
              </p>

              <button
                onClick={handleLightDiya}
                className={`px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  diyaLit
                    ? "bg-amber-400/20 text-amber-200 border border-amber-400/40"
                    : "bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold shadow-lg shadow-amber-400/20"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {diyaLit ? "Sacred Diya Lit ✓" : "Light Sacred Diya"}
              </button>
            </div>

            {/* Sky Lantern Launch Form */}
            <div className="p-6 rounded-3xl glass-panel border border-amber-300/30">
              <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-medium mb-1">
                Release Your Sky Lantern
              </h3>
              <p className="text-xs text-stone-400 font-light mb-5">
                Imscribe your prayer or blessing. It will drift high into the midnight sky.
              </p>

              <form onSubmit={handleReleaseLantern} className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Your Name or Family
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g., Meera, Kabir &amp; Riya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Your Blessing / Wish for the Couple *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="May your love shine brighter than a thousand stars..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1.5">
                    Select Lantern Glow Color:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "gold", label: "24K Amber", colorClass: "bg-amber-400" },
                      { id: "rose", label: "Rose Ruby", colorClass: "bg-rose-400" },
                      { id: "emerald", label: "Emerald", colorClass: "bg-emerald-400" },
                      { id: "violet", label: "Violet Star", colorClass: "bg-purple-400" },
                    ].map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setSelectedColor(c.id as LanternWish["color"])}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          selectedColor === c.id
                            ? "bg-stone-800 border-amber-400 shadow-md"
                            : "bg-stone-900/60 border-stone-800 text-stone-400"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${c.colorClass}`} />
                        <span className="text-[10px] font-sans">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Release Sky Lantern into the Night
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Live Stream of Released Wishes & Lanterns (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-3xl glass-panel border border-amber-300/30">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="font-mono text-xs text-amber-300 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Lanterns Ascending the Aravali Sky
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  Live Feed ({lanterns.length})
                </span>
              </div>

              {/* Lantern Cards Grid / List */}
              <div className="mt-4 space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {lanterns.map((item) => {
                  const style = getColorClasses(item.color);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl bg-stone-900/60 border ${style.border} ${style.glow} transition-all duration-300 flex items-start gap-3`}
                    >
                      {/* Lantern icon representation */}
                      <div
                        className={`w-10 h-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center shrink-0 ${style.text}`}
                      >
                        <Flame className="w-5 h-5 animate-pulse" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-serif text-sm font-medium text-stone-200 truncate">
                            {item.author}
                          </h4>
                          <span className="text-[10px] font-mono text-stone-500 shrink-0">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-stone-300/90 font-light italic leading-relaxed">
                          &ldquo;{item.wish}&rdquo;
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
