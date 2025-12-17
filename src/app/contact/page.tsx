"use client";

import React, { useState } from "react";
import { Mail, Building2, FileText, Loader2, ArrowUpRight, CheckCircle2, XCircle } from "lucide-react";
import { z } from "zod";
import Link from "next/link";
import { gotham_font, spaceGrotesk } from "~/config/font";
import { useTranslation } from "~/hooks/useTranslation";
import { PageNavbar } from "~/components/ui/page-navbar";
import { PageFooter } from "~/components/ui/page-footer";

type FormData = {
  name: string;
  email: string;
  company: string;
  project: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    project: "",
  });
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Translations
  const searchBlogsPlaceholder = useTranslation("Search blogs");
  const visionTitle1 = useTranslation("Have a Vision?");
  const visionTitle2 = useTranslation("Time to make it a reality");
  const description1 = useTranslation(
    "Keizerworks is a frontier firm for visionaries. Work with us if you want to build a startup that scales with structural integrity, rather than one that accumulates technical and operational debt from the start."
  );
  const description2 = useTranslation(
    "If you want clarity, structure, and a trusted partner who understands the exact order things need to happen, fill out the form below and let's talk."
  );
  const aboutYouLabel = useTranslation("About You");
  const nameLabel = useTranslation("Name");
  const namePlaceholder = useTranslation("Enter your name");
  const nameRequiredLabel = useTranslation("Name is required");
  const emailLabel = useTranslation("Email");
  const emailPlaceholder = useTranslation("yourname@gmail.com");
  const invalidEmailLabel = useTranslation("Invalid email address");
  const companyLabel = useTranslation("Company");
  const companyPlaceholder = useTranslation("Enter your company name");
  const companyRequiredLabel = useTranslation("Company is required");
  const projectDetailsLabel = useTranslation("Project Details");
  const projectDescriptionLabel = useTranslation("Project Description");
  const projectPlaceholder = useTranslation("Tell us about your project, goals, and what you're looking to build...");
  const projectMinCharsLabel = useTranslation("Please provide at least 40 characters describing your project.");
  const projectDescriptionErrorLabel = useTranslation("Please provide project description above 40 characters");
  const submitApplicationLabel = useTranslation("Submit Application");
  const sendingLabel = useTranslation("Sending");
  const sentLabel = useTranslation("Sent");
  const errorLabel = useTranslation("Error");
  const termsText = useTranslation(
    "By clicking submit, you agree to our terms of service and privacy policy. We'll review your inquiry and get back to you within 24-48 hours."
  );
  const messageSentLabel = useTranslation("Message sent successfully!");
  const failedToSendLabel = useTranslation("Failed to send message");
  const unableToSendLabel = useTranslation("Unable to send message. Please try again.");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = nameRequiredLabel;
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = invalidEmailLabel;
    }
    
    if (!formData.company || formData.company.length < 3) {
      newErrors.company = companyRequiredLabel;
    }
    
    if (!formData.project || formData.project.length < 40) {
      newErrors.project = projectDescriptionErrorLabel;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setSendingEmail(true);
    setErrors({});
    e.preventDefault();
    setSubmitStatus(null);

    if (validateForm()) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setFormData({
            name: "",
            email: "",
            company: "",
            project: "",
          });
          setSubmitStatus({
            message: result.message || messageSentLabel,
            type: "success",
          });
        } else {
          setSubmitStatus({
            message: result.error || failedToSendLabel,
            type: "error",
          });
        }
      } catch (_error) {
        setSubmitStatus({
          message: unableToSendLabel,
          type: "error",
        });
      } finally {
        setSendingEmail(false);
      }
    } else {
      setSendingEmail(false);
    }
  };

  return (
    <div className={`min-h-screen bg-white font-sans text-[#111111] ${gotham_font.variable} ${spaceGrotesk.variable}`}>
      {/* --- NAVBAR --- */}
      <PageNavbar searchPlaceholder={searchBlogsPlaceholder} />

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-[720px] mx-auto w-full space-y-12">
          {/* Header Section */}
          <header className="space-y-6">
            <div>
              <h1 className="font-gb text-4xl md:text-5xl leading-[1.1] mb-4 font-semibold text-[#111111]">
                {visionTitle1}
                <br />
                {visionTitle2}
              </h1>
              <div className="space-y-3 text-[#6B7280] text-sm leading-relaxed max-w-2xl">
                <p>{description1}</p>
                <p>{description2}</p>
              </div>
            </div>
          </header>

          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* About You Section */}
            <section className="space-y-6">
              <h2 className="font-gb text-lg md:text-xl font-bold border-b border-gray-100 pb-2">
                {aboutYouLabel}
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none text-[#111111]"
                  >
                    {nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={namePlaceholder}
                    disabled={sendingEmail}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs flex items-center gap-2 pt-1">
                      <span className="h-[8px] aspect-square rounded-full bg-red-500 w-[8px] inline-block"></span>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-[#111111]"
                  >
                    {emailLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={emailPlaceholder}
                      disabled={sendingEmail}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs flex items-center gap-2 pt-1">
                      <span className="h-[8px] aspect-square rounded-full bg-red-500 w-[8px] inline-block"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium leading-none text-[#111111]"
                  >
                    {companyLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={companyPlaceholder}
                      disabled={sendingEmail}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  {errors.company && (
                    <p className="text-red-500 text-xs flex items-center gap-2 pt-1">
                      <span className="h-[8px] aspect-square rounded-full bg-red-500 w-[8px] inline-block"></span>
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Project Details Section */}
            <section className="space-y-6">
              <h2 className="font-gb text-lg md:text-xl font-bold border-b border-gray-100 pb-2">
                {projectDetailsLabel}
              </h2>

              <div className="space-y-2">
                <label
                  htmlFor="project"
                  className="text-sm font-medium leading-none text-[#111111]"
                >
                  {projectDescriptionLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder={projectPlaceholder}
                    rows={6}
                    disabled={sendingEmail}
                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {projectMinCharsLabel}
                </p>
                {errors.project && (
                  <p className="text-red-500 text-xs flex items-center gap-2 pt-1">
                    <span className="h-[8px] aspect-square rounded-full bg-red-500 w-[8px] inline-block"></span>
                    {errors.project}
                  </p>
                )}
              </div>
            </section>

            {/* Submission */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={sendingEmail || submitStatus?.type === "success"}
                className={`group text-white px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest flex items-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  submitStatus?.type === "success"
                    ? "bg-green-600 hover:bg-green-600"
                    : submitStatus?.type === "error"
                    ? "bg-red-600 hover:bg-red-600"
                    : "bg-black hover:bg-[#333333]"
                }`}
              >
                {sendingEmail ? (
                  <>
                    {sendingLabel}
                    <Loader2 size={18} className="animate-spin" />
                  </>
                ) : submitStatus?.type === "success" ? (
                  <>
                    {sentLabel}
                    <CheckCircle2 size={18} />
                  </>
                ) : submitStatus?.type === "error" ? (
                  <>
                    {errorLabel}
                    <XCircle size={18} />
                  </>
                ) : (
                  <>
                    {submitApplicationLabel}
                    <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400 mt-4">
                {termsText}
              </p>
            </div>
          </form>

          {/* --- FOOTER SECTION --- */}
          <PageFooter />
        </div>
      </main>
    </div>
  );
}

