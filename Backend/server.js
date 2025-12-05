import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import { errorHandler } from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Brand Lovers API is running'
  })
})

app.use('/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/contact', contactRoutes)

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
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log(`Auth routes: http://localhost:${PORT}/auth/*`)
})

export default app


