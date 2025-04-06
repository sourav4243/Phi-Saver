"use server";

import { prisma } from '../lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * Syncs the current Clerk user with the database
 * Creates or updates the user record with Clerk data
 */
export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return null;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (existingUser) {
      // Update existing user
      return await prisma.user.update({
        where: { id: userId },
        data: {
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          email: user.emailAddresses[0].emailAddress,
          avatarUrl: user.imageUrl,
        }
      });
    }

    // Create new user
    return await prisma.user.create({
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
  } catch (error) {
    console.error("Error syncing user:", error);
    return null;
  }
}

/**
 * Get the current user's friends (accepted friend requests)
 */
export async function getUserFriends() {
  try {
    const { userId } = await auth();
    if (!userId) return [];

    const friends = await prisma.friendRequest.findMany({
      where: {
        OR: [
          { senderId: userId, status: "ACCEPTED" },
          { receiverId: userId, status: "ACCEPTED" }
        ]
      },
      include: {
        sender: true,
        receiver: true
      }
    });

    // Format the friends list to return just the friend user objects
    return friends.map(request => {
      // If the current user is the sender, return the receiver, otherwise return the sender
      return request.senderId === userId ? request.receiver : request.sender;
    });
  } catch (error) {
    console.error("Error getting user friends:", error);
    return [];
  }
}

/**
 * Get pending friend requests for the current user
 */
export async function getPendingFriendRequests() {
  try {
    const { userId } = await auth();
    if (!userId) return [];

    return await prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: "PENDING"
      },
      include: {
        sender: true
      }
    });
  } catch (error) {
    console.error("Error getting pending friend requests:", error);
    return [];
  }
}

/**
 * Send a friend request to another user
 */
export async function sendFriendRequest(receiverEmail: string) {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    // Find the receiver by email
    const receiver = await prisma.user.findUnique({
      where: { email: receiverEmail }
    });

    if (!receiver) {
      throw new Error("User not found");
    }

    // Check if a request already exists
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: receiver.id },
          { senderId: receiver.id, receiverId: userId }
        ]
      }
    });

    if (existingRequest) {
      throw new Error("Friend request already exists");
    }

    // Create the friend request
    return await prisma.friendRequest.create({
      data: {
        senderId: userId,
        receiverId: receiver.id,
        status: "PENDING"
      },
      include: {
        sender: true,
        receiver: true
      }
    });
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
}

/**
 * Accept a friend request
 */
export async function acceptFriendRequest(requestId: number) {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    // Verify the request exists and belongs to the current user
    const request = await prisma.friendRequest.findFirst({
      where: {
        id: requestId,
        receiverId: userId,
        status: "PENDING"
      }
    });

    if (!request) {
      throw new Error("Friend request not found or already processed");
    }

    // Update the request status
    return await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "ACCEPTED" },
      include: {
        sender: true,
        receiver: true
      }
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
}

/**
 * Reject a friend request
 */
export async function rejectFriendRequest(requestId: number) {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    // Verify the request exists and belongs to the current user
    const request = await prisma.friendRequest.findFirst({
      where: {
        id: requestId,
        receiverId: userId,
        status: "PENDING"
      }
    });

    if (!request) {
      throw new Error("Friend request not found or already processed");
    }

    // Update the request status
    return await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "REJECTED" },
      include: {
        sender: true,
        receiver: true
      }
    });
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    throw error;
  }
} 