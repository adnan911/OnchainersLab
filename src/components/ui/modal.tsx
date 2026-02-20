import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

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
        "fixed inset-0 z-50 m-auto w-full max-w-lg rounded-xl border border-white/10 shadow-2xl transition-all duration-300 open:animate-in open:fade-in open:zoom-in-95 backdrop:animate-in backdrop:fade-in"
      )}
    >
      <div className="flex flex-col bg-bg-1 text-text-1 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold font-display tracking-tight">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-6 py-6">
          {children}
        </div>
        {footer && (
          <div className="border-t border-white/10 bg-bg-0/50 px-6 py-4 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
