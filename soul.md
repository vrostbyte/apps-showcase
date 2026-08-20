# soul.md — how this portfolio thinks about itself

This file is written for an AI coding agent (Claude Code, Antigravity, or
similar) that's about to add or edit a project on this site. Read this
before touching `src/content/`. If you're a human: same advice applies.

## What this site is

`joshjgriffith.dev`'s apps showcase. It is **not** a live-demo hub — most of
the personal apps here depended on Supabase projects that have since been
retired, and the work projects are confidential and were never public in
the first place. Every project on this site is communicated through a
**click-through walkthrough** instead of a working login or a real link.
Nothing here should ever require a live backend to be legible to a visitor.

Tone: direct, a little dry, no marketing fluff. Josh built these himself
("vibe-coded," self-taught) and the copy should read that way — specific
about what was hard or interesting, not generic feature-speak.

## The two kinds of project

Every project is one of two `kind`s, defined in `src/content/types.ts`:

### 1. `PersonalProject` — `src/content/personal-projects.ts`

Real apps Josh built and owns (his business, his side projects, pro-bono
community work). `url` (live site) and `repoUrl` (GitHub source) are both
**optional** — not every project got a public deploy, and not every repo is
public — but include whichever actually exist. `live` is a boolean:

- `live: true` — the app still fully works (no Supabase dependency, or a
  static site). Link to it normally, `demoSteps` are a nice-to-have.
- `live: false` with a `url` set — the backend is retired. The site may
  still be up but will error on any data call.
- `live: false` with no `url` — the project was never publicly deployed at
  all (a CLI tool, a bot, a local-only tool, or a build that never shipped).
  Set `repoUrl` if the source is public so there's still something to link.

Whenever `live` is `false`, `demoSteps` become the primary way a visitor
experiences the project — a `ScreenshotStep[]` walkthrough built from
**real** captured screenshots in `public/screenshots/`. A missing
screenshot file degrades gracefully to a "screenshot coming soon"
placeholder (`ImageFrame` component handles this) — it's fine to reference
a screenshot you haven't captured yet, but capture it when you can.

To add one: append an object to `PERSONAL_PROJECTS` following the existing
shape. Write 3-5 `demoSteps` that narrate an actual user flow through the
app (not just "here's a screen") — each step's `caption` should explain
*why* that screen exists, the way you'd narrate it live to someone.

### 2. `WorkProject` — `src/content/work-projects.ts`

Confidential internal tools built on the job. These are **never** given a
real name, a real screenshot, a real company/system name, or a real link.
Instead:

- **Codename**: give it a Magic: The Gathering card name (`codename` field,
  also used as `name`). Pick one that loosely fits the project's vibe if you
  can (a fraud-detection tool might be `Counterspell`; an automation tool
  might be `Time Warp`) — it doesn't need to be clever, just a real MTG
  card name so it reads as an intentional convention, not a placeholder.
- **Content**: `problem`, `description`, and `outcome` are all genericized —
  describe the shape of the problem and solution, not identifying details.
  No client names, no internal tool names, no real numbers that could
  identify the org. Rough/rounded impact ("cut a process from hours to
  minutes") is fine; exact metrics from a real system are not.
- **Demo**: instead of screenshots, work projects get an architecture
  diagram (`diagram.nodes` / `diagram.edges`) and a `DiagramStep[]`
  walkthrough that lights up different nodes/edges at each step
  (`ArchitectureDiagram` + `ClickThroughDemo` components handle rendering).
  Keep it to 4-8 nodes laid out left-to-right by data flow, and 3-5 steps
  that walk through the request lifecycle.

**`black-lotus` in `work-projects.ts` is a template, not a real project.**
It exists to show the schema shape. When adding a real work project, base
the structure on it but replace every `TEMPLATE:` field with real
(genericized) content — and if you don't have the real facts (what problem
it solved, what stack, what outcome), **ask, don't invent them**. A
plausible-sounding fabrication about someone's real professional work is
worse than an honest placeholder.

## The constellation (map view)

The homepage's default view is a star map (`src/components/constellation/`),
not a grid — every project is a node, positioned automatically by a force
simulation (`useForceLayout.ts`) clustered loosely by `category`. **You never
place a node's (x, y) by hand.** Adding a project to `PERSONAL_PROJECTS` or
`WORK_PROJECTS` is enough; it appears on the map on its own.

If the new project has a real relationship to an existing one — it's a
rewrite of it, a pivot away from it, or it shares live infrastructure with
it — add one entry to `src/content/relationships.ts` (`{ from, to, kind,
label? }`, `kind` one of `"pivot" | "rebuild" | "shared-infra"`). That's the
only place relationships live; don't duplicate them on the project objects
themselves. Skip it if there's no real connection — most projects have none,
and that's fine.

The card grid still exists as the "list" view (a toggle next to the category
filter) — unchanged, still driven by the same `ALL_PROJECTS`. Both views open
the same `ProjectModal`.

A project can also carry a `diagram`-based walkthrough (not just work
projects) — see the `BaseProject.diagram` / `demoSteps: DemoStep[]` shape in
`src/content/types.ts`. Use it for a personal project with no real UI to
screenshot (a bot, a CLI, anything that never got a public deploy and has
nothing visual to capture) — same `ArchitectureDiagram` component the
confidential work projects use, same convention: 4-8 nodes, 3-5 steps.

**Never point an automated screenshot/browser capture at a project's real
backend** if you don't know its data-exposure posture (open Firestore/DB
rules, real user data, etc.) — diagram it instead. DiaperShare in
`personal-projects.ts` is the example: it's got a real, live Firebase
project committed to its repo with wide-open rules, so it's diagrammed on
purpose, not screenshotted.

## Icons

Content files are plain data — no JSX, no direct `lucide-react` imports.
Reference icons by string name (`icon: "bot"`) against the registry in
`src/components/icons.ts`. If the icon you want isn't registered yet, add
the import + entry there first.

## Where things render

- `src/app/page.tsx` — top-level layout, category filter, map/list toggle,
  terminal easter egg. Reads from `ALL_PROJECTS` (`PERSONAL_PROJECTS` +
  `WORK_PROJECTS` concatenated).
- `src/components/constellation/` — the map view: `ConstellationGraph`
  (pan/zoom + rendering), `useForceLayout` (layout, pure/deterministic —
  no `Math.random`), `ProjectStar`, `ConstellationEdge`, `StarField`
  (decorative background only).
- `src/components/ProjectCard.tsx` — the list-view tile.
- `src/components/ProjectModal.tsx` — the detail view; branches on
  `project.kind` for a few sections (work projects show Problem/Outcome,
  personal projects show a live/archived link).
- `src/components/ClickThroughDemo.tsx` — the shared stepper; renders
  `ImageFrame` for screenshot steps or `ArchitectureDiagram` for diagram
  steps.
- `src/components/Terminal.tsx` — the `ls` / `cat` / `open` / `whoami`
  easter egg, driven by the same `ALL_PROJECTS` list.

## Adding a category

Categories live in `ProjectCategory` (`src/content/types.ts`) and
`CATEGORY_META` (`src/app/page.tsx`). Add to both if a project doesn't fit
`app` / `business` / `volunteer` / `work`.

## Before you commit

Run `npm run lint` and `npm run build`. There is no test suite yet — visual
correctness (does the walkthrough narrate something true and coherent)
matters more than type-checking alone.
