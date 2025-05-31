import { NextResponse } from "next/server";
import { z } from "zod";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { submitApplication } from "../../../lib/applicationService";

// Rate limiter: 2 applications per 10 minutes per IP
const rateLimiter = new RateLimiterMemory({
  points: 2, // Number of requests
  duration: 600, // Per 10 minutes
});

// Validation schema
const ApplicationSchema = z.object({
  preferredRole: z.string().min(1, "Preferred role is required"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  githubProfile: z.string().url("Invalid GitHub URL"),
  linkedinTwitterProfile: z.string().url("Invalid social profile URL").optional().or(z.literal("")),
  currentSchool: z.string().optional(),
  pitch: z.string().min(10, "Pitch must be at least 10 characters").max(500, "Pitch too long"),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get("x-forwarded-for") || "unknown";
    await rateLimiter.consume(clientIP);

    // Parse form data
    const formData = await request.formData();
    const resumeFile = formData.get('resume') as File;
    
    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }

    // Validate file type and size
    if (resumeFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    if (resumeFile.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 });
    }

    // Validate other form fields
    const applicationData = {
      preferredRole: formData.get('preferredRole') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      githubProfile: formData.get('githubProfile') as string,
      linkedinTwitterProfile: formData.get('linkedinTwitterProfile') as string,
      currentSchool: formData.get('currentSchool') as string,
      pitch: formData.get('pitch') as string,
      resumeFile: resumeFile
    };

    const validationResult = ApplicationSchema.safeParse({
      ...applicationData,
      linkedinTwitterProfile: applicationData.linkedinTwitterProfile || undefined,
      currentSchool: applicationData.currentSchool || undefined
    });
    
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((error) => error.message);
      return NextResponse.json({ errors: errorMessages }, { status: 400 });
    }

    // Submit application
    const result = await submitApplication(applicationData);

    if (result.success) {
      return NextResponse.json(
        { message: "Application submitted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to submit application" },
        { status: 500 }
      );
    }

  } catch (error) {
    if (error instanceof Error && error.name === "RateLimiterError") {
      return NextResponse.json(
        { error: "Too many applications. Please try again later." },
        { status: 429 }
      );
    }

    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 