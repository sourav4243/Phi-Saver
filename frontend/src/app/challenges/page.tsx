"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ChallengesComponent from './challenges';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen dark:bg-gradient-to-br dark:from-green-900 dark:via-black dark:to-green-950 bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24 pb-24">
        <ChallengesComponent />
      </main>
      <Footer />
    </div>
  );
} 