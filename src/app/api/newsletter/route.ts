import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { RateLimiterMemory } from "rate-limiter-flexible";

const resend = new Resend(process.env.RESEND_API_KEY);

const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const rateLimiter = new RateLimiterMemory({
  points: 5, // Allow more requests for newsletter
  duration: 60,
});

export async function POST(request: NextRequest) {
  try {
    await rateLimiter.consume(
      request.headers.get("x-forwarded-for") || "unknown",
    );

    const body = await request.json();
    const result = NewsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const { email } = result.data;

    // Send notification email to admin
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "karan.kendre@keizerworks.com",
      to: process.env.RESEND_TO_EMAIL || "karankendreg@gmail.com",
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Newsletter Subscription</h2>
          <p>A new user has subscribed to your newsletter:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 },
      );
    }

    console.log("Newsletter subscription successful:", data);

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "RateLimiterError") {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

