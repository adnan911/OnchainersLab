import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-bg-0/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold font-display tracking-tight text-white">OnChainers Lab</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-2">
            <Link href="/marketplace" className="hover:text-gold transition-colors">
              Marketplace
            </Link>
            <Link href="/developers" className="hover:text-gold transition-colors">
              Developers
            </Link>
            <Link href="/community" className="hover:text-gold transition-colors">
              Community
            </Link>
            <Link href="/submit" className="hover:text-gold transition-colors">
              Submit
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
           {/* Mobile Menu Trigger would go here */}
          <Link href="/community" className="hidden sm:block">
             <Button variant="ghost" size="sm">Join Community</Button>
          </Link>
          <Link href="/marketplace">
            <Button size="sm">Explore Marketplace</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
