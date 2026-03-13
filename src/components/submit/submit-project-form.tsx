"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multiselect";
import { PROJECT_TYPES, PROJECT_STATUS, INITIAL_TAGS, CHAINS } from "@/lib/constants";
import { Project } from "@/types";
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

    // Post to API
    try {
      const newProjectData = {
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        status: "coming_soon",
        createdAt: new Date().toISOString(),
        chains: formData.chains || [],
        types: formData.types || (formData.type ? [formData.type] : []),
        tags: formData.tags || [],
        devSlugs: formData.devSlugs || [],
        links: formData.links || {},
        media: formData.media || { coverUrl: "" },
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjectData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit project');
      }

      toast({ title: "Success", description: "Project submitted successfully!", type: "success" });
      setFormData({ chains: [], types: [], tags: [], devSlugs: [], media: { coverUrl: "" } });
      onSuccess();
    } catch (err: any) {
      console.error("Submission error", err);
      toast({ title: "Error", description: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
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

        <div className="grid sm:grid-cols-2 gap-4">
           <Input 
              label="Live URL" 
              value={formData.links?.liveUrl || ""} 
              onChange={e => setFormData({...formData, links: { ...formData.links, liveUrl: e.target.value }})}
              placeholder="https://app.xyz"
           />
           <Input 
              label="Website" 
              value={formData.links?.website || ""} 
              onChange={e => setFormData({...formData, links: { ...formData.links, website: e.target.value }})}
              placeholder="https://xyz.com"
           />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input 
             label="GitHub URL" 
             value={formData.links?.github || ""} 
             onChange={e => setFormData({...formData, links: { ...formData.links, github: e.target.value }})}
             placeholder="https://github.com/..."
          />
          <Input 
             label="Cover Image URL" 
             value={formData.media?.coverUrl || ""} 
             onChange={e => setFormData({...formData, media: { ...formData.media, coverUrl: e.target.value }})}
             placeholder="https://..."
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Draft"}
      </Button>
    </form>
  );
}
