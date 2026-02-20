import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1200px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.1]">
              OnChainers Lab
            </h1>
            <p className="text-lg sm:text-xl text-text-2 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Premium onchain games & tools — built for Solana and Base.
              <span className="block mt-2 text-text-3 text-base">
                Discover our releases, meet the builders, and join the community.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Link href="/marketplace">
                <Button size="lg" className="w-full sm:w-auto px-8">Explor Marketplace</Button>
               </Link>
               <Link href="/community">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">Join Community</Button>
               </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
             <Card variant="elevated" className="p-6 max-w-sm mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500 border-white/10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold font-display tracking-tight text-gold">Now Building</h3>
                    <Badge variant="status" className="bg-green-500/10 text-green-400 border-green-500/20">Live</Badge>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-text-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      10 projects shipped
                    </li>
                    <li className="flex items-center gap-3 text-sm text-text-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      Onchain-first design
                    </li>
                    <li className="flex items-center gap-3 text-sm text-text-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      Solana + Base focus
                    </li>
                  </ul>
                </div>
             </Card>
             {/* Decorative elements */}
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
