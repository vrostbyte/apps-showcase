export type RelationshipKind = "pivot" | "rebuild" | "shared-infra";

export interface ProjectRelationship {
  from: string;
  to: string;
  kind: RelationshipKind;
  label?: string;
}

/**
 * Real relationships between projects, driving the constellation's edges.
 * One entry per real connection — not duplicated on each project object, so
 * there's a single source of truth. Slugs must match a project's `slug` in
 * personal-projects.ts or work-projects.ts.
 *
 * kind:
 *  - "pivot"        the project became a different business/idea entirely
 *  - "rebuild"       a ground-up rewrite of the same idea
 *  - "shared-infra"  two live projects run on the same backend/project
 */
export const RELATIONSHIPS: ProjectRelationship[] = [
  {
    from: "lucky-lasso-bingo",
    to: "lucky-lasso",
    kind: "pivot",
    label: "pivoted from bingo/trivia to beverage vending",
  },
  {
    from: "myflagcoach-v2",
    to: "periwinkel",
    kind: "shared-infra",
    label: "same Supabase project (tripatlas schema)",
  },
];
