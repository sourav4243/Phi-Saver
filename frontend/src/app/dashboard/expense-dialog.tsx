"use client";

import React, { useState } from 'react';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Expense {
  amount: string;
  category: string;
  date: string;
  note: string;
}

export function ExpenseDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [newExpense, setNewExpense] = useState<Expense>({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  const handleExpenseChange = (field: keyof Expense, value: string) => {
    setNewExpense(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveExpense = () => {
    // TODO: Implement expense saving logic
    console.log('Saving expense:', newExpense);
    onOpenChange(false);
    // Reset form
    setNewExpense({
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[425px] ${isDarkMode ? 'bg-gray-900 text-white border-gray-800' : ''}`}>
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
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <Input
                id="amount"
                type="number"
                className={`pl-7 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => handleExpenseChange('amount', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right font-medium">
              Category
            </label>
            <Select
              value={newExpense.category}
              onValueChange={(value) => handleExpenseChange('category', value)}
            >
              <SelectTrigger className={`col-span-3 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-utensils text-amber-500"></i>
                    <span>Food & Dining</span>
                  </div>
                </SelectItem>
                <SelectItem value="transport">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-car text-blue-500"></i>
                    <span>Transportation</span>
                  </div>
                </SelectItem>
                <SelectItem value="entertainment">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-film text-pink-500"></i>
                    <span>Entertainment</span>
                  </div>
                </SelectItem>
                <SelectItem value="shopping">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-shopping-bag text-green-500"></i>
                    <span>Shopping</span>
                  </div>
                </SelectItem>
                <SelectItem value="others">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-ellipsis-h text-indigo-500"></i>
                    <span>Others</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="date" className="text-right font-medium">
              Date
            </label>
            <Input
              id="date"
              type="date"
              value={newExpense.date}
              onChange={(e) => handleExpenseChange('date', e.target.value)}
              className={`col-span-3 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="note" className="text-right font-medium">
              Note
            </label>
            <Input
              id="note"
              className={`col-span-3 border-none ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} !rounded-button`}
              placeholder="Optional note"
              value={newExpense.note}
              onChange={(e) => handleExpenseChange('note', e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            className="!rounded-button whitespace-nowrap cursor-pointer"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveExpense} 
            className={`${isDarkMode ? 'bg-green-800 hover:bg-green-900' : 'bg-green-600 hover:bg-green-700'} !rounded-button whitespace-nowrap cursor-pointer`}
          >
            Save Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 