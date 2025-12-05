import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { orderService } from '../services/api'
import { toast } from 'react-toastify'
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await orderService.getOrders()
      setOrders(response.data.orders || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Order Placed':
        return <FiClock className='w-5 h-5 text-blue-600' />
      case 'Packing':
        return <FiPackage className='w-5 h-5 text-yellow-600' />
      case 'Shipped':
        return <FiTruck className='w-5 h-5 text-purple-600' />
      case 'Delivered':
        return <FiCheckCircle className='w-5 h-5 text-green-600' />
      default:
        return <FiClock className='w-5 h-5 text-gray-600' />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-blue-100 text-blue-800'
      case 'Packing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000) // Convert Unix timestamp to milliseconds
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-gray-600'>Loading orders...</div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <FiPackage className='w-24 h-24 mx-auto text-gray-300 mb-4' />
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>No Orders Yet</h2>
          <p className='text-gray-600 mb-6'>You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/collection')}
            className='px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition'
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen py-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>My Orders</h1>

        <div className='space-y-4'>
          {orders.map((order) => (
            <div key={order.id} className='bg-white border border-gray-200 rounded-lg p-6'>
              {/* Order Header */}
              <div className='flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-200'>
                <div>
                  <p className='text-sm text-gray-600'>Order ID: #{order.id}</p>
                  <p className='text-sm text-gray-600'>
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className='space-y-3 mb-4'>
                {order.items.map((item) => (
                  <div key={item.id} className='flex gap-4'>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className='w-20 h-20 object-cover rounded'
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80'
                      }}
                    />
                    <div className='flex-1'>
                      <h3 className='font-medium text-gray-900'>{item.product.name}</h3>
                      <p className='text-sm text-gray-600'>
                        Size: {item.size} | Quantity: {item.quantity}
                      </p>
                      <p className='text-sm font-bold text-gray-900 mt-1'>
                        ${parseFloat(item.price).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className='flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200'>
                <div>
                  <p className='text-sm text-gray-600'>Payment Method</p>
                  <p className='font-medium text-gray-900'>{order.paymentMethod}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm text-gray-600'>Total Amount</p>
                  <p className='text-2xl font-bold text-gray-900'>
                    ${parseFloat(order.amount).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Track Order Button */}
              <button
                onClick={() => navigate(`/orders/${order.id}`)}
                className='mt-4 w-full py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition'
              >
                View Order Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders