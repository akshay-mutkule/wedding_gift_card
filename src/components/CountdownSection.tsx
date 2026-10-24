import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Download, ExternalLink, Heart, Sparkles, Check } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";

export const CountdownSection: React.FC = () => {
  const { couple } = weddingData;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = couple.targetTimestamp - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [couple.targetTimestamp]);

  const handleCopyVenue = () => {
    soundFX.playChime(900);
    navigator.clipboard.writeText(
      `${couple.weddingVenue}, Amber Fort Road, Jaipur, Rajasthan 302001`
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleDownloadICS = () => {
    soundFX.playChime(1040);
    const startDate = "20261218T123000Z";
    const endDate = "20261218T183000Z";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Aarav and Ananya Wedding//EN",
      "BEGIN:VEVENT",
      `SUMMARY:Wedding Celebration: ${couple.groom} & ${couple.bride}`,
      `DESCRIPTION:Join us for the royal wedding celebration of ${couple.groom} and ${couple.bride} at ${couple.weddingVenue}.`,
      `LOCATION:${couple.weddingVenue}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Aarav-Ananya-Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+${encodeURIComponent(
    couple.groom
  )}+%26+${encodeURIComponent(couple.bride)}&dates=20261218T123000Z/20261218T183000Z&details=${encodeURIComponent(
    "Join us for the royal wedding celebration of Aarav & Ananya!"
  )}&location=${encodeURIComponent(couple.weddingVenue)}`;

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const milestones = [
    { number: "1,180+", label: "Days of Love", icon: "❤️" },
    { number: "450+", label: "Coffee Dates", icon: "☕" },
    { number: "14", label: "Cities Explored", icon: "✈️" },
    { number: "Infinite", label: "Sweet Promises", icon: "♾️" },
  ];

  return (
    <section id="section-countdown" className="w-full py-20 px-4 relative z-10 select-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs font-mono tracking-widest uppercase mb-4">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          The Auspicious Moment
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 tracking-wider mb-4">
          Counting Down To <span className="italic text-amber-200 font-serif">Forever</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-lg mb-10 leading-relaxed font-light">
          Until Aarav and Ananya unite their souls in sacred vows under the starlit skies of Jaipur.
        </p>

        {/* 4 CLOCK METERS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl mb-12">
          {timeBlocks.map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-panel p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center border border-amber-300/20 relative overflow-hidden group hover:border-amber-300/40 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Corner Ornament */}
              <div className="absolute top-1 right-2 text-[9px] text-amber-400/30 font-mono">✦</div>
              
              <div className="text-3xl sm:text-5xl md:text-6xl font-serif text-amber-100 font-normal tracking-tight group-hover:text-amber-200 transition-colors">
                {String(block.value).padStart(2, "0")}
              </div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-amber-400/70 mt-2">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CALENDAR & VENUE ACTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playChime(800)}
            className="px-5 py-2.5 rounded-full bg-stone-900 border border-amber-300/30 hover:border-amber-300 text-stone-200 hover:text-amber-100 text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all hover:bg-stone-850 shadow-md cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            Add to Google Calendar
            <ExternalLink className="w-3 h-3 text-stone-500" />
          </a>

          <button
            onClick={handleDownloadICS}
            className="px-5 py-2.5 rounded-full bg-stone-900 border border-amber-300/30 hover:border-amber-300 text-stone-200 hover:text-amber-100 text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all hover:bg-stone-850 shadow-md cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            Save .iCal File
          </button>

          <button
            onClick={handleCopyVenue}
            className="px-5 py-2.5 rounded-full bg-amber-400/10 border border-amber-300/40 hover:border-amber-300 text-amber-200 text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all hover:bg-amber-400/20 shadow-md cursor-pointer"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Venue Address Copied!</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                Copy Venue Address
              </>
            )}
          </button>
        </div>

        {/* TOGETHERNESS STATS STRIP */}
        <div className="w-full max-w-4xl glass-panel-light p-6 sm:p-8 rounded-3xl border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {milestones.map((ms, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xl mb-1">{ms.icon}</span>
              <span className="font-serif text-2xl sm:text-3xl text-amber-100 font-light tracking-wide">
                {ms.number}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-stone-400 mt-1">
                {ms.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
