// This file now only exports types and constants
// Actual translation is done via API routes to avoid Node.js module issues in browser

export type SupportedLocale = "en" | "hi" | "fr" | "de";

export const SUPPORTED_LOCALES: SupportedLocale[] = ["en", "hi", "fr", "de"];

export const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: "English",
  hi: "Hindi",
  fr: "French",
  de: "German",
};

export const DEFAULT_LOCALE: SupportedLocale = "en";

