"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { MidJourneyHero } from "@/components/landing/midjourney-hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WhyChooseUs } from "@/components/landing/why-choose-us";
import { Testimonials } from "@/components/landing/testimonials";
import { CallToAction } from "@/components/landing/call-to-action";
import dynamic from "next/dynamic";

// Import dashboard with no SSR to avoid hydration issues
const Dashboard = dynamic(() => import("@/app/dashboard/page"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <MidJourneyHero />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </SignedOut>
    </>
  );
}
