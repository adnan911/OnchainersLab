
// Wait, I don't have Accordion primitive!
// I'll build a simple custom Accordion for FAQ or use details/summary styled.
// Since I promised "UI primitives" and Accordion wasn't strictly in the first list but used in Landing,
// I'll implement a simple one here locally or use <details> for simplicity and a11y.

import { ChevronDown } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      q: 'What does "onchain" mean here?',
      a: "Our projects use blockchain as a core feature—identity, rewards, ownership, or verifiable actions—rather than a superficial add-on.",
    },
    {
      q: "Are your games free to play?",
      a: "Many are free to try. Some features may require a wallet connection depending on the project.",
    },
    {
      q: "Which wallets do you support?",
      a: "It depends on the chain. Each project page lists supported wallets and links.",
    },
    {
      q: "Can I submit my project or profile?",
      a: "Yes. Use the Submit page to share your project or developer profile.",
    },
    {
      q: "What chains are next?",
      a: "Solana and Base are first. We’ll expand as we ship and validate demand.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-bg-1/30 border-t border-white/5">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[800px]">
        <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-12 text-center">FAQ</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-white/10 bg-surface rounded-lg open:bg-surface-2 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-text-1 marker:content-none focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-lg">
                {faq.q}
                <ChevronDown className="h-5 w-5 text-text-3 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-text-2 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
