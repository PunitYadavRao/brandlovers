import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiX, FiHome, FiShoppingBag, FiPlus, FiList, FiPackage } from 'react-icons/fi'

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: FiHome, exact: true },
        { name: 'Orders', href: '/admin/orders', icon: FiShoppingBag },
        { name: 'Products', href: '/admin/products', icon: FiPackage },
        { name: 'Add Product', href: '/admin/products/add', icon: FiPlus },
    ]

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className='flex flex-col h-full'>
                    {/* Logo & Close Button */}
                    <div className='flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gray-50'>
                        <h1 className='text-xl font-bold text-gray-900'>Admin Panel</h1>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className='lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        >
                            <FiX className='w-5 h-5' />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                end={item.exact}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className='w-5 h-5 mr-3 flex-shrink-0' />
                                <span className='truncate'>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className='p-4 border-t border-gray-200 bg-gray-50'>
                        <p className='text-xs text-gray-500 text-center font-medium'>
                            Brand Lovers Admin v1.0
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar
