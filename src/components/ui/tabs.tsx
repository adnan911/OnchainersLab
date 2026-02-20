import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  items: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className }: TabsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % items.length;
      onChange(items[nextIndex].id);
      (containerRef.current?.children[nextIndex] as HTMLElement)?.focus();
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + items.length) % items.length;
      onChange(items[prevIndex].id);
      (containerRef.current?.children[prevIndex] as HTMLElement)?.focus();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn("flex items-center border-b border-white/10", className)} 
      role="tablist"
    >
      {items.map((item, index) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "relative px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-t-md",
              isActive ? "text-text-1" : "text-text-2 hover:text-text-1 hover:bg-white/5"
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold animate-in fade-in zoom-in-50 duration-200" />
            )}
          </button>
        );
      })}
    </div>
  );
}
