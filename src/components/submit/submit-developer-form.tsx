"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multiselect";
import { CHAINS } from "@/lib/constants";
import { Developer } from "@/types";
import { useToast } from "@/components/ui/toast";

export function SubmitDeveloperForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<Partial<Developer>>({
    chains: [],
    roles: [],
    skills: [],
    links: {},
  });
  
  // Custom Role Input
  const [roleInput, setRoleInput] = React.useState("");

  const handleAddRole = () => {
     if (roleInput && !formData.roles?.includes(roleInput)) {
        setFormData({ ...formData, roles: [...(formData.roles || []), roleInput] });
        setRoleInput("");
     }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.tagline) {
        toast({ title: "Error", description: "Please fill in all required fields.", type: "error" });
        setLoading(false);
        return;
    }

    // Post to API
    try {
      const newDevData = {
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        featuredProjectSlugs: [],
        chains: formData.chains || [],
        roles: formData.roles || [],
        skills: formData.skills || [],
        links: formData.links || {},
        avatarUrl: formData.avatarUrl || "https://github.com/shadcn.png",
      };

      const res = await fetch('/api/developers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDevData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit profile');
      }

      toast({ title: "Success", description: "Developer profile submitted successfully!", type: "success" });
      setFormData({ chains: [], roles: [], skills: [], links: {} });
      onSuccess();
    } catch (err: any) {
      console.error("Submission error", err);
      toast({ title: "Error", description: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <Input 
           label="Name *" 
           value={formData.name || ""} 
           onChange={e => setFormData({...formData, name: e.target.value})}
           required
        />
        
        <Input 
           label="Tagline *" 
           value={formData.tagline || ""} 
           onChange={e => setFormData({...formData, tagline: e.target.value})}
           maxLength={100}
           required
        />

        <div>
           <Input 
             label="Roles (Press Enter to add)" 
             value={roleInput}
             onChange={e => setRoleInput(e.target.value)}
             onKeyDown={e => {
                if (e.key === 'Enter') {
                   e.preventDefault();
                   handleAddRole();
                }
             }}
             placeholder="e.g. Frontend, Founder"
           />
           <div className="flex flex-wrap gap-2 mt-2">
              {formData.roles?.map(role => (
                 <span key={role} className="bg-surface border border-white/10 px-2 py-1 rounded text-xs text-text-2">
                    {role} 
                    <button type="button" onClick={() => setFormData({...formData, roles: formData.roles?.filter(r => r !== role)})} className="ml-2 text-red-400 hover:text-red-300">×</button>
                 </span>
              ))}
           </div>
        </div>

        <div className="space-y-1.5">
           <span className="block text-xs font-semibold text-text-2">Chains</span>
           <MultiSelect 
              options={CHAINS.map(c => ({ label: c.label, value: c.value }))}
              selected={formData.chains || []}
              onChange={vals => setFormData({...formData, chains: vals as any})}
           />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
           <Input 
              label="Website" 
              value={formData.links?.website || ""} 
              onChange={e => setFormData({...formData, links: { ...formData.links, website: e.target.value }})}
              placeholder="https://xyz.com"
           />
           <Input 
              label="GitHub" 
              value={formData.links?.github || ""} 
              onChange={e => setFormData({...formData, links: { ...formData.links, github: e.target.value }})}
              placeholder="https://github.com/..."
           />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
           <Input 
              label="Twitter (X)" 
              value={formData.links?.twitter || ""} 
              onChange={e => setFormData({...formData, links: { ...formData.links, twitter: e.target.value }})}
              placeholder="https://twitter.com/..."
           />
           <Input 
              label="Avatar URL" 
              value={formData.avatarUrl || ""} 
              onChange={e => setFormData({...formData, avatarUrl: e.target.value})}
              placeholder="https://..."
           />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
