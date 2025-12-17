"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "~/hooks/useTranslation";
import { LanguageSelector } from "../ui/language-selector";

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  } | null>(null);

  const newsletterTitle = useTranslation("Join our newsletter");
  const emailPlaceholder = useTranslation("Enter your email");
  const subscribeLabel = useTranslation("Subscribe");
  const subscribingLabel = useTranslation("Subscribing...");
  const sentLabel = useTranslation("Sent");
  const errorLabel = useTranslation("Error");
  const privacyPolicyLabel = useTranslation("Privacy Policy");
  const termsLabel = useTranslation("Terms & Conditions");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus({
        message: "Please enter a valid email address",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setEmail("");
        setStatus({
          message: result.message || "Successfully subscribed!",
          type: "success",
        });
      } else {
        setStatus({
          message: result.error || "Failed to subscribe. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setStatus({
        message: "Unable to subscribe. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white text-black py-8 md:py-16">
      <div className="max-w-full bg-[#F5F5F5]  py-8 md:py-12 md:px-12 px-[24px] mx-4 md:mx-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-16 gap-6 md:gap-8 lg:gap-0">
          
          <div className="relative rounded-2xl flex items-center justify-center shadow-sm">
            <Image
              src="/assets/logos/klogo1.svg"
              width={136}
              height={136}
              alt="Keizer Logo"
              className="object-contain w-24 h-24 sm:w-32 sm:h-32 md:w-[136px] md:h-[136px]"
            />
          </div>

          
          <div className="w-full lg:w-auto">
            <h3 className="text-2xl sm:text-3xl md:text-[36px] font-regular my-4 md:my-6">{newsletterTitle}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex relative flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailPlaceholder}
                  disabled={isSubmitting}
                  className="flex-1 w-full sm:min-w-[300px] md:min-w-[420px] px-4 py-3 rounded-[12px] border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500 placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || status?.type === "success"}
                  className={`sm:absolute sm:right-1 sm:top-1 text-white px-6 sm:px-8 py-2 h-auto rounded-[8px] text-sm sm:text-base font-medium w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    status?.type === "success"
                      ? "bg-green-600 hover:bg-green-600"
                      : status?.type === "error"
                      ? "bg-red-600 hover:bg-red-600"
                      : "bg-[#0A5CFF] hover:bg-blue-600"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {subscribingLabel}
                    </>
                  ) : status?.type === "success" ? (
                    <>
                      <CheckCircle2 size={16} />
                      {sentLabel}
                    </>
                  ) : status?.type === "error" ? (
                    <>
                      <XCircle size={16} />
                      {errorLabel}
                    </>
                  ) : (
                    subscribeLabel
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 md:items-end gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-xs sm:text-sm font-medium text-gray-600">
            <span>© Keizerworks {new Date().getFullYear()}</span>
            <div className="flex gap-4 md:gap-6">
              <Link href="/privacy-policy" className="hover:text-black transition-colors">
                {privacyPolicyLabel}
              </Link>
              <Link href="/terms" className="hover:text-black transition-colors">
                {termsLabel}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="https://x.com/keizerHq" target="_blank" rel="noopener noreferrer" className="">
               <Image src="/assets/socials/x.svg" alt="Twitter" width={20} height={20} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="">
               <Image src="/assets/socials/linkedin.svg" alt="Linkedin" width={20} height={20} />
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="">
               <Image src="/assets/socials/fb.svg" alt="Facebook" width={20} height={20} />
            </Link>
             <Link href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="">
                <Image src="/assets/socials/pin.svg" alt="Pinterest" width={20} height={20} />
            </Link>
            <div className="flex items-center  p-0 -mx-4 -my-4">
            <LanguageSelector openUpwards  />
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
