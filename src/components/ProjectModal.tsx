"use client";

import { ArrowUpRight, ChevronRight, GitBranch, Heart, Lock, Play, X, Zap } from "lucide-react";
import type { Project } from "@/content/types";
import { CATEGORY_IDENTITY } from "@/content/categories";
import { ICONS } from "./icons";
import { Bracket } from "./Bracket";
import { ClickThroughDemo } from "./ClickThroughDemo";
import { GEM_COLOR, getBuildCost, getReach, getRarityGem, getTypeLabel, getUptimeTier } from "./cards/cardType";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h4 style={{ color: "var(--structure)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px", fontFamily: "var(--font-display)" }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <span style={{ background: `${tone}14`, color: tone, padding: "3px 9px", borderRadius: "3px", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.04em", border: `1px solid ${tone}33`, display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-mono)" }}>
      {children}
    </span>
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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(6,9,12,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", maxWidth: "640px", width: "100%", maxHeight: "85vh",
          borderRadius: "6px", background: "var(--builder-ground-raised)", border: "1px solid #1c232c",
          overflowY: "auto", overflowX: "hidden",
        }}
      >
        <Bracket corner="tl" size={11} />
        <Bracket corner="tr" size={11} />
        <Bracket corner="bl" size={11} />
        <Bracket corner="br" size={11} />

        {/* Header — instrument panel for the clicked build: identity, mana pips, type line, stat plate */}
        <div style={{ padding: "30px 30px 18px", borderBottom: "1px solid #1c232c" }}>
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "16px", right: "16px", background: "transparent", border: "1px solid #2a323c", color: "var(--structure)", width: "30px", height: "30px", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
            <X size={14} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "10px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: identity.glow }} />
            <span style={{ color: "var(--structure)", fontSize: "10.5px", fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{identity.label}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "6px", background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconComp size={20} color={p.color} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
              <div>
                <h2 style={{ margin: 0, color: "#f0ede6", fontSize: "22px", fontFamily: "var(--font-display)", fontWeight: 600 }}>{p.name}</h2>
                <p style={{ margin: "2px 0 0", color: "#8993a1", fontSize: "13.5px", fontFamily: "var(--font-body)" }}>{p.tagline}</p>
              </div>
              <div style={{ display: "flex", gap: "3px", flexShrink: 0, marginTop: "6px" }} title={`Build size: ${buildCost}`}>
                {Array.from({ length: buildCost }).map((_, i) => (
                  <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.color, opacity: 0.9 }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "3px 9px", background: "var(--builder-ground)", border: "1px solid #232b35", borderRadius: "3px" }}>
              <span style={{ color: "#8993a1", fontSize: "10.5px", fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>
                {getTypeLabel(p)}
              </span>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GEM_COLOR[rarity] }} title={rarity} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "#8993a1", fontSize: "11px", fontFamily: "var(--font-mono)" }} title={`Reach: ${reach} real capabilities`}>
                <Zap size={10} color="var(--signal)" /> {reach}
              </span>
              <span style={{ display: "flex", alignItems: "flex-end", gap: "2px" }} title={`Status: ${uptime}/3`}>
                {[4, 7, 10].map((h, i) => (
                  <span key={i} style={{ width: "3.5px", height: `${h}px`, borderRadius: "1px", background: i < uptime ? "var(--builder-line)" : "#2a3038" }} />
                ))}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "14px" }}>
            {isWork ? (
              <Tag tone="#8a97a6"><Lock size={9} /> ENTERPRISE</Tag>
            ) : (
              <Tag tone={p.live ? "#4ade80" : "#8a97a6"}>
                {p.live ? "● LIVE" : p.url ? "○ ARCHIVED" : "○ NEVER DEPLOYED"}
              </Tag>
            )}
            {p.category === "volunteer" && (
              <Tag tone="#f472b6"><Heart size={9} /> PRO BONO</Tag>
            )}
            <Tag tone={p.color}><Play size={9} /> WALKTHROUGH</Tag>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 30px 30px" }}>
          {!isWork && p.url && !p.live && (
            <div style={{ background: "var(--builder-ground)", border: "1px solid #1c232c", borderRadius: "4px", padding: "12px 14px", marginBottom: "20px", color: "#8993a1", fontSize: "12.5px", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
              This app&apos;s backend has been retired, so the live site no longer runs. The walkthrough below is built from real screens to show how it worked.
            </div>
          )}
          {!isWork && !p.url && (
            <div style={{ background: "var(--builder-ground)", border: "1px solid #1c232c", borderRadius: "4px", padding: "12px 14px", marginBottom: "20px", color: "#8993a1", fontSize: "12.5px", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
              This one never got a public deploy{p.repoUrl ? " — the source is on GitHub" : ""}. The walkthrough below narrates the real build.
            </div>
          )}
          {isWork && (
            <div style={{ background: "var(--builder-ground)", border: "1px solid #1c232c", borderRadius: "4px", padding: "12px 14px", marginBottom: "20px", color: "#8993a1", fontSize: "12.5px", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
              This is real enterprise work, described in the abstract and named &ldquo;{p.codename}&rdquo; to protect identifying details. The diagram below shows the shape of the system, not the actual implementation.
            </div>
          )}

          <div style={{ marginBottom: "24px" }}>
            <ClickThroughDemo steps={p.demoSteps} color={p.color} diagram={p.diagram} />
          </div>

          <Section title="Tech Stack">
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {p.stack.map((t) => (
                <span key={t} style={{ background: "var(--builder-ground)", color: "#c3cad2", padding: "4px 11px", borderRadius: "4px", fontSize: "12px", fontFamily: "var(--font-mono)", border: "1px solid #232b35" }}>{t}</span>
              ))}
            </div>
          </Section>

          <Section title="Infrastructure">
            <p style={{ color: "#a3acb8", fontSize: "14px", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-body)" }}>{p.infra}</p>
          </Section>

          {isWork && (
            <Section title="Problem">
              <p style={{ color: "#a3acb8", fontSize: "14px", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-body)" }}>{p.problem}</p>
            </Section>
          )}

          <Section title="Target Audience">
            <p style={{ color: "#a3acb8", fontSize: "14px", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-body)" }}>{p.audience}</p>
          </Section>

          <Section title="About">
            <p style={{ color: "#a3acb8", fontSize: "14px", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-body)" }}>{p.description}</p>
          </Section>

          {isWork && (
            <Section title="Outcome">
              <p style={{ color: "#a3acb8", fontSize: "14px", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-body)" }}>{p.outcome}</p>
            </Section>
          )}

          <Section title="What went into it">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {p.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <ChevronRight size={12} color="var(--signal)" style={{ marginTop: "4px", flexShrink: 0 }} />
                  <span style={{ color: "#c3cad2", fontSize: "13px", lineHeight: 1.5, fontFamily: "var(--font-body)" }}>{h}</span>
                </div>
              ))}
            </div>
          </Section>

          {!isWork && (p.url || p.repoUrl) && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: p.color, color: "#0e141b", padding: "10px 20px",
                  borderRadius: "4px", textDecoration: "none", fontSize: "13.5px",
                  fontWeight: 600, fontFamily: "var(--font-body)",
                }}>
                  {p.live ? "Visit Live Site" : "Visit Site (offline)"} <ArrowUpRight size={14} />
                </a>
              )}
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "transparent", color: "#c3cad2", padding: "10px 20px",
                  borderRadius: "4px", textDecoration: "none", fontSize: "13.5px",
                  fontWeight: 600, fontFamily: "var(--font-body)",
                  border: "1px solid #2a323c",
                }}>
                  <GitBranch size={14} /> View Source
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
