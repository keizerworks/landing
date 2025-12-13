"use client";

import React, { useState } from "react";
import { Mail, Building2, FileText, Loader2, ArrowUpRight, ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "~/components/shared/SearchBar";
import { gotham_font, spaceGrotesk } from "~/config/font";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(3, "Company is required"),
  project: z
    .string()
    .min(40, "Please provide project description above 40 characters"),
});

type FormData = z.infer<typeof formSchema>;

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
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
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
            message: result.message || "Message sent successfully!",
            type: "success",
          });
        } else {
          setSubmitStatus({
            message: result.error || "Failed to send message",
            type: "error",
          });
        }
      } catch (_error) {
        setSubmitStatus({
          message: "Unable to send message. Please try again.",
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
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/assets/logos/klogo1.svg"
              alt="Keizer Logo"
              width={44}
              height={44}
              className="w-[44px] h-[44px]"
            />
          </Link>

          <SearchBar placeholder="Search blogs" />

          <button className="" aria-label="Globe">
            <Image
              src="/assets/decoration/globe.svg"
              alt="Globe"
              width={44}
              height={44}
              className="w-[44px] h-[44px]"
            />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-[720px] mx-auto w-full space-y-12">
          {/* Header Section */}
          <header className="space-y-6">
            <div>
              <h1 className="font-gb text-4xl md:text-5xl leading-[1.1] mb-4 font-semibold text-[#111111]">
                Have a Vision?
                <br />
                Time to make it a reality
              </h1>
              <div className="space-y-3 text-[#6B7280] text-sm leading-relaxed max-w-2xl">
                <p>
                  Get your MVP to market—fast. We help startups build, scale, and
                  launch with the right strategy, resources, and execution.
                </p>
                <p>
                  Fill out the form below and let's start building something
                  amazing together.
                </p>
              </div>
            </div>
          </header>

          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* About You Section */}
            <section className="space-y-6">
              <h2 className="font-gb text-lg md:text-xl font-bold border-b border-gray-100 pb-2">
                About You
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none text-[#111111]"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
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
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourname@gmail.com"
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
                    Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter your company name"
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
                Project Details
              </h2>

              <div className="space-y-2">
                <label
                  htmlFor="project"
                  className="text-sm font-medium leading-none text-[#111111]"
                >
                  Project Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and what you're looking to build..."
                    rows={6}
                    disabled={sendingEmail}
                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Please provide at least 40 characters describing your project.
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
                    Sending
                    <Loader2 size={18} className="animate-spin" />
                  </>
                ) : submitStatus?.type === "success" ? (
                  <>
                    Sent
                    <CheckCircle2 size={18} />
                  </>
                ) : submitStatus?.type === "error" ? (
                  <>
                    Error
                    <XCircle size={18} />
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400 mt-4">
                By clicking submit, you agree to our terms of service and privacy
                policy. We'll review your inquiry and get back to you within 24-48
                hours.
              </p>
            </div>
          </form>

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
        </div>
      </main>
    </div>
  );
}

