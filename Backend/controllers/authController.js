import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/database.js'

export const signup = async (req, res, next) => {
  try {
    const { email, password, name, role = 'USER' } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      })
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      })
    }
    const hashedPassword = await bcryptjs.hash(password, 10)
    const isAdmin = role === 'ADMIN'
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        isAdmin
      }
    })

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isAdmin: user.isAdmin
        },
        token
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error during signup',
      error: error.message
    })
  }
}


// #For Ligin
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }


    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isAdmin: user.isAdmin
        },
        token
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}


export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user
      }
    })
  } catch (error) {
    console.error('Get profile error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error retrieving profile',
      error: error.message
    })
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      })
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: userId }
      }
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email is already taken'
      })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser
      }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    })
  }
}

export const deleteProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId

    // Delete user and all related data (cascade)
    await prisma.user.delete({
      where: { id: userId }
    })

    return res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    })
  } catch (error) {
    console.error('Delete profile error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error deleting profile',
      error: error.message
    })
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    })

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Change password error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: error.message
    })
  }
}

// Admin Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check if user is admin
    if (!user.isAdmin || user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      })
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isAdmin: user.isAdmin
        },
        token
      }
    })
  } catch (error) {
    console.error('Admin login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error during admin login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
