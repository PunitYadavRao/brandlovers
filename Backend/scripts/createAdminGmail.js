import prisma from '../config/database.js'
import bcryptjs from 'bcryptjs'

async function createAdminUser() {
    try {
        const adminEmail = 'admin@gmail.com'
        const adminPassword = 'admin@gmail.com'
        const adminName = 'Admin User'

        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail }
        })

        if (existingAdmin) {
            console.log('✅ Admin user already exists!')
            console.log('Email:', adminEmail)
            console.log('Password:', adminPassword)
            return
        }

        // Create admin user
        const hashedPassword = await bcryptjs.hash(adminPassword, 10)
        const admin = await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: adminName,
                role: 'ADMIN',
                isAdmin: true
            }
        })

        console.log('✅ Admin user created successfully!')
        console.log('Email:', adminEmail)
        console.log('Password:', adminPassword)
        console.log('⚠️  Please change the password after first login!')
    } catch (error) {
        console.error('Error creating admin user:', error)
    } finally {
        await prisma.$disconnect()
    }
}

createAdminUser()
