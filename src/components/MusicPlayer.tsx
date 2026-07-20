import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, ListMusic, ChevronDown, ChevronUp } from "lucide-react";
import { weddingData } from "../data/weddingData";

interface MusicPlayerProps {
  isStoryOpened: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isStoryOpened }) => {
  const { playlist } = weddingData;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentTrackIndex];

  // Instantly autoplay when user opens the story
  useEffect(() => {
    if (isStoryOpened && audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play().catch((err) => {
        console.log("Autoplay was blocked by browser permissions until further interaction: ", err);
      });
    }
  }, [isStoryOpened]);

  // Sync state with HTML audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        setIsPlaying(false);
        console.log("Audio play blocked: ", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Sync volume & mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setTrackProgress(0);
  };

  const handlePrevTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    setTrackProgress(0);
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 0;
      setDuration(total);
      setTrackProgress(total > 0 ? (current / total) * 100 : 0);
    }
  };

  const handleAudioEnded = () => {
    // Autoplay next track on end
    handleNextTrack({ stopPropagation: () => {} } as any);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    
    audio.currentTime = percentage * duration;
    setTrackProgress(percentage * 100);
  };

  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return "0:00";
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div id="floating-music-player" className="fixed bottom-6 right-6 z-40 select-none">
      {/* Hidden native HTML Audio Node */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      {/* EXPANDED PLAYER DECK PANEL */}
      <AnimatePresence>
        {isPlayerExpanded && (
          <motion.div
            className="absolute bottom-16 -right-2 sm:right-0 w-[calc(100vw-32px)] max-w-[320px] sm:w-80 glass-panel rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-amber-300/20 text-stone-100 mb-2 overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Player header */}
            <div className="flex items-center justify-between border-b border-stone-800/40 pb-3 mb-4">
              <span className="flex items-center gap-2 text-xs tracking-widest font-mono text-amber-200 uppercase">
                <Music className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
                Wedding Symphony
              </span>
              <button
                onClick={() => setIsPlayerExpanded(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-200 hover:bg-stone-900/60 transition"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Currently playing cover card layout */}
            <div className="flex items-center gap-4 mb-4">
              {/* Disc vinyl */}
              <div className="relative w-14 h-14 rounded-full bg-stone-950 flex items-center justify-center border border-amber-300/30 overflow-hidden flex-shrink-0">
                <motion.div
                  className="w-10 h-10 rounded-full border border-stone-900/40 bg-gradient-to-tr from-amber-400/40 to-rose-400/40 flex items-center justify-center"
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Music className="w-4 h-4 text-amber-200" />
                </motion.div>
                {/* Center hole */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#fbf8f2]" />
              </div>

              {/* Text metadata */}
              <div className="overflow-hidden flex-grow">
                <h5 className="font-serif text-sm font-semibold tracking-wide text-amber-100 truncate">
                  {currentTrack.title}
                </h5>
                <p className="text-[10px] text-stone-400 font-mono truncate uppercase">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* PROGRESS TRACK BAR BAR */}
            <div className="mb-4">
              <div
                className="w-full h-1 bg-stone-800 rounded-full overflow-hidden cursor-pointer relative"
                onClick={handleProgressBarClick}
              >
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"
                  style={{ width: `${trackProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono mt-1.5">
                <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
                <span>{audioRef.current && !isNaN(audioRef.current.duration) ? formatTime(audioRef.current.duration) : "2:30"}</span>
              </div>
            </div>

            {/* PLAYER BUTTONS ROW */}
            <div className="flex items-center justify-center gap-5 mb-5">
              {/* Skip back */}
              <button
                onClick={handlePrevTrack}
                className="p-2 text-stone-400 hover:text-stone-100 transition"
              >
                <SkipBack className="w-4.5 h-4.5" />
              </button>

              {/* Play/Pause center circle */}
              <button
                onClick={handlePlayPause}
                className="p-3 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 rounded-full text-stone-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-stone-950" />}
              </button>

              {/* Skip forward */}
              <button
                onClick={handleNextTrack}
                className="p-2 text-stone-400 hover:text-stone-100 transition"
              >
                <SkipForward className="w-4.5 h-4.5" />
              </button>

              {/* Toggle Playlist drawer */}
              <button
                onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                className={`p-2 transition-colors ${isPlaylistOpen ? "text-amber-300" : "text-stone-400 hover:text-stone-100"}`}
                title="Playlist"
              >
                <ListMusic className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* VOLUME RANGE ROW */}
            <div className="flex items-center gap-2 px-1 border-t border-stone-800/20 pt-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-stone-400 hover:text-stone-200 transition"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* PLAYLIST ACCORDION DRAWER */}
            <AnimatePresence>
              {isPlaylistOpen && (
                <motion.div
                  className="mt-4 border-t border-stone-850 pt-3 max-h-32 overflow-y-auto space-y-1 scrollbar-thin"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {playlist.map((track, idx) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition ${
                        idx === currentTrackIndex
                          ? "bg-amber-400/10 text-amber-200 border border-amber-300/20"
                          : "hover:bg-stone-900/60 text-stone-400 hover:text-stone-200"
                      }`}
                    >
                      <span className="truncate pr-4 font-serif">{track.title}</span>
                      {idx === currentTrackIndex && isPlaying && (
                        <div className="flex items-center gap-0.5 h-3">
                          <span className="w-0.5 bg-amber-400 animate-pulse h-full" style={{ animationDelay: '0.1s' }} />
                          <span className="w-0.5 bg-rose-400 animate-pulse h-2/3" style={{ animationDelay: '0.3s' }} />
                          <span className="w-0.5 bg-amber-400 animate-pulse h-full" style={{ animationDelay: '0.2s' }} />
                        </div>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CIRCULAR CORE TRIGGER BUTTON */}
      <motion.button
        onClick={() => setIsPlayerExpanded(!isPlayerExpanded)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full border flex items-center justify-center relative shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur cursor-pointer ${
          isPlayerExpanded
            ? "bg-amber-300 border-stone-950 text-stone-950"
            : "bg-stone-900 border-amber-300/40 text-amber-200 hover:border-amber-300"
        }`}
        aria-label="Toggle Wedding Music Player"
      >
        {/* Animated outer soundwaves concentric circles if music is playing */}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping opacity-60" />
            <span className="absolute inset-[-4px] rounded-full border border-rose-400/20 animate-pulse opacity-40" />
          </>
        )}

        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="active-playing-vinyl"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Music className={`w-5 h-5 ${isPlayerExpanded ? "text-stone-950" : "text-amber-300"}`} />
            </motion.div>
          ) : (
            <motion.div key="inactive-stopped-player">
              {isPlayerExpanded ? <ChevronUp className="w-5 h-5 text-stone-950" /> : <Music className="w-5 h-5" />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
