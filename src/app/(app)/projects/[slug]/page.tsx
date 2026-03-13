import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectHero } from "@/components/project/project-hero";
import { RelatedProjects } from "@/components/project/related-projects";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <Link href="/marketplace" className="inline-flex items-center text-sm text-text-2 hover:text-gold transition-colors mb-8">
         <ArrowLeft className="h-4 w-4 mr-1" />
         Back to marketplace
      </Link>

      <ProjectHero project={project} />
      
      {/* Media Gallery (Optional: if screenshots exist) */}
      {project.media?.screenshots && project.media.screenshots.length > 0 && (
         <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold font-display tracking-tight text-white">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {project.media.screenshots.map((src, i) => (
                  <img key={i} src={src} alt={`Screenshot ${i + 1}`} className="rounded-xl border border-white/10" />
               ))}
            </div>
         </div>
      )}

      <RelatedProjects currentSlug={project.slug} tags={project.tags} />
    </div>
  );
}
