'use client';

import { useState, useEffect, useCallback } from 'react';

const GUEST_STORAGE_KEY = 'guest_user_id';

/**
 * Retrieves the existing anonymous guest session ID from localStorage,
 * or generates and stores a new one prefixed with 'guest_'.
 */
export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') {
    return 'guest_server';
  }

  try {
    let existingId = localStorage.getItem(GUEST_STORAGE_KEY);
    if (!existingId || !existingId.startsWith('guest_')) {
      const randomSuffix =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
          : Math.random().toString(36).substring(2, 14);
      existingId = `guest_${randomSuffix}`;
      localStorage.setItem(GUEST_STORAGE_KEY, existingId);
    }
    return existingId;
  } catch {
    return 'guest_session';
  }
}

/**
 * React hook to access and manage the active anonymous guest user session.
 */
export function useGuestSession() {
  const [guestId, setGuestId] = useState<string | null>(null);
  const [truncatedId, setTruncatedId] = useState<string>('Guest: #init');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = getOrCreateGuestId();
    setGuestId(id);
    const suffix = id.replace('guest_', '').slice(0, 6);
    setTruncatedId(`Guest: #${suffix}`);
    setIsLoaded(true);
  }, []);

  const resetGuestSession = useCallback(() => {
    if (typeof window !== 'undefined') {
      const randomSuffix =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
          : Math.random().toString(36).substring(2, 14);
      const newId = `guest_${randomSuffix}`;
      localStorage.setItem(GUEST_STORAGE_KEY, newId);
      setGuestId(newId);
      setTruncatedId(`Guest: #${randomSuffix.slice(0, 6)}`);
      return newId;
    }
    return null;
  }, []);

  return {
    guestId,
    truncatedId,
    isLoaded,
    resetGuestSession,
    isGuest: true,
  };
}
