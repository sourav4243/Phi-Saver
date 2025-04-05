"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface FriendRequest {
  id: string;
  name: string;
  email: string;
  date: string;
}

interface FriendRequestContextType {
  friendRequests: FriendRequest[];
  friendRequestCount: number;
  setFriendRequests: (requests: FriendRequest[]) => void;
  acceptFriendRequest: (requestId: string) => void;
  rejectFriendRequest: (requestId: string) => void;
}

const FriendRequestContext = createContext<FriendRequestContextType | undefined>(undefined);

export function FriendRequestProvider({ children }: { children: ReactNode }) {
  // Initial sample data - would come from API in production
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    { id: '1', name: 'Priya Sharma', email: 'priya.sharma@example.com', date: '2024-03-01' },
    { id: '2', name: 'Rahul Patel', email: 'rahul.patel@example.com', date: '2024-03-02' }
  ]);

  const friendRequestCount = friendRequests.length;

  const acceptFriendRequest = (requestId: string) => {
    // Here you would typically send the acceptance to your backend
    console.log('Accepting friend request:', requestId);
    // Remove the accepted request from the list
    setFriendRequests(friendRequests.filter(request => request.id !== requestId));
  };

  const rejectFriendRequest = (requestId: string) => {
    // Here you would typically send the rejection to your backend
    console.log('Rejecting friend request:', requestId);
    // Remove the rejected request from the list
    setFriendRequests(friendRequests.filter(request => request.id !== requestId));
  };

  return (
    <FriendRequestContext.Provider 
      value={{ 
        friendRequests, 
        friendRequestCount,
        setFriendRequests, 
        acceptFriendRequest, 
        rejectFriendRequest 
      }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
}

export function useFriendRequests() {
  const context = useContext(FriendRequestContext);
  if (context === undefined) {
    throw new Error('useFriendRequests must be used within a FriendRequestProvider');
  }
  return context;
} 