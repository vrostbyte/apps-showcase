import type { PersonalProject } from "./types";

/**
 * My own apps, my business site, and community builds.
 *
 * `live: false` means the app depends on a Supabase project that's no longer
 * running — the site itself is left up but will error on data calls. Those
 * projects lean on `demoSteps` (a scripted click-through built from real
 * screenshots) instead of a working login, so the app is still legible to a
 * visitor. `live: true` projects have no such dependency and still work.
 *
 * See soul.md at the repo root for the full convention before adding one.
 */
export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    kind: "personal",
    slug: "lucky-lasso",
    name: "Lucky Lasso",
    tagline: "Mobile NA beverage vending for community events",
    url: "https://luckylassoaz.com",
    live: false,
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Resend", "Vercel"],
    category: "business",
    status: "ARCHIVED",
    audience: "Event organizers, school athletic programs, and community gatherings in the Phoenix metro area",
    description:
      "The digital storefront for Lucky Lasso LLC. Handles event booking inquiries, menu proposals, quoting, and client messaging. The backend manages the full event lifecycle from initial inquiry through day-of logistics.",
    highlights: [
      "Full event pipeline: inquiry, quote, menu proposal, booking, messaging",
      "Arizona LLC with Maricopa County Type 2 mobile food permit",
      "Custom vending cart with integrated hand-wash sink for health compliance",
      "Client portal with event code access for real-time coordination",
    ],
    color: "#F59E0B",
    icon: "beer",
    infra: "Dedicated Supabase project (production business data kept isolated) — retired, so the live booking flow no longer runs.",
    screenshots: [
      { src: "/screenshots/lasso-hero.png", caption: "Landing page and brand presence" },
      { src: "/screenshots/lasso-booking.png", caption: "Event booking inquiry flow" },
      { src: "/screenshots/lasso-admin.png", caption: "Admin dashboard with event pipeline" },
    ],
    demoSteps: [
      {
        kind: "screenshot",
        image: "/screenshots/lasso-hero.png",
        title: "Landing page",
        caption: "A visitor lands on the brand site and sees the menu, service area, and a book-now CTA.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/lasso-booking.png",
        title: "Booking inquiry",
        caption: "They submit an event date, guest count, and venue — this kicks off a quote request instead of an instant checkout, since every event gets a custom menu proposal.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/lasso-admin.png",
        title: "Admin pipeline",
        caption: "Behind the scenes, the inquiry lands in an admin pipeline (inquiry → quote sent → booked → day-of) so nothing falls through the cracks between events.",
      },
    ],
  },
  {
    kind: "personal",
    slug: "myflagcoach-v2",
    name: "MyFlagCoach v2",
    tagline: "Flag football coaching and play management platform",
    url: "https://myflagcoach.joshjgriffith.dev",
    live: false,
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
    category: "app",
    status: "ARCHIVED",
    audience: "Youth flag football coaches, league coordinators, and team staff managing plays, rosters, and game plans",
    description:
      "A full coaching platform for flag football. Coaches build playbooks with visual play diagrams, manage rosters across seasons, plan practices with linked drills, run game day with wristband-mapped play sheets, and track play-by-play results. Version 2 is a ground-up rebuild focused on mobile-first workflows.",
    highlights: [
      "27-table relational database: teams, players, seasons, playbooks, formations, games, chat, announcements",
      "Visual play diagramming with formation data stored as JSON",
      "Game plans with wristband color/number mapping for sideline use",
      "Team chat, announcements with reactions/comments, practice attendance tracking",
      "Shared access tokens with scoped permissions for parents and assistant coaches",
    ],
    color: "#3B82F6",
    icon: "flag",
    infra: "Supabase (public schema) + shared project with Periwinkel (tripatlas schema) — retired.",
    screenshots: [
      { src: "/screenshots/flagcoach-dashboard.png", caption: "Team dashboard and overview" },
      { src: "/screenshots/flagcoach-playdesigner.png", caption: "Visual play designer with formation diagram" },
      { src: "/screenshots/flagcoach-playbook.png", caption: "Playbook list with play cards" },
      { src: "/screenshots/flagcoach-gameplan.png", caption: "Game plan with wristband mapping" },
      { src: "/screenshots/flagcoach-mobile.png", caption: "Mobile play sheet for sideline use" },
    ],
    demoSteps: [
      {
        kind: "screenshot",
        image: "/screenshots/flagcoach-dashboard.png",
        title: "Team dashboard",
        caption: "A coach signs in to their team dashboard — roster, upcoming games, and recent activity at a glance.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/flagcoach-playdesigner.png",
        title: "Play designer",
        caption: "The play designer stores each route and formation as structured JSON, not a flat image, so plays can be searched, reused, and remixed across the playbook.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/flagcoach-gameplan.png",
        title: "Game plan & wristbands",
        caption: "Before kickoff, the coach builds a game plan and maps each play to a wristband color/number combo the QB can read at a glance.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/flagcoach-mobile.png",
        title: "Sideline, on a phone",
        caption: "On game day the whole thing collapses to a mobile play sheet built for one-handed sideline use.",
      },
    ],
  },
  {
    kind: "personal",
    slug: "periwinkel",
    name: "Periwinkel",
    tagline: "Collaborative trip planning for group travel",
    url: "https://periwinkel.app",
    live: false,
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Resend", "Vercel"],
    category: "app",
    status: "ARCHIVED",
    audience: "Trip organizers (especially teachers and group leaders) who need to coordinate itineraries, share updates with parents, and manage access for participants",
    description:
      "A trip management app built for group travel coordination. Trip organizers create itineraries with ordered stops (including GPS coordinates and scheduled times), invite collaborators with role-based access, and share read-only views with parents via access codes. Originally built for Taylor's school travel program.",
    highlights: [
      "Role-based access: owner, lead, viewer, plus anonymous access via codes",
      "Ordered stop itineraries with GPS, scheduled/actual times, and photo galleries",
      "Parent notification system with email invites and view tracking",
      "Access code system with rate limiting, expiration, and lockout protection",
      "Runs on shared Supabase instance using isolated 'tripatlas' schema",
    ],
    color: "#8B5CF6",
    icon: "compass",
    infra: "Supabase (tripatlas schema on shared MyFlagCoach project) + Resend for emails — retired.",
    screenshots: [
      { src: "/screenshots/periwinkel-overview.png", caption: "Trip overview with itinerary" },
      { src: "/screenshots/periwinkel-map.png", caption: "Map view with stop pins" },
      { src: "/screenshots/periwinkel-sharing.png", caption: "Access code and parent sharing" },
      { src: "/screenshots/periwinkel-mobile.png", caption: "Mobile stop detail with photos" },
    ],
    demoSteps: [
      {
        kind: "screenshot",
        image: "/screenshots/periwinkel-overview.png",
        title: "Trip overview",
        caption: "A trip lead builds an itinerary of ordered stops — each with a scheduled time, GPS pin, and notes.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/periwinkel-map.png",
        title: "Map view",
        caption: "The itinerary renders as a map with pins in order, so anyone can see where the group is headed next.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/periwinkel-sharing.png",
        title: "Sharing without an account",
        caption: "Parents get a short access code instead of an account — enter it once and get a read-only view of the trip, no signup required.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/periwinkel-mobile.png",
        title: "On the road",
        caption: "Chaperones check the mobile view for the next stop's time and any photos posted from the current one.",
      },
    ],
  },
  {
    kind: "personal",
    slug: "pulsemap",
    name: "PulseMap.org",
    tagline: "Geographic data visualization and community mapping",
    url: "https://pulsemap.org",
    live: true,
    stack: ["React", "Mapbox GL", "Tailwind CSS", "Vercel"],
    category: "app",
    status: "LIVE",
    audience: "Community organizers and anyone interested in geographic data visualization",
    description:
      "An interactive mapping platform that turns geographic data into visual layers. No backend database needed. Pulls data from external APIs and renders it on Mapbox with custom styling and interactivity.",
    highlights: [
      "Pure frontend: API calls + Mapbox rendering, no database",
      "Real-time data layer rendering with custom map styles",
      "Interactive tooltips and filtering by data attributes",
    ],
    color: "#10B981",
    icon: "map-pin",
    infra: "No database. Frontend-only with external API integrations — unaffected by the Supabase retirement, still fully live.",
    screenshots: [
      { src: "/screenshots/pulsemap-main.png", caption: "Main map view with data layers" },
      { src: "/screenshots/pulsemap-filtered.png", caption: "Filtered view with interactive tooltips" },
    ],
    demoSteps: [
      {
        kind: "screenshot",
        image: "/screenshots/pulsemap-main.png",
        title: "Main map",
        caption: "Data layers render straight from external APIs onto a styled Mapbox canvas — nothing is stored server-side.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/pulsemap-filtered.png",
        title: "Filter & explore",
        caption: "Filtering by attribute narrows the layer live and surfaces tooltips on hover.",
      },
    ],
  },
  {
    kind: "personal",
    slug: "saloni-mental-health",
    name: "Saloni Mental Health",
    tagline: "Telehealth practice site for a psychiatric NP",
    url: "https://saloni.joshjgriffith.dev",
    live: true,
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    category: "volunteer",
    status: "LIVE",
    audience: "Patients seeking psychiatric telehealth care across Arizona",
    description:
      "A professional single-page website built for Megan Presley, PMHNP-BC. She's a board-certified psychiatric nurse practitioner and U.S. Army veteran serving patients via telehealth across Arizona. Integrates with Spruce patient portal and Psychology Today for new patient intake. Built pro bono.",
    highlights: [
      "Static site, no backend needed. Clean and fast.",
      "Spruce patient portal + Psychology Today profile integration",
      "Insurance grid with sliding scale info and clear CTAs",
      "Dusty rose palette with warm, approachable medical feel",
      "Built entirely pro bono for a veteran healthcare provider",
    ],
    color: "#E879A0",
    icon: "brain",
    infra: "Static HTML/CSS/JS. No backend — still fully live.",
    screenshots: [
      { src: "/screenshots/saloni-hero.png", caption: "Hero section with warm medical branding" },
      { src: "/screenshots/saloni-services.png", caption: "Services and insurance grid" },
    ],
    demoSteps: [
      {
        kind: "screenshot",
        image: "/screenshots/saloni-hero.png",
        title: "Hero",
        caption: "A patient lands on a warm, credential-forward hero section built to read as trustworthy at a glance.",
      },
      {
        kind: "screenshot",
        image: "/screenshots/saloni-services.png",
        title: "Services & insurance",
        caption: "Services and an insurance grid answer the two questions every new patient has before they'll book: what do you treat, and will my plan cover it.",
      },
    ],
  },
];
