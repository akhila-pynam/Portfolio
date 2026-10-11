"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Trophy, ExternalLink, Award, Users, CheckCircle2 } from "lucide-react";
import { soundManager } from "@/lib/sound";

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  event: string;
  result: string;
  certType?: string;
  certUrl?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ACH-01",
    icon: <Trophy size={18} className="text-yellow-street" />,
    title: "Secured 2nd Place at AI Forge",
    event: "AI Forge Hackathon",
    result: "Full-day competitive hackathon building AI-driven solutions.",
    certType: "AI Forge Hackathon Certificate",
    certUrl:
      "https://drive.google.com/file/d/1ByAb7TN2wToaOzz0J1NYOMGYgj-xCTWq/view?usp=sharing",
  },
  {
    id: "ACH-02",
    icon: <Award size={18} className="text-yellow-street" />,
    title: "Rank 16,474 — TCS CodeVita Season XIII",
    event: "TCS CodeVita Competitive Programming Contest",
    result: "Achieved global rank 16,474 in one of the world's largest competitive coding challenges.",
    certType: "TCS CodeVita Season XIII Participation Certificate",
    certUrl:
      "https://drive.google.com/file/d/1ZPgAMdmv-Xvi8rG4hzAQJJVfu_LEMHpu/view?usp=sharing",
  },
  {
    id: "ACH-03",
    icon: <Users size={18} className="text-yellow-street" />,
    title: "Google Solution Challenge 2026",
    event: "Google Developer Student Clubs",
    result: "Google Solution Challenge 2026 Badge Recipient.",
    certType: "Badge Recipient",
  },
  {
    id: "ACH-04",
    icon: <CheckCircle2 size={18} className="text-yellow-street" />,
    title: "Google PromptWars 2026",
    event: "Google",
    result: "Participated in Google PromptWars 2026 competitive prompt engineering contest.",
    certType: "Official Participant",
  },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [clickedCerts, setClickedCerts] = useState<Record<string, boolean>>({});

  const handleCertClick = (id: string) => {
    soundManager.playClick();
    setClickedCerts((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="achievements" className="py-20 md:py-28 bg-charcoal" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          className="font-mono-custom text-xs text-yellow-street tracking-[0.4em] mb-3"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          03 / ACHIEVEMENTS & CERTIFICATIONS
        </motion.p>

        <motion.h2
          className="font-grotesk text-3xl md:text-5xl font-black text-soft-white mb-3"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          MILESTONES <span className="text-yellow-street">UNLOCKED.</span>
        </motion.h2>

        <motion.p
          className="font-inter text-muted-gray text-base max-w-xl mb-10"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Verified competitive milestones, certifications, and contest participation.
        </motion.p>

        {/* Clean, compact grid for achievement boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((ach, i) => {
            const isClicked = !!clickedCerts[ach.id];

            return (
              <motion.div
                key={ach.id}
                className="group bg-midnight border border-border-gray rounded-sm p-5 md:p-6 card-hover cursor-pointer flex flex-col justify-between"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.07 }}
                aria-label={ach.title}
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-sm bg-yellow-street/15 border border-yellow-street/30 flex items-center justify-center">
                      {ach.icon}
                    </div>
                    <div className="flex items-center gap-2.5">
                      {ach.certType && (
                        <span className="font-mono-custom text-[10px] text-muted-gray/80 tracking-wide border border-border-gray px-2 py-0.5 rounded-sm">
                          {ach.certType}
                        </span>
                      )}
                      <span className="font-mono-custom text-[11px] text-yellow-street tracking-[0.15em] font-bold">
                        {ach.id}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-grotesk text-base md:text-lg font-bold text-soft-white mb-1.5 group-hover:text-yellow-street transition-colors duration-200">
                    {ach.title}
                  </h3>

                  <p className="font-mono-custom text-[11px] text-yellow-street tracking-[0.12em] mb-2 font-semibold">
                    {ach.event}
                  </p>

                  <p className="font-inter text-xs md:text-sm text-muted-gray leading-relaxed mb-4">
                    {ach.result}
                  </p>
                </div>

                {ach.certUrl && (
                  <div className="pt-2 border-t border-border-gray/40">
                    <a
                      href={ach.certUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleCertClick(ach.id)}
                      className={`inline-flex items-center gap-1.5 font-mono-custom text-[11px] tracking-[0.1em] font-bold transition-all duration-200 focus-visible:outline-yellow-street ${
                        isClicked
                          ? "text-soft-white hover:text-soft-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                          : "text-yellow-street hover:text-white"
                      }`}
                      aria-label={`View certificate for ${ach.title}`}
                    >
                      <ExternalLink size={12} className={isClicked ? "text-soft-white" : "text-yellow-street"} />
                      <span>{isClicked ? "VIEW CERTIFICATE ✓" : "VIEW CERTIFICATE"}</span>
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
