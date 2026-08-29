import { Nav } from "@/components/professional/Nav";
import { Hero } from "@/components/professional/Hero";
import { About } from "@/components/professional/About";
import { Experience } from "@/components/professional/Experience";
import { Projects } from "@/components/professional/Projects";
import { Community } from "@/components/professional/Community";
import { Contact } from "@/components/professional/Contact";
import { Footer } from "@/components/professional/Footer";

/**
 * The full port of joshjgriffith.com — same section order as
 * myportfolio/app/page.js. The shared `<body>` here is dark (Builder's
 * default), so this wrapper re-applies the light-mode defaults that used
 * to live on myportfolio's own `<body>` (font, background, text color).
 *
 * `.professional-site ::selection` is scoped here rather than added to the
 * shared globals.css — apps-showcase already has its own (dark-mode)
 * `::selection` rule, and an unscoped merge would leak whichever wins by
 * cascade order into the wrong mode. (myportfolio's scrollbar theming is
 * deliberately not ported: it can't be scoped the same way without giving
 * this wrapper its own internal scroll container, which the transition
 * design specifically avoids — see ModeTransition.)
 */
export function ProfessionalSite({ onFlipToBuilder }: { onFlipToBuilder: () => void }) {
  return (
    <div className="professional-site font-pro-sans bg-white text-gray-500 min-h-screen overflow-x-hidden antialiased">
      <style>{`
        .professional-site ::selection { background: var(--color-pro-accent); color: white; }
      `}</style>
      <Nav onFlipToBuilder={onFlipToBuilder} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Community />
      <Contact />
      <Footer />
    </div>
  );
}
