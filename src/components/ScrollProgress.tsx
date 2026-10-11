"use client";
import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      id="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: "0%",
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        background: "#FFD400",
        zIndex: 9998,
        transition: "width 0.1s linear",
      }}
    />
  );
}
