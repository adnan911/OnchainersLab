import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children, footer }: DrawerProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleMouseDown = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onMouseDown={handleMouseDown}
      className={cn(
        "bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm",
        "fixed bottom-0 right-0 top-0 z-50 m-0 h-full max-h-screen w-full max-w-md translate-x-full transition-transform duration-300 open:translate-x-0 ml-auto",
        "border-l border-white/10 shadow-2xl"
      )}
    >
      <div className="flex h-full flex-col bg-bg-1 text-text-1">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-lg font-semibold font-display tracking-tight">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close drawer">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {children}
        </div>
        {footer && (
          <div className="border-t border-white/10 bg-bg-1 px-4 py-4">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
