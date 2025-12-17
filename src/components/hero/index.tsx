"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslation } from "~/hooks/useTranslation";

interface NavLink {
  label: string;
  href: string;
}

const KeizerLogo = ({
  color = "white",
  className = "",
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <Image
      src="/assets/logos/keizer-logo.svg"
      alt="Keizer Logo"
      width={120}
      height={40}
      className={className}
      style={{ filter: color === "white" ? "brightness(0) invert(1)" : "none" }}
    />
  );
};

const KeizerIconLarge = ({ className = "" }: { className?: string }) => {
  return (
    <Image
      src="/assets/logos/keizer-bg-blue.svg"
      alt="Keizer Icon"
      width={256}
      height={256}
      className={className}
    />
  );
};

const HeroSection = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const blogsLabel = useTranslation("Blogs");
  const approachLabel = useTranslation("Approach");
  const collaborationLabel = useTranslation("Collabration");
  const contactUsLabel = useTranslation("Contact us");
  const heroTitlePart1 = useTranslation("We Partner with Startups to");
  const heroTitlePart2 = useTranslation("Scale, Build & Raise faster");
  
  const navLinks: NavLink[] = [
    { label: blogsLabel, href: "/blog" },
    { label: approachLabel, href: "/approach" },
    { label: collaborationLabel, href: "/collaboration" },
    { label: contactUsLabel, href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[60vh] flex flex-col justify-between overflow-hidden">
    
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(180deg, #010518 0%, #0060FF 76.2%, #FFFFFF 121.2%)`,
        }}
      /> 

    
      <div className="absolute right-0 top-0 h-full w-1/3 z-10 pointer-events-none hidden md:block">
      
        <div
          className="absolute right-[96px] top-0 h-1/2 w-[48px]"
          style={{
            background: "linear-gradient(180deg, rgba(1, 95, 255, 0.37) 0%, #051430 39.98%)",
          }}
        />
      
        <div
          className="absolute right-[146px] bottom-0 h-1/2 w-[48px]"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.87) 0%,rgba(255, 255, 255, 0.87) 50%, rgba(1, 95, 255, 0.68) 100%)",
          }}
        />
      
        <div
          className="absolute right-0 top-0 h-1/2 w-[48px]"
          style={{
            background: "linear-gradient(180deg, rgba(1, 95, 255, 0.37) 0%, #051430 39.98%)",
          }}
        />
      
        <div
          className="absolute right-[48px] bottom-0 h-1/2 w-[48px]"
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.87) 0%,rgba(255, 255, 255, 0.87) 50%, rgba(1, 95, 255, 0.68) 100%)",
          }}
        />
      </div>

    
      <nav className="absolute top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center justify-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white text-[16px] font-medium tracking-[6%] hover:text-white/80 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

      
      <div className="relative top-4 md:top-16 z-50 w-full px-6 md:px-16 py-4 md:py-8 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <Image src="/assets/logos/klogo.svg" alt="Keizer Logo" width={105} height={43} className="w-[80px] h-auto md:w-[105px]" />
        </Link>

        {/* Mobile Menu Button & Dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={toggleMobileMenu}
            className="relative z-[65] text-white cursor-pointer p-2 hover:opacity-80 transition-all duration-300 transform active:scale-95"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">
              <div className={`absolute inset-0 transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
                <Menu size={24} />
              </div>
              <div className={`absolute inset-0 transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
                <X size={24} />
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-[55] bg-black/10 backdrop-blur-[2px] animate-in fade-in duration-300"
                onClick={closeMobileMenu}
              />
              
              {/* Dropdown Panel */}
              <div className="absolute right-0 top-full mt-2 z-[60] min-w-[220px] bg-[#051430]/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 origin-top-right">
                <nav className="py-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center px-5 py-3.5 text-white/90 text-[15px] font-medium tracking-wide transition-all duration-200 hover:bg-white/10 hover:text-white"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>

    
      <div className="relative z-40 w-full px-6 md:px-20 pb-8 md:pb-12 flex-grow flex items-end">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[36px] font-regular text-white tracking-tight leading-tight">
            {heroTitlePart1} <br className="hidden sm:block" />
            <span className="opacity-95">{heroTitlePart2}</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
export { KeizerLogo, KeizerIconLarge };
