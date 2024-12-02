'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants'
import { storage } from '@/lib/storage'
import { request } from '@/lib/request'
import axios from 'axios'

interface User {
  id: string
  email: string
  fullName: string
  role: 'candidate' | 'recruiter'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; password: string; fullName: string }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const handleUnauthorized = useCallback(() => {
    setUser(null)
    storage.clearAuth()
    router.push(ROUTES.AUTH.LOGIN)
  }, [router])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await request.login(email, password)
      
      const userData: User = {
        id: response.id,
        email: response.email,
        fullName: response.fullName,
        role: response.role,
      }

      setUser(userData)
      storage.setUser(userData)
      if (response.token) {
        storage.setToken(response.token)
      }
      
      router.push(ROUTES.DASHBOARD)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        handleUnauthorized()
      }
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: { email: string; password: string; fullName: string }) => {
    try {
      setIsLoading(true)
      const response = await request.register({
        ...data,
        role: 'candidate',
      })

      const userData: User = {
        id: response.id,
        email: response.email,
        fullName: response.fullName,
        role: response.role,
      }

      setUser(userData)
      storage.setUser(userData)
      if (response.token) {
        storage.setToken(response.token)
      }

      router.push(ROUTES.DASHBOARD)
    } catch (error) {
      console.error('Register error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await request.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      storage.clearAuth()
      router.push(ROUTES.AUTH.LOGIN)
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = storage.getUser()
      if (storedUser && storage.getToken()) {
        try {
          const userData = await request.getProfile()
          setUser(userData)
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            handleUnauthorized()
          }
          storage.clearAuth()
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [handleUnauthorized])

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 