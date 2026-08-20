"use client";

import type { StarEdge } from "./useForceLayout";

const KIND_STYLE: Record<string, { dash?: string; opacity: number }> = {
  pivot: { dash: undefined, opacity: 0.5 },
  rebuild: { dash: "5 3", opacity: 0.45 },
  "shared-infra": { dash: "2 4", opacity: 0.4 },
};

export function ConstellationEdge({ edge }: { edge: StarEdge }) {
  const style = KIND_STYLE[edge.relationship.kind] ?? { opacity: 0.4 };
  const midX = (edge.from.x + edge.to.x) / 2;
  const midY = (edge.from.y + edge.to.y) / 2;

  return (
    <g>
      <line
        x1={edge.from.x}
        y1={edge.from.y}
        x2={edge.to.x}
        y2={edge.to.y}
        stroke="#6b7280"
        strokeWidth={1}
        strokeDasharray={style.dash}
        opacity={style.opacity}
      />
      {edge.relationship.label && (
        <text
          x={midX}
          y={midY - 6}
          textAnchor="middle"
          fill="#666"
          fontSize={9}
          fontFamily="'Commit Mono', monospace"
          style={{ userSelect: "none" }}
        >
          {edge.relationship.label}
        </text>
      )}
    </g>
  );
}
