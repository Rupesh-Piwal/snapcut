import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Comparison } from "@/components/landing/comparison";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-blue-500/30">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Comparison />
      </main>
      <Footer />
    </div>
  );
}


