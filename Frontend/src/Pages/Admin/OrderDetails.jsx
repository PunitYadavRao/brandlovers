import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { adminService } from '../../services/api'
import OrderStatusBadge from '../../Components/OrderStatusBadge'
import { FiArrowLeft, FiPackage } from 'react-icons/fi'
import { toast } from 'react-toastify'

const OrderDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrder()
    }, [id])

    const fetchOrder = async () => {
        try {
            setLoading(true)
            const response = await adminService.getOrderById(id)
            setOrder(response.data.order)
        } catch (error) {
            console.error('Error fetching order:', error)
            toast.error('Failed to fetch order details')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (newStatus) => {
        try {
            await adminService.updateOrderStatus(id, newStatus)
            toast.success('Order status updated')
            fetchOrder()
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Failed to update status')
        }
    }

    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className='text-center py-12'>
                <p className='text-gray-500'>Order not found</p>
                <Link to='/admin/orders' className='text-blue-600 hover:underline mt-4 inline-block'>
                    Back to orders
                </Link>
            </div>
        )
    }

    const address = typeof order.address === 'string' ? JSON.parse(order.address) : order.address
    const statusOptions = ['Order Placed', 'Processing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled']

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex items-center gap-4'>
                <button
                    onClick={() => navigate('/admin/orders')}
                    className='p-2 hover:bg-gray-100 rounded-lg transition'
                >
                    <FiArrowLeft className='w-5 h-5' />
                </button>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Order #{order.id}</h1>
                    <p className='text-gray-600 mt-1'>
                        Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Order Details */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Order Items */}
                    <div className='bg-white rounded-lg shadow'>
                        <div className='px-6 py-4 border-b border-gray-200'>
                            <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
                                <FiPackage className='w-5 h-5' />
                                Order Items
                            </h2>
                        </div>
                        <div className='p-6 space-y-4'>
                            {order.items?.map((item, index) => (
                                <div key={index} className='flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0'>
                                    <img
                                        src={item.product?.image || '/placeholder.png'}
                                        alt={item.product?.name}
                                        className='w-20 h-20 object-cover rounded-lg'
                                    />
                                    <div className='flex-1'>
                                        <h3 className='font-medium text-gray-900'>{item.product?.name}</h3>
                                        <p className='text-sm text-gray-500'>Size: {item.size || 'N/A'}</p>
                                        <p className='text-sm text-gray-500'>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='font-semibold text-gray-900'>${parseFloat(item.price).toFixed(2)}</p>
                                        <p className='text-sm text-gray-500'>each</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className='bg-white rounded-lg shadow'>
                        <div className='px-6 py-4 border-b border-gray-200'>
                            <h2 className='text-lg font-semibold text-gray-900'>Customer Information</h2>
                        </div>
                        <div className='p-6 grid grid-cols-2 gap-4'>
                            <div>
                                <p className='text-sm text-gray-500'>Name</p>
                                <p className='font-medium text-gray-900'>{order.user?.name || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>Email</p>
                                <p className='font-medium text-gray-900'>{order.user?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className='bg-white rounded-lg shadow'>
                        <div className='px-6 py-4 border-b border-gray-200'>
                            <h2 className='text-lg font-semibold text-gray-900'>Shipping Address</h2>
                        </div>
                        <div className='p-6'>
                            {address ? (
                                <div className='text-gray-900'>
                                    <p>{address.firstName} {address.lastName}</p>
                                    <p>{address.street}</p>
                                    <p>{address.city}, {address.state} {address.zipcode}</p>
                                    <p>{address.country}</p>
                                    <p className='mt-2'>Phone: {address.phone}</p>
                                </div>
                            ) : (
                                <p className='text-gray-500'>No address information</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className='space-y-6'>
                    {/* Status Update */}
                    <div className='bg-white rounded-lg shadow p-6'>
                        <h3 className='font-semibold text-gray-900 mb-4'>Order Status</h3>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm text-gray-600'>Current Status:</span>
                                <OrderStatusBadge status={order.status} />
                            </div>
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className='bg-white rounded-lg shadow p-6'>
                        <h3 className='font-semibold text-gray-900 mb-4'>Payment Information</h3>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-sm'>
                                <span className='text-gray-600'>Payment Method:</span>
                                <span className='font-medium text-gray-900'>{order.paymentMethod}</span>
                            </div>
                            <div className='flex justify-between text-sm'>
                                <span className='text-gray-600'>Payment Status:</span>
                                <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                                    {order.payment ? 'Paid' : 'Pending'}
                                </span>
                            </div>
                            <div className='pt-3 border-t border-gray-200'>
                                <div className='flex justify-between'>
                                    <span className='font-semibold text-gray-900'>Total Amount:</span>
                                    <span className='font-bold text-lg text-gray-900'>${parseFloat(order.amount).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
