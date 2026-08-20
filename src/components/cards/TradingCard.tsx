"use client";

import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import type { Project } from "@/content/types";
import { CATEGORY_IDENTITY } from "@/content/categories";
import { ICONS } from "../icons";
import {
  GEM_COLOR, getBuildCost, getReach, getRarityGem, getTypeLabel, getUptimeTier,
} from "./cardType";
import { useTiltEffect } from "./useTiltEffect";

interface TradingCardProps {
  project: Project;
  onSelect: () => void;
}

const DISPLAY_FONT = "var(--font-space-grotesk), 'Outfit', sans-serif";

export function TradingCard({ project: p, onSelect }: TradingCardProps) {
  const tiltRef = useTiltEffect<HTMLDivElement>();
  const identity = CATEGORY_IDENTITY[p.category];
  const rarity = getRarityGem(p);
  const Icon = ICONS[p.icon];
  const buildCost = getBuildCost(p);
  const reach = getReach(p);
  const uptime = getUptimeTier(p);
  const collectorNumber = p.slug;
  const [artErrored, setArtErrored] = useState(false);
  const artImgRef = useRef<HTMLImageElement>(null);
  const artSrc = !artErrored && p.kind === "personal" ? p.screenshots[0]?.src : undefined;

  useEffect(() => {
    // The server-rendered <img> starts loading before React hydrates, so a
    // fast 404 can fail (and fire "error") before onError is attached —
    // catch that already-failed state on mount instead of missing it.
    if (artImgRef.current?.complete && artImgRef.current.naturalWidth === 0) {
      setArtErrored(true);
    }
  }, [artSrc]);

  return (
    <div
      ref={tiltRef}
      onClick={onSelect}
      className="trading-card"
      style={{
        position: "relative",
        aspectRatio: "5 / 7",
        borderRadius: "14px",
        padding: "3px",
        background: `linear-gradient(150deg, ${identity.frame[0]}, ${identity.frame[1]} 55%, ${identity.frame[2]})`,
        cursor: "pointer",
        transform: "perspective(900px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg)) scale(var(--tilt-scale, 1))",
        transition: "transform 0.15s ease-out",
        willChange: "transform",
      } as React.CSSProperties}
    >
      {/* Holographic shine — cursor-tracked, opacity toggled by useTiltEffect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "14px",
          pointerEvents: "none",
          zIndex: 5,
          opacity: "var(--shine-opacity, 0)",
          transition: "opacity 0.2s ease-out",
          background:
            "radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.35), transparent 45%), " +
            "conic-gradient(from 90deg at var(--shine-x, 50%) var(--shine-y, 50%), " +
            "rgba(255,0,150,0.18), rgba(255,200,0,0.18), rgba(0,255,150,0.18), rgba(0,180,255,0.18), rgba(180,0,255,0.18), rgba(255,0,150,0.18))",
          mixBlendMode: "color-dodge",
        } as React.CSSProperties}
      />
      <div
        style={{
          position: "relative",
          height: "100%",
          borderRadius: "11px",
          background: `linear-gradient(180deg, ${identity.frame[2]} 0%, #101012 40%)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header: name + mana pips */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px 6px", gap: "6px" }}>
          <span style={{ color: "#f5f5f5", fontSize: "13px", fontWeight: 700, fontFamily: DISPLAY_FONT, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {p.name}
          </span>
          <div style={{ display: "flex", gap: "2px", flexShrink: 0 }} title={`Build cost: ${buildCost}`}>
            {Array.from({ length: buildCost }).map((_, i) => (
              <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.color, opacity: 0.9 }} />
            ))}
          </div>
        </div>

        {/* Art box */}
        <div style={{ position: "relative", margin: "0 8px", borderRadius: "6px", overflow: "hidden", aspectRatio: "5 / 3", background: `${p.color}12`, border: `1px solid ${p.color}30`, flexShrink: 0 }}>
          {artSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={artImgRef}
              src={artSrc}
              alt=""
              onError={() => setArtErrored(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={30} color={p.color} strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Type line: category + rarity gem */}
        <div style={{ margin: "6px 8px 0", padding: "3px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1c1c1f", border: "1px solid #2a2a2a", borderRadius: "4px", flexShrink: 0 }}>
          <span style={{ color: "#999", fontSize: "9.5px", fontFamily: "'Commit Mono', monospace", letterSpacing: "0.02em" }}>
            {getTypeLabel(p)}
          </span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GEM_COLOR[rarity], flexShrink: 0 }} title={rarity} />
        </div>

        {/* Text box */}
        <div style={{ flex: 1, margin: "6px 8px", padding: "8px 9px", background: "#0f0f10", border: "1px solid #222", borderRadius: "6px", overflow: "hidden", display: "flex", flexDirection: "column", gap: "5px", minHeight: 0 }}>
          <p style={{ margin: 0, color: "#bbb", fontSize: "10px", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
            {p.description}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
            {p.highlights.slice(0, 2).map((h, i) => (
              <div key={i} style={{ display: "flex", gap: "4px", alignItems: "flex-start" }}>
                <span style={{ color: p.color, fontSize: "9px", lineHeight: 1.5, flexShrink: 0 }}>▸</span>
                <span style={{ color: "#888", fontSize: "9px", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: "auto 0 0", padding: "5px 0 0", borderTop: "1px solid #1e1e1e", color: "#666", fontSize: "9px", fontStyle: "italic", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {p.tagline}
          </p>
        </div>

        {/* Footer: collector number + Reach/Uptime stat plate */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px 8px", flexShrink: 0 }}>
          <span style={{ color: "#444", fontSize: "8px", fontFamily: "'Commit Mono', monospace" }}>{collectorNumber}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "2px", color: "#999", fontSize: "9px", fontFamily: "'Commit Mono', monospace" }} title={`Reach: ${reach} real capabilities`}>
              <Zap size={8} color={p.color} /> {reach}
            </span>
            <span style={{ display: "flex", gap: "1.5px" }} title={`Uptime: ${uptime}/3`}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: i < uptime ? p.color : "#333" }} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
