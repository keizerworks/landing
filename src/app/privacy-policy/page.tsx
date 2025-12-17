"use client";

import React from "react";
import { useTranslation } from "~/hooks/useTranslation";
import { PageNavbar } from "~/components/ui/page-navbar";
import { PageFooter } from "~/components/ui/page-footer";

export default function PrivacyPolicy() {
  const searchBlogsPlaceholder = useTranslation("Search blogs");
  const privacyPolicyTitle = useTranslation("Keizer Privacy Policy");
  const updatedLabel = useTranslation("Updated:");

  // Privacy Policy Content
  const introText = useTranslation(
    'This Privacy Policy ("Policy") describes how Keizer Capital Management, LLC ("Keizer," "we," "our," and/or "us") collects, uses, and discloses certain Personal Information (defined below) obtained through our website (including all subdomains, "Site"), which is located at https://keizer.com. This Policy applies only to information collected through the Site and therefore does not apply to data we collect in other contexts. By visiting our Site and/or using the features made available to you on the Site (collectively, the "Site Services"), you are agreeing to the terms of this Policy.'
  );
  const section1Title = useTranslation("What Information We Collect and Maintain About You");
  const section1Content = useTranslation(
    "We collect information from you directly when you provide it to us through the Site. We may also automatically collect certain information about you and your computer, smartphone, or other device when you use, access, or interact with our Site Services."
  );
  const section2Title = useTranslation("Personal information collected through the Site.");
  const section2Intro = useTranslation("We may collect the following categories of Personal Information through the Site:");
  const section2Item1 = useTranslation("Identifiers and similar information, such as your name, address, email address, online identifiers or other similar identifiers;");
  const section2Item2 = useTranslation("Characteristics of protected classifications under applicable law;");
  const section2Item3 = useTranslation("Commercial information, including your marketing preferences;");
  const section2Item4 = useTranslation("Internet or other electronic network activity information, including information related to the browser or device you use to access the Site, your IP address and your cookie preferences;");
  const section2Item5 = useTranslation("Geolocation information, such as information about your location or the location of your device;");
  const section2Item6 = useTranslation("Professional or employment information, such as when an individual applies for employment; and");
  const section2Item7 = useTranslation("Audio, electronic, visual, thermal, olfactory, or similar information, such as photographs or video recordings.");
  const section3Title = useTranslation("How We Use Your Information");
  const section3Intro = useTranslation("We use the Personal Information we collect for the following purposes:");
  const section3Items = [
    useTranslation("To provide, maintain, and improve our Site Services;"),
    useTranslation("To communicate with you about our services, respond to your inquiries, and send you updates;"),
    useTranslation("To process and manage applications for our programs and services;"),
    useTranslation("To analyze and understand how our Site is used and to improve user experience;"),
    useTranslation("To comply with legal obligations and protect our rights;"),
    useTranslation("To prevent fraud and ensure the security of our Site; and"),
    useTranslation("For other purposes with your consent or as permitted by law."),
  ];
  const section4Title = useTranslation("How We Share Your Information");
  const section4Intro = useTranslation("We may share your Personal Information in the following circumstances:");
  const section4Items = [
    useTranslation("With service providers who assist us in operating our Site and providing our services;"),
    useTranslation("With business partners and affiliates for purposes consistent with this Policy;"),
    useTranslation("In connection with a merger, acquisition, or sale of assets;"),
    useTranslation("To comply with legal obligations, court orders, or government requests;"),
    useTranslation("To protect our rights, property, or safety, or that of our users or others; and"),
    useTranslation("With your consent or at your direction."),
  ];
  const section5Title = useTranslation("Your Rights and Choices");
  const section5Intro = useTranslation("Depending on your location, you may have certain rights regarding your Personal Information, including:");
  const section5Items = [
    useTranslation("The right to access and receive a copy of your Personal Information;"),
    useTranslation("The right to correct inaccurate or incomplete information;"),
    useTranslation("The right to delete your Personal Information;"),
    useTranslation("The right to opt-out of certain uses of your Personal Information;"),
    useTranslation("The right to data portability; and"),
    useTranslation("The right to object to processing of your Personal Information."),
  ];
  const section5Footer = useTranslation('To exercise these rights, please contact us using the information provided in the "Contact Us" section below.');
  const section6Title = useTranslation("Cookies and Tracking Technologies");
  const section6Content = useTranslation(
    "We use cookies and similar tracking technologies to collect and store information about your use of our Site. You can control cookies through your browser settings, though disabling cookies may limit your ability to use certain features of our Site."
  );
  const section7Title = useTranslation("Data Security");
  const section7Content = useTranslation(
    "We implement appropriate technical and organizational measures to protect your Personal Information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure."
  );
  const section8Title = useTranslation("Children's Privacy");
  const section8Content = useTranslation(
    "Our Site is not intended for children under the age of 13. We do not knowingly collect Personal Information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately."
  );
  const section9Title = useTranslation("Changes to This Policy");
  const section9Content = useTranslation(
    'We may update this Policy from time to time. We will notify you of any material changes by posting the new Policy on this page and updating the "Updated" date at the top of this Policy. Your continued use of our Site after such changes constitutes your acceptance of the updated Policy.'
  );
  const section10Title = useTranslation("Contact Us");
  const section10Content = useTranslation("If you have any questions about this Policy or our privacy practices, please contact us at:");
  const section10Address = useTranslation("Address: [Your Address Here]");

  return (
    <div className="min-h-screen bg-white font-sans text-[#111111]">
      
      {/* --- NAVBAR (Same as blog listing) --- */}
      <PageNavbar searchPlaceholder={searchBlogsPlaceholder} />

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        <article className="max-w-[720px] mx-auto w-full">
          
          {/* Title */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl leading-[1.1] mb-4 font-semibold text-[#111111]">
              {privacyPolicyTitle}
            </h1>
            <div className="font-sans text-sm text-[#6B7280]">
              {updatedLabel} March 1, 2024
            </div>
          </header>

          {/* Content */}
          <div className="text-[15px] md:text-[16px] leading-[1.75] space-y-6 text-[#111111]">
            
            {/* Introduction */}
            <p>{introText}</p>

            {/* Section 1 */}
            <div className="pt-8">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section1Title}
              </h2>
              <p>{section1Content}</p>
            </div>

            {/* Section 2 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section2Title}
              </h2>
              <p className="mb-4">{section2Intro}</p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>{section2Item1}</li>
                <li>{section2Item2}</li>
                <li>{section2Item3}</li>
                <li>{section2Item4}</li>
                <li>{section2Item5}</li>
                <li>{section2Item6}</li>
                <li>{section2Item7}</li>
              </ol>
            </div>

            {/* Section 3 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section3Title}
              </h2>
              <p className="mb-4">{section3Intro}</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                {section3Items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section4Title}
              </h2>
              <p className="mb-4">{section4Intro}</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                {section4Items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Section 5 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section5Title}
              </h2>
              <p className="mb-4">{section5Intro}</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                {section5Items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{section5Footer}</p>
            </div>

            {/* Section 6 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section6Title}
              </h2>
              <p>{section6Content}</p>
            </div>

            {/* Section 7 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section7Title}
              </h2>
              <p>{section7Content}</p>
            </div>

            {/* Section 8 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section8Title}
              </h2>
              <p>{section8Content}</p>
            </div>

            {/* Section 9 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section9Title}
              </h2>
              <p>{section9Content}</p>
            </div>

            {/* Section 10 */}
            <div className="pt-6">
              <h2 className="font-sans text-lg md:text-xl font-bold mb-4 text-[#111111]">
                {section10Title}
              </h2>
              <p>{section10Content}</p>
              <p className="mt-4">
                <strong>Keizer Capital Management, LLC</strong><br />
                Email: <a href="mailto:privacy@keizer.com" className="text-[#2563EB] hover:underline decoration-1 underline-offset-4">privacy@keizer.com</a><br />
                {section10Address}
              </p>
            </div>

          </div>

          {/* --- FOOTER SECTION --- */}
          <PageFooter />

        </article>
      </main>
    </div>
  );
}

