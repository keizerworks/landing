import type { SupportedLocale } from "./lingo";

interface CacheEntry {
  translated: string | any;
  timestamp: number;
  locale: SupportedLocale;
}

const CACHE_PREFIX = "lingo_cache_";
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_CACHE_SIZE_MB = 5;
const BYTES_PER_MB = 1024 * 1024;

function generateCacheKey(locale: SupportedLocale, content: string): string {
  // Simple hash function for content
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `${CACHE_PREFIX}${locale}_${Math.abs(hash)}`;
}

function getCacheSize(): number {
  let total = 0;
  for (let key in localStorage) {
    if (key.startsWith(CACHE_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value) {
        total += key.length + value.length;
      }
    }
  }
  return total;
}

function cleanupExpiredCache(): void {
  const now = Date.now();
  const keysToRemove: string[] = [];

  for (let key in localStorage) {
    if (key.startsWith(CACHE_PREFIX)) {
      try {
        const entry: CacheEntry = JSON.parse(localStorage.getItem(key) || "{}");
        if (now - entry.timestamp > CACHE_EXPIRY_MS) {
          keysToRemove.push(key);
        }
      } catch {
        // Invalid entry, remove it
        keysToRemove.push(key);
      }
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

function ensureCacheSize(): void {
  const currentSize = getCacheSize();
  const maxSizeBytes = MAX_CACHE_SIZE_MB * BYTES_PER_MB;

  if (currentSize > maxSizeBytes) {
    // Remove oldest entries first
    const entries: Array<{ key: string; timestamp: number }> = [];

    for (let key in localStorage) {
      if (key.startsWith(CACHE_PREFIX)) {
        try {
          const entry: CacheEntry = JSON.parse(localStorage.getItem(key) || "{}");
          entries.push({ key, timestamp: entry.timestamp });
        } catch {
          // Invalid entry, remove it
          localStorage.removeItem(key);
        }
      }
    }

    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a.timestamp - b.timestamp);

    // Remove oldest entries until we're under the limit
    let removed = 0;
    while (getCacheSize() > maxSizeBytes && removed < entries.length) {
      localStorage.removeItem(entries[removed].key);
      removed++;
    }
  }
}

export function getCachedTranslation<T>(
  locale: SupportedLocale,
  content: string,
): T | null {
  if (typeof window === "undefined") return null;

  try {
    cleanupExpiredCache();
    const key = generateCacheKey(locale, content);
    const cached = localStorage.getItem(key);

    if (cached) {
      const entry: CacheEntry = JSON.parse(cached);
      if (entry.locale === locale && Date.now() - entry.timestamp < CACHE_EXPIRY_MS) {
        return entry.translated as T;
      } else {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error("Error reading from cache:", error);
  }

  return null;
}

export function setCachedTranslation<T>(
  locale: SupportedLocale,
  content: string,
  translated: T,
): void {
  if (typeof window === "undefined") return;

  try {
    ensureCacheSize();
    const key = generateCacheKey(locale, content);
    const entry: CacheEntry = {
      translated,
      timestamp: Date.now(),
      locale,
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.error("Error writing to cache:", error);
    // If storage is full, try to clean up and retry
    if (error instanceof DOMException && error.code === 22) {
      cleanupExpiredCache();
      try {
        const key = generateCacheKey(locale, content);
        const entry: CacheEntry = {
          translated,
          timestamp: Date.now(),
          locale,
        };
        localStorage.setItem(key, JSON.stringify(entry));
      } catch (retryError) {
        console.error("Failed to cache after cleanup:", retryError);
      }
    }
  }
}

export function clearTranslationCache(): void {
  if (typeof window === "undefined") return;

  const keysToRemove: string[] = [];
  for (let key in localStorage) {
    if (key.startsWith(CACHE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

