"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, Trophy, Settings } from "lucide-react";
import { useState } from "react";
import { SavingsDialog } from "@/app/dashboard/savings-dialog";

export function Footer() {
  const pathname = usePathname();
  const [showSavingsDialog, setShowSavingsDialog] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-green-500/20 z-50 safe-area-bottom">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between py-1 sm:py-2 relative">
            {/* Left side - Home */}
            <div className="w-1/4 flex justify-center">
              <Link href="/dashboard" className={`flex flex-col items-center p-1.5 sm:p-2 ${isActive('/dashboard') ? 'text-green-500' : 'text-gray-400 hover:text-green-400'}`}>
                <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Home</span>
              </Link>
            </div>
            
            {/* Left-center - Stats */}
            <div className="w-1/4 flex justify-center">
              <Link href="/stats" className={`flex flex-col items-center p-1.5 sm:p-2 ${isActive('/stats') ? 'text-green-500' : 'text-gray-400 hover:text-green-400'}`}>
                <LineChart className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Stats</span>
              </Link>
            </div>
            
            {/* Center - Plus Button (Floating Action Button) */}
            <div className="w-1/4 flex justify-center">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button 
                  onClick={() => setShowSavingsDialog(true)}
                  className="flex items-center justify-center -mt-8 sm:-mt-10 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-lg border-4 border-black transform scale-90 sm:scale-100 z-10"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right-center - Challenges */}
            <div className="w-1/4 flex justify-center">
              <Link href="/challenges" className={`flex flex-col items-center p-1.5 sm:p-2 ${isActive('/challenges') ? 'text-green-500' : 'text-gray-400 hover:text-green-400'}`}>
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Challenges</span>
              </Link>
            </div>
            
            {/* Right - Settings */}
            <div className="w-1/4 flex justify-center">
              <Link href="/settings" className={`flex flex-col items-center p-1.5 sm:p-2 ${isActive('/settings') ? 'text-green-500' : 'text-gray-400 hover:text-green-400'}`}>
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Dialog */}
      <SavingsDialog 
        open={showSavingsDialog} 
        onOpenChange={setShowSavingsDialog} 
      />
    </>
  );
} 