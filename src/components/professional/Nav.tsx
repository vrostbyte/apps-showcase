"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/content/professional";

export function Nav({ onFlipToBuilder }: { onFlipToBuilder: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-[12px] border-b border-gray-200"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center gap-3">
        <a
          href="#Home"
          className="font-extrabold text-xl text-pro-accent no-underline tracking-[-0.5px]"
        >
          JG<span className="text-gray-900">.</span>
        </a>

        <div className="flex items-center gap-3">
          <button
            onClick={onFlipToBuilder}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white/60 text-[12px] font-medium text-gray-500 whitespace-nowrap transition-colors duration-200 hover:border-pro-accent hover:text-pro-accent"
          >
            {"⇄"} Technical
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-transparent border-none text-gray-900 text-2xl cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <div
            className={`flex flex-col absolute top-[60px] left-0 right-0 bg-white p-6 gap-4 items-center transition-all duration-300 ease-in-out md:static md:flex-row md:bg-transparent md:p-0 md:gap-8 md:opacity-100 md:translate-y-0 md:pointer-events-auto ${
              menuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto shadow-lg"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium tracking-[0.5px] uppercase transition-colors duration-200 no-underline hover:text-pro-accent ${
                  activeSection === item ? "text-pro-accent" : "text-gray-500"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
