/** A small L-shaped registration mark — the CAD-viewport corner tick this system uses instead of rounded card frames or drop shadows. */
export function Bracket({ corner, size = 7, color = "var(--structure)" }: { corner: "tl" | "tr" | "bl" | "br"; size?: number; color?: string }) {
  const vertical = corner[0] === "t" ? { borderTop: `1.5px solid ${color}` } : { borderBottom: `1.5px solid ${color}` };
  const horizontal = corner[1] === "l" ? { borderLeft: `1.5px solid ${color}` } : { borderRight: `1.5px solid ${color}` };
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.7,
        ...vertical,
        ...horizontal,
        [corner[0] === "t" ? "top" : "bottom"]: 0,
        [corner[1] === "l" ? "left" : "right"]: 0,
      } as React.CSSProperties}
    />
  );
}
