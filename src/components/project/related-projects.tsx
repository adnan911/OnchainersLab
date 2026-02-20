import Link from "next/link";
import { Project } from "@/types";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/marketplace/project-card";

interface RelatedProjectsProps {
  currentSlug: string;
  tags: string[];
}

export function RelatedProjects({ currentSlug, tags }: RelatedProjectsProps) {
  // Find projects with matching tags, excluding current
  const related = projects
    .filter(p => p.slug !== currentSlug)
    .map(p => ({
      project: p,
      score: p.tags.filter(t => tags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.project);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-white/10">
      <h2 className="text-2xl font-bold font-display tracking-tight text-white mb-8">You might also like</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map(p => (
           <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
