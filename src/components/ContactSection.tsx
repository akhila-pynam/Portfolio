"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, Github, MessageSquareCode, Code } from "lucide-react";
import { soundManager } from "@/lib/sound";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const WHATSAPP_LINK =
  "https://wa.me/918341743003?text=Hello%20Akhila%20Pynam%2C%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20request%20a%20copy%20of%20your%20resume.";

const CONTACT_LINKS = [
  {
    icon: <Mail size={20} />,
    label: "Email Me",
    href: "mailto:akhilapynam@gmail.com",
    description: "akhilapynam@gmail.com",
    highlight: false,
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akhila-pynam-ba0369338/",
    description: "akhila-pynam",
    highlight: false,
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    href: "https://github.com/akhila-pynam",
    description: "akhila-pynam",
    highlight: false,
  },
  {
    icon: <Code size={20} />,
    label: "LeetCode",
    href: "https://leetcode.com/u/akhila-pynam/",
    description: "akhila-pynam",
    highlight: false,
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section id="contact" className="py-24 md:py-36 bg-midnight relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_70%,rgba(255,212,0,0.06)_0%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {/* Label */}
        <motion.p
          className="font-mono-custom text-xs text-yellow-street tracking-[0.4em] mb-4"
          {...fade(0)}
        >
          07 / CONTACT & PROFILES
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-grotesk text-3xl md:text-6xl font-black text-soft-white mb-4 leading-tight"
          {...fade(0.1)}
        >
          LET&apos;S TALK &{" "}
          <span className="text-yellow-street">COLLABORATE.</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          className="font-inter text-muted-gray text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6"
          {...fade(0.2)}
        >
          Message me directly on WhatsApp to get a copy of my official resume.
        </motion.p>

        {/* Direct WhatsApp Callout Banner */}
        <motion.div
          className="mb-12 inline-block"
          {...fade(0.25)}
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="inline-flex items-center gap-3 font-grotesk text-sm tracking-[0.14em] font-bold px-8 py-4 bg-yellow-street text-midnight hover:bg-yellow-gold transition-all rounded-sm cursor-pointer shadow-[0_0_25px_rgba(255,212,0,0.35)]"
          >
            <MessageSquareCode size={20} />
            GET MY RESUME
          </a>
        </motion.div>

        {/* Profiles Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 max-w-3xl mx-auto"
          {...fade(0.35)}
        >
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              onClick={() => soundManager.playClick()}
              className={`group flex flex-col items-center gap-2 rounded-sm p-4.5 border transition-all duration-200 focus-visible:outline-yellow-street justify-center cursor-pointer ${
                link.highlight
                  ? "bg-yellow-street/10 border-yellow-street/60 shadow-[0_0_15px_rgba(255,212,0,0.15)]"
                  : "bg-charcoal border-border-gray hover:border-yellow-street hover:shadow-[0_0_15px_rgba(255,212,0,0.15)]"
              }`}
              aria-label={link.label}
            >
              <span className={`transition-colors duration-200 ${link.highlight ? "text-yellow-street" : "text-muted-gray group-hover:text-yellow-street"}`}>
                {link.icon}
              </span>
              <div className="text-center">
                <p className={`font-grotesk text-sm font-bold transition-colors duration-200 ${link.highlight ? "text-yellow-street" : "text-soft-white group-hover:text-yellow-street"}`}>
                  {link.label}
                </p>
                <p className="font-mono-custom text-[10px] text-muted-gray tracking-[0.05em] truncate max-w-[120px]">
                  {link.description}
                </p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-20 h-[1.5px] bg-yellow-street/40 mx-auto mb-12"
          {...fade(0.4)}
        />

        {/* Footer */}
        <motion.div className="space-y-3" {...fade(0.5)}>
          <p className="font-mono-custom text-xs text-soft-white/80 tracking-[0.2em] font-medium">
            DESIGNED WITH INTENT. BUILT TO KEEP EVOLVING.
          </p>
          <p className="font-mono-custom text-xs text-muted-gray/60 tracking-[0.15em]">
            © {new Date().getFullYear()} AKHILA PYNAM — ALL RIGHTS RESERVED
          </p>
        </motion.div>
      </div>
    </section>
  );
}
