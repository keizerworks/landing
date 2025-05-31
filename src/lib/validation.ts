import { z } from 'zod';

// Application form validation schema
export const applicationFormSchema = z.object({
  preferredRole: z.string().min(1, "Please select a preferred role"),
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-Z\s\-'\.]+$/, "Name contains invalid characters"),
  email: z.string().email("Please enter a valid email address"),
  githubProfile: z.string()
    .url("Please enter a valid GitHub URL")
    .refine(url => url.includes('github.com'), "Must be a GitHub URL"),
  linkedinTwitterProfile: z.string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  currentSchool: z.string()
    .max(200, "School name too long")
    .optional(),
  pitch: z.string()
    .trim()
    .min(10, "Pitch must be at least 10 characters")
    .max(500, "Pitch must be less than 500 characters")
});

// Sanitize string input to prevent XSS
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent basic XSS
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

// Validate file upload
export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Only PDF files are allowed' };
  }
  
  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  // Check file name
  const fileName = file.name.toLowerCase();
  if (!fileName.endsWith('.pdf')) {
    return { valid: false, error: 'File must have .pdf extension' };
  }
  
  // Check for suspicious file names
  const suspiciousPatterns = ['.exe', '.bat', '.cmd', '.scr', '.vbs', '.js'];
  for (const pattern of suspiciousPatterns) {
    if (fileName.includes(pattern)) {
      return { valid: false, error: 'Invalid file name detected' };
    }
  }
  
  return { valid: true };
}

// Rate limiting helper
export function createRateLimitKey(ip: string, type: string): string {
  return `${type}:${ip}`;
} 