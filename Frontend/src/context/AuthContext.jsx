import React, { createContext, useState, useCallback } from 'react'
import { authService, saveToken, saveUser, getUser, getToken } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signup = useCallback(async (email, password, name) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.signup(email, password, name)
      // Handle both response.data and response.data.data structures
      const responseData = response.data?.data || response.data
      const { token, user: userData } = responseData
      saveToken(token)
      saveUser(userData)
      setUser(userData)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(email, password)
      // Handle both response.data and response.data.data structures
      const responseData = response.data?.data || response.data
      const { token, user: userData } = responseData
      saveToken(token)
      saveUser(userData)
      setUser(userData)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const adminLogin = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.adminLogin(email, password)
      console.log('Admin login full response:', response)

      // The API returns: { success, message, data: { user, token } }
      // So we need response.data (not response.data.data)
      const { token, user: userData } = response.data

      if (!token || !userData) {
        throw new Error('Invalid response from server')
      }

      console.log('Saving token and user:', { token, userData })
      saveToken(token)
      saveUser(userData)
      setUser(userData)
      return response.data
    } catch (err) {
      console.error('Admin login error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Admin login failed'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setError(null)
  }, [])

  const getProfile = useCallback(async () => {
    try {
      const response = await authService.getProfile()
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get profile')
      throw err
    }
  }, [])

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    adminLogin,
    logout,
    getProfile,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    role: user?.role || 'USER',
    token: getToken()
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
