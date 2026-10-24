import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingData } from "../data/weddingData";
import { soundFX } from "../utils/soundFX";

export const LoveQuizSection: React.FC = () => {
  const { quiz } = weddingData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quiz[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    soundFX.playChime(850 + idx * 50);
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    if (isCorrect) {
      soundFX.playChime(1200);
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: ["#34d399", "#d6b572", "#ffffff"],
      });
    } else {
      soundFX.playChime(400);
    }
  };

  const handleNextQuestion = () => {
    soundFX.playChime(900);
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      soundFX.playHarpArpeggio();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#d6b572", "#fb7185", "#fef08a", "#ffffff"],
      });
    }
  };

  const handleRestart = () => {
    soundFX.playChime(800);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  const getRankTitle = () => {
    if (score === 4) return "🏆 Certified Cupid's VIP & Soulmate Whisperer";
    if (score >= 2) return "💫 Cherished Bestie of Aarav & Ananya";
    return "🥂 Loyal Wedding Guest Ready to Celebrate!";
  };

  return (
    <section id="section-quiz" className="w-full py-24 px-4 sm:px-6 relative z-10 select-none">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs font-mono tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            Romantic Trivia Challenge
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 tracking-wider mb-4">
            How Well Do You <span className="italic text-amber-200 font-serif">Know Them?</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed font-light">
            Test your knowledge of Aarav &amp; Ananya's journey from their first coffee date to their royal wedding vows.
          </p>
        </div>

        {/* QUIZ CONTAINER */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-amber-300/30 shadow-[0_12px_45px_rgba(0,0,0,0.7)] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={`q-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-3">
                  <span>Question {currentQuestionIndex + 1} of {quiz.length}</span>
                  <span className="text-amber-300">Score: {score}</span>
                </div>

                <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question Prompt */}
                <h3 className="font-serif text-xl sm:text-2xl text-amber-100 font-normal leading-snug mb-6">
                  {currentQ.question}
                </h3>

                {/* Option Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctAnswerIndex;

                    let btnClass = "bg-stone-900/80 border-stone-800 text-stone-300 hover:border-amber-300/40 hover:bg-stone-900";

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-950/70 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]";
                      } else if (isSelected && !isCorrect) {
                        btnClass = "bg-rose-950/70 border-rose-500 text-rose-200";
                      } else {
                        btnClass = "bg-stone-900/40 border-stone-800/40 text-stone-500";
                      }
                    } else if (isSelected) {
                      btnClass = "bg-amber-400/20 border-amber-300 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.25)]";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-center justify-between transition-all duration-200 cursor-pointer ${btnClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-stone-950/60 border border-current text-[11px] font-mono flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>

                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Fun Fact Reveal */}
                {isAnswerSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-amber-400/10 border border-amber-300/30 text-xs text-amber-200/90 mb-6 flex items-start gap-3"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-semibold uppercase text-[10px] tracking-wider block mb-0.5">
                        Behind The Scenes:
                      </span>
                      <p className="font-sans italic">{currentQ.funFact}</p>
                    </div>
                  </motion.div>
                )}

                {/* Bottom Actions */}
                <div className="flex justify-end">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleConfirmAnswer}
                      disabled={selectedOption === null}
                      className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                        selectedOption !== null
                          ? "bg-amber-300 text-stone-950 hover:bg-amber-200 shadow-md"
                          : "bg-stone-800 text-stone-500 cursor-not-allowed"
                      }`}
                    >
                      Confirm Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 shadow-md cursor-pointer"
                    >
                      {currentQuestionIndex < quiz.length - 1 ? "Next Question →" : "See Final Score 🏆"}
                    </button>
                  )}
                </div>

              </motion.div>
            ) : (
              // RESULTS SCREEN
              <motion.div
                key="quiz-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-300 flex items-center justify-center text-amber-300 mb-4 shadow-[0_0_24px_rgba(251,191,36,0.3)]">
                  <Trophy className="w-8 h-8" />
                </div>

                <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-300/80 mb-1">
                  Trivia Results
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-stone-100 font-normal mb-2">
                  You Scored {score} of {quiz.length}!
                </h3>
                
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-serif italic mb-8 mt-2">
                  {getRankTitle()}
                </div>

                <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-md mx-auto mb-8 font-light">
                  Aarav &amp; Ananya are blessed to have loved ones who know their story by heart. Get ready to toast to them!
                </p>

                <button
                  onClick={handleRestart}
                  className="px-6 py-2.5 rounded-full bg-stone-900 border border-amber-300/40 hover:border-amber-300 text-amber-200 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all hover:bg-stone-850 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
