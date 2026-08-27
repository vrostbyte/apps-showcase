import type { WorkProject } from "./types";

/**
 * Enterprise work — internal tools built on the job. These are described in
 * the abstract for anyone visiting this site: no employer name, no real
 * system/team names, no real numbers that could identify the org or a
 * specific client. This genericization rule is an internal convention for
 * whoever (human or agent) adds the next one here — it is never rendered on
 * the page itself; the UI just calls this category "Enterprise Projects."
 *
 * Naming: if the real project already has a codename people actually use
 * (like `project-rhytic-study` below), use that as-is — it's already safe,
 * there's no reason to invent something else. If you have to invent a
 * stand-in name yourself, use a real Magic: The Gathering card name (see
 * soul.md) so it reads as an intentional convention, not a placeholder.
 *
 * When adding a real entry: base the structure on one of the two below, and
 * if you don't have the real facts (problem/stack/outcome), ask, don't
 * invent them. A plausible-sounding fabrication about someone's real
 * professional work is worse than asking.
 */
export const WORK_PROJECTS: WorkProject[] = [
  {
    kind: "work",
    slug: "jira-notifications-hub",
    codename: "Jira Notifications Hub",
    name: "Jira Notifications Hub",
    tagline: "A tiered risk-scoring layer over Jira epics with AI-generated leadership digests",
    role: "Solo build, internal tooling",
    stack: ["Power Automate", "Copilot Studio", "Jira", "AI Agents"],
    category: "work",
    status: "CONFIDENTIAL",
    audience: "Delivery managers and leadership who need epic-level risk visibility without manually checking status",
    problem:
      "Epics can sit in progress indefinitely with no system-level signal that they're becoming a risk — status only surfaces when someone manually checks, or once it's already a problem.",
    description:
      "A tiered risk-scoring layer over Jira epics, with an AI agent generating audience-specific weekly digests for different leadership levels.",
    outcome:
      "Turns epic risk from something someone has to remember to check into a standing, audience-aware signal delivered automatically every week.",
    highlights: [
      "Percentile-based risk tiers (P70/P80/P90), not a flat day threshold — tiers reflect the real distribution of how long epics take, not an arbitrary cutoff",
      "Weekly digests are framed differently per audience — several delivery-management levels plus a separate leadership digest",
      "An AI agent, tuned to a specific coaching methodology, judges why an epic is stuck rather than producing a generic summary",
      "Built solo end-to-end: data pipeline, risk model, agent design and prompting, and delivery",
    ],
    color: "#8B7CF6",
    icon: "workflow",
    infra: "Workflow automation platform pulling from a project-tracking tool, with an AI agent generating the leadership-facing insight — internal only.",
    diagram: {
      nodes: [
        { id: "source", label: "Project tracker", sublabel: "Epics", icon: "database", x: 8, y: 50 },
        { id: "evaluator", label: "Aging evaluator", sublabel: "P70 / P80 / P90", icon: "workflow", x: 32, y: 50 },
        { id: "agent", label: "AI agent", sublabel: "Coaching methodology", icon: "bot", x: 56, y: 25 },
        { id: "digest", label: "Digest builder", sublabel: "Automation flow", icon: "network", x: 56, y: 75 },
        { id: "leads", label: "PM / Sr PM / Lead digests", icon: "message-square", x: 82, y: 60 },
        { id: "exec", label: "Executive digest", sublabel: "Leadership", icon: "shield-check", x: 94, y: 30 },
      ],
      edges: [
        { from: "source", to: "evaluator" },
        { from: "evaluator", to: "agent", label: "aging epics" },
        { from: "evaluator", to: "digest" },
        { from: "agent", to: "digest", label: "insight" },
        { from: "digest", to: "leads" },
        { from: "digest", to: "exec" },
      ],
    },
    demoSteps: [
      {
        kind: "diagram",
        title: "Epics get evaluated",
        caption: "Every epic is pulled from the tracker and checked against how long it's been sitting in its current status.",
        activeNodeIds: ["source", "evaluator"],
        activeEdgeIndexes: [0],
      },
      {
        kind: "diagram",
        title: "A risk tier, not a guess",
        caption: "Aging time gets bucketed into a P70/P80/P90 risk tier — a percentile model, not a flat day-count threshold.",
        activeNodeIds: ["evaluator", "digest"],
        activeEdgeIndexes: [2],
      },
      {
        kind: "diagram",
        title: "The agent judges why",
        caption: "An AI agent loaded with a specific coaching methodology assesses each aging epic and writes the insight that goes in the digest — not a generic summary.",
        activeNodeIds: ["evaluator", "agent", "digest"],
        activeEdgeIndexes: [1, 3],
      },
      {
        kind: "diagram",
        title: "Four audiences, one signal",
        caption: "The same pipeline fans out to differently-framed digests: several PM-level audiences, plus a separate executive digest for leadership.",
        activeNodeIds: ["digest", "leads", "exec"],
        activeEdgeIndexes: [4, 5],
      },
    ],
  },
  {
    kind: "work",
    slug: "project-rhytic-study",
    codename: "Project Rhytic Study",
    name: "Project Rhytic Study",
    tagline: "A monitoring layer that catches scheduling capacity breaches an enterprise booking system can't see on its own",
    role: "Solo build, internal tooling",
    stack: ["Power Automate", "Copilot Studio", "Claude Sonnet 5", "Power Apps"],
    category: "work",
    status: "CONFIDENTIAL",
    audience: "Leadership and specialists who need real-time visibility into scheduling capacity",
    problem:
      "An internal booking system accepts and schedules specialist appointments without checking real capacity — the only signal a specialist gets is the event landing on their calendar.",
    description:
      "A real-time monitoring layer over an enterprise scheduling system that blindly overbooks without capacity checks — polls on a fixed interval, flags capacity breaches, and uses an AI agent to propose resolutions to leadership.",
    outcome:
      "Capacity breaches get caught and routed to leadership with a proposed fix, instead of only surfacing after a specialist notices an overbooked calendar.",
    highlights: [
      "Runs as a monitoring layer on top of the existing booking system rather than replacing it",
      "Polls on a fixed 30-minute interval during active scheduling hours, comparing bookings against real staffing availability",
      "Flags real capacity breaches only, not near-misses, so the signal stays worth acting on",
      "An AI agent turns each breach into a concrete scheduling proposal for leadership, not just an alert",
    ],
    color: "#F0A868",
    icon: "network",
    infra: "Polling automation against a scheduling system and calendar data, an AI agent for breach resolution, and a live dashboard — internal only.",
    diagram: {
      nodes: [
        { id: "booking", label: "Booking system", sublabel: "Blind to capacity", icon: "database", x: 8, y: 30 },
        { id: "poller", label: "30-min poller", sublabel: "Active hours only", icon: "workflow", x: 30, y: 55 },
        { id: "compare", label: "Availability check", sublabel: "vs. staffing", icon: "network", x: 52, y: 55 },
        { id: "agent", label: "AI agent", sublabel: "Claude Sonnet 5", icon: "bot", x: 74, y: 30 },
        { id: "notify", label: "Specialist alert", icon: "message-square", x: 74, y: 78 },
        { id: "dashboard", label: "Leadership dashboard", sublabel: "Model-driven app", icon: "monitor", x: 94, y: 50 },
      ],
      edges: [
        { from: "booking", to: "poller" },
        { from: "poller", to: "compare" },
        { from: "compare", to: "agent", label: "breach detected" },
        { from: "booking", to: "notify", label: "new booking" },
        { from: "agent", to: "dashboard", label: "proposal" },
        { from: "notify", to: "dashboard" },
      ],
    },
    demoSteps: [
      {
        kind: "diagram",
        title: "A booking lands, blind",
        caption: "The booking system accepts and schedules a specialist call without checking real capacity — the specialist just sees it appear on their calendar.",
        activeNodeIds: ["booking", "notify"],
        activeEdgeIndexes: [3],
      },
      {
        kind: "diagram",
        title: "Watching, every 30 minutes",
        caption: "A monitoring layer polls every specialist's calendar on a fixed interval during active scheduling hours and compares it against real staffing availability.",
        activeNodeIds: ["booking", "poller", "compare"],
        activeEdgeIndexes: [0, 1],
      },
      {
        kind: "diagram",
        title: "A real breach, not a near-miss",
        caption: "When a genuine capacity breach shows up — not just a tight schedule — an AI agent running on Claude Sonnet 5 turns it into a concrete resolution proposal.",
        activeNodeIds: ["compare", "agent"],
        activeEdgeIndexes: [2],
      },
      {
        kind: "diagram",
        title: "One live view for everyone",
        caption: "Proposals and alerts both feed a model-driven dashboard, giving leadership and specialists the same live read on department-wide scheduling health.",
        activeNodeIds: ["agent", "notify", "dashboard"],
        activeEdgeIndexes: [4, 5],
      },
    ],
  },
];
