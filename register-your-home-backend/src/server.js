import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

const port = process.env.PORT || 5000
const host = '0.0.0.0' // Listen on all network interfaces for hosting services

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET']
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingEnvVars.length > 0) {
  console.error(
    `❌ FATAL: Missing required environment variables: ${missingEnvVars.join(', ')}`
  )
  console.error('Please set these in your .env file or deployment environment.')
  process.exit(1)
}

app.listen(port, host, () => {
  console.log(`✅ Server running on http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`)
})
