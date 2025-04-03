"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import { LiveCounter } from "./live-counter";
import { SignInButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";

// Import PhiScene with no SSR to avoid hydration issues
const PhiScene = dynamic(() => import("@/model"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
    </div>
  ),
});

export function MidJourneyHero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-green-950 z-0">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-green-400 to-green-600"
              style={{
                width: `${Math.random() * 400 + 100}px`,
                height: `${Math.random() * 400 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                filter: "blur(60px)",
                transform: "translate(-50%, -50%)",
                animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glowing particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8,
              animation: `pulse ${Math.random() * 5 + 3}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 py-12 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-green-400/30">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <LiveCounter />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="block">Transform Your</span>
              <span className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Savings Journey
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
              Make Saving Fun With PhiSaver.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <SignInButton mode="modal" afterSignInUrl="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-lg text-white"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Sign in
                </Button>
              </SignInButton>
              <Button
                variant="outline"
                size="lg"
                className="text-lg text-white border-white hover:bg-white/10"
                onClick={() => scrollToSection("how-it-works")}
              >
                Explore Gallery
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 relative h-[500px]">
            <PhiScene />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          100% { transform: translate(-50%, -50%) translateY(20px); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes floatShape {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
}