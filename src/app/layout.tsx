import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/themeprovider";
import Navbar from "@/components/Navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ClientOnly, ChatButton, Footer } from '@/components/ClientOnly';

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
              <main className="min-h-screen dark:bg-gradient-to-br dark:from-green-900 dark:via-black dark:to-green-950 bg-gradient-to-br from-green-50 via-white to-green-100">
                {children}
              </main>
            </SignedIn>
            <SignedOut>
              <main className="min-h-screen dark:bg-black bg-white">
                {children}
              </main>
            </SignedOut>

            {/* Client-side only components */}
            <ClientOnly>
              {/* Chat Button */}
              <ChatButton />

              {/* Footer - only for signed in users */}
              <SignedIn>
                <Footer />
              </SignedIn>
            </ClientOnly>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
