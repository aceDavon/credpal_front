import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"

// Layouts
const UnauthenticatedLayout = lazy(
  () => import("../layouts/Unauthenticatedlayout")
)
const AuthenticatedLayout = lazy(() => import("../layouts/AuthenticatedLayout"))

// Auth Pages
const Login = lazy(() => import("../pages/auth/login"))

// Dashboard Pages
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoading ? (
            <LoadingSpinner />
          ) : isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />

      {/* Auth routes */}
      <Route path="auth" element={<UnauthenticatedLayout />}>
        <Route
          path="login"
          element={
            <div className="max-h-svh overflow-y-scroll px-2 max-w-lg mx-auto transition-opacity duration-300">
              <Suspense fallback={<LoadingSpinner />}>
                <Login />
              </Suspense>
            </div>
          }
        />
      </Route>

      {/* Dashboard routes */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <AuthenticatedLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

      {/* Catch all */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/dashboard" : "/auth/login"}
            replace
          />
        }
      />
    </Routes>
  )
}

export default AppRoutes
