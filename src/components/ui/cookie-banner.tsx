"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Cookie as CookieIcon, Globe } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";
import { LanguageSelector } from "./language-selector";
import type { SupportedLocale } from "~/lib/lingo";

const CONSENT_COOKIE = "cookie_consent";
const PREFERRED_LOCALE_COOKIE = "lingo_preferred_locale";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

function detectLocale(): SupportedLocale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || navigator.languages?.[0] || "en";
  if (lang.startsWith("hi")) return "hi";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("de")) return "de";
  return "en";
}

export function CookieBanner() {
  const consent = getCookie(CONSENT_COOKIE);
  const [visible, setVisible] = useState(consent !== "accepted");
  const [showManage, setShowManage] = useState(false);
  const [isMounting, setIsMounting] = useState(true); // To prevent hydration mismatch
  const { locale, setLocale } = useLanguage();

  const recommendedLocale = useMemo(detectLocale, []);

  useEffect(() => {
    setIsMounting(false);
    if (consent === "accepted") {
      const cookieLocale = getCookie(PREFERRED_LOCALE_COOKIE);
      if (cookieLocale && ["en", "hi", "fr", "de"].includes(cookieLocale)) {
        setLocale(cookieLocale as SupportedLocale);
      }
    }
  }, [consent, setLocale]);

  const handleAccept = () => {
    setCookie(CONSENT_COOKIE, "accepted");
    setCookie(PREFERRED_LOCALE_COOKIE, recommendedLocale);
    if (locale !== recommendedLocale) {
      setLocale(recommendedLocale);
    }
    setVisible(false);
  };

  if (!visible || isMounting) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[2000] w-[90%] max-w-[440px]">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-xl backdrop-blur-md transition-all ring-1 ring-black/5">
        
        {/* Header & Main Content */}
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-900">
            <CookieIcon size={18} />
          </div>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Cookie Preferences</h3>
              <button
                onClick={() => setVisible(false)}
                className="-mr-1 -mt-1 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm leading-tight text-gray-600">
              We use cookies to improve experience and localize content.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowManage(!showManage)}
            className="flex items-center justify-center gap-2  border border-gray-300 bg-transparent px-4 py-3 font-sans text-sm font-bold uppercase tracking-wide text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
          >
             <Globe size={14} />
             {showManage ? "Close Options" : "Options"}
          </button>
          <button
            onClick={handleAccept}
            className="group  bg-black px-4 py-3 font-sans text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            Accept All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10m10-10H7m10 0v10" />
            </svg>
          </button>
        </div>

        {/* Expandable Options Area with Smooth Transition */}
        <div 
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            showManage
              ? "grid-rows-[1fr] mt-4 pt-4 border-t border-gray-100"
              : "grid-rows-[0fr] mt-0 pt-0 border-t-0"
          }`}
        >
          <div
            className={`space-y-3 transition-all duration-300 ${
              showManage
                ? "opacity-100 pointer-events-auto translate-y-0 overflow-visible"
                : "opacity-0 pointer-events-none -translate-y-1 overflow-hidden"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Detected Region:</span>
              <span className="font-mono font-medium text-gray-900 uppercase bg-gray-100 px-2 py-0.5 rounded">
                {recommendedLocale}
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-gray-700">Select Language</span>
              {/* Ensure LanguageSelector fits the minimal theme */}
              <div className="scale-90 origin-right">
                <LanguageSelector openUpwards />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}