"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Transaction {
  id: string | number;
  type: 'expense' | 'saving';
  amount: number;
  category: string;
  date: string;
  note: string;
}

interface TransactionHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionHistoryDialog({ open, onOpenChange }: TransactionHistoryDialogProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchTransactions();
    }
  }, [open]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/transactions?limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const result = await response.json();
      setTransactions(result.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transaction history');
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

  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black/90 border-green-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Transaction History</DialogTitle>
          <DialogDescription className="text-gray-400">
            View all your expenses and savings
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
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
        </div>
      </DialogContent>
    </Dialog>
  );
}