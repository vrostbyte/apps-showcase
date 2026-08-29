"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  distance = 32,
  duration = 0.7,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
