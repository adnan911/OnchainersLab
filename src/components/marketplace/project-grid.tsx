import { Project } from "@/types";
import { ProjectCard } from "./project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

interface ProjectGridProps {
  projects: Project[];
  onClearFilters?: () => void;
}

export function ProjectGrid({ projects, onClearFilters }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="Try adjusting your filters or search query."
        action={
          onClearFilters && (
            <Button onClick={onClearFilters} variant="secondary">
              Clear all filters
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
