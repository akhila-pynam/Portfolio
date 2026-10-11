"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";

const COMMANDS: Record<string, string> = {
  help: "Available commands: help, about, projects, skills, contact, clear",
  about: "Akhila Pynam — CS student, builder, problem solver. Section: #about",
  projects: "7 missions: Hash Hawk, HashWriteMate AI, Election App, EcoPulse AI, GrowEasy AI CSV Importer, AspireOS, Hashy.cs",
  skills: "Languages: C++, Java, Python, JS, TS. Frameworks: React, Next.js. AI: Gemini API, ML. Section: #skills",
  contact: "Email: akhilapynam@gmail.com | GitHub: github.com/akhila-pynam | LinkedIn: linkedin.com/in/akhila-pynam-ba0369338 | LeetCode: leetcode.com/u/akhila-pynam",
  clear: "__CLEAR__",
};

interface HistoryEntry {
  input: string;
  output: string;
}

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { input: "", output: 'Type "help" for available commands.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      const output = COMMANDS[cmd] || `Command not found: "${cmd}". Type "help" for help.`;

      if (output === "__CLEAR__") {
        setHistory([{ input: "", output: 'Terminal cleared. Type "help" for commands.' }]);
      } else {
        const scrollId = cmd === "about" ? "#about" : cmd === "projects" ? "#projects" : cmd === "skills" ? "#skills" : cmd === "contact" ? "#contact" : null;
        if (scrollId) {
          document.querySelector(scrollId)?.scrollIntoView({ behavior: "smooth" });
        }
        setHistory((h) => [...h, { input: cmd, output }]);
      }
      setInput("");
    },
    [input]
  );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[500] w-10 h-10 bg-charcoal border border-border-gray rounded-sm flex items-center justify-center text-muted-gray hover:text-yellow-street hover:border-yellow-street transition-all duration-200 focus-visible:outline-yellow-street"
        aria-label="Open terminal"
        title="Open terminal (Ctrl + `)"
      >
        <Terminal size={16} />
      </button>

      {/* Terminal panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 right-6 z-[500] w-[min(420px,calc(100vw-48px))] bg-charcoal border border-border-gray rounded-sm shadow-2xl shadow-black/80 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Terminal easter egg"
            aria-modal="true"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-gray bg-midnight">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-yellow-street" />
                <span className="font-mono-custom text-[10px] text-muted-gray tracking-[0.2em]">
                  AKHILA.EXE — TERMINAL
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-gray hover:text-soft-white transition-colors focus-visible:outline-yellow-street"
                aria-label="Close terminal"
              >
                <X size={14} />
              </button>
            </div>

            {/* Output */}
            <div className="h-48 overflow-y-auto p-4 space-y-2 font-mono-custom text-[11px] leading-relaxed">
              {history.map((entry, i) => (
                <div key={i}>
                  {entry.input && (
                    <p className="text-yellow-street">
                      <span className="text-muted-gray">ap@portfolio</span>
                      <span className="text-soft-white">:</span>
                      <span className="text-muted-gray">~</span>
                      <span className="text-soft-white">$</span>{" "}
                      {entry.input}
                    </p>
                  )}
                  <p className="text-muted-gray">{entry.output}</p>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={runCommand} className="flex items-center gap-2 px-4 py-3 border-t border-border-gray">
              <span className="font-mono-custom text-[10px] text-yellow-street shrink-0">
                ap@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent font-mono-custom text-[11px] text-soft-white outline-none placeholder-muted-gray/40"
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </form>

            <p className="px-4 pb-2 font-mono-custom text-[9px] text-muted-gray/40 tracking-[0.1em]">
              Ctrl+` to toggle · Esc to close · This is a UI feature only
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
