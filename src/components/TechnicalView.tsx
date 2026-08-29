"use client";

import { useState } from "react";
import { GitBranch, Globe, Terminal as TermIcon, Compass } from "lucide-react";
import { PERSONAL_PROJECTS } from "@/content/personal-projects";
import { WORK_PROJECTS } from "@/content/work-projects";
import { CATEGORY_IDENTITY, CATEGORY_ORDER } from "@/content/categories";
import type { Project, ProjectCategory } from "@/content/types";
import { ICONS } from "@/components/icons";
import { ProjectModal } from "@/components/ProjectModal";
import { Terminal } from "@/components/Terminal";
import { ProjectIndex } from "@/components/index/ProjectIndex";
import { DualityHero } from "@/components/duality/DualityHero";
import type { useCalibration } from "@/components/duality/useCalibration";

const ALL_PROJECTS: Project[] = [...PERSONAL_PROJECTS, ...WORK_PROJECTS];

const CATEGORY_META: Record<"all" | ProjectCategory, { label: string; icon: keyof typeof ICONS; glow?: string }> = {
  all: { label: "All Builds", icon: "layers" },
  app: CATEGORY_IDENTITY.app,
  business: CATEGORY_IDENTITY.business,
  volunteer: CATEGORY_IDENTITY.volunteer,
  work: CATEGORY_IDENTITY.work,
};

type CalibrationProps = ReturnType<typeof useCalibration>;

/**
 * The "Builder" side — everything joshjgriffith.dev has always shown:
 * every coded project, unfiltered, across all 4 categories. The
 * calibration-rule hero lets a visitor preview and commit to the
 * Professional mode (see `AppShowcaseClient`/`ModeTransition`), but
 * nothing here ever hides or reorders content by mode — that was Phase
 * 7's mistake, corrected in Phase 8.
 */
export function TechnicalView({ calibration }: { calibration: CalibrationProps }) {
  const [termOpen, setTermOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const filtered = filter === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === filter);
  const spineGradient = `linear-gradient(90deg, ${CATEGORY_ORDER.map((c) => CATEGORY_IDENTITY[c].glow).join(", ")})`;

  return (
    <div style={{ background: "var(--builder-ground)", minHeight: "100vh", color: "#e0e0e0", fontFamily: "var(--font-body)", position: "relative" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(14,20,27,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1c232c", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "5px", background: "#6fe0f018", border: "1px solid #6fe0f040", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Compass size={13} color="var(--builder-line)" />
            </div>
            <span style={{ color: "#e0e0e0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "15px" }}>Josh Griffith</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <a href="https://joshjgriffith.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-200" style={{ color: "#5a6472", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <Globe size={13} /> joshjgriffith.com
            </a>
            <a href="https://github.com/vrostbyte" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-200" style={{ color: "#5a6472", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <GitBranch size={13} /> github
            </a>
            <button onClick={() => setTermOpen(true)} aria-label="Open terminal easter egg" title="Psst — try the terminal" className="transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]" style={{ background: "transparent", border: "1px solid #1c232c", color: "#5a6472", width: "30px", height: "30px", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TermIcon size={13} />
            </button>
          </div>
        </div>
      </nav>

      <DualityHero {...calibration} builtCount={ALL_PROJECTS.length} categoryCount={CATEGORY_ORDER.length} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 24px 24px", position: "relative" }}>
        <div style={{ display: "flex", gap: "4px", background: "var(--builder-ground-raised)", borderRadius: "6px", padding: "4px", width: "fit-content", flexWrap: "wrap", border: "1px solid #1c232c" }}>
          {(Object.entries(CATEGORY_META) as [keyof typeof CATEGORY_META, typeof CATEGORY_META[keyof typeof CATEGORY_META]][])
            .map(([key, { label, icon, glow }]) => {
              const CatIcon = ICONS[icon];
              return (
                <button key={key} onClick={() => setFilter(key)} style={{
                  background: filter === key ? "#1c232c" : "transparent",
                  border: "none", color: filter === key ? "#f0ede6" : "#5a6472",
                  padding: "6px 14px", borderRadius: "4px", cursor: "pointer",
                  fontSize: "12.5px", fontWeight: filter === key ? 600 : 500,
                  fontFamily: "var(--font-body)",
                  display: "flex", alignItems: "center", gap: "6px",
                  transition: "all 0.15s",
                }}>
                  {glow && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: glow, opacity: filter === key ? 1 : 0.6, flexShrink: 0 }} />}
                  <CatIcon size={12} /> {label}
                </button>
              );
            })}
        </div>
      </div>

      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
        <ProjectIndex projects={filtered} onSelect={setSelectedProject} />
      </div>

      <div style={{ position: "relative", height: "3px", background: spineGradient, opacity: 0.7 }} />
      <footer style={{ position: "relative", padding: "24px", textAlign: "center", color: "#3a4149", fontSize: "12.5px", fontFamily: "var(--font-body)" }}>
        Vibe-coded with care by Josh Griffith · © {new Date().getFullYear()}
      </footer>

      {termOpen && <Terminal projects={ALL_PROJECTS} onClose={() => setTermOpen(false)} />}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
