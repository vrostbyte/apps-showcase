"use client";

import { useEffect, useRef } from "react";

const MAX_TILT_DEG = 12;

/**
 * Cursor-driven 3D tilt + holographic shine, the standard trading-card-site
 * hover physics. Performance-critical: writes CSS custom properties
 * directly to the DOM via the ref on every mousemove, bypassing React
 * state/re-render entirely — a setState per pixel of mouse movement would
 * jank. Respects prefers-reduced-motion (no tilt at all). No-op on touch
 * (no hover to track — a tap just navigates, nothing to reset either).
 */
export function useTiltEffect<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduceMotion || isTouch) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * MAX_TILT_DEG * 2;
      const ry = (px - 0.5) * MAX_TILT_DEG * 2;
      el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--shine-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--shine-y", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--shine-opacity", "1");
      el.style.setProperty("--tilt-scale", "1.04");
    };

    const handleLeave = () => {
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
      el.style.setProperty("--shine-opacity", "0");
      el.style.setProperty("--tilt-scale", "1");
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return ref;
}
