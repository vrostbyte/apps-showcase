"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Beer, Flag, Compass, MapPin, Brain, Terminal as TermIcon,
  ExternalLink, GitBranch, Globe, X, ChevronRight, ChevronLeft, Layers,
  Users, Wrench, Heart, ArrowUpRight, Monitor, Play, Lock, Eye
} from "lucide-react";

/* ════════════════════════════════════════════════
   TYPES
   ════════════════════════════════════════════════ */
interface Screenshot {
  src: string;       // path to image in /public/screenshots/
  caption: string;
}

interface DemoAccess {
  url: string;
  email: string;
  password: string;
  note?: string;     // e.g. "Read-only. Data resets nightly."
}

interface Project {
  slug: string;
  name: string;
  tagline: string;
  url: string;
  stack: string[];
  category: string;
  status: string;
  audience: string;
  description: string;
  highlights: string[];
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  infra: string;
  screenshots: Screenshot[];
  demo?: DemoAccess;
}

interface CategoryMeta {
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}

/* ════════════════════════════════════════════════
   PROJECT DATA
   ════════════════════════════════════════════════ */
const PROJECTS: Project[] = [
  {
    slug: "lucky-lasso",
    name: "Lucky Lasso",
    tagline: "Mobile NA beverage vending for community events",
    url: "https://luckylassoaz.com",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Resend", "Vercel"],
    category: "business",
    status: "LIVE",
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
    Icon: Beer,
    infra: "Dedicated Supabase project (production business data kept isolated)",
    screenshots: [
      { src: "/screenshots/lasso-hero.png", caption: "Landing page and brand presence" },
      { src: "/screenshots/lasso-booking.png", caption: "Event booking inquiry flow" },
      { src: "/screenshots/lasso-admin.png", caption: "Admin dashboard with event pipeline" },
    ],
  },
  {
    slug: "myflagcoach-v2",
    name: "MyFlagCoach v2",
    tagline: "Flag football coaching and play management platform",
    url: "https://myflagcoach.joshjgriffith.dev",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
    category: "app",
    status: "LIVE",
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
    Icon: Flag,
    infra: "Supabase (public schema) + shared project with Periwinkel (tripatlas schema)",
    screenshots: [
      { src: "/screenshots/flagcoach-dashboard.png", caption: "Team dashboard and overview" },
      { src: "/screenshots/flagcoach-playdesigner.png", caption: "Visual play designer with formation diagram" },
      { src: "/screenshots/flagcoach-playbook.png", caption: "Playbook list with play cards" },
      { src: "/screenshots/flagcoach-gameplan.png", caption: "Game plan with wristband mapping" },
      { src: "/screenshots/flagcoach-mobile.png", caption: "Mobile play sheet for sideline use" },
    ],
    demo: {
      url: "https://myflagcoach.joshjgriffith.dev",
      email: "demo@myflagcoach.demo",
      password: "demo2026",
      note: "Read-only demo account. Pre-loaded with a sample team, roster, and playbook.",
    },
  },
  {
    slug: "periwinkel",
    name: "Periwinkel",
    tagline: "Collaborative trip planning for group travel",
    url: "https://periwinkel.app",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Resend", "Vercel"],
    category: "app",
    status: "LIVE",
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
    Icon: Compass,
    infra: "Supabase (tripatlas schema on shared MyFlagCoach project) + Resend for emails",
    screenshots: [
      { src: "/screenshots/periwinkel-overview.png", caption: "Trip overview with itinerary" },
      { src: "/screenshots/periwinkel-map.png", caption: "Map view with stop pins" },
      { src: "/screenshots/periwinkel-sharing.png", caption: "Access code and parent sharing" },
      { src: "/screenshots/periwinkel-mobile.png", caption: "Mobile stop detail with photos" },
    ],
    demo: {
      url: "https://periwinkel.app",
      email: "demo@myflagcoach.demo",
      password: "demo2026",
      note: "Read-only demo account. Same account as MyFlagCoach; both apps share one Supabase project.",
    },
  },
  {
    slug: "pulsemap",
    name: "PulseMap.org",
    tagline: "Geographic data visualization and community mapping",
    url: "https://pulsemap.org",
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
    Icon: MapPin,
    infra: "No database. Frontend-only with external API integrations.",
    screenshots: [
      { src: "/screenshots/pulsemap-main.png", caption: "Main map view with data layers" },
      { src: "/screenshots/pulsemap-filtered.png", caption: "Filtered view with interactive tooltips" },
    ],
  },
  {
    slug: "saloni-mental-health",
    name: "Saloni Mental Health",
    tagline: "Telehealth practice site for a psychiatric NP",
    url: "https://saloni.joshjgriffith.dev",
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
    Icon: Brain,
    infra: "Static HTML/CSS/JS. No backend.",
    screenshots: [
      { src: "/screenshots/saloni-hero.png", caption: "Hero section with warm medical branding" },
      { src: "/screenshots/saloni-services.png", caption: "Services and insurance grid" },
    ],
  },
];

