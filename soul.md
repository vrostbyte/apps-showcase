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

## The card binder (default view)

The homepage's default view is a trading-card binder (`src/components/cards/`),
not a grid or a graph — every project renders as its own card (name, mana
pips, art box, type line, rules text, flavor text, a Reach/Uptime stat
plate), grouped into sections by the site's own **categories** — never by
literal Magic: The Gathering type words like "Creature" or "Artifact". The
MTG *system* (color-identity frames, mana pips, a rarity gem, stat boxes)
is the inspiration; the section labels and card copy are always this site's
own language.

**Category identity is the single source of truth**, in
`src/content/categories.ts` (`CATEGORY_IDENTITY`). It replaces the old
per-file `CATEGORY_META` — the homepage filter bar, the binder's section
dividers, and every card's frame color all read from this one place, so
there's nothing to keep in sync by hand:

| `category`  | Label | Card frame | Section role |
|---|---|---|---|
| `app`       | Apps | ember (orange → near-black) | shipped, live, aggressive |
| `business`  | My Business | verdant (green → near-black) | commerce, growth |
| `volunteer` | Community Builds | rose (pink → near-black) | care, support |
| `work`      | Work (Confidential) | violet (violet → near-black) | guarded, redacted |

Adding a project to `PERSONAL_PROJECTS` or `WORK_PROJECTS` is enough — it
gets a binder section, a card frame, and every stat below for free. **You
never pick a color or hand-place a card.** If a 5th category is ever added
to `ProjectCategory`, add one entry to `CATEGORY_IDENTITY` — that's the only
place this mapping lives now (page.tsx's filter bar imports it directly).

Individual `project.color` is a second, separate layer — it's the *accent*
(icon tile tint, mana-pip fill, ability-bullet glyph) that keeps cards
inside the same section visually distinct from each other. Don't conflate
the two: category governs the frame, `color` governs the accent.

**Every number on a card is derived, and each one has one specific,
intentional meaning** — see `src/components/cards/cardType.ts`:

| Card element | Meaning | Derivation |
|---|---|---|
| Mana pips (top right) | **Build cost** — how much tech went into it | `stack.length`, clamped 3-6 |
| Left stat | **Reach** — how many real things it does | `highlights.length` |
| Right stat | **Uptime** — how alive it is right now | 3 = live (or a confidential tool, presumed in active use) / 2 = archived-with-a-url / 1 = never deployed |
| Rarity gem (in the type line) | How rare this state is on the site | work → mythic, live → rare, archived-url → uncommon, never-deployed → common — real MTG rarity-color convention: orange-red/gold/silver/black |
| Rules text | The actual feature description | `description` |
| Ability bullets | Real capabilities | `highlights` |
| Flavor text (italic) | The one-line pitch | `tagline` |

Don't invent a new number for a card without giving it the same treatment:
one real, derived meaning, documented here, never a decorative stat.

**Art box falls back to icon-on-color automatically.** If
`screenshots[0].src` exists (a `PersonalProject` with real captured
screenshots), that's the card art. If not — a diagram-only project (work
projects, Inkbound) or a project with no screenshots yet — the
art box renders the project's `icon` on a tinted `color` background instead,
the same fallback treatment `ProjectCard` already uses. **Never fabricate
card art** (no placeholder/stock images) to fill an empty art box; the icon
fallback is the intended look, not a stopgap.

The card grid still exists as the "list" view (a toggle next to the category
filter) — unchanged, still driven by the same `ALL_PROJECTS`. Both views open
the same `ProjectModal`, whose header is restyled to read as an oversized
version of the clicked card (category frame, mana pips, type line, rarity
gem, stat plate) — the body sections below it are unaffected by any of this.

### The constellation (retired, code kept)

An earlier star-map view (`src/components/constellation/`, driven by
`src/content/relationships.ts`) shipped before the card binder replaced it as
the default. The components and relationship data are still in the repo —
nothing was deleted — but nothing in `page.tsx` renders them anymore.
Don't add new relationships or extend those components for the current
site; if the map view is ever revived, treat that as its own decision, not
something a new project needs to feed.

A project can also carry a `diagram`-based walkthrough (not just work
projects) — see the `BaseProject.diagram` / `demoSteps: DemoStep[]` shape in
`src/content/types.ts`. Use it for a personal project with no real UI to
screenshot (a bot, a CLI, anything that never got a public deploy and has
nothing visual to capture) — same `ArchitectureDiagram` component the
confidential work projects use, same convention: 4-8 nodes, 3-5 steps.

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

## Where things render

- `src/app/page.tsx` — top-level layout, category filter, cards/list toggle,
  terminal easter egg. Reads from `ALL_PROJECTS` (`PERSONAL_PROJECTS` +
  `WORK_PROJECTS` concatenated).
- `src/content/categories.ts` — `CATEGORY_IDENTITY`, the single source of
  truth for each category's label, icon, description, frame gradient, and
  glow color. Read by `page.tsx` (filter bar) and `src/components/cards/`
  (section dividers, card frames) — never duplicate this elsewhere.
- `src/components/cards/` — the default cards view: `CardBinder` (groups
  `ALL_PROJECTS` by `project.category`, renders binder-tab sections from
  `categories.ts`), `TradingCard` (one card face), `cardType.ts` (the
  build-cost/reach/uptime/rarity-gem derivation functions, pure), `useTiltEffect`
  (cursor tilt + holo shine hook, no new deps — CSS custom properties written
  via a ref, not React state).
- `src/components/constellation/` — retired map view, still in the repo but
  unused in `page.tsx` (see "The constellation (retired, code kept)" above).
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
`CATEGORY_IDENTITY` (`src/content/categories.ts`). Add to both if a project
doesn't fit `app` / `business` / `volunteer` / `work` — give the new entry
its own frame gradient and glow color, distinct from the existing four.

## Before you commit

Run `npm run lint` and `npm run build`. There is no test suite yet — visual
correctness (does the walkthrough narrate something true and coherent)
matters more than type-checking alone.
