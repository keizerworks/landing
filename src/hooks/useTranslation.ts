"use client";

import { useLanguage } from "~/contexts/LanguageContext";
import { useState, useEffect } from "react";

/**
 * Hook for translating text content
 * @param text - The text to translate
 * @param options - Translation options
 * @returns The translated text (or original if locale is English or translation fails)
 */
export function useTranslation(
  text: string,
  options?: { fast?: boolean },
): string {
  const { locale, translateText } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (locale === "en") {
      setTranslated(text);
      return;
    }

    let cancelled = false;

    translateText(text, options)
      .then((result) => {
        if (!cancelled) {
          setTranslated(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTranslated(text);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [text, locale, translateText, options?.fast]);

  return translated;
}

/**
 * Hook for translating objects (like JSON data)
 * @param obj - The object to translate
 * @param options - Translation options
 * @returns The translated object (or original if locale is English or translation fails)
 */
export function useTranslationObject<T extends Record<string, any> | any[]>(
  obj: T,
  options?: { fast?: boolean },
): T {
  const { locale, translateObject } = useLanguage();
  const [translated, setTranslated] = useState<T>(obj);

  useEffect(() => {
    if (locale === "en") {
      setTranslated(obj);
      return;
    }

    // Skip translation if object is empty
    if (Array.isArray(obj) && obj.length === 0) {
      setTranslated(obj);
      return;
    }

    if (!Array.isArray(obj) && Object.keys(obj).length === 0) {
      setTranslated(obj);
      return;
    }

    let cancelled = false;

    translateObject(obj, options)
      .then((result) => {
        if (!cancelled) {
          setTranslated(result);
        }
      })
      .catch((error) => {
        console.error("Translation error in useTranslationObject:", error);
        if (!cancelled) {
          setTranslated(obj);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [obj, locale, translateObject, options?.fast]);

  return translated;
}

/**
 * Hook for translating HTML content
 * @param html - The HTML string to translate
 * @param options - Translation options
 * @returns The translated HTML (or original if locale is English or translation fails)
 */
export function useTranslationHtml(
  html: string,
  options?: { fast?: boolean },
): string {
  const { locale, translateHtml } = useLanguage();
  const [translated, setTranslated] = useState(html);

  useEffect(() => {
    if (locale === "en") {
      setTranslated(html);
      return;
    }

    let cancelled = false;

    translateHtml(html, options)
      .then((result) => {
        if (!cancelled) {
          setTranslated(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTranslated(html);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [html, locale, translateHtml, options?.fast]);

  return translated;
}

