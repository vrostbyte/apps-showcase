"use client";

import { useState } from "react";
import type { StarNode } from "./useForceLayout";
import { ICONS } from "../icons";

export function ProjectStar({ node, onSelect }: { node: StarNode; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const { project } = node;
  const isWork = project.kind === "work";
  const Icon = ICONS[project.icon];
  const r = hovered ? 22 : 18;

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {hovered && (
        <circle r={r + 14} fill={project.color} opacity={0.15} style={{ transition: "all 0.2s ease" }} />
      )}
      <circle
        r={r}
        fill={isWork ? "#141416" : `${project.color}22`}
        stroke={project.color}
        strokeWidth={isWork ? 1.5 : 1.25}
        strokeDasharray={isWork ? "3 3" : undefined}
        opacity={isWork ? 0.75 : 1}
        style={{ transition: "all 0.15s ease" }}
      />
      <foreignObject x={-9} y={-9} width={18} height={18} style={{ pointerEvents: "none" }}>
        <Icon size={18} color={project.color} strokeWidth={1.75} />
      </foreignObject>
      <text
        y={r + 16}
        textAnchor="middle"
        fill={hovered ? "#f0f0f0" : "#888"}
        fontSize={11}
        fontFamily="'Commit Mono', monospace"
        fontWeight={hovered ? 600 : 400}
        style={{ transition: "fill 0.15s ease", userSelect: "none" }}
      >
        {project.name}
      </text>
    </g>
  );
}
