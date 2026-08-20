"use client";

import { useState } from "react";
import { GitBranch, Globe, LayoutGrid, Terminal as TermIcon, Layers } from "lucide-react";
import { PERSONAL_PROJECTS } from "@/content/personal-projects";
import { WORK_PROJECTS } from "@/content/work-projects";
import type { CategoryMeta, Project, ProjectCategory } from "@/content/types";
import { ICONS } from "@/components/icons";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { Terminal } from "@/components/Terminal";
import { CardBinder } from "@/components/cards/CardBinder";

const ALL_PROJECTS: Project[] = [...PERSONAL_PROJECTS, ...WORK_PROJECTS];

const CATEGORY_META: Record<"all" | ProjectCategory, CategoryMeta> = {
  all: { label: "All Projects", icon: "layers" },
  app: { label: "Apps", icon: "monitor" },
  business: { label: "My Business", icon: "wrench" },
  volunteer: { label: "Community Builds", icon: "heart" },
  work: { label: "Work (Confidential)", icon: "shield-check" },
};

export default function AppShowcase() {
  const [termOpen, setTermOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [view, setView] = useState<"cards" | "list">("cards");

  const filtered = filter === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === filter);

  return (
    <div style={{ background: "#09090b", minHeight: "100vh", color: "#e0e0e0", fontFamily: "'Outfit', 'Helvetica Neue', sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />

      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(9,9,11,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#4ade80", fontFamily: "'Commit Mono', monospace", fontWeight: 700, fontSize: "15px" }}>~/apps</span>
            <span style={{ color: "#333", fontSize: "14px" }}>/</span>
            <span style={{ color: "#666", fontSize: "13px" }}>josh griffith</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a href="https://joshjgriffith.dev" target="_blank" rel="noopener noreferrer" style={{ color: "#555", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <Globe size={13} /> portfolio
            </a>
            <a href="https://github.com/vrostbyte" target="_blank" rel="noopener noreferrer" style={{ color: "#555", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <GitBranch size={13} /> github
            </a>
            <button onClick={() => setTermOpen(true)} style={{ background: "#111", border: "1px solid #2a2a2a", color: "#4ade80", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontFamily: "'Commit Mono', monospace", display: "flex", alignItems: "center", gap: "6px" }}>
              <TermIcon size={13} /> terminal
            </button>
          </div>
        </div>
      </nav>

      <header style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 60px" }}>
        <p style={{ color: "#4ade80", fontFamily: "'Commit Mono', monospace", fontSize: "13px", marginBottom: "16px", letterSpacing: "0.03em" }}>
          $ ls -la ~/projects
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", color: "#f5f5f5", letterSpacing: "-0.02em" }}>
          {"Apps I've built,"}<br />
          <span style={{ color: "#4ade80" }}>shipped</span> {"& maintain."}
        </h1>
        <p style={{ color: "#777", fontSize: "16px", lineHeight: 1.7, maxWidth: "560px", margin: 0 }}>
          Real apps solving real problems, self-taught and self-shipped, plus internal tools I&apos;ve built at work
          described in the abstract. Every project here has a click-through walkthrough — no live backend required.
        </p>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 24px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "4px", background: "#111", borderRadius: "8px", padding: "4px", width: "fit-content", flexWrap: "wrap", border: "1px solid #1a1a1a" }}>
          {(Object.entries(CATEGORY_META) as [keyof typeof CATEGORY_META, CategoryMeta][]).map(([key, { label, icon }]) => {
            const CatIcon = ICONS[icon];
            return (
              <button key={key} onClick={() => setFilter(key)} style={{
                background: filter === key ? "#1f1f1f" : "transparent",
                border: "none", color: filter === key ? "#f0f0f0" : "#555",
                padding: "6px 14px", borderRadius: "6px", cursor: "pointer",
                fontSize: "12px", fontWeight: filter === key ? 600 : 400,
                fontFamily: "'Commit Mono', monospace",
                display: "flex", alignItems: "center", gap: "5px",
                transition: "all 0.15s",
              }}>
                <CatIcon size={12} /> {label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "4px", background: "#111", borderRadius: "8px", padding: "4px", border: "1px solid #1a1a1a" }}>
          <button onClick={() => setView("cards")} aria-label="Card view" style={{
            background: view === "cards" ? "#1f1f1f" : "transparent",
            border: "none", color: view === "cards" ? "#4ade80" : "#555",
            padding: "6px 12px", borderRadius: "6px", cursor: "pointer",
            fontSize: "12px", fontWeight: view === "cards" ? 600 : 400,
            fontFamily: "'Commit Mono', monospace",
            display: "flex", alignItems: "center", gap: "5px",
          }}>
            <Layers size={12} /> cards
          </button>
          <button onClick={() => setView("list")} aria-label="List view" style={{
            background: view === "list" ? "#1f1f1f" : "transparent",
            border: "none", color: view === "list" ? "#4ade80" : "#555",
            padding: "6px 12px", borderRadius: "6px", cursor: "pointer",
            fontSize: "12px", fontWeight: view === "list" ? 600 : 400,
            fontFamily: "'Commit Mono', monospace",
            display: "flex", alignItems: "center", gap: "5px",
          }}>
            <LayoutGrid size={12} /> list
          </button>
        </div>
      </div>

      {view === "cards" ? (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
          <CardBinder projects={filtered} onSelect={setSelectedProject} />
        </div>
      ) : (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} onSelect={() => setSelectedProject(p)} />
            ))}
          </div>
        </div>
      )}

      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "24px", textAlign: "center", color: "#333", fontSize: "12px", fontFamily: "'Commit Mono', monospace" }}>
        vibe coded with care // josh griffith // {new Date().getFullYear()}
      </footer>

      {termOpen && <Terminal projects={ALL_PROJECTS} onClose={() => setTermOpen(false)} />}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
