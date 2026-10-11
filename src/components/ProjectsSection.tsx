"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Zap, Clock } from "lucide-react";
import { soundManager } from "@/lib/sound";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  description: string;
  contribution: string;
  stack: string[];
  highlight: string;
  status: "LIVE" | "IN PROGRESS";
  demo?: string;
  github?: string;
}

const PROJECTS: Project[] = [
  {
    id: "M-01",
    title: "Hash Hawk",
    subtitle: "Spam Message Detector",
    problem: "Spam messages cluttering inboxes and evading basic keyword filters.",
    description:
      "A Machine Learning based spam message detection system utilizing Pandas and supervised classification models to reliably separate spam from legitimate messages.",
    contribution:
      "Engineered text preprocessing, feature extraction pipeline, model training, and interactive web interface.",
    stack: ["Python", "Scikit-learn", "Streamlit", "NLP", "Pandas"],
    highlight:
      "End-to-end classification pipeline capable of real-time spam prediction on incoming text.",
    status: "LIVE",
    github: "https://github.com/akhila-pynam/hash-hawk-spam-message-detector",
  },
  {
    id: "M-02",
    title: "HashWriteMate AI",
    subtitle: "Grammar & Paragraph Writer",
    problem: "Writers struggle with grammar correction, tone polish, and rapid paragraph generation.",
    description:
      "An AI-powered writing assistant that helps users improve and generate content with high contextual accuracy, powered by Google Gemini API and NLP.",
    contribution:
      "Engineered prompt chains with Google Gemini API, real-time grammar feedback loop, and responsive user interface.",
    stack: ["Next.js", "TypeScript", "Google Gemini API", "Python", "Tailwind CSS"],
    highlight:
      "Dynamic prompt architecture delivering real-time grammar repair and intelligent paragraph expansion.",
    status: "LIVE",
    github: "https://github.com/akhila-pynam/hash-write-ai",
  },
  {
    id: "M-03",
    title: "Election Process Education App",
    subtitle: "Civic Education",
    problem: "Citizens often find election guidelines and voting mechanics complicated and opaque.",
    description:
      "An interactive civic education application designed to explain voting procedures, ballot mechanics, and democratic principles through structured walkthroughs and quizzes.",
    contribution:
      "Designed educational flow, quiz logic, and deployed accessible web platform.",
    stack: ["React", "JavaScript", "HTML", "CSS", "Vercel"],
    highlight:
      "Interactive quizzes and voting guides making civic processes easy to understand for first-time voters.",
    status: "LIVE",
    demo: "https://election-education-app.vercel.app/",
    github: "https://github.com/akhila-pynam/election-education-app",
  },
  {
    id: "M-04",
    title: "EcoPulse AI",
    subtitle: "Carbon Footprint Awareness Platform",
    problem: "Individuals lack measurable visibility into their personal environmental impact.",
    description:
      "A carbon footprint awareness platform featuring an interactive carbon calculator, AI-driven sustainability recommendations, activity tracking, and visual analytics.",
    contribution:
      "Built calculation engine, AI recommendations, goal tracking system, and data charts.",
    stack: ["Next.js", "TypeScript", "Google Gemini API", "Tailwind CSS", "Recharts"],
    highlight:
      "Actionable recommendations based on user activity with real-time carbon reduction tracking.",
    status: "LIVE",
    demo: "https://eco-pulse-ai-nu.vercel.app/",
    github: "https://github.com/akhila-pynam/EcoPulse-AI",
  },
  {
    id: "M-05",
    title: "GrowEasy AI CSV Importer",
    subtitle: "Smart CSV Ingestion & Validation",
    problem: "Manual CSV imports often fail due to mismatched schemas, dirty formatting, and missing validation.",
    description:
      "An AI-powered CSV data importer and schema validator that automatically inspects, cleans, maps, and validates datasets for seamless data onboarding.",
    contribution:
      "Engineered client-side file parsing workflow, AI-assisted column schema mapping, and error reporting interface.",
    stack: ["Next.js", "TypeScript", "AI", "Tailwind CSS", "Vercel"],
    highlight:
      "Intelligent schema detection and instant error resolution for robust automated CSV ingestion.",
    status: "LIVE",
    demo: "https://groweasy-ai-csv-importer-front.vercel.app/",
    github: "https://github.com/akhila-pynam/groweasy-ai-csv-importer",
  },
  {
    id: "M-06",
    title: "AspireOS",
    subtitle: "AI-Powered Virtual Desktop & Workflow Automation Platform",
    problem: "Fragmented web tools and context switching impede productivity for engineers.",
    description:
      "A virtual operating system running directly in the browser with an AI command layer and workspace automation. Currently in active development.",
    contribution:
      "Architecting virtual window manager, OS shell, and background agent automations.",
    stack: ["Next.js", "TypeScript", "AI", "Bun", "Tailwind CSS"],
    highlight:
      "Browser-native OS desktop environment with integrated AI context awareness.",
    status: "IN PROGRESS",
    github: "https://github.com/akhila-pynam/aspire-os",
  },
  {
    id: "M-07",
    title: "#Hashy.cs",
    subtitle: "3D Interactive Computer Science Learning Platform",
    problem: "Abstract computer science concepts like CPU scheduling and deadlocks are difficult to visualize.",
    description:
      "An interactive computer science education platform featuring 3D visual simulations for data structures, CPU scheduling, virtual memory, deadlocks, and SQL queries.",
    contribution:
      "Developing 3D algorithm visualization engine with Three.js and real-time execution controls.",
    stack: ["React", "Three.js", "TypeScript", "Tailwind CSS", "React Flow"],
    highlight:
      "Real-time 3D simulation canvas allowing students to inspect operating system algorithms step by step.",
    status: "IN PROGRESS",
    github: "https://github.com/akhila-pynam/hashy-cs",
  },
];

