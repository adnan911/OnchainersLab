import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "tag" | "chain" | "type" | "status" | "featured" | "secondary";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "tag", ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variants = {
      tag: "bg-surface border border-white/10 text-text-2 hover:bg-white/10",
      secondary: "bg-surface-2 border border-white/10 text-text-2 hover:bg-surface hover:text-text-1",
      chain: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      type: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      status: "bg-green-500/10 text-green-400 border border-green-500/20",
      featured: "bg-gold/10 text-gold border border-gold/30 shadow-[0_0_10px_rgba(245,196,81,0.2)]",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
