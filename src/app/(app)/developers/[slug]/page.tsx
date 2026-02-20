import { notFound } from "next/navigation";
import Link from "next/link";
import { developers } from "@/data/developers";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/marketplace/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Globe, ArrowLeft } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

// In Next.js 15, params are awaited in Server Components, but in 14 they are props.
// Assuming Next.js 14+ based on "App Router".
// For static generation:
export function generateStaticParams() {
  return developers.map((dev) => ({ slug: dev.slug }));
}

export default function DeveloperProfilePage({ params }: PageProps) {
  const developer = developers.find((d) => d.slug === params.slug);

  if (!developer) {
    notFound();
  }

  const devProjects = projects.filter((p) => p.devSlugs.includes(developer.slug));

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <Link href="/developers" className="inline-flex items-center text-sm text-text-2 hover:text-gold transition-colors mb-8">
         <ArrowLeft className="h-4 w-4 mr-1" />
         Back to directory
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
         <div className="relative shrink-0">
            <img 
              src={developer.avatarUrl} 
              alt={developer.name} 
              className="w-32 h-32 rounded-full border-4 border-surface-2 shadow-xl object-cover bg-bg-1"
            />
         </div>
         <div className="flex-1 space-y-4">
            <div>
               <h1 className="text-4xl font-bold font-display tracking-tight text-white mb-2">{developer.name}</h1>
               <p className="text-xl text-gold">{developer.tagline}</p>
            </div>
            
            <p className="text-text-2 max-w-2xl leading-relaxed">{developer.bio}</p>

            <div className="flex flex-wrap gap-2">
               {developer.roles.map(role => <Badge key={role} variant="secondary">{role}</Badge>)}
               {developer.chains.map(chain => <Badge key={chain} variant="chain" className="capitalize">{chain}</Badge>)}
            </div>

            <div className="flex gap-4 pt-2">
               {developer.links.twitter && (
                  <a href={developer.links.twitter} target="_blank" rel="noopener noreferrer">
                     <Button variant="ghost" size="sm" className="bg-surface border border-white/10"><Twitter className="h-4 w-4 mr-2" /> Twitter</Button>
                  </a>
               )}
               {developer.links.github && (
                  <a href={developer.links.github} target="_blank" rel="noopener noreferrer">
                     <Button variant="ghost" size="sm" className="bg-surface border border-white/10"><Github className="h-4 w-4 mr-2" /> GitHub</Button>
                  </a>
               )}
               {developer.links.website && (
                  <a href={developer.links.website} target="_blank" rel="noopener noreferrer">
                     <Button variant="ghost" size="sm" className="bg-surface border border-white/10"><Globe className="h-4 w-4 mr-2" /> Website</Button>
                  </a>
               )}
            </div>
         </div>
      </div>

      {/* Skills */}
      <section>
         <h2 className="text-lg font-semibold mb-4 text-white">Skills</h2>
         <div className="flex flex-wrap gap-2">
            {developer.skills.map(skill => (
               <Badge key={skill} variant="tag" className="px-3 py-1 bg-surface-2">{skill}</Badge>
            ))}
         </div>
      </section>

      {/* Portfolio */}
      <section>
         <h2 className="text-2xl font-bold font-display tracking-tight mb-8 text-white">Portfolio</h2>
         {devProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {devProjects.map(p => (
                  <ProjectCard key={p.slug} project={p} />
               ))}
            </div>
         ) : (
            <p className="text-text-3 italic">No projects listed yet.</p>
         )}
      </section>
    </div>
  );
}
