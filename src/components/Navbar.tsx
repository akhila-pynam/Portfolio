"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { soundManager } from "@/lib/sound";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Missions", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setSoundOn(soundManager.isEnabled());

    // Check stored theme preference
    const storedTheme = localStorage.getItem("gta_theme") as "dark" | "light" | null;
    if (storedTheme === "light") {
      setTheme("light");
      document.documentElement.classList.add("light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    soundManager.playClick();
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.add("light");
      localStorage.setItem("gta_theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("gta_theme", "dark");
    }
  };

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    const sections = NAV_ITEMS.map((i) => i.href.slice(1));
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActive(`#${id}`);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    soundManager.playClick();
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSfx = () => {
    const newState = soundManager.toggleSound();
    setSoundOn(newState);
    if (newState) soundManager.playClick();
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-midnight/90 backdrop-blur-md border-b border-border-gray shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            onMouseEnter={() => soundManager.playHover()}
            className="font-grotesk text-xl font-black text-yellow-street tracking-widest hover:opacity-80 transition-opacity focus-visible:outline-yellow-street cursor-pointer"
            aria-label="Go to top"
          >
            #AP.
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="navigation">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollTo(item.href)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`font-mono-custom text-xs tracking-[0.18em] transition-colors duration-200 cursor-pointer ${
                    active === item.href
                      ? "text-yellow-street font-bold drop-shadow-[0_0_8px_rgba(255,212,0,0.5)]"
                      : "text-muted-gray hover:text-soft-white"
                  }`}
                  aria-current={active === item.href ? "page" : undefined}
                >
                  {item.label.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>

          {/* Right actions: Theme toggle, SFX Mute button & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2 text-muted-gray hover:text-yellow-street border border-border-gray hover:border-yellow-street/50 rounded-sm transition-all focus-visible:outline-yellow-street cursor-pointer bg-charcoal/50"
              title={theme === "dark" ? "Switch to Daylight Mode" : "Switch to Night GTA Mode"}
              aria-label="Toggle light/dark theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSfx}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2 text-muted-gray hover:text-yellow-street border border-border-gray hover:border-yellow-street/50 rounded-sm transition-all focus-visible:outline-yellow-street cursor-pointer bg-charcoal/50"
              title={soundOn ? "Mute GTA SFX" : "Unmute GTA SFX"}
              aria-label="Toggle SFX sound"
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={() => scrollTo("#contact")}
              onMouseEnter={() => soundManager.playHover()}
              className="font-grotesk text-xs font-bold tracking-[0.12em] px-5 py-2.5 bg-yellow-street text-midnight rounded-sm hover:bg-yellow-gold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-street cursor-pointer shadow-[0_0_15px_rgba(255,212,0,0.3)]"
            >
              LET&apos;S TALK
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-gray hover:text-yellow-street border border-border-gray rounded-sm bg-charcoal/50"
              aria-label="Toggle light/dark theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={toggleSfx}
              className="p-2 text-muted-gray hover:text-yellow-street border border-border-gray rounded-sm bg-charcoal/50"
              aria-label="Toggle SFX sound"
            >
              {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
            <button
              className="text-soft-white hover:text-yellow-street transition-colors focus-visible:outline-yellow-street p-1"
              onClick={() => {
                soundManager.playClick();
                setMobileOpen(!mobileOpen);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-midnight/98 backdrop-blur-md flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute top-5 right-6 text-soft-white hover:text-yellow-street transition-colors"
              onClick={() => {
                soundManager.playClick();
                setMobileOpen(false);
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`font-grotesk text-2xl font-bold tracking-wider ${
                  active === item.href ? "text-yellow-street" : "text-soft-white"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollTo("#contact")}
              className="mt-4 font-grotesk text-sm font-bold tracking-[0.1em] px-8 py-3.5 bg-yellow-street text-midnight rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              LET&apos;S TALK
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
