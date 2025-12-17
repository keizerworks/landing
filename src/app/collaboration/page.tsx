"use client";

import React from "react";
import Link from "next/link";
import { gotham_font, spaceGrotesk } from "~/config/font";
import { useTranslation } from "~/hooks/useTranslation";
import { PageNavbar } from "~/components/ui/page-navbar";
import { PageFooter } from "~/components/ui/page-footer";

export default function CollaborationPage() {
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
                Collaboration
              </h1>
              <p className="text-[#6B7280] text-base md:text-lg leading-relaxed">
                Keizerworks is a frontier firm for visionaries. Our members include first-time founders, technical co-founders, product visionaries, ecosystem architects, and operators who understand that great companies aren't built on fragmented foundations.
              </p>
            </div>
          </header>

          {/* Partnership Philosophy Section */}
          <section className="space-y-6">
            <h2 className="font-gb text-2xl md:text-3xl font-bold text-[#111111]">
              The sequence of foundation matters.
            </h2>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Work with us if you want to build a startup that scales with structural integrity, rather than one that accumulates technical and operational debt from the start.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              If you join Keizerworks, the partnership starts with a discovery call where we map your current stage against The Sequence. From there, we operate at the core of your business, bringing legal, documentation, product, security, marketing, residency support, and investor access into one integrated system. We think of it as startup-operations-as-a-service.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              And you might be our next founder partner.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              If you want clarity, structure, and a trusted partner who understands the exact order things need to happen, let's talk.
            </p>
          </section>

          {/* How We Collaborate Section */}
          <section className="space-y-8">
            <h2 className="font-gb text-2xl md:text-3xl font-bold text-[#111111]">
              How it works
            </h2>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Our collaboration model follows The Sequence, ensuring every step builds on the last:
            </p>

            {/* Numbered Sections */}
            <div className="space-y-12 pt-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-3xl md:text-4xl font-bold text-[#111111] flex-shrink-0">1</span>
                  <div className="space-y-3">
                    <h3 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
                      Discovery Call
                    </h3>
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      We assess where you are and what you need
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-3xl md:text-4xl font-bold text-[#111111] flex-shrink-0">2</span>
                  <div className="space-y-3">
                    <h3 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
                      Sequence Mapping
                    </h3>
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      We identify gaps, risks, and next steps
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-3xl md:text-4xl font-bold text-[#111111] flex-shrink-0">3</span>
                  <div className="space-y-3">
                    <h3 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
                      Integrated Execution
                    </h3>
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      We operate at your core: legal, docs, product, security, marketing, residency, VC access
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-gb text-3xl md:text-4xl font-bold text-[#111111] flex-shrink-0">4</span>
                  <div className="space-y-3">
                    <h3 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
                      Ongoing Partnership
                    </h3>
                    <p className="text-[#6B7280] text-base leading-relaxed">
                      We stay embedded as you scale
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Work With Section */}
          <section className="space-y-8 pt-8">
            <h2 className="font-gb text-2xl md:text-3xl font-bold text-[#111111]">
              Who We Work With
            </h2>
            
            <div className="space-y-6">
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Founders who know speed without structure are a liability
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Technical teams are ready to build, but need operational clarity
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Ambitious Founders who want one trusted partner, not six vendors
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Startups that treat operational correctness as a product feature
              </p>
            </div>
          </section>

          {/* The Difference Section */}
          <section className="space-y-8 pt-8">
            <h2 className="font-gb text-2xl md:text-3xl font-bold text-[#111111]">
              Not services. Risk reduction, speed, and structural correctness.
            </h2>
            
            <div className="space-y-6">
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                We work alongside you as a long-term partner embedded at the core of your business, removing complexity so you can focus on building and scaling.
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                One partner. Not multiple agencies, not scattered vendors.
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                The right Sequence. Every step in order, nothing skipped.
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Long-term thinking. We help you avoid the mistakes that show up 18 months later.
              </p>
            </div>
          </section>

          {/* The Difference We Create Section */}
          <section className="space-y-8 pt-8">
            <h2 className="font-gb text-2xl md:text-3xl font-bold text-[#111111]">
              The Difference We Create
            </h2>
            
            <div className="space-y-6">
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Most founders work with multiple vendors who don't talk to each other. Legal doesn't know what product is being built. Marketing doesn't know what security requires. Documentation happens in silos.
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed font-semibold">
                We bring it all together.
              </p>
              <p className="text-[#111111] text-base md:text-lg leading-relaxed">
                Because scattered systems lead to scattered thinking. And scattered thinking slows you down when speed matters most.
              </p>
            </div>
          </section>

          {/* Getting Started Section */}
          <section className="space-y-6 pt-8">
            <h2 className="font-gb text-2xl md:text-3xl font-bold text-[#111111]">
              Your Vision, Our Mission
            </h2>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Ready to build with structure and sequence? The best way to start is by reaching out. Whether you have a fully-formed idea, a working prototype, or just a vision, we're here to map your current stage against The Sequence and explore how we can work together.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              Fill out our contact form or reach out directly. We review every inquiry and respond to promising opportunities. Let's build something great together.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1d4ed8] font-medium transition-colors"
              >
                Get in touch
                <span className="text-lg">→</span>
              </Link>
            </div>
          </section>

          {/* --- FOOTER SECTION --- */}
          <PageFooter />
        </div>
      </main>
    </div>
  );
}
