import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, ShieldCheck } from "lucide-react";

export default function CommunityPage() {
  const tags = [
    "Onchain gaming",
    "Solana ecosystem",
    "Base ecosystem",
    "Wallet UX",
    "Product design",
    "Memes & fun",
    "Launches",
    "Builder tips",
  ];

  return (
    <div className="flex min-h-screen flex-col bg-bg-0">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-20 text-center">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[800px]">
            <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white mb-6">Community</h1>
            <p className="text-xl text-text-2 mb-8">Join the lab’s discussions on onchain games, tools, and experiments.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <MessageSquare className="h-5 w-5" /> Join Discord
              </Button>
              <Button size="lg" variant="secondary" className="gap-2">
                <Users className="h-5 w-5" /> Join Telegram
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-bg-1/50 border-y border-white/5">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1000px]">
             <h2 className="text-2xl font-bold font-display tracking-tight mb-8 text-center">What we discuss</h2>
             <div className="flex flex-wrap gap-3 justify-center">
                {tags.map(tag => (
                   <Badge key={tag} variant="tag" className="px-4 py-2 text-sm">#{tag}</Badge>
                ))}
             </div>
          </div>
        </section>

        <section className="py-16">
           <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1000px]">
              <Card variant="glass" className="p-8 md:p-12 border-white/10">
                 <div className="flex items-start gap-4 mb-6">
                    <ShieldCheck className="h-8 w-8 text-gold mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold font-display tracking-tight mb-2">Community Guidelines</h2>
                       <p className="text-text-2">To keep the lab productive and fun for everyone.</p>
                    </div>
                 </div>
                 <ul className="space-y-4 ml-12 list-disc text-text-2">
                    <li><strong className="text-text-1">Be respectful:</strong> We’re all here to build and learn.</li>
                    <li><strong className="text-text-1">No scams / phishing:</strong> Zero tolerance for malicious links.</li>
                    <li><strong className="text-text-1">Keep feedback constructive:</strong> Critique the code/design, not the person.</li>
                    <li><strong className="text-text-1">Share sources:</strong> If you post news or alpha, link the source.</li>
                 </ul>
              </Card>
           </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
