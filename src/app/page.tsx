import { headers } from "next/headers";
import { AppShowcaseClient } from "@/components/AppShowcaseClient";

type SearchParams = { [key: string]: string | string[] | undefined };

/**
 * Thin Server Component so the initial mode is right on first paint —
 * joshjgriffith.com / www.joshjgriffith.com (exact match, not substring —
 * apps.joshjgriffith.com contains that string too and must stay
 * Builder-default) defaults to Professional; everything else (.dev,
 * apps.joshjgriffith.com, preview/vercel.app URLs, localhost) defaults to
 * Builder. `?mode=` still wins over the host default, same precedence as
 * before, just resolved server-side now instead of via a client effect —
 * which also means a linked `?mode=` that disagrees with the host default
 * never flashes the wrong mode or plays the transition on load.
 *
 * This makes the route dynamic (per-request) instead of statically
 * prerendered, since it now depends on the incoming request's headers —
 * a real cost, though a non-issue at this site's traffic scale.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const modeParam = Array.isArray(params.mode) ? params.mode[0] : params.mode;
  // Strip a port (local dev) before comparing so this stays an exact
  // hostname match, not a substring one — apps.joshjgriffith.com contains
  // "joshjgriffith.com" too and must stay Builder-default.
  const host = ((await headers()).get("host") ?? "").split(":")[0].toLowerCase();
  const isProfessionalDomain = host === "joshjgriffith.com" || host === "www.joshjgriffith.com";

  const initialMode: "builder" | "enterprise" =
    modeParam === "enterprise" ? "enterprise"
    : modeParam === "builder" ? "builder"
    : isProfessionalDomain ? "enterprise"
    : "builder";

  return <AppShowcaseClient initialMode={initialMode} />;
}
