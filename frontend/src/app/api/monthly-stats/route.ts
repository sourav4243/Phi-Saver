import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the first day of the current month
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Get the first day of the previous month
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    // Get all expenses for the current month
    const currentMonthExpenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: firstDayOfMonth,
          lte: today,
        },
      },
      select: {
        amount: true,
        category: true,
      },
    });
    
    // Get all savings for the current month
    const currentMonthSavings = await prisma.saving.findMany({
      where: {
        userId,
        date: {
          gte: firstDayOfMonth,
          lte: today,
        },
      },
      select: {
        amount: true,
      },
    });
    
    // Get all expenses for the previous month
    const lastMonthExpenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: firstDayOfLastMonth,
          lte: lastDayOfLastMonth,
        },
      },
      select: {
        amount: true,
        category: true,
      },
    });
    
    // Get all savings for the previous month
    const lastMonthSavings = await prisma.saving.findMany({
      where: {
        userId,
        date: {
          gte: firstDayOfLastMonth,
          lte: lastDayOfLastMonth,
        },
      },
      select: {
        amount: true,
      },
    });
    
    // Calculate totals for current month
    const totalCurrentMonthExpenses = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalCurrentMonthSavings = currentMonthSavings.reduce((sum, saving) => sum + saving.amount, 0);
    const netCurrentMonthSavings = totalCurrentMonthSavings - totalCurrentMonthExpenses;
    
    // Calculate totals for previous month
    const totalLastMonthExpenses = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalLastMonthSavings = lastMonthSavings.reduce((sum, saving) => sum + saving.amount, 0);
    const netLastMonthSavings = totalLastMonthSavings - totalLastMonthExpenses;
    
    // Calculate daily averages for current month
    const daysInCurrentMonth = today.getDate();
    const dailyAverageExpenses = totalCurrentMonthExpenses / daysInCurrentMonth;
    const dailyAverageSavings = totalCurrentMonthSavings / daysInCurrentMonth;
    
    // Calculate percentage changes
    const expensesChange = totalLastMonthExpenses > 0 
      ? ((totalCurrentMonthExpenses - totalLastMonthExpenses) / totalLastMonthExpenses) * 100 
      : 0;
    
    const savingsChange = totalLastMonthSavings > 0 
      ? ((totalCurrentMonthSavings - totalLastMonthSavings) / totalLastMonthSavings) * 100 
      : 0;
    
    const netSavingsChange = netLastMonthSavings !== 0 
      ? ((netCurrentMonthSavings - netLastMonthSavings) / Math.abs(netLastMonthSavings)) * 100 
      : 0;
    
    // Group expenses by category
    const categoryExpenses: Record<string, number> = {};
    currentMonthExpenses.forEach(expense => {
      if (!categoryExpenses[expense.category]) {
        categoryExpenses[expense.category] = 0;
      }
      categoryExpenses[expense.category] += expense.amount;
    });
    
    // Sort categories by amount (descending)
    const sortedCategories = Object.entries(categoryExpenses)
      .sort(([, a], [, b]) => b - a)
      .map(([category, amount]) => ({ category, amount }));
    
    return NextResponse.json({
      currentMonth: {
        totalExpenses: totalCurrentMonthExpenses,
        totalSavings: totalCurrentMonthSavings,
        netSavings: netCurrentMonthSavings,
        dailyAverageExpenses,
        dailyAverageSavings,
        expensesChange,
        savingsChange,
        netSavingsChange,
        categoryExpenses: sortedCategories,
      },
      lastMonth: {
        totalExpenses: totalLastMonthExpenses,
        totalSavings: totalLastMonthSavings,
        netSavings: netLastMonthSavings,
      },
      month: today.toLocaleString('default', { month: 'long', year: 'numeric' }),
      lastMonthName: new Date(today.getFullYear(), today.getMonth() - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' }),
    });
  } catch (error) {
    console.error('Error fetching monthly stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monthly stats' },
      { status: 500 }
    );
  }
} 