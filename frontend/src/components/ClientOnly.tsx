'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with ssr: false
export const ChatButton = dynamic(() => import('@/components/chat/ChatButton'), {
  ssr: false,
  loading: () => null
});

export const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })), {
  ssr: false,
  loading: () => null
});

// Client-only wrapper component
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state immediately
    setIsMounted(true);

    // Log for debugging
    console.log('ClientOnly component mounted');
  }, []);

  // Return a placeholder div while mounting to ensure layout space is reserved
  if (!isMounted) {
    return <div style={{ position: 'fixed' }}></div>;
  }

  return <>{children}</>;
}
