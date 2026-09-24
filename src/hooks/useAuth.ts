import { useState, useCallback } from 'react'
import { User } from '../types'

export function useAuth() {
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

  const saveItem = useCallback((category: string, id: string) => {
    setUser(prev => {
      if (!prev) return prev
      const newUser = { ...prev }
      const key = `saved${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof User
      if (key === 'savedOpportunities') {
        newUser.savedOpportunities = [...newUser.savedOpportunities, id]
      } else {
        const arr = newUser[key] as string[]
        if (!arr.includes(id)) {
          newUser[key] = [...arr, id]
        }
      }
      return newUser
    })
  }, [])

  const isSaved = useCallback((category: string, id: string): boolean => {
    if (!user) return false
    const key = `saved${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof User
    const arr = user[key] as string[]
    return arr.includes(id)
  }, [user])

  return {
    user,
    isGuest,
    login,
    logout,
    saveItem,
    isSaved,
  }
}
