import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-0">
      <SiteHeader />
      <main className="flex-1 py-20">
        <article className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[800px] prose prose-invert prose-headings:font-display prose-a:text-gold prose-p:text-text-2">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Terms</h2>
          <p>By accessing OnChainers Lab, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.</p>

          <h2>2. Disclaimer</h2>
          <p>The materials on OnChainers Lab are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2>3. Blockchain Interactions</h2>
          <p>You acknowledge that blockchain transactions are irreversible and we have no control over the networks you interact with.</p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
