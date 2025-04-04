"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface TestimonialProps {
  name: string
  age: number
  text: string
  avatar: string
  rating: number
}

function Testimonial({ name, age, text, avatar, rating }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-pink-200">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold">
              {name}, {age}
            </div>
            <div className="flex text-yellow-400 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-current" : "text-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-700">{text}</p>
      </CardContent>
    </Card>
  )
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "Rohan",
      age: 22,
      text: "I saved ₹10,000 in 3 months without even realizing it! 🚀 The gamification makes it so much easier to stay motivated.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: "Aisha",
      age: 25,
      text: "The streak system made saving money super fun. No more guilt spending! I'm now on a 45-day streak and loving it.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: "Vikram",
      age: 30,
      text: "Competing with my friends on the leaderboard has completely changed how I think about saving. We push each other to save more!",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
    },
    {
      name: "Priya",
      age: 28,
      text: "The random rewards keep me coming back every day. Last week I got a 5% bonus on my savings just for maintaining my streak!",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
    {
      name: "Arjun",
      age: 24,
      text: "I've tried other savings apps but this is the only one that kept me engaged. The quests and challenges make it feel like a game.",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  // Auto-scroll for desktop
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy savers who&apos;ve transformed their financial habits
          </p>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {[
              testimonials[currentIndex % testimonials.length],
              testimonials[(currentIndex + 1) % testimonials.length],
              testimonials[(currentIndex + 2) % testimonials.length],
            ].map((testimonial, index) => (
              <Testimonial
                key={index}
                name={testimonial.name}
                age={testimonial.age}
                text={testimonial.text}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={prevSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={nextSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Dots navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex % testimonials.length ? "bg-pink-500" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Mobile swipeable testimonials */}
        <div
          className="md:hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Testimonial
                    name={testimonial.name}
                    age={testimonial.age}
                    text={testimonial.text}
                    avatar={testimonial.avatar}
                    rating={testimonial.rating}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile dots navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-pink-500" : "bg-gray-300"}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="bg-gray-50 px-6 py-3 rounded-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="font-medium">Bank-Level Security</span>
          </div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="font-medium">Verified by Experts</span>
          </div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium">4.9/5 App Store Rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}

