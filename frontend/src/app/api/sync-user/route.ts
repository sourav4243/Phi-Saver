import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (existingUser) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          email: user.emailAddresses[0].emailAddress,
          avatarUrl: user.imageUrl,
        }
      });
      return NextResponse.json({ user: updatedUser, status: 'updated' });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.emailAddresses[0].emailAddress,
        avatarUrl: user.imageUrl,
        currency: "INR",
        level: 1,
        exp: 0,
        streakDays: 0,
        totalSaved: 0,
        petStatus: {
          create: {
            level: 1,
            stage: 1,
            xp: 0,
            currentImageUrl: "/pets/dragon-1.png",
          },
        },
        currencySetting: {
          create: {
            preferredCurrency: "INR",
            exchangeRateToInr: 1.0,
          },
        }
      }
    });
    
    return NextResponse.json({ user: newUser, status: 'created' });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
} 