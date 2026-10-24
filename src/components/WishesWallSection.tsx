import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquareHeart, Heart, Send, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingData } from "../data/weddingData";
import { GuestBlessing } from "../types";
import { soundFX } from "../utils/soundFX";

const EMOJI_SEALS = ["🌸", "💍", "🥂", "🪷", "🕊️", "✨", "🪔"];
const RELATIONS: GuestBlessing["relation"][] = [
  "Family",
  "College Friend",
  "Childhood Friend",
  "Colleague",
  "Well-Wisher",
];

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
}

export const WishesWallSection: React.FC = () => {
  const [blessings, setBlessings] = useState<GuestBlessing[]>(() => {
    try {
      const saved = localStorage.getItem("wedding_guest_blessings");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return weddingData.initialBlessings;
  });

  const [authorName, setAuthorName] = useState("");
  const [selectedRelation, setSelectedRelation] = useState<GuestBlessing["relation"]>("Family");
  const [selectedSeal, setSelectedSeal] = useState(EMOJI_SEALS[0]);
  const [message, setMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem("wedding_guest_blessings", JSON.stringify(blessings));
    } catch {}
  }, [blessings]);

  // Handle spawn floating reaction
  const spawnReaction = (emoji: string) => {
    soundFX.playChime(950);
    const newReaction: FloatingReaction = {
      id: Date.now() + Math.random(),
      emoji,
      x: 10 + Math.random() * 80,
    };
    setFloatingReactions((prev) => [...prev, newReaction]);

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 2500);
  };

  const handleLike = (id: string) => {
    soundFX.playChime(1100);
    setBlessings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    soundFX.playWeddingBlessing();

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#d6b572", "#fb7185", "#fef08a", "#ffffff"],
    });

    const newBlessing: GuestBlessing = {
      id: `blessing-${Date.now()}`,
      author: authorName.trim(),
      relation: selectedRelation,
      message: message.trim(),
      sealEmoji: selectedSeal,
      timestamp: "Just now",
      likes: 1,
    };

    setBlessings([newBlessing, ...blessings]);
    setAuthorName("");
    setMessage("");
    setHasSubmitted(true);
    setTimeout(() => setHasSubmitted(false), 4000);
  };

  const filteredBlessings =
    activeFilter === "All"
      ? blessings
      : blessings.filter((b) => b.relation === activeFilter);

  return (
    <section id="section-wishes" className="w-full py-24 px-4 sm:px-6 relative z-10 select-none">
      
      {/* FLOATING EMOJI REACTIONS OVERLAY */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        <AnimatePresence>
          {floatingReactions.map((r) => (
            <motion.div
              key={r.id}
              className="absolute text-3xl select-none"
              style={{ left: `${r.x}%`, bottom: "10%" }}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -450, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs font-mono tracking-widest uppercase mb-4">
            <MessageSquareHeart className="w-3.5 h-3.5 text-amber-300" />
            Digital Guestbook &amp; Wishes Wall
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 tracking-wider mb-4">
            Shower Your <span className="italic text-amber-200 font-serif">Blessings</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed font-light mb-8">
            Leave your loving thoughts, marriage advice, and celebratory wishes for Aarav &amp; Ananya.
          </p>

          {/* Quick Floating Reaction Bar */}
          <div className="inline-flex items-center gap-2 sm:gap-3 p-2 px-4 rounded-full glass-panel border border-amber-300/20 shadow-md">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/70 mr-1 hidden sm:inline">
              React Live:
            </span>
            {["❤️", "🌸", "🥂", "💍", "✨", "🪷", "🕊️"].map((emoji) => (
              <motion.button
                key={emoji}
                onClick={() => spawnReaction(emoji)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-stone-900/60 hover:bg-stone-800 flex items-center justify-center text-base sm:text-lg cursor-pointer transition-colors"
                title={`Send ${emoji}`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        {/* MAIN GRID: Form (Left) & Wall (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Add Your Blessing Form */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-300/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <h3 className="font-serif text-xl sm:text-2xl text-amber-100 mb-2 font-normal">
                Sign the Guestbook
              </h3>
              <p className="text-xs text-stone-400 font-light mb-6">
                Your message will appear instantly on the couple's private wishes board.
              </p>

              {hasSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thank you! Your heartfelt blessing has been recorded for the couple.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Author Name */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                    Your Name(s) *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Rahul & Priya"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-750 focus:border-amber-300/70 focus:outline-none text-xs sm:text-sm text-stone-100 placeholder-stone-500 transition-colors"
                  />
                </div>

                {/* Relationship Pill Selection */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                    Your Connection
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {RELATIONS.map((rel) => (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => {
                          soundFX.playChime(850);
                          setSelectedRelation(rel);
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          selectedRelation === rel
                            ? "bg-amber-400/20 text-amber-200 border border-amber-300/50"
                            : "bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200"
                        }`}
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wax Seal Emoji Choice */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                    Pick a Blessing Seal Stamp
                  </label>
                  <div className="flex items-center gap-2">
                    {EMOJI_SEALS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          soundFX.playChime(900);
                          setSelectedSeal(emoji);
                        }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all cursor-pointer ${
                          selectedSeal === emoji
                            ? "bg-amber-400/25 border-2 border-amber-300 scale-110 shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                            : "bg-stone-900 border border-stone-800 hover:border-amber-300/30"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blessing Message */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-300 mb-1.5">
                    Your Warm Blessing *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your wishes, favorite memory with the couple, or blessings for their forever..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-750 focus:border-amber-300/70 focus:outline-none text-xs sm:text-sm text-stone-100 placeholder-stone-500 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-mono text-xs uppercase tracking-widest font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(214,181,114,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Blessing to Wishes Wall
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Wishes Wall Display */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Filter Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
              <div className="flex items-center gap-2 text-stone-400 text-xs font-mono">
                <Filter className="w-3.5 h-3.5 text-amber-300" />
                <span>Filter:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["All", ...RELATIONS].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundFX.playChime(800);
                      setActiveFilter(cat);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeFilter === cat
                        ? "bg-amber-300 text-stone-950 font-semibold"
                        : "bg-stone-900 text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Blessing Cards */}
            <div className="flex flex-col gap-4 max-h-[560px] overflow-y-auto pr-1">
              <AnimatePresence>
                {filteredBlessings.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 rounded-2xl glass-panel-light border border-white/5 hover:border-amber-300/30 transition-all shadow-md relative group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-300/30 flex items-center justify-center text-sm">
                          {b.sealEmoji}
                        </div>
                        <div>
                          <h4 className="font-serif text-base text-stone-200 font-medium tracking-wide">
                            {b.author}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                            <span className="text-amber-300/80">{b.relation}</span>
                            <span>•</span>
                            <span>{b.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      {/* Like Reaction Button */}
                      <button
                        onClick={() => handleLike(b.id)}
                        className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 hover:border-rose-400/40 text-stone-300 hover:text-rose-400 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
                        <span className="text-[11px] font-mono">{b.likes}</span>
                      </button>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-stone-300 font-light leading-relaxed pl-1 italic">
                      "{b.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
