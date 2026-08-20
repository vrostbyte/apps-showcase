import type { IconName } from "@/components/icons";
import type { ProjectCategory } from "./types";

/**
 * The single source of truth for what each project category *is* — its
 * nav label, its icon, and its color identity. Every place that groups or
 * colors projects by category (the homepage filter bar, the card binder's
 * section dividers, each trading card's frame) reads from here, so there's
 * one definition to update, not three that can drift apart.
 *
 * The four color identities work the way Magic: The Gathering's five colors
 * do — each implies a philosophy, not just a paint job. They're the card
 * *frame*; an individual project's own `color` field stays the accent layer
 * (icon tile, mana pips, ability glyphs) so cards in the same section still
 * read as distinct from each other.
 */
export interface CategoryIdentity {
  label: string;
  /** Short form for a card's type-line pill, e.g. "App". */
  shortLabel: string;
  icon: IconName;
  /** One line, shown under the label on a binder section divider. */
  description: string;
  /** 3-stop card-frame gradient, brightest to darkest. */
  frame: [string, string, string];
  /** Single accent hex — ambient glow, filter-pill dot, section rule tint. */
  glow: string;
}

export const CATEGORY_IDENTITY: Record<ProjectCategory, CategoryIdentity> = {
  app: {
    label: "Apps",
    shortLabel: "App",
    icon: "monitor",
    description: "Products I designed, built, and shipped end to end.",
    frame: ["#fb923c", "#7c2d12", "#1c1917"],
    glow: "#f97316",
  },
  business: {
    label: "My Business",
    shortLabel: "Business",
    icon: "wrench",
    description: "Lucky Lasso LLC and Retrofit Creations — real commerce, real customers.",
    frame: ["#4ade80", "#14532d", "#0f1f14"],
    glow: "#22c55e",
  },
  volunteer: {
    label: "Community Builds",
    shortLabel: "Community",
    icon: "heart",
    description: "Pro-bono work for people and causes I care about.",
    frame: ["#f9a8c9", "#9d174d", "#1c1017"],
    glow: "#f472b6",
  },
  work: {
    label: "Work (Confidential)",
    shortLabel: "Confidential",
    icon: "shield-check",
    description: "Real internal tools, described in the abstract and codenamed.",
    frame: ["#c4b5fd", "#312e81", "#0c0a1a"],
    glow: "#a78bfa",
  },
};

export const CATEGORY_ORDER: ProjectCategory[] = ["app", "business", "volunteer", "work"];
