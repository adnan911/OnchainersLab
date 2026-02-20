"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiselect";
import { DeveloperCard } from "@/components/developers/developer-card";
import { EmptyState } from "@/components/ui/empty-state";
import { developers as allDevelopers } from "@/data/developers";
import { applyDeveloperFilters } from "@/lib/filters";
import { Search } from "lucide-react";
import { CHAINS } from "@/lib/constants";

export default function DevelopersPage() {
  const [q, setQ] = React.useState("");
  const [chains, setChains] = React.useState<string[]>([]);
  
  const chainOptions = CHAINS.map(c => ({ label: c.label, value: c.value }));

  // Using a useMemo to filter results
  const filteredDevs = React.useMemo(() => {
     return applyDeveloperFilters(allDevelopers, { q, chains });
  }, [q, chains]);

  const handleClearFilters = () => {
    setQ("");
    setChains([]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold font-display tracking-tight text-white">Developers</h1>
        <p className="text-text-2">Find the best builders in the ecosystem.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-white/10 bg-surface">
           <div className="flex-1">
             <Input 
                placeholder="Search by name, role, or bio..." 
                icon={<Search className="h-4 w-4" />}
                value={q}
                onChange={(e) => setQ(e.target.value)}
             />
           </div>
           <div className="w-full sm:w-64">
              <MultiSelect 
                 options={chainOptions} 
                 selected={chains} 
                 onChange={setChains} 
                 placeholder="Filter by chain..." 
              />
           </div>
        </div>
      </div>

      {filteredDevs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDevs.map((dev) => (
            <DeveloperCard key={dev.slug} developer={dev} />
          ))}
        </div>
      ) : (
        <EmptyState 
           title="No developers found" 
           description="Try adjusting your search terms." 
           action={
             <button onClick={handleClearFilters} className="text-gold hover:underline">
               Clear filters
             </button>
           }
        />
      )}
    </div>
  );
}
