"use client";

import { SubmissionStore } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface PendingSubmissionsListProps {
  submissions: SubmissionStore;
  onDeleteProject: (slug: string) => void;
  onDeleteDeveloper: (slug: string) => void;
}

export function PendingSubmissionsList({ submissions, onDeleteProject, onDeleteDeveloper }: PendingSubmissionsListProps) {
  const hasSubmissions = submissions.projects.length > 0 || submissions.developers.length > 0;

  if (!hasSubmissions) return null;

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <h2 className="text-xl font-bold font-display tracking-tight text-white mb-6">Pending Submissions (Local)</h2>
      
      <div className="space-y-6">
        {submissions.projects.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-text-2 mb-3">Projects</h3>
            <div className="space-y-3">
              {submissions.projects.map(p => (
                <div key={p.slug} className="flex items-center justify-between p-4 rounded-lg bg-surface border border-white/10">
                  <div>
                    <h4 className="font-semibold text-text-1">{p.name}</h4>
                    <p className="text-sm text-text-2">{p.oneLiner}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="status">Draft</Badge>
                    <Button variant="ghost" size="sm" onClick={() => onDeleteProject(p.slug)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {submissions.developers.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-text-2 mb-3">Developers</h3>
            <div className="space-y-3">
              {submissions.developers.map(d => (
                <div key={d.slug} className="flex items-center justify-between p-4 rounded-lg bg-surface border border-white/10">
                   <div>
                    <h4 className="font-semibold text-text-1">{d.name}</h4>
                    <p className="text-sm text-text-2">{d.tagline}</p>
                   </div>
                   <div className="flex items-center gap-3">
                    <Badge variant="status">Draft</Badge>
                    <Button variant="ghost" size="sm" onClick={() => onDeleteDeveloper(d.slug)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
