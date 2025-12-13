"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { Globe, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBar from "~/components/shared/SearchBar";

const blogPosts = [
  {
    id: 1,
    title: "Introducing Keizer k26 : Build & Scale",
    description:
      "Keizer partners with startups to develop market-ready products, providing the expertise and support needed for growth.",
    category: "Venture Capital",
    image:
      "/assets/decoration/blog-1.svg",
  },
  {
    id: 2,
    title: "Introducing Keizer k25 : JOIN THE CULTURE",
    description:
      "Keizer partners with startups to develop market-ready products, providing the expertise and support needed for growth.",
    category: "Venture Capital",
    image:
      "/assets/decoration/blog-2.svg",
  },
];

const categories = ["New", "Case Studies", "Research", "All"];

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB] ${className}`}
  >
    {children}
  </span>
);

const BlogPostCard = ({ post }: { post: (typeof blogPosts)[0] }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group flex flex-col md:flex-row gap-8 items-center  py-8 border-b border-transparent hover:bg-gray-50/50 transition-colors rounded-xl p-4 cursor-pointer"
      >
        
        <div className="w-full md:w-[320px] h-[200px] flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            width={320}
            height={200}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        
        <div className="flex flex-col  gap-3 max-w-xl pt-2">
          <h3 className="text-[22px] font-bold text-[#111111] leading-tight group-hover:text-[#2563EB] transition-colors">
            {post.title}
          </h3>
          <p className="text-[#6B7280] text-[15px] leading-relaxed">
            {post.description}
          </p>
          <div className="mt-2">
            <Badge>{post.category}</Badge>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};


function BlogListingContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogPosts;
    }
    const lowerQuery = searchQuery.toLowerCase();
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#111111]">
      
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image src="/assets/logos/klogo1.svg" alt="Keizer Logo" width={44} height={44} className="w-[44px] h-[44px]" />
            <span className="font-semibold text-[16px]">Blog</span>
          </Link>

          
          <SearchBar placeholder="Search blogs" onSearch={setSearchQuery} initialValue={searchQuery} />

          
          <button className="" aria-label="Globe">
            <Image src="/assets/decoration/globe.svg" alt="Globe" width={44} height={44} className="w-[44px] h-[44px]" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {searchQuery ? `Search Results (${filteredPosts.length})` : "Recent Posts"}
          </h1>

          <div className="flex flex-wrap gap-1">
            {categories.map((cat, index) => {
              const isFirst = index === 0;
              const isLast = index === categories.length - 1;
              const isActive = activeCategory === cat;
              
              let borderRadius = "rounded-xl"; 

              if (isActive) {
                borderRadius = "rounded-full";
              } else if (isFirst) {
                borderRadius = "rounded-l-full rounded-r-xl";
              } else if (isLast) {
                borderRadius = "rounded-r-full rounded-l-xl";
              }

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 ${borderRadius} text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#111111] text-white"
                      : "bg-[#F3F4F6] text-[#6B7280]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        
        <div className="flex flex-col gap-8 mb-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[#6B7280] text-lg">No blog posts found matching your search.</p>
            </div>
          )}
        </div>

        <div className="mt-20 p-4 rounded-[13px] max-w-[362px] bg-[#FCFBFB] hover:bg-[#F4F4F4] transition-all duration-300">
          <Link
            href="/"
            className="inline-flex flex-col gap-1 group"
          >
            <button className="flex items-center gap-1 text-[16px] font-regular text-sm text-[#979797] hover:text-[#111111] transition-colors group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Previous
            </button>
            <div className=" text-[16px] font-regular">
              Home Page
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}


function BlogListingFallback() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111111]">
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image src="/assets/logos/klogo1.svg" alt="Keizer Logo" width={44} height={44} className="w-[44px] h-[44px]" />
            <span className="font-semibold text-[16px]">Blog</span>
          </Link>
          <div className="flex-1 max-w-md mx-4">
            <div className="h-10 bg-gray-100 rounded-md animate-pulse" />
          </div>
          <button className="" aria-label="Globe">
            <Image src="/assets/decoration/globe.svg" alt="Globe" width={44} height={44} className="w-[44px] h-[44px]" />
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-100 rounded w-1/3" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


export default function BlogListing() {
  return (
    <Suspense fallback={<BlogListingFallback />}>
      <BlogListingContent />
    </Suspense>
  );
}

