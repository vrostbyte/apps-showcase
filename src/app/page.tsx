"use client";

import { useEffect, useState } from "react";
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
import { useCalibration } from "@/components/duality/useCalibration";

const ALL_PROJECTS: Project[] = [...PERSONAL_PROJECTS, ...WORK_PROJECTS];

const CATEGORY_META: Record<"all" | ProjectCategory, { label: string; icon: keyof typeof ICONS; glow?: string }> = {
  all: { label: "All Builds", icon: "layers" },
  app: CATEGORY_IDENTITY.app,
  business: CATEGORY_IDENTITY.business,
  volunteer: CATEGORY_IDENTITY.volunteer,
  work: CATEGORY_IDENTITY.work,
};

/** In Enterprise mode, only these categories are relevant to someone evaluating professional capability. */
const ENTERPRISE_CATEGORY_ORDER: ProjectCategory[] = ["work", "app"];
const ENTERPRISE_PILL_KEYS: ("all" | ProjectCategory)[] = ["all", "work", "app"];

export default function AppShowcase() {
  const calibration = useCalibration(0.64);
  const { t, setT } = calibration;
  const [termOpen, setTermOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  // t near 1 = full Builder, t near 0 = full Enterprise (see useCalibration.ts).
  const mode: "builder" | "enterprise" = t > 0.5 ? "builder" : "enterprise";
  const isEnterprise = mode === "enterprise";

  useEffect(() => {
    // Land directly in the linked mode from a shared URL, e.g. ?mode=enterprise.
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode === "enterprise") setT(0.08);
    else if (urlMode === "builder") setT(0.92);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Keep the URL in sync with the discrete mode (not every drag pixel) so a
    // copied link reflects what's currently on screen.
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === mode) return;
    params.set("mode", mode);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [mode]);

  // If the active category filter is hidden by Enterprise mode, fall back to
  // "all" for this render rather than showing a dead-end empty state — derived
  // at render time instead of via an effect+setState so flipping modes can't
  // cause a stale intermediate render.
  const effectiveFilter = isEnterprise && (filter === "business" || filter === "volunteer") ? "all" : filter;

  const categoryOrder = isEnterprise ? ENTERPRISE_CATEGORY_ORDER : CATEGORY_ORDER;
  const visiblePillKeys = isEnterprise ? ENTERPRISE_PILL_KEYS : (Object.keys(CATEGORY_META) as ("all" | ProjectCategory)[]);
  const filtered = effectiveFilter === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === effectiveFilter);
  const spineGradient = `linear-gradient(90deg, ${CATEGORY_ORDER.map((c) => CATEGORY_IDENTITY[c].glow).join(", ")})`;

  // Scoped visual shift: page chrome (background, nav, filter pills) swaps to
  // the Enterprise vellum/ink tokens; the index rows and modal deliberately
  // stay in their Builder dark treatment (see plan — a full re-theme there
  // is a much bigger job than this "nice to have" justifies).
  const ground = isEnterprise ? "var(--enterprise-ground)" : "var(--builder-ground)";
  const ink = isEnterprise ? "var(--enterprise-ink)" : "#e0e0e0";
  const chromeBg = isEnterprise ? "rgba(242,237,227,0.85)" : "rgba(14,20,27,0.85)";
  const chromeBorder = isEnterprise ? "#d8cfba" : "#1c232c";
  const chromeMuted = isEnterprise ? "#8a7f6a" : "#5a6472";
  const pillActiveBg = isEnterprise ? "#e9e3d5" : "#1c232c";
  const pillActiveText = isEnterprise ? "var(--enterprise-ink)" : "#f0ede6";

  return (
    <div style={{ background: ground, minHeight: "100vh", color: ink, fontFamily: "var(--font-body)", position: "relative", transition: "background 0.3s ease, color 0.3s ease" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: chromeBg, backdropFilter: "blur(12px)", borderBottom: `1px solid ${chromeBorder}`, padding: "0 24px", transition: "background 0.3s ease, border-color 0.3s ease" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "5px", background: "#6fe0f018", border: "1px solid #6fe0f040", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Compass size={13} color="var(--builder-line)" />
            </div>
            <span style={{ color: ink, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "15px", transition: "color 0.3s ease" }}>Josh Griffith</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <a href="https://joshjgriffith.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-200" style={{ color: chromeMuted, display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <Globe size={13} /> joshjgriffith.com
            </a>
            <a href="https://github.com/vrostbyte" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-200" style={{ color: chromeMuted, display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <GitBranch size={13} /> github
            </a>
            <button onClick={() => setTermOpen(true)} aria-label="Open terminal easter egg" title="Psst — try the terminal" className="transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]" style={{ background: "transparent", border: `1px solid ${chromeBorder}`, color: chromeMuted, width: "30px", height: "30px", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TermIcon size={13} />
            </button>
          </div>
        </div>
      </nav>

      <DualityHero {...calibration} builtCount={ALL_PROJECTS.length} categoryCount={CATEGORY_ORDER.length} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 24px 24px", position: "relative" }}>
        <div style={{ display: "flex", gap: "4px", background: isEnterprise ? "#e9e3d5" : "var(--builder-ground-raised)", borderRadius: "6px", padding: "4px", width: "fit-content", flexWrap: "wrap", border: `1px solid ${chromeBorder}`, transition: "background 0.3s ease, border-color 0.3s ease" }}>
          {(Object.entries(CATEGORY_META) as [keyof typeof CATEGORY_META, typeof CATEGORY_META[keyof typeof CATEGORY_META]][])
            .filter(([key]) => visiblePillKeys.includes(key))
            .map(([key, { label, icon, glow }]) => {
              const CatIcon = ICONS[icon];
              return (
                <button key={key} onClick={() => setFilter(key)} style={{
                  background: effectiveFilter === key ? pillActiveBg : "transparent",
                  border: "none", color: effectiveFilter === key ? pillActiveText : chromeMuted,
                  padding: "6px 14px", borderRadius: "4px", cursor: "pointer",
                  fontSize: "12.5px", fontWeight: effectiveFilter === key ? 600 : 500,
                  fontFamily: "var(--font-body)",
                  display: "flex", alignItems: "center", gap: "6px",
                  transition: "all 0.15s",
                }}>
                  {glow && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: glow, opacity: effectiveFilter === key ? 1 : 0.6, flexShrink: 0 }} />}
                  <CatIcon size={12} /> {label}
                </button>
              );
            })}
        </div>
      </div>

      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
        <ProjectIndex projects={filtered} onSelect={setSelectedProject} categoryOrder={categoryOrder} />
      </div>

      <div style={{ position: "relative", height: "3px", background: spineGradient, opacity: 0.7 }} />
      <footer style={{ position: "relative", padding: "24px", textAlign: "center", color: isEnterprise ? "#8a7f6a" : "#3a4149", fontSize: "12.5px", fontFamily: "var(--font-body)" }}>
        Vibe-coded with care by Josh Griffith · © {new Date().getFullYear()}
      </footer>

      {termOpen && <Terminal projects={ALL_PROJECTS} onClose={() => setTermOpen(false)} />}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
