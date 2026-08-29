"use client";

import { FadeIn } from "@/components/professional/FadeIn";
import { SectionLabel, SectionTitle } from "@/components/professional/SectionHeader";
import { EXPERIENCE } from "@/content/professional";

export function Experience() {
  return (
    <section id="Experience" className="py-[100px] px-6 bg-pro-surface">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <SectionLabel label="Career" />
          <SectionTitle>Experience</SectionTitle>
        </FadeIn>

        <div className="flex flex-col gap-12">
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 pb-12 ${
                  i < EXPERIENCE.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div>
                  <div className="text-sm font-semibold text-pro-accent sticky top-[100px]">
                    {exp.dates}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {exp.title}
                  </h3>
                  {exp.subtitle && (
                    <div className="text-[15px] text-pro-accent font-medium mb-1">
                      {exp.subtitle}
                    </div>
                  )}
                  <div className="text-sm text-gray-400 mb-4">
                    {exp.org}
                  </div>
                  <p
                    className={`text-[15px] text-gray-500 leading-[1.7] ${
                      exp.highlights.length > 0 ? "mb-5" : ""
                    }`}
                  >
                    {exp.description}
                  </p>
                  {exp.highlights.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      {exp.highlights.map((h, j) => (
                        <div key={j} className="flex gap-3 items-start">
                          <span className="text-pro-accent text-lg leading-[1.4] shrink-0">
                            {"→"}
                          </span>
                          <span className="text-sm text-gray-500 leading-[1.6]">
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
