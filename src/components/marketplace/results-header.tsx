import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/constants";
import { SlidersHorizontal } from "lucide-react";

interface ResultsHeaderProps {
  count: number;
  sort: string;
  onSortChange: (value: string) => void;
  onFilterClick: () => void;
}

export function ResultsHeader({ count, sort, onSortChange, onFilterClick }: ResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
      <div className="flex items-center gap-2">
         <h1 className="text-2xl font-bold font-display tracking-tight text-white">Lab Store</h1>
         <span className="text-sm text-text-3 font-medium bg-surface px-2 py-0.5 rounded-full border border-white/5">
            {count}
         </span>
      </div>

      <div className="flex w-full sm:w-auto items-center gap-3">
         <Button variant="secondary" size="sm" className="lg:hidden" onClick={onFilterClick}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
         </Button>
         <div className="w-full sm:w-48">
            <Select
               value={sort}
               onChange={(e) => onSortChange(e.target.value)}
               options={SORT_OPTIONS.map(o => ({ label: `Sort by: ${o.label}`, value: o.value }))}
               className="h-9"
            />
         </div>
      </div>
    </div>
  );
}
