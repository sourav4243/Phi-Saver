"use client";

import { MidJourneyHero } from "./midjourney-hero";
import { WhyChooseUs } from "@/components/landing/why-choose-us";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CallToAction } from "@/components/landing/call-to-action";

export default function LandingPage() {
  return (
    <main className="bg-black text-white">
      <MidJourneyHero />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </main>
  );
}