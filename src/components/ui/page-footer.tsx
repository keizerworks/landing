"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "~/hooks/useTranslation";

interface PageFooterProps {
  nextHref?: string;
  nextLabel?: string;
}

export function PageFooter({ nextHref = "/contact", nextLabel }: PageFooterProps = {}) {
  const previousLabel = useTranslation("Previous");
  const homePageLabel = useTranslation("Home Page");
  const nextButtonLabel = useTranslation("Next");
  const contactPageLabel = useTranslation("Contact Page");
  const defaultNextLabel = nextLabel || contactPageLabel;

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between gap-4">
        <div className="p-4 rounded-[13px] md:min-w-[200px] max-w-[362px] bg-[#FCFBFB] hover:bg-[#F4F4F4] transition-all duration-300">
          <Link href="/" className="inline-flex flex-col  gap-1 group">
            <button className="flex items-center gap-1 text-[16px] font-regular text-sm text-[#979797] hover:text-[#111111] transition-colors group">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {previousLabel}
            </button>
            <div className="text-[16px] font-regular">{homePageLabel}</div>
          </Link>
        </div>
        
        <div className="p-4 rounded-[13px] md:min-w-[200px] max-w-[362px] bg-[#FCFBFB] hover:bg-[#F4F4F4] transition-all duration-300">
          <Link href={nextHref} className="inline-flex flex-col justify-end w-full gap-1 group">
            <button className="flex items-center gap-1 text-[16px] font-regular text-sm text-[#979797] hover:text-[#111111] transition-colors group ml-auto">
              {nextButtonLabel}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-[16px] font-regular text-right">{defaultNextLabel}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

