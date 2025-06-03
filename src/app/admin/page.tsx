'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '~/components/admin/ProtectedRoute'

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Automatically redirect to applications page
    router.push('/admin/applications')
  }, [router])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to applications...</p>
        </div>
      </div>
    </ProtectedRoute>
  )
} 