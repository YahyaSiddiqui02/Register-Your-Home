import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ryh_user'))
    } catch {
      return null
    }
  })

  const saveSession = (token, u) => {
    localStorage.setItem('ryh_token', token)
    localStorage.setItem('ryh_user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('ryh_token')
    localStorage.removeItem('ryh_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, saveSession, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
