"use client";

import Image from "next/image";
import { FadeIn } from "@/components/professional/FadeIn";
import { SectionLabel, SectionTitle } from "@/components/professional/SectionHeader";
import { BIO, TOOLS } from "@/content/professional";

export function About() {
  return (
    <section id="About" className="py-[100px] px-6 max-w-[1200px] mx-auto">
      <FadeIn>
        <SectionLabel label="About Me" />
        <SectionTitle>
          I transform how
          <br />
          work gets done.
        </SectionTitle>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <FadeIn delay={0.1}>
          <div>
            <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src="/professional/hero-bg.png"
                alt="Josh Griffith"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            {BIO.map((paragraph, i) => (
              <p
                key={i}
                className={`text-[17px] text-gray-500 leading-[1.8] ${
                  i < BIO.length - 1 ? "mb-6" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-[2px] text-pro-accent font-semibold mb-5">
                Education
              </h3>
              <div className="mb-4">
                <div className="text-base font-bold text-gray-900">
                  M.A. Organizational Leadership
                </div>
                <div className="text-sm text-gray-500">
                  Gonzaga University | 4.0 GPA | 2023
                </div>
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">
                  B.S. Business Administration
                </div>
                <div className="text-sm text-gray-500">
                  Northern Arizona University | 2012
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-[2px] text-pro-accent font-semibold mb-5">
                Certifications
              </h3>
              <Image
                src="/professional/certs.png"
                alt="Professional certifications: ASQ CSSGB, Microsoft PL-900, PSM I, PSK I, PSPO I, SPS"
                width={500}
                height={70}
                className="w-full h-auto"
              />
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[2px] text-pro-accent font-semibold mb-5">
                Tools &amp; Technology
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {TOOLS.map((t) => (
                  <div key={t.category}>
                    <div className="text-xs font-semibold text-gray-900 uppercase tracking-[1px] mb-1.5">
                      {t.category}
                    </div>
                    <div className="text-[13px] text-gray-500 leading-[1.8]">
                      {t.items.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
