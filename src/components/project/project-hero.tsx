import Link from "next/link";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Twitter, Globe, MessageSquare } from "lucide-react";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { developers } from "@/data/developers";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const projectDevs = (project.devSlugs || [])
    .filter((slug) => developers.some(d => d.slug === slug))
    .map((slug) => {
      const d = developers.find(dev => dev.slug === slug)!;
      return { src: d.avatarUrl, alt: d.name };
    });

  return (
    <div className="space-y-8">
      {/* Cover Image */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-bg-1 border border-white/10">
        <img
          src={project.media.coverUrl}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
           <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="status" className="bg-white/10 backdrop-blur-md border-white/20">{project.status === "coming_soon" ? "Coming Soon" : project.status}</Badge>
              <Badge variant="type" className="bg-white/10 backdrop-blur-md border-white/20 capitalize">{project.type}</Badge>
              {project.chains.map(chain => (
                 <Badge key={chain} variant="chain" className="backdrop-blur-md capitalize">{chain}</Badge>
              ))}
           </div>
           <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white mb-2">{project.name}</h1>
           <p className="text-lg md:text-xl text-text-2 max-w-2xl">{project.oneLiner}</p>
        </div>
      </div>

      {/* Actions & Info */}
      <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
         <div className="flex-1 space-y-6">
            <div className="flex gap-3 flex-wrap">
               {project.links.liveUrl && (
                  <a href={project.links.liveUrl} target="_blank" rel="noopener noreferrer">
                     <Button size="lg" className="w-full sm:w-auto">
                        Open Project <ExternalLink className="ml-2 h-4 w-4" />
                     </Button>
                  </a>
               )}
               {project.links.website && (
                  <a href={project.links.website} target="_blank" rel="noopener noreferrer">
                     <Button variant="secondary" size="lg">Website</Button>
                  </a>
               )}
            </div>
            
            <div className="flex gap-4">
               {project.links.twitter && (
                  <a href={project.links.twitter} target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-gold transition-colors">
                     <Twitter className="h-5 w-5" />
                  </a>
               )}
               {project.links.discord && (
                  <a href={project.links.discord} target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-gold transition-colors">
                     <MessageSquare className="h-5 w-5" />
                  </a>
               )}
               {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-gold transition-colors">
                     <Github className="h-5 w-5" />
                  </a>
               )}
            </div>

            <div className="pt-4 border-t border-white/10 max-w-2xl">
               <h3 className="text-lg font-semibold mb-2 text-text-1">About</h3>
               <p className="text-text-2 leading-relaxed whitespace-pre-line">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
               {project.tags.map(tag => (
                  <Badge key={tag} variant="tag">{tag}</Badge>
               ))}
            </div>
         </div>

         <div className="w-full md:w-72 bg-surface border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4 text-text-2 uppercase tracking-wide">Builders</h3>
            <div className="flex items-center justify-between mb-4">
               <AvatarStack avatars={projectDevs} />
               {(project.devSlugs || []).length > 0 && (
                 <Link href={`/developers/${project.devSlugs[0]}`} className="text-xs text-gold hover:underline">
                    View Profiles
                 </Link>
               )}
            </div>
            <div className="space-y-2">
               {(project.devSlugs || []).map(slug => {
                  const dev = developers.find(d => d.slug === slug);
                  return dev ? (
                    <Link key={slug} href={`/developers/${slug}`} className="block group">
                       <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                          <img src={dev.avatarUrl} alt={dev.name} className="w-8 h-8 rounded-full" />
                          <div>
                             <p className="text-sm font-medium text-text-1 group-hover:text-gold">{dev.name}</p>
                             <p className="text-xs text-text-3 truncate w-32">{dev.roles[0]}</p>
                          </div>
                       </div>
                    </Link>
                  ) : null;
               })}
            </div>
         </div>
      </div>
    </div>
  );
}
