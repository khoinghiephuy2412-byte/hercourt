"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "hercourt-favs";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // If stored contains indices (from legacy site 0..21), map to "p{i+1}"
          const converted = parsed.map((item) =>
            typeof item === "number" ? `p${item + 1}` : String(item)
          );
          setWishlist(converted);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist]
  );

  return {
    wishlist,
    count: wishlist.length,
    toggleWishlist,
    isFavorite,
    isLoaded,
  };
}
