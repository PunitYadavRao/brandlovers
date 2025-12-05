import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FiMenu, FiLogOut, FiUser, FiBell } from 'react-icons/fi'

const AdminNavbar = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/signin')
    }

    return (
        <div className='sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm'>
            <div className='flex items-center justify-between h-16 px-6'>
                {/* Left side - Mobile menu button and title */}
                <div className='flex items-center gap-4'>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className='lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    >
                        <FiMenu className='w-5 h-5' />
                    </button>
                    
                    <div className='hidden sm:block'>
                        <h2 className='text-lg font-semibold text-gray-900'>
                            Welcome back, {user?.name || 'Admin'}
                        </h2>
                    </div>
                </div>

                {/* Right side - User menu */}
                <div className='flex items-center gap-3'>
                    {/* User info */}
                    <div className='flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50'>
                        <div className='flex items-center gap-2 text-sm text-gray-700'>
                            <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                                <FiUser className='w-4 h-4 text-white' />
                            </div>
                            <div className='hidden sm:block'>
                                <p className='font-medium text-gray-900'>{user?.name || 'Admin'}</p>
                                <p className='text-xs text-gray-500'>{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors'
                    >
                        <FiLogOut className='w-4 h-4' />
                        <span className='hidden sm:inline'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
