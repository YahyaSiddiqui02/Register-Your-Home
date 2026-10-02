import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js'

const JWT_SECRET = process.env.JWT_SECRET || 'register-your-home-super-secret'

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token missing',
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found for this token',
      })
    }

    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed',
    })
  }
}

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to perform this action',
      })
    }

    return next()
  }
}
