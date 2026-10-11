"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { soundManager } from "@/lib/sound";

interface Skill {
  name: string;
  description: string;
}

interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "C", description: "Low-level programming, pointers, and memory architecture" },
      { name: "C++", description: "Competitive programming and advanced data structures" },
      { name: "Java", description: "Object-oriented software development" },
      { name: "Python", description: "Machine learning, NLP pipelines, and scripting" },
      { name: "JavaScript", description: "Full-stack client and server development" },
      { name: "TypeScript", description: "Type-safe robust application engineering" },
    ],
  },
  {
    id: "web",
    label: "Web Development",
    skills: [
      { name: "HTML5", description: "Semantic and accessible structure" },
      { name: "CSS3", description: "Custom layouts, keyframes, and modern styling" },
      { name: "React.js", description: "Component-based reactive UI development" },
      { name: "Next.js", description: "Server-side rendering, SSG, and full-stack React" },
      { name: "Tailwind CSS", description: "Utility-first modern styling and themes" },
      { name: "Three.js", description: "3D interactive web graphics and simulations" },
      { name: "Node.js", description: "Scalable backend JavaScript runtime" },
      { name: "Express.js", description: "RESTful web APIs and middleware routing" },
    ],
  },
  {
    id: "core",
    label: "Core Concepts",
    skills: [
      { name: "DSA", description: "Data structures and algorithm design" },
      { name: "Competitive Programming", description: "High-performance problem solving on Codeforces & LeetCode" },
      { name: "STL", description: "Standard Template Library in C++" },
      { name: "OOP", description: "Object-Oriented Programming principles" },
      { name: "DBMS", description: "Database Management Systems architecture" },
      { name: "SQL", description: "Relational database queries and schema design" },
      { name: "REST APIs", description: "Designing and integrating API endpoints" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    skills: [
      { name: "Generative AI", description: "Working with large language models and multi-turn workflows" },
      { name: "Machine Learning", description: "Supervised classification pipelines and model training" },
      { name: "NLP", description: "Natural Language Processing and text classification" },
      { name: "Google Gemini API", description: "Integrated in HashWriteMate AI and EcoPulse AI" },
      { name: "Prompt Engineering", description: "Optimizing instructions for LLM tasks" },
    ],
  },
  {
    id: "libraries",
    label: "Frameworks & Libraries",
    skills: [
      { name: "Streamlit", description: "Interactive data science and machine learning apps" },
      { name: "Pandas", description: "High-performance data manipulation and analysis" },
      { name: "Framer Motion", description: "Production-ready web animations and gestures" },
      { name: "React Flow", description: "Node-based visual interactive workflows" },
      { name: "Zustand", description: "Lightweight state management" },
      { name: "Recharts", description: "Data visualization and composable chart components" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    skills: [
      { name: "Git", description: "Distributed version control system" },
      { name: "GitHub", description: "Collaboration, code review, and open source" },
      { name: "Docker", description: "Containerized environments and deployment" },
      { name: "Bun", description: "High-speed modern JavaScript runtime" },
      { name: "Vercel", description: "Cloud platform for serverless and frontend deployment" },
      { name: "Supabase", description: "PostgreSQL-powered backend platform" },
      { name: "Firebase", description: "Application backend and cloud services" },
    ],
  },
  {
    id: "security",
    label: "Testing & Security",
    skills: [
      { name: "Playwright", description: "Automated end-to-end browser testing" },
      { name: "Semgrep", description: "Static application security testing (SAST)" },
      { name: "ESLint", description: "Code quality and linting verification" },
      { name: "Web Application Security", description: "Secure coding practices and vulnerability prevention" },
    ],
  },
];

function SkillBadge({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <button
        className="font-mono-custom text-xs md:text-sm tracking-[0.1em] px-3.5 py-2.5 bg-midnight border border-border-gray text-soft-white/90 rounded-sm hover:border-yellow-street hover:text-yellow-street hover:bg-yellow-street/5 transition-all duration-200 focus-visible:outline-yellow-street w-full text-left cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`${skill.name}: ${skill.description}`}
      >
        <span className="text-yellow-street mr-1.5 font-bold">›</span>
        {skill.name}
      </button>
      {hovered && (
        <div className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-charcoal border border-yellow-street/60 rounded-sm p-3.5 shadow-xl shadow-black/80">
          <p className="font-mono-custom text-[11px] text-yellow-street tracking-wider mb-1 font-bold">
            {skill.name.toUpperCase()}
          </p>
          <p className="font-inter text-xs text-soft-white leading-relaxed">
            {skill.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("languages");

  const active = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section id="skills" className="py-20 md:py-28 bg-midnight" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.p
          className="font-mono-custom text-xs text-yellow-street tracking-[0.4em] mb-3"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          04 / SKILL TREE
        </motion.p>

        <motion.h2
          className="font-grotesk text-3xl md:text-5xl font-black text-soft-white mb-3"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          TOOLS IN MY <span className="text-yellow-street">ARSENAL.</span>
        </motion.h2>

        <motion.p
          className="font-inter text-muted-gray text-base max-w-xl mb-10"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Verified skills across 7 categories directly matching my latest engineering background.
        </motion.p>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat.id);
              }}
              className={`font-mono-custom text-xs tracking-[0.12em] px-3.5 py-2 rounded-sm border transition-all duration-200 focus-visible:outline-yellow-street cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-yellow-street text-midnight border-yellow-street font-bold shadow-[0_0_15px_rgba(255,212,0,0.4)]"
                  : "bg-transparent text-muted-gray border-border-gray hover:border-yellow-street/60 hover:text-soft-white"
              }`}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5"
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {active.skills.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
