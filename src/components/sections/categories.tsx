import Link from "next/link";
import { Gamepad2, Hammer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1200px]">
        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-12 text-center">Browse by category</h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card variant="glass" className="p-8 group hover:border-gold/30 transition-colors relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Gamepad2 className="w-32 h-32 text-gold rotate-12" />
             </div>
             <div className="relative z-10">
               <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6 text-gold mb-6 border border-gold/20">
                 <Gamepad2 className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold font-display mb-2">Games</h3>
               <p className="text-text-2 mb-8 max-w-xs">Fast, fun, wallet-native experiences.</p>
               <Link href="/marketplace?type=game">
                 <Button variant="secondary" className="group-hover:bg-gold/10 group-hover:text-gold group-hover:border-gold/30">Browse Games</Button>
               </Link>
             </div>
          </Card>

          <Card variant="glass" className="p-8 group hover:border-blue-400/30 transition-colors relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Hammer className="w-32 h-32 text-blue-400 -rotate-12" />
             </div>
             <div className="relative z-10">
               <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-400 mb-6 border border-blue-500/20">
                 <Hammer className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold font-display mb-2">Tools</h3>
               <p className="text-text-2 mb-8 max-w-xs">Practical utilities for builders and communities.</p>
               <Link href="/marketplace?type=tool">
                 <Button variant="secondary" className="group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/30">Browse Tools</Button>
               </Link>
             </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
