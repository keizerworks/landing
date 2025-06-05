import { NextRequest, NextResponse } from 'next/server'

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'edulume@keizerworks.com',
  password: process.env.ADMIN_PASSWORD || 'weInvestInTheFuture@1'
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate credentials on the server side
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
} 