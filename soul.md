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

## Icons

Content files are plain data — no JSX, no direct `lucide-react` imports.
Reference icons by string name (`icon: "bot"`) against the registry in
`src/components/icons.ts`. If the icon you want isn't registered yet, add
the import + entry there first.

## Where things render

- `src/app/page.tsx` — top-level layout, category filter, grid of
  `ProjectCard`s, terminal easter egg. Reads from `ALL_PROJECTS`
  (`PERSONAL_PROJECTS` + `WORK_PROJECTS` concatenated).
- `src/components/ProjectCard.tsx` — the grid tile.
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
