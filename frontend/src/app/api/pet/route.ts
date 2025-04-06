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

    // Get pet status
    const petStatus = await prisma.petStatus.findUnique({
      where: { userId }
    });

    if (!petStatus) {
      return NextResponse.json(
        { error: 'Pet status not found' },
        { status: 404 }
      );
    }

    // Calculate pet evolution progress
    const xpPerStage = 1000; // Example: 1000 XP per stage
    const currentStageXp = petStatus.xp % xpPerStage;
    const evolutionProgress = Math.floor((currentStageXp / xpPerStage) * 100);

    // Determine pet image based on level and stage
    let petImageUrl = petStatus.currentImageUrl;
    
    // If the current image URL is not set or is a default value, generate a new one
    if (!petImageUrl || petImageUrl === "/pets/dragon-1.png") {
      // Format: /assets/levels/level{stage}_{petType}.jpg
      petImageUrl = `/assets/levels/level${petStatus.stage}_${petStatus.petType.toLowerCase()}.jpg`;
      
      // Update the pet status with the new image URL
      await prisma.petStatus.update({
        where: { id: petStatus.id },
        data: { currentImageUrl: petImageUrl }
      });
    }

    return NextResponse.json({
      pet: {
        id: petStatus.id,
        petType: petStatus.petType,
        level: petStatus.level,
        stage: petStatus.stage,
        xp: petStatus.xp,
        evolutionProgress,
        imageUrl: petImageUrl
      }
    });
  } catch (error) {
    console.error('Error fetching pet data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pet data' },
      { status: 500 }
    );
  }
} 