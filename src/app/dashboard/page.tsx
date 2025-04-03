"use client";

import { useEffect, useState } from 'react';
import { fetchDashboardData, addExpense, updateSavings } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardData {
  currentLevel: number;
  xpProgress: number;
  streakCount: number;
  dailyGoal: number;
  dailyProgress: number;
  petLevel: number;
  savings: number;
  expenses: Array<{
    id: number;
    category: string;
    amount: number;
    date: string;
  }>;
  goals: Array<{
    id: number;
    name: string;
    amount: number;
    saved: number;
  }>;
  badges: Array<{
    id: number;
    name: string;
    achieved: boolean;
  }>;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: 'food',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };
    loadDashboardData();
  }, []);

  const handleExpenseChange = (field: string, value: string) => {
    setNewExpense({
      ...newExpense,
      [field]: value
    });
  };

  const handleSaveExpense = async () => {
    try {
      await addExpense(newExpense);
      // Refresh dashboard data
      const data = await fetchDashboardData();
      setDashboardData(data);
      setShowExpenseDialog(false);
      setNewExpense({
        category: 'food',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        note: ''
      });
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Rest of your dashboard UI code */}
      {/* Replace static data with dashboardData */}
      {/* Example: */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
              {dashboardData.currentLevel}
            </div>
            <div>
              <h3 className="font-semibold">Level {dashboardData.currentLevel} Explorer</h3>
              <div className="flex items-center gap-2">
                <Progress value={dashboardData.xpProgress} className="w-32 h-2" />
                <span className="text-xs text-gray-500">{dashboardData.xpProgress}% to Level {dashboardData.currentLevel + 1}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rest of your dashboard components */}
      </div>

      {/* Expense Dialog */}
      <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log New Expense</DialogTitle>
            <DialogDescription>
              Track your spending to improve your saving habits.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right font-medium">
                Amount
              </label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-7"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => handleExpenseChange('amount', e.target.value)}
                />
              </div>
            </div>
            {/* Rest of your expense dialog form */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExpenseDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveExpense}>
              Save Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 