import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/api'
import { FiShoppingBag, FiDollarSign, FiClock, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import OrderStatusBadge from '../../Components/OrderStatusBadge'

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        deliveredOrders: 0
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            const response = await adminService.getOrders({ page: 1, limit: 5 })
            const orders = response.data?.orders || []

            // Calculate stats from orders
            const totalOrders = response.data?.pagination?.total || 0
            const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0)
            const pendingOrders = orders.filter(o => o.status === 'Order Placed').length
            const deliveredOrders = orders.filter(o => o.status === 'Delivered').length

            setStats({ totalOrders, totalRevenue, pendingOrders, deliveredOrders })
            setRecentOrders(orders)
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
            // Silently handle errors - just show empty state
            setStats({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, deliveredOrders: 0 })
            setRecentOrders([])
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        { name: 'Total Orders', value: stats.totalOrders, icon: FiShoppingBag, color: 'bg-blue-500' },
        { name: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: FiDollarSign, color: 'bg-green-500' },
        { name: 'Pending Orders', value: stats.pendingOrders, icon: FiClock, color: 'bg-yellow-500' },
        { name: 'Delivered', value: stats.deliveredOrders, icon: FiTrendingUp, color: 'bg-purple-500' },
    ]

    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
            </div>
        )
    }

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div>
                <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
                <p className='text-gray-600 mt-1'>Overview of your store</p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {statCards.map((stat) => (
                    <div key={stat.name} className='bg-white rounded-lg shadow p-6'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-600'>{stat.name}</p>
                                <p className='text-2xl font-bold text-gray-900 mt-2'>{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className='w-6 h-6 text-white' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className='bg-white rounded-lg shadow'>
                <div className='px-6 py-4 border-b border-gray-200 flex items-center justify-between'>
                    <h2 className='text-lg font-semibold text-gray-900'>Recent Orders</h2>
                    <Link
                        to='/admin/orders'
                        className='text-sm text-gray-600 hover:text-gray-900 font-medium'
                    >
                        View all
                    </Link>
                </div>
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Order ID
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Customer
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Amount
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Status
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan='5' className='px-6 py-8 text-center text-gray-500'>
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className='hover:bg-gray-50'>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                            #{order.id}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {order.user?.name || 'N/A'}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            ${parseFloat(order.amount).toFixed(2)}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
