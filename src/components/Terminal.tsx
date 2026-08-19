"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Project } from "@/content/types";

const MOTD = `  apps.joshjgriffith.dev
  Type 'help' for commands, 'ls' to browse projects.
  Or just close this and use the visual view.`;

const WHOAMI = `  Josh Griffith
  AI & Agile Practice Coach // Phoenix, AZ
  Builder, vibe coder, systems thinker.
  12+ years: org dev, Lean Six Sigma, Agile, tech.
  These apps were vibe-coded and shipped to Vercel.
  joshjgriffith.dev // github.com/vrostbyte`;

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

export function Terminal({ projects, onClose }: { projects: Project[]; onClose: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([{ type: "output", text: MOTD }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const helpText = useMemo(() => `Available commands:
  ls              List all projects
  cat <project>   View project details
  open <project>  Open live site in browser (personal apps only)
  whoami          About Josh
  clear           Clear terminal
  help            Show this message
  exit            Close terminal

Projects: ${projects.map((p) => p.slug).join(", ")}`, [projects]);

  const formatLs = useCallback(() =>
    projects.map((p) => {
      const status = p.kind === "work" ? "◆" : p.live ? "●" : p.url ? "○" : "·";
      return `  ${status}  ${p.slug.padEnd(22)} ${p.tagline}`;
    }).join("\n") + "\n\nUse 'cat <name>' for details. ◆ = confidential, ● = live, ○ = archived, · = never deployed.",
  [projects]);

  const formatCat = useCallback((slug: string) => {
    const p = projects.find((x) => x.slug === slug);
    if (!p) return `cat: ${slug}: No such project. Try 'ls'.`;
    if (p.kind === "work") {
      return `
  ${p.name} (codename — real name withheld)
  ${p.tagline}
  ${"─".repeat(50)}
  STATUS:   ◆ CONFIDENTIAL
  ROLE:     ${p.role}
  STACK:    ${p.stack.join(" / ")}

  ${p.description}

  PROBLEM:  ${p.problem}
  OUTCOME:  ${p.outcome}

  Type 'open ${slug}' — there's a diagram walkthrough in the visual view.`;
    }
    return `
  ${p.name}
  ${p.tagline}
  ${"─".repeat(50)}
  STATUS:   ${p.live ? "● LIVE" : p.url ? "○ ARCHIVED" : "○ NEVER DEPLOYED"}
  URL:      ${p.url ?? "(none — never publicly deployed)"}
  SOURCE:   ${p.repoUrl ?? "(not public)"}
  STACK:    ${p.stack.join(" / ")}
  INFRA:    ${p.infra}

  ${p.description}

  HIGHLIGHTS:
${p.highlights.map((h) => "  > " + h).join("\n")}

  Type 'open ${slug}' to visit${p.url ? "" : " (opens source instead)"}, or see the visual view for a click-through walkthrough.`;
  }, [projects]);

  const exec = useCallback((raw: string) => {
    const t = raw.trim();
    const next: TerminalLine[] = [...lines, { type: "input", text: t }];
    if (!t) { setLines(next); return; }
    const [cmd, ...a] = t.split(/\s+/);
    const arg = a.join(" ").toLowerCase().replace(/\s+/g, "-");
    switch (cmd.toLowerCase()) {
      case "help": next.push({ type: "output", text: helpText }); break;
      case "ls": case "dir": next.push({ type: "output", text: formatLs() }); break;
      case "cat": case "cd": case "view":
        next.push({ type: "output", text: arg ? formatCat(arg) : `Usage: ${cmd} <project>` }); break;
      case "open": {
        if (!arg) { next.push({ type: "output", text: "Usage: open <project>" }); break; }
        const p = projects.find((x) => x.slug === arg);
        if (!p) { next.push({ type: "output", text: `open: ${arg}: not found` }); break; }
        if (p.kind === "work") { next.push({ type: "output", text: `${p.name} is internal and confidential — not publicly linked. Try the walkthrough in the visual view.` }); break; }
        if (p.url) {
          next.push({ type: "output", text: `Opening ${p.url}...` });
          window.open(p.url, "_blank");
        } else if (p.repoUrl) {
          next.push({ type: "output", text: `${p.name} was never publicly deployed. Opening source instead: ${p.repoUrl}...` });
          window.open(p.repoUrl, "_blank");
        } else {
          next.push({ type: "output", text: `${p.name} has no public URL — see the walkthrough in the visual view.` });
        }
        break;
      }
      case "whoami": next.push({ type: "output", text: WHOAMI }); break;
      case "clear": setLines([]); setInput(""); return;
      case "exit": onClose(); return;
      case "sudo": next.push({ type: "output", text: "Nice try. Josh is the only admin here." }); break;
      case "neofetch": next.push({ type: "output", text: `       /\\       josh@apps.joshjgriffith.dev\n      /  \\      OS: Vercel Linux x86_64\n     /    \\     Shell: portfolio-shell 1.0\n    /______\\    Apps: ${projects.length} deployed\n                Uptime: vibing since 2024` }); break;
      default: next.push({ type: "output", text: `command not found: ${cmd}\nType 'help' for commands.` });
    }
    setLines(next);
    setHistory((h) => [t, ...h]);
    setHistIdx(-1);
    setInput("");
  }, [lines, onClose, projects, helpText, formatLs, formatCat]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { exec(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const i = Math.min(histIdx + 1, history.length - 1); setHistIdx(i); if (history[i]) setInput(history[i]); }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(history[histIdx - 1]); } else { setHistIdx(-1); setInput(""); } }
    else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const last = parts[parts.length - 1]?.toLowerCase();
      if (parts.length >= 2) { const m = projects.find((p) => p.slug.startsWith(last)); if (m) { parts[parts.length - 1] = m.slug; setInput(parts.join(" ")); } }
      else { const cmds = ["help", "ls", "cat", "open", "whoami", "clear", "neofetch", "exit"]; const m = cmds.find((c) => c.startsWith(last)); if (m) setInput(m); }
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
          try: ls / cat lucky-lasso / whoami / help / exit
        </div>
      </div>
    </div>
  );
}
