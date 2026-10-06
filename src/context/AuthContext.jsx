import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../utils/storage'
import { DEMO_EMAIL, DEMO_PASSWORD } from '../utils/validation'

const AuthContext = createContext(null)

function seedUsers() {
  const users = storage.getUsers()
  const exists = users.some((u) => u.email.toLowerCase() === DEMO_EMAIL)
  if (!exists) {
    users.push({
      id: 'user-demo',
      name: 'Agile Tester',
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      phone: '9876543210',
    })
    storage.setUsers(users)
  }
  return storage.getUsers()
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => seedUsers())
  const [currentUser, setCurrentUser] = useState(() => storage.getSession())

  useEffect(() => {
    storage.setUsers(users)
  }, [users])

  useEffect(() => {
    storage.setSession(currentUser)
  }, [currentUser])

  const value = useMemo(
    () => ({
      currentUser,
      users,
      login(email, password) {
        const user = users.find(
          (u) =>
            u.email.toLowerCase() === String(email).trim().toLowerCase() &&
            u.password === password,
        )
        if (!user) return { ok: false, message: 'Invalid email or password' }
        const session = { id: user.id, name: user.name, email: user.email, phone: user.phone || '' }
        setCurrentUser(session)
        return { ok: true, message: 'Login successful', user: session }
      },
      register({ name, email, phone, password }) {
        const taken = users.some(
          (u) => u.email.toLowerCase() === String(email).trim().toLowerCase(),
        )
        if (taken) return { ok: false, message: 'An account with this email already exists' }
        const user = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password,
        }
        setUsers((prev) => [...prev, user])
        const session = { id: user.id, name: user.name, email: user.email, phone: user.phone || '' }
        setCurrentUser(session)
        return { ok: true, message: 'Registration successful', user: session }
      },
      logout() {
        setCurrentUser(null)
      },
    }),
    [currentUser, users],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