const CATEGORY_META: Record<string, CategoryMeta> = {
  all:       { label: "All Projects",     Icon: Layers },
  app:       { label: "Apps",             Icon: Monitor },
  business:  { label: "My Business",      Icon: Wrench },
  volunteer: { label: "Community Builds",  Icon: Heart },
};

/* ════════════════════════════════════════════════
   SCREENSHOT CAROUSEL
   ════════════════════════════════════════════════ */
function ScreenshotCarousel({ screenshots, color }: { screenshots: Screenshot[]; color: string }) {
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const prev = () => setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1));

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  if (screenshots.length === 0) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Image container */}
      <div style={{
        position: "relative",
        background: "#0a0a0a",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        overflow: "hidden",
        aspectRatio: "16 / 10",
      }}>
        {imageErrors.has(current) ? (
          // Placeholder when image hasn't been added yet
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "8px", color: "#333",
            position: "absolute", inset: 0,
          }}>
            <Eye size={24} />
            <span style={{ fontFamily: "'Commit Mono', monospace", fontSize: "12px" }}>
              screenshot coming soon
            </span>
          </div>
        ) : (
          <img
            src={screenshots[current].src}
            alt={screenshots[current].caption}
            onError={() => handleImageError(current)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              position: "absolute", inset: 0,
            }}
          />
        )}

        {/* Nav arrows (only if multiple screenshots) */}
        {screenshots.length > 1 && (
          <>
            <button onClick={prev} style={{
              position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.6)", border: "1px solid #333",
              color: "#ccc", width: "32px", height: "32px", borderRadius: "8px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} style={{
              position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.6)", border: "1px solid #333",
              color: "#ccc", width: "32px", height: "32px", borderRadius: "8px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}>
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Counter badge */}
        {screenshots.length > 1 && (
          <div style={{
            position: "absolute", top: "8px", right: "8px",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            padding: "2px 8px", borderRadius: "4px",
            color: "#aaa", fontSize: "11px", fontFamily: "'Commit Mono', monospace",
          }}>
            {current + 1} / {screenshots.length}
          </div>
        )}
      </div>

      {/* Caption */}
      <p style={{
        color: "#666", fontSize: "12px", marginTop: "8px", textAlign: "center",
        fontFamily: "'Commit Mono', monospace",
      }}>
        {screenshots[current].caption}
      </p>

      {/* Dot indicators */}
      {screenshots.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "8px" }}>
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? color : "#333",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   DEMO ACCESS CARD
   ════════════════════════════════════════════════ */
