"use client";

import * as React from "react";
import { Tabs } from "@/components/ui/tabs";
import { SubmitProjectForm } from "@/components/submit/submit-project-form";
import { SubmitDeveloperForm } from "@/components/submit/submit-developer-form";
import { ToastProvider } from "@/components/ui/toast";

export default function SubmitPage() {
  const [activeTab, setActiveTab] = React.useState("project");

  return (
    <ToastProvider>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold font-display tracking-tight text-white mb-2">Submit to the Lab</h1>
        <p className="text-text-2 mb-8">Share your project or profile with the ecosystem. Your submission will be reviewed and added to the marketplace.</p>

        <Tabs 
           items={[{ id: "project", label: "Submit Project" }, { id: "developer", label: "Submit Developer" }]}
           activeId={activeTab}
           onChange={setActiveTab}
           className="mb-8"
        />

        <div className="bg-bg-1/50 border border-white/5 rounded-xl p-6 md:p-8">
           {activeTab === "project" ? (
              <SubmitProjectForm onSuccess={() => {}} />
           ) : (
              <SubmitDeveloperForm onSuccess={() => {}} />
           )}
        </div>
      </div>
    </ToastProvider>
  );
}
