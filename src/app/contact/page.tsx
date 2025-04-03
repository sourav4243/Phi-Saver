"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">
          Get in Touch
        </h1>
        <p className="text-xl text-center mb-12 text-gray-300">
          Have questions about Phi Saver? We're here to help!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-black/50 border-green-500/30">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-white mb-2">Email Us</CardTitle>
              <CardDescription className="text-gray-300">
                support@phisaver.com
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-500/30">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-white mb-2">Call Us</CardTitle>
              <CardDescription className="text-gray-300">
                +1 (555) 123-4567
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-500/30">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-white mb-2">Chat With Us</CardTitle>
              <CardDescription className="text-gray-300">
                Use our AI assistant by clicking the chat button
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-black/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white">Send us a message</CardTitle>
            <CardDescription className="text-gray-300">
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
              <div className="bg-green-500/20 text-green-300 p-4 rounded-md text-center">
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="bg-black/30 border-green-500/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      required
                      className="bg-black/30 border-green-500/30 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Subject of your message"
                    required
                    className="bg-black/30 border-green-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    required
                    rows={5}
                    className="w-full rounded-md border border-green-500/30 bg-black/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white"
                >
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300">
            Need immediate assistance? Try our AI chatbot by clicking the chat button in the bottom right corner.
          </p>
        </div>
      </div>
    </div>
  );
}
