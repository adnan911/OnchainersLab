"use client";

import * as React from "react";
import { FilterPanel } from "@/components/layout/filter-panel";
import { FilterDrawer } from "@/components/layout/filter-drawer";
import { ResultsHeader } from "@/components/marketplace/results-header";
import { ProjectGrid } from "@/components/marketplace/project-grid";
import { projects as allProjects } from "@/data/projects";
import { applyProjectFilters, sortProjects, ProjectFilters } from "@/lib/filters";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Project } from "@/types";

export default function LabStorePage() { // Renamed MarketplacePage to LabStorePage
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<ProjectFilters>({});
  const [sort, setSort] = React.useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Fetch projects
  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        // If API returns an error or no data, fallback to static if needed,
        // but for now let's use the API results.
        if (Array.isArray(data)) {
            setProjects(data);
        } else {
            setProjects(allProjects); // Fallback to static for now
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setProjects(allProjects); // Fallback to static on error
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Filter logic
  const filteredProjects = React.useMemo(() => {
    return sortProjects(applyProjectFilters(projects, filters), sort as any);
  }, [projects, filters, sort]);

  const clearFilters = () => {
    setFilters({});
    setSort("featured");
  };

  return (
    <div className="flex gap-8">
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-2">
         <FilterPanel filters={filters} onChange={setFilters} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-display text-white mb-4">
            Lab <span className="text-gold">Store</span>
          </h1>
          <ResultsHeader 
            count={filteredProjects.length} 
            sort={sort} 
            onSortChange={setSort} 
            onFilterClick={() => setMobileFiltersOpen(true)}
          />
          <ProjectGrid projects={filteredProjects} onClearFilters={clearFilters} />
        </div>
      </div>

      {/* Mobile Filters */}
      <FilterDrawer 
         isOpen={!isDesktop && mobileFiltersOpen} 
         onClose={() => setMobileFiltersOpen(false)} 
         filters={filters} 
         onChange={setFilters} 
      />
    </div>
  );
}
