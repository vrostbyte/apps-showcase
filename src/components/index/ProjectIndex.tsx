"use client";

import { Zap } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/types";
import { CATEGORY_IDENTITY, CATEGORY_ORDER, type CategoryIdentity } from "@/content/categories";
import { ICONS } from "../icons";
import { getBuildCost, getReach, getUptimeTier } from "../cards/cardType";
import { Bracket } from "../Bracket";

function SectionHeader({ identity, count }: { identity: CategoryIdentity; count: number }) {
  const Icon = ICONS[identity.icon];
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: "12px", padding: "10px 14px", marginBottom: "2px" }}>
      <Bracket corner="tl" />
      <Bracket corner="br" />
      <Icon size={13} color={identity.glow} />
      <h2 style={{ margin: 0, color: "#f0ede6", fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-display)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
        {identity.label}
      </h2>
      <span style={{ color: "var(--structure)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>{String(count).padStart(2, "0")}</span>
      <span style={{ flex: 1, color: "#666", fontSize: "12.5px", fontFamily: "var(--font-body)", textAlign: "right" }}>{identity.description}</span>
    </div>
  );
}

function IndexRow({ project: p, onSelect }: { project: Project; onSelect: () => void }) {
  const identity = CATEGORY_IDENTITY[p.category];
  const buildCost = getBuildCost(p);
  const reach = getReach(p);
  const uptime = getUptimeTier(p);

  return (
    <button
      onClick={onSelect}
      className="index-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        width: "100%",
        padding: "13px 14px",
        background: "transparent",
        border: "none",
        borderTop: "1px solid #1c232c",
        borderLeft: "2px solid transparent",
        textAlign: "left",
        cursor: "pointer",
        fontFamily: "inherit",
        color: "inherit",
        transition: "background 0.12s ease, border-color 0.12s ease",
      }}
    >
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: identity.glow, flexShrink: 0 }} />

      <span style={{ minWidth: "160px", flexShrink: 0, color: "#f0ede6", fontSize: "14.5px", fontWeight: 600, fontFamily: "var(--font-display)" }}>
        {p.name}
      </span>

      <span style={{ minWidth: "82px", flexShrink: 0, color: "var(--structure)", fontSize: "11px", fontFamily: "var(--font-mono)" }}>
        {identity.shortLabel}
      </span>

      <span className="hidden md:flex" style={{ flex: 1, gap: "6px", overflow: "hidden", flexWrap: "nowrap" }}>
        {p.stack.slice(0, 4).map((t) => (
          <span key={t} style={{ color: "#5a6472", fontSize: "11px", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
            {t}
          </span>
        ))}
      </span>
      <span className="md:hidden" style={{ flex: 1 }} />

      <span className="hidden sm:block" style={{ color: "#889", fontSize: "12.5px", fontFamily: "var(--font-body)", flexShrink: 0, maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {p.tagline}
      </span>

      <span style={{ display: "flex", gap: "2px", flexShrink: 0 }} title={`Build size: ${buildCost}`}>
        {Array.from({ length: buildCost }).map((_, i) => (
          <span key={i} style={{ width: "3px", height: "3px", borderRadius: "50%", background: p.color, opacity: 0.85 }} />
        ))}
      </span>

      <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "#889", fontSize: "11px", fontFamily: "var(--font-mono)", flexShrink: 0, width: "26px" }} title={`Reach: ${reach}`}>
        <Zap size={9} color="var(--signal)" /> {reach}
      </span>

      <span style={{ display: "flex", alignItems: "flex-end", gap: "2px", flexShrink: 0 }} title={`Status: ${uptime}/3`}>
        {[4, 7, 10].map((h, i) => (
          <span key={i} style={{ width: "3px", height: `${h}px`, borderRadius: "1px", background: i < uptime ? "var(--builder-line)" : "#2a3038" }} />
        ))}
      </span>
    </button>
  );
}

export function ProjectIndex({
  projects, onSelect, categoryOrder = CATEGORY_ORDER,
}: { projects: Project[]; onSelect: (project: Project) => void; categoryOrder?: ProjectCategory[] }) {
  const sections = categoryOrder.map((category) => ({
    category,
    identity: CATEGORY_IDENTITY[category],
    projects: projects.filter((p) => p.category === category),
  })).filter((s) => s.projects.length > 0);

  if (sections.length === 0) {
    return (
      <p style={{ color: "var(--structure)", fontSize: "13.5px", fontFamily: "var(--font-body)", padding: "40px 0", textAlign: "center" }}>
        No builds match this filter.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      <style>{`
        .index-row:hover { background: var(--builder-ground-raised); border-left-color: var(--builder-line) !important; }
        .index-row:focus-visible { outline: 1.5px solid var(--builder-line); outline-offset: -1.5px; background: var(--builder-ground-raised); }
      `}</style>
      {sections.map(({ category, identity, projects: sectionProjects }) => (
        <section key={category}>
          <SectionHeader identity={identity} count={sectionProjects.length} />
          <div style={{ borderBottom: "1px solid #1c232c" }}>
            {sectionProjects.map((p) => (
              <IndexRow key={p.slug} project={p} onSelect={() => onSelect(p)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
