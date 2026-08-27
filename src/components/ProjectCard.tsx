"use client";

import { useState } from "react";
import { ArrowUpRight, GitBranch, Heart, Lock, Play } from "lucide-react";
import type { Project } from "@/content/types";
import { ICONS } from "./icons";

export function ProjectCard({ project: p, onSelect }: { project: Project; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const IconComp = ICONS[p.icon];
  const isWork = p.kind === "work";

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#131316" : "#0f0f12",
        border: `1px solid ${hovered ? p.color + "40" : "#1a1a1a"}`,
        borderRadius: "12px", padding: "24px", cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {hovered && <div style={{ position: "absolute", top: "-50%", right: "-50%", width: "100%", height: "100%", background: `radial-gradient(circle, ${p.color}08 0%, transparent 70%)`, pointerEvents: "none" }} />}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "9px", background: `${p.color}12`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconComp size={18} color={p.color} />
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {isWork ? (
              <span style={{ background: "#71717a18", color: "#a1a1aa", padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "3px" }}>
                <Lock size={8} /> ENTERPRISE
              </span>
            ) : (
              <span style={{ background: p.live ? "#16a34a18" : "#71717a18", color: p.live ? "#4ade80" : "#a1a1aa", padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                {p.live ? "● LIVE" : p.url ? "○ ARCHIVED" : "○ NO DEPLOY"}
              </span>
            )}
            {p.category === "volunteer" && (
              <span style={{ background: "#e879a012", color: "#f9a8c9", padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "3px" }}>
                <Heart size={8} /> PRO BONO
              </span>
            )}
            <span style={{ background: `${p.color}10`, color: p.color, padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: "3px" }}>
              <Play size={8} /> DEMO
            </span>
          </div>
        </div>
        <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: 600, color: "#f0f0f0" }}>{p.name}</h3>
        <p style={{ margin: "0 0 8px", color: "#777", fontSize: "13px", lineHeight: 1.5 }}>{p.tagline}</p>

        <div style={{ marginBottom: "16px" }}>
          {isWork ? (
            <span style={{ color: "#555", fontSize: "11.5px", fontFamily: "'Outfit', sans-serif" }}>
              internal / not publicly linked
            </span>
          ) : p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                color: p.color, fontSize: "11.5px", fontFamily: "'Commit Mono', monospace",
                textDecoration: "none", opacity: 0.8,
              }}
            >
              {p.url.replace(/^https?:\/\//, "")}
              <ArrowUpRight size={10} />
            </a>
          ) : p.repoUrl ? (
            <a
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                color: "#777", fontSize: "11.5px", fontFamily: "'Outfit', sans-serif",
                textDecoration: "none", opacity: 0.8,
              }}
            >
              <GitBranch size={10} /> source only
            </a>
          ) : (
            <span style={{ color: "#444", fontSize: "11.5px", fontFamily: "'Outfit', sans-serif" }}>
              never publicly deployed
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {p.stack.slice(0, 4).map((t) => (
            <span key={t} style={{ background: "#161618", color: "#888", padding: "3px 9px", borderRadius: "4px", fontSize: "10px", fontFamily: "'Commit Mono', monospace", border: "1px solid #1f1f1f" }}>{t}</span>
          ))}
          {p.stack.length > 4 && (
            <span style={{ background: "#161618", color: "#555", padding: "3px 9px", borderRadius: "4px", fontSize: "10px", fontFamily: "'Commit Mono', monospace", border: "1px solid #1f1f1f" }}>+{p.stack.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
