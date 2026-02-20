"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multiselect";
import { CHAINS, PROJECT_TYPES, PROJECT_STATUS, INITIAL_TAGS } from "@/lib/constants";
import { Project } from "@/types";
import { saveProjectSubmission } from "@/lib/storage";
import { useToast } from "@/components/ui/toast";
import { developers } from "@/data/developers";

export function SubmitProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<Project>>({
    chains: [],
    types: [],
    tags: [],
    devSlugs: [],
    media: { coverUrl: "" },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.oneLiner || !formData.type) {
        toast({ title: "Error", description: "Please fill in all required fields.", type: "error" });
        setLoading(false);
        return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newProject = {
      ...formData,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      status: "coming_soon", // Default for submissions
      createdAt: new Date().toISOString(),
      // Ensure required arrays are present
      chains: formData.chains || [],
      types: formData.types || (formData.type ? [formData.type] : []),
      tags: formData.tags || [],
      devSlugs: formData.devSlugs || [],
      links: formData.links || {},
      media: formData.media || { coverUrl: "" },
    } as Project;

    saveProjectSubmission(newProject);
    toast({ title: "Success", description: "Project draft saved locally!", type: "success" });
    onSuccess();
    setLoading(false);
  };

  const devOptions = developers.map(d => ({ label: d.name, value: d.slug }));
  const tagOptions = INITIAL_TAGS.map(t => ({ label: t, value: t }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <Input 
           label="Project Name *" 
           value={formData.name || ""} 
           onChange={e => setFormData({...formData, name: e.target.value})}
           required
        />
        
        <Input 
           label="One Liner *" 
           value={formData.oneLiner || ""} 
           onChange={e => setFormData({...formData, oneLiner: e.target.value})}
           placeholder="Short description (max 80 chars)"
           maxLength={80}
           required
        />

        <div className="grid sm:grid-cols-2 gap-4">
           <Select 
              label="Primary Type *" 
              value={formData.type || ""} 
              onChange={e => setFormData({...formData, type: e.target.value as any})}
              options={[{label: "Select type", value: ""}, ...PROJECT_TYPES]}
              required
           />
           
           <div className="space-y-1.5">
             <span className="block text-xs font-semibold text-text-2">Chains</span>
             <MultiSelect 
                options={CHAINS.map(c => ({ label: c.label, value: c.value }))}
                selected={formData.chains || []}
                onChange={vals => setFormData({...formData, chains: vals as any})}
             />
           </div>
        </div>

        <div>
           <span className="block text-xs font-semibold text-text-2 mb-1.5">Developers</span>
           <MultiSelect 
              options={devOptions}
              selected={formData.devSlugs || []}
              onChange={vals => setFormData({...formData, devSlugs: vals})}
           />
        </div>

        <div>
           <span className="block text-xs font-semibold text-text-2 mb-1.5">Tags</span>
           <MultiSelect 
              options={tagOptions}
              selected={formData.tags || []}
              onChange={vals => setFormData({...formData, tags: vals})}
           />
        </div>

        <Input 
           label="Cover Image URL" 
           value={formData.media?.coverUrl || ""} 
           onChange={e => setFormData({...formData, media: { ...formData.media, coverUrl: e.target.value }})}
           placeholder="https://..."
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Draft"}
      </Button>
    </form>
  );
}
