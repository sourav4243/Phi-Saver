"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";

interface Savings {
  amount: string;
  category: string;
  date: string;
  note: string;
}

interface SavingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SavingsDialog({ open, onOpenChange }: SavingsDialogProps) {
  const { theme } = useTheme();
  const [newSavings, setNewSavings] = useState<Savings>({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  });

  const handleChange = (field: keyof Savings, value: string) => {
    setNewSavings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saving:', newSavings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-gray-900 border-green-500/20' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Add New Savings</DialogTitle>
          <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            Record your savings to track your financial progress.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount" className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className={`pl-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`}
                value={newSavings.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category" className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>Category</Label>
            <Select value={newSavings.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">
                  <div className="flex items-center">
                    <i className="fas fa-briefcase text-green-500 mr-2"></i>
                    Salary
                  </div>
                </SelectItem>
                <SelectItem value="investments">
                  <div className="flex items-center">
                    <i className="fas fa-chart-line text-blue-500 mr-2"></i>
                    Investments
                  </div>
                </SelectItem>
                <SelectItem value="gifts">
                  <div className="flex items-center">
                    <i className="fas fa-gift text-purple-500 mr-2"></i>
                    Gifts
                  </div>
                </SelectItem>
                <SelectItem value="other">
                  <div className="flex items-center">
                    <i className="fas fa-ellipsis-h text-gray-500 mr-2"></i>
                    Other
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date" className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>Date</Label>
            <Input
              id="date"
              type="date"
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}
              value={newSavings.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note" className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder="Add a note about your savings..."
              className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}
              value={newSavings.note}
              onChange={(e) => handleChange('note', e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={theme === 'dark' ? 'border-gray-700 text-white hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Save Savings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 