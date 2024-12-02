'use client'

import { useAuth } from '@/contexts/auth/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.fullName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Cards */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applications</h3>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-300">12</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Jobs</h3>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-300">5</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Interviews</h3>
          <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-gray-300">3</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="p-4">
              <div className="flex items-center gap-x-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300">Applied to Software Engineer position at Google</h3>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </li>
            <li className="p-4">
              <div className="flex items-center gap-x-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300">Interview scheduled with Amazon</h3>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </li>
            <li className="p-4">
              <div className="flex items-center gap-x-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300">Profile viewed by Microsoft recruiter</h3>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 