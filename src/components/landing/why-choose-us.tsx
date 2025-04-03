"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Sparkles, Gift, Users } from "lucide-react"
import { useState } from "react"

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`transition-all duration-300 ${isHovered ? "shadow-lg transform -translate-y-2" : "shadow"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
            isHovered ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "bg-pink-100 text-pink-500"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

export function WhyChooseUs() {
  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "🔥 Savings Streaks",
      description: "Keep saving, keep winning! Streaks = Rewards. The longer your streak, the bigger your bonuses.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "🎮 MoneyQuest",
      description: "Turn saving into an adventure. Level up with your savings and unlock new financial powers!",
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "💰 Hidden Rewards",
      description: "Random bonus interest & cashback when you save! Surprise rewards keep your savings exciting.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "👥 Social Challenges",
      description: "Compete with friends & climb the savings leaderboard. Group challenges multiply your rewards.",
    },
  ]

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We've turned boring savings into an exciting game with real rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>

        {/* Gamification meter */}
        <div className="mt-16 max-w-md mx-auto bg-gray-100 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">🎯 Gamification Meter</h3>
          <p className="mb-4">Are you ready for the challenge?</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-full w-0 animate-fill-bar"></div>
          </div>
          <p className="text-sm text-gray-600">Join now to fill your savings potential!</p>
        </div>
      </div>

      {/* Custom animation */}
      <style jsx global>{`
        @keyframes fillBar {
          0% { width: 0; }
          100% { width: 85%; }
        }
        
        .animate-fill-bar {
          animation: fillBar 2s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  )
}

