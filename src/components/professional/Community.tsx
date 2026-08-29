"use client";

import Image from "next/image";
import { FadeIn } from "@/components/professional/FadeIn";
import { SectionLabel, SectionTitle } from "@/components/professional/SectionHeader";
import { COMMUNITY } from "@/content/professional";

export function Community() {
  return (
    <section id="Community" className="py-[100px] px-6 bg-pro-surface">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <SectionLabel label="Giving Back" />
          <SectionTitle>Community &amp; Volunteerism</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn className="md:row-span-2">
            <div className="rounded-xl border border-gray-200 overflow-hidden relative h-[260px] md:h-full">
              <Image
                src="/professional/community-volunteer.png"
                alt="Community volunteer event"
                fill
                className="object-cover object-top"
              />
            </div>
          </FadeIn>

          {COMMUNITY.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-xl border border-gray-200 bg-white h-full p-7">
                <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                  <span className="text-[13px] text-pro-accent font-semibold">
                    {c.org}
                  </span>
                  <span className="text-xs text-gray-400 font-pro-mono">
                    {c.dates}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-[1.3]">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-500 leading-[1.7]">
                  {c.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
