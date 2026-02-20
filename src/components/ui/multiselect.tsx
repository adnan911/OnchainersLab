import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleUnselect(value);
    } else {
      onChange([...selected, value]);
    }
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trigger = (
    <div
      className={cn(
        "flex min-h-[40px] w-full items-center justify-between rounded-md border border-white/10 bg-surface px-3 py-2 text-sm ring-offset-bg-0 placeholder:text-text-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setOpen(!open)}
    >
      <div className="flex flex-wrap gap-1">
        {selected.length > 0 ? (
          selected.map((value) => {
            const option = options.find((o) => o.value === value);
            return (
              <Badge key={value} variant="tag" className="mr-1 mb-1">
                {option?.label}
                <button
                  className="ml-1 ring-offset-bg-0 hover:text-text-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-text-3 hover:text-text-1" />
                </button>
              </Badge>
            );
          })
        ) : (
          <span className="text-text-3">{placeholder}</span>
        )}
      </div>
      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
    </div>
  );

  if (isDesktop) {
    return (
      <div className="relative w-full" ref={containerRef}>
        {trigger}
        {open && (
          <div className="absolute top-full z-50 mt-2 w-full min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-bg-1 p-1 text-text-1 shadow-md animate-in fade-in zoom-in-95">
             <div className="max-h-64 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-white/10 hover:text-text-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    selected.includes(option.value) && "bg-white/10 text-gold"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <div className={cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-white/20", selected.includes(option.value) ? "bg-gold border-gold text-bg-0" : "opacity-50")}>
                    {selected.includes(option.value) && <Check className="h-3 w-3" />}
                  </div>
                  <span>{option.label}</span>
                </div>
              ))}
              {options.length === 0 && <p className="p-2 text-sm text-text-3">No options found.</p>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile Drawer
  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Select Options">
        <div className="space-y-2 p-4">
          {options.map((option) => (
             <div
             key={option.value}
             className={cn(
               "flex w-full cursor-pointer items-center justify-between rounded-md border border-white/5 bg-surface-2 p-3 text-sm transition-all active:scale-[0.98]",
               selected.includes(option.value) && "border-gold/50 bg-gold/10 text-gold"
             )}
             onClick={() => handleSelect(option.value)}
           >
             <span className="font-medium">{option.label}</span>
             {selected.includes(option.value) && <Check className="h-4 w-4" />}
           </div>
          ))}
        </div>
        <div className="p-4 pt-2">
            <Button className="w-full" onClick={() => setOpen(false)}>Done</Button>
        </div>
      </Drawer>
    </>
  );
}
