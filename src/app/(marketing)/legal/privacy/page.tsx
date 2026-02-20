import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-0">
      <SiteHeader />
      <main className="flex-1 py-20">
        <article className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-[800px] prose prose-invert prose-headings:font-display prose-a:text-gold prose-p:text-text-2">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Introduction</h2>
          <p>Welcome to OnChainers Lab. We respect your privacy and are committed to protecting your personal data.</p>

          <h2>2. Data Collection</h2>
          <p>We do not collect personal data or wallet addresses by default. Interaction with the blockchain is handled directly by your wallet provider.</p>

          <h2>3. Cookies</h2>
          <p>We use local storage to save your preferences (e.g., submission drafts). We do not use tracking cookies.</p>
          
          <h2>4. Contact</h2>
          <p>If you have questions, reach out to us via our community channels.</p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
