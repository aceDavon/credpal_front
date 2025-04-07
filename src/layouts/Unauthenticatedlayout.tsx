import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function UnauthenticatedLayout() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (isAuthenticated) {
      navigate("/dashboard")
    }
    return () => setIsMounted(false)
  }, [isAuthenticated, navigate])

  return (
    <div
      className={`min-h-screen bg-gray-100 transition-opacity duration-300 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <Outlet />
    </div>
  )
}
