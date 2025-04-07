import { createContext, useContext, useState, ReactNode, FC } from "react"
import { useNavigate } from "react-router-dom"

interface IUser {
  id: string
  name: string
  email: string
}

interface IAuthContext {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  authError: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext({} as IAuthContext)

export const AuthProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const baseUrl = import.meta.env.VITE_BASE_URL || ""

  const handleApiError = async (response: Response): Promise<string> => {
    try {
      const data = await response.json()
      return (
        data.message ||
        data.error ||
        data.errors?.join(", ") ||
        `Request failed with status ${response.status}`
      )
    } catch (e) {
      console.error("Error parsing error response:", e)
      return `Request failed with status ${response.status}`
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    setAuthError(null)

    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const userData: { data: IUser } = await res.json()
        setUser(userData.data)
        localStorage.setItem("auth_timestamp", Date.now().toString())
        navigate("/dashboard")
        return
      } else {
        const errorMessage = await handleApiError(res)
        setAuthError(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message)
        throw error
      }
      const errorMessage = "An unexpected error occurred"
      setAuthError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    setIsLoading(true)
    setAuthError(null)

    try {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) {
        const userData: IUser = await res.json()
        setUser(userData)
        localStorage.setItem("auth_timestamp", Date.now().toString())
        navigate("/dashboard")
        return
      } else {
        const errorMessage = await handleApiError(res)
        setAuthError(errorMessage)
        throw new Error(errorMessage)
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message)
        throw error
      }
      const errorMessage = "An unexpected error occurred"
      setAuthError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)

    try {
      const res = await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      })

      await res.json()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setUser(null)
      setAuthError(null)
      localStorage.removeItem("auth_timestamp")
      setIsLoading(false)
      navigate("/auth/login")
    }
  }

  const value: IAuthContext = {
    user,
    isAuthenticated: !!user,
    isLoading,
    authError,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  return context
}
