"use client";

/* eslint-disable jsx-a11y/aria-proptypes */
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "~/contexts/LanguageContext";
import { SUPPORTED_LOCALES, LOCALE_NAMES, type SupportedLocale } from "~/lib/lingo";
import { cn } from "~/lib/utils";

const LOCALE_FLAGS: Record<SupportedLocale, string> = {
  en: "🇬🇧",
  hi: "🇮🇳",
  fr: "🇫🇷",
  de: "🇩🇪",
};

type LanguageSelectorProps = {
  /** When true, renders the dropdown above the trigger (useful in tight popups). */
  openUpwards?: boolean;
};

export function LanguageSelector({ openUpwards = false }: LanguageSelectorProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-full border border-transparent",
          "hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50",
        )}
        aria-label="Globe"
        aria-haspopup="true"
      >
        <Image
          src="/assets/decoration/globe.svg"
          alt="Globe"
          width={44}
          height={44}
          className="w-[44px] h-[44px]"
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 w-32 rounded-lg shadow-lg z-50",
            openUpwards
              ? "bottom-full mb-2 animate-in fade-in slide-in-from-bottom-2"
              : "top-full mt-2 animate-in fade-in slide-in-from-top-2",
            "bg-white border border-gray-200 overflow-hidden",
            "duration-200",
          )}
          role="menu"
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-left",
                "text-sm hover:bg-gray-50 transition-colors",
                "focus:outline-none focus:bg-gray-50",
              )}
              role="menuitem"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900">
                  {LOCALE_NAMES[loc]}
                </span>
              </div>
              {locale === loc && (
                <Check className="w-4 h-4 " />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

