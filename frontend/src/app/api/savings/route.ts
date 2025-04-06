import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { amount, category, date, note } = body;

    // Validate required fields
    if (!amount || !category || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the savings record
    const saving = await prisma.saving.create({
      data: {
        userId,
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        note: note || '',
      }
    });

    // Update the user's total saved amount
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalSaved: {
          increment: parseFloat(amount)
        }
      }
    });

    return NextResponse.json({ saving, status: 'created' });
  } catch (error) {
    console.error('Error creating savings:', error);
    return NextResponse.json(
      { error: 'Failed to create savings' },
      { status: 500 }
    );
  }
}

export async function GET(_request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all savings for the user
    const savings = await prisma.saving.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ savings });
  } catch (error) {
    console.error('Error fetching savings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch savings' },
      { status: 500 }
    );
  }
}