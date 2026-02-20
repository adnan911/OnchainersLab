"use client";

import * as React from "react";
import { ProjectFilters } from "@/lib/filters";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multiselect";
import { Button } from "@/components/ui/button";
import { CHAINS, PROJECT_TYPES, PROJECT_STATUS, INITIAL_TAGS } from "@/lib/constants";
import { developers } from "@/data/developers";
import { Search, X } from "lucide-react";

interface FilterPanelProps {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
  className?: string;
}

export function FilterPanel({ filters, onChange, className }: FilterPanelProps) {
  const handleFilterChange = (key: keyof ProjectFilters, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({ q: "", type: "", chain: "", status: "", devs: [], tags: [] });
  };

  const devOptions = developers.map((d) => ({ label: d.name, value: d.slug }));
  const tagOptions = INITIAL_TAGS.map((t) => ({ label: t, value: t }));

  return (
    <div className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-1">Filters</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-8">
            Clear
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Search projects..."
            icon={<Search className="h-4 w-4" />}
            value={filters.q || ""}
            onChange={(e) => handleFilterChange("q", e.target.value)}
          />

          <Select
            label="Type"
            value={filters.type || ""}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            options={[{ label: "All Types", value: "" }, ...PROJECT_TYPES]}
          />

          <Select
            label="Chain"
            value={filters.chain || ""}
            onChange={(e) => handleFilterChange("chain", e.target.value)}
            options={[{ label: "All Chains", value: "" }, ...CHAINS]}
          />

          <Select
            label="Status"
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            options={[{ label: "All Statuses", value: "" }, ...PROJECT_STATUS]}
          />

          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-text-2">Developers</span>
            <MultiSelect
              options={devOptions}
              selected={filters.devs || []}
              onChange={(val) => handleFilterChange("devs", val)}
              placeholder="Select developers..."
            />
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs font-semibold text-text-2">Tags</span>
            <MultiSelect
              options={tagOptions}
              selected={filters.tags || []}
              onChange={(val) => handleFilterChange("tags", val)}
              placeholder="Select tags..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
