import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartService, orderService } from '../services/api'
import { toast } from 'react-toastify'

const PlaceOrders = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    paymentMethod: 'COD'
  })

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartService.getCart()
      if (!response.data || response.data.items.length === 0) {
        toast.error('Your cart is empty')
        navigate('/cart')
        return
      }
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
      toast.error('Failed to load cart')
      navigate('/cart')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity)
    }, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setPlacing(true)
      const address = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        country: formData.country,
        phone: formData.phone
      }

      await orderService.createOrder({
        address,
        paymentMethod: formData.paymentMethod
      })

      toast.success('Order placed successfully!')
      navigate('/orders')
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setPlacing(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-gray-600'>Loading...</div>
      </div>
    )
  }

  const total = calculateTotal()

  return (
    <div className='min-h-screen py-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Shipping Information */}
            <div className='lg:col-span-2'>
              <div className='bg-white border border-gray-200 rounded-lg p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-6'>Shipping Information</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      First Name *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Last Name *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email *
                    </label>
                    <input
                      type='email'
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Street Address *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      City *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      State *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Zipcode *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.zipcode}
                      onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Country *
                    </label>
                    <input
                      type='text'
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone *
                    </label>
                    <input
                      type='tel'
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className='mt-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Payment Method</h3>
                  <div className='space-y-2'>
                    <label className='flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='COD'
                        checked={formData.paymentMethod === 'COD'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className='w-4 h-4'
                      />
                      <span className='font-medium'>Cash on Delivery</span>
                    </label>
                    <label className='flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='Stripe'
                        checked={formData.paymentMethod === 'Stripe'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className='w-4 h-4'
                      />
                      <span className='font-medium'>Stripe (Coming Soon)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white border border-gray-200 rounded-lg p-6 sticky top-4'>
                <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

                {/* Cart Items */}
                <div className='space-y-3 mb-6 max-h-64 overflow-y-auto'>
                  {cart?.items.map((item) => (
                    <div key={item.id} className='flex gap-3'>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className='w-16 h-16 object-cover rounded'
                      />
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900'>{item.product.name}</p>
                        <p className='text-xs text-gray-600'>Size: {item.size} × {item.quantity}</p>
                        <p className='text-sm font-bold text-gray-900'>
                          ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='space-y-3 mb-6 border-t border-gray-200 pt-4'>
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
                  type='submit'
                  disabled={placing}
                  className='w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50'
                >
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrders