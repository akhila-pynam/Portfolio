"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { soundManager } from "@/lib/sound";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function HeroSection() {
  const reduced = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);

  const handlePhotoClick = () => {
    setIsRevealed(true);
    soundManager.playClick();
  };

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 25 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-midnight pt-24 pb-16"
      aria-label="Hero section"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,212,0,0.08)_0%,transparent_100%)] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,212,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,212,0,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* HUD corner detail — top left */}
      <div className="absolute top-24 left-6 lg:left-10 hidden md:block">
        <span className="font-mono-custom text-[10px] text-yellow-street/60 tracking-[0.25em]">
          17.3850° N, 78.4867° E // HYD
        </span>
      </div>

      {/* Status label — top right */}
      <div className="absolute top-24 right-6 lg:right-10 hidden md:flex items-center gap-2 bg-charcoal/80 border border-border-gray px-3 py-1 rounded-sm">
        <span className="w-2 h-2 rounded-full bg-yellow-street animate-pulse" />
        <span className="font-mono-custom text-[10px] text-soft-white tracking-[0.2em]">
          STATUS: BUILDING
        </span>
      </div>

      {/* Main split grid: Photo left, Name/info right */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Side: Photo */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          {...fade(0.1)}
        >
          {/* Fixed-size wrapper anchoring both photo and absolute button */}
          <div className="relative w-64 sm:w-72 md:w-80 h-80 sm:h-96">
            {/* The clickable photo */}
            <div
              onClick={handlePhotoClick}
              className="relative w-full h-full group cursor-pointer select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePhotoClick();
                }
              }}
              aria-label={isRevealed ? "Profile photo revealed" : "Click to reveal profile photo"}
            >
              {/* Outer GTA yellow accent border brackets */}
              <div
                className={`absolute -inset-2 border-2 rounded-sm pointer-events-none transition-all duration-300 ${
                  isRevealed
                    ? "border-yellow-street shadow-[0_0_20px_rgba(255,212,0,0.35)]"
                    : "border-yellow-street/40 group-hover:border-yellow-street"
                }`}
              />
              <div className="absolute -top-3 -left-3 w-4 h-4 border-t-2 border-l-2 border-yellow-street" />
              <div className="absolute -top-3 -right-3 w-4 h-4 border-t-2 border-r-2 border-yellow-street" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 border-b-2 border-l-2 border-yellow-street" />
              <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b-2 border-r-2 border-yellow-street" />

              {/* Glowing background halo */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r from-yellow-street/25 to-yellow-gold/25 rounded-sm blur-md transition-opacity duration-300 ${
                  isRevealed ? "opacity-100" : "opacity-40 group-hover:opacity-100"
                }`}
              />

              {/* Image container */}
              <div
                className={`relative w-full h-full rounded-sm overflow-hidden border bg-charcoal shadow-2xl transition-all duration-500 ${
                  isRevealed
                    ? "border-yellow-street shadow-[0_0_30px_rgba(255,212,0,0.25)]"
                    : "border-border-gray group-hover:border-yellow-street/60"
                }`}
              >
                <Image
                  src="/profile.jpg"
                  alt="Akhila Pynam portrait"
                  fill
                  priority
                  className={`object-cover object-top transition-all duration-700 ease-out scale-100 group-hover:scale-105 ${
                    isRevealed
                      ? "filter-none grayscale-0 contrast-100"
                      : "filter grayscale contrast-110"
                  }`}
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                />
                {/* Subtle vignette scanlines */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Very tiny tap to reveal button positioned ABSOLUTELY so photo never shifts */}
            <AnimatePresence>
              {!isRevealed && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="absolute top-[calc(100%+10px)] right-0 z-30"
                >
                  <button
                    type="button"
                    onClick={handlePhotoClick}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono-custom text-[9px] text-yellow-street bg-charcoal/95 border border-yellow-street/40 hover:border-yellow-street hover:bg-yellow-street/10 rounded-sm tracking-[0.2em] shadow-sm hover:shadow-[0_0_10px_rgba(255,212,0,0.3)] transition-all cursor-pointer animate-pulse"
                    aria-label="Tap to reveal profile photo colors"
                  >
                    <span>▶</span>
                    <span>TAP TO REVEAL</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side: Name & Info */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 font-mono-custom text-[11px] md:text-xs text-yellow-street tracking-[0.3em] mb-4 bg-yellow-street/10 px-3 py-1 border border-yellow-street/30 rounded-sm"
            {...fade(0.05)}
          >
            <span>▶</span>
            <span>SOFTWARE ENGINEER IN THE MAKING</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-grotesk text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-soft-white mb-4"
            {...fade(0.15)}
          >
            AKHILA <span className="text-yellow-street yellow-text-glow">PYNAM</span>
          </motion.h1>

          {/* Headline */}
          <motion.p
            className="font-grotesk text-lg sm:text-xl md:text-2xl font-bold tracking-[0.12em] text-yellow-gold/90 mb-4"
            {...fade(0.25)}
          >
            I BUILD.&nbsp;&nbsp;I SOLVE.&nbsp;&nbsp;I EXPLORE.
          </motion.p>

          {/* Objective from verified resume */}
          <motion.p
            className="font-inter text-base md:text-lg text-muted-gray max-w-xl leading-relaxed mb-8"
            {...fade(0.35)}
          >
            Computer Science student passionate about building impactful software,
            exploring AI-driven solutions, and solving complex problems through code.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            {...fade(0.45)}
          >
            <button
              onClick={scrollToProjects}
              className="font-grotesk text-sm font-bold tracking-[0.12em] px-8 py-4 bg-yellow-street text-midnight rounded-sm hover:bg-yellow-gold hover:shadow-[0_0_20px_rgba(255,212,0,0.4)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-street cursor-pointer"
            >
              EXPLORE MY MISSIONS
            </button>
            <button
              onClick={scrollToContact}
              className="font-grotesk text-sm font-bold tracking-[0.12em] px-8 py-4 bg-charcoal text-soft-white border border-border-gray rounded-sm hover:border-yellow-street hover:text-yellow-street transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-street cursor-pointer"
            >
              LET&apos;S CONNECT
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToProjects}
        className="mt-12 flex flex-col items-center gap-2 text-muted-gray hover:text-yellow-street transition-colors focus-visible:outline-yellow-street cursor-pointer"
        aria-label="Scroll down"
        {...fade(0.6)}
      >
        <span className="font-mono-custom text-[10px] tracking-[0.3em]">SCROLL DOWN</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
        >
          <ArrowDown size={16} className="text-yellow-street" />
        </motion.div>
      </motion.button>
    </section>
  );
}
