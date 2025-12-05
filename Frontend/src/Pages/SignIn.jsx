import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const SignIn = () => {
  const navigate = useNavigate()
  const { login, adminLogin, loading: authLoading } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAdminLogin, setIsAdminLogin] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    console.log('Login attempt:', { email, isAdminLogin })

    try {
      if (isAdminLogin) {
        console.log('Attempting admin login...')
        await adminLogin(email, password)
        console.log('Admin login successful, redirecting to /admin')
        navigate('/admin')
      } else {
        console.log('Attempting user login...')
        await login(email, password)
        console.log('User login successful, redirecting to /')
        navigate('/')
      }
    } catch (err) {
      console.error('Login error:', err)
      console.error('Error response:', err.response)

      // Extract the most specific error message
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to sign in. Please try again.'

      console.error('Displaying error:', errorMessage)
      setError(errorMessage)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen py-6'>
      <div className='border border-gray-500 rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-lg'>

        <div className='mb-8'>
          <h1 className='almendra-display-regular text-4xl text-gray-800 mb-2'>
            {isAdminLogin ? 'Admin Login' : 'Welcome Back'}
          </h1>
          <p className='text-gray-600 text-sm'>
            {isAdminLogin ? 'Sign in to admin panel' : 'Sign in to your account to continue'}
          </p>
        </div>

        {error && (
          <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>

          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>
              Email Address
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition'
              placeholder='your@email.com'
            />
          </div>

          {/* Password Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition'
              placeholder='••••••••'
            />
          </div>

          {/* Admin Toggle */}
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='adminToggle'
              checked={isAdminLogin}
              onChange={(e) => setIsAdminLogin(e.target.checked)}
              className='w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900'
            />
            <label htmlFor='adminToggle' className='ml-2 text-sm text-gray-700'>
              Login as Admin
            </label>
          </div>

          <div className='text-right'>
            <NavLink to='/forgot-password' className='text-sm text-gray-600 hover:text-gray-800'>
              Forgot password?
            </NavLink>
          </div>
          <button
            type='submit'
            disabled={authLoading}
            className='w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {authLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className='flex items-center gap-4 my-6'>
          <hr className='flex-1 border-gray-300' />
          <p className='text-gray-500 text-sm'>OR</p>
          <hr className='flex-1 border-gray-300' />
        </div>

        <p className='text-center text-gray-600 text-sm'>
          Don't have an account?{' '}
          <NavLink to='/signup' className='text-gray-800 font-semibold hover:underline'>
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default SignIn
