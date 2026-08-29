import type { ReactNode } from "react";

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-3">
      <span className="text-xs uppercase tracking-[2.5px] text-pro-accent font-semibold">
        {label}
      </span>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[40px] font-extrabold text-gray-900 mb-12 tracking-[-1px] leading-[1.15]">
      {children}
    </h2>
  );
}
