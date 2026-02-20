"use client";

import * as React from "react";
import { FilterPanel } from "@/components/layout/filter-panel";
import { FilterDrawer } from "@/components/layout/filter-drawer";
import { ResultsHeader } from "@/components/marketplace/results-header";
import { ProjectGrid } from "@/components/marketplace/project-grid";
import { projects as allProjects } from "@/data/projects";
import { applyProjectFilters, sortProjects, ProjectFilters } from "@/lib/filters";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function MarketplacePage() {
  const [filters, setFilters] = React.useState<ProjectFilters>({});
  const [sort, setSort] = React.useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Filter logic
  const filteredProjects = React.useMemo(() => {
    return sortProjects(applyProjectFilters(allProjects, filters), sort as any);
  }, [filters, sort]);

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
         <ResultsHeader 
            count={filteredProjects.length} 
            sort={sort} 
            onSortChange={setSort} 
            onFilterClick={() => setMobileFiltersOpen(true)}
         />
         <ProjectGrid projects={filteredProjects} onClearFilters={clearFilters} />
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
