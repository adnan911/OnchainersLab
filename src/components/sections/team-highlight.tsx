import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DeveloperCard } from "@/components/developers/developer-card";
import { developers } from "@/data/developers";

export function TeamHighlight() {
  const featuredDevs = developers.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1200px]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-2">Built by the lab</h2>
            <p className="text-text-2">Small team. High polish. Onchain mindset.</p>
          </div>
          <Link href="/developers" className="hidden sm:flex items-center text-sm font-semibold text-gold hover:text-gold-2 transition-colors group">
            All Builders
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDevs.map((dev) => (
             <DeveloperCard key={dev.slug} developer={dev} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/developers" className="inline-flex items-center text-sm font-semibold text-gold">
            All Builders
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
