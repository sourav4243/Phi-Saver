"use client";

import React from 'react';
import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";


function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-8 h-8">
                <svg
                  viewBox="0 0 100 120"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="60"
                    r="45"
                    stroke="rgba(74, 222, 128, 0.8)"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="15"
                    x2="50"
                    y2="105"
                    stroke="rgba(74, 222, 128, 0.8)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 35C35 35 25 45 25 60C25 75 35 85 50 85C65 85 75 75 75 60C75 45 65 35 50 35"
                    stroke="rgba(74, 222, 128, 0.8)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-white font-mono tracking-wider">
                Phi Saver
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <DesktopNavbar />
          </div>
          
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;