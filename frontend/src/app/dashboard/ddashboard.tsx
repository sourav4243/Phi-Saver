"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ExpenseDialog } from './expense-dialog';
import { SavingsDialog } from './savings-dialog';
import { TransactionHistoryDialog } from './transaction-history-dialog';
import { toast } from "sonner";

// Import the EChartsWrapper component with SSR disabled
const EChartsWrapper = dynamic(() => import('@/components/charts/EChartsWrapper'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-800/20 animate-pulse rounded-md"></div>
});

// Define interfaces for user and pet data
interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  level: number;
  exp: number;
  levelProgress: number;
  streakDays: number;
  totalSaved: number;
  petStatus: PetData | null;
}

interface PetData {
  id: number;
  petType: string;
  level: number;
  stage: number;
  xp: number;
  evolutionProgress: number;
  imageUrl: string;
}

interface Transaction {
  id: number;
  type: 'expense' | 'saving';
  amount: number;
  category: string;
  date: string;
  note: string;
}

export default function Dashboard() {
  const { theme } = useTheme();
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const [showSavingsDialog, setShowSavingsDialog] = useState(false);
  const [showTransactionHistoryDialog, setShowTransactionHistoryDialog] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [petData, setPetData] = useState<PetData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlySavings, setMonthlySavings] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);

  // Fetch user and pet data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user data
        const userResponse = await fetch('/api/user');
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userResult = await userResponse.json();
        setUserData(userResult.user);
        
        // Fetch pet data
        const petResponse = await fetch('/api/pet');
        if (!petResponse.ok) {
          throw new Error('Failed to fetch pet data');
        }
        const petResult = await petResponse.json();
        setPetData(petResult.pet);
        
        // Fetch monthly savings
        const savingsResponse = await fetch('/api/monthly-savings');
        if (!savingsResponse.ok) {
          throw new Error('Failed to fetch monthly savings');
        }
        const savingsResult = await savingsResponse.json();
        setMonthlySavings(savingsResult.totalMonthlySavings);
        setCurrentMonth(savingsResult.month);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsTransactionsLoading(true);
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const result = await response.json();
      setTransactions(result.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transaction history');
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  // Fetch transaction history
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add event listener for transaction updates
  useEffect(() => {
    const handleTransactionAdded = () => {
      fetchTransactions();
      // Also refresh monthly savings when a transaction is added
      fetch('/api/monthly-savings')
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch monthly savings');
          return response.json();
        })
        .then(data => {
          setMonthlySavings(data.totalMonthlySavings);
          setCurrentMonth(data.month);
        })
        .catch(error => {
          console.error('Error refreshing monthly savings:', error);
        });
    };

    window.addEventListener('transactionAdded', handleTransactionAdded);

    return () => {
      window.removeEventListener('transactionAdded', handleTransactionAdded);
    };
  }, []);

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

  // Get pet level title based on level
  const getPetLevelTitle = (level: number) => {
    if (level <= 3) return "Young";
    if (level <= 6) return "Teen";
    if (level <= 9) return "Adult";
    return "Elder";
  };

  // Get category icon based on category
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('food') || categoryLower.includes('dining') || categoryLower.includes('restaurant')) {
      return 'fa-utensils';
    } else if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
      return 'fa-shopping-bag';
    } else if (categoryLower.includes('transport') || categoryLower.includes('travel')) {
      return 'fa-car';
    } else if (categoryLower.includes('entertainment') || categoryLower.includes('movie') || categoryLower.includes('game')) {
      return 'fa-film';
    } else if (categoryLower.includes('salary') || categoryLower.includes('income') || categoryLower.includes('job')) {
      return 'fa-briefcase';
    } else if (categoryLower.includes('gift') || categoryLower.includes('bonus')) {
      return 'fa-gift';
    } else if (categoryLower.includes('health') || categoryLower.includes('medical')) {
      return 'fa-heartbeat';
    } else if (categoryLower.includes('education') || categoryLower.includes('school') || categoryLower.includes('college')) {
      return 'fa-graduation-cap';
    } else if (categoryLower.includes('bills') || categoryLower.includes('utilities')) {
      return 'fa-file-invoice';
    } else {
      return 'fa-money-bill';
    }
  };

  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
                  {isLoading ? "..." : userData?.level || 1}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {isLoading ? "Loading..." : `Level ${userData?.level || 1} Explorer`}
                  </h2>
                  <div className="mt-1">
                    <Progress 
                      value={isLoading ? 0 : userData?.levelProgress || 0} 
                      className="h-2 w-36 sm:w-48" 
                    />
                    <span className="text-xs text-gray-400">
                      {isLoading ? "Loading..." : `${userData?.levelProgress || 0}% to Level ${(userData?.level || 1) + 1}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center py-1 sm:py-2 px-2 sm:px-3 text-sm">
                  <i className="fas fa-fire mr-2 text-amber-400"></i>
                  {isLoading ? "Loading..." : `${userData?.streakDays || 0} Day Streak`}
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 flex items-center py-1 sm:py-2 px-2 sm:px-3 text-sm">
                  <i className="fas fa-piggy-bank mr-2 text-green-400"></i>
                  {isLoading ? "Loading..." : `₹${Math.floor(monthlySavings)} Saved in ${currentMonth}`}
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
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
                {isLoading ? (
                  <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-800/20 animate-pulse rounded-md mb-4"></div>
                ) : (
                  <div className="mb-4 relative">
                    <Image
                      src={petData?.imageUrl || "/assets/levels/level1_dragon.jpg"}
                      alt={`${getPetLevelTitle(petData?.level || 1)} ${petData?.petType || "Dragon"}`}
                      width={64}
                      height={64}
                      quality={100}
                      unoptimized
                      className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-center mb-2 text-white">
                  {isLoading ? "Loading..." : `${getPetLevelTitle(petData?.level || 1)} ${petData?.petType || "Dragon"}`}
                </h3>
                <p className="text-gray-400 text-center mb-4">
                  {isLoading ? "Loading..." : `Level ${petData?.level || 1} • ${petData?.evolutionProgress || 0}% Evolution`}
                </p>
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
            {isTransactionsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700/50"></div>
                      <div>
                        <div className="h-5 w-24 bg-gray-700/50 rounded mb-2"></div>
                        <div className="h-4 w-20 bg-gray-700/50 rounded"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-5 w-16 bg-gray-700/50 rounded mb-2"></div>
                      <div className="h-4 w-12 bg-gray-700/50 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'expense' ? 'bg-red-500/20' : 'bg-green-500/20'
                      }`}>
                        <i className={`fas ${getCategoryIcon(transaction.category)} ${
                          transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                        }`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{transaction.category}</h4>
                        <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
                        {transaction.note && (
                          <p className="text-xs text-gray-500 mt-1">{transaction.note}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {transaction.type === 'expense' ? '-' : '+'}₹{Math.floor(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-400 capitalize">{transaction.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No transactions found. Start by logging an expense or adding savings!</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              variant="outline" 
              className="border-green-500/20 text-white hover:bg-green-500/10"
              onClick={() => setShowTransactionHistoryDialog(true)}
            >
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

        {/* Transaction History Dialog */}
        <TransactionHistoryDialog
          open={showTransactionHistoryDialog}
          onOpenChange={setShowTransactionHistoryDialog}
        />
      </main>
    </div>
  );
}
