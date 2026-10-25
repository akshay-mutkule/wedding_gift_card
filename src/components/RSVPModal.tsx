import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  Utensils,
  Music,
  Users,
  Download,
  Share2,
  Sparkles,
  Crown,
  QrCode,
  ShieldCheck,
  Edit3,
} from "lucide-react";
import { weddingData } from "../data/weddingData";
import { RSVPRecord } from "../types";
import { soundFX } from "../utils/soundFX";
import confetti from "canvas-confetti";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CEREMONY_OPTIONS = [
  { id: "haldi", name: "Haldi Blossom Pool", date: "Dec 17 • Morning" },
  { id: "mehendi", name: "Mehendi & Folk High Tea", date: "Dec 16 • Afternoon" },
  { id: "sangeet", name: "The Royal Sangeet & DJ Gala", date: "Dec 17 • Evening" },
  { id: "pheras", name: "Vedic Pheras & Baraat", date: "Dec 18 • Sunset" },
  { id: "reception", name: "The Grand Royal Banquet", date: "Dec 18 • Night" },
];

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [existingRecord, setExistingRecord] = useState<RSVPRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(2);
  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>([
    "sangeet",
    "pheras",
    "reception",
  ]);
  const [dietary, setDietary] = useState<RSVPRecord["dietary"]>(
    "Royal Mughlai Feast"
  );
  const [songRequest, setSongRequest] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [copiedPass, setCopiedPass] = useState(false);
  const passCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load existing RSVP from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding_rsvp_record_v1");
      if (saved) {
        const parsed: RSVPRecord = JSON.parse(saved);
        setExistingRecord(parsed);
        setGuestName(parsed.guestName);
        setEmail(parsed.email);
        setPhone(parsed.phone);
        setAttending(parsed.attending);
        setGuestCount(parsed.guestCount);
        setSelectedCeremonies(parsed.ceremonies);
        setDietary(parsed.dietary);
        setSongRequest(parsed.songRequest);
        setPersonalNote(parsed.personalNote);
      }
    } catch {}
  }, [isOpen]);

  const toggleCeremony = (id: string) => {
    soundFX.playChime(700);
    if (selectedCeremonies.includes(id)) {
      setSelectedCeremonies(selectedCeremonies.filter((c) => c !== id));
    } else {
      setSelectedCeremonies([...selectedCeremonies, id]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    soundFX.playWeddingBlessing();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d6b572", "#f4ebd6", "#f43f5e", "#fbbf24"],
    });

    const passCode =
      existingRecord?.passCode ||
      `ROYAL-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

    const newRecord: RSVPRecord = {
      id: existingRecord?.id || `rsvp-${Date.now()}`,
      passCode,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      attending,
      guestCount: attending === "yes" ? guestCount : 0,
      ceremonies: attending === "yes" ? selectedCeremonies : [],
      dietary,
      songRequest: songRequest.trim(),
      personalNote: personalNote.trim(),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    localStorage.setItem("wedding_rsvp_record_v1", JSON.stringify(newRecord));
    setExistingRecord(newRecord);
    setIsEditing(false);
  };

  // Render high-res Boarding Pass on Canvas for instant download
  const handleDownloadPass = () => {
    soundFX.playHarpArpeggio();
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 560;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background gradient: Obsidian Black & Amber Gold
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 560);
    bgGrad.addColorStop(0, "#0e090b");
    bgGrad.addColorStop(0.5, "#1c1216");
    bgGrad.addColorStop(1, "#0d0709");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 560);

    // Gold Double Border
    ctx.strokeStyle = "#d6b572";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 960, 520);
    ctx.strokeStyle = "rgba(214, 181, 114, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, 944, 504);

    // Perforated Stub Divider Line
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "rgba(214, 181, 114, 0.4)";
    ctx.beginPath();
    ctx.moveTo(720, 20);
    ctx.lineTo(720, 540);
    ctx.stroke();
    ctx.setLineDash([]);

    // Header Monogram
    ctx.fillStyle = "#f4ebd6";
    ctx.font = "italic 32px 'Cormorant Garamond', serif";
    ctx.fillText("ROYAL INVITATION & BOARDING PASS", 60, 75);

    ctx.fillStyle = "#d6b572";
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillText("THE ROYAL PALACE RESORT, JAIPUR • DECEMBER 18, 2026", 60, 105);

    // Couple Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic bold 38px 'Cormorant Garamond', serif";
    ctx.fillText("Aarav & Ananya", 60, 160);

    // Guest Info Fields
    ctx.fillStyle = "rgba(244, 235, 214, 0.6)";
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillText("GUEST NAME", 60, 210);
    ctx.fillText("ACCESS TIER", 340, 210);
    ctx.fillText("GUEST COUNT", 540, 210);

    ctx.fillStyle = "#d6b572";
    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.fillText(existingRecord?.guestName || guestName || "Honored Guest", 60, 240);
    ctx.fillText("VIP PALACE GUEST", 340, 240);
    ctx.fillText(
      `${existingRecord?.guestCount || guestCount} Person(s)`,
      540,
      240
    );

    ctx.fillStyle = "rgba(244, 235, 214, 0.6)";
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillText("ROYAL DINING FEAST", 60, 290);
    ctx.fillText("GATE & PROTOCOL", 340, 290);
    ctx.fillText("STATUS", 540, 290);

    ctx.fillStyle = "#fbf8f2";
    ctx.font = "16px 'Inter', sans-serif";
    ctx.fillText(existingRecord?.dietary || dietary, 60, 318);
    ctx.fillText("Gate 1 • Darbar Grand Hall", 340, 318);
    ctx.fillStyle = "#10b981";
    ctx.fillText("CONFIRMED RSVP", 540, 318);

    // Passcode Display
    ctx.fillStyle = "rgba(214, 181, 114, 0.25)";
    ctx.fillRect(60, 360, 600, 60);
    ctx.strokeStyle = "#d6b572";
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 360, 600, 60);

    ctx.fillStyle = "#f4ebd6";
    ctx.font = "bold 22px 'Fira Code', monospace";
    ctx.fillText(existingRecord?.passCode || "ROYAL-2026-CONFIRMED", 80, 400);

    ctx.fillStyle = "rgba(244, 235, 214, 0.5)";
    ctx.font = "11px 'Inter', sans-serif";
    ctx.fillText(
      "Present this boarding pass on arrival for royal welcome, garland ceremony & suite check-in.",
      60,
      455
    );

    // Simulated Barcode on Left Stub
    ctx.fillStyle = "#d6b572";
    for (let i = 0; i < 48; i++) {
      const w = i % 3 === 0 ? 3 : i % 5 === 0 ? 5 : 2;
      ctx.fillRect(60 + i * 12, 480, w, 32);
    }

    // Right Stub: QR Code & Verification
    ctx.fillStyle = "#d6b572";
    ctx.font = "bold 14px 'Inter', sans-serif";
    ctx.fillText("BOARDING PASS", 750, 75);

    ctx.fillStyle = "rgba(244, 235, 214, 0.7)";
    ctx.font = "11px 'Inter', sans-serif";
    ctx.fillText("ROYAL ACCESS ID", 750, 100);

    ctx.fillStyle = "#ffffff";
    ctx.font = "13px 'Fira Code', monospace";
    ctx.fillText(
      (existingRecord?.passCode || "ROYAL-2026").substring(0, 16),
      750,
      120
    );

    // Draw stylized QR Code box on stub
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(750, 150, 180, 180);

    ctx.fillStyle = "#0e090b";
    // QR framing corners
    ctx.fillRect(760, 160, 40, 40);
    ctx.clearRect(768, 168, 24, 24);
    ctx.fillRect(774, 174, 12, 12);

    ctx.fillRect(880, 160, 40, 40);
    ctx.clearRect(888, 168, 24, 24);
    ctx.fillRect(894, 174, 12, 12);

    ctx.fillRect(760, 280, 40, 40);
    ctx.clearRect(768, 288, 24, 24);
    ctx.fillRect(774, 294, 12, 12);

    // Random QR modules
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if ((r * 7 + c * 11) % 3 === 0) {
          ctx.fillRect(815 + c * 8, 205 + r * 8, 6, 6);
        }
      }
    }

    ctx.fillStyle = "#d6b572";
    ctx.font = "italic 16px 'Cormorant Garamond', serif";
    ctx.fillText("Jaipur Royal Darbar", 780, 360);

    ctx.fillStyle = "rgba(244, 235, 214, 0.6)";
    ctx.font = "10px 'Inter', sans-serif";
    ctx.fillText("SEAT: VIP ROYAL ENCLOSURE", 750, 400);
    ctx.fillText("DRESS: ROYAL INDIAN TRADITIONAL", 750, 420);
    ctx.fillText("DATE: DEC 18, 2026", 750, 440);

    // Download PNG
    const link = document.createElement("a");
    link.download = `Royal_Boarding_Pass_${(
      existingRecord?.guestName || "Guest"
    ).replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const copyPassCode = () => {
    if (existingRecord?.passCode) {
      navigator.clipboard.writeText(existingRecord.passCode);
      setCopiedPass(true);
      soundFX.playChime(1100);
      setTimeout(() => setCopiedPass(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-stone-950 border border-amber-300/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
        >
          {/* Top Royal Gold Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600" />

          {/* Modal Header */}
          <div className="p-5 sm:p-6 pb-4 border-b border-amber-300/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-300/40 flex items-center justify-center text-amber-300">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-medium">
                  {existingRecord && !isEditing
                    ? "Royal Boarding Pass & Confirmation"
                    : "Digital RSVP & Royal Access Pass"}
                </h3>
                <p className="font-sans text-xs text-amber-200/70 tracking-wider">
                  The Royal Palace Resort, Jaipur • Dec 16-18, 2026
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* VIEW BOARDING PASS (If already confirmed & not editing) */}
            {existingRecord && !isEditing ? (
              <div className="space-y-6">
                {/* Boarding Pass Card */}
                <div className="relative rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border-2 border-amber-300/40 p-5 sm:p-6 shadow-2xl overflow-hidden">
                  {/* Decorative background watermark */}
                  <div className="absolute right-[-40px] top-[-40px] opacity-10 pointer-events-none">
                    <Crown className="w-64 h-64 text-amber-300" />
                  </div>

                  {/* Header of Pass */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-300/20 pb-4">
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-400 font-semibold block">
                        ROYAL PALACE BOARDING PASS
                      </span>
                      <h4 className="font-serif text-2xl text-stone-100 font-semibold">
                        Aarav &amp; Ananya&apos;s Wedding
                      </h4>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      {existingRecord.attending === "yes"
                        ? "RSVP Confirmed"
                        : "Regretfully Declined"}
                    </div>
                  </div>

                  {/* Pass Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-5 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">
                        Guest Name
                      </span>
                      <span className="text-amber-200 font-semibold text-sm">
                        {existingRecord.guestName}
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">
                        Party Size
                      </span>
                      <span className="text-stone-200 font-medium text-sm flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        {existingRecord.guestCount} Guest(s)
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">
                        Venue Gate
                      </span>
                      <span className="text-stone-200 font-medium text-sm">
                        Gate 1 • Darbar Hall
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">
                        Dining Preference
                      </span>
                      <span className="text-stone-200 font-medium text-sm flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-amber-400" />
                        {existingRecord.dietary}
                      </span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider">
                        Ceremonies Attending
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {existingRecord.ceremonies.length > 0 ? (
                          existingRecord.ceremonies.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-300/30 text-[10px] capitalize font-mono"
                            >
                              {c}
                            </span>
                          ))
                        ) : (
                          <span className="text-stone-400 text-xs">None</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Passcode & QR Stub */}
                  <div className="mt-4 pt-4 border-t border-dashed border-amber-300/30 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300">
                        <QrCode className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                          Royal Access Pass Code
                        </span>
                        <span className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider">
                          {existingRecord.passCode}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={copyPassCode}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-stone-700 cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedPass ? "Copied! ✓" : "Copy Code"}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2.5 rounded-xl border border-stone-700 hover:border-amber-400/40 text-stone-300 text-xs font-medium flex items-center gap-2 hover:bg-stone-900 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    Modify RSVP Details
                  </button>

                  <button
                    onClick={handleDownloadPass}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download HD Boarding Pass
                  </button>
                </div>
              </div>
            ) : (
              /* RSVP SUBMISSION / EDIT FORM */
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Attendance Switch */}
                <div>
                  <label className="block text-xs font-semibold text-amber-200 uppercase tracking-wider mb-2">
                    Will you grace us with your royal presence? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === "yes"
                          ? "bg-amber-400/15 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(214,181,114,0.2)]"
                          : "bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      Joyfully Accept (हाँ, ज़रूर आएँगे)
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        attending === "no"
                          ? "bg-rose-500/15 border-rose-400 text-rose-200"
                          : "bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700"
                      }`}
                    >
                      <X className="w-4 h-4 text-rose-400" />
                      Regretfully Decline (शुभकामनाओं सहित)
                    </button>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g., Rajesh &amp; Sunita Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Mobile Number (for SMS &amp; pass)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {attending === "yes" && (
                  <>
                    {/* Guest Count */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-stone-300 font-medium">
                          Number of Guests Attending:
                        </label>
                        <span className="font-mono text-xs text-amber-300 font-bold">
                          {guestCount} Guest{guestCount > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setGuestCount(num)}
                            className={`flex-1 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                              guestCount === num
                                ? "bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-400/20"
                                : "bg-stone-900 border border-stone-800 text-stone-400 hover:border-amber-400/40"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ceremony Selection */}
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1.5">
                        Which Ceremonies Will You Attend?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {CEREMONY_OPTIONS.map((c) => {
                          const isSelected = selectedCeremonies.includes(c.id);
                          return (
                            <button
                              type="button"
                              key={c.id}
                              onClick={() => toggleCeremony(c.id)}
                              className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-amber-400/15 border-amber-400/60 text-amber-200"
                                  : "bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700"
                              }`}
                            >
                              <div>
                                <span className="font-medium block">
                                  {c.name}
                                </span>
                                <span className="text-[10px] text-stone-500">
                                  {c.date}
                                </span>
                              </div>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? "bg-amber-400 text-stone-950 border-amber-400 font-bold"
                                    : "border-stone-700 text-transparent"
                                }`}
                              >
                                ✓
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dietary Preference */}
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1.5">
                        Royal Banquet Dietary Preference
                      </label>
                      <select
                        value={dietary}
                        onChange={(e) =>
                          setDietary(e.target.value as RSVPRecord["dietary"])
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 text-stone-200 text-xs sm:text-sm focus:outline-none transition-colors"
                      >
                        <option value="Royal Mughlai Feast">
                          Royal Mughlai Feast (Non-Veg &amp; Veg Delicacies)
                        </option>
                        <option value="Pure Vegetarian Feast">
                          Pure Vegetarian Traditional Rajasthani Thali
                        </option>
                        <option value="Jain Traditional">
                          Jain Traditional (Pure Veg, No Roots/Onion/Garlic)
                        </option>
                        <option value="Vegan &amp; Gluten-Free">
                          Vegan &amp; Gluten-Free Gourmet Selection
                        </option>
                      </select>
                    </div>

                    {/* DJ Song Request */}
                    <div>
                      <label className="block text-xs text-stone-300 font-medium mb-1 flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-amber-400" />
                        Song Request for the Sangeet Dance Floor (Optional)
                      </label>
                      <input
                        type="text"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                        placeholder="e.g., Gallan Goodiyaan or Maahi Ve"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Personal Note */}
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    Special Message or Travel Note for Couple (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={personalNote}
                    onChange={(e) => setPersonalNote(e.target.value)}
                    placeholder="We can't wait to celebrate with you both in Jaipur!"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 text-stone-100 placeholder-stone-600 text-xs sm:text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  {existingRecord && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2.5 rounded-xl border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    Confirm RSVP &amp; Generate Boarding Pass
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
