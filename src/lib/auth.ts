// Admin authentication with environment variables
export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'edulume@keizerworks.com',
  password: process.env.ADMIN_PASSWORD || 'weInvestInTheFuture@1'
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function setAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('keizer_admin_session', 'authenticated')
    localStorage.setItem('keizer_admin_timestamp', Date.now().toString())
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('keizer_admin_session')
    localStorage.removeItem('keizer_admin_timestamp')
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const session = localStorage.getItem('keizer_admin_session')
  const timestamp = localStorage.getItem('keizer_admin_timestamp')
  
  if (!session || !timestamp) return false
  
  // Session expires after 8 hours
  const sessionAge = Date.now() - parseInt(timestamp)
  const eightHours = 8 * 60 * 60 * 1000
  
  if (sessionAge > eightHours) {
    clearAdminSession()
    return false
  }
  
  return session === 'authenticated'
} 