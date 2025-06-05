'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { Calendar, User, Filter, Eye, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase, type Application } from '~/lib/supabase'
import ProtectedRoute from '~/components/admin/ProtectedRoute'
import { clearAdminSession } from '~/lib/auth'

// Lazy load the modal for better performance
const ApplicationDetailsModal = lazy(() => import('~/components/admin/ApplicationDetailsModal'))

const ITEMS_PER_PAGE = 50

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [filteredCount, setFilteredCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allRoles, setAllRoles] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchApplicationsAndCount()
    fetchAllRoles()
    
    // Set up real-time subscription
    const channel = supabase
      .channel('applications-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'applications' }, 
        () => {
          fetchApplicationsAndCount()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [currentPage, roleFilter])

  const fetchAllRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('preferred_role')

      if (!error && data) {
        const roles = [...new Set(data.map(app => app.preferred_role))].sort()
        setAllRoles(roles)
      }
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const fetchApplicationsAndCount = async () => {
    try {
      // Get total count (unfiltered) for display
      const { count: totalCountResult } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })

      // Build filtered query for count
      let countQuery = supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })

      if (roleFilter) {
        countQuery = countQuery.eq('preferred_role', roleFilter)
      }

      const { count: filteredCountResult, error: countError } = await countQuery

      if (countError) {
        console.error('Error fetching count:', countError)
        return
      }

      // Build query for paginated data
      const startRange = (currentPage - 1) * ITEMS_PER_PAGE
      const endRange = startRange + ITEMS_PER_PAGE - 1

      let dataQuery = supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
        .range(startRange, endRange)

      if (roleFilter) {
        dataQuery = dataQuery.eq('preferred_role', roleFilter)
      }

      const { data, error } = await dataQuery

      if (error) {
        console.error('Error fetching applications:', error)
        return
      }

      setApplications(data || [])
      setFilteredApplications(data || [])
      setFilteredCount(filteredCountResult || 0)
      setTotalCount(totalCountResult || 0)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setLoading(true)
  }

  const handleRoleFilterChange = (newRole: string) => {
    setRoleFilter(newRole)
    setCurrentPage(1) // Reset to first page when filtering
    setLoading(true)
  }

  const handleOpenModal = (application: Application) => {
    setSelectedApplication(application)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedApplication(null)
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    clearAdminSession()
    router.push('/admin/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const totalPages = Math.ceil(filteredCount / ITEMS_PER_PAGE)
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredCount)

  if (loading && applications.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          {/* Header with Logo */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Image
                src="/assets/logos/keizer-logo.svg"
                alt="Keizer Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo and Logout */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Image
              src="/assets/logos/keizer-logo.svg"
              alt="Keizer Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
              <p className="text-gray-600 mt-2">
                {roleFilter ? (
                  <>Showing {startItem}-{endItem} of {filteredCount} applications for "{roleFilter}" • {totalCount} total</>
                ) : (
                  <>Showing {startItem}-{endItem} of {totalCount} total applications</>
                )}
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={roleFilter}
                onChange={(e) => handleRoleFilterChange(e.target.value)}
                className="px-3 py-2 bg-black text-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
              >
                <option value="">All Roles</option>
                {allRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pagination Controls - Top */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-3">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {filteredApplications.length === 0 && !loading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {totalCount === 0 ? 'No applications yet' : 'No applications match the selected filter'}
              </div>
            </div>
          ) : (
            <>
              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto"></div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications.map((application, index) => (
                  <div key={application.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600">
                            {application.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          #{startItem + index}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center space-x-2 text-gray-700">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{application.name}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">{application.email}</p>
                      </div>

                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {application.preferred_role}
                        </span>
                      </div>

                      {application.current_school && (
                        <div>
                          <span className="text-sm text-gray-600">🎓 {application.current_school}</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {application.created_at ? formatDate(application.created_at) : 'N/A'}
                        </span>
                      </div>

                      {application.pitch && (
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {application.pitch}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleOpenModal(application)}
                        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination Controls - Bottom */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center bg-white rounded-lg border border-gray-200 px-4 py-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1 || loading}
                  className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <span className="px-3 py-1 text-sm font-medium text-gray-900">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages || loading}
                  className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lazy loaded Application Details Modal */}
        {isModalOpen && (
          <Suspense fallback={
            <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          }>
            <ApplicationDetailsModal
              application={selectedApplication}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </Suspense>
        )}
      </div>
    </ProtectedRoute>
  )
} 