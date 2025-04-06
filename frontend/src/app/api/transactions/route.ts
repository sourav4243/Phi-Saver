import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the limit from the query parameters, default to 10
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    // Get expenses
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
      select: {
        id: true,
        amount: true,
        category: true,
        date: true,
        note: true,
      },
    });

    // Get savings
    const savings = await prisma.saving.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
      select: {
        id: true,
        amount: true,
        category: true,
        date: true,
        note: true,
      },
    });

    // Combine and format transactions with unique IDs
    const formattedExpenses = expenses.map(expense => ({
      id: `expense-${expense.id}`,
      type: 'expense' as const,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.toISOString(),
      note: expense.note || '',
    }));

    const formattedSavings = savings.map(saving => ({
      id: `saving-${saving.id}`,
      type: 'saving' as const,
      amount: saving.amount,
      category: saving.category,
      date: saving.date.toISOString(),
      note: saving.note || '',
    }));

    // Combine all transactions and sort by date
    const allTransactions = [...formattedExpenses, ...formattedSavings]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return NextResponse.json({ transactions: allTransactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}