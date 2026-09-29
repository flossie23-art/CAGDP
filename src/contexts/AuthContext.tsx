import React, { createContext, useContext, useState, useCallback } from 'react'
import { User } from '../types'

export type SaveCategory = 'career' | 'course' | 'institution' | 'scholarship' | 'opportunity'

const SAVE_KEYS = {
  career: 'savedCareers',
  course: 'savedCourses',
  institution: 'savedInstitutions',
  scholarship: 'savedScholarships',
  opportunity: 'savedOpportunities',
} as const satisfies Record<SaveCategory, keyof User>

interface AuthContextType {
  user: User | null
  isGuest: boolean
  login: (name: string, email: string) => User
  logout: () => void
  saveItem: (category: SaveCategory, id: string) => void
  isSaved: (category: SaveCategory, id: string) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(true)

  const login = useCallback((name: string, email: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
      savedCareers: [],
      savedCourses: [],
      savedInstitutions: [],
      savedScholarships: [],
      savedOpportunities: [],
    }
    setUser(newUser)
    setIsGuest(false)
    return newUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsGuest(true)
  }, [])

  const saveItem = useCallback((category: SaveCategory, id: string) => {
    setUser(prev => {
      if (!prev) return prev
      const key = SAVE_KEYS[category]
      if (prev[key].includes(id)) return prev
      return { ...prev, [key]: [...prev[key], id] }
    })
  }, [])

  const isSaved = useCallback((category: SaveCategory, id: string): boolean => {
    if (!user) return false
    return user[SAVE_KEYS[category]].includes(id)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, isGuest, login, logout, saveItem, isSaved }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
