"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { DemoStep, DiagramEdge, DiagramNode } from "@/content/types";
import { ImageFrame } from "./ImageFrame";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface ClickThroughDemoProps {
  steps: DemoStep[];
  color: string;
  /** Required when any step is kind "diagram". */
  diagram?: { nodes: DiagramNode[]; edges: DiagramEdge[] };
}

/**
 * A scripted, backend-free walkthrough. Works two ways depending on step kind:
 *  - "screenshot": steps through real captured screens of a live-but-now-offline app.
 *  - "diagram": steps through a system diagram, lighting up the pieces involved
 *    at each stage — used for confidential projects with nothing screenshot-able.
 */
export function ClickThroughDemo({ steps, color, diagram }: ClickThroughDemoProps) {
  const [i, setI] = useState(0);
  if (steps.length === 0) return null;
  const step = steps[i];

  const prev = () => setI((c) => (c === 0 ? steps.length - 1 : c - 1));
  const next = () => setI((c) => (c === steps.length - 1 ? 0 : c + 1));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <Play size={14} color={color} />
        <span style={{ color: "#ddd", fontSize: "13px", fontWeight: 600 }}>Walkthrough</span>
        <span style={{ color: "#555", fontSize: "11px", fontFamily: "'Commit Mono', monospace", marginLeft: "auto" }}>
          {i + 1} / {steps.length}
        </span>
      </div>

      {step.kind === "screenshot" ? (
        <ImageFrame src={step.image} alt={step.title} />
      ) : diagram ? (
        <ArchitectureDiagram
          nodes={diagram.nodes}
          edges={diagram.edges}
          activeNodeIds={step.activeNodeIds}
          activeEdgeIndexes={step.activeEdgeIndexes ?? []}
          color={color}
        />
      ) : null}

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
        <button onClick={prev} aria-label="Previous step" style={navBtnStyle}>
          <ChevronLeft size={15} />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#eee", fontSize: "13px", fontWeight: 600, marginBottom: "3px" }}>{step.title}</div>
          <p style={{ color: "#888", fontSize: "12.5px", lineHeight: 1.5, margin: 0 }}>{step.caption}</p>
        </div>
        <button onClick={next} aria-label="Next step" style={navBtnStyle}>
          <ChevronRight size={15} />
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to step ${idx + 1}`}
            style={{
              width: idx === i ? "18px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: idx === i ? color : "#333",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const navBtnStyle: React.CSSProperties = {
  background: "rgba(0,0,0,0.4)",
  border: "1px solid #2a2a2a",
  color: "#ccc",
  width: "32px", height: "32px", borderRadius: "8px",
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  flexShrink: 0,
};
