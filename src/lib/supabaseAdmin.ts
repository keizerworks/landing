import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Only validate environment variables at runtime for admin functions
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseServiceKey)) {
  console.error('Missing Supabase Admin environment variables')
}

// Create client with fallback values for build time
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-service-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Note: Service role key is now secured in environment variables!
