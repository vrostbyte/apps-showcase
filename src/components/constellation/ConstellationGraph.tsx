"use client";

import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type D3ZoomEvent, type ZoomBehavior } from "d3-zoom";
import type { Project } from "@/content/types";
import type { ProjectRelationship } from "@/content/relationships";
import { GRAPH_HEIGHT, GRAPH_WIDTH, useForceLayout } from "./useForceLayout";
import { StarField } from "./StarField";
import { ProjectStar } from "./ProjectStar";
import { ConstellationEdge } from "./ConstellationEdge";

interface ConstellationGraphProps {
  projects: Project[];
  relationships: ProjectRelationship[];
  onSelect: (project: Project) => void;
  /** Slug to auto-focus on mount (e.g. returning from a closed modal). */
  focusSlug?: string | null;
}

export function ConstellationGraph({ projects, relationships, onSelect, focusSlug }: ConstellationGraphProps) {
  const { nodes, edges } = useForceLayout(projects, relationships);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [transform, setTransform] = useState(zoomIdentity);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
        // Programmatic jumps (focusOn) have no sourceEvent — animate those.
        // User-driven drag/wheel does have one — track the cursor 1:1, no lag.
        setAnimated(event.sourceEvent == null);
        setTransform(event.transform);
      });
    select(svg).call(behavior);
    zoomBehaviorRef.current = behavior;
    return () => {
      select(svg).on(".zoom", null);
    };
  }, []);

  const focusOn = (x: number, y: number, scale = 1.6) => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const t = zoomIdentity
      .translate(GRAPH_WIDTH / 2, GRAPH_HEIGHT / 2)
      .scale(scale)
      .translate(-x, -y);
    select(svgRef.current).call(zoomBehaviorRef.current.transform, t);
  };

  useEffect(() => {
    if (!focusSlug || nodes.length === 0) return;
    const target = nodes.find((n) => n.id === focusSlug);
    if (target) focusOn(target.x, target.y);
  }, [focusSlug, nodes]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid #1a1a1a", background: "#050507" }}>
      <StarField />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
        style={{ width: "100%", height: "100%", position: "relative", touchAction: "none" }}
      >
        <g transform={transform.toString()} style={{ transition: animated ? "transform 0.5s ease" : "none" }}>
          {edges.map((edge, i) => (
            <ConstellationEdge key={i} edge={edge} />
          ))}
          {nodes.map((node) => (
            <ProjectStar
              key={node.id}
              node={node}
              onSelect={() => {
                focusOn(node.x, node.y);
                onSelect(node.project);
              }}
            />
          ))}
        </g>
      </svg>
      <div style={{ position: "absolute", bottom: "12px", left: "14px", color: "#444", fontSize: "11px", fontFamily: "'Commit Mono', monospace", pointerEvents: "none" }}>
        scroll to zoom · drag to pan · click a star
      </div>
    </div>
  );
}
