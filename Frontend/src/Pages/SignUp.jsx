import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const SignUp = () => {
  const navigate = useNavigate()
  const { signup, loading: authLoading } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear errors when user starts typing
    if (error) setError('')
    if (passwordError) setPasswordError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setPasswordError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }

    try {
      const name = `${formData.firstName} ${formData.lastName}`
      await signup(formData.email, formData.password, name)
      navigate('/') // Redirect to home after successful signup
    } catch (err) {
      console.error('Signup error:', err)
      // Extract the most specific error message available
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to create account. Please try again.'
      setError(errorMessage)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen py-6'>
      <div className='border border-gray-500 rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-lg'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='almendra-display-regular text-4xl text-gray-800 mb-2'>
            Create Account
          </h1>
          <p className='text-gray-600 text-sm'>
            Join us to start shopping
          </p>
        </div>

        {/* Error Messages */}
        {error && (
          <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* First Name Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>
              First Name
            </label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition'
              placeholder='John'
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>
              Last Name
            </label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition'
              placeholder='Doe'
            />
          </div>

          {/* Email Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
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
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition'
              placeholder='••••••••'
            />
            <p className='text-xs text-gray-500 mt-1'>
              Must be at least 6 characters
            </p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition'
              placeholder='••••••••'
            />
            {passwordError && (
              <p className='text-red-600 text-xs mt-1'>
                {passwordError}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className='flex items-start gap-2 py-2'>
            <input
              type='checkbox'
              id='terms'
              required
              className='mt-1 w-4 h-4 rounded border-gray-300'
            />
            <label htmlFor='terms' className='text-xs text-gray-600'>
              I agree to the{' '}
              <NavLink to='/terms' className='text-gray-800 font-semibold hover:underline'>
                Terms and Conditions
              </NavLink>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={authLoading}
            className='w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {authLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center gap-4 my-6'>
          <hr className='flex-1 border-gray-300' />
          <p className='text-gray-500 text-sm'>OR</p>
          <hr className='flex-1 border-gray-300' />
        </div>

        {/* Sign In Link */}
        <p className='text-center text-gray-600 text-sm'>
          Already have an account?{' '}
          <NavLink to='/signin' className='text-gray-800 font-semibold hover:underline'>
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default SignUp
