"use client";

import { useMemo } from "react";
import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY } from "d3-force";
import type { Project, ProjectCategory } from "@/content/types";
import type { ProjectRelationship } from "@/content/relationships";

export interface StarNode {
  id: string;
  project: Project;
  x: number;
  y: number;
}

export interface StarEdge {
  from: StarNode;
  to: StarNode;
  relationship: ProjectRelationship;
}

export const GRAPH_WIDTH = 1200;
export const GRAPH_HEIGHT = 760;

const CLUSTER_ANCHORS: Record<ProjectCategory, { x: number; y: number }> = {
  app: { x: 380, y: 260 },
  business: { x: 880, y: 190 },
  volunteer: { x: 860, y: 590 },
  work: { x: 300, y: 620 },
};

interface SimNode {
  id: string;
  project: Project;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
}

/**
 * Lays out every project as a node, clustered loosely by category and pulled
 * together where a real relationship exists. The simulation is ticked to a
 * settled state synchronously and deterministically (no Math.random, no
 * animation loop), so this is a pure derivation of (projects, relationships)
 * — safe to compute with useMemo. A newly-added project needs zero manual
 * (x, y) placement; position emerges from data.
 */
export function useForceLayout(projects: Project[], relationships: ProjectRelationship[]) {
  return useMemo(() => {
    const simNodes: SimNode[] = projects.map((p, i) => {
      const anchor = CLUSTER_ANCHORS[p.category] ?? { x: GRAPH_WIDTH / 2, y: GRAPH_HEIGHT / 2 };
      const angle = (i / projects.length) * Math.PI * 2;
      return {
        id: p.slug,
        project: p,
        x: anchor.x + Math.cos(angle) * 40,
        y: anchor.y + Math.sin(angle) * 40,
      };
    });

    const validRelationships = relationships.filter(
      (r) => simNodes.some((n) => n.id === r.from) && simNodes.some((n) => n.id === r.to)
    );
    const links = validRelationships.map((r) => ({ source: r.from, target: r.to }));

    forceSimulation(simNodes)
      .force("charge", forceManyBody().strength(-320))
      .force(
        "link",
        forceLink(links)
          .id((d) => (d as SimNode).id)
          .distance(120)
          .strength(0.7)
      )
      .force("collide", forceCollide().radius(58))
      .force(
        "x",
        forceX<SimNode>((d) => (CLUSTER_ANCHORS[d.project.category] ?? { x: GRAPH_WIDTH / 2 }).x).strength(0.06)
      )
      .force(
        "y",
        forceY<SimNode>((d) => (CLUSTER_ANCHORS[d.project.category] ?? { y: GRAPH_HEIGHT / 2 }).y).strength(0.06)
      )
      .stop()
      .tick(400);

    const nodes: StarNode[] = simNodes.map((n) => ({ id: n.id, project: n.project, x: n.x, y: n.y }));
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const edges: StarEdge[] = validRelationships.map((r) => ({
      from: byId[r.from],
      to: byId[r.to],
      relationship: r,
    }));

    return { nodes, edges, width: GRAPH_WIDTH, height: GRAPH_HEIGHT };
  }, [projects, relationships]);
}
