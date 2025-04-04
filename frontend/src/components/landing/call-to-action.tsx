import { Button } from "@/components/ui/button"
import { Sparkles, Shield } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"

export function CallToAction() {
  return (
    <section className="relative py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Sign up today and gamify your saving
          </h2>
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-lg text-white"
            >
              Get Started
            </Button>
          </SignInButton>
        </div>
      </div>
    </section>
  )
}

