export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error('Authentication error:', error)
    return false
  }
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
  
  // Session expires after 30 days
  const sessionAge = Date.now() - parseInt(timestamp)
  const thirtyDays = 30 * 24 * 60 * 60 * 1000
  
  if (sessionAge > thirtyDays) {
    clearAdminSession()
    return false
  }
  
  return session === 'authenticated'
} 