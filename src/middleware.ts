import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Basic middleware - can be enhanced later
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Add any protected routes here later
  ],
} 