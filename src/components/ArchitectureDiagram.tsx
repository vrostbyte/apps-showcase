"use client";

import type { DiagramEdge, DiagramNode } from "@/content/types";
import { ICONS } from "./icons";

interface ArchitectureDiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  activeNodeIds: string[];
  activeEdgeIndexes: number[];
  color: string;
}

export function ArchitectureDiagram({ nodes, edges, activeNodeIds, activeEdgeIndexes, color }: ArchitectureDiagramProps) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div
      style={{
        position: "relative",
        background: "#0a0a0a",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        aspectRatio: "16 / 10",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {edges.map((edge, i) => {
          const from = byId[edge.from];
          const to = byId[edge.to];
          if (!from || !to) return null;
          const active = activeEdgeIndexes.includes(i);
          return (
            <line
              key={i}
              x1={from.x} y1={from.y * 0.6}
              x2={to.x} y2={to.y * 0.6}
              stroke={active ? color : "#2a2a2a"}
              strokeWidth={active ? 0.5 : 0.3}
              strokeDasharray={active ? undefined : "1.5 1.5"}
              style={{ transition: "all 0.25s ease" }}
            />
          );
        })}
      </svg>

      {nodes.map((node) => {
        const active = activeNodeIds.includes(node.id);
        const NodeIcon = ICONS[node.icon];
        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              transition: "opacity 0.25s ease",
              opacity: active ? 1 : 0.35,
              width: "84px",
            }}
          >
            <div
              style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: active ? `${color}18` : "#141416",
                border: `1px solid ${active ? color + "60" : "#2a2a2a"}`,
                boxShadow: active ? `0 0 16px ${color}30` : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.25s ease",
              }}
            >
              <NodeIcon size={18} color={active ? color : "#666"} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: active ? "#eee" : "#666", fontSize: "10.5px", fontWeight: 600, lineHeight: 1.3 }}>
                {node.label}
              </div>
              {node.sublabel && (
                <div style={{ color: active ? "#888" : "#444", fontSize: "9px", fontFamily: "'Commit Mono', monospace", marginTop: "1px" }}>
                  {node.sublabel}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
