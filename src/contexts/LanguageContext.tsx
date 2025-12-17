"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { SupportedLocale } from "~/lib/lingo";
import { DEFAULT_LOCALE } from "~/lib/lingo";
import {
  getCachedTranslation,
  setCachedTranslation,
} from "~/lib/translationCache";

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  translateText: (text: string, options?: { fast?: boolean }) => Promise<string>;
  translateObject: <T extends Record<string, any>>(
    obj: T,
    options?: { fast?: boolean },
  ) => Promise<T>;
  translateHtml: (html: string, options?: { fast?: boolean }) => Promise<string>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "lingo_preferred_locale";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectBrowserLocale(): SupportedLocale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const lang = navigator.language || navigator.languages?.[0] || "en";
  if (lang.startsWith("hi")) return "hi";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("de")) return "de";
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ["en", "hi", "fr", "de"].includes(stored)) {
      return stored as SupportedLocale;
    }
    const cookieLocale = getCookie(STORAGE_KEY);
    if (cookieLocale && ["en", "hi", "fr", "de"].includes(cookieLocale)) {
      return cookieLocale as SupportedLocale;
    }
    return detectBrowserLocale();
  });
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, locale);
      document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
  }, []);

  const translateText = useCallback(
    async (text: string, options?: { fast?: boolean }): Promise<string> => {
      if (locale === DEFAULT_LOCALE || !text.trim()) {
        return text;
      }

      // Check cache first
      const cached = getCachedTranslation<string>(locale, text);
      if (cached !== null) {
        return cached;
      }

      setIsTranslating(true);
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            sourceLocale: DEFAULT_LOCALE,
            targetLocale: locale,
            type: "text",
          }),
        });

        if (!response.ok) {
          throw new Error("Translation failed");
        }

        const data = await response.json();
        const translated = data.translated || text;

        // Cache the translation
        setCachedTranslation(locale, text, translated);
        return translated;
      } catch (error) {
        console.error("Translation error:", error);
        // Fallback to original text on error
        return text;
      } finally {
        setIsTranslating(false);
      }
    },
    [locale],
  );

  const translateObject = useCallback(
    async <T extends Record<string, any> | any[]>(
      obj: T,
      options?: { fast?: boolean },
    ): Promise<T> => {
      if (locale === DEFAULT_LOCALE) {
        return obj;
      }

      // Skip empty objects/arrays
      if (Array.isArray(obj) && obj.length === 0) {
        return obj;
      }
      if (!Array.isArray(obj) && Object.keys(obj).length === 0) {
        return obj;
      }

      // Create a cache key from the object
      const cacheKey = JSON.stringify(obj);
      const cached = getCachedTranslation<T>(locale, cacheKey);
      if (cached !== null) {
        return cached;
      }

      setIsTranslating(true);
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            object: obj,
            sourceLocale: DEFAULT_LOCALE,
            targetLocale: locale,
            type: "object",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || `Translation failed: ${response.status}`;
          console.error("Translation API error:", errorMessage, errorData);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        const translated = (data.translated || obj) as T;

        // Cache the translation
        setCachedTranslation(locale, cacheKey, translated);
        return translated;
      } catch (error) {
        console.error("Translation error:", error);
        // Fallback to original object on error
        return obj;
      } finally {
        setIsTranslating(false);
      }
    },
    [locale],
  );

  const translateHtml = useCallback(
    async (html: string, options?: { fast?: boolean }): Promise<string> => {
      if (locale === DEFAULT_LOCALE || !html.trim()) {
        return html;
      }

      // Check cache first
      const cached = getCachedTranslation<string>(locale, html);
      if (cached !== null) {
        return cached;
      }

      setIsTranslating(true);
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            html,
            sourceLocale: DEFAULT_LOCALE,
            targetLocale: locale,
            type: "html",
          }),
        });

        if (!response.ok) {
          throw new Error("Translation failed");
        }

        const data = await response.json();
        const translated = data.translated || html;

        // Cache the translation
        setCachedTranslation(locale, html, translated);
        return translated;
      } catch (error) {
        console.error("Translation error:", error);
        // Fallback to original HTML on error
        return html;
      } finally {
        setIsTranslating(false);
      }
    },
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        translateText,
        translateObject,
        translateHtml,
        isTranslating,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

