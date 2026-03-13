"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, Upload, MessageSquare, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

const NAV_ITEMS = [
  { href: "/marketplace", label: "Lab Store", icon: LayoutGrid },
  { href: "/developers", label: "Developers", icon: Users },
  { href: "/submit", label: "Submit", icon: Upload },
  { href: "/community", label: "Community", icon: MessageSquare },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const NavContent = () => (
    <nav className="space-y-1 p-4">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-gold/10 text-gold"
                : "text-text-2 hover:bg-white/5 hover:text-text-1"
            )}
            onClick={() => setMobileNavOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-bg-0">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-bg-1/50 backdrop-blur-xl fixed h-full z-30">
        <div className="flex h-16 items-center px-6 border-b border-white/10">
           <Link href="/" className="text-lg font-bold font-display tracking-tight text-white">
            OnChainers Lab
           </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <NavContent />
        </div>
      </aside>

      {/* Mobile/Tablet Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-bg-1/80 backdrop-blur-md px-4">
         <Link href="/" className="text-lg font-bold font-display tracking-tight text-white">
            OnChainers Lab
         </Link>
         <Button variant="ghost" size="sm" onClick={() => setMobileNavOpen(true)}>
           <Menu className="h-5 w-5" />
         </Button>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0">
        <div className="container max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Nav Drawer */}
      <Drawer
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="Menu"
      >
        <NavContent />
      </Drawer>
    </div>
  );
}
