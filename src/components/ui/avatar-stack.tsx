import React from "react";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
  avatars: { src: string; alt: string }[];
  limit?: number;
  className?: string;
}

export function AvatarStack({ avatars, limit = 3, className }: AvatarStackProps) {
  const visibleAvatars = avatars.slice(0, limit);
  const remainingCount = avatars.length - limit;

  return (
    <div className={cn("flex items-center -space-x-2 isolate", className)}>
      {visibleAvatars.map((avatar, i) => (
        <div 
          key={i} 
          className="relative inline-block h-8 w-8 rounded-full border-2 border-bg-0 bg-surface overflow-hidden hover:z-10 transition-transform hover:scale-110"
        >
          {/* Use specific sizing for next/image if possible, but standard img for primitive now */}
          <img
            src={avatar.src}
            alt={avatar.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg-0 bg-surface-2 text-xs font-semibold text-text-2 hover:bg-surface hover:text-text-1 transition-colors z-0">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
