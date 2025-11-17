import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

// Test connection
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully')
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  })

export default prisma
