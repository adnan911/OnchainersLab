"use client";

import * as React from "react";
import { FilterPanel } from "./filter-panel";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ProjectFilters } from "@/lib/filters";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
}

export function FilterDrawer({ isOpen, onClose, filters, onChange }: FilterDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Filters">
      <div className="p-4 pb-20">
        <FilterPanel filters={filters} onChange={onChange} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg-1 border-t border-white/10">
        <Button className="w-full" onClick={onClose}>
          Show Results
        </Button>
      </div>
    </Drawer>
  );
}
