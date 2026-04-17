import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TutorialSection } from "@/components/TutorialSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden">
      <div className="grain-overlay" />
      <HeroSection />
      <FeaturesSection />
      <TutorialSection />
      <PricingSection />
      <TestimonialsSection />
    </main>
  );
}