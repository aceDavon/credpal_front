import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {
  const { user } = useAuth()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  return (
    <div
      className={`p-6 transition-opacity duration-300 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome back, {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dashboard cards */}
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="font-medium text-gray-700">Recent Activity</h3>
          <p className="text-gray-500 mt-2">No recent activity</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="font-medium text-gray-700">Projects</h3>
          <p className="text-gray-500 mt-2">0 active projects</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="font-medium text-gray-700">Notifications</h3>
          <p className="text-gray-500 mt-2">No new notifications</p>
        </div>
      </div>
    </div>
  )
}
