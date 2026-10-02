import express from 'express'
import cors from 'cors'
import healthRoutes from './routes/health.routes.js'
import authRoutes from './routes/auth.routes.js'
import propertyRoutes from './routes/property.routes.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

// CORS configuration for production and development
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
const allowedOrigins = [
  'http://localhost:5173', // Local development
  ...frontendUrl.split(',').map(url => url.trim()), // Production origins from env
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (e.g., curl, mobile apps, same-origin requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('CORS not allowed'))
      }
    },
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

app.use(errorHandler)

export default app
