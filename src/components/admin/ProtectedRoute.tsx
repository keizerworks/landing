'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated } from '~/lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAdminAuthenticated()
      setIsAuthenticated(authenticated)
      
      if (!authenticated) {
        router.push('/admin/login')
      }
    }

    checkAuth()
    
    // Check authentication every minute
    const interval = setInterval(checkAuth, 60000)
    
    return () => clearInterval(interval)
  }, [router])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  // If not authenticated, don't render children (redirect is happening)
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
} 