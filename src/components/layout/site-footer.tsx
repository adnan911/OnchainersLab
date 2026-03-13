import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-bg-1 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
           <div>
            <h3 className="text-sm font-semibold text-text-1 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-text-2">
              <li>
                <Link href="/marketplace" className="hover:text-gold transition-colors">
                  Lab Store
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-gold transition-colors">
                  Developers
                </Link>
              </li>
            </ul>
           </div>
           <div>
            <h3 className="text-sm font-semibold text-text-1 mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-text-2">
              <li><a href="#" className="hover:text-gold">Discord</a></li>
              <li><a href="#" className="hover:text-gold">Telegram</a></li>
            </ul>
           </div>
           <div>
            <h3 className="text-sm font-semibold text-text-1 mb-4">Submit</h3>
            <ul className="space-y-2 text-sm text-text-2">
              <li><Link href="/submit?type=project" className="hover:text-gold">Submit Project</Link></li>
              <li><Link href="/submit?type=developer" className="hover:text-gold">Submit Developer</Link></li>
            </ul>
           </div>
           <div>
            <h3 className="text-sm font-semibold text-text-1 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-text-2">
              <li><Link href="/legal/privacy" className="hover:text-gold">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-gold">Terms of Service</Link></li>
            </ul>
           </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-3">© {new Date().getFullYear()} OnChainers Lab.</p>
          <p className="text-xs text-text-3">Built for Solana and Base.</p>
        </div>
      </div>
    </footer>
  );
}
