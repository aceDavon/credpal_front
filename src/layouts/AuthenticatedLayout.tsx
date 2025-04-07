import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"

export default function AuthenticatedLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  console.log(user)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!user) {
    navigate("/auth/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={logout} />
      <main
        className={`flex-1 p-4 transition-all duration-300 ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
