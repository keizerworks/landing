"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(3, "Company is required"),
  project: z
    .string()
    .min(40, "Please provide project description above 50 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let statusTimeout: NodeJS.Timeout;
    if (submitStatus) {
      statusTimeout = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }

    return () => {
      if (statusTimeout) clearTimeout(statusTimeout);
    };
  }, [submitStatus]);

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
    <form onSubmit={handleSubmit} className="w-full pt-[60px]">
      <div className="mb-6">
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          type="text"
          placeholder="NAME"
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] placeholder:text-white/50 bg-transparent border-b border-white text-white placeholder-white uppercase focus:outline-none"
        />
        {errors.name && (
          <p className="text-white text-sm flex items-center gap-3 pt-2  mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.name}
          </p>
        )}
      </div>
      <div className="mb-6">
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          type="email"
          placeholder="EMAIL"
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] bg-transparent border-b placeholder:text-white/50 border-white text-white placeholder-white uppercase focus:outline-none"
        />
        {errors.email && (
          <p className="text-white text-sm  flex items-center gap-3 pt-2 mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.email}
          </p>
        )}
      </div>
      <div className="mb-6">
        <input
          name="company"
          onChange={handleChange}
          value={formData.company}
          type="text"
          placeholder="COMPANY"
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] bg-transparent border-b placeholder:text-white/50 border-white text-white placeholder-white uppercase focus:outline-none"
        />
        {errors.company && (
          <p className="text-white text-sm  flex items-center gap-3 pt-2 mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.company}
          </p>
        )}
      </div>
      <div className="mb-6">
        <textarea
          name="project"
          onChange={handleChange}
          value={formData.project}
          placeholder="PROJECT"
          rows={1}
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] pr-[20px] bg-transparent border-b placeholder:text-white/50 border-white text-white placeholder-white uppercase focus:outline-none"
        />
        {errors.project && (
          <p className="text-white text-sm flex items-center gap-3 pt-2  mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.project}
          </p>
        )}
      </div>
      {submitStatus && (
        <div
          className={`
          mb-6 p-4 rounded 
          ${
            submitStatus.type === "success"
              ? "bg-green-500/30 text-green-500"
              : "bg-red-500/30 text-red-500"
          }
        `}
        >
          {submitStatus.message}
        </div>
      )}
      <button
        disabled={sendingEmail}
        type="submit"
        className="md:text-[18px] text-[15px] md:h-[50px] md:w-[177px] w-full h-[45px] group flex items-center justify-center placeholder:text-white/50 text-white bg-black rounded-[4px] mt-[60px]"
      >
        <span className="mr-2">{sendingEmail ? "Sending..." : "Send"}</span>
        <ArrowRight
          size={20}
          className="group-hover:translate-x-1 transition-all"
        />
      </button>
    </form>
  );
};

export default ContactForm;
