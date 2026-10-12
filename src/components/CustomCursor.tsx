"use client";
import { useEffect, useRef, useState } from "react";
import { soundManager } from "@/lib/sound";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch, non-reduced-motion environments
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (prefersReduced || noHover) return;

    let raf: number;
    let mouseX = -100, mouseY = -100;
    let curX = -100, curY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (curX === -100) {
        curX = e.clientX;
        curY = e.clientY;
      }
      setIsVisible(true);
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.42;
      curY += (mouseY - curY) * 0.42;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("[role='button']") ||
          target.tagName === "INPUT")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseDown = () => {
      setIsTapping(true);
    };

    const onMouseUp = () => {
      setIsTapping(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform transition-opacity duration-150 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
      aria-hidden="true"
    >
      <div
        className={`transition-all duration-150 ${
          isTapping
            ? "scale-90 rotate-90"
            : isPointer
            ? "scale-115 rotate-45"
            : "scale-100"
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          className="drop-shadow-[0_0_6px_rgba(255,212,0,0.5)] animate-spin-slow"
        >
          {/* Petals */}
          <g fill="#FFD400" stroke="#B28900" strokeWidth="2">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="20"
                rx="8"
                ry="18"
                transform={`rotate(${angle} 50 50)`}
                fill={i % 2 === 0 ? "#FFD400" : "#FFC400"}
              />
            ))}
          </g>
          {/* Center core */}
          <circle cx="50" cy="50" r="17" fill="#422006" stroke="#E5B800" strokeWidth="3" />
          <circle cx="50" cy="50" r="10" fill="#2E1002" />
          {/* Center seed texture */}
          <circle cx="48" cy="48" r="3" fill="#E5B800" opacity="0.6" />
          <circle cx="53" cy="51" r="2.5" fill="#E5B800" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
