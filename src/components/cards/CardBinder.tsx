"use client";

import type { Project } from "@/content/types";
import { CATEGORY_IDENTITY, CATEGORY_ORDER } from "@/content/categories";
import { ICONS } from "../icons";
import { TradingCard } from "./TradingCard";

export function CardBinder({ projects, onSelect }: { projects: Project[]; onSelect: (project: Project) => void }) {
  const sections = CATEGORY_ORDER.map((category) => ({
    category,
    identity: CATEGORY_IDENTITY[category],
    projects: projects.filter((p) => p.category === category),
  })).filter((s) => s.projects.length > 0);

  if (sections.length === 0) {
    return (
      <p style={{ color: "#555", fontSize: "13px", fontFamily: "'Commit Mono', monospace", padding: "40px 0", textAlign: "center" }}>
        No cards match this filter.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
      {sections.map(({ category, identity, projects: sectionProjects }) => {
        const Icon = ICONS[identity.icon];
        return (
          <div key={category}>
            <div style={{ display: "flex", alignItems: "stretch", gap: "12px", marginBottom: "18px" }}>
              <div style={{ width: "4px", borderRadius: "2px", background: identity.glow, flexShrink: 0 }} />
              <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: `${identity.glow}18`, border: `1px solid ${identity.glow}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} color={identity.glow} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <h2 style={{ margin: 0, color: "#f0f0f0", fontSize: "17px", fontWeight: 700, fontFamily: "var(--font-space-grotesk), 'Outfit', sans-serif", letterSpacing: "-0.01em" }}>
                    {identity.label}
                  </h2>
                  <span style={{ color: "#555", fontSize: "12px", fontFamily: "'Commit Mono', monospace" }}>{sectionProjects.length}</span>
                </div>
                <p style={{ margin: "2px 0 0", color: "#777", fontSize: "12px" }}>{identity.description}</p>
              </div>
              <div style={{ flex: "0 1 60px", alignSelf: "center", height: "1px", background: `linear-gradient(90deg, ${identity.glow}55, transparent)` }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "20px" }}>
              {sectionProjects.map((p) => (
                <TradingCard key={p.slug} project={p} onSelect={() => onSelect(p)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
