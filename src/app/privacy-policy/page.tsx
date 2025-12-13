"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "~/components/shared/SearchBar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111111]">
      
      {/* --- NAVBAR (Same as blog listing) --- */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image src="/assets/logos/klogo1.svg" alt="Keizer Logo" width={44} height={44} className="w-[44px] h-[44px]" />
          </Link>

          
          <SearchBar placeholder="Search blogs" />

          
          <button className="" aria-label="Globe">
            <Image src="/assets/decoration/globe.svg" alt="Globe" width={44} height={44} className="w-[44px] h-[44px]" />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        <article className="max-w-[720px] mx-auto w-full">
          
          {/* Title */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl leading-[1.1] mb-4 font-semibold text-[#111111]">
              Keizer Privacy Policy
            </h1>
            <div className="font-sans text-sm text-[#6B7280]">
              Updated: March 1, 2024
            </div>
          </header>

          {/* Content */}
          <div className="text-[15px] md:text-[16px] leading-[1.75] space-y-6 text-[#111111]">
            
            {/* Introduction */}
            <p>
              This Privacy Policy ("Policy") describes how Keizer Capital Management, LLC ("Keizer," "we," "our," and/or "us") collects, uses, and discloses certain Personal Information (defined below) obtained through our website (including all subdomains, "Site"), which is located at <a href="https://keizer.com" className="text-[#2563EB] hover:underline decoration-1 underline-offset-4">https://keizer.com</a>. This Policy applies only to information collected through the Site and therefore does not apply to data we collect in other contexts. By visiting our Site and/or using the features made available to you on the Site (collectively, the "Site Services"), you are agreeing to the terms of this Policy.
            </p>

            {/* Section 1 */}
            <div className="pt-8">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                What Information We Collect and Maintain About You
              </h2>
              <p>
                We collect information from you directly when you provide it to us through the Site. We may also automatically collect certain information about you and your computer, smartphone, or other device when you use, access, or interact with our Site Services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                Personal information collected through the Site.
              </h2>
              <p className="mb-4">
                We may collect the following categories of Personal Information through the Site:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Identifiers and similar information</strong>, such as your name, address, email address, online identifiers or other similar identifiers;
                </li>
                <li>
                  <strong>Characteristics of protected classifications</strong> under applicable law;
                </li>
                <li>
                  <strong>Commercial information</strong>, including your marketing preferences;
                </li>
                <li>
                  <strong>Internet or other electronic network activity information</strong>, including information related to the browser or device you use to access the Site, your IP address and your cookie preferences;
                </li>
                <li>
                  <strong>Geolocation information</strong>, such as information about your location or the location of your device;
                </li>
                <li>
                  <strong>Professional or employment information</strong>, such as when an individual applies for employment; and
                </li>
                <li>
                  <strong>Audio, electronic, visual, thermal, olfactory, or similar information</strong>, such as photographs or video recordings.
                </li>
              </ol>
            </div>

            {/* Section 3 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the Personal Information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>To provide, maintain, and improve our Site Services;</li>
                <li>To communicate with you about our services, respond to your inquiries, and send you updates;</li>
                <li>To process and manage applications for our programs and services;</li>
                <li>To analyze and understand how our Site is used and to improve user experience;</li>
                <li>To comply with legal obligations and protect our rights;</li>
                <li>To prevent fraud and ensure the security of our Site; and</li>
                <li>For other purposes with your consent or as permitted by law.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                How We Share Your Information
              </h2>
              <p className="mb-4">
                We may share your Personal Information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>With service providers who assist us in operating our Site and providing our services;</li>
                <li>With business partners and affiliates for purposes consistent with this Policy;</li>
                <li>In connection with a merger, acquisition, or sale of assets;</li>
                <li>To comply with legal obligations, court orders, or government requests;</li>
                <li>To protect our rights, property, or safety, or that of our users or others; and</li>
                <li>With your consent or at your direction.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                Your Rights and Choices
              </h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your Personal Information, including:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>The right to access and receive a copy of your Personal Information;</li>
                <li>The right to correct inaccurate or incomplete information;</li>
                <li>The right to delete your Personal Information;</li>
                <li>The right to opt-out of certain uses of your Personal Information;</li>
                <li>The right to data portability; and</li>
                <li>The right to object to processing of your Personal Information.</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </div>

            {/* Section 6 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to collect and store information about your use of our Site. You can control cookies through your browser settings, though disabling cookies may limit your ability to use certain features of our Site.
              </p>
            </div>

            {/* Section 7 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your Personal Information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure.
              </p>
            </div>

            {/* Section 8 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                Children's Privacy
              </h2>
              <p>
                Our Site is not intended for children under the age of 13. We do not knowingly collect Personal Information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </div>

            {/* Section 9 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                Changes to This Policy
              </h2>
              <p>
                We may update this Policy from time to time. We will notify you of any material changes by posting the new Policy on this page and updating the "Updated" date at the top of this Policy. Your continued use of our Site after such changes constitutes your acceptance of the updated Policy.
              </p>
            </div>

            {/* Section 10 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Policy or our privacy practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Keizer Capital Management, LLC</strong><br />
                Email: <a href="mailto:privacy@keizer.com" className="text-[#2563EB] hover:underline decoration-1 underline-offset-4">privacy@keizer.com</a><br />
                Address: [Your Address Here]
              </p>
            </div>

          </div>

          {/* --- FOOTER SECTION --- */}
          <div className="mt-20">
            <div className="p-4 rounded-[13px] max-w-[362px] bg-[#FCFBFB] hover:bg-[#F4F4F4] transition-all duration-300">
              <Link
                href="/"
                className="inline-flex flex-col gap-1 group"
              >
                <button className="flex items-center gap-1 text-[16px] font-regular text-sm text-[#979797] hover:text-[#111111] transition-colors group">
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </button>
                <div className="text-[16px] font-regular">
                  Home Page
                </div>
              </Link>
            </div>
          </div>

        </article>
      </main>
    </div>
  );
}

