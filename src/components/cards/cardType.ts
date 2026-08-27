import type { Project } from "@/content/types";
import { CATEGORY_IDENTITY } from "@/content/categories";

/**
 * Every number and color on a trading card is *derived*, never stored —
 * adding a project to PERSONAL_PROJECTS/WORK_PROJECTS is enough to get a
 * fully-populated card. See soul.md for the full purpose table this file
 * implements.
 */

/** Mana pips (top right) — build cost: how much tech went into it. */
export function getBuildCost(project: Project): number {
  return Math.max(3, Math.min(6, project.stack.length));
}

/** Left stat — reach: how many real things the project does. */
export function getReach(project: Project): number {
  return project.highlights.length;
}

/** Right stat — uptime: how alive the project is right now, 1-3. */
export function getUptimeTier(project: Project): 1 | 2 | 3 {
  if (project.kind === "work") return 3; // real internal tooling, in active use
  if (project.live) return 3;
  if (project.url) return 2;
  return 1;
}

export type RarityGem = "mythic" | "rare" | "uncommon" | "common";

/**
 * The small expansion-symbol-style gem in the type line — not the card
 * frame (that's category color, see src/content/categories.ts). Follows
 * the real MTG rarity-color convention: black/silver/gold/orange-red for
 * common/uncommon/rare/mythic.
 */
export function getRarityGem(project: Project): RarityGem {
  if (project.kind === "work") return "mythic";
  if (project.live) return "rare";
  if (project.url) return "uncommon";
  return "common";
}

export const GEM_COLOR: Record<RarityGem, string> = {
  mythic: "#fb923c",
  rare: "#fbbf24",
  uncommon: "#cbd5e1",
  common: "#71717a",
};

export const GEM_LABEL: Record<RarityGem, string> = {
  mythic: "Enterprise",
  rare: "Live",
  uncommon: "Archived",
  common: "Never deployed",
};

/** The card's type-line pill: just the category's short label. */
export function getTypeLabel(project: Project): string {
  return CATEGORY_IDENTITY[project.category].shortLabel;
}
