"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

type UserType = {
  id: string
  email: string
  name: string
  age?: number
  weight?: number
  medicalCondition?: string
} | null

type UserContextType = {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<UserType>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null)

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    if (email && password) {
      setUser({
        id: "1",
        email,
        name: "Test User",
      })
      return true
    }
    return false
  }

  const register = async (email: string, password: string, name: string) => {
    // In a real app, this would call an API
    if (email && password && name) {
      setUser({
        id: "1",
        email,
        name,
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (data: Partial<UserType>) => {
    if (user) {
      setUser({ ...user, ...data })
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
