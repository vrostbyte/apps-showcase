"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives the duality hero's calibration rule: 0 = full Enterprise, 1 = full
 * Builder. Handles pointer drag on the track, arrow-key adjustment on
 * the handle (a real role="slider"), and click-to-jump anywhere on the
 * track. React state is the source of truth — this is a single hero
 * element, not a dense list, so a state update per pointermove is cheap
 * (unlike the per-card tilt hook, which writes CSS properties directly to
 * avoid re-rendering many siblings).
 */
export function useCalibration(initial: number) {
  const [t, setT] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const next = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    setT(next);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging, setFromClientX]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { setT((v) => Math.max(0, +(v - 0.1).toFixed(2))); e.preventDefault(); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { setT((v) => Math.min(1, +(v + 0.1).toFixed(2))); e.preventDefault(); }
    else if (e.key === "Home") { setT(0); e.preventDefault(); }
    else if (e.key === "End") { setT(1); e.preventDefault(); }
  }, []);

  return { t, setT, dragging, setDragging, trackRef, setFromClientX, onKeyDown };
}
