import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='flex h-screen bg-gray-50 overflow-hidden'>
            {/* Sidebar */}
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className='flex-1 flex flex-col overflow-hidden'>
                {/* Navbar */}
                <AdminNavbar setSidebarOpen={setSidebarOpen} />

                {/* Page Content */}
                <main className='flex-1 overflow-y-auto p-6'>
                    <div className='max-w-7xl mx-auto'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
