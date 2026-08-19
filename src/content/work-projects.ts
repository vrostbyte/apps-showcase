import type { WorkProject } from "./types";

/**
 * Confidential work — internal tools built on the job that can't be named,
 * screenshotted, or linked. Each one gets a Magic: The Gathering card name
 * as a stand-in codename (see soul.md for the convention) and an
 * architecture-diagram walkthrough instead of real screenshots, so a
 * visitor can still "experience" the shape of the system.
 *
 * `Black Lotus` below is a TEMPLATE, not a real project — it shows the
 * schema shape. Replace it with real (genericized) work once the actual
 * problem/stack/outcome facts are supplied; never invent specifics for a
 * real confidential project.
 */
export const WORK_PROJECTS: WorkProject[] = [
  {
    kind: "work",
    slug: "black-lotus",
    codename: "Black Lotus",
    name: "Black Lotus",
    tagline: "TEMPLATE — replace with a real (genericized) internal project",
    role: "Solo build, internal tooling",
    stack: ["Next.js", "Postgres", "LLM API", "Internal auth"],
    category: "work",
    status: "CONFIDENTIAL",
    audience: "Internal team members who need X to happen faster / more reliably",
    problem:
      "TEMPLATE: describe the operational pain point this solved, in the abstract — no company names, no real system names, no real data.",
    description:
      "TEMPLATE: a genericized paragraph describing what the system does end-to-end, written the way you'd describe it out loud to a hiring manager who can't see the code.",
    outcome:
      "TEMPLATE: the measurable or observed impact — time saved, errors reduced, adoption — genericized (e.g. \"cut a multi-step manual process from ~2 hours to under 10 minutes\").",
    highlights: [
      "TEMPLATE: a technical decision worth bragging about",
      "TEMPLATE: a constraint you designed around",
      "TEMPLATE: a piece of the stack that mattered",
    ],
    color: "#71717A",
    icon: "bot",
    infra: "TEMPLATE: genericized infra description (e.g. \"serverless functions + managed Postgres, internal-network only\").",
    diagram: {
      nodes: [
        { id: "user", label: "Internal user", icon: "message-square", x: 8, y: 50 },
        { id: "app", label: "Web app", sublabel: "Next.js", icon: "monitor", x: 32, y: 50 },
        { id: "api", label: "API layer", sublabel: "Server actions", icon: "network", x: 55, y: 25 },
        { id: "llm", label: "LLM", sublabel: "Reasoning + extraction", icon: "bot", x: 78, y: 25 },
        { id: "db", label: "Data store", sublabel: "Postgres", icon: "database", x: 55, y: 75 },
        { id: "auth", label: "Access control", sublabel: "Internal auth", icon: "shield-check", x: 92, y: 60 },
      ],
      edges: [
        { from: "user", to: "app" },
        { from: "app", to: "api" },
        { from: "api", to: "llm", label: "structured request" },
        { from: "api", to: "db", label: "read/write" },
        { from: "app", to: "auth", label: "session check" },
      ],
    },
    demoSteps: [
      {
        kind: "diagram",
        title: "A request comes in",
        caption: "TEMPLATE: an internal user opens the tool and kicks off the workflow this system automates.",
        activeNodeIds: ["user", "app"],
        activeEdgeIndexes: [0],
      },
      {
        kind: "diagram",
        title: "Access is checked",
        caption: "TEMPLATE: every request is scoped to the user's role before anything else runs.",
        activeNodeIds: ["app", "auth"],
        activeEdgeIndexes: [4],
      },
      {
        kind: "diagram",
        title: "The heavy lifting",
        caption: "TEMPLATE: the API layer hands structured context to the model and reads/writes the data store as it works.",
        activeNodeIds: ["api", "llm", "db"],
        activeEdgeIndexes: [2, 3],
      },
      {
        kind: "diagram",
        title: "Outcome",
        caption: "TEMPLATE: the result flows back to the user, replacing what used to be a manual, error-prone step.",
        activeNodeIds: ["llm", "api", "app", "user"],
        activeEdgeIndexes: [0, 1, 2],
      },
    ],
  },
];
