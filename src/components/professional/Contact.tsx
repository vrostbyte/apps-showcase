"use client";

import { FadeIn } from "@/components/professional/FadeIn";
import { SectionLabel, SectionTitle } from "@/components/professional/SectionHeader";

export function Contact() {
  return (
    <section id="Contact" className="py-[100px] px-6 max-w-[1200px] mx-auto">
      <div className="text-center max-w-[600px] mx-auto">
        <FadeIn>
          <SectionLabel label="Connect" />
          <SectionTitle>Let&apos;s Talk.</SectionTitle>
          <p className="text-[17px] text-gray-500 leading-[1.7] mb-10">
            I am always interested in conversations about process
            transformation, AI-driven automation, Agile coaching, and building
            things that make organizations work better.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-col gap-4 items-center">
            <a
              href="mailto:me@joshjgriffith.com"
              className="inline-flex items-center gap-3 px-9 py-4 bg-pro-accent text-white rounded-lg no-underline font-semibold text-base transition-all duration-200"
            >
              me@joshjgriffith.com
            </a>
            <div className="flex gap-6 mt-2">
              <a
                href="https://linkedin.com/in/joshuajgriffith"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 no-underline text-[15px] transition-colors duration-200 hover:text-pro-accent"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
