import prisma from '../config/prisma.js'
import { generateToken } from '../middleware/auth.js'

const sanitizeUser = (user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  role: user.role,
})

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, phone, role } = req.body

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: 'fullName and email are required',
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with that email',
      })
    }

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        role: role || 'BUYER_TENANT',
      },
    })

    const token = generateToken(user)

    return res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(user),
    })
  } catch (error) {
    return next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or token request',
      })
    }

    const token = generateToken(user)

    return res.status(200).json({
      success: true,
      token,
      user: sanitizeUser(user),
    })
  } catch (error) {
    return next(error)
  }
}
