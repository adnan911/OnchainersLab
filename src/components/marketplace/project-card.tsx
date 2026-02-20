import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { developers } from "@/data/developers";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const projectDevs = developers
    .filter((d) => project.devSlugs.includes(d.slug))
    .map((d) => ({ src: d.avatarUrl, alt: d.name }));

  return (
    <Card variant={project.featured ? "featured" : "glass"} className="flex flex-col h-full overflow-hidden group">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-bg-1">
        <img
          src={project.media.coverUrl}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
            {project.featured && <Badge variant="featured">Featured</Badge>}
            <Badge variant="status">{project.status === "coming_soon" ? "Soon" : project.status}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-2">
          <Badge variant="type" className="mb-2 mr-2 capitalize">{project.type}</Badge>
          <Badge variant="chain" className="mb-2 capitalize">{project.chains.join(", ")}</Badge>
        </div>
        
        <h3 className="text-lg font-bold font-display tracking-tight mb-1 group-hover:text-gold transition-colors">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {project.name}
          </Link>
        </h3>
        
        <p className="text-sm text-text-2 line-clamp-2 mb-4 flex-1">
          {project.oneLiner}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <AvatarStack avatars={projectDevs} />
          <Button size="sm" variant="ghost" className="z-10 group/btn">
             View
             <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
