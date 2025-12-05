import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { orderService } from '../services/api'
import { toast } from 'react-toastify'
import { FiArrowLeft, FiPackage, FiMapPin, FiCreditCard, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi'

const OrderDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrderDetails()
    }, [id])

    const fetchOrderDetails = async () => {
        try {
            setLoading(true)
            const response = await orderService.getOrderById(id)
            setOrder(response.data.order)
        } catch (error) {
            console.error('Error fetching order:', error)
            toast.error('Failed to load order details')
            navigate('/orders')
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const parseAddress = (addressString) => {
        try {
            return JSON.parse(addressString)
        } catch {
            return null
        }
    }

    const getStatusSteps = () => {
        const steps = [
            { name: 'Order Placed', icon: FiCheckCircle },
            { name: 'Packing', icon: FiPackage },
            { name: 'Shipped', icon: FiTruck },
            { name: 'Delivered', icon: FiCheckCircle }
        ]

        const statusOrder = ['Order Placed', 'Packing', 'Shipped', 'Delivered']
        const currentIndex = statusOrder.indexOf(order?.status)

        return steps.map((step, index) => ({
            ...step,
            completed: index <= currentIndex,
            active: index === currentIndex
        }))
    }

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-gray-600'>Loading order details...</div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>Order Not Found</h2>
                    <button
                        onClick={() => navigate('/orders')}
                        className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition'
                    >
                        Back to Orders
                    </button>
                </div>
            </div>
        )
    }

    const address = parseAddress(order.address)
    const statusSteps = getStatusSteps()

    return (
        <div className='min-h-screen py-10 bg-gray-50'>
            <div className='max-w-4xl mx-auto'>
                {/* Back Button */}
                <button
                    onClick={() => navigate('/orders')}
                    className='mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900'
                >
                    <FiArrowLeft className='w-5 h-5' />
                    Back to Orders
                </button>

                {/* Order Header */}
                <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6'>
                    <div className='flex flex-wrap items-center justify-between gap-4'>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                                Order #{order.id}
                            </h1>
                            <p className='text-gray-600'>
                                Placed on {formatDate(order.date)}
                            </p>
                        </div>
                        <div className='text-right'>
                            <p className='text-sm text-gray-600 mb-1'>Total Amount</p>
                            <p className='text-3xl font-bold text-gray-900'>
                                ${parseFloat(order.amount).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Status Timeline */}
                <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6'>
                    <h2 className='text-lg font-bold text-gray-900 mb-6 flex items-center gap-2'>
                        <FiClock className='w-5 h-5' />
                        Order Status
                    </h2>

                    <div className='relative'>
                        {/* Timeline Line */}
                        <div className='absolute top-5 left-0 right-0 h-0.5 bg-gray-200'>
                            <div
                                className='h-full bg-green-600 transition-all duration-500'
                                style={{
                                    width: `${(statusSteps.filter(s => s.completed).length - 1) * 33.33}%`
                                }}
                            />
                        </div>

                        {/* Status Steps */}
                        <div className='relative flex justify-between'>
                            {statusSteps.map((step, index) => (
                                <div key={index} className='flex flex-col items-center'>
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${step.completed
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-200 text-gray-400'
                                            } ${step.active ? 'ring-4 ring-green-100' : ''}`}
                                    >
                                        <step.icon className='w-5 h-5' />
                                    </div>
                                    <p
                                        className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                    >
                                        {step.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                        <p className='text-green-800 font-medium'>
                            Current Status: {order.status}
                        </p>
                    </div>
                </div>

                {/* Order Items */}
                <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6'>
                    <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                        <FiPackage className='w-5 h-5' />
                        Order Items
                    </h2>

                    <div className='space-y-4'>
                        {order.items.map((item) => (
                            <div key={item.id} className='flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0'>
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className='w-24 h-24 object-cover rounded'
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/96'
                                    }}
                                />
                                <div className='flex-1'>
                                    <h3 className='font-semibold text-gray-900'>{item.product.name}</h3>
                                    <p className='text-sm text-gray-600 mt-1'>
                                        {item.product.description}
                                    </p>
                                    <div className='flex items-center gap-4 mt-2'>
                                        <span className='text-sm text-gray-600'>Size: {item.size}</span>
                                        <span className='text-sm text-gray-600'>Quantity: {item.quantity}</span>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-lg font-bold text-gray-900'>
                                        ${parseFloat(item.price).toFixed(2)}
                                    </p>
                                    <p className='text-sm text-gray-600'>per item</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Shipping Address */}
                    {address && (
                        <div className='bg-white rounded-lg border border-gray-200 p-6'>
                            <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                                <FiMapPin className='w-5 h-5' />
                                Shipping Address
                            </h2>
                            <div className='text-gray-700 space-y-1'>
                                <p className='font-medium'>{address.firstName} {address.lastName}</p>
                                <p>{address.email}</p>
                                <p>{address.street}</p>
                                <p>{address.city}, {address.state} {address.zipcode}</p>
                                <p>{address.country}</p>
                                <p className='pt-2'>{address.phone}</p>
                            </div>
                        </div>
                    )}

                    {/* Payment Information */}
                    <div className='bg-white rounded-lg border border-gray-200 p-6'>
                        <h2 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                            <FiCreditCard className='w-5 h-5' />
                            Payment Information
                        </h2>
                        <div className='space-y-3'>
                            <div>
                                <p className='text-sm text-gray-600'>Payment Method</p>
                                <p className='font-medium text-gray-900'>{order.paymentMethod}</p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600'>Payment Status</p>
                                <p className={`font-medium ${order.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {order.payment ? 'Paid' : 'Pending'}
                                </p>
                            </div>
                            <div className='pt-3 border-t border-gray-200'>
                                <div className='flex justify-between mb-2'>
                                    <span className='text-gray-600'>Subtotal</span>
                                    <span className='font-medium'>${(parseFloat(order.amount) - 10).toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <span className='text-gray-600'>Delivery Fee</span>
                                    <span className='font-medium'>$10.00</span>
                                </div>
                                <div className='flex justify-between pt-2 border-t border-gray-200'>
                                    <span className='font-bold text-gray-900'>Total</span>
                                    <span className='font-bold text-gray-900'>${parseFloat(order.amount).toFixed(2)}</span>
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
