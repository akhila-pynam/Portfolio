"use client";
import { useState, useEffect, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsSection from "@/components/SkillsSection";
import WIPSection from "@/components/WIPSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import TerminalEasterEgg from "@/components/TerminalEasterEgg";
import { soundManager } from "@/lib/sound";

const INTRO_SEEN_KEY = "ap_intro_seen";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_SEEN_KEY);
    if (!seen) {
      setShowIntro(true);
    } else {
      setReady(true);
    }

    // Ensure audio works universally on mobile taps and desktop clicks
    const handleGlobalClick = () => {
      soundManager.unlock();
      soundManager.playClick();
    };

    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    setShowIntro(false);
    setReady(true);
  }, []);

  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Loading screen — only on first visit per session */}
      {showIntro && <LoadingScreen onComplete={handleIntroComplete} />}

      {/* Main content */}
      {ready && (
        <main>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <AchievementsSection />
          <SkillsSection />
          <WIPSection />
          <ContactSection />
          <TerminalEasterEgg />
        </main>
      )}
    </>
  );
}
