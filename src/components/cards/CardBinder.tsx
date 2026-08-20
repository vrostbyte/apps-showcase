"use client";

import type { Project } from "@/content/types";
import { CARD_TYPE_SECTIONS, getCardType } from "./cardType";
import { TradingCard } from "./TradingCard";

export function CardBinder({ projects, onSelect }: { projects: Project[]; onSelect: (project: Project) => void }) {
  const sections = CARD_TYPE_SECTIONS.map((section) => ({
    section,
    projects: projects.filter((p) => getCardType(p).type === section.type),
  })).filter((s) => s.projects.length > 0);

  if (sections.length === 0) {
    return (
      <p style={{ color: "#555", fontSize: "13px", fontFamily: "'Commit Mono', monospace", padding: "40px 0", textAlign: "center" }}>
        No cards match this filter.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {sections.map(({ section, projects: sectionProjects }) => (
        <div key={section.type}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
            <h2 style={{ margin: 0, color: "#e0e0e0", fontSize: "16px", fontWeight: 700, fontFamily: "'Commit Mono', monospace", letterSpacing: "0.02em" }}>
              {section.sectionLabel}
            </h2>
            <span style={{ color: "#444", fontSize: "12px", fontFamily: "'Commit Mono', monospace" }}>{sectionProjects.length}</span>
            <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "20px" }}>
            {sectionProjects.map((p) => (
              <TradingCard key={p.slug} project={p} onSelect={() => onSelect(p)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
