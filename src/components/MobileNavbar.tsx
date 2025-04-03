"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              href="/"
              className="text-sm font-medium text-white hover:text-green-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <SignedIn>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/contact"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2">
                <SignInButton mode="modal">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar; 