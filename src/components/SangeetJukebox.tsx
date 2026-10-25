import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music,
  ThumbsUp,
  Flame,
  Radio,
  PlusCircle,
  Disc3,
  Sparkles,
  Headphones,
  Award,
  Volume2,
} from "lucide-react";
import { JukeboxSong } from "../types";
import { jukeboxPlaylist } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";
import confetti from "canvas-confetti";

export const SangeetJukebox: React.FC = () => {
  const [songs, setSongs] = useState<JukeboxSong[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [votedSongIds, setVotedSongIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newGenre, setNewGenre] = useState<JukeboxSong["genre"]>("Bhangra & Dhol");
  const [suggestedBy, setSuggestedBy] = useState("");
  const [previewingSongId, setPreviewingSongId] = useState<string | null>(null);

  // Load persisted song list and user votes
  useEffect(() => {
    try {
      const savedSongs = localStorage.getItem("wedding_jukebox_songs_v1");
      const savedVotes = localStorage.getItem("wedding_jukebox_user_votes_v1");

      if (savedSongs) {
        setSongs(JSON.parse(savedSongs));
      } else {
        setSongs(jukeboxPlaylist);
      }

      if (savedVotes) {
        setVotedSongIds(JSON.parse(savedVotes));
      }
    } catch {}
  }, []);

  const handleVote = (songId: string) => {
    soundFX.playJukeboxUpvote();

    const isAlreadyVoted = votedSongIds.includes(songId);
    let updatedVoted: string[];

    const updatedSongs = songs.map((s) => {
      if (s.id === songId) {
        const delta = isAlreadyVoted ? -1 : 1;
        return { ...s, votes: Math.max(0, s.votes + delta) };
      }
      return s;
    });

    if (isAlreadyVoted) {
      updatedVoted = votedSongIds.filter((id) => id !== songId);
    } else {
      updatedVoted = [...votedSongIds, songId];
      // Small celebratory confetti burst
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#d6b572", "#ec4899", "#8b5cf6"],
      });
    }

    setVotedSongIds(updatedVoted);
    // Keep list sorted by vote count
    updatedSongs.sort((a, b) => b.votes - a.votes);
    setSongs(updatedSongs);

    try {
      localStorage.setItem("wedding_jukebox_songs_v1", JSON.stringify(updatedSongs));
      localStorage.setItem("wedding_jukebox_user_votes_v1", JSON.stringify(updatedVoted));
    } catch {}
  };

  const handlePlayPreview = (song: JukeboxSong) => {
    setPreviewingSongId(song.id);
    const freq = song.previewFrequency || 440;
    soundFX.playChime(freq);
    setTimeout(() => {
      soundFX.playChime(freq * 1.25);
    }, 200);
    setTimeout(() => {
      setPreviewingSongId(null);
    }, 1200);
  };

  const handleAddNewSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) return;

    soundFX.playHarpArpeggio();

    const newSong: JukeboxSong = {
      id: `custom-track-${Date.now()}`,
      title: newTitle.trim(),
      artist: newArtist.trim(),
      genre: newGenre,
      votes: 1,
      duration: "3:30",
      suggestedBy: suggestedBy.trim() || "Guest Request",
      previewFrequency: 500,
    };

    const updated = [newSong, ...songs].sort((a, b) => b.votes - a.votes);
    setSongs(updated);
    setVotedSongIds([...votedSongIds, newSong.id]);

    try {
      localStorage.setItem("wedding_jukebox_songs_v1", JSON.stringify(updated));
      localStorage.setItem(
        "wedding_jukebox_user_votes_v1",
        JSON.stringify([...votedSongIds, newSong.id])
      );
    } catch {}

    setNewTitle("");
    setNewArtist("");
    setSuggestedBy("");
    setIsAddModalOpen(false);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d6b572", "#f43f5e", "#10b981"],
    });
  };

  const genres = [
    "All",
    "Bhangra & Dhol",
    "Bollywood Romance",
    "Sufi & Qawwali",
    "Retro 90s Golden",
  ];

  const filteredSongs =
    selectedGenre === "All"
      ? songs
      : songs.filter((s) => s.genre === selectedGenre);

  return (
    <section
      id="section-sangeet-jukebox"
      className="relative py-24 sm:py-32 w-full px-4 overflow-hidden z-10"
    >
      {/* Decorative disco/sangeet ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-300/30 text-amber-300 text-xs font-mono uppercase tracking-widest"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            Sangeet Mehfil &bull; संगीत महफ़िल एवं डीजे
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-wide"
          >
            The Royal <span className="italic font-serif gold-text-gradient">Sangeet Jukebox</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-stone-300/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Vote for the tracks you want the DJ to drop at the Sheesh Mahal Gala.
            Request your favorite songs to ignite the dance floor!
          </motion.p>

          {/* Action Row: Request Song button & Genre Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => {
                soundFX.playChime(900);
                setIsAddModalOpen(true);
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Request Song for DJ
            </button>
          </div>
        </div>

        {/* GENRE FILTER CHIPS */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => {
                soundFX.playChime(800);
                setSelectedGenre(g);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer shrink-0 border ${
                selectedGenre === g
                  ? "bg-amber-400 text-stone-950 border-amber-400 font-semibold shadow-md shadow-amber-400/20"
                  : "bg-stone-900/60 border-stone-800 text-stone-400 hover:border-amber-300/30 hover:text-stone-200"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* JUKEBOX TRACKS LEADERBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSongs.map((song, index) => {
            const isVoted = votedSongIds.includes(song.id);
            const isTopThree = index < 3;
            const medal =
              index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;

            return (
              <motion.div
                key={song.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl glass-panel border transition-all duration-300 flex items-center justify-between gap-3 ${
                  isTopThree
                    ? "border-amber-300/40 bg-gradient-to-r from-amber-950/20 via-stone-900/60 to-stone-900/40 shadow-lg shadow-amber-900/10"
                    : "border-stone-800/80 hover:border-stone-700"
                }`}
              >
                {/* Left: Position Rank & Play preview */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 font-mono text-xs font-bold text-amber-300">
                    {medal || `#${index + 1}`}
                  </div>

                  {/* Song Metadata */}
                  <div className="min-w-0">
                    <h4 className="font-serif text-base text-stone-100 font-medium truncate">
                      {song.title}
                    </h4>
                    <p className="text-xs text-stone-400 font-sans truncate">
                      {song.artist}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-amber-300 font-mono">
                        {song.genre}
                      </span>
                      {song.suggestedBy && (
                        <span className="text-[10px] text-stone-500 italic truncate">
                          Req: {song.suggestedBy}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Sound Preview & Upvote Trigger */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Synth Preview Tone Button */}
                  <button
                    onClick={() => handlePlayPreview(song)}
                    title="Audio Chime Preview"
                    className={`p-2 rounded-xl border text-stone-400 hover:text-amber-300 transition-colors cursor-pointer ${
                      previewingSongId === song.id
                        ? "bg-amber-400/20 border-amber-400 text-amber-300 animate-pulse"
                        : "bg-stone-900/60 border-stone-800 hover:border-amber-400/30"
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Upvote Pill */}
                  <button
                    onClick={() => handleVote(song.id)}
                    className={`px-3 py-2 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isVoted
                        ? "bg-amber-400 text-stone-950 border-amber-400 shadow-md shadow-amber-400/25"
                        : "bg-stone-900 border-stone-800 text-stone-300 hover:border-amber-400/40"
                    }`}
                  >
                    <ThumbsUp
                      className={`w-3.5 h-3.5 ${
                        isVoted ? "fill-stone-950" : "text-amber-400"
                      }`}
                    />
                    <span>{song.votes}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ADD SONG MODAL */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="relative w-full max-w-md bg-stone-950 border border-amber-300/30 rounded-3xl p-6 shadow-2xl z-10"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
                  <div className="flex items-center gap-2">
                    <Disc3 className="w-5 h-5 text-amber-400 animate-spin" />
                    <h3 className="font-serif text-xl text-stone-100 font-medium">
                      Request Song for Sangeet DJ
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-100 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddNewSong} className="space-y-4">
                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Song Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g., Mauja Hi Mauja"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Artist / Singer *
                    </label>
                    <input
                      type="text"
                      required
                      value={newArtist}
                      onChange={(e) => setNewArtist(e.target.value)}
                      placeholder="e.g., Mika Singh"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Genre
                    </label>
                    <select
                      value={newGenre}
                      onChange={(e) =>
                        setNewGenre(e.target.value as JukeboxSong["genre"])
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 focus:border-amber-400 text-stone-200 text-xs sm:text-sm focus:outline-none"
                    >
                      <option value="Bhangra & Dhol">Bhangra &amp; Dhol</option>
                      <option value="Bollywood Romance">Bollywood Romance</option>
                      <option value="Sufi & Qawwali">Sufi &amp; Qawwali</option>
                      <option value="Retro 90s Golden">Retro 90s Golden</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Dedicated From (Your Name / Squad)
                    </label>
                    <input
                      type="text"
                      value={suggestedBy}
                      onChange={(e) => setSuggestedBy(e.target.value)}
                      placeholder="e.g., Bride's Besties Squad"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-stone-800 text-stone-400 text-xs cursor-pointer hover:bg-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs tracking-wider uppercase cursor-pointer shadow-lg shadow-amber-400/20"
                    >
                      Submit to DJ Chart
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
