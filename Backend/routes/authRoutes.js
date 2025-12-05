import express from 'express'
import { signup, login, getProfile, updateProfile, deleteProfile, changePassword, adminLogin } from '../controllers/authController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/**
 * @route POST /auth/signup
 * @description Register a new user
 * @body {email, password, name}
 * @returns {user, token}
 */
router.post('/signup', signup)

/**
 * @route POST /auth/login
 * @description Login user and return JWT token
 * @body {email, password}
 * @returns {user, token}
 */
router.post('/login', login)

/**
 * @route POST /auth/admin/login
 * @description Admin login with role verification
 * @body {email, password}
 * @returns {user, token}
 */
router.post('/admin/login', adminLogin)

/**
 * @route GET /auth/profile
 * @description Get current user profile (Protected)
 * @headers Authorization: Bearer <token>
 * @returns {user}
 */
router.get('/profile', verifyToken, getProfile)

/**
 * @route PUT /auth/profile
 * @description Update current user profile (Protected)
 * @headers Authorization: Bearer <token>
 * @body {name, email}
 * @returns {user}
 */
router.put('/profile', verifyToken, updateProfile)

/**
 * @route DELETE /auth/profile
 * @description Delete current user profile (Protected)
 * @headers Authorization: Bearer <token>
 * @returns {message}
 */
router.delete('/profile', verifyToken, deleteProfile)

/**
 * @route PUT /auth/change-password
 * @description Change user password (Protected)
 * @headers Authorization: Bearer <token>
 * @body {currentPassword, newPassword}
 * @returns {message}
 */
router.put('/change-password', verifyToken, changePassword)

export default router

