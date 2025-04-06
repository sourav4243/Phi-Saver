"use client";

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CategoryExpense {
  category: string;
  amount: number;
}

interface MonthlyStats {
  currentMonth: {
    totalExpenses: number;
    totalSavings: number;
    netSavings: number;
    dailyAverageExpenses: number;
    dailyAverageSavings: number;
    expensesChange: number;
    savingsChange: number;
    netSavingsChange: number;
    categoryExpenses: CategoryExpense[];
  };
  lastMonth: {
    totalExpenses: number;
    totalSavings: number;
    netSavings: number;
  };
  month: string;
  lastMonthName: string;
}

export function FinancialAnalysis() {
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // Filter state is set up but not currently used in filtering logic
  const [_, setFilter] = useState('all');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/monthly-stats');
      if (!response.ok) {
        throw new Error('Failed to fetch monthly stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      toast.error('Failed to load financial statistics');
    } finally {
      setIsLoading(false);
    }
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

  // Get category color based on category
  const getCategoryColor = (category: string) => {
    const categoryLower = category.toLowerCase();

    if (categoryLower.includes('food') || categoryLower.includes('dining') || categoryLower.includes('restaurant')) {
      return 'blue';
    } else if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
      return 'purple';
    } else if (categoryLower.includes('transport') || categoryLower.includes('travel')) {
      return 'amber';
    } else if (categoryLower.includes('entertainment') || categoryLower.includes('movie') || categoryLower.includes('game')) {
      return 'red';
    } else if (categoryLower.includes('salary') || categoryLower.includes('income') || categoryLower.includes('job')) {
      return 'green';
    } else if (categoryLower.includes('gift') || categoryLower.includes('bonus')) {
      return 'pink';
    } else if (categoryLower.includes('health') || categoryLower.includes('medical')) {
      return 'cyan';
    } else if (categoryLower.includes('education') || categoryLower.includes('school') || categoryLower.includes('college')) {
      return 'indigo';
    } else if (categoryLower.includes('bills') || categoryLower.includes('utilities')) {
      return 'orange';
    } else {
      return 'gray';
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-24">
      <main className="max-w-[1440px] mx-auto px-2 sm:px-4">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Financial Statistics</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Select defaultValue="month">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className='text-sm font-bold'>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
              <i className="fas fa-download mr-2"></i>
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-medium">Total Expenses</h3>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <i className="fas fa-arrow-down text-red-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl sm:text-3xl font-bold">
                  {isLoading ? "..." : `₹${Math.floor(stats?.currentMonth.totalExpenses || 0)}`}
                </span>
                <span className={`text-sm pb-1 flex items-center ${
                  (stats?.currentMonth.expensesChange || 0) > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  <i className={`fas fa-arrow-${(stats?.currentMonth.expensesChange || 0) > 0 ? 'up' : 'down'} mr-1`}></i>
                  {isLoading ? "..." : `${Math.abs(Math.round(stats?.currentMonth.expensesChange || 0))}%`}
                </span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                {isLoading ? "Loading..." : `Compared to ${stats?.lastMonthName || 'last month'}`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-medium">Net Savings</h3>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <i className="fas fa-piggy-bank text-blue-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl sm:text-3xl font-bold">
                  {isLoading ? "..." : `₹${Math.max(0, Math.floor(stats?.currentMonth.netSavings || 0))}`}
                </span>
                <span className={`text-sm pb-1 flex items-center ${
                  (stats?.currentMonth.netSavingsChange || 0) > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <i className={`fas fa-arrow-${(stats?.currentMonth.netSavingsChange || 0) > 0 ? 'up' : 'down'} mr-1`}></i>
                  {isLoading ? "..." : `${Math.abs(Math.round(stats?.currentMonth.netSavingsChange || 0))}%`}
                </span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                {isLoading ? "Loading..." : `Compared to ${stats?.lastMonthName || 'last month'}`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-medium">Daily Average Expenses</h3>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                  <i className="fas fa-calendar-day text-purple-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl sm:text-3xl font-bold">
                  {isLoading ? "..." : `₹${Math.floor(stats?.currentMonth.dailyAverageExpenses || 0)}`}
                </span>
                <span className="text-gray-500 text-sm pb-1">
                  per day
                </span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                {isLoading ? "Loading..." : `Expenses in ${stats?.month || 'current month'}`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-medium">Daily Average Savings</h3>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <i className="fas fa-piggy-bank text-green-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl sm:text-3xl font-bold">
                  {isLoading ? "..." : `₹${Math.floor(stats?.currentMonth.dailyAverageSavings || 0)}`}
                </span>
                <span className="text-gray-500 text-sm pb-1">
                  per day
                </span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                {isLoading ? "Loading..." : `Savings in ${stats?.month || 'current month'}`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Category Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Category Analysis</CardTitle>
            <CardDescription className="text-sm">Detailed breakdown of your spending habits</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2 animate-pulse">
                    <div className="flex items-center">
                      <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full mr-3 w-10 h-10"></div>
                      <div>
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : stats?.currentMonth.categoryExpenses.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {stats.currentMonth.categoryExpenses.map((category, index) => {
                  const color = getCategoryColor(category.category);
                  const icon = getCategoryIcon(category.category);
                  const percentage = (category.amount / stats.currentMonth.totalExpenses) * 100;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center">
                        <div className={`bg-${color}-100 dark:bg-${color}-900/30 p-2 rounded-full mr-3`}>
                          <i className={`fas ${icon} text-${color}-600`}></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">{category.category}</h4>
                          <p className="text-xl sm:text-2xl font-bold">₹{Math.floor(category.amount)}</p>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-1.5 sm:h-2" />
                      <div className="flex items-center text-xs sm:text-sm">
                        <span className="text-gray-500">{Math.round(percentage)}% of total expenses</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No expense categories found for this month.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Recent Transactions</CardTitle>
                <CardDescription className="text-sm">Your financial activity for the past 30 days</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Input
                    placeholder="Search transactions..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
                <Select defaultValue="all" onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="saving">Savings Only</SelectItem>
                    <SelectItem value="expense">Expenses Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[600px] sm:min-w-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-xs sm:text-sm">Date</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-xs sm:text-sm">Description</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-xs sm:text-sm">Category</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-xs sm:text-sm">Amount</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-xs sm:text-sm">Status</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 text-right font-medium text-xs sm:text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr className="border-b animate-pulse">
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <div className="flex items-center">
                            <div className="bg-gray-200 dark:bg-gray-700 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 w-8 h-8"></div>
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
                        </td>
                      </tr>
                    ) : (
                      <tr className="border-b">
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <div className="flex items-center">
                            <div className="bg-green-100 dark:bg-green-900/30 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                              <i className="fas fa-piggy-bank text-green-600 text-sm sm:text-base"></i>
                            </div>
                            <span className="text-xs sm:text-sm">Monthly Savings</span>
                          </div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <Badge variant="secondary" className="text-xs">Savings</Badge>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-green-600 text-xs sm:text-sm">
                          +₹{Math.floor(stats?.currentMonth.totalSavings || 0)}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <Badge className="text-xs">Completed</Badge>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <i className="fas fa-ellipsis-h text-xs "></i>
                          </Button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 mt-4">
              <div className="text-xs sm:text-sm text-gray-500">
                {isLoading ? "Loading..." : `Showing data for ${stats?.month || 'current month'}`}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3">
                  <i className="fas fa-chevron-left mr-1 sm:mr-2 text-xs"></i>
                  <span className="text-xs">Previous</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3">
                  <span className="text-xs">Next</span>
                  <i className="fas fa-chevron-right ml-1 sm:ml-2 text-xs"></i>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

