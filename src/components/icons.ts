import {
  Beer, Flag, Compass, MapPin, Brain, Layers, Monitor, Wrench, Heart,
  Bot, Cpu, Database, Network, ShieldCheck, Workflow, MessageSquare,
} from "lucide-react";

/**
 * Every icon a project or category can reference, keyed by name so content
 * files stay plain data (no JSX). Add an import + entry here before using a
 * new icon name in src/content/*.ts.
 */
export const ICONS = {
  beer: Beer,
  flag: Flag,
  compass: Compass,
  "map-pin": MapPin,
  brain: Brain,
  layers: Layers,
  monitor: Monitor,
  wrench: Wrench,
  heart: Heart,
  bot: Bot,
  cpu: Cpu,
  database: Database,
  network: Network,
  "shield-check": ShieldCheck,
  workflow: Workflow,
  "message-square": MessageSquare,
} as const;

export type IconName = keyof typeof ICONS;
