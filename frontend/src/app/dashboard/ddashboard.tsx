"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ExpenseDialog } from './expense-dialog';
import { SavingsDialog } from './savings-dialog';

// Import the EChartsWrapper component with SSR disabled
const EChartsWrapper = dynamic(() => import('@/components/charts/EChartsWrapper'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-800/20 animate-pulse rounded-md"></div>
});

export default function Dashboard() {
  const { theme } = useTheme();
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const [showSavingsDialog, setShowSavingsDialog] = useState(false);

  // Create chart options
  const chartOptions = {
    animation: false,
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#6b7280' : '#d1d5db'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#e5e7eb' : '#374151'
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 4000,
      interval: 1000,
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#6b7280' : '#d1d5db'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#e5e7eb' : '#374151'
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? 'rgba(107, 114, 128, 0.2)' : 'rgba(209, 213, 219, 0.5)'
        }
      }
    },
    series: [
      {
        name: 'Savings',
        type: 'line',
        data: [800, 1200, 1600, 2100, 2700, 3200, 3500],
        itemStyle: {
          color: '#10b981'
        },
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: theme === 'dark' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.4)'
            }, {
              offset: 1, color: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
            }]
          }
        },
      },
      {
        name: 'Projected',
        type: 'line',
        data: [null, null, null, null, 2700, 3400, 4000],
        lineStyle: {
          type: 'dashed',
          width: 2,
          color: '#10b981'
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  };

  return (
    <div className="min-h-screen pt-0 pb-24">
      <main className="max-w-[1440px] mx-auto px-2 sm:px-4">
        {/* User Level Card */}
        <Card className="mb-6 shadow-sm bg-black/50 border-green-500/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-green-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mr-4">
                  12
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Level 12 Explorer</h2>
                  <div className="mt-1">
                    <Progress value={65} className="h-2 w-36 sm:w-48" />
                    <span className="text-xs text-gray-400">65% to Level 13</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center py-1 sm:py-2 px-2 sm:px-3 text-sm">
                  <i className="fas fa-fire mr-2 text-amber-400"></i>
                  7 Day Streak
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 flex items-center py-1 sm:py-2 px-2 sm:px-3 text-sm">
                  <i className="fas fa-piggy-bank mr-2 text-green-400"></i>
                  ₹700 Saved
                </Badge>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <Button 
                    variant="outline" 
                    className="flex-1 sm:flex-none border-green-500/20 text-white hover:bg-green-500/10 text-sm"
                    onClick={() => setShowExpenseDialog(true)}
                  >
                    <i className="fas fa-plus-circle mr-2"></i>
                    Log Expense
                  </Button>
                  <Button 
                    className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-sm"
                    onClick={() => setShowSavingsDialog(true)}
                  >
                    <i className="fas fa-plus-circle mr-2"></i>
                    Add Savings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8">
            {/* Today's Saving Goal */}
            <Card className="mb-6 shadow-sm bg-black/50 border-green-500/20">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
                  <h3 className="text-lg font-bold text-white">Today&apos;s Saving Goal</h3>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 flex items-center py-1 px-2 text-sm">
                    <i className="fas fa-calendar-day mr-2 text-green-400"></i>
                    Apr 4, 2025
                  </Badge>
                </div>
                <p className="text-gray-400 mb-3">Save ₹50 today to keep your streak going!</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">₹10 / ₹50</span>
                  <span className="text-gray-400">20% Complete</span>
                </div>
                <Progress value={20} className="h-4 mb-6" />
                <div className="bg-green-500/10 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-green-500/20">
                  <div className="flex items-center">
                    <div className="bg-green-500/20 p-3 rounded-full mr-4 hidden sm:block">
                      <i className="fas fa-dragon text-green-400 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400">Defeat the Spending Dragon!</h4>
                      <p className="text-green-300 text-sm">Every ₹5 saved helps you battle the dragon. Complete your goal to win!</p>
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
                    Battle Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Financial Chart */}
            <Card className="shadow-sm bg-black/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white">Financial Progress</CardTitle>
                <CardDescription className="text-gray-400">Track your savings journey</CardDescription>
              </CardHeader>
              <CardContent>
                <EChartsWrapper option={chartOptions} className="w-full h-[300px] sm:h-[400px]" />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Companion */}
          <div className="lg:col-span-4">
            <Card className="shadow-sm h-full bg-black/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white">Your Companion</CardTitle>
                <CardDescription className="text-gray-400">Level up your pet by saving more!</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="mb-4 relative">
                  <Image
                    src="https://public.readdy.ai/ai/img_res/a2444c8ee09dc353781231c07ac678d2.jpg"
                    alt="Young Dragon"
                    width={64}
                    height={64}
                    quality={100}
                    unoptimized
                    className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-white">Young Dragon</h3>
                <p className="text-gray-400 text-center mb-4">Level 2 • 2/3 Evolution</p>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 sm:p-4 w-full mb-6">
                  <p className="text-amber-300 flex items-center text-sm">
                    <i className="fas fa-lightbulb text-amber-400 mr-2"></i>
                    Save ₹1500 more to evolve your companion to the next stage!
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button variant="outline" className="border-green-500/20 text-white hover:bg-green-500/10 text-sm">
                    <i className="fas fa-magic mr-2"></i>
                    Customize
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600 text-sm">
                    <i className="fas fa-gift mr-2"></i>
                    Feed Pet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transactions History Card */}
        <Card className="mt-6 shadow-sm bg-black/50 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white">Transaction History</CardTitle>
            <CardDescription className="text-gray-400">View your recent expenses and savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample transactions - Replace with actual data from your backend */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <i className="fas fa-utensils text-red-400"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Food & Dining</h4>
                    <p className="text-sm text-gray-400">Apr 3, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-400">-₹250</p>
                  <p className="text-sm text-gray-400">Expense</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <i className="fas fa-briefcase text-green-400"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Salary</h4>
                    <p className="text-sm text-gray-400">Apr 3, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-400">+₹2,500</p>
                  <p className="text-sm text-gray-400">Savings</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <i className="fas fa-shopping-bag text-red-400"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Shopping</h4>
                    <p className="text-sm text-gray-400">Apr 2, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-400">-₹1,200</p>
                  <p className="text-sm text-gray-400">Expense</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" className="border-green-500/20 text-white hover:bg-green-500/10">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>

        {/* Expense Dialog */}
        <ExpenseDialog 
          open={showExpenseDialog} 
          onOpenChange={setShowExpenseDialog} 
        />

        {/* Savings Dialog */}
        <SavingsDialog 
          open={showSavingsDialog} 
          onOpenChange={setShowSavingsDialog} 
        />
      </main>
    </div>
  );
}
