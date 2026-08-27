# soul.md — how this portfolio thinks about itself

This file is written for an AI coding agent (Claude Code, Antigravity, or
similar) that's about to add or edit a project on this site. Read this
before touching `src/content/`. If you're a human: same advice applies.

## What this site is

`joshjgriffith.dev`'s apps showcase — the "Builder" half of a deliberate
duality with `joshjgriffith.com` (Josh's enterprise Change Strategist &
AI Enablement Lead portfolio, a separate repo/site: `vrostbyte/myportfolio`). This site
is **not** a live-demo hub — most of the personal apps here depended on
Supabase projects that have since been retired, and the work projects are
genericized internal tools that were never public in the first place. Every project on
this site is communicated through a **click-through walkthrough** instead
of a working login or a real link. Nothing here should ever require a live
backend to be legible to a visitor.

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

Real internal tools built on the job, rendered on the site as "Enterprise
Projects." These are **never** given a real company/system name, a real
screenshot, or a real link — they're described in the abstract. This
genericization rule is an internal convention for whoever (human or agent)
adds the next entry here; it is never rendered on the page itself, and the
word "confidential" doesn't appear anywhere in the UI. Instead:

- **Codename**: if the real project already has a codename people actually
  use (e.g. `Project Rhytic Study` in `work-projects.ts` — not an MTG name,
  and that's fine, it's a real pre-existing name, not one that needed
  inventing), use that as-is for both `codename` and `name`. Only invent a
  stand-in name if you have to: in that case, use a real Magic: The Gathering
  card name (pick one that loosely fits the project's vibe if you can — a
  fraud-detection tool might be `Counterspell`, an automation tool might be
  `Time Warp`) so it reads as an intentional convention, not a placeholder.
- **Content**: `problem`, `description`, and `outcome` are all genericized —
  describe the shape of the problem and solution, not identifying details.
  No employer name, no internal team/system names, no real numbers that
  could identify the org or a specific client. Rough/rounded impact ("cut a
  process from hours to minutes") is fine; exact metrics from a real system
  are not.
- **Demo**: instead of screenshots, work projects get an architecture
  diagram (`diagram.nodes` / `diagram.edges`) and a `DiagramStep[]`
  walkthrough that lights up different nodes/edges at each step
  (`ArchitectureDiagram` + `ClickThroughDemo` components handle rendering).
  Keep it to 4-8 nodes laid out left-to-right by data flow, and 3-5 steps
  that walk through the request lifecycle.

When adding a real entry: base the structure on one of the existing entries
in `work-projects.ts`, and if you don't have the real facts (what problem it
solved, what stack, what outcome), **ask, don't invent them**. A
plausible-sounding fabrication about someone's real professional work is
worse than asking.

## The visual system: a blueprint, not a game

The homepage is built around one idea: Josh's day job *is* diagramming
(process maps, Figma flows, RACI charts) and his hobby — this site — is
also inherently diagrammable (architecture, data flow, UI). A technical
blueprint/schematic system is the visual language native to both halves of
that person, which is why it replaced an earlier Magic: The Gathering
trading-card system (`src/components/cards/`, kept in the repo, unwired —
see below). Six tokens, defined once in `src/app/globals.css`, are the
whole palette:

| Token | Hex | Role |
|---|---|---|
| `--builder-ground` | `#0e141b` | Base dark ground — the site's home color |
| `--builder-line` | `#6fe0f0` | Cyan drafting-line accent, live/status glow |
| `--enterprise-ground` | `#f2ede3` | Enterprise-mode vellum (hero only) |
| `--enterprise-ink` | `#262220` | Enterprise-mode text (hero only) |
| `--signal` | `#c97a3d` | Shared amber accent — the one color both modes use |
| `--structure` | `#8a97a6` | Hairlines, dimension-line accents, corner brackets |

Type is IBM Plex throughout: `--font-display` (IBM Plex Sans Condensed) for
names, headings, and section labels; `--font-body` (IBM Plex Sans) for
prose; `--font-mono` (IBM Plex Mono) for tags, stats, and anything genuinely
code-like (stack names, URLs). Registration-mark corner brackets
(`src/components/Bracket.tsx`) stand in for rounded corners/drop shadows
everywhere — the binder's old rounded-card look is gone.

### The index (default view)

`src/components/index/ProjectIndex.tsx` replaced the card binder *and* the
old list view — there's one browsing view now, not a toggle. Every project
renders as one dense row (name, category tag, stack chips, tagline, build
size, Reach, and a status bar-meter), grouped into sections by
`src/content/categories.ts` (`CATEGORY_IDENTITY` — unchanged from the card
era: still the single source of truth for each category's label, icon,
description, and `glow` accent color; its `frame` gradient, built for card
borders, is unused now but left in place rather than deleted).

**Every number is still derived, never stored** — `src/components/cards/
cardType.ts`'s functions survive the card system's retirement because the
*meaning* they encode is still correct, just rendered as a row instead of a
card face:

| Element | Meaning | Derivation |
|---|---|---|
| Build size (small dots) | How much tech went into it | `stack.length`, clamped 3-6 |
| Reach (⚡ + number) | How many real things it does | `highlights.length` |
| Status (bar meter) | How alive it is right now | 3 = live (or enterprise work, presumed active) / 2 = archived-with-a-url / 1 = never deployed |

Adding a project to `PERSONAL_PROJECTS` or `WORK_PROJECTS` is enough — it
gets an index row and every stat above for free. Don't invent a new number
without giving it the same treatment: one real, derived meaning, documented
here.

`src/components/ProjectModal.tsx` is still the detail view opened from a
row — restyled to the blueprint system (registration marks, `--structure`
accents, the same stat readout) but structurally unchanged.

### Retired, code kept (not deleted)

Two earlier browsing experiments are still in the repo but unwired from
`page.tsx` — nothing was deleted, and neither should be extended for the
current site:
- `src/components/cards/` (`CardBinder`, `TradingCard`, `useTiltEffect`) —
  the MTG trading-card system. Its derivation functions in `cardType.ts`
  are the one exception: still actively used by `ProjectIndex`.
- `src/components/constellation/` (driven by `src/content/relationships.ts`)
  — the star-map view that preceded the card binder.

If either is ever revived, treat that as its own decision, not something a
new project needs to feed.

A project can also carry a `diagram`-based walkthrough (not just work
projects) — see the `BaseProject.diagram` / `demoSteps: DemoStep[]` shape in
`src/content/types.ts`. Use it for a personal project with no real UI to
screenshot (a bot, a CLI, anything that never got a public deploy and has
nothing visual to capture) — same `ArchitectureDiagram` component the
work projects use, same convention: 4-8 nodes, 3-5 steps.

**Never point an automated screenshot/browser capture at a project's real
backend** if you don't know its data-exposure posture (open Firestore/DB
rules, real user data, etc.) — diagram it instead, or ask the project owner
to supply real screenshots by hand. This is a rule about *automated* capture,
not about screenshots in general — a screenshot the owner captured and
handed over themselves (knowing exactly what's on screen and whether it's
safe to publish) is fine to use directly. DiaperShare in
`personal-projects.ts` is the example of both halves of this rule: it has a
real, live Firebase project with wide-open rules, so no automated tooling in
this repo has ever been pointed at it — but it does have real screenshots,
supplied directly by the owner, confirmed to be their own seed/demo data
rather than a real user's.

## Icons

Content files are plain data — no JSX, no direct `lucide-react` imports.
Reference icons by string name (`icon: "bot"`) against the registry in
`src/components/icons.ts`. If the icon you want isn't registered yet, add
the import + entry there first.

## The duality hero

`src/components/duality/DualityHero.tsx` is the homepage's signature
element: a draggable calibration rule that wipes between this "Builder"
site and Josh's enterprise Change Strategist / AI Enablement Lead profile at
joshjgriffith.com (`vrostbyte/myportfolio` — a separate repo; this one
never writes to it, only links out). Builder is a full-size base layer;
Enterprise sits on top of it, clipped via `clip-path` to only the region
right of the rule (`src/components/duality/useCalibration.ts` owns the
drag/keyboard/click-to-jump state, `t` from 0 = full Enterprise to 1 = full
Builder). A `role="slider"` handle plus two "Builder"/"Enterprise" buttons
give it a full keyboard and no-drag fallback; `prefers-reduced-motion` gets
an instant snap instead of an eased transition.

The Enterprise side is a **fixed, condensed teaser** — 2-3 real stats and
one line, sourced once from `myportfolio/data/content.js`, not fetched live
— pointing to joshjgriffith.com for the rest. Don't expand it into a second
full theme for the whole page; the crossfade is deliberately scoped to the
hero.

Each side's text opacity is driven by its own *visible* pixel width
(`FADE_OUT_PX`/`FADE_IN_PX` in `DualityHero.tsx`), not just the drag
percentage — on a narrow viewport a fixed percentage can leave a panel too
narrow to read but not narrow enough to hide, which clips text mid-word.
Fading it out past a pixel threshold instead reads as an intentional limit.
If you touch this component, re-check narrow viewports specifically; it's
the one part of this system that has to reason about real pixel widths.

## Where things render

- `src/app/page.tsx` — top-level layout: nav, `DualityHero`, category
  filter, `ProjectIndex`, footer, terminal easter egg. Reads from
  `ALL_PROJECTS` (`PERSONAL_PROJECTS` + `WORK_PROJECTS` concatenated).
- `src/content/categories.ts` — `CATEGORY_IDENTITY`, the single source of
  truth for each category's label, icon, description, and glow color. Read
  by `page.tsx` (filter bar) and `ProjectIndex` (section dividers) — never
  duplicate this elsewhere.
- `src/components/index/ProjectIndex.tsx` — the default (only) browsing
  view. Groups `ALL_PROJECTS` by category, renders one row per project.
- `src/components/duality/` — the hero (see above).
- `src/components/Bracket.tsx` — the shared registration-mark corner
  component used by `ProjectIndex` section headers and `ProjectModal`.
- `src/components/cards/` and `src/components/constellation/` — retired,
  code kept (see "Retired, code kept" above).
- `src/components/ProjectModal.tsx` — the detail view; branches on
  `project.kind` for a few sections (work projects show Problem/Outcome,
  personal projects show a live/archived link).
- `src/components/ClickThroughDemo.tsx` — the shared stepper; renders
  `ImageFrame` for screenshot steps or `ArchitectureDiagram` for diagram
  steps.
- `src/components/Terminal.tsx` — the `ls` / `cat` / `open` / `whoami`
  easter egg, driven by the same `ALL_PROJECTS` list. Intentionally still
  terminal-styled — it's an opt-in easter egg, not the site's default voice.

## Adding a category

Categories live in `ProjectCategory` (`src/content/types.ts`) and
`CATEGORY_IDENTITY` (`src/content/categories.ts`). Add to both if a project
doesn't fit `app` / `business` / `volunteer` / `work` — give the new entry
its own `glow` color, distinct from the existing four (`frame` is a leftover
from the retired card system and doesn't need a new value).

## Before you commit

Run `npm run lint` and `npm run build`. There is no test suite yet — visual
correctness (does the walkthrough narrate something true and coherent)
matters more than type-checking alone.
