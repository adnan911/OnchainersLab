import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "elevated" | "featured";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", ...props }, ref) => {
    const baseStyles = "rounded-xl border transition-all duration-300";

    const variants = {
      glass: "bg-surface border-white/10 shadow-sm hover:translate-y-[-2px] hover:border-white/20 hover:shadow-md backdrop-blur-md",
      elevated: "bg-surface-2 border-white/10 shadow-md hover:translate-y-[-2px] hover:border-white/20 hover:shadow-lg backdrop-blur-xl",
      featured: "bg-surface border-gold/30 shadow-glow-gold hover:border-gold/50 hover:shadow-lg",
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
Card.displayName = "Card";

export { Card };
