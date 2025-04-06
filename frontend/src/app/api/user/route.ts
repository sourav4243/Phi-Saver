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

    // Get user data including pet status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        petStatus: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate level progress
    const expPerLevel = 1000; // Example: 1000 XP per level
    const currentLevelExp = user.exp % expPerLevel;
    const levelProgress = Math.floor((currentLevelExp / expPerLevel) * 100);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        level: user.level,
        exp: user.exp,
        levelProgress,
        streakDays: user.streakDays,
        totalSaved: user.totalSaved,
        petStatus: user.petStatus
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
} 