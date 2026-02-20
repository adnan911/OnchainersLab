import { SiteHeader } from "@/components/layout/site-header";
import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Categories } from "@/components/sections/categories";
import { WhyOnchain } from "@/components/sections/why-onchain";
import { TeamHighlight } from "@/components/sections/team-highlight";
import { FAQ } from "@/components/sections/faq";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-0 relative">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <EtheralShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <FeaturedProjects />
          <Categories />
          <WhyOnchain />
          <TeamHighlight />
          <FAQ />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
