import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Share2, Sparkles, Check } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";

interface KeepsakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeepsakeModal: React.FC<KeepsakeModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { couple } = weddingData;

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 800;
    const height = 1100;
    canvas.width = width;
    canvas.height = height;

    // Background Royal Gradient
    const bgGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      50,
      width / 2,
      height / 2,
      600
    );
    bgGradient.addColorStop(0, "#2c171d");
    bgGradient.addColorStop(0.6, "#180d11");
    bgGradient.addColorStop(1, "#0a0406");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Outer and Inner Gold Borders
    ctx.strokeStyle = "#d6b572";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = "rgba(214, 181, 114, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(45, 45, width - 90, height - 90);

    // Decorative corner flourishes
    const drawCorner = (x: number, y: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = "#d6b572";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(0, 0);
      ctx.lineTo(20, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(10, 10, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#d6b572";
      ctx.fill();
      ctx.restore();
    };

    drawCorner(55, 55, 0);
    drawCorner(width - 55, 55, Math.PI / 2);
    drawCorner(width - 55, height - 55, Math.PI);
    drawCorner(55, height - 55, -Math.PI / 2);

    // Header Emblem
    ctx.font = "20px monospace";
    ctx.fillStyle = "#d6b572";
    ctx.textAlign = "center";
    ctx.fillText("✦  ROYAL WEDDING CELEBRATION  ✦", width / 2, 130);

    ctx.font = "italic 26px Georgia, serif";
    ctx.fillStyle = "#e5d5b8";
    ctx.fillText("Together with their families", width / 2, 200);

    // Groom Name
    ctx.font = "normal 80px 'Pinyon Script', cursive, Georgia";
    ctx.fillStyle = "#f6e4b8";
    ctx.fillText(couple.groom, width / 2, 330);

    ctx.font = "italic 32px Georgia, serif";
    ctx.fillStyle = "#fb7185";
    ctx.fillText("&", width / 2, 410);

    // Bride Name
    ctx.font = "normal 80px 'Pinyon Script', cursive, Georgia";
    ctx.fillStyle = "#f6e4b8";
    ctx.fillText(couple.bride, width / 2, 510);

    // Decorative divider line
    const divGrad = ctx.createLinearGradient(150, 0, width - 150, 0);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.5, "#d6b572");
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 580);
    ctx.lineTo(width - 150, 580);
    ctx.stroke();

    // Invite message
    ctx.font = "22px Georgia, serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Invite you to celebrate the bond of their eternal love", width / 2, 640);

    // Date
    ctx.font = "bold 32px Georgia, serif";
    ctx.fillStyle = "#fbf8f2";
    ctx.fillText(couple.weddingDate, width / 2, 720);

    ctx.font = "18px monospace";
    ctx.fillStyle = "#d6b572";
    ctx.fillText("6:30 PM ONWARDS", width / 2, 765);

    // Venue
    ctx.font = "24px Georgia, serif";
    ctx.fillStyle = "#e5d5b8";
    ctx.fillText(couple.weddingVenue, width / 2, 840);

    ctx.font = "italic 20px Georgia, serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText('"Two Hearts • One Journey • One Forever"', width / 2, 930);

    // Watermark footer
    ctx.font = "14px monospace";
    ctx.fillStyle = "rgba(214, 181, 114, 0.4)";
    ctx.fillText("KEEPSAKE DIGITAL INVITATION CARD", width / 2, 1020);
  }, [isOpen, couple]);

  const handleDownload = () => {
    soundFX.playHarpArpeggio();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Aarav-Ananya-Wedding-Keepsake.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    soundFX.playChime(950);
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (navigator.share) {
      try {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], "Aarav-Ananya-Wedding.png", { type: "image/png" });
          await navigator.share({
            title: `Wedding of ${couple.groom} & ${couple.bride}`,
            text: `You are invited to the Royal Wedding of ${couple.groom} & ${couple.bride} on ${couple.weddingDate}!`,
            files: [file],
          });
        });
        return;
      } catch {}
    }

    // Fallback: Copy link
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleClose = () => {
    soundFX.playChime(700);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md select-none overflow-y-auto"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 transition-colors z-50 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center max-w-md w-full"
          >
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              Digital Keepsake Invitation
            </div>

            {/* Canvas Preview Container */}
            <div className="w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-amber-300/40 mb-5 bg-stone-950">
              <canvas
                ref={canvasRef}
                className="w-full h-auto aspect-[800/1100] object-contain block"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Keepsake Image (HD)
              </button>

              <button
                onClick={handleShare}
                className="px-5 py-3 rounded-full bg-stone-900 border border-amber-300/30 hover:border-amber-300 text-amber-200 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:bg-stone-850 cursor-pointer shadow-md"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    Share
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
