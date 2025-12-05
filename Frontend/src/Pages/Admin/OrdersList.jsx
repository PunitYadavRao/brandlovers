import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../services/api'
import OrderStatusBadge from '../../Components/OrderStatusBadge'
import { FiEye, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi'
import { toast } from 'react-toastify'

const OrdersList = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
    const [filters, setFilters] = useState({ status: '', search: '' })

    useEffect(() => {
        fetchOrders()
    }, [pagination.page, filters])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await adminService.getOrders({
                page: pagination.page,
                limit: pagination.limit,
                ...filters
            })
            setOrders(response.data.orders || [])
            setPagination(prev => ({ ...prev, total: response.data.pagination?.total || 0 }))
        } catch (error) {
            console.error('Error fetching orders:', error)
            toast.error('Failed to fetch orders')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return

        try {
            await adminService.deleteOrder(id)
            toast.success('Order deleted successfully')
            fetchOrders()
        } catch (error) {
            console.error('Error deleting order:', error)
            toast.error('Failed to delete order')
        }
    }

    const handleStatusChange = async (id, newStatus) => {
        try {
            await adminService.updateOrderStatus(id, newStatus)
            toast.success('Order status updated')
            fetchOrders()
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Failed to update status')
        }
    }

    const statusOptions = ['Order Placed', 'Processing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled']

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Orders Management</h1>
                    <p className='text-gray-600 mt-1'>Manage all customer orders</p>
                </div>
                <Link
                    to='/admin/orders/create'
                    className='px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition'
                >
                    Create Order
                </Link>
            </div>

            {/* Filters */}
            <div className='bg-white rounded-lg shadow p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='relative'>
                        <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type='text'
                            placeholder='Search by order ID, customer name or email...'
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                        />
                    </div>
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                        className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    >
                        <option value=''>All Statuses</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className='bg-white rounded-lg shadow overflow-hidden'>
                {loading ? (
                    <div className='flex items-center justify-center h-64'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
                    </div>
                ) : (
                    <>
                        <div className='overflow-x-auto'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>ID</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Customer</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Amount</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Status</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Payment</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Date</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan='7' className='px-6 py-8 text-center text-gray-500'>
                                                No orders found
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className='hover:bg-gray-50'>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                                    #{order.id}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>{order.user?.name || 'N/A'}</div>
                                                    <div className='text-sm text-gray-500'>{order.user?.email || 'N/A'}</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                    ${parseFloat(order.amount).toFixed(2)}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className='text-sm border-0 focus:ring-0 bg-transparent cursor-pointer'
                                                    >
                                                        {statusOptions.map(status => (
                                                            <option key={status} value={status}>{status}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {order.payment ? 'Paid' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {new Date(order.date).toLocaleDateString()}
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                    <div className='flex items-center gap-2'>
                                                        <Link
                                                            to={`/admin/orders/${order.id}`}
                                                            className='text-blue-600 hover:text-blue-900'
                                                        >
                                                            <FiEye className='w-5 h-5' />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(order.id)}
                                                            className='text-red-600 hover:text-red-900'
                                                        >
                                                            <FiTrash2 className='w-5 h-5' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {pagination.total > pagination.limit && (
                            <div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between'>
                                <div className='text-sm text-gray-700'>
                                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                                </div>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                        disabled={pagination.page === 1}
                                        className='px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                        disabled={pagination.page * pagination.limit >= pagination.total}
                                        className='px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default OrdersList
