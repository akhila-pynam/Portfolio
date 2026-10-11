"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { onComplete(); return; }

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1500);
    const t4 = setTimeout(() => onComplete(), 2400);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) { p = 100; clearInterval(interval); }
      setProgress(Math.min(p, 100));
    }, 120);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearInterval(interval); };
  }, [onComplete]);

  const skip = () => { setSkipped(true); setTimeout(onComplete, 200); };

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-midnight flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.45, 0.05, 0.55, 0.95] }}
        >
          {/* Radial yellow glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.08)_0%,transparent_65%)]" />

          {/* Phase 0-1: Init text */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.p
                className="font-mono-custom text-xs text-yellow-street tracking-[0.3em] mb-8 opacity-80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                INITIALIZING AKHILA.EXE...
              </motion.p>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-border-gray rounded-full overflow-hidden mb-12">
            <motion.div
              className="h-full bg-yellow-street"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Phase 2+: Name reveal */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h1 className="font-grotesk text-5xl md:text-7xl font-black tracking-tight text-soft-white">
                  AKHILA
                  <span className="block text-yellow-street yellow-text-glow">PYNAM</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3: Tagline */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.p
                className="font-mono-custom text-[10px] text-muted-gray tracking-[0.25em] mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                SOFTWARE ENGINEER IN THE MAKING
              </motion.p>
            )}
          </AnimatePresence>

          {/* Skip button */}
          <button
            onClick={skip}
            className="absolute bottom-8 right-8 font-mono-custom text-[10px] text-muted-gray tracking-[0.2em] hover:text-yellow-street transition-colors duration-200 focus-visible:outline-yellow-street"
            aria-label="Skip intro animation"
          >
            SKIP INTRO ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
