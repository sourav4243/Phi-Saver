"use client";

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function FinancialAnalysis() {
  return (
    <div className="min-h-screen pt-16 pb-24">
      <main className="max-w-[1440px] mx-auto px-4">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Financial Statistics</h1>
          <div className="flex items-center space-x-4">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-green-500 hover:bg-green-600">
              <i className="fas fa-download mr-2"></i>
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Total Income</h3>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <i className="fas fa-arrow-up text-green-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold">₹5,800</span>
                <span className="text-green-600 text-sm pb-1 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i>
                  3.6%
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Compared to last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Total Expenses</h3>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <i className="fas fa-arrow-down text-red-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold">₹3,600</span>
                <span className="text-red-600 text-sm pb-1 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i>
                  9.1%
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Compared to last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Net Savings</h3>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <i className="fas fa-piggy-bank text-blue-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold">₹2,200</span>
                <span className="text-red-600 text-sm pb-1 flex items-center">
                  <i className="fas fa-arrow-down mr-1"></i>
                  4.3%
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Compared to last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Daily Average</h3>
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                  <i className="fas fa-calendar-day text-purple-600"></i>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold">₹120</span>
                <span className="text-green-600 text-sm pb-1 flex items-center">
                  <i className="fas fa-arrow-down mr-1"></i>
                  2.5%
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Compared to last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Category Analysis</CardTitle>
            <CardDescription>Detailed breakdown of your spending habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Food Category */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <i className="fas fa-utensils text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Food</h4>
                    <p className="text-2xl font-bold">₹1,200</p>
                  </div>
                </div>
                <Progress value={33.3} className="h-2" />
                <div className="flex items-center text-sm">
                  <span className="text-red-500 flex items-center mr-2">
                    <i className="fas fa-arrow-up mr-1"></i>
                    5.2%
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>

              {/* Transportation */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full mr-3">
                    <i className="fas fa-car text-amber-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Transportation</h4>
                    <p className="text-2xl font-bold">₹600</p>
                  </div>
                </div>
                <Progress value={16.7} className="h-2" />
                <div className="flex items-center text-sm">
                  <span className="text-green-500 flex items-center mr-2">
                    <i className="fas fa-arrow-down mr-1"></i>
                    2.1%
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>

              {/* Entertainment */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
                    <i className="fas fa-film text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Entertainment</h4>
                    <p className="text-2xl font-bold">₹800</p>
                  </div>
                </div>
                <Progress value={22.2} className="h-2" />
                <div className="flex items-center text-sm">
                  <span className="text-red-500 flex items-center mr-2">
                    <i className="fas fa-arrow-up mr-1"></i>
                    12.5%
                  </span>
                  <span className="text-gray-500">vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your financial activity for the past 30 days</CardDescription>
              </div>
              <div className="flex space-x-4">
                <div className="relative">
                  <Input
                    placeholder="Search transactions..."
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="income">Income Only</SelectItem>
                    <SelectItem value="expense">Expenses Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-left font-medium">Description</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Amount</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Apr 3, 2025</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                          <i className="fas fa-briefcase text-green-600"></i>
                        </div>
                        <span>Salary Deposit</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">Income</Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-green-600">+₹5,800</td>
                    <td className="py-3 px-4">
                      <Badge>Completed</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        <i className="fas fa-ellipsis-h"></i>
                      </Button>
                    </td>
                  </tr>
                  {/* Add more transaction rows as needed */}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing 1 of 28 transactions
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <i className="fas fa-chevron-left mr-2"></i>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <i className="fas fa-chevron-right ml-2"></i>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
