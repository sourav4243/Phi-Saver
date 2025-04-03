import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/themeprovider";
import Navbar from "@/components/Navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import dynamic from 'next/dynamic';

// Import ChatButton with client-side only rendering
const ChatButton = dynamic(() => import('@/components/chat/ChatButton'), { ssr: false });

// Import Footer
const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phi Saver - Your Savings Companion",
  description: "A gamified savings application designed to encourage millennials and Gen Z to build wealth over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <SignedIn>
              <main className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-950">
                {children}
              </main>
            </SignedIn>
            <SignedOut>
              <main className="min-h-screen bg-black">
                {children}
              </main>
            </SignedOut>

            {/* Chat Button */}
            <ChatButton />

            {/* Footer */}
            <SignedIn>
              <Footer />
            </SignedIn>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
