import { redirect } from 'next/navigation'

// Server-side redirect - no flash of content, faster, SEO-friendly
export default function AdminRedirect() {
  redirect('/admin/applications')
} 