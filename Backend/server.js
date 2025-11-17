import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/auth', authRoutes)

app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔐 Auth routes: http://localhost:${PORT}/auth/*`)
})

export default app


