import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, icon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-text-2 transition-colors group-focus-within:text-gold"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-2 group-focus-within:text-gold transition-colors">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-text-1 placeholder:text-text-3 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:border-gold/50",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error && "border-red-500/50 focus-visible:ring-red-500/50",
              className
            )}
            {...props}
          />
        </div>
        {helperText && !error && (
          <p className="text-xs text-text-3">{helperText}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
