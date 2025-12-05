import jwt from 'jsonwebtoken'

// Authenticate user from JWT token
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

// Require admin role
export const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      })
    }
    next()
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    })
  }
}

// Legacy alias for backward compatibility
export const verifyToken = authenticate

export const errorHandler = (err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  })
}
