import { CheckCircle2 } from "lucide-react";

const BENEFITS = [
  "Wallet-based identity and profiles",
  "Verifiable rewards and progression",
  "Composable assets and integrations",
  "Transparent ownership and provenance",
  "Community-first iteration",
];

export function WhyOnchain() {
  return (
    <section className="py-16 md:py-24 bg-bg-1/50 border-y border-white/5">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[1200px]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-12">Why onchain?</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-2xl mx-auto">
            {BENEFITS.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-text-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
