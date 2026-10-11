"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface WIPItem {
  id: string;
  title: string;
  description: string;
  status: "LEARNING" | "EXPLORING" | "IN DEVELOPMENT";
}

const WIP_ITEMS: WIPItem[] = [
  {
    id: "WIP-01",
    title: "Competitive Programming & DSA",
    description:
      "Working through advanced data structures, graph algorithms, and dynamic programming problems daily.",
    status: "LEARNING",
  },
  {
    id: "WIP-02",
    title: "Operating Systems & CS Fundamentals",
    description:
      "Deepening understanding of memory management, process scheduling, file systems, and concurrency.",
    status: "LEARNING",
  },
  {
    id: "WIP-03",
    title: "AI-Powered Applications",
    description:
      "Exploring agentic AI patterns, RAG, and building intelligent applications with modern LLM APIs.",
    status: "EXPLORING",
  },
  {
    id: "WIP-04",
    title: "Interactive CS Education",
    description:
      "Expanding Hashy.cs with more topics — network protocols, compiler design, and distributed systems.",
    status: "IN DEVELOPMENT",
  },
  {
    id: "WIP-05",
    title: "Software Engineering Practices",
    description:
      "Testing strategies, CI/CD pipelines, code review practices, and system design fundamentals.",
    status: "LEARNING",
  },
  {
    id: "WIP-06",
    title: "AspireOS",
    description:
      "Building the AI command layer and virtual application framework for the browser-native OS experience.",
    status: "IN DEVELOPMENT",
  },
];

const statusColor: Record<WIPItem["status"], string> = {
  LEARNING: "text-sky-400 bg-sky-400/10",
  EXPLORING: "text-purple-400 bg-purple-400/10",
  "IN DEVELOPMENT": "text-orange-400 bg-orange-400/10",
};

export default function WIPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section id="wip" className="py-24 md:py-32 bg-charcoal" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          className="font-mono-custom text-[10px] text-yellow-street tracking-[0.4em] mb-4"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          05 / WORK IN PROGRESS
        </motion.p>

        <motion.h2
          className="font-grotesk text-3xl md:text-5xl font-black text-soft-white mb-4"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          THE NEXT MISSIONS{" "}
          <span className="text-yellow-street">ARE LOADING.</span>
        </motion.h2>

        <motion.p
          className="font-inter text-muted-gray text-sm max-w-xl mb-14"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Ongoing work. Honest labels — no fabricated completion percentages.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WIP_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-midnight border border-border-gray rounded-sm p-5 card-hover"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-custom text-[9px] text-yellow-street/40 tracking-[0.25em]">
                  {item.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1 font-mono-custom text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-sm ${statusColor[item.status]}`}
                >
                  <Loader2 size={9} className="animate-spin" aria-hidden="true" />
                  {item.status}
                </span>
              </div>

              <h3 className="font-grotesk text-base font-bold text-soft-white mb-2">
                {item.title}
              </h3>

              <p className="font-inter text-xs text-muted-gray leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
