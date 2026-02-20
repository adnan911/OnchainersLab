import * as React from "react";
import { cn } from "@/lib/utils";
import { FolderSearch } from "lucide-react";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-surface/50 p-8 text-center animate-in fade-in zoom-in-95 duration-500",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 border border-white/5">
        {icon || <FolderSearch className="h-6 w-6 text-text-3" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-1 font-display tracking-tight">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-text-3">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
