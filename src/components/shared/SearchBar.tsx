"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Blog posts data - should be shared from a common source in production
const blogPosts = [
  {
    id: 1,
    title: "Introducing Keizer k26 : Build & Scale",
    description: "Keizer partners with startups to develop market-ready products, providing the expertise and support needed for growth.",
    category: "Venture Capital",
    image: "/assets/decoration/blog-1.svg",
  },
  {
    id: 2,
    title: "Introducing Keizer k25 : JOIN THE CULTURE",
    description: "Keizer partners with startups to develop market-ready products, providing the expertise and support needed for growth.",
    category: "Venture Capital",
    image: "/assets/decoration/blog-2.svg",
  },
];

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ placeholder = "Search blogs", onSearch, initialValue = "" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

 
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

 
  const searchResults = useCallback((query: string) => {
    if (!query.trim()) return [];
    return searchBlogs(query);
  }, []);

  const results = searchQuery.trim() ? searchResults(searchQuery) : [];

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return;

   
    if (onSearch) {
      onSearch(query);
      return;
    }

   
    router.push(`/blog?search=${encodeURIComponent(query)}`);
    setShowResults(false);
  }, [router, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    } else if (e.key === "Escape") {
      setShowResults(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.trim().length > 0);
    
   
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchQuery.trim().length > 0) {
      setShowResults(true);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setIsFocused(false);
  };

  return (
    <div ref={searchRef} className="hidden md:flex items-center relative w-full max-w-[400px] mx-8">
      <Search className="absolute left-3 w-4 h-4 text-gray-400 z-10" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className="w-full bg-[#F3F4F6] text-sm py-2.5 pl-10 pr-10 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-500"
      />
      <div className="absolute right-3 w-5 h-5 flex items-center justify-center bg-gray-200 rounded text-[10px] font-semibold text-[#5C5C5C] z-10">
        /
      </div>

      
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider px-3 py-2">
              Blog Results ({results.length})
            </div>
            {results.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                onClick={handleResultClick}
                className="block px-3 py-3 hover:bg-gray-50 rounded-md transition-colors group"
              >
                <div className="font-semibold text-[#111111] text-sm group-hover:text-[#2563EB] transition-colors mb-1">
                  {post.title}
                </div>
                <div className="text-xs text-[#6B7280] line-clamp-2">
                  {post.description}
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                    {post.category}
                  </span>
                </div>
              </Link>
            ))}
            {searchQuery.trim() && (
              <Link
                href={`/blog?search=${encodeURIComponent(searchQuery)}`}
                onClick={handleResultClick}
                className="block px-3 py-3 hover:bg-gray-50 rounded-md transition-colors text-center text-sm font-medium text-[#2563EB] border-t border-gray-100 mt-2"
              >
                View all results →
              </Link>
            )}
          </div>
        </div>
      )}

      
      {showResults && searchQuery.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 text-center">
            <p className="text-sm text-[#6B7280]">No blog posts found matching "{searchQuery}"</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Export function to search blogs (can be used elsewhere)
export function searchBlogs(query: string) {
  if (!query.trim()) return blogPosts;

  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.category.toLowerCase().includes(lowerQuery)
  );
}

