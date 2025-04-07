import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, authError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      await login(email, password)
    } catch (err) {
      console.error("Login error:", err)
      setError(authError as string)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid place-items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Sign in to your account
      </h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md transition-opacity duration-300">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link
              to="/auth/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? "opacity-75" : "opacity-100"
            } transition-all duration-200`}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
      <div className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
