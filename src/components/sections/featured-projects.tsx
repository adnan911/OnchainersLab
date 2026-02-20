import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/marketplace/project-card";
import { projects } from "@/data/projects";

// Mock ProjectCard until implemented
// import { ProjectCard } from "@/components/marketplace/project-card";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-16 md:py-24 border-t border-white/5 bg-bg-1/50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1200px]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-2">Featured drops</h2>
            <p className="text-text-2">A curated selection from the lab.</p>
          </div>
          <Link href="/marketplace" className="hidden sm:flex items-center text-sm font-semibold text-gold hover:text-gold-2 transition-colors group">
            View all
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
             <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        
         <div className="mt-8 text-center sm:hidden">
          <Link href="/marketplace" className="inline-flex items-center text-sm font-semibold text-gold">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
