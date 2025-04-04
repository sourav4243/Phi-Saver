"use client"

import type React from "react"

import { Target, Award, Trophy, TrendingUp, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your savings journey into an engaging adventure with our gamified approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 border-2 border-green-100 hover:border-green-200 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Set Goals</h3>
            <p className="text-gray-600">
              Define your savings targets and watch your progress in real-time.
            </p>
          </Card>

          <Card className="p-6 border-2 border-green-100 hover:border-green-200 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your savings journey with intuitive visualizations and metrics.
            </p>
          </Card>

          <Card className="p-6 border-2 border-green-100 hover:border-green-200 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Earn Rewards</h3>
            <p className="text-gray-600">
              Complete challenges and milestones to unlock exclusive rewards.
            </p>
          </Card>

          <Card className="p-6 border-2 border-green-100 hover:border-green-200 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Level Up</h3>
            <p className="text-gray-600">
              Grow your financial expertise as you progress through levels.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}

