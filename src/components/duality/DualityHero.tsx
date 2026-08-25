"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { useCalibration } from "./useCalibration";

/**
 * The signature element: a draftsman's calibration rule the visitor drags
 * to recalibrate between the two real halves of the same person — this
 * "Builder" site and the enterprise Change Strategist / AI Enablement Lead
 * profile at joshjgriffith.com. Builder is the base layer (always full-size, showing
 * through); Enterprise sits on top, clipped to only the region right of
 * the rule, so the drag reads as a physical wipe between two instrument
 * calibrations, not a photo crossfade. Default rest position gives Builder
 * the majority (this is its home turf) with Enterprise legibly peeking in.
 */
/** Below this many visible pixels, a panel's text is fully faded — clipping it mid-word instead is worse than hiding it. */
const FADE_OUT_PX = 165;
const FADE_IN_PX = 300;

export function DualityHero({ builtCount, categoryCount }: { builtCount: number; categoryCount: number }) {
  const { t, setT, dragging, setDragging, trackRef, setFromClientX, onKeyDown } = useCalibration(0.64);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    // One-time/on-resize client-only reads — window is unavailable during
    // SSR, so these can't be lazy useState initializers without a hydration
    // mismatch (same reasoning as StarField's client-only randomization).
    const width = window.innerWidth;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setViewportWidth(width);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // On a narrow screen, the default 0.64 split leaves Enterprise too
    // narrow to read but not narrow enough to fully fade — push the rest
    // position further toward Builder so the default state is always
    // legible: one side full-strength, the other cleanly hidden.
    if (width < 640) {
      setT(0.8);
    }
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transition = dragging || reducedMotion ? "none" : "clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
  const percent = Math.round(t * 100);

  // Each side's text fades out as its own visible width shrinks — a
  // mid-word clip reads as broken, a fade reads as an intentional limit.
  const fade = (visiblePx: number) => Math.max(0, Math.min(1, (visiblePx - FADE_OUT_PX) / (FADE_IN_PX - FADE_OUT_PX)));
  const builderTextOpacity = fade(t * viewportWidth);
  const enterpriseTextOpacity = fade((1 - t) * viewportWidth);

  return (
    <section
      aria-label="Two sides of the same person: builder and enterprise change strategist"
      style={{ position: "relative", minHeight: "clamp(440px, 62vh, 580px)", overflow: "hidden", borderBottom: "1px solid #1c232c" }}
    >
      {/* Builder layer — base, always full-size */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 12% 15%, #142330 0%, var(--builder-ground) 55%)",
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "linear-gradient(#1c232c 1px, transparent 1px), linear-gradient(90deg, #1c232c 1px, transparent 1px)", backgroundSize: "34px 34px", maskImage: "radial-gradient(circle at 20% 30%, black, transparent 70%)" }} />
        {/* bottom is reserved for the calibration controls (handle, caption, mode buttons) so they never collide with copy */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: "104px", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: "44%", padding: "0 0 0 clamp(24px, 6vw, 72px)", opacity: builderTextOpacity, transition }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "4px 11px", background: "var(--builder-ground-raised)", border: "1px solid #232b35", borderRadius: "3px", marginBottom: "18px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--builder-line)" }} />
              <span style={{ color: "var(--structure)", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Builder mode</span>
            </div>
            <h1 style={{ margin: "0 0 16px", color: "#f0ede6", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>
              Apps I build,
              <br />
              ship, and maintain.
            </h1>
            <p style={{ margin: 0, color: "#8993a1", fontSize: "clamp(13px, 1.4vw, 16px)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
              {builtCount} shipped across {categoryCount} categories — self-taught,
              mostly solo, vibe-coded with Claude.
            </p>
          </div>
        </div>
      </div>

      {/* Enterprise layer — clipped to the region right of the rule */}
      <div
        aria-hidden={false}
        style={{
          position: "absolute", inset: 0,
          background: "var(--enterprise-ground)",
          clipPath: `inset(0 0 0 ${percent}%)`,
          transition,
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.55, backgroundImage: "linear-gradient(#e4dcc9 1px, transparent 1px), linear-gradient(90deg, #e4dcc9 1px, transparent 1px)", backgroundSize: "34px 34px", maskImage: "radial-gradient(circle at 80% 30%, black, transparent 70%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: "104px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <div style={{ maxWidth: "27%", minWidth: "200px", textAlign: "right", padding: "0 clamp(24px, 6vw, 72px) 0 0", opacity: enterpriseTextOpacity, transition }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "4px 11px", background: "#e9e3d5", border: "1px solid #d8cfba", borderRadius: "3px", marginBottom: "18px" }}>
              <span style={{ color: "var(--enterprise-ink)", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Enterprise mode</span>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--signal)" }} />
            </div>
            <h2 style={{ margin: "0 0 16px", color: "var(--enterprise-ink)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(20px, 2.6vw, 30px)", lineHeight: 1.14, letterSpacing: "-0.01em" }}>
              AI Enablement &amp; Transformation Lead at Vanguard.
            </h2>
            <p style={{ margin: "0 0 18px", color: "#5c5348", fontSize: "clamp(12.5px, 1.3vw, 15px)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>
              $6.5M+ documented savings.
              <br />
              12+ years turning complex process into results.
            </p>
            <a
              href="https://joshjgriffith.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--enterprise-ink)", fontSize: "13px", fontWeight: 600, fontFamily: "var(--font-body)", textDecoration: "none", borderBottom: "1.5px solid var(--signal)", paddingBottom: "2px" }}
            >
              See the full profile <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Calibration rule */}
      <div
        ref={trackRef}
        onPointerDown={(e) => { setFromClientX(e.clientX); setDragging(true); }}
        style={{ position: "absolute", inset: 0, cursor: "ew-resize", zIndex: 3 }}
      >
        <div
          style={{
            position: "absolute", top: 0, bottom: 0, left: `${percent}%`,
            width: "2px", marginLeft: "-1px",
            background: "linear-gradient(180deg, transparent, var(--signal) 12%, var(--signal) 88%, transparent)",
            transition,
            pointerEvents: "none",
          }}
        />
        <div
          role="slider"
          aria-label="Recalibrate between builder mode and enterprise mode"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={100 - percent}
          aria-valuetext={`${100 - percent}% enterprise`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => { e.stopPropagation(); setDragging(true); }}
          style={{
            position: "absolute", bottom: "68px", left: `${percent}%`,
            width: "40px", height: "40px", marginLeft: "-20px", marginTop: "-20px",
            borderRadius: "50%", background: "var(--builder-ground-raised)",
            border: "1.5px solid var(--signal)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "grab", transition, boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
          }}
        >
          <MoveHorizontal size={16} color="var(--signal)" />
        </div>
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: "40px", left: `${percent}%`, transform: "translateX(-50%)",
            color: "var(--structure)", fontSize: "10.5px", fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
            whiteSpace: "nowrap", transition,
          }}
        >
          drag to recalibrate
        </div>
      </div>

      {/* Keyboard / touch fallback — always available regardless of drag support */}
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", gap: "4px", background: "rgba(14,20,27,0.85)", backdropFilter: "blur(8px)", border: "1px solid #232b35", borderRadius: "5px", padding: "3px" }}>
        <button
          onClick={() => setT(0.92)}
          style={{ padding: "5px 12px", borderRadius: "3px", border: "none", cursor: "pointer", fontSize: "11.5px", fontFamily: "var(--font-body)", fontWeight: 600, background: t > 0.5 ? "#1c232c" : "transparent", color: t > 0.5 ? "var(--builder-line)" : "#5a6472" }}
        >
          Builder
        </button>
        <button
          onClick={() => setT(0.08)}
          style={{ padding: "5px 12px", borderRadius: "3px", border: "none", cursor: "pointer", fontSize: "11.5px", fontFamily: "var(--font-body)", fontWeight: 600, background: t <= 0.5 ? "#e9e3d5" : "transparent", color: t <= 0.5 ? "var(--enterprise-ink)" : "#5a6472" }}
        >
          Enterprise
        </button>
      </div>
    </section>
  );
}
