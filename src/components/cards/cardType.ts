import type { Project, ProjectCategory } from "@/content/types";

export type CardType = "Creature" | "Land" | "Enchantment" | "Artifact";

export interface CardTypeMeta {
  type: CardType;
  /** Section heading in the binder. */
  sectionLabel: string;
  /** Display label used in the card's type line, e.g. "Creature — App". */
  categoryLabel: string;
  /** Section display order in the binder. */
  order: number;
}

/**
 * Every project's card type is derived from its existing `category` — never
 * stored. Adding a project to PERSONAL_PROJECTS/WORK_PROJECTS is enough; it
 * gets a card type and a binder section for free. Add a row here (and bump
 * the others' `order` if you want it placed elsewhere) if a 5th category is
 * ever introduced in src/content/types.ts.
 */
const CATEGORY_TO_CARD_TYPE: Record<ProjectCategory, CardTypeMeta> = {
  app: { type: "Creature", sectionLabel: "Creatures", categoryLabel: "App", order: 0 },
  business: { type: "Land", sectionLabel: "Lands", categoryLabel: "Business", order: 1 },
  volunteer: { type: "Enchantment", sectionLabel: "Enchantments", categoryLabel: "Community", order: 2 },
  work: { type: "Artifact", sectionLabel: "Artifacts", categoryLabel: "Confidential", order: 3 },
};

export function getCardType(project: Project): CardTypeMeta {
  return CATEGORY_TO_CARD_TYPE[project.category];
}

export function getCardTypeLine(project: Project): string {
  const meta = getCardType(project);
  return `${meta.type} — ${meta.categoryLabel}`;
}

export const CARD_TYPE_SECTIONS: CardTypeMeta[] = Object.values(CATEGORY_TO_CARD_TYPE).sort(
  (a, b) => a.order - b.order
);

export type CardRarity = "mythic" | "holo" | "uncommon" | "common";

/**
 * Border/rarity treatment, derived from status — not a creative-writing
 * exercise, an honest reflection of the project's real state. Confidential
 * work is "mythic" (rarest, most guarded); a still-working live app is
 * "holo" (the shiniest, since it's the least common state — most personal
 * projects here are archived); archived-with-a-dead-url is "uncommon";
 * never-deployed-at-all is "common".
 */
export function getCardRarity(project: Project): CardRarity {
  if (project.kind === "work") return "mythic";
  if (project.live) return "holo";
  if (project.url) return "uncommon";
  return "common";
}

export const RARITY_BORDER: Record<CardRarity, string> = {
  mythic: "linear-gradient(135deg, #f97316, #1a1a1a 40%, #f97316 70%, #1a1a1a)",
  holo: "linear-gradient(135deg, #fbbf24, #e0e0e0 30%, #fbbf24 60%, #e0e0e0 90%, #fbbf24)",
  uncommon: "linear-gradient(135deg, #9ca3af, #4b5563)",
  common: "#2a2a2a",
};

export const RARITY_LABEL: Record<CardRarity, string> = {
  mythic: "MYTHIC — CONFIDENTIAL",
  holo: "● LIVE",
  uncommon: "○ ARCHIVED",
  common: "○ NEVER DEPLOYED",
};

/** Mana pip count for a project's card, derived from its stack size. */
export function getManaPipCount(project: Project): number {
  return Math.max(3, Math.min(6, project.stack.length));
}
