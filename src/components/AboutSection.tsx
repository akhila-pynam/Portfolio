"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Zap, Target, Heart } from "lucide-react";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const INFO_CARDS = [
  {
    icon: <GraduationCap size={18} className="text-yellow-street" />,
    label: "EDUCATION",
    value: "Vel Tech Rangarajan Dr.Sagunthala R&D Institute of Science and Technology",
    sub: "B.Tech in Computer Science and Engineering (2025 – 2029) · Chennai",
  },
  {
    icon: <Target size={18} className="text-yellow-street" />,
    label: "CORE DISCIPLINES",
    value: "DSA, Competitive Programming, STL, OOP, DBMS, SQL, REST APIs",
    sub: "TUF+, Codeforces, LeetCode",
  },
  {
    icon: <Zap size={18} className="text-yellow-street" />,
    label: "AI & EXPLORATION",
    value: "Generative AI, Machine Learning, NLP, Google Gemini API, Prompt Engineering",
    sub: "Streamlit, Pandas, Scikit-learn",
  },
  {
    icon: <Heart size={18} className="text-yellow-street" />,
    label: "HOBBIES & INTERESTS",
    value: "Coding & Building Cool Stuff",
    sub: "Decoding Taylor Swift's Lyrics, Easter Eggs & Storylines",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section id="about" className="py-24 md:py-32 bg-midnight" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          className="font-mono-custom text-xs text-yellow-street tracking-[0.4em] mb-4"
          {...fade(0)}
        >
          01 / ORIGIN STORY
        </motion.p>

        <motion.h2
          className="font-grotesk text-3xl md:text-5xl font-black text-soft-white mb-14"
          {...fade(0.1)}
        >
          THE PERSON BEHIND{" "}
          <span className="text-yellow-street">THE CODE.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: text with exact resume details and WhatsApp resume action */}
          <motion.div className="space-y-6" {...fade(0.2)}>
            <p className="font-inter text-soft-white/90 leading-relaxed text-base md:text-lg">
              I&apos;m{" "}
              <span className="text-yellow-street font-semibold">Akhila Pynam</span>, a
              Computer Science and Engineering undergraduate student at{" "}
              <span className="text-soft-white font-medium">
                Vel Tech Rangarajan Dr.Sagunthala R&D Institute of Science and Technology, Chennai (2025 – 2029)
              </span>
              .
            </p>
            <p className="font-inter text-muted-gray leading-relaxed text-base md:text-lg">
              I am passionate about building impactful software, exploring AI-driven
              solutions, and solving complex problems through code. Eager to contribute to
              innovative projects while constantly sharpening my engineering foundation.
            </p>
            <p className="font-inter text-muted-gray leading-relaxed text-base md:text-lg">
              My technical foundation spans across{" "}
              <span className="text-soft-white font-medium">
                C, C++, Java, Python, JavaScript, and TypeScript
              </span>
              , backed by daily algorithmic practice on{" "}
              <span className="text-soft-white font-medium">
                TUF+, Codeforces, and LeetCode
              </span>
              . On the web side, I build modern full-stack systems with React, Next.js,
              Tailwind CSS, Three.js, Node.js, and Supabase.
            </p>
            <p className="font-inter text-muted-gray leading-relaxed text-base md:text-lg">
              When I&apos;m not writing code or building cool projects, you&apos;ll find me
              decoding Taylor Swift&apos;s lyrics, uncovering album easter eggs, and exploring
              intricate storylines.
            </p>
          </motion.div>

          {/* Right: info cards including Taylor Swift hobby */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                className="bg-charcoal border border-border-gray rounded-sm p-6 card-hover cursor-pointer"
                {...(reduced ? {} : {
                  initial: { opacity: 0, y: 20 },
                  animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
                  transition: { duration: 0.5, delay: 0.3 + i * 0.1 },
                })}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  {card.icon}
                  <span className="font-mono-custom text-[11px] text-yellow-street tracking-[0.2em] font-medium">
                    {card.label}
                  </span>
                </div>
                <p className="font-inter text-soft-white text-base font-semibold leading-snug mb-1">
                  {card.value}
                </p>
                {card.sub && (
                  <p className="font-mono-custom text-[11px] text-muted-gray leading-snug">
                    {card.sub}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
