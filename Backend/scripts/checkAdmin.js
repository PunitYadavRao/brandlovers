import prisma from '../config/database.js'
import bcryptjs from 'bcryptjs'

async function checkAdmin() {
    try {
        const adminEmail = 'admin@gmail.com'

        const user = await prisma.user.findUnique({
            where: { email: adminEmail }
        })

        if (!user) {
            console.log('❌ Admin user NOT found!')
            return
        }

        console.log('✅ Admin user found!')
        console.log('Email:', user.email)
        console.log('Name:', user.name)
        console.log('Role:', user.role)
        console.log('isAdmin:', user.isAdmin)

        // Test password
        const testPassword = 'admin@gmail.com'
        const isValid = await bcryptjs.compare(testPassword, user.password)
        console.log('Password valid:', isValid)

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkAdmin()
