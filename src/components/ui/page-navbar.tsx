"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "~/components/shared/SearchBar";
import { LanguageSelector } from "~/components/ui/language-selector";
import { useTranslation } from "~/hooks/useTranslation";

interface PageNavbarProps {
  /** Optional label to display next to the logo (e.g., "Blog") */
  logoLabel?: string;
  /** Link href for the logo. Defaults to "/" */
  logoHref?: string;
  /** Optional search placeholder. Defaults to "Search blogs" */
  searchPlaceholder?: string;
  /** Optional search handler for blog pages */
  onSearch?: (query: string) => void;
  /** Optional initial search value */
  initialSearchValue?: string;
}

export function PageNavbar({
  logoLabel,
  logoHref = "/",
  searchPlaceholder,
  onSearch,
  initialSearchValue,
}: PageNavbarProps) {
  const defaultSearchPlaceholder = useTranslation("Search blogs");
  const placeholder = searchPlaceholder || defaultSearchPlaceholder;

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={logoHref} className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/assets/logos/klogo1.svg"
            alt="Keizer Logo"
            width={44}
            height={44}
            className="w-[44px] h-[44px]"
          />
          {logoLabel && (
            <span className="font-semibold text-[16px]">{logoLabel}</span>
          )}
        </Link>

        <SearchBar
          placeholder={placeholder}
          onSearch={onSearch}
          initialValue={initialSearchValue}
        />

        <LanguageSelector />
      </div>
    </header>
  );
}

