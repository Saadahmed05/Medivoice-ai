"use client";

import { useState, useEffect, useCallback } from "react";

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (val: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

/**
 * Persist state to localStorage with hydration safety.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [value, setInternalValue] = useState<T>(initialValue);

  // Hydrate from storage after mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setInternalValue(JSON.parse(stored) as T);
      }
    } catch {
      // Storage not available (SSR, private mode)
    }
  }, [key]);

  const setValue = useCallback(
    (val: T | ((prev: T) => T)) => {
      setInternalValue((prev) => {
        const next = typeof val === "function" ? (val as (p: T) => T)(prev) : val;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Quota exceeded or storage unavailable
        }
        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // noop
    }
    setInternalValue(initialValue);
  }, [key, initialValue]);

  return { value, setValue, removeValue };
}
