"use client";

import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToastProvider, useToast } from '@/components/ui/toast';

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = React.useState("projects");
  const [view, setView] = React.useState<"pending" | "live">("pending");
  const [data, setData] = React.useState<{ projects: any[], developers: any[] }>({ projects: [], developers: [] });
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = view === "pending" ? '/api/admin/pending' : '/api/admin/live';
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      console.log(`Admin fetched ${view} data:`, json);
      setData(json);
    } catch (err: any) {
      console.error("Failed to fetch data", err);
      toast({ title: "Error", description: err.message || "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [view]);

  const handleAction = async (id: string, type: 'project' | 'developer', action: 'approve' | 'reject' | 'hide') => {
    console.log(`Admin Action: ${action} on ${type} with ID ${id}`);
    try {
      let res;
      if (action === 'reject') {
        res = await fetch(`/api/admin/submissions/${id}?type=${type}`, { 
          method: 'DELETE',
          cache: 'no-store'
        });
      } else {
        res = await fetch(`/api/admin/submissions/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, approved: action === 'approve' }),
          cache: 'no-store'
        });
      }

      const result = await res.json();
      console.log(`Action ${action} response:`, result);

      if (!res.ok) throw new Error(result.error || `Failed to ${action}`);

      toast({ 
        title: "Success", 
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
          action === 'approve' ? 'approved' : action === 'hide' ? 'hidden' : 'deleted'
        } successfully!`
      });
      fetchData();
    } catch (err: any) {
       console.error(`Action ${action} failed:`, err);
       toast({ title: "Error", description: err.message, type: "error" });
    }
  };

  const items = activeTab === "projects" ? data.projects : data.developers;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold font-display text-white mb-2">Admin Dashboard</h1>
          <p className="text-text-2">Manage marketplace submissions and live content.</p>
        </div>
        
        <div className="flex bg-bg-1/50 border border-white/5 rounded-lg p-1">
          <button 
            onClick={() => setView("pending")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === "pending" ? "bg-primary text-white" : "text-text-2 hover:text-white"}`}
          >
            Review Pending
          </button>
          <button 
            onClick={() => setView("live")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === "live" ? "bg-primary text-white" : "text-text-2 hover:text-white"}`}
          >
            Manage Live
          </button>
        </div>
      </div>

      <Tabs 
        items={[
          { id: "projects", label: `Projects (${data.projects.length})` },
          { id: "developers", label: `Developers (${data.developers.length})` }
        ]}
        activeId={activeTab}
        onChange={setActiveTab}
        className="mb-8"
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.length === 0 ? (
            <div className="bg-bg-1/50 border border-white/5 rounded-xl p-10 text-center">
              <p className="text-text-2 italic">No {view === "pending" ? "pending" : "live"} {activeTab} at the moment.</p>
            </div>
          ) : (
            items.map((item: any) => (
              <div key={item.id} className="bg-bg-1/50 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <Badge variant="secondary">{item.type || item.roles?.[0] || 'Member'}</Badge>
                  </div>
                  <p className="text-text-2 text-sm max-w-xl">{item.oneLiner || item.tagline || item.bio?.substring(0, 100) + '...'}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleAction(item.id, activeTab === "projects" ? 'project' : 'developer', 'reject')}
                  >
                    Delete
                  </Button>
                  
                  {view === "pending" ? (
                    <Button 
                      size="sm" 
                      onClick={() => handleAction(item.id, activeTab === "projects" ? 'project' : 'developer', 'approve')}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary"
                      size="sm" 
                      onClick={() => handleAction(item.id, activeTab === "projects" ? 'project' : 'developer', 'hide')}
                    >
                      Hide from Site
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ToastProvider>
      <AdminDashboardContent />
    </ToastProvider>
  );
}
