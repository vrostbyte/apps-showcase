import type { IconName } from "@/components/icons";

/* ════════════════════════════════════════════════
   SHARED
   ════════════════════════════════════════════════ */

export interface Screenshot {
  src: string;
  caption: string;
}

/** One frame of a scripted click-through walkthrough built from real screenshots. */
export interface ScreenshotStep {
  kind: "screenshot";
  image: string;
  title: string;
  caption: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: IconName;
  /** Percent position within the diagram canvas (0-100). */
  x: number;
  y: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

/** One frame of an architecture walkthrough — lights up part of a system diagram. */
export interface DiagramStep {
  kind: "diagram";
  title: string;
  caption: string;
  activeNodeIds: string[];
  activeEdgeIndexes?: number[];
}

export type DemoStep = ScreenshotStep | DiagramStep;

export type ProjectCategory = "app" | "business" | "volunteer" | "work";
export type ProjectStatus = "LIVE" | "ARCHIVED" | "CONFIDENTIAL";

interface BaseProject {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  audience: string;
  description: string;
  highlights: string[];
  color: string;
  icon: IconName;
  infra: string;
  demoSteps: DemoStep[];
}

/* ════════════════════════════════════════════════
   PERSONAL / BUSINESS / VOLUNTEER PROJECTS
   ════════════════════════════════════════════════ */

export interface PersonalProject extends BaseProject {
  kind: "personal";
  /** Live site URL, if one currently exists (some projects never got a public deploy). */
  url?: string;
  /** GitHub source, if publicly linkable. */
  repoUrl?: string;
  /** Whether `url` currently resolves to a live, working app. Always false when `url` is unset. */
  live: boolean;
  screenshots: Screenshot[];
  demoSteps: ScreenshotStep[];
}

/* ════════════════════════════════════════════════
   CONFIDENTIAL WORK PROJECTS
   ════════════════════════════════════════════════ */

export interface WorkProject extends BaseProject {
  kind: "work";
  category: "work";
  status: "CONFIDENTIAL";
  /** Redacted stand-in name — see soul.md for the Magic: The Gathering naming convention. */
  codename: string;
  role: string;
  problem: string;
  outcome: string;
  diagram: {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
  };
  demoSteps: DiagramStep[];
}

export type Project = PersonalProject | WorkProject;

export interface CategoryMeta {
  label: string;
  icon: IconName;
}
