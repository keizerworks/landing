"use client";

import React from "react";
import { gotham_font, spaceGrotesk } from "~/config/font";
import { useTranslation } from "~/hooks/useTranslation";
import { PageNavbar } from "~/components/ui/page-navbar";
import { PageFooter } from "~/components/ui/page-footer";

export default function ApproachPage() {
  const searchBlogsPlaceholder = useTranslation("Search blogs");

  return (
    <div className={`min-h-screen bg-white font-sans text-[#111111] ${gotham_font.variable} ${spaceGrotesk.variable}`}>
      {/* --- NAVBAR --- */}
      <PageNavbar searchPlaceholder={searchBlogsPlaceholder} />

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-[720px] mx-auto w-full space-y-16">
          {/* Hero Section */}
          <header className="space-y-6">
            <div>
              <h1 className="font-gb text-4xl md:text-5xl leading-[1.1] mb-6 font-semibold text-[#111111]">
                Approach
              </h1>
              <p className="text-[#6B7280] text-base md:text-lg leading-relaxed">
                The sequence of foundation matters.
              </p>
            </div>
          </header>

          {/* Introduction Section */}
          <section className="space-y-6">
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Most early-stage founders don't fail because they lack vision. They fail because critical functions such as legal, documentation, product architecture, security, and marketing are fragmented, delayed, or mishandled.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Keizer exists to solve that. We've mapped the exact sequence startups need to follow, and we execute it alongside you:
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed font-semibold">
              Legal → Documentation → Product → Security → Marketing → First User
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Each step builds on the last. Skip one, and you'll return to it later—usually at a higher cost, with a slower trajectory.
            </p>
          </section>

          {/* Why Sequence Matters Section */}
          <section className="space-y-8">
            <h2 className="font-gb text-2xl md:text-3xl font-bold text-[#111111]">
              Why Sequence Matters
            </h2>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Skip a step, and you'll come back to it usually at 10x the cost, with 10x the friction.
            </p>

            {/* Sequence Steps */}
            <div className="space-y-8 pt-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-xl md:text-2xl font-bold text-[#111111] flex-shrink-0">Legal</span>
                  <span className="text-[#6B7280] text-lg">→</span>
                  <div className="space-y-2">
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      Legal before product → so your IP is protected before you build
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-xl md:text-2xl font-bold text-[#111111] flex-shrink-0">Documentation</span>
                  <span className="text-[#6B7280] text-lg">→</span>
                  <div className="space-y-2">
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      Documentation before execution → so your logic is clear before you scale
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-xl md:text-2xl font-bold text-[#111111] flex-shrink-0">Product</span>
                  <span className="text-[#6B7280] text-lg">→</span>
                  <div className="space-y-2">
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      Product before marketing → so you're not selling vapor
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-xl md:text-2xl font-bold text-[#111111] flex-shrink-0">Security</span>
                  <span className="text-[#6B7280] text-lg">→</span>
                  <div className="space-y-2">
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      Security before growth → so you don't scale vulnerabilities
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-xl md:text-2xl font-bold text-[#111111] flex-shrink-0">Marketing</span>
                  <span className="text-[#6B7280] text-lg">→</span>
                  <div className="space-y-2">
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      Marketing before users → so people know you exist
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-xl md:text-2xl font-bold text-[#111111] flex-shrink-0">First User</span>
                  <span className="text-[#6B7280] text-lg">→</span>
                  <div className="space-y-2">
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      First user before funding → so you have proof, not just promises
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[#111111] text-base md:text-lg leading-relaxed pt-4">
              The companies that last don't move in circles. They move in sequence.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed font-semibold">
              Keizerworks is gonna own the sequence. Legal → Documentation → Product → Security → Marketing → First User.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed pt-4">
              The sequence you need to be in the market for a long time
            </p>
          </section>


          {/* --- FOOTER SECTION --- */}
          <PageFooter />
        </div>
      </main>
    </div>
  );
}