const statusConfig = {
  LIVE: { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-500/30", label: "LIVE" },
  "IN PROGRESS": { color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-500/30", label: "IN PROGRESS" },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const status = statusConfig[project.status];

  return (
    <motion.article
      ref={ref}
      className="group bg-charcoal border border-border-gray rounded-sm p-5 md:p-6 card-hover relative flex flex-col justify-between cursor-pointer"
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      aria-label={`Project: ${project.title}`}
    >
      <div>
        {/* Mission ID & Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono-custom text-[11px] text-yellow-street tracking-[0.25em] font-semibold">
            {project.id}
          </span>
          <span className={`font-mono-custom text-[10px] tracking-[0.15em] px-2 py-0.5 rounded-sm font-semibold border ${status.color} ${status.bg} ${status.border}`}>
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-grotesk text-xl md:text-2xl font-black text-soft-white mb-1 group-hover:text-yellow-street transition-colors duration-200">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="font-mono-custom text-[11px] text-yellow-street/80 tracking-wider mb-3 font-semibold">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="font-inter text-xs md:text-sm text-muted-gray leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Highlight */}
        <div className="flex gap-2 mb-4 p-2.5 bg-midnight/80 border-l-2 border-yellow-street rounded-sm">
          <Zap size={13} className="text-yellow-street mt-0.5 shrink-0" />
          <p className="font-inter text-xs text-soft-white/90 leading-relaxed">
            {project.highlight}
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono-custom text-[10px] tracking-[0.05em] px-2 py-0.5 bg-midnight border border-border-gray text-muted-gray group-hover:text-soft-white group-hover:border-yellow-street/30 rounded-sm transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pt-3 border-t border-border-gray/50">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="inline-flex items-center gap-1.5 font-mono-custom text-xs tracking-[0.1em] text-yellow-street hover:text-yellow-gold font-bold transition-colors focus-visible:outline-yellow-street"
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink size={13} />
            VIEW PROJECT
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="inline-flex items-center gap-1.5 font-mono-custom text-xs tracking-[0.1em] text-muted-gray hover:text-soft-white font-medium transition-colors focus-visible:outline-yellow-street"
            aria-label={`View source code of ${project.title}`}
          >
            <Github size={13} />
            SOURCE CODE
          </a>
        )}
        {project.status === "IN PROGRESS" && !project.demo && !project.github && (
          <span className="inline-flex items-center gap-1.5 font-mono-custom text-xs tracking-[0.1em] text-muted-gray/60">
            <Clock size={13} />
            IN DEVELOPMENT
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="py-20 md:py-28 bg-midnight" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          className="font-mono-custom text-xs text-yellow-street tracking-[0.4em] mb-3"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          02 / MISSIONS
        </motion.p>

        <motion.h2
          className="font-grotesk text-3xl md:text-5xl font-black text-soft-white mb-3"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          BUILT WITH <span className="text-yellow-street">PURPOSE.</span>
        </motion.h2>

        <motion.p
          className="font-inter text-muted-gray text-base max-w-xl mb-10"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Selected engineering missions directly corresponding to my project portfolio.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
