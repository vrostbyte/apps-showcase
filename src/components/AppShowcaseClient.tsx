"use client";

import { useEffect } from "react";
import { useCalibration } from "@/components/duality/useCalibration";
import { TechnicalView } from "@/components/TechnicalView";
import { ProfessionalSite } from "@/components/professional/ProfessionalSite";
import { ModeTransition } from "@/components/ModeTransition";

type Mode = "builder" | "enterprise";

/**
 * Owns the lifted calibration state and the discrete builder/enterprise
 * mode derived from it. `initialMode` comes from the server (host header +
 * `?mode=`, see `page.tsx`) so the correct mode is already right on first
 * paint — no client-side flash, no transition playing on load.
 */
export function AppShowcaseClient({ initialMode }: { initialMode: Mode }) {
  const calibration = useCalibration(initialMode === "enterprise" ? 0.08 : 0.64);
  const { t, dragging, setT } = calibration;

  // t near 1 = full Builder, t near 0 = full Enterprise (see useCalibration.ts).
  const mode: Mode = t > 0.5 ? "builder" : "enterprise";

  useEffect(() => {
    // Keep the URL in sync with the committed mode (not every drag pixel,
    // and not while dragging is still in progress — ModeTransition ignores
    // those the same way) so a copied link reflects what's on screen.
    if (dragging) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === mode) return;
    params.set("mode", mode);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [mode, dragging]);

  return (
    <ModeTransition
      mode={mode}
      dragging={dragging}
      technical={<TechnicalView calibration={calibration} />}
      professional={<ProfessionalSite onFlipToBuilder={() => setT(0.92)} />}
    />
  );
}
