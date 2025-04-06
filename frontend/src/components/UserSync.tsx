"use client";

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function UserSync() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && isLoaded) {
        try {
          const response = await fetch('/api/sync-user', {
            method: 'POST',
          });
          
          if (!response.ok) {
            console.error('Failed to sync user data');
          }
        } catch (error) {
          console.error('Error syncing user data:', error);
        }
      }
    };

    syncUser();
  }, [isSignedIn, isLoaded]);

  // This component doesn't render anything
  return null;
} 