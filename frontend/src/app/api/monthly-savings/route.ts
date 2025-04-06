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
    
    // Get all savings for the current month
    const monthlySavings = await prisma.saving.findMany({
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
    
    // Calculate the total amount saved this month
    const totalMonthlySavings = monthlySavings.reduce((sum, saving) => sum + saving.amount, 0);
    
    return NextResponse.json({ 
      totalMonthlySavings,
      month: today.toLocaleString('default', { month: 'long', year: 'numeric' })
    });
  } catch (error) {
    console.error('Error fetching monthly savings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monthly savings' },
      { status: 500 }
    );
  }
} 