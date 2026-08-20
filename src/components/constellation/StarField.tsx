"use client";

import { useEffect, useState } from "react";

interface BgStar {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const STAR_COUNT = 140;

function generateStars(): BgStar[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.85 ? 1 : Math.random() < 0.7 ? 1.5 : 2,
    delay: Math.random() * 6,
    duration: 3 + Math.random() * 4,
  }));
}

/**
 * Purely decorative, non-interactive twinkling background stars.
 * Randomized positions are generated client-side only, after mount — doing
 * it during render (even module-scoped) would run once on the server and
 * once on the client with different results, causing a hydration mismatch.
 */
export function StarField() {
  const [stars, setStars] = useState<BgStar[]>([]);

  useEffect(() => {
    // Intentional one-time client-only setState: random star positions must
    // differ from nothing (the server-rendered/initial state) to exist at
    // all, and must be generated after mount to avoid a hydration mismatch
    // between server and client Math.random() calls.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(generateStars());
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.5,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
