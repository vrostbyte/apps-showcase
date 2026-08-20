"use client";

import { ArrowUpRight, ChevronRight, GitBranch, Heart, Lock, Play, X, Zap } from "lucide-react";
import type { Project } from "@/content/types";
import { CATEGORY_IDENTITY } from "@/content/categories";
import { ICONS } from "./icons";
import { ClickThroughDemo } from "./ClickThroughDemo";
import { GEM_COLOR, getBuildCost, getReach, getRarityGem, getTypeLabel, getUptimeTier } from "./cards/cardType";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h4 style={{ color: "#555", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 10px", fontFamily: "'Commit Mono', monospace" }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

export function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const IconComp = ICONS[p.icon];
  const isWork = p.kind === "work";
  const identity = CATEGORY_IDENTITY[p.category];
  const rarity = getRarityGem(p);
  const buildCost = getBuildCost(p);
  const reach = getReach(p);
  const uptime = getUptimeTier(p);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "640px", width: "100%", maxHeight: "85vh", borderRadius: "17px", padding: "3px", background: `linear-gradient(150deg, ${identity.frame[0]}, ${identity.frame[1]} 55%, ${identity.frame[2]})` }}>
      <div style={{ background: "#111", border: "1px solid #222", borderRadius: "15px", width: "100%", maxHeight: "calc(85vh - 6px)", overflowY: "auto", position: "relative" }}>
        {/* Header — reads as an oversized card face: name, mana pips, type line, stat plate */}
        <div style={{ padding: "32px 32px 20px", background: `linear-gradient(135deg, ${p.color}12 0%, #111 60%)`, borderRadius: "15px 15px 0 0" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "#1a1a1a", border: "1px solid #333", color: "#888", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
            <X size={14} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconComp size={22} color={p.color} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
              <div>
                <h2 style={{ margin: 0, color: "#f0f0f0", fontSize: "22px", fontFamily: "var(--font-space-grotesk), 'Outfit', sans-serif", fontWeight: 700 }}>{p.name}</h2>
                <p style={{ margin: "2px 0 0", color: "#888", fontSize: "14px" }}>{p.tagline}</p>
              </div>
              <div style={{ display: "flex", gap: "3px", flexShrink: 0, marginTop: "6px" }} title={`Build cost: ${buildCost}`}>
                {Array.from({ length: buildCost }).map((_, i) => (
                  <span key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, opacity: 0.9 }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "3px 9px", background: "#1c1c1f", border: "1px solid #2a2a2a", borderRadius: "4px" }}>
              <span style={{ color: "#999", fontSize: "10.5px", fontFamily: "'Commit Mono', monospace", letterSpacing: "0.02em" }}>
                {getTypeLabel(p)}
              </span>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GEM_COLOR[rarity] }} title={rarity} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "#999", fontSize: "11px", fontFamily: "'Commit Mono', monospace" }} title={`Reach: ${reach} real capabilities`}>
                <Zap size={10} color={p.color} /> {reach}
              </span>
              <span style={{ display: "flex", gap: "2px" }} title={`Uptime: ${uptime}/3`}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: i < uptime ? p.color : "#333" }} />
                ))}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "14px" }}>
            {isWork ? (
              <span style={{ background: "#71717a22", color: "#a1a1aa", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", border: "1px solid #71717a44", display: "flex", alignItems: "center", gap: "4px" }}>
                <Lock size={10} /> CONFIDENTIAL — CODENAMED
              </span>
            ) : (
              <span style={{ background: p.live ? "#16a34a22" : "#71717a22", color: p.live ? "#4ade80" : "#a1a1aa", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", border: `1px solid ${p.live ? "#16a34a44" : "#71717a44"}` }}>
                {p.live ? "● LIVE" : p.url ? "○ ARCHIVED" : "○ NEVER DEPLOYED"}
              </span>
            )}
            {p.category === "volunteer" && (
              <span style={{ background: "#e879a015", color: "#f9a8c9", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, border: "1px solid #e879a030", display: "flex", alignItems: "center", gap: "4px" }}>
                <Heart size={10} /> PRO BONO
              </span>
            )}
            <span style={{ background: `${p.color}12`, color: p.color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", gap: "4px" }}>
              <Play size={10} /> WALKTHROUGH
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px 32px" }}>
          {!isWork && p.url && !p.live && (
            <div style={{ background: "#0d0d0f", border: "1px solid #222", borderRadius: "10px", padding: "12px 14px", marginBottom: "20px", color: "#888", fontSize: "12.5px", lineHeight: 1.5 }}>
              This app&apos;s backend has been retired, so the live site no longer runs. The walkthrough below is built from real screens to show how it worked.
            </div>
          )}
          {!isWork && !p.url && (
            <div style={{ background: "#0d0d0f", border: "1px solid #222", borderRadius: "10px", padding: "12px 14px", marginBottom: "20px", color: "#888", fontSize: "12.5px", lineHeight: 1.5 }}>
              This one never got a public deploy{p.repoUrl ? " — the source is on GitHub" : ""}. The walkthrough below narrates the real build.
            </div>
          )}
          {isWork && (
            <div style={{ background: "#0d0d0f", border: "1px solid #222", borderRadius: "10px", padding: "12px 14px", marginBottom: "20px", color: "#888", fontSize: "12.5px", lineHeight: 1.5 }}>
              This is real internal work, described in the abstract and named &ldquo;{p.codename}&rdquo; to keep it confidential. The diagram below shows the shape of the system, not the actual implementation.
            </div>
          )}

          <div style={{ marginBottom: "24px" }}>
            <ClickThroughDemo steps={p.demoSteps} color={p.color} diagram={p.diagram} />
          </div>

          <Section title="Tech Stack">
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {p.stack.map((t) => (
                <span key={t} style={{ background: "#1a1a1a", color: "#ccc", padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: "'Commit Mono', monospace", border: "1px solid #252525" }}>{t}</span>
              ))}
            </div>
          </Section>

          <Section title="Infrastructure">
            <p style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.6, margin: 0, fontFamily: "'Commit Mono', monospace" }}>{p.infra}</p>
          </Section>

          {isWork && (
            <Section title="Problem">
              <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{p.problem}</p>
            </Section>
          )}

          <Section title="Target Audience">
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{p.audience}</p>
          </Section>

          <Section title="About">
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{p.description}</p>
          </Section>

          {isWork && (
            <Section title="Outcome">
              <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{p.outcome}</p>
            </Section>
          )}

          <Section title="What went into it">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {p.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <ChevronRight size={12} color={p.color} style={{ marginTop: "4px", flexShrink: 0 }} />
                  <span style={{ color: "#bbb", fontSize: "13px", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </Section>

          {!isWork && (p.url || p.repoUrl) && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: p.color, color: "#000", padding: "10px 20px",
                  borderRadius: "8px", textDecoration: "none", fontSize: "13px",
                  fontWeight: 600, fontFamily: "'Commit Mono', monospace",
                }}>
                  {p.live ? "Visit Live Site" : "Visit Site (offline)"} <ArrowUpRight size={14} />
                </a>
              )}
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "transparent", color: "#ccc", padding: "10px 20px",
                  borderRadius: "8px", textDecoration: "none", fontSize: "13px",
                  fontWeight: 600, fontFamily: "'Commit Mono', monospace",
                  border: "1px solid #2a2a2a",
                }}>
                  <GitBranch size={14} /> View Source
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
