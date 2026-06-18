"use client";

import { useState, useCallback } from "react";
import { debounce } from "@/lib/utils";

interface UseSearchReturn<T> {
  query: string;
  setQuery: (q: string) => void;
  results: T[];
  isSearching: boolean;
}

/**
 * Generic client-side search hook with debouncing.
 * @param items - The full list of items to search.
 * @param searchFn - Function returning true if an item matches the query.
 * @param delay - Debounce delay in ms (default: 300).
 */
export function useSearch<T>(
  items: T[],
  searchFn: (item: T, query: string) => boolean,
  delay = 300
): UseSearchReturn<T> {
  const [query, setQueryRaw] = useState("");
  const [results, setResults] = useState<T[]>(items);
  const [isSearching, setIsSearching] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((q: string) => {
      const trimmed = q.trim().toLowerCase();
      if (!trimmed) {
        setResults(items);
      } else {
        setResults(items.filter((item) => searchFn(item, trimmed)));
      }
      setIsSearching(false);
    }, delay),
    [items, searchFn, delay]
  );

  const setQuery = useCallback(
    (q: string) => {
      setQueryRaw(q);
      setIsSearching(true);
      debouncedSearch(q);
    },
    [debouncedSearch]
  );

  return { query, setQuery, results, isSearching };
}
