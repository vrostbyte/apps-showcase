"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Mode = "builder" | "enterprise";
type Phase = "idle" | "leaving" | "entering-start" | "entering";

const LEAVE_MS = 260;
const ENTER_MS = 340;
const SWEEP_MS = 620;

/**
 * Owns the atomic swap between the Technical and Professional views: a
 * sequential fade (leave, swap, enter — deliberately not a simultaneous
 * cross-dissolve, since the two modes have very different scroll heights
 * and DOM shapes) plus a full-viewport "recalibration sweep" in the shared
 * --signal accent to disguise the blank beat mid-swap, echoing the
 * calibration rule's own drag-line.
 *
 * `technical`/`professional` are built fresh by the caller every render
 * (cheap — just element creation) but only one is ever mounted: this
 * component renders `displayedMode`'s view, its own committed/latched
 * state, not the live `mode` prop directly. That's what lets a drag
 * through the 50% threshold keep rendering the *same* TechnicalView
 * instance (with fresh, live calibration props) instead of unmounting it
 * mid-drag — only a release (or a button/keyboard jump, where `dragging`
 * is never true) commits the swap.
 */
export function ModeTransition({
  mode, dragging, technical, professional,
}: { mode: Mode; dragging: boolean; technical: ReactNode; professional: ReactNode }) {
  const [displayedMode, setDisplayedMode] = useState(mode);
  const [phase, setPhase] = useState<Phase>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    // One-time client-only read — window is unavailable during SSR (same
    // reasoning as DualityHero's reducedMotion check).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    // A multi-step, timer-sequenced transition is inherently an effect, not
    // a render-time computation — this mirrors the calibration rule's own
    // drag/settle handling. Never commits mid-drag: a live pixel crossing
    // the 50% threshold only previews via DualityHero's own crossfade; the
    // page-wide swap only fires once dragging stops (a button/keyboard jump
    // never sets `dragging` at all, so those commit immediately).
    if (dragging || mode === displayedMode) return;

    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];

    window.scrollTo({ top: 0, behavior: "auto" });

    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedMode(mode);
      return;
    }

    setPhase("leaving");
    setSweepKey((k) => k + 1);

    const swap = window.setTimeout(() => {
      setDisplayedMode(mode);
      setPhase("entering-start");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("entering"));
      });
      const settle = window.setTimeout(() => setPhase("idle"), ENTER_MS);
      timeoutsRef.current.push(settle);
    }, LEAVE_MS);
    timeoutsRef.current.push(swap);

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
    };
  }, [mode, dragging, displayedMode, reducedMotion]);

  const activeView = displayedMode === "builder" ? technical : professional;
  const opacity = phase === "leaving" || phase === "entering-start" ? 0 : 1;
  const transition =
    phase === "leaving" ? `opacity ${LEAVE_MS}ms ease`
    : phase === "entering" ? `opacity ${ENTER_MS}ms ease`
    : "none";

  return (
    <>
      <div style={{ opacity, transition }}>{activeView}</div>
      {phase !== "idle" && !reducedMotion && (
        <div key={sweepKey} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 999, overflow: "hidden", pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute", top: 0, bottom: 0, width: "3px",
              background: "linear-gradient(180deg, transparent, var(--signal) 15%, var(--signal) 85%, transparent)",
              boxShadow: "0 0 32px 6px var(--signal)",
              animation: `mode-sweep ${SWEEP_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
          />
        </div>
      )}
      <style>{`
        @keyframes mode-sweep {
          0% { left: -3px; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </>
  );
}
