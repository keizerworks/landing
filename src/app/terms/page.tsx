"use client";

import React from "react";
import { gotham_font, spaceGrotesk } from "~/config/font";
import { useTranslation } from "~/hooks/useTranslation";
import { PageNavbar } from "~/components/ui/page-navbar";
import { PageFooter } from "~/components/ui/page-footer";

export default function TermsPage() {
  const searchBlogsPlaceholder = useTranslation("Search blogs");

  return (
    <div className={`min-h-screen bg-white font-sans text-[#111111] ${gotham_font.variable} ${spaceGrotesk.variable}`}>
      
      <PageNavbar searchPlaceholder={searchBlogsPlaceholder} />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-[720px] mx-auto w-full space-y-12">
          
          <header className="space-y-4">
            <h1 className="font-gb text-4xl md:text-5xl leading-[1.1] font-semibold text-[#111111]">
              Keizer Terms of Use
            </h1>
            <div className="font-sans text-sm text-[#6B7280]">
              Updated: December 15, 2025
            </div>
          </header>

          
          <section className="space-y-4">
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              This page provides you with the terms on which you may use our website (including all subdomains, the "Site") located at https://keizer.com, which is operated by Keizer Capital Management, LLC and its affiliates (collectively, "Keizer," "we," "us," and/or "our").
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              These Terms of Use ("Terms of Use") govern the Site, including any content, materials and information available on or through the Site ("Keizer Content"), and any other online Keizer sites that link to these Terms of Use. By using the Site, you acknowledge that you have read these Terms of Use and agree that they are binding on you. Our Privacy Policy is incorporated by reference in these Terms of Use. If you do not agree with or consent to being bound by these Terms of Use or our Privacy Policy, you are not authorized to use the Site.
            </p>
            <p className="text-[#111111] text-base md:text-lg leading-relaxed">
              We reserve the right, at our sole discretion, to change or modify portions of these Terms of Use at any time. If we do this, we will post the changes on this page and will indicate at the top of this page the date these Terms of Use were last revised. Your continued use of the Site after the posting of changes constitutes your binding acceptance of such changes.
            </p>
          </section>

          
          <section className="space-y-4 pt-4">
            <h2 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
              Intellectual Property
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              You acknowledge and agree that the Site may contain Keizer Content that is protected by copyright, patent, trademark, trade secret or other proprietary rights and laws.
            </p>
            <p className="text-[#6B7280] text-base leading-relaxed">
              Except as expressly authorized by Keizer, you agree not to modify, copy, frame, scrape, rent, lease, loan, sell, distribute or create derivative works based on the Site or Keizer Content in whole or in part. In connection with your use of the Site you will not engage in or use any data mining, robots, scraping or similar data gathering or extraction methods. If you are blocked by Keizer from accessing the Site (including by blocking your IP address), you agree not to implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address). Any use of the Site or the Keizer Content other than as specifically authorized herein is strictly prohibited. Any rights not expressly granted herein are reserved by Keizer. Keizer's name and logos are trademarks of Keizer (collectively the "Keizer Trademarks"). Other trademarks used and displayed via the Site may be trademarks of their respective owners. Nothing in these Terms of Use or the Site should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any Keizer Trademarks displayed on the Site, without our prior written permission in each instance.
            </p>
          </section>

          
          <section className="space-y-4 pt-4">
            <h2 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
              Third Party Websites
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              The Site may provide links or other access to third-party sites and resources on the Internet or to third-party applications. Keizer has no control over such sites, resources or applications, and Keizer is not responsible for and does not endorse such websites, resources or applications. If you visit a linked site, be aware that the third party operating such site may have access to any information you submit via that site. You further acknowledge and agree that Keizer will not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such sites, resources or applications. Any access to, or use of, a third-party website is solely at your own risk.
            </p>
          </section>

          
          <section className="space-y-4 pt-4">
            <h2 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
              Limitation of Liability
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              NO KEIZER INDIVIDUAL OR ENTITY SHALL HAVE ANY LIABILITY BASED UPON YOUR USE OF, OR RELIANCE UPON, THE SITE OR THE KEIZER CONTENT. Some jurisdictions limit our ability to disclaim liability. With regard to those jurisdictions, our liability shall be limited to the greatest extent permitted by applicable law.
            </p>
          </section>

          
          <section className="space-y-4 pt-4">
            <h2 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
              Information on the Site
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              ALL KEIZER CONTENT DISPLAYED ON THE SITE IS PROVIDED "AS IS," MAY NOT BE RELIED UPON FOR ANY PURPOSE, AND IS NOT SUBJECT TO EXPRESS OR IMPLIED WARRANTIES OF ANY KIND. Keizer makes no representations or warranties with regard to the Keizer Content's accuracy, completeness, non-infringement or fitness for a particular purpose.
            </p>
            <p className="text-[#6B7280] text-base leading-relaxed">
              Neither the Site nor any Keizer Content is directed to any investors or potential investors. Any content included in Keizer Content or on the Site is informational only and not an offer, solicitation or recommendation to buy or sell securities or pursue any particular investment strategy, and does not constitute the provision of investment advice. Keizer does not provide advice of any kind through the Site or social media posts. No commentary or other Keizer Content included on the Site is intended to amount to advice on which reliance should be placed. Accordingly, Keizer disclaims all liability and responsibility arising from any reliance placed on such information by any visitor to the Site, or by anyone who may be informed of any of its contents. Information on the Site may not be used or relied upon in evaluating the merits of any investment. You should consult your own advisers as to business, financial, tax, legal, or other related matters concerning any investment.
            </p>
            <p className="text-[#6B7280] text-base leading-relaxed">
              Any investments or portfolio companies described in or referred to on the Site or any Keizer Content is not representative of all investments made by funds managed by Keizer. The Site and Keizer Content is provided in summary form and do not purport to be complete.
            </p>
          </section>

          
          <section className="space-y-4 pt-4">
            <h2 className="font-gb text-xl md:text-2xl font-bold text-[#111111]">
              Miscellaneous
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              These Terms of Use constitute the entire agreement between you and Keizer, and govern your use of the Site. These Terms of Use will be governed by the laws of the State of California without regard to its conflict of law provisions. Except as otherwise agreed in writing by us, any disputes relating to these Terms of Use shall be resolved exclusively in the state or federal courts located in San Francisco County, California. All Keizer individuals and entities are intended third-party beneficiaries of these Terms of Use. Our rights under these Terms of Use may be waived by us only in writing. These Terms of Use are binding on you as well as your successors and permitted assigns. In the event any provision of these Terms of Use is determined to be invalid or unenforceable, such provision shall be deemed severed from the remainder of these Terms of Use and replaced with a valid and enforceable provision as similar in intent as reasonably possible to the provision so severed, and shall not cause the invalidity or unenforceability of the remainder of these Terms of Use. The section titles in these Terms of Use are for convenience only and have no legal or contractual effect. Notices to you may be made by email.
            </p>
          </section>

          
          <PageFooter />
        </div>
      </main>
    </div>
  );
}