function DemoAccessCard({ demo, color }: { demo: DemoAccess; color: string }) {
  const [showCreds, setShowCreds] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{
      background: "#0d0d0f",
      border: `1px solid ${color}25`,
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showCreds ? "12px" : "0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Play size={14} color={color} />
          <span style={{ color: "#ddd", fontSize: "13px", fontWeight: 600 }}>Try the Demo</span>
        </div>
        <button
          onClick={() => setShowCreds(!showCreds)}
          style={{
            background: showCreds ? "#1a1a1a" : color,
            color: showCreds ? "#888" : "#000",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'Commit Mono', monospace",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {showCreds ? (
            <>Hide Credentials</>
          ) : (
            <><Lock size={11} /> Show Credentials</>
          )}
        </button>
      </div>

      {showCreds && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Email */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#111", borderRadius: "6px", padding: "8px 12px",
            border: "1px solid #1a1a1a",
          }}>
            <div>
              <span style={{ color: "#555", fontSize: "10px", fontFamily: "'Commit Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Email</span>
              <div style={{ color: "#ccc", fontSize: "13px", fontFamily: "'Commit Mono', monospace" }}>{demo.email}</div>
            </div>
            <button
              onClick={() => copyToClipboard(demo.email, "email")}
              style={{
                background: "none", border: "1px solid #2a2a2a", color: copied === "email" ? color : "#666",
                padding: "4px 10px", borderRadius: "4px", cursor: "pointer",
                fontSize: "11px", fontFamily: "'Commit Mono', monospace",
              }}
            >
              {copied === "email" ? "copied" : "copy"}
            </button>
          </div>

          {/* Password */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#111", borderRadius: "6px", padding: "8px 12px",
            border: "1px solid #1a1a1a",
          }}>
            <div>
              <span style={{ color: "#555", fontSize: "10px", fontFamily: "'Commit Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Password</span>
              <div style={{ color: "#ccc", fontSize: "13px", fontFamily: "'Commit Mono', monospace" }}>{demo.password}</div>
            </div>
            <button
              onClick={() => copyToClipboard(demo.password, "password")}
              style={{
                background: "none", border: "1px solid #2a2a2a", color: copied === "password" ? color : "#666",
                padding: "4px 10px", borderRadius: "4px", cursor: "pointer",
                fontSize: "11px", fontFamily: "'Commit Mono', monospace",
              }}
            >
              {copied === "password" ? "copied" : "copy"}
            </button>
          </div>

          {/* Note */}
          {demo.note && (
            <p style={{ color: "#555", fontSize: "11px", margin: "4px 0 0", fontFamily: "'Commit Mono', monospace" }}>
              {demo.note}
            </p>
          )}

          {/* Open demo button */}
          <a
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              background: `${color}18`, color: color,
              border: `1px solid ${color}30`,
              padding: "10px", borderRadius: "8px",
              textDecoration: "none", fontSize: "13px", fontWeight: 600,
              fontFamily: "'Commit Mono', monospace",
              marginTop: "4px",
            }}
          >
            Open Demo <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   TERMINAL (compressed)
   ════════════════════════════════════════════════ */
const MOTD = `  apps.joshjgriffith.com
  Type 'help' for commands, 'ls' to browse projects.
  Or just close this and use the visual view.`;

const HELP_TEXT = `Available commands:
  ls              List all projects
  cat <project>   View project details
  open <project>  Open live site in browser
  whoami          About Josh
  clear           Clear terminal
  help            Show this message
  exit            Close terminal

Projects: ${PROJECTS.map((p) => p.slug).join(", ")}`;

const WHOAMI = `  Josh Griffith
  AI & Agile Practice Coach // Phoenix, AZ
  Builder, vibe coder, systems thinker.
  12+ years: org dev, Lean Six Sigma, Agile, tech.
  These apps were vibe-coded and shipped to Vercel.
  joshjgriffith.com // github.com/vrostbyte`;

function formatLs() {
  return PROJECTS.map(
    (p) => `  ${p.status === "LIVE" ? "●" : "○"}  ${p.slug.padEnd(22)} ${p.tagline}`
  ).join("\n") + "\n\nUse 'cat <name>' for details.";
}

function formatCat(slug: string) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return `cat: ${slug}: No such project. Try 'ls'.`;
  return `
  ${p.name}
  ${p.tagline}
  ${"─".repeat(50)}
  STATUS:   ${p.status === "LIVE" ? "● LIVE" : "○ IN DEV"}
  URL:      ${p.url}
  STACK:    ${p.stack.join(" / ")}
  INFRA:    ${p.infra}
  DEMO:     ${p.demo ? "Available (use 'demo " + slug + "')" : "No demo account"}

  ${p.description}

  HIGHLIGHTS:
${p.highlights.map((h) => "  > " + h).join("\n")}

  Type 'open ${slug}' to visit.`;
}

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

function Prompt() {
  return (
    <>
      <span style={{ color: "#f472b6" }}>josh</span>
      <span style={{ color: "#555" }}>@</span>
      <span style={{ color: "#60a5fa" }}>apps</span>
      <span style={{ color: "#555" }}>:</span>
      <span style={{ color: "#a78bfa" }}>~</span>
      <span style={{ color: "#555" }}>$ </span>
    </>
  );
}

function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([{ type: "output", text: MOTD }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const exec = useCallback((raw: string) => {
    const t = raw.trim();
    const next: TerminalLine[] = [...lines, { type: "input", text: t }];
    if (!t) { setLines(next); return; }
    const [cmd, ...a] = t.split(/\s+/);
    const arg = a.join(" ").toLowerCase().replace(/\s+/g, "-");
    switch (cmd.toLowerCase()) {
      case "help": next.push({ type: "output", text: HELP_TEXT }); break;
      case "ls": case "dir": next.push({ type: "output", text: formatLs() }); break;
      case "cat": case "cd": case "view":
        next.push({ type: "output", text: arg ? formatCat(arg) : `Usage: ${cmd} <project>` }); break;
      case "open":
        if (!arg) { next.push({ type: "output", text: "Usage: open <project>" }); break; }
        const p = PROJECTS.find((x) => x.slug === arg);
        if (p) { next.push({ type: "output", text: `Opening ${p.url}...` }); window.open(p.url, "_blank"); }
        else next.push({ type: "output", text: `open: ${arg}: not found` });
        break;
      case "demo": {
        if (!arg) { next.push({ type: "output", text: "Usage: demo <project>" }); break; }
        const dp = PROJECTS.find((x) => x.slug === arg);
        if (!dp) { next.push({ type: "output", text: `demo: ${arg}: not found` }); break; }
        if (!dp.demo) { next.push({ type: "output", text: `No demo account available for ${dp.name}.` }); break; }
        next.push({ type: "output", text: `
  Demo credentials for ${dp.name}:
  ${"─".repeat(40)}
  URL:      ${dp.demo.url}
  Email:    ${dp.demo.email}
  Password: ${dp.demo.password}
  ${dp.demo.note ? "\n  " + dp.demo.note : ""}

  Type 'open ${arg}' to visit.` });
        break;
      }
      case "whoami": next.push({ type: "output", text: WHOAMI }); break;
      case "clear": setLines([]); setInput(""); return;
      case "exit": onClose(); return;
      case "sudo": next.push({ type: "output", text: "Nice try. Josh is the only admin here." }); break;
      case "neofetch": next.push({ type: "output", text: `       /\\       josh@apps.joshjgriffith.com\n      /  \\      OS: Vercel Linux x86_64\n     /    \\     Shell: portfolio-shell 1.0\n    /______\\    Apps: ${PROJECTS.length} deployed\n                Uptime: vibing since 2024` }); break;
      default: next.push({ type: "output", text: `command not found: ${cmd}\nType 'help' for commands.` });
    }
    setLines(next);
    setHistory((h) => [t, ...h]);
    setHistIdx(-1);
    setInput("");
  }, [lines, onClose]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { exec(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const i = Math.min(histIdx + 1, history.length - 1); setHistIdx(i); if (history[i]) setInput(history[i]); }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(history[histIdx - 1]); } else { setHistIdx(-1); setInput(""); } }
    else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const last = parts[parts.length - 1]?.toLowerCase();
      if (parts.length >= 2) { const m = PROJECTS.find((p) => p.slug.startsWith(last)); if (m) { parts[parts.length - 1] = m.slug; setInput(parts.join(" ")); } }
      else { const cmds = ["help","ls","cat","open","demo","whoami","clear","neofetch","exit"]; const m = cmds.find((c) => c.startsWith(last)); if (m) setInput(m); }
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ position: "fixed", inset: 0, background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 3px)", pointerEvents: "none", zIndex: 1001 }} />
      <div style={{ width: "100%", maxWidth: "820px", maxHeight: "90vh", display: "flex", flexDirection: "column", borderRadius: "10px", overflow: "hidden", border: "1px solid #2a2a2a", position: "relative", zIndex: 1002 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", background: "#1a1a1a", borderBottom: "1px solid #2a2a2a", gap: "8px", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <div onClick={onClose} style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57", cursor: "pointer" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840" }} />
          </div>
          <span style={{ color: "#555", fontSize: "12px", flex: 1, textAlign: "center" }}>josh@apps // portfolio-shell</span>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #333", color: "#888", padding: "2px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontFamily: "inherit" }}>
            <X size={12} style={{ verticalAlign: "middle" }} />
          </button>
        </div>
        <div ref={ref} onClick={() => inputRef.current?.focus()} style={{ flex: 1, background: "#0d0d0d", padding: "16px", overflowY: "auto", cursor: "text", color: "#c9d1d9", fontSize: "13px", lineHeight: 1.6, minHeight: "300px" }}>
          {lines.map((l, i) => (
            <div key={i}>
              {l.type === "input" ? (
                <div><Prompt /><span style={{ color: "#e2e8f0" }}>{l.text}</span></div>
              ) : (
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#4ade80", fontFamily: "inherit" }}>{l.text}</pre>
              )}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Prompt />
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} spellCheck={false} autoCapitalize="off" autoCorrect="off" style={{ background: "transparent", border: "none", color: "#e2e8f0", fontFamily: "inherit", fontSize: "inherit", outline: "none", flex: 1, padding: 0, caretColor: "#4ade80" }} />
          </div>
        </div>
        <div style={{ background: "#111", padding: "8px 16px", borderTop: "1px solid #1a1a1a", color: "#444", fontSize: "11px", textAlign: "center", flexShrink: 0 }}>
          try: ls / cat lucky-lasso / demo myflagcoach-v2 / whoami / help / exit
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   PROJECT DETAIL MODAL
   ════════════════════════════════════════════════ */
function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const IconComp = p.Icon;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", maxWidth: "640px", width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative" }}>
        {/* Header */}
        <div style={{ padding: "32px 32px 24px", borderBottom: "1px solid #1a1a1a", background: `linear-gradient(135deg, ${p.color}12 0%, transparent 60%)`, borderRadius: "16px 16px 0 0" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "#1a1a1a", border: "1px solid #333", color: "#888", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconComp size={22} color={p.color} />
            </div>
            <div>
              <h2 style={{ margin: 0, color: "#f0f0f0", fontSize: "22px", fontFamily: "'Commit Mono', 'IBM Plex Mono', monospace", fontWeight: 700 }}>{p.name}</h2>
              <p style={{ margin: "2px 0 0", color: "#888", fontSize: "14px" }}>{p.tagline}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "16px" }}>
            <span style={{ background: p.status === "LIVE" ? "#16a34a22" : "#a3730022", color: p.status === "LIVE" ? "#4ade80" : "#fbbf24", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", border: `1px solid ${p.status === "LIVE" ? "#16a34a44" : "#a3730044"}` }}>
              {p.status === "LIVE" ? "● LIVE" : "○ IN DEV"}
            </span>
            {p.category === "volunteer" && (
              <span style={{ background: "#e879a015", color: "#f9a8c9", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, border: "1px solid #e879a030", display: "flex", alignItems: "center", gap: "4px" }}>
                <Heart size={10} /> PRO BONO
              </span>
            )}
            {p.demo && (
              <span style={{ background: `${p.color}12`, color: p.color, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", gap: "4px" }}>
                <Play size={10} /> DEMO AVAILABLE
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px 32px" }}>
          {/* Screenshot carousel */}
          <ScreenshotCarousel screenshots={p.screenshots} color={p.color} />

          {/* Demo access card */}
          {p.demo && <DemoAccessCard demo={p.demo} color={p.color} />}

          {/* Tech stack */}
          <Section title="Tech Stack">
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {p.stack.map((t) => (
                <span key={t} style={{ background: "#1a1a1a", color: "#ccc", padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: "'Commit Mono', monospace", border: "1px solid #252525" }}>{t}</span>
              ))}
            </div>
          </Section>

          {/* Infrastructure */}
          <Section title="Infrastructure">
            <p style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.6, margin: 0, fontFamily: "'Commit Mono', monospace" }}>{p.infra}</p>
          </Section>

          {/* Audience */}
          <Section title="Target Audience">
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{p.audience}</p>
          </Section>

          {/* About */}
          <Section title="About">
            <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{p.description}</p>
          </Section>

          {/* Highlights */}
          <Section title="What went into it">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {p.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <ChevronRight size={12} color={p.color} style={{ marginTop: "4px", flexShrink: 0 }} />
                  <span style={{ color: "#bbb", fontSize: "13px", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: p.color, color: "#000", padding: "10px 20px",
              borderRadius: "8px", textDecoration: "none", fontSize: "13px",
              fontWeight: 600, fontFamily: "'Commit Mono', monospace",
            }}>
              Visit Live Site <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h4 style={{ color: "#555", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 10px", fontFamily: "'Commit Mono', monospace" }}>{title}</h4>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN VIEW
   ════════════════════════════════════════════════ */
export default function AppShowcase() {
  const [termOpen, setTermOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div style={{ background: "#09090b", minHeight: "100vh", color: "#e0e0e0", fontFamily: "'Outfit', 'Helvetica Neue', sans-serif" }}>
      {/* Dot grid */}
      <div style={{ position: "fixed", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(9,9,11,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a", padding: "0 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#4ade80", fontFamily: "'Commit Mono', monospace", fontWeight: 700, fontSize: "15px" }}>~/apps</span>
            <span style={{ color: "#333", fontSize: "14px" }}>/</span>
            <span style={{ color: "#666", fontSize: "13px" }}>josh griffith</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a href="https://joshjgriffith.com" target="_blank" rel="noopener noreferrer" style={{ color: "#555", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <Globe size={13} /> portfolio
            </a>
            <a href="https://github.com/vrostbyte" target="_blank" rel="noopener noreferrer" style={{ color: "#555", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", textDecoration: "none" }}>
              <GitBranch size={13} /> github
            </a>
            <button onClick={() => setTermOpen(true)} style={{ background: "#111", border: "1px solid #2a2a2a", color: "#4ade80", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontFamily: "'Commit Mono', monospace", display: "flex", alignItems: "center", gap: "6px", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4ade80")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
            >
              <TermIcon size={13} /> terminal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 60px" }}>
        <p style={{ color: "#4ade80", fontFamily: "'Commit Mono', monospace", fontSize: "13px", marginBottom: "16px", letterSpacing: "0.03em" }}>
          $ ls -la ~/projects
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", color: "#f5f5f5", letterSpacing: "-0.02em" }}>
          {"Apps I've built,"}<br />
          <span style={{ color: "#4ade80" }}>shipped</span> {"& maintain."}
        </h1>
        <p style={{ color: "#777", fontSize: "16px", lineHeight: 1.7, maxWidth: "560px", margin: 0 }}>
          Real apps solving real problems. Vibe-coded with AI-assisted development and deployed to production. Some are mine, some I build for others for free.
        </p>
      </header>

      {/* Filters */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 40px" }}>
        <div style={{ display: "flex", gap: "4px", background: "#111", borderRadius: "8px", padding: "4px", width: "fit-content", border: "1px solid #1a1a1a" }}>
          {Object.entries(CATEGORY_META).map(([key, { label, Icon: CatIcon }]) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              background: filter === key ? "#1f1f1f" : "transparent",
              border: "none", color: filter === key ? "#f0f0f0" : "#555",
              padding: "6px 14px", borderRadius: "6px", cursor: "pointer",
              fontSize: "12px", fontWeight: filter === key ? 600 : 400,
              fontFamily: "'Commit Mono', monospace",
              display: "flex", alignItems: "center", gap: "5px",
              transition: "all 0.15s",
            }}>
              <CatIcon size={12} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {filtered.map((p) => {
            const IconComp = p.Icon;
            const hovered = hoveredCard === p.slug;
            return (
              <div key={p.slug} onClick={() => setSelectedProject(p)}
                onMouseEnter={() => setHoveredCard(p.slug)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hovered ? "#131316" : "#0f0f12",
                  border: `1px solid ${hovered ? p.color + "40" : "#1a1a1a"}`,
                  borderRadius: "12px", padding: "24px", cursor: "pointer",
                  transition: "all 0.2s ease",
                  transform: hovered ? "translateY(-2px)" : "none",
                  position: "relative", overflow: "hidden",
                }}>
                {hovered && <div style={{ position: "absolute", top: "-50%", right: "-50%", width: "100%", height: "100%", background: `radial-gradient(circle, ${p.color}08 0%, transparent 70%)`, pointerEvents: "none" }} />}
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "9px", background: `${p.color}12`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconComp size={18} color={p.color} />
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ background: p.status === "LIVE" ? "#16a34a18" : "#a3730018", color: p.status === "LIVE" ? "#4ade80" : "#fbbf24", padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, fontFamily: "'Commit Mono', monospace" }}>
                        {p.status === "LIVE" ? "● LIVE" : "○ DEV"}
                      </span>
                      {p.category === "volunteer" && (
                        <span style={{ background: "#e879a012", color: "#f9a8c9", padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, fontFamily: "'Commit Mono', monospace", display: "flex", alignItems: "center", gap: "3px" }}>
                          <Heart size={8} /> PRO BONO
                        </span>
                      )}
                      {p.demo && (
                        <span style={{ background: `${p.color}10`, color: p.color, padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: 600, fontFamily: "'Commit Mono', monospace", display: "flex", alignItems: "center", gap: "3px" }}>
                          <Play size={8} /> DEMO
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: 600, color: "#f0f0f0" }}>{p.name}</h3>
                  <p style={{ margin: "0 0 8px", color: "#777", fontSize: "13px", lineHeight: 1.5 }}>{p.tagline}</p>

                  {/* Domain Link */}
                  <div style={{ marginBottom: "16px" }}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        color: p.color,
                        fontSize: "11px",
                        fontFamily: "'Commit Mono', monospace",
                        textDecoration: "none",
                        opacity: 0.8,
                        transition: "opacity 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
                    >
                      {p.url.replace(/^https?:\/\//, "")}
                      <ArrowUpRight size={10} />
                    </a>
                  </div>

                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {p.stack.slice(0, 4).map((t) => (
                      <span key={t} style={{ background: "#161618", color: "#888", padding: "3px 9px", borderRadius: "4px", fontSize: "10px", fontFamily: "'Commit Mono', monospace", border: "1px solid #1f1f1f" }}>{t}</span>
                    ))}
                    {p.stack.length > 4 && (
                      <span style={{ background: "#161618", color: "#555", padding: "3px 9px", borderRadius: "4px", fontSize: "10px", fontFamily: "'Commit Mono', monospace", border: "1px solid #1f1f1f" }}>+{p.stack.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "24px", textAlign: "center", color: "#333", fontSize: "12px", fontFamily: "'Commit Mono', monospace" }}>
        vibe coded with care // josh griffith // {new Date().getFullYear()}
      </footer>

      {/* Overlays */}
      {termOpen && <Terminal onClose={() => setTermOpen(false)} />}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
