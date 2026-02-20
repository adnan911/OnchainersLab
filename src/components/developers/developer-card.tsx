import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Developer } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface DeveloperCardProps {
  developer: Developer;
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <Card variant="glass" className="p-6 flex flex-col items-center text-center hover:bg-surface-2 transition-colors group relative">
       <Link href={`/developers/${developer.slug}`} className="absolute inset-0 z-0">
          <span className="sr-only">View profile</span>
       </Link>
       
       <div className="relative mb-4">
          <img
            src={developer.avatarUrl}
            alt={developer.name}
            className="w-20 h-20 rounded-full border-2 border-white/10 group-hover:border-gold/50 transition-colors object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-bg-0 rounded-full p-1">
             {/* Chain icon or something could go here */}
          </div>
       </div>

       <h3 className="text-lg font-bold font-display tracking-tight mb-1 text-text-1 group-hover:text-gold transition-colors">
         {developer.name}
       </h3>
       
       <p className="text-xs font-medium text-gold mb-3 uppercase tracking-wide">
         {developer.roles[0]}
       </p>
       
       <p className="text-sm text-text-2 mb-4 line-clamp-2">
         {developer.tagline}
       </p>

       <div className="flex flex-wrap gap-1.5 justify-center mt-auto">
          {developer.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="tag" className="bg-white/5 border-transparent text-[10px]">
              {skill}
            </Badge>
          ))}
       </div>
    </Card>
  );
}
