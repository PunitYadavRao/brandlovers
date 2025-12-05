import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartService } from '../services/api'
import { toast } from 'react-toastify'
import { FiTrash2, FiShoppingCart } from 'react-icons/fi'

const Cart = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartService.getCart()
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      await cartService.updateCartItem(itemId, newQuantity)
      fetchCart()
      toast.success('Cart updated')
    } catch (error) {
      console.error('Error updating cart:', error)
      toast.error('Failed to update cart')
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await cartService.removeFromCart(itemId)
      fetchCart()
      toast.success('Item removed from cart')
    } catch (error) {
      console.error('Error removing item:', error)
      toast.error('Failed to remove item')
    }
  }

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity)
    }, 0)
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-gray-600'>Loading cart...</div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <FiShoppingCart className='w-24 h-24 mx-auto text-gray-300 mb-4' />
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Your Cart is Empty</h2>
          <p className='text-gray-600 mb-6'>Add some products to get started!</p>
          <button
            onClick={() => navigate('/collection')}
            className='px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const total = calculateTotal()

  return (
    <div className='min-h-screen py-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Shopping Cart</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {cart.items.map((item) => (
              <div key={item.id} className='bg-white border border-gray-200 rounded-lg p-4'>
                <div className='flex gap-4'>
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className='w-24 h-24 object-cover rounded'
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/96'
                    }}
                  />

                  {/* Product Details */}
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-900'>{item.product.name}</h3>
                    <p className='text-sm text-gray-600 mt-1'>Size: {item.size}</p>
                    <p className='text-lg font-bold text-gray-900 mt-2'>
                      ${parseFloat(item.product.price).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className='flex items-center gap-3 mt-3'>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className='w-8 h-8 border border-gray-300 rounded hover:bg-gray-100'
                      >
                        -
                      </button>
                      <span className='w-12 text-center font-medium'>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className='w-8 h-8 border border-gray-300 rounded hover:bg-gray-100'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className='text-red-600 hover:text-red-700'
                  >
                    <FiTrash2 className='w-5 h-5' />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white border border-gray-200 rounded-lg p-6 sticky top-4'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

              <div className='space-y-3 mb-6'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>
                  <span className='font-medium'>${total.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Delivery Fee</span>
                  <span className='font-medium'>$10.00</span>
                </div>
                <div className='border-t border-gray-200 pt-3'>
                  <div className='flex justify-between text-lg font-bold text-gray-900'>
                    <span>Total</span>
                    <span>${(total + 10).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/place-order')}
                className='w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition mb-3'
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/collection')}
                className='w-full py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart