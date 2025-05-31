import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Application {
  id?: number
  preferred_role: string
  name: string
  email: string
  github_profile: string
  linkedin_twitter_profile?: string
  resume_file_path: string
  current_school?: string
  pitch: string
  created_at?: string
} 